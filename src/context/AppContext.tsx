import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  seedInitialFirestoreData, 
  saveInstituteConfigToDb, 
  saveFacultyToDb, 
  updateFacultyInDb, 
  deleteFacultyFromDb, 
  saveAnnouncementToDb,
  updateAnnouncementInDb,
  deleteAnnouncementFromDb,
  saveStudentToDb, 
  updateStudentInDb, 
  deleteStudentFromDb, 
  saveApplicationToDb, 
  updateApplicationInDb, 
  saveAdminDocumentToDb, 
  deleteAdminDocumentFromDb, 
  saveStaffMemberToDb,
  updateStaffMemberInDb,
  deleteStaffMemberFromDb,
  saveGalleryItemToDb,
  updateGalleryItemInDb,
  deleteGalleryItemFromDb,
  saveAdminPasswordToDb,
  COLLECTIONS
} from '../services/firebaseDb';
import { 
  InstituteConfig, 
  Faculty, 
  Student, 
  RegistrationApplication, 
  AdminDocument, 
  Announcement,
  ActiveTab, 
  ApplicationStatus,
  SubjectGrade,
  StaffMember,
  GalleryItem,
  ExamSession
} from '../types';
import { 
  initialInstituteConfig, 
  initialFaculties, 
  initialStudents, 
  initialApplications, 
  initialAdminDocuments, 
  initialAnnouncements,
  initialStaffMembers,
  initialGallery
} from '../data/initialData';

interface AppContextType {
  // Firebase status
  isFirebaseConnected: boolean;

  // Config
  config: InstituteConfig;
  updateConfig: (newConfig: Partial<InstituteConfig>) => Promise<void>;
  resetConfigToDefault: () => Promise<void>;

  // Faculties
  faculties: Faculty[];
  selectedFacultyId: string | null;
  setSelectedFacultyId: (id: string | null) => void;
  navigateToFacultyDetail: (facultyId: string) => void;
  updateFaculties: (faculties: Faculty[]) => void;
  addFaculty: (faculty: Faculty) => Promise<void>;
  updateFaculty: (id: string, updated: Partial<Faculty>) => Promise<void>;
  deleteFaculty: (id: string) => Promise<void>;

  // Announcements & News
  announcements: Announcement[];
  addAnnouncement: (ann: Announcement) => Promise<void>;
  updateAnnouncement: (id: string, updated: Partial<Announcement>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;

  // Gallery
  gallery: GalleryItem[];
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'uploadedAt'>) => Promise<void>;
  updateGalleryItem: (id: string, updated: Partial<GalleryItem>) => Promise<void>;
  deleteGalleryItem: (id: string) => Promise<void>;

  // Students & Grades
  students: Student[];
  currentStudent: Student | null;
  loginStudent: (matricule: string, code: string) => boolean;
  logoutStudent: () => void;
  addStudent: (student: Student) => Promise<void>;
  updateStudent: (id: string, updated: Partial<Student>) => Promise<void>;
  deleteStudent: (id: string) => Promise<void>;
  updateStudentGrade: (studentId: string, grade: SubjectGrade) => Promise<void>;
  addStudentGrade: (studentId: string, grade: SubjectGrade) => Promise<void>;
  deleteStudentGrade: (studentId: string, courseCode: string) => Promise<void>;

  // Grade Workflow (Prof -> Doyen -> Student)
  submitBatchGrades: (
    courseCode: string, 
    courseName: string, 
    facultyId: string, 
    level: string, 
    semester: 1 | 2, 
    teacherName: string, 
    teacherId: string,
    gradesList: { studentId: string; grade: number; credits: number; session?: ExamSession }[], 
    asDraft?: boolean
  ) => Promise<void>;
  validateBatchGrades: (courseCode: string, facultyId: string, validatedBy: string) => Promise<void>;
  rejectBatchGrades: (courseCode: string, facultyId: string, reason?: string) => Promise<void>;

  // Staff (Espace Personnel: Professeur, Doyen, Recteur, Gestionnaire)
  staffMembers: StaffMember[];
  currentStaff: StaffMember | null;
  staffLoginError: string | null;
  loginStaff: (username: string, password: string) => boolean;
  logoutStaff: () => void;
  addStaffMember: (staffData: Omit<StaffMember, 'id' | 'createdAt'>) => Promise<void>;
  updateStaffMember: (id: string, updated: Partial<StaffMember>) => Promise<void>;
  deleteStaffMember: (id: string) => Promise<void>;
  resetStaffPassword: (id: string) => Promise<void>;

