import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  writeBatch 
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { 
  InstituteConfig, 
  Faculty, 
  Student, 
  RegistrationApplication, 
  AdminDocument, 
  Announcement, 
  ApplicationStatus,
  StaffMember,
  GalleryItem
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

// Firestore collection names
export const COLLECTIONS = {
  CONFIG: 'config',
  FACULTIES: 'faculties',
  ANNOUNCEMENTS: 'announcements',
  STUDENTS: 'students',
  APPLICATIONS: 'applications',
  DOCUMENTS: 'documents',
  STAFF: 'staff',
  GALLERY: 'gallery',
  SETTINGS: 'settings'
};

// Seed initial data into Firestore if empty
export async function seedInitialFirestoreData(): Promise<void> {
  try {
    // 1. Check & Seed Config
    const configDocRef = doc(db, COLLECTIONS.CONFIG, 'institute_config');
    const configSnap = await getDoc(configDocRef);
    if (!configSnap.exists()) {
      await setDoc(configDocRef, initialInstituteConfig);
    }

    // 2. Check & Seed Faculties
    const facultiesCol = collection(db, COLLECTIONS.FACULTIES);
    const facultiesSnap = await getDocs(facultiesCol);
    if (facultiesSnap.empty) {
      const batch = writeBatch(db);
      for (const f of initialFaculties) {
        batch.set(doc(db, COLLECTIONS.FACULTIES, f.id), f);
      }
      await batch.commit();
    }

    // 3. Check & Seed Announcements
    const annCol = collection(db, COLLECTIONS.ANNOUNCEMENTS);
    const annSnap = await getDocs(annCol);
    if (annSnap.empty) {
      const batch = writeBatch(db);
      for (const a of initialAnnouncements) {
        batch.set(doc(db, COLLECTIONS.ANNOUNCEMENTS, a.id), a);
      }
      await batch.commit();
    }

    // 4. Check & Seed Students
    const studentsCol = collection(db, COLLECTIONS.STUDENTS);
    const studentsSnap = await getDocs(studentsCol);
    if (studentsSnap.empty) {
      const batch = writeBatch(db);
      for (const s of initialStudents) {
        batch.set(doc(db, COLLECTIONS.STUDENTS, s.id), s);
      }
      await batch.commit();
    }

    // 5. Check & Seed Applications
    const appsCol = collection(db, COLLECTIONS.APPLICATIONS);
    const appsSnap = await getDocs(appsCol);
    if (appsSnap.empty) {
      const batch = writeBatch(db);
      for (const app of initialApplications) {
        batch.set(doc(db, COLLECTIONS.APPLICATIONS, app.id), app);
      }
      await batch.commit();
    }

    // 6. Check & Seed Admin Documents
    const docsCol = collection(db, COLLECTIONS.DOCUMENTS);
    const docsSnap = await getDocs(docsCol);
    if (docsSnap.empty) {
      const batch = writeBatch(db);
      for (const d of initialAdminDocuments) {
        batch.set(doc(db, COLLECTIONS.DOCUMENTS, d.id), d);
      }
      await batch.commit();
    }

    // 7. Check & Seed Staff Members
    const staffCol = collection(db, COLLECTIONS.STAFF);
    const staffSnap = await getDocs(staffCol);
    if (staffSnap.empty) {
      const batch = writeBatch(db);
      for (const s of initialStaffMembers) {
        batch.set(doc(db, COLLECTIONS.STAFF, s.id), s);
      }
      await batch.commit();
    }

    // 8. Check & Seed Gallery Items
    const galleryCol = collection(db, COLLECTIONS.GALLERY);
    const gallerySnap = await getDocs(galleryCol);
    if (gallerySnap.empty) {
      const batch = writeBatch(db);
      for (const g of initialGallery) {
        batch.set(doc(db, COLLECTIONS.GALLERY, g.id), g);
      }
      await batch.commit();
    }

    // 9. Check & Seed Admin Auth Settings
    const authDocRef = doc(db, COLLECTIONS.SETTINGS, 'admin_auth');
    const authSnap = await getDoc(authDocRef);
    if (!authSnap.exists()) {
      await setDoc(authDocRef, { password: '3435', updatedAt: new Date().toISOString() });
    }
  } catch (err) {
    console.error('Error seeding initial Firestore data:', err);
  }
}

// Config Operations
export async function saveInstituteConfigToDb(newConfig: Partial<InstituteConfig>): Promise<void> {
  const configDocRef = doc(db, COLLECTIONS.CONFIG, 'institute_config');
  await setDoc(configDocRef, newConfig, { merge: true });
}

// Faculty Operations
export async function saveFacultyToDb(faculty: Faculty): Promise<void> {
  const facultyRef = doc(db, COLLECTIONS.FACULTIES, faculty.id);
  await setDoc(facultyRef, faculty);
}

export async function updateFacultyInDb(facultyId: string, updated: Partial<Faculty>): Promise<void> {
  const facultyRef = doc(db, COLLECTIONS.FACULTIES, facultyId);
  await updateDoc(facultyRef, updated);
}

export async function deleteFacultyFromDb(facultyId: string): Promise<void> {
  const facultyRef = doc(db, COLLECTIONS.FACULTIES, facultyId);
  await deleteDoc(facultyRef);
}

// Announcements / News Operations
export async function saveAnnouncementToDb(ann: Announcement): Promise<void> {
  const annRef = doc(db, COLLECTIONS.ANNOUNCEMENTS, ann.id);
  await setDoc(annRef, ann);
}

export async function updateAnnouncementInDb(annId: string, updated: Partial<Announcement>): Promise<void> {
  const annRef = doc(db, COLLECTIONS.ANNOUNCEMENTS, annId);
  await updateDoc(annRef, updated);
}

export async function deleteAnnouncementFromDb(annId: string): Promise<void> {
  const annRef = doc(db, COLLECTIONS.ANNOUNCEMENTS, annId);
  await deleteDoc(annRef);
}

// Student Operations
export async function saveStudentToDb(student: Student): Promise<void> {
  const studentRef = doc(db, COLLECTIONS.STUDENTS, student.id);
  await setDoc(studentRef, student);
}

export async function updateStudentInDb(studentId: string, updated: Partial<Student>): Promise<void> {
  const studentRef = doc(db, COLLECTIONS.STUDENTS, studentId);
  await updateDoc(studentRef, updated);
}

export async function deleteStudentFromDb(studentId: string): Promise<void> {
  const studentRef = doc(db, COLLECTIONS.STUDENTS, studentId);
  await deleteDoc(studentRef);
}

// Application Operations
export async function saveApplicationToDb(app: RegistrationApplication): Promise<void> {
  const appRef = doc(db, COLLECTIONS.APPLICATIONS, app.id);
  await setDoc(appRef, app);
}

export async function updateApplicationInDb(
  appId: string, 
  status: ApplicationStatus, 
  notes?: string, 
  assignedMatricule?: string
): Promise<void> {
  const appRef = doc(db, COLLECTIONS.APPLICATIONS, appId);
  const updateData: any = { status };
  if (notes !== undefined) updateData.adminNotes = notes;
  if (assignedMatricule !== undefined) updateData.assignedMatricule = assignedMatricule;
  await updateDoc(appRef, updateData);
}

// Admin Documents Operations
export async function saveAdminDocumentToDb(docData: AdminDocument): Promise<void> {
  const docRef = doc(db, COLLECTIONS.DOCUMENTS, docData.id);
  await setDoc(docRef, docData);
}

export async function deleteAdminDocumentFromDb(docId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.DOCUMENTS, docId);
  await deleteDoc(docRef);
}

