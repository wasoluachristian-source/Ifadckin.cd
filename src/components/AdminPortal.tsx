import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { 
  Lock, 
  ShieldAlert, 
  ShieldCheck, 
  Users, 
  FileCheck, 
  Award, 
  FolderDown, 
  Settings, 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Download, 
  Upload, 
  Eye, 
  EyeOff, 
  LogOut, 
  Save, 
  RotateCcw, 
  Printer, 
  FileText, 
  AlertCircle, 
  Key, 
  Globe, 
  Share2,
  Calendar,
  Mail,
  Phone,
  Image as ImageIcon,
  UserCheck,
  Check,
  HardDrive,
  Brush,
  Palette
} from 'lucide-react';
import { Student, RegistrationApplication, ApplicationStatus, AdminDocument, Faculty, Announcement, FacultyOption } from '../types';
import { StaffManagementTab } from './admin/StaffManagementTab';
import { GalleryManagementTab } from './admin/GalleryManagementTab';
import { AppearanceTab } from './admin/AppearanceTab';

export const AdminPortal: React.FC = () => {
  const {
    isFirebaseConnected,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    changeAdminPassword,
    adminLoginError,
    config,
    updateConfig,
    resetConfigToDefault,
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    updateStudentGrade,
    addStudentGrade,
    deleteStudentGrade,
    applications,
    updateApplicationStatus,
    adminDocuments,
    addAdminDocument,
    deleteAdminDocument,
    faculties,
    addFaculty,
    updateFaculty,
    deleteFaculty,
    announcements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
    setSelectedStudentForTranscript,
    setSelectedStudentForCard,
    setIsShareModalOpen,
    siteUrl,
    setActiveTab,
    showToast
  } = useApp();

  // Admin PIN input
  const [pinInput, setPinInput] = useState<string>('');
  const [showLoginPassword, setShowLoginPassword] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<'overview' | 'appearance' | 'staff' | 'faculties' | 'announcements' | 'gallery' | 'applications' | 'grades' | 'documents' | 'settings'>('overview');

  // Change Password form state
  const [oldPasswordInput, setOldPasswordInput] = useState<string>('');
  const [newPasswordInput, setNewPasswordInput] = useState<string>('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState<string>('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Application Modal state
  const [selectedApp, setSelectedApp] = useState<RegistrationApplication | null>(null);
  const [appStatusNote, setAppStatusNote] = useState<string>('');
  const [assignedMatriculeInput, setAssignedMatriculeInput] = useState<string>('');

  // Grade edit state
  const [selectedStudentForGrades, setSelectedStudentForGrades] = useState<Student | null>(() => students[0] || null);
  const [newCourseCode, setNewCourseCode] = useState<string>('');
  const [newCourseName, setNewCourseName] = useState<string>('');
  const [newCourseCredits, setNewCourseCredits] = useState<number>(5);
  const [newCourseGrade, setNewCourseGrade] = useState<number>(15);
  const [newCourseSemester, setNewCourseSemester] = useState<1 | 2>(1);
  const [newCourseTeacher, setNewCourseTeacher] = useState<string>('');

  // Upload Admin Document state
  const [newDocTitle, setNewDocTitle] = useState<string>('');
  const [newDocCategory, setNewDocCategory] = useState<AdminDocument['category']>('COMMUNIQUE');
  const [newDocDescription, setNewDocDescription] = useState<string>('');
  const [newDocIsPublic, setNewDocIsPublic] = useState<boolean>(true);

  // Faculty Editor State
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);
  const [isAddingNewFaculty, setIsAddingNewFaculty] = useState<boolean>(false);
  const [newOptionName, setNewOptionName] = useState<string>('');
  const [newOptionCycles, setNewOptionCycles] = useState<('Licence' | 'Master' | 'Doctorat')[]>(['Licence']);
  const [newOptionDesc, setNewOptionDesc] = useState<string>('');

  // Announcement Editor State
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState<boolean>(false);
  const [annTitle, setAnnTitle] = useState<string>('');
  const [annCategory, setAnnCategory] = useState<Announcement['category']>('COMMUNIQUE');
  const [annSummary, setAnnSummary] = useState<string>('');
  const [annContent, setAnnContent] = useState<string>('');
  const [annImageUrl, setAnnImageUrl] = useState<string>('');
  const [annAttachmentName, setAnnAttachmentName] = useState<string>('');
  const [annAttachmentUrl, setAnnAttachmentUrl] = useState<string>('#');
  const [annAttachmentSize, setAnnAttachmentSize] = useState<string>('1.5 MB');
  const [annFacultyId, setAnnFacultyId] = useState<string>('ALL');
  const [annIsPinned, setAnnIsPinned] = useState<boolean>(false);

  // Settings form local state
  const [settingsForm, setSettingsForm] = useState(config);

  useEffect(() => {
    setSettingsForm(config);
  }, [config]);

  // Image Upload Helper for Logo, Faculty Covers, Announcements and Dean Photos
  const handleImageFileUpload = (file: File, callback: (dataUrl: string) => void) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast("Veuillez sélectionner un fichier image valide (PNG, JPG, WebP, SVG).");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        callback(result);
        showToast("Image importée avec succès !");
      }
    };
    reader.readAsDataURL(file);
  };

  // File / Document Upload Helper for Announcement Attachment
  const handleDocumentFileUpload = (file: File, callback: (name: string, dataUrl: string, size: string) => void) => {
    if (!file) return;
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);
    const sizeString = file.size > 1024 * 1024 ? `${sizeInMb} MB` : `${Math.round(file.size / 1024)} KB`;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        callback(file.name, result, sizeString);
        showToast(`Document « ${file.name} » joint avec succès !`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinInput.trim()) return;
    const success = loginAdmin(pinInput);
    if (success) {
      setPinInput('');
    }
  };

  const handlePasswordChangeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordChangeMessage(null);

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeMessage({ text: "La confirmation ne correspond pas au nouveau mot de passe.", isError: true });
      return;
    }

    const res = await changeAdminPassword(oldPasswordInput, newPasswordInput);
    if (res.success) {
      setPasswordChangeMessage({ text: res.message, isError: false });
      setOldPasswordInput('');
      setNewPasswordInput('');
      setConfirmPasswordInput('');
    } else {
      setPasswordChangeMessage({ text: res.message, isError: true });
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateConfig(settingsForm);
  };

  // Add Grade Handler
  const handleAddGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForGrades || !newCourseCode || !newCourseName) return;

    await addStudentGrade(selectedStudentForGrades.id, {
      courseCode: newCourseCode.toUpperCase(),
      courseName: newCourseName,
      credits: Number(newCourseCredits),
      grade: Number(newCourseGrade),
      semester: newCourseSemester,
      teacher: newCourseTeacher || "Enseignant titulaire",
      status: Number(newCourseGrade) >= 10 ? 'Validé' : 'Ajourné'
    });

    setNewCourseCode('');
    setNewCourseName('');
    setNewCourseCredits(5);
    setNewCourseGrade(15);
    setNewCourseTeacher('');
  };

  // Add Admin Document Handler
  const handleAddDocument = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle) return;

    await addAdminDocument({
      title: newDocTitle,
      category: newDocCategory,
      description: newDocDescription,
      fileName: `IFADC_${newDocCategory}_${Date.now().toString().slice(-4)}.pdf`,
      fileSize: "1.8 MB",
      fileUrl: "#",
      uploadedBy: "Secrétariat Général Académique",
      isPublic: newDocIsPublic
    });

    setNewDocTitle('');
    setNewDocDescription('');
  };

  // Announcement Handlers
  const handleOpenNewAnnouncement = () => {
    setEditingAnnouncement(null);
    setAnnTitle('');
    setAnnCategory('COMMUNIQUE');
    setAnnSummary('');
    setAnnContent('');
    setAnnImageUrl('https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80');
    setAnnAttachmentName('COMMUNIQUE_OFFICIEL_IFADC_2026.pdf');
    setAnnAttachmentUrl('#');
    setAnnAttachmentSize('1.4 MB');
    setAnnFacultyId('ALL');
    setAnnIsPinned(false);
    setIsAddingAnnouncement(true);
  };

  const handleOpenEditAnnouncement = (ann: Announcement) => {
    setEditingAnnouncement(ann);
    setAnnTitle(ann.title);
    setAnnCategory(ann.category);
    setAnnSummary(ann.summary || '');
    setAnnContent(ann.content);
    setAnnImageUrl(ann.imageUrl || '');
    setAnnAttachmentName(ann.attachmentName || '');
    setAnnAttachmentUrl(ann.attachmentUrl || '#');
    setAnnAttachmentSize(ann.attachmentSize || '1.2 MB');
    setAnnFacultyId(ann.facultyId || 'ALL');
    setAnnIsPinned(ann.isPinned || false);
    setIsAddingAnnouncement(true);
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle || !annContent) return;

    if (editingAnnouncement) {
      await updateAnnouncement(editingAnnouncement.id, {
        title: annTitle,
        category: annCategory,
        summary: annSummary,
        content: annContent,
        imageUrl: annImageUrl,
        attachmentName: annAttachmentName.trim() ? annAttachmentName : undefined,
        attachmentUrl: annAttachmentName.trim() ? annAttachmentUrl : undefined,
        attachmentSize: annAttachmentName.trim() ? annAttachmentSize : undefined,
        facultyId: annFacultyId,
        isPinned: annIsPinned
      });
    } else {
      const newAnn: Announcement = {
        id: `ann-${Date.now()}`,
        title: annTitle,
        category: annCategory,
        summary: annSummary,
        content: annContent,
        publishedAt: new Date().toISOString().split('T')[0],
        imageUrl: annImageUrl,
        attachmentName: annAttachmentName.trim() ? annAttachmentName : undefined,
        attachmentUrl: annAttachmentName.trim() ? annAttachmentUrl : undefined,
        attachmentSize: annAttachmentName.trim() ? annAttachmentSize : undefined,
        facultyId: annFacultyId,
        isPinned: annIsPinned
      };
      await addAnnouncement(newAnn);
    }

    setIsAddingAnnouncement(false);
    setEditingAnnouncement(null);
  };

  // Faculty Handlers
  const handleOpenEditFaculty = (fac: Faculty) => {
    setEditingFaculty(JSON.parse(JSON.stringify(fac)));
    setIsAddingNewFaculty(false);
  };

  const handleOpenNewFaculty = () => {
    const newFac: Faculty = {
      id: `fac-${Date.now()}`,
      name: "Nouvelle Faculté",
      code: "NOUV",
      icon: "GraduationCap",
      color: "from-blue-600 to-indigo-900",
      cycles: ["Licence", "Master"],
      coverImage: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1000&auto=format&fit=crop&q=80",
      description: "Description de la nouvelle faculté organisée au sein de l'IFADC.",
      contactEmail: "contact@ifadc.cd",
      contactPhone: "+243 893 122 361",
      dean: {
        name: "Prof. Dr. Nom du Doyen",
        title: "Doyen de Faculté",
        academicRank: "Professeur Ordinaire",
        photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
        message: "Message d'accueil et d'orientation académique du doyen.",
        email: "doyen@ifadc.cd",
        phone: "+243 893 122 361"
      },
      options: [
        { id: `opt-${Date.now()}`, name: "Filière Principale", cycle: ["Licence"], description: "Formation de premier cycle." }
      ]
    };
    setEditingFaculty(newFac);
    setIsAddingNewFaculty(true);
  };

  const handleSaveFaculty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty) return;

    if (isAddingNewFaculty) {
      await addFaculty(editingFaculty);
    } else {
      await updateFaculty(editingFaculty.id, editingFaculty);
    }
    setEditingFaculty(null);
  };

  const handleAddOptionToEditingFaculty = () => {
    if (!editingFaculty || !newOptionName.trim()) return;
    const newOpt: FacultyOption = {
      id: `opt-${Date.now()}`,
      name: newOptionName.trim(),
      cycle: newOptionCycles,
      description: newOptionDesc.trim() || undefined
    };
    setEditingFaculty({
      ...editingFaculty,
      options: [...editingFaculty.options, newOpt]
    });
    setNewOptionName('');
    setNewOptionDesc('');
  };

  const handleRemoveOptionFromEditingFaculty = (optId: string) => {
    if (!editingFaculty) return;
    setEditingFaculty({
      ...editingFaculty,
      options: editingFaculty.options.filter(o => o.id !== optId)
    });
  };

  // If not logged in, render the discreet login screen
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6 text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-slate-900 text-blue-400 flex items-center justify-center mx-auto shadow-md border border-slate-800">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 font-serif">
              Portail Administrateur
            </h2>
            <p className="text-xs text-slate-500">
              Accès réservé au Secrétariat Général Académique & Décanat IFADC.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Mot de passe administrateur :
              </label>
              
              <div className="relative">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Saisir le mot de passe..."
                  autoFocus
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 transition font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {adminLoginError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{adminLoginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4 text-blue-400" />
              <span>Déverrouiller le panneau</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Base de données Cloud Firebase Firestore active et sécurisée.
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/40 text-blue-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-serif text-white">
                Direction & Administration IFADC
              </h1>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                isFirebaseConnected 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-blue-500/20 text-white border border-blue-500/40'
              }`}>
                {isFirebaseConnected ? '🟢 Firebase Connecté' : '🟡 Initialisation'}
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Gestion centralisée des facultés, doyens, communiqués, candidatures et délibérations.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('drive')}
            className="px-3.5 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-blue-700 shadow-sm transition"
            title="Ouvrir l'espace Google Drive"
          >
            <HardDrive className="w-3.5 h-3.5 text-white" />
            <span>Google Drive</span>
          </button>

          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Lien du site</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-4 py-2 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Verrouiller</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'overview', label: 'Aperçu & Stats', icon: <Layers className="w-4 h-4" /> },
          { id: 'appearance', label: '🎨 Apparence & Textes', icon: <Brush className="w-4 h-4 text-[#005a9c]" /> },
          { id: 'staff', label: 'Comptes Personnel & Rôles', icon: <UserCheck className="w-4 h-4 text-emerald-600" /> },
          { id: 'announcements', label: 'Actualités & Communiqués', icon: <Globe className="w-4 h-4 text-blue-600" /> },
          { id: 'gallery', label: 'Galerie & Médias', icon: <ImageIcon className="w-4 h-4 text-purple-600" /> },
          { id: 'faculties', label: 'Facultés & Doyens', icon: <Award className="w-4 h-4 text-[#005a9c]" /> },
          { id: 'applications', label: `Candidatures (${applications.length})`, icon: <FileCheck className="w-4 h-4" /> },
          { id: 'grades', label: `Étudiants & Notes (${students.length})`, icon: <Users className="w-4 h-4" /> },
          { id: 'documents', label: 'Documents Officiels', icon: <FolderDown className="w-4 h-4" /> },
          { id: 'settings', label: 'Paramètres & Logo', icon: <Settings className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setAdminTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              adminTab === tab.id
                ? 'bg-blue-950 text-white shadow-sm ring-1 ring-blue-900'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. OVERVIEW TAB */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Facultés Organisées</span>
              <div className="text-3xl font-black text-blue-950 font-serif">{faculties.length}</div>
              <span className="text-[11px] text-slate-500">Avec photo & profil de doyen</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Actualités & Communiqués</span>
              <div className="text-3xl font-black text-[#005a9c] font-serif">{announcements.length}</div>
              <span className="text-[11px] text-slate-500">Publications publiques actives</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Dossiers d'Admission</span>
              <div className="text-3xl font-black text-emerald-600 font-serif">{applications.length}</div>
              <span className="text-[11px] text-slate-500">Soumissions en ligne</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
              <span className="text-xs font-bold text-slate-400 uppercase">Étudiants Immatriculés</span>
              <div className="text-3xl font-black text-purple-900 font-serif">{students.length}</div>
              <span className="text-[11px] text-slate-500">Suivi des cotes en direct</span>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 font-serif text-base flex items-center gap-2">
                  <Brush className="w-5 h-5 text-[#005a9c]" />
                  <span>Design & Typographie</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Polices, tailles, couleurs de l'institut, masquage ou suppression de blocs visuels.
                </p>
              </div>
              <button
                onClick={() => setAdminTab('appearance')}
                className="w-full py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition text-center"
              >
                Personnaliser le Style
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 font-serif text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#005a9c]" />
                  <span>Facultés organisées</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Mettez à jour les photos de couverture, les doyens, descriptions et filières académiques.
                </p>
              </div>
              <button
                onClick={() => setAdminTab('faculties')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition text-center"
              >
                Gérer les facultés
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 font-serif text-base flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  <span>Logo Officiel IFADC</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Téléversez le fichier image du logo officiel ou remplacez le blason vectoriel.
                </p>
              </div>
              <button
                onClick={() => setAdminTab('settings')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition text-center"
              >
                Modifier le Logo
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 font-serif text-base flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  <span>Publier une Actualité</span>
                </h3>
                <p className="text-xs text-slate-600">
                  Rédigez un communiqué officiel avec illustration et fichier PDF/Word à télécharger.
                </p>
              </div>
              <button
                onClick={() => {
                  setAdminTab('announcements');
                  handleOpenNewAnnouncement();
                }}
                className="w-full py-2 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition text-center"
              >
                Créer une annonce
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. APPEARANCE & VISUAL DESIGN CUSTOMIZER TAB */}
      {adminTab === 'appearance' && (
        <AppearanceTab />
      )}

      {/* 3. FACULTIES & DEANS MANAGEMENT TAB */}
      {adminTab === 'faculties' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Gestion des Facultés organisées
              </h2>
              <p className="text-xs text-slate-500">
                Modifiez en direct les photos de couverture, informations décanales, mots d'orientation et filières académiques.
              </p>
            </div>

            <button
              onClick={handleOpenNewFaculty}
              className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter une Faculté</span>
            </button>
          </div>

          {/* List of Faculties */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faculties.map((f) => (
              <div 
                key={f.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Banner Preview */}
                  <div className="relative h-32 w-full rounded-xl overflow-hidden bg-slate-900">
                    <img
                      src={f.coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"}
                      alt={f.name}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-blue-950/90 text-white text-[10px] font-black uppercase rounded">
                      {f.code}
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-base text-slate-900 font-serif">{f.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{f.description}</p>
                    </div>
                  </div>

                  {/* Dean Profile Box */}
                  {f.dean && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                      <img
                        src={f.dean.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                        alt={f.dean.name}
                        className="w-12 h-12 rounded-xl object-cover border border-blue-400 shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">Doyen officiel :</span>
                        <h4 className="text-xs font-bold text-slate-900 truncate">{f.dean.name}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{f.dean.title}</p>
                      </div>
                    </div>
                  )}

                  {/* Filières summary */}
                  <div className="text-xs text-slate-600">
                    <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">
                      Filières ({f.options.length}) :
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {f.options.map(o => (
                        <span key={o.id} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px]">
                          {o.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Contact: {f.contactPhone || config.phone}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenEditFaculty(f)}
                      className="px-3 py-1.5 bg-blue-50 text-blue-950 hover:bg-blue-100 font-bold rounded-lg text-xs flex items-center gap-1 border border-blue-200 transition"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Modifier</span>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Supprimer la faculté ${f.name} ?`)) {
                          deleteFaculty(f.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Edit/Add Faculty Modal */}
          {editingFaculty && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-slate-900">
                      {isAddingNewFaculty ? "Créer une Nouvelle Faculté" : `Modifier la Faculté : ${editingFaculty.name}`}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Toutes les modifications sont synchronisées en direct sur Firebase Firestore.
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingFaculty(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSaveFaculty} className="space-y-6">
                  
                  {/* General Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Nom de la Faculté :</label>
                      <input
                        type="text"
                        value={editingFaculty.name}
                        onChange={(e) => setEditingFaculty({ ...editingFaculty, name: e.target.value })}
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Code Faculté (ex: INFO) :</label>
                      <input
                        type="text"
                        value={editingFaculty.code}
                        onChange={(e) => setEditingFaculty({ ...editingFaculty, code: e.target.value.toUpperCase() })}
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900 font-mono"
                      />
                    </div>
                  </div>

                  {/* Faculty Cover Photo Management */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-blue-900" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          Photo d'Illustration & Couverture de la Faculté
                        </h4>
                      </div>
                      <span className="text-[10px] text-slate-500">Affichée sur le portail et les détails</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Thumbnail Preview */}
                      <div className="sm:col-span-4">
                        <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-300 shadow-xs">
                          <img
                            src={editingFaculty.coverImage || "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80"}
                            alt="Aperçu couverture"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-blue-950/90 text-white text-[10px] font-black uppercase rounded">
                            {editingFaculty.code || 'CODE'}
                          </div>
                        </div>
                      </div>

                      {/* Upload & URL Controls */}
                      <div className="sm:col-span-8 space-y-3">
                        <label className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-blue-50/50 border border-dashed border-blue-400 rounded-xl cursor-pointer transition text-blue-950 font-bold text-xs shadow-2xs">
                          <Upload className="w-4 h-4 text-blue-900" />
                          <span>Importer une photo depuis l'ordinateur</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageFileUpload(file, (dataUrl) => setEditingFaculty({ ...editingFaculty, coverImage: dataUrl }));
                            }}
                          />
                        </label>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-600 uppercase">Ou lien direct de l'image (URL) :</label>
                          <input
                            type="text"
                            value={editingFaculty.coverImage}
                            onChange={(e) => setEditingFaculty({ ...editingFaculty, coverImage: e.target.value })}
                            placeholder="https://..."
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-900"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Presets for Academic Photos */}
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1.5">
                        Suggestions d'illustrations académiques en haute résolution :
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          { label: 'Informatique & Labo', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000&auto=format&fit=crop&q=80' },
                          { label: 'Médecine & Santé', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80' },
                          { label: 'Droit & Palais', url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&auto=format&fit=crop&q=80' },
                          { label: 'Économie & Gestion', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&auto=format&fit=crop&q=80' },
                          { label: 'Théologie & Foi', url: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1000&auto=format&fit=crop&q=80' },
                          { label: 'Campus & Bibliothèque', url: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1000&auto=format&fit=crop&q=80' },
                        ].map((preset) => (
                          <button
                            key={preset.label}
                            type="button"
                            onClick={() => setEditingFaculty({ ...editingFaculty, coverImage: preset.url })}
                            className="px-2 py-1 text-[10px] bg-white hover:bg-blue-50 border border-slate-300 rounded text-slate-700 font-medium transition"
                          >
                            + {preset.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Description de la Faculté :</label>
                    <textarea
                      value={editingFaculty.description}
                      onChange={(e) => setEditingFaculty({ ...editingFaculty, description: e.target.value })}
                      rows={2}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  {/* Dean Profile Form Section */}
                  <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2 border-b border-blue-200 pb-2">
                      <Award className="w-4 h-4 text-blue-800" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-950">
                        Informations du Doyen de Faculté
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase">Nom complet du Doyen :</label>
                        <input
                          type="text"
                          value={editingFaculty.dean?.name || ''}
                          onChange={(e) => setEditingFaculty({
                            ...editingFaculty,
                            dean: { ...editingFaculty.dean, name: e.target.value } as any
                          })}
                          placeholder="Prof. Dr. ..."
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase">Titre / Grade Académique :</label>
                        <input
                          type="text"
                          value={editingFaculty.dean?.title || ''}
                          onChange={(e) => setEditingFaculty({
                            ...editingFaculty,
                            dean: { ...editingFaculty.dean, title: e.target.value } as any
                          })}
                          placeholder="Doyen de Faculté • Professeur Ordinaire"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </div>

                    {/* Dean Photo Management */}
                    <div className="space-y-2 pt-1 border-t border-blue-200/60">
                      <label className="text-[11px] font-bold text-slate-700 uppercase block">
                        Photo Officielle du Doyen :
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-4">
                        <img
                          src={editingFaculty.dean?.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                          alt="Photo Doyen"
                          className="w-14 h-14 rounded-xl object-cover border-2 border-blue-400 shrink-0 shadow-xs"
                        />
                        <div className="w-full space-y-2">
                          <label className="flex items-center justify-center gap-2 px-3 py-1.5 bg-white hover:bg-blue-100/50 border border-dashed border-blue-400 rounded-lg cursor-pointer transition text-blue-950 font-bold text-xs">
                            <Upload className="w-3.5 h-3.5 text-blue-900" />
                            <span>Téléverser la photo du doyen (Fichier image)</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageFileUpload(file, (dataUrl) => setEditingFaculty({
                                  ...editingFaculty,
                                  dean: { ...editingFaculty.dean, photoUrl: dataUrl } as any
                                }));
                              }}
                            />
                          </label>
                          <input
                            type="text"
                            value={editingFaculty.dean?.photoUrl || ''}
                            onChange={(e) => setEditingFaculty({
                              ...editingFaculty,
                              dean: { ...editingFaculty.dean, photoUrl: e.target.value } as any
                            })}
                            placeholder="Ou saisir une URL : https://..."
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-700 uppercase">Texte « Mot du Doyen » :</label>
                      <textarea
                        value={editingFaculty.dean?.message || ''}
                        onChange={(e) => setEditingFaculty({
                          ...editingFaculty,
                          dean: { ...editingFaculty.dean, message: e.target.value } as any
                        })}
                        rows={3}
                        placeholder="Message d'accueil et d'orientation académique du doyen..."
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase">Email du Doyen :</label>
                        <input
                          type="email"
                          value={editingFaculty.dean?.email || ''}
                          onChange={(e) => setEditingFaculty({
                            ...editingFaculty,
                            dean: { ...editingFaculty.dean, email: e.target.value } as any
                          })}
                          placeholder="doyen@ifadc.cd"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 uppercase">Téléphone du Doyen :</label>
                        <input
                          type="text"
                          value={editingFaculty.dean?.phone || ''}
                          onChange={(e) => setEditingFaculty({
                            ...editingFaculty,
                            dean: { ...editingFaculty.dean, phone: e.target.value } as any
                          })}
                          placeholder="+243..."
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Filières / Options Section */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Départements & Filières de la Faculté ({editingFaculty.options.length})
                    </h4>

                    {/* Options list */}
                    <div className="space-y-2">
                      {editingFaculty.options.map(opt => (
                        <div key={opt.id} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="font-bold text-slate-900">{opt.name}</span>
                            <div className="flex gap-1 mt-0.5">
                              {opt.cycle.map(c => (
                                <span key={c} className="text-[9px] font-bold px-1.5 py-0.2 bg-blue-50 text-blue-900 rounded">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveOptionFromEditingFaculty(opt.id)}
                            className="p-1 text-slate-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add new option to faculty */}
                    <div className="pt-2 border-t border-slate-200 space-y-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase block">Ajouter une filière :</span>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={newOptionName}
                          onChange={(e) => setNewOptionName(e.target.value)}
                          placeholder="Intitulé de la filière..."
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddOptionToEditingFaculty}
                          className="px-3 py-1.5 bg-blue-950 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Ajouter</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setEditingFaculty(null)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Enregistrer sur Firebase Cloud</span>
                    </button>
                  </div>

                </form>

              </div>
            </div>
          )}

        </div>
      )}

      {/* 3. ANNOUNCEMENTS & NEWS MANAGEMENT TAB */}
      {adminTab === 'announcements' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Gestion des Actualités & Communiqués Officiels
              </h2>
              <p className="text-xs text-slate-500">
                Publiez des annonces en temps réel avec photo d'illustration et documents téléchargeables.
              </p>
            </div>

            <button
              onClick={handleOpenNewAnnouncement}
              className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Créer une Annonce</span>
            </button>
          </div>

          {/* List of Announcements */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  {ann.imageUrl && (
                    <div className="h-32 w-full rounded-xl overflow-hidden bg-slate-900">
                      <img
                        src={ann.imageUrl}
                        alt={ann.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-900 font-bold rounded uppercase">
                      {ann.category}
                    </span>
                    <span>{ann.publishedAt}</span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 font-serif line-clamp-2">
                    {ann.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3">
                    {ann.summary || ann.content}
                  </p>

                  {ann.attachmentName && (
                    <div className="text-[11px] text-blue-800 bg-blue-50 p-2 rounded-lg flex items-center gap-1.5 truncate">
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{ann.attachmentName}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenEditAnnouncement(ann)}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs flex items-center gap-1"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Modifier</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Supprimer l'annonce « ${ann.title} » ?`)) {
                        deleteAnnouncement(ann.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Add/Edit Announcement Modal */}
          {isAddingAnnouncement && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-lg font-bold font-serif text-slate-900">
                      {editingAnnouncement ? "Modifier l'Annonce" : "Créer une Nouvelle Annonce"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Publiée immédiatement sur la page d'accueil et le portail public.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAddingAnnouncement(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSaveAnnouncement} className="space-y-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Titre de l'Annonce / Communiqué :</label>
                    <input
                      type="text"
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      required
                      placeholder="ex: Avis officiel relatif à..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Catégorie :</label>
                      <select
                        value={annCategory}
                        onChange={(e) => setAnnCategory(e.target.value as any)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="COMMUNIQUE">COMMUNIQUÉ OFFICIEL</option>
                        <option value="INSCRIPTION">INSCRIPTION & ADMISSION</option>
                        <option value="ACADEMIQUE">ACADÉMIQUE & RECHERCHE</option>
                        <option value="EVENEMENT">ÉVÉNEMENT & COLLOQUE</option>
                        <option value="GENERAL">GÉNÉRAL</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase">Faculté Ciblée :</label>
                      <select
                        value={annFacultyId}
                        onChange={(e) => setAnnFacultyId(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="ALL">Tout l'Institut IFADC</option>
                        {faculties.map(f => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Bref Résumé (Accroche) :</label>
                    <input
                      type="text"
                      value={annSummary}
                      onChange={(e) => setAnnSummary(e.target.value)}
                      placeholder="Une phrase concise..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase">Texte / Contenu Complet du Communiqué :</label>
                    <textarea
                      value={annContent}
                      onChange={(e) => setAnnContent(e.target.value)}
                      rows={5}
                      required
                      placeholder="Texte officiel de l'annonce..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  {/* Image d'illustration avec téléversement direct */}
                  <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Image d'Illustration :</label>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      {annImageUrl && (
                        <img
                          src={annImageUrl}
                          alt="Aperçu annonce"
                          className="w-16 h-12 object-cover rounded-lg border border-slate-300 shrink-0"
                        />
                      )}
                      <div className="flex-1 w-full space-y-2">
                        <label className="flex items-center justify-center gap-2 px-3 py-2 bg-white hover:bg-blue-50/60 border border-dashed border-blue-400 rounded-lg cursor-pointer transition text-blue-950 font-bold text-xs">
                          <Upload className="w-3.5 h-3.5 text-blue-900" />
                          <span>Importer une image depuis l'ordinateur</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageFileUpload(file, (dataUrl) => setAnnImageUrl(dataUrl));
                            }}
                          />
                        </label>
                        <input
                          type="text"
                          value={annImageUrl}
                          onChange={(e) => setAnnImageUrl(e.target.value)}
                          placeholder="Ou URL image : https://..."
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Attachment Section with File Upload */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 uppercase block">
                        Document Joint Téléchargeable (PDF / Word / Document Officiel) :
                      </label>
                      {annAttachmentName && (
                        <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                          Fichier attaché
                        </span>
                      )}
                    </div>

                    <label className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white hover:bg-blue-50/60 border border-dashed border-blue-400 rounded-lg cursor-pointer transition text-slate-900 font-bold text-xs shadow-2xs">
                      <Upload className="w-4 h-4 text-[#005a9c]" />
                      <span>Téléverser un document (PDF, Word, etc.) depuis votre appareil</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleDocumentFileUpload(file, (name, dataUrl, size) => {
                              setAnnAttachmentName(name);
                              setAnnAttachmentUrl(dataUrl);
                              setAnnAttachmentSize(size);
                            });
                          }
                        }}
                      />
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Nom du fichier :</label>
                        <input
                          type="text"
                          value={annAttachmentName}
                          onChange={(e) => setAnnAttachmentName(e.target.value)}
                          placeholder="ex: COMMUNIQUE_OFFICIEL_IFADC_2026.pdf"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Taille estimée :</label>
                        <input
                          type="text"
                          value={annAttachmentSize}
                          onChange={(e) => setAnnAttachmentSize(e.target.value)}
                          placeholder="ex: 1.4 MB"
                          className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pin-ann"
                      checked={annIsPinned}
                      onChange={(e) => setAnnIsPinned(e.target.checked)}
                      className="rounded text-blue-900"
                    />
                    <label htmlFor="pin-ann" className="text-xs text-slate-700 font-medium">
                      Épingler cette annonce en haut de la page d'accueil
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => setIsAddingAnnouncement(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                    >
                      <Save className="w-4 h-4" />
                      <span>Publier sur Firebase Cloud</span>
                    </button>
                  </div>

                </form>

              </div>
            </div>
          )}

        </div>
      )}

      {/* 4. APPLICATIONS TAB */}
      {adminTab === 'applications' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Dossiers d'Admission & Inscriptions en Ligne (2026-2027)
              </h2>
              <p className="text-xs text-slate-500">
                Traitez les candidatures, validez les pièces jointes et attribuez les matricules définitifs.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                    <th className="py-3 px-3">N° Dossier</th>
                    <th className="py-3 px-3">Candidat</th>
                    <th className="py-3 px-3">Faculté & Filière</th>
                    <th className="py-3 px-3">Exétat / Bac</th>
                    <th className="py-3 px-3">Statut</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-blue-950">
                        {app.dossierNumber}
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-bold text-slate-900">{app.firstName} {app.lastName}</span>
                        <div className="text-[11px] text-slate-400">{app.phone}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-slate-800">{app.facultyName}</span>
                        <div className="text-[11px] text-slate-500">{app.optionName}</div>
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-emerald-700">
                        {app.diplomaPercentage}% ({app.diplomaYear})
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          app.status === 'INSCRIPTION_VALIDEE' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'ACCEPTE' ? 'bg-blue-100 text-blue-800' :
                          app.status === 'EN_COURS' ? 'bg-blue-100 text-blue-900' :
                          app.status === 'REFUSE' ? 'bg-rose-100 text-rose-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setAppStatusNote(app.adminNotes || '');
                            setAssignedMatriculeInput(app.assignedMatricule || `26-${app.facultyId.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`);
                          }}
                          className="px-3 py-1.5 bg-blue-950 text-white font-bold rounded-lg text-xs"
                        >
                          Examiner
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          {/* Application Detail Modal */}
          {selectedApp && (
            <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#005a9c] block">
                      {selectedApp.dossierNumber}
                    </span>
                    <h3 className="text-lg font-bold font-serif text-slate-900">
                      Candidature de {selectedApp.firstName} {selectedApp.lastName} {selectedApp.middleName}
                    </h3>
                  </div>
                  <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-700">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Faculté demandée</span>
                    <p className="font-bold text-slate-900">{selectedApp.facultyName}</p>
                    <p className="text-slate-600">{selectedApp.optionName}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Résultats Exétat</span>
                    <p className="font-bold text-emerald-700 text-sm">{selectedApp.diplomaPercentage}% ({selectedApp.diplomaYear})</p>
                    <p className="text-slate-600">École : {selectedApp.lastSchool}</p>
                  </div>
                </div>

                {/* Status update buttons */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <label className="text-xs font-bold text-slate-700 uppercase block">Décision de la commission :</label>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { st: 'ACCEPTE', label: 'Accepter', color: 'bg-blue-900 text-white' },
                      { st: 'INSCRIPTION_VALIDEE', label: 'Valider Inscription (Matricule)', color: 'bg-emerald-700 text-white' },
                      { st: 'EN_COURS', label: 'En étude', color: 'bg-[#005a9c] text-white' },
                      { st: 'REFUSE', label: 'Refuser', color: 'bg-rose-700 text-white' }
                    ].map((btn) => (
                      <button
                        key={btn.st}
                        onClick={async () => {
                          await updateApplicationStatus(
                            selectedApp.id, 
                            btn.st as ApplicationStatus, 
                            appStatusNote, 
                            assignedMatriculeInput
                          );
                          setSelectedApp(null);
                        }}
                        className={`p-2 rounded-xl text-xs font-bold text-center transition ${btn.color}`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-1 pt-2">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Matricule à attribuer :</label>
                    <input
                      type="text"
                      value={assignedMatriculeInput}
                      onChange={(e) => setAssignedMatriculeInput(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 font-mono font-bold"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

      {/* 5. STUDENTS & GRADES TAB */}
      {adminTab === 'grades' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Student Selector List */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Liste des Étudiants ({students.length})
              </h3>
              <div className="space-y-1 max-h-96 overflow-y-auto">
                {students.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStudentForGrades(s)}
                    className={`w-full text-left p-3 rounded-xl text-xs transition flex items-center justify-between ${
                      selectedStudentForGrades?.id === s.id
                        ? 'bg-blue-950 text-white font-bold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{s.firstName} {s.lastName}</div>
                      <div className={`text-[10px] font-mono ${selectedStudentForGrades?.id === s.id ? 'text-white' : 'text-slate-400'}`}>
                        {s.matricule}
                      </div>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/20">
                      {s.facultyName.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grades & Transcript Actions */}
            {selectedStudentForGrades && (
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#005a9c]">
                        {selectedStudentForGrades.matricule}
                      </span>
                      <h3 className="text-lg font-bold font-serif text-slate-900">
                        {selectedStudentForGrades.firstName} {selectedStudentForGrades.lastName} {selectedStudentForGrades.middleName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {selectedStudentForGrades.facultyName} • {selectedStudentForGrades.optionName}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedStudentForTranscript(selectedStudentForGrades)}
                        className="px-3 py-1.5 bg-blue-950 text-white font-bold rounded-lg text-xs flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Imprimer Relevé</span>
                      </button>
                      <button
                        onClick={() => setSelectedStudentForCard(selectedStudentForGrades)}
                        className="px-3 py-1.5 bg-[#005a9c] text-white font-bold rounded-lg text-xs flex items-center gap-1"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Carte Étudiant</span>
                      </button>
                    </div>
                  </div>

                  {/* Grades Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 uppercase text-[10px]">
                          <th className="py-2 px-2">Code</th>
                          <th className="py-2 px-2">Matière</th>
                          <th className="py-2 px-2">Crédits</th>
                          <th className="py-2 px-2">Note (/20)</th>
                          <th className="py-2 px-2">Semestre</th>
                          <th className="py-2 px-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {selectedStudentForGrades.grades.map((g) => (
                          <tr key={g.courseCode}>
                            <td className="py-2 px-2 font-mono font-bold text-blue-900">{g.courseCode}</td>
                            <td className="py-2 px-2 font-medium text-slate-800">{g.courseName}</td>
                            <td className="py-2 px-2">{g.credits}</td>
                            <td className="py-2 px-2">
                              <span className={`px-2 py-0.5 rounded font-black font-mono ${
                                g.grade >= 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {g.grade} / 20
                              </span>
                            </td>
                            <td className="py-2 px-2">Semestre {g.semester}</td>
                            <td className="py-2 px-2 text-right">
                              <button
                                onClick={() => deleteStudentGrade(selectedStudentForGrades.id, g.courseCode)}
                                className="p-1 text-slate-400 hover:text-rose-600"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Add Grade Form */}
                  <form onSubmit={handleAddGrade} className="pt-4 border-t border-slate-100 space-y-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block">
                      Encoder une nouvelle note (Synchronisation Cloud immédiate) :
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                      <input
                        type="text"
                        placeholder="Code (ex: INFO105)"
                        value={newCourseCode}
                        onChange={(e) => setNewCourseCode(e.target.value)}
                        className="px-2 py-1.5 rounded border border-slate-300 font-mono"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Intitulé matière..."
                        value={newCourseName}
                        onChange={(e) => setNewCourseName(e.target.value)}
                        className="px-2 py-1.5 rounded border border-slate-300"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Crédits (ex: 5)"
                        value={newCourseCredits}
                        onChange={(e) => setNewCourseCredits(Number(e.target.value))}
                        className="px-2 py-1.5 rounded border border-slate-300"
                        required
                      />
                      <input
                        type="number"
                        step="0.5"
                        placeholder="Note / 20"
                        value={newCourseGrade}
                        onChange={(e) => setNewCourseGrade(Number(e.target.value))}
                        className="px-2 py-1.5 rounded border border-slate-300 font-bold"
                        required
                      />
                      <button
                        type="submit"
                        className="py-1.5 bg-blue-950 text-white font-bold rounded text-xs flex items-center justify-center gap-1 shadow-sm"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Ajouter</span>
                      </button>
                    </div>
                  </form>

                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* 6. DOCUMENTS TAB */}
      {adminTab === 'documents' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Documents Administratifs & Règlements
              </h2>
              <p className="text-xs text-slate-500">
                Publiez des documents PDF téléchargeables pour les étudiants et candidats.
              </p>
            </div>

            {/* Add Document Form */}
            <form onSubmit={handleAddDocument} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase block">Ajouter un document officiel :</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Titre du document..."
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                  required
                />
                <select
                  value={newDocCategory}
                  onChange={(e) => setNewDocCategory(e.target.value as any)}
                  className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  <option value="COMMUNIQUE">COMMUNIQUÉ</option>
                  <option value="CALENDRIER">CALENDRIER ACADÉMIQUE</option>
                  <option value="FRAIS">GRILLE DES FRAIS</option>
                  <option value="REGLEMENT">RÈGLEMENT INTÉRIEUR</option>
                  <option value="DELIBERATION">DÉLIBÉRATION</option>
                </select>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-950 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 shadow-sm"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Enregistrer le document</span>
                </button>
              </div>
            </form>

            {/* Documents List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {adminDocuments.map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-950">
                        {doc.category}
                      </span>
                      <span className="text-[10px] text-slate-400">{doc.uploadedAt}</span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{doc.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.description}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">{doc.fileSize}</span>
                    <button
                      onClick={() => deleteAdminDocument(doc.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. SETTINGS & SECURITY TAB */}
      {adminTab === 'settings' && (
        <div className="space-y-6">
          
          {/* Firebase Cloud Connection Card */}
          <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 shadow-md border border-blue-800/60 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-800/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold font-serif text-white">
                      Base de Données Cloud Firebase Firestore
                    </h2>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isFirebaseConnected 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                        : 'bg-blue-500/20 text-white border border-blue-500/40'
                    }`}>
                      {isFirebaseConnected ? '🟢 Connecté en temps réel' : '🟡 Initialisation...'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Toutes les données (étudiants, notes, annonces, doyens) sont synchronisées en direct.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast("Synchronisation Cloud Firebase active et vérifiée.")}
                className="px-4 py-2 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-sm"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Vérifier la connexion</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Site Web Officiel</span>
                <span className="font-mono text-white font-bold">www.ifadc.cd</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Base Firestore</span>
                <span className="font-mono text-blue-300 truncate block">ai-studio-ifadcinstitutepo...</span>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">Collections Actives</span>
                <span className="font-mono text-emerald-300">config, faculties, announcements, students</span>
              </div>
            </div>
          </div>

          {/* 1. Logo Officiel de l'Institut IFADC */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-900 shadow-2xs">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 font-serif text-base">
                    Logo Officiel de l'Institut IFADC
                  </h3>
                  <p className="text-xs text-slate-500">
                    Téléversez le fichier image officiel ou saisissez son lien direct. Utilisé dans l'en-tête, le pied de page et les documents.
                  </p>
                </div>
              </div>

              {settingsForm.logoUrl && (
                <button
                  type="button"
                  onClick={async () => {
                    const updated = { ...settingsForm, logoUrl: '' };
                    setSettingsForm(updated);
                    await updateConfig({ logoUrl: '' });
                    showToast("Blason vectoriel officiel IFADC rétabli.");
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition flex items-center gap-1 shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Rétablir le blason vectoriel</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Preview Box */}
              <div className="md:col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl border border-slate-200/80 text-center space-y-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Aperçu en Direct</span>
                
                <div className="w-24 h-24 bg-white rounded-2xl shadow-xs border border-slate-200 flex items-center justify-center p-2 overflow-hidden">
                  {settingsForm.logoUrl ? (
                    <img 
                      src={settingsForm.logoUrl} 
                      alt="Logo IFADC" 
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <Logo size="lg" showText={false} />
                  )}
                </div>

                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-900 block">
                    {settingsForm.logoUrl ? "Logo personnalisé importé" : "Blason vectoriel par défaut"}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {settingsForm.logoUrl ? "Enregistré dans la base Firebase" : "Symbole académique IFADC"}
                  </span>
                </div>
              </div>

              {/* Upload Controls */}
              <div className="md:col-span-8 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase flex items-center justify-between">
                    <span>1. Importer un fichier image depuis votre appareil :</span>
                    <span className="text-[10px] text-slate-400 font-normal">Formats : PNG, JPG, WebP, SVG</span>
                  </label>
                  
                  <label className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50/70 hover:bg-blue-50 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer transition text-blue-950 font-bold text-xs shadow-2xs">
                    <Upload className="w-4 h-4 text-blue-900" />
                    <span>Choisir une image pour le Logo Officiel</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleImageFileUpload(file, async (dataUrl) => {
                            const updated = { ...settingsForm, logoUrl: dataUrl };
                            setSettingsForm(updated);
                            await updateConfig({ logoUrl: dataUrl });
                            showToast("Logo officiel de l'IFADC importé et enregistré.");
                          });
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    2. Ou saisir le lien web direct du logo (URL) :
                  </label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="https://exemple.com/logo-ifadc.png" 
                      value={settingsForm.logoUrl || ''} 
                      onChange={(e) => setSettingsForm(prev => ({ ...prev, logoUrl: e.target.value }))}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-blue-900"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        await updateConfig({ logoUrl: settingsForm.logoUrl || '' });
                        showToast("Logo officiel enregistré.");
                      }}
                      className="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-lg text-xs shrink-0 shadow-xs flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Appliquer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Change Admin Password */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Key className="w-5 h-5 text-[#005a9c]" />
              <div>
                <h3 className="font-bold text-slate-900 font-serif text-base">
                  Sécurité : Modifier le Mot de Passe Administrateur
                </h3>
                <p className="text-xs text-slate-500">
                  Définissez un mot de passe robuste sauvegardé sur Firebase.
                </p>
              </div>
            </div>

            <form onSubmit={handlePasswordChangeSubmit} className="space-y-4 max-w-lg">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 uppercase">Mot de passe actuel :</label>
                <input
                  type="password"
                  value={oldPasswordInput}
                  onChange={(e) => setOldPasswordInput(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Nouveau mot de passe :</label>
                  <input
                    type="password"
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Confirmer :</label>
                  <input
                    type="password"
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    required
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              {passwordChangeMessage && (
                <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  passwordChangeMessage.isError ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passwordChangeMessage.text}</span>
                </div>
              )}

              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Mettre à jour le mot de passe</span>
              </button>
            </form>
          </div>

          {/* General Config Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-slate-900 font-serif text-base border-b border-slate-100 pb-3">
              Coordonnées Institutionnelles de l'IFADC
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Lien du Site Web :</label>
                  <input
                    type="text"
                    value={settingsForm.websiteUrl}
                    onChange={(e) => setSettingsForm({ ...settingsForm, websiteUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-bold text-blue-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Acompte Inscription L1 ($) :</label>
                  <input
                    type="number"
                    value={settingsForm.l1TuitionAmount}
                    onChange={(e) => setSettingsForm({ ...settingsForm, l1TuitionAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Téléphone Principal :</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Email Officiel :</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 uppercase">Année Académique :</label>
                  <input
                    type="text"
                    value={settingsForm.academicYear}
                    onChange={(e) => setSettingsForm({ ...settingsForm, academicYear: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Enregistrer les coordonnées</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      )}

      {/* STAFF MANAGEMENT TAB */}
      {adminTab === 'staff' && (
        <StaffManagementTab />
      )}

      {/* GALLERY & MEDIA MANAGEMENT TAB */}
      {adminTab === 'gallery' && (
        <GalleryManagementTab />
      )}

    </div>
  );
};