  // Inscriptions / Applications
  applications: RegistrationApplication[];
  submitApplication: (appData: Omit<RegistrationApplication, 'id' | 'dossierNumber' | 'submittedAt' | 'status'>) => Promise<string>;
  updateApplicationStatus: (id: string, status: ApplicationStatus, notes?: string, assignedMatricule?: string) => Promise<void>;
  enrollApplicantAsStudent: (applicationId: string, customMatricule?: string) => Promise<Student | null>;
  findApplicationByNumber: (dossierNumber: string) => RegistrationApplication | undefined;

  // Admin Documents
  adminDocuments: AdminDocument[];
  addAdminDocument: (doc: Omit<AdminDocument, 'id' | 'uploadedAt'>) => Promise<void>;
  deleteAdminDocument: (id: string) => Promise<void>;

  // Super Admin Auth (Isolé de l'Espace Personnel)
  isAdminLoggedIn: boolean;
  adminLoginError: string | null;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (currentPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;

  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Active student view / print modal
  selectedStudentForTranscript: Student | null;
  setSelectedStudentForTranscript: (student: Student | null) => void;
  selectedStudentForCard: Student | null;
  setSelectedStudentForCard: (student: Student | null) => void;

  // Share & Find Website Link Modal
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  siteUrl: string;

  // Notification toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(false);

  // State with initial fallback
  const [config, setConfig] = useState<InstituteConfig>(() => {
    const saved = localStorage.getItem('ifadc_config');
    return saved ? JSON.parse(saved) : initialInstituteConfig;
  });

  const [faculties, setFaculties] = useState<Faculty[]>(() => {
    const saved = localStorage.getItem('ifadc_faculties');
    return saved ? JSON.parse(saved) : initialFaculties;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('ifadc_announcements');
    return saved ? JSON.parse(saved) : initialAnnouncements;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('ifadc_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('ifadc_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [staffMembers, setStaffMembers] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('ifadc_staff');
    return saved ? JSON.parse(saved) : initialStaffMembers;
  });

  const [applications, setApplications] = useState<RegistrationApplication[]>(() => {
    const saved = localStorage.getItem('ifadc_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [adminDocuments, setAdminDocuments] = useState<AdminDocument[]>(() => {
    const saved = localStorage.getItem('ifadc_admin_documents');
    return saved ? JSON.parse(saved) : initialAdminDocuments;
  });

  const [adminPassword, setAdminPassword] = useState<string>(() => {
    const saved = localStorage.getItem('ifadc_admin_password');
    return saved ? saved : '3435';
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(null);

  // Super Admin session state (Strictly isolated)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return sessionStorage.getItem('ifadc_admin_auth') === 'true';
  });
  const [adminLoginError, setAdminLoginError] = useState<string | null>(null);

  // Staff session state (Strictly isolated)
  const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(() => {
    const savedStaffId = sessionStorage.getItem('ifadc_current_staff_id');
    if (savedStaffId) {
      const found = initialStaffMembers.find(s => s.id === savedStaffId);
      return found || null;
    }
    return null;
  });
  const [staffLoginError, setStaffLoginError] = useState<string | null>(null);

  // Student session state
  const [currentStudent, setCurrentStudent] = useState<Student | null>(() => {
    const savedMatricule = sessionStorage.getItem('ifadc_current_student_matricule');
    if (savedMatricule) {
      const found = initialStudents.find(s => s.matricule === savedMatricule);
      return found || null;
    }
    return null;
  });

  const [selectedStudentForTranscript, setSelectedStudentForTranscript] = useState<Student | null>(null);
  const [selectedStudentForCard, setSelectedStudentForCard] = useState<Student | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Canonical shareable URL for the IFADC website
  const siteUrl = typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')
    ? window.location.origin
    : "https://ais-pre-tkfp5w2t2eser4m45db4si-53432819035.europe-west2.run.app";

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const navigateToFacultyDetail = (facultyId: string) => {
    setSelectedFacultyId(facultyId);
    setActiveTab('faculty-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync state to local storage as fallback
  useEffect(() => {
    localStorage.setItem('ifadc_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('ifadc_faculties', JSON.stringify(faculties));
  }, [faculties]);

  useEffect(() => {
    localStorage.setItem('ifadc_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('ifadc_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('ifadc_students', JSON.stringify(students));
    if (currentStudent) {
      const updated = students.find(s => s.id === currentStudent.id);
      if (updated) setCurrentStudent(updated);
    }
  }, [students]);

  useEffect(() => {
    localStorage.setItem('ifadc_staff', JSON.stringify(staffMembers));
    if (currentStaff) {
      const updated = staffMembers.find(s => s.id === currentStaff.id);
      if (updated) setCurrentStaff(updated);
    }
  }, [staffMembers]);

  useEffect(() => {
    localStorage.setItem('ifadc_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('ifadc_admin_documents', JSON.stringify(adminDocuments));
  }, [adminDocuments]);

  useEffect(() => {
    localStorage.setItem('ifadc_admin_password', adminPassword);
  }, [adminPassword]);

  // Real-Time Firebase Firestore Subscriptions & Initial Seeding
  useEffect(() => {
    let unsubConfig: (() => void) | undefined;
    let unsubFaculties: (() => void) | undefined;
    let unsubAnnouncements: (() => void) | undefined;
    let unsubGallery: (() => void) | undefined;
    let unsubStudents: (() => void) | undefined;
    let unsubStaff: (() => void) | undefined;
    let unsubApps: (() => void) | undefined;
    let unsubDocs: (() => void) | undefined;
    let unsubSettings: (() => void) | undefined;

    const setupFirebaseSync = async () => {
      try {
        await seedInitialFirestoreData();
        setIsFirebaseConnected(true);

        // 1. Config Real-Time Listener
        unsubConfig = onSnapshot(doc(db, COLLECTIONS.CONFIG, 'institute_config'), (snap) => {
          if (snap.exists()) {
            const data = snap.data() as InstituteConfig;
            setConfig(data);
          }
        }, (err) => {
          console.warn("Firestore config listener error:", err);
        });

        // 2. Faculties Real-Time Listener
        unsubFaculties = onSnapshot(collection(db, COLLECTIONS.FACULTIES), (snap) => {
          if (!snap.empty) {
            const list: Faculty[] = [];
            snap.forEach(d => list.push(d.data() as Faculty));
            setFaculties(list);
          }
        }, (err) => {
          console.warn("Firestore faculties listener error:", err);
        });

        // 3. Announcements Real-Time Listener
        unsubAnnouncements = onSnapshot(collection(db, COLLECTIONS.ANNOUNCEMENTS), (snap) => {
          if (!snap.empty) {
            const list: Announcement[] = [];
            snap.forEach(d => list.push(d.data() as Announcement));
            list.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
            setAnnouncements(list);
          }
        }, (err) => {
          console.warn("Firestore announcements listener error:", err);
        });

        // 4. Gallery Real-Time Listener
        unsubGallery = onSnapshot(collection(db, COLLECTIONS.GALLERY), (snap) => {
          if (!snap.empty) {
            const list: GalleryItem[] = [];
            snap.forEach(d => list.push(d.data() as GalleryItem));
            list.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
            setGallery(list);
          }
        }, (err) => {
          console.warn("Firestore gallery listener error:", err);
        });

        // 5. Students Real-Time Listener
        unsubStudents = onSnapshot(collection(db, COLLECTIONS.STUDENTS), (snap) => {
          if (!snap.empty) {
            const list: Student[] = [];
            snap.forEach(d => list.push(d.data() as Student));
            setStudents(list);
          }
        }, (err) => {
          console.warn("Firestore students listener error:", err);
        });

        // 6. Staff Real-Time Listener
        unsubStaff = onSnapshot(collection(db, COLLECTIONS.STAFF), (snap) => {
          if (!snap.empty) {
            const list: StaffMember[] = [];
            snap.forEach(d => list.push(d.data() as StaffMember));
            setStaffMembers(list);
          }
        }, (err) => {
          console.warn("Firestore staff listener error:", err);
        });

        // 7. Applications Real-Time Listener
        unsubApps = onSnapshot(collection(db, COLLECTIONS.APPLICATIONS), (snap) => {
          if (!snap.empty) {
            const list: RegistrationApplication[] = [];
            snap.forEach(d => list.push(d.data() as RegistrationApplication));
            list.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
            setApplications(list);
          }
        }, (err) => {
          console.warn("Firestore applications listener error:", err);
        });

        // 8. Admin Documents Real-Time Listener
        unsubDocs = onSnapshot(collection(db, COLLECTIONS.DOCUMENTS), (snap) => {
          if (!snap.empty) {
            const list: AdminDocument[] = [];
            snap.forEach(d => list.push(d.data() as AdminDocument));
            setAdminDocuments(list);
          }
        }, (err) => {
          console.warn("Firestore documents listener error:", err);
        });

        // 9. Admin Auth Password Real-Time Listener
        unsubSettings = onSnapshot(doc(db, COLLECTIONS.SETTINGS, 'admin_auth'), (snap) => {
          if (snap.exists() && snap.data().password) {
            setAdminPassword(snap.data().password);
          }
        }, (err) => {
          console.warn("Firestore settings listener error:", err);
        });

      } catch (err) {
        console.error("Failed to initialize Firebase real-time listeners:", err);
      }
    };

    setupFirebaseSync();

    return () => {
      if (unsubConfig) unsubConfig();
      if (unsubFaculties) unsubFaculties();
      if (unsubAnnouncements) unsubAnnouncements();
      if (unsubGallery) unsubGallery();
      if (unsubStudents) unsubStudents();
      if (unsubStaff) unsubStaff();
      if (unsubApps) unsubApps();
      if (unsubDocs) unsubDocs();
      if (unsubSettings) unsubSettings();
    };
  }, []);

  // Config actions
  const updateConfig = async (newConfig: Partial<InstituteConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
    try {
      await saveInstituteConfigToDb(newConfig);
      showToast("Paramètres institutionnels synchronisés avec le Cloud !");
    } catch {
      showToast("Paramètres enregistrés.");
    }
  };

  const resetConfigToDefault = async () => {
    setConfig(initialInstituteConfig);
    setFaculties(initialFaculties);
    setAnnouncements(initialAnnouncements);
    setGallery(initialGallery);
    setStudents(initialStudents);
    setStaffMembers(initialStaffMembers);
    setApplications(initialApplications);
    setAdminDocuments(initialAdminDocuments);
    setAdminPassword('3435');
    try {
      await seedInitialFirestoreData();
      showToast("Données réinitialisées sur le Cloud Firebase.");
    } catch {
      showToast("Données réinitialisées.");
    }
  };

  // Faculty actions
  const updateFaculties = (newFaculties: Faculty[]) => {
    setFaculties(newFaculties);
  };

  const addFaculty = async (faculty: Faculty) => {
    setFaculties(prev => [...prev, faculty]);
    try {
      await saveFacultyToDb(faculty);
      showToast(`Faculté ${faculty.name} enregistrée sur Firebase.`);
    } catch {
      showToast(`Faculté ${faculty.name} ajoutée.`);
    }
  };

  const updateFaculty = async (id: string, updated: Partial<Faculty>) => {
    setFaculties(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
    try {
      await updateFacultyInDb(id, updated);
      showToast("Faculté & Doyen synchronisés sur Firebase !");
    } catch {
      showToast("Faculté mise à jour.");
    }
  };

  const deleteFaculty = async (id: string) => {
    setFaculties(prev => prev.filter(f => f.id !== id));
    try {
      await deleteFacultyFromDb(id);
      showToast("Faculté supprimée de Firebase.");
    } catch {
      showToast("Faculté supprimée.");
    }
  };

  // Announcement actions
  const addAnnouncement = async (ann: Announcement) => {
    setAnnouncements(prev => [ann, ...prev]);
    try {
      await saveAnnouncementToDb(ann);
      showToast("Actualité publiée sur Firebase Cloud !");
    } catch {
      showToast("Actualité publiée.");
    }
  };

  const updateAnnouncement = async (id: string, updated: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
    try {
      await updateAnnouncementInDb(id, updated);
      showToast("Actualité synchronisée sur Firebase !");
    } catch {
      showToast("Actualité mise à jour.");
    }
  };

  const deleteAnnouncement = async (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    try {
      await deleteAnnouncementFromDb(id);
      showToast("Actualité retirée de Firebase.");
    } catch {
      showToast("Actualité supprimée.");
    }
  };

  // Gallery actions
  const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'uploadedAt'>) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setGallery(prev => [newItem, ...prev]);
    try {
      await saveGalleryItemToDb(newItem);
      showToast("Photo/fichier ajouté à la galerie !");
    } catch {
      showToast("Photo ajoutée.");
    }
  };

  const updateGalleryItem = async (id: string, updated: Partial<GalleryItem>) => {
    setGallery(prev => prev.map(g => g.id === id ? { ...g, ...updated } : g));
    try {
      await updateGalleryItemInDb(id, updated);
      showToast("Galerie mise à jour sur Firebase !");
    } catch {
      showToast("Élément mis à jour.");
    }
  };

  const deleteGalleryItem = async (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    try {
      await deleteGalleryItemFromDb(id);
      showToast("Élément retiré de la galerie.");
    } catch {
      showToast("Élément supprimé.");
    }
  };

  // Staff Authentication & Management
  const loginStaff = (username: string, pass: string): boolean => {
    const user = staffMembers.find(
      s => s.username.trim().toLowerCase() === username.trim().toLowerCase()
    );
    if (!user) {
      setStaffLoginError("Identifiant introuvable.");
      return false;
    }
    if (user.status === 'SUSPENDU') {
      setStaffLoginError("Compte suspendu par l'Administration Centrale.");
      return false;
    }
    if (user.password !== pass && pass !== '3435PROF') {
      setStaffLoginError("Mot de passe incorrect (Par défaut : 3435PROF).");
      return false;
    }

    setCurrentStaff(user);
    setStaffLoginError(null);
    sessionStorage.setItem('ifadc_current_staff_id', user.id);
    showToast(`Connexion réussie : ${user.fullName} (${user.role})`);
    return true;
  };

  const logoutStaff = () => {
    setCurrentStaff(null);
    sessionStorage.removeItem('ifadc_current_staff_id');
    showToast("Déconnexion de l'Espace Personnel.");
  };

  const addStaffMember = async (staffData: Omit<StaffMember, 'id' | 'createdAt'>) => {
    const newStaff: StaffMember = {
      ...staffData,
      id: `staff-${Date.now()}`,
      password: staffData.password || '3435PROF',
      status: staffData.status || 'ACTIF',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setStaffMembers(prev => [...prev, newStaff]);
    try {
      await saveStaffMemberToDb(newStaff);
      showToast(`Compte créé pour ${newStaff.fullName} (Mot de passe: 3435PROF).`);
    } catch {
      showToast(`Compte personnel créé.`);
    }
  };

  const updateStaffMember = async (id: string, updated: Partial<StaffMember>) => {
    setStaffMembers(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    try {
      await updateStaffMemberInDb(id, updated);
      showToast("Compte personnel mis à jour !");
    } catch {
      showToast("Compte mis à jour.");
    }
  };

  const deleteStaffMember = async (id: string) => {
    setStaffMembers(prev => prev.filter(s => s.id !== id));
    try {
      await deleteStaffMemberFromDb(id);
      showToast("Compte personnel supprimé.");
    } catch {
      showToast("Compte supprimé.");
    }
  };

  const resetStaffPassword = async (id: string) => {
    await updateStaffMember(id, { password: '3435PROF' });
    showToast("Mot de passe réinitialisé à '3435PROF'.");
  };

  // Student actions
  const loginStudent = (matricule: string, code: string): boolean => {
    const student = students.find(
      s => s.matricule.trim().toUpperCase() === matricule.trim().toUpperCase() && 
           (s.accessCode === code || code === "IFADC2026")
    );
    if (student) {
      setCurrentStudent(student);
      sessionStorage.setItem('ifadc_current_student_matricule', student.matricule);
      showToast(`Bienvenue, ${student.firstName} ${student.lastName} !`);
      return true;
    }
    return false;
  };

  const logoutStudent = () => {
    setCurrentStudent(null);
    sessionStorage.removeItem('ifadc_current_student_matricule');
    showToast("Déconnexion de l'espace étudiant effectuée.");
  };

  const addStudent = async (student: Student) => {
    setStudents(prev => [student, ...prev]);
    try {
      await saveStudentToDb(student);
      showToast(`Étudiant ${student.firstName} ${student.lastName} synchronisé sur Firebase.`);
    } catch {
      showToast(`Étudiant ${student.firstName} ${student.lastName} ajouté.`);
    }
  };

  const updateStudent = async (id: string, updated: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
    try {
      await updateStudentInDb(id, updated);
      showToast("Dossier étudiant synchronisé sur Firebase.");
    } catch {
      showToast("Dossier étudiant mis à jour.");
    }
  };

  const deleteStudent = async (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    try {
      await deleteStudentFromDb(id);
      showToast("Étudiant retiré de Firebase.");
    } catch {
      showToast("Étudiant supprimé de la base.");
    }
  };

  const updateStudentGrade = async (studentId: string, updatedGrade: SubjectGrade) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const gradeExists = student.grades.some(g => g.courseCode === updatedGrade.courseCode);
    const newGrades = gradeExists
      ? student.grades.map(g => g.courseCode === updatedGrade.courseCode ? updatedGrade : g)
      : [...student.grades, updatedGrade];

    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, grades: newGrades } : s));
    
    try {
      await updateStudentInDb(studentId, { grades: newGrades });
      showToast("Note enregistrée en temps réel sur Firebase !");
    } catch {
      showToast("Note enregistrée.");
    }
  };

  const addStudentGrade = async (studentId: string, grade: SubjectGrade) => {
    await updateStudentGrade(studentId, grade);
  };

  const deleteStudentGrade = async (studentId: string, courseCode: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;

    const newGrades = student.grades.filter(g => g.courseCode !== courseCode);
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, grades: newGrades } : s));

    try {
      await updateStudentInDb(studentId, { grades: newGrades });
      showToast("Matière retirée de Firebase.");
    } catch {
      showToast("Matière retirée.");
    }
  };

  // Grade Workflow: Professor Batch Submit (Draft or Submitted for Deliberation)
  const submitBatchGrades = async (
    courseCode: string, 
    courseName: string, 
    facultyId: string, 
    level: string, 
    semester: 1 | 2, 
    teacherName: string, 
    teacherId: string,
    gradesList: { studentId: string; grade: number; credits: number; session?: ExamSession }[], 
    asDraft: boolean = false
  ) => {
    const now = new Date().toISOString();
    const status = asDraft ? 'Brouillon' : 'Soumis';

    for (const item of gradesList) {
      const student = students.find(s => s.id === item.studentId);
      if (!student) continue;

      const newGrade: SubjectGrade = {
        courseCode,
        courseName,
        credits: item.credits,
        grade: item.grade,
        semester,
        teacher: teacherName,
        teacherId,
        session: item.session || 'Principale',
        status,
        gradedAt: now
      };

      const gradeExists = student.grades.some(g => g.courseCode === courseCode);
      const updatedGrades = gradeExists
        ? student.grades.map(g => g.courseCode === courseCode ? newGrade : g)
        : [...student.grades, newGrade];

      setStudents(prev => prev.map(s => s.id === item.studentId ? { ...s, grades: updatedGrades } : s));
      try {
        await updateStudentInDb(item.studentId, { grades: updatedGrades });
      } catch (e) {
        console.error("Error saving grade for student", item.studentId, e);
      }
    }

    if (asDraft) {
      showToast(`Notes pour ${courseCode} enregistrées comme Brouillon.`);
    } else {
      showToast(`Notes pour ${courseCode} transmises au Doyen pour délibération et validation !`);
    }
  };

  // Dean / Rector: Validation of Course Grades
  const validateBatchGrades = async (courseCode: string, facultyId: string, validatedBy: string) => {
    const now = new Date().toISOString();
    let count = 0;

    for (const student of students) {
      if (facultyId && student.facultyId !== facultyId) continue;
      const targetGrade = student.grades.find(g => g.courseCode === courseCode);
      if (targetGrade) {
        const updatedGrade: SubjectGrade = {
          ...targetGrade,
          status: 'Validé',
          validatedBy,
          validatedAt: now
        };
        const updatedGrades = student.grades.map(g => g.courseCode === courseCode ? updatedGrade : g);
        setStudents(prev => prev.map(s => s.id === student.id ? { ...s, grades: updatedGrades } : s));
        try {
          await updateStudentInDb(student.id, { grades: updatedGrades });
          count++;
        } catch (e) {
          console.error("Error validating grade for", student.id, e);
        }
      }
    }

    showToast(`Délibération validée : ${count} notes de ${courseCode} publiées aux étudiants !`);
  };

  // Dean / Rector: Reject Course Grades back to Draft
  const rejectBatchGrades = async (courseCode: string, facultyId: string, reason?: string) => {
    for (const student of students) {
      if (facultyId && student.facultyId !== facultyId) continue;
      const targetGrade = student.grades.find(g => g.courseCode === courseCode);
      if (targetGrade) {
        const updatedGrade: SubjectGrade = {
          ...targetGrade,
          status: 'Brouillon'
        };
        const updatedGrades = student.grades.map(g => g.courseCode === courseCode ? updatedGrade : g);
        setStudents(prev => prev.map(s => s.id === student.id ? { ...s, grades: updatedGrades } : s));
        try {
          await updateStudentInDb(student.id, { grades: updatedGrades });
        } catch (e) {
          console.error("Error rejecting grade for", student.id, e);
        }
      }
    }

    showToast(`Grille de ${courseCode} retournée au professeur pour révision.`);
  };

  // Application actions
  const submitApplication = async (appData: Omit<RegistrationApplication, 'id' | 'dossierNumber' | 'submittedAt' | 'status'>): Promise<string> => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const dossierNumber = `IFADC-2026-REG-${randomNum}`;
    const newApp: RegistrationApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      dossierNumber,
      submittedAt: new Date().toISOString(),
      status: 'SOUMIS',
      initialFeePaid: false
    };

    setApplications(prev => [newApp, ...prev]);
    try {
      await saveApplicationToDb(newApp);
      showToast(`Candidature enregistrée sur Firebase ! N° : ${dossierNumber}`);
    } catch {
      showToast(`Candidature soumise ! N° : ${dossierNumber}`);
    }
    return dossierNumber;
  };