// Staff Operations
export async function saveStaffMemberToDb(staff: StaffMember): Promise<void> {
  const staffRef = doc(db, COLLECTIONS.STAFF, staff.id);
  await setDoc(staffRef, staff);
}

export async function updateStaffMemberInDb(staffId: string, updated: Partial<StaffMember>): Promise<void> {
  const staffRef = doc(db, COLLECTIONS.STAFF, staffId);
  await updateDoc(staffRef, updated);
}

export async function deleteStaffMemberFromDb(staffId: string): Promise<void> {
  const staffRef = doc(db, COLLECTIONS.STAFF, staffId);
  await deleteDoc(staffRef);
}

// Gallery Operations
export async function saveGalleryItemToDb(item: GalleryItem): Promise<void> {
  const galRef = doc(db, COLLECTIONS.GALLERY, item.id);
  await setDoc(galRef, item);
}

export async function updateGalleryItemInDb(itemId: string, updated: Partial<GalleryItem>): Promise<void> {
  const galRef = doc(db, COLLECTIONS.GALLERY, itemId);
  await updateDoc(galRef, updated);
}

export async function deleteGalleryItemFromDb(itemId: string): Promise<void> {
  const galRef = doc(db, COLLECTIONS.GALLERY, itemId);
  await deleteDoc(galRef);
}

// Admin Auth Password
export async function saveAdminPasswordToDb(newPassword: string): Promise<void> {
  const authDocRef = doc(db, COLLECTIONS.SETTINGS, 'admin_auth');
  await setDoc(authDocRef, { password: newPassword, updatedAt: new Date().toISOString() });
}