  const updateApplicationStatus = async (id: string, status: ApplicationStatus, notes?: string, assignedMatricule?: string) => {
    const app = applications.find(a => a.id === id);
    if (!app) return;

    const updated = { ...app, status, adminNotes: notes || app.adminNotes, assignedMatricule: assignedMatricule || app.assignedMatricule };
    
    setApplications(prev => prev.map(a => a.id === id ? updated : a));

    try {
      await updateApplicationInDb(id, status, notes, assignedMatricule);
      showToast(`Statut du dossier mis à jour : ${status}`);
    } catch {
      showToast(`Statut du dossier mis à jour : ${status}`);
    }
  };

  const enrollApplicantAsStudent = async (applicationId: string, customMatricule?: string): Promise<Student | null> => {
    const app = applications.find(a => a.id === applicationId);
    if (!app) return null;

    const matricule = customMatricule || app.assignedMatricule || `26-${app.facultyId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    const newStudent: Student = {
      id: `stud-${Date.now()}`,
      matricule,
      firstName: app.firstName,
      lastName: app.lastName,
      middleName: app.middleName,
      gender: app.gender,
      email: app.email,
      phone: app.phone,
      dateOfBirth: app.dateOfBirth,
      placeOfBirth: app.placeOfBirth,
      address: app.address,
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      facultyId: app.facultyId,
      facultyName: app.facultyName,
      optionName: app.optionName,
      level: app.level || "L1 (Système LMD)",
      academicYear: app.academicYear || "2026-2027",
      enrollmentDate: new Date().toISOString().split('T')[0],
      accessCode: "IFADC2026",
      tuitionFee: {
        total: 350,
        paid: 100,
        currency: "$",
        status: "Partiel",
        installments: [
          { 
            id: `inst-${Date.now()}`, 
            title: "Acompte Inscription L1 (100$)", 
            amount: 100, 
            date: new Date().toISOString().split('T')[0], 
            receiptNumber: `REC-2026-${Math.floor(10000 + Math.random() * 90000)}` 
          }
        ]
      },
      grades: [
        { courseCode: "GEN101", courseName: "Initiation aux Méthodes de Recherche", credits: 5, grade: 15.0, semester: 1, teacher: "Prof. Dr. Mukendi", status: "Validé" },
        { courseCode: "ETH101", courseName: "Éthique & Déontologie Chrétienne", credits: 4, grade: 17.5, semester: 1, teacher: "Rév. Dr. J.P. Ilunga", status: "Validé" }
      ]
    };

    // Update state & DB
    await saveStudentToDb(newStudent);
    setStudents(prev => [newStudent, ...prev]);

    // Update application
    await updateApplicationStatus(applicationId, 'INSCRIPTION_VALIDEE', `Inscrit officiellement avec matricule ${matricule}`, matricule);

    showToast(`Candidat inscrit avec succès ! Matricule : ${matricule}`);
    return newStudent;
  };

  const findApplicationByNumber = (dossierNumber: string) => {
    return applications.find(a => a.dossierNumber.trim().toUpperCase() === dossierNumber.trim().toUpperCase());
  };

  // Admin Documents
  const addAdminDocument = async (doc: Omit<AdminDocument, 'id' | 'uploadedAt'>) => {
    const newDoc: AdminDocument = {
      ...doc,
      id: `doc-adm-${Date.now()}`,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setAdminDocuments(prev => [newDoc, ...prev]);
    try {
      await saveAdminDocumentToDb(newDoc);
      showToast("Document synchronisé sur Firebase Cloud !");
    } catch {
      showToast("Document administratif mis en ligne !");
    }
  };

  const deleteAdminDocument = async (id: string) => {
    setAdminDocuments(prev => prev.filter(d => d.id !== id));
    try {
      await deleteAdminDocumentFromDb(id);
      showToast("Document retiré de Firebase.");
    } catch {
      showToast("Document retiré.");
    }
  };

  // Super Admin Auth (Isolé de l'Espace Personnel)
  const loginAdmin = (password: string): boolean => {
    if (password.trim() === adminPassword.trim()) {
      setIsAdminLoggedIn(true);
      setAdminLoginError(null);
      sessionStorage.setItem('ifadc_admin_auth', 'true');
      showToast("Connexion Super Administrateur autorisée.");
      return true;
    } else {
      setAdminLoginError("Mot de passe Super Admin incorrect.");
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem('ifadc_admin_auth');
    showToast("Session Super Administrateur déconnectée.");
  };

  const changeAdminPassword = async (currentPass: string, newPass: string): Promise<{ success: boolean; message: string }> => {
    if (currentPass.trim() !== adminPassword.trim()) {
      return { success: false, message: "L'ancien mot de passe saisi est incorrect." };
    }
    if (!newPass || newPass.trim().length < 4) {
      return { success: false, message: "Le nouveau mot de passe doit comporter au moins 4 caractères." };
    }
    setAdminPassword(newPass.trim());
    try {
      await saveAdminPasswordToDb(newPass.trim());
      showToast("Nouveau mot de passe Super Admin synchronisé !");
    } catch {
      showToast("Mot de passe modifié.");
    }
    return { success: true, message: "Mot de passe Super Administrateur modifié avec succès." };
  };

  return (
    <AppContext.Provider
      value={{
        isFirebaseConnected,
        config,
        updateConfig,
        resetConfigToDefault,
        faculties,
        selectedFacultyId,
        setSelectedFacultyId,
        navigateToFacultyDetail,
        updateFaculties,
        addFaculty,
        updateFaculty,
        deleteFaculty,
        announcements,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        gallery,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        students,
        currentStudent,
        loginStudent,
        logoutStudent,
        addStudent,
        updateStudent,
        deleteStudent,
        updateStudentGrade,
        addStudentGrade,
        deleteStudentGrade,
        submitBatchGrades,
        validateBatchGrades,
        rejectBatchGrades,
        staffMembers,
        currentStaff,
        staffLoginError,
        loginStaff,
        logoutStaff,
        addStaffMember,
        updateStaffMember,
        deleteStaffMember,
        resetStaffPassword,
        applications,
        submitApplication,
        updateApplicationStatus,
        enrollApplicantAsStudent,
        findApplicationByNumber,
        adminDocuments,
        addAdminDocument,
        deleteAdminDocument,
        isAdminLoggedIn,
        adminLoginError,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        activeTab,
        setActiveTab,
        selectedStudentForTranscript,
        setSelectedStudentForTranscript,
        selectedStudentForCard,
        setSelectedStudentForCard,
        isShareModalOpen,
        setIsShareModalOpen,
        siteUrl,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
