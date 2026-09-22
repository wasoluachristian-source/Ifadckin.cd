import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  signInWithGoogleDrive, 
  initDriveAuth, 
  getDriveAccessToken, 
  logoutGoogleDrive, 
  listDriveFiles, 
  createDriveFolder, 
  uploadFileToDrive, 
  exportTextToDrive, 
  deleteDriveFile 
} from '../services/googleDrive';
import { DriveFileItem } from '../types';
import { User } from 'firebase/auth';
import { 
  Cloud, 
  FolderPlus, 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  FileImage, 
  Folder, 
  Trash2, 
  ExternalLink, 
  RefreshCw, 
  Search, 
  ShieldCheck, 
  Download, 
  LogOut, 
  User as UserIcon, 
  ChevronRight, 
  AlertTriangle, 
  Database,
  ArrowRight,
  HardDrive,
CheckCircle2
} from 'lucide-react';

export const GoogleDrivePortal: React.FC = () => {
  const { students, applications, adminDocuments, config, showToast } = useApp();

  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // File browser state
  const [files, setFiles] = useState<DriveFileItem[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
  const [currentFolderId, setCurrentFolderId] = useState<string>('root');
  const [folderBreadcrumbs, setFolderBreadcrumbs] = useState<{ id: string; name: string }[]>([
    { id: 'root', name: 'Mon Drive' }
  ]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('all');

  // Modals & inputs
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState<boolean>(false);
  const [newFolderName, setNewFolderName] = useState<string>('IFADC_Documents_2025_2026');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Destructive Confirmation Modal
  const [fileToDelete, setFileToDelete] = useState<DriveFileItem | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Auth Initialization
  useEffect(() => {
    const unsubscribe = initDriveAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setIsAuthLoading(false);
      },
      () => {
        setUser(null);
        setToken(null);
        setIsAuthLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Fetch files when token or folder changes
  useEffect(() => {
    if (token) {
      loadFiles();
    }
  }, [token, currentFolderId]);

  const loadFiles = async () => {
    if (!token) return;
    setIsLoadingFiles(true);
    try {
      const items = await listDriveFiles(token, currentFolderId, searchQuery);
      setFiles(items);
    } catch (err: any) {
      showToast(`Erreur Google Drive: ${err.message || 'Impossible de lister les fichiers'}`);
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const res = await signInWithGoogleDrive();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        showToast(`Connecté à Google Drive (${res.user.email || 'Compte Google'})`);
      }
    } catch (err: any) {
      showToast(`Échec de connexion Google Drive: ${err.message || 'Veuillez réessayer'}`);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logoutGoogleDrive();
    setUser(null);
    setToken(null);
    setFiles([]);
    showToast('Déconnecté de Google Drive.');
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newFolderName.trim()) return;

    try {
      await createDriveFolder(token, newFolderName.trim(), currentFolderId);
      showToast(`Dossier "${newFolderName}" créé avec succès sur Google Drive !`);
      setNewFolderName('');
      setIsCreateFolderOpen(false);
      loadFiles();
    } catch (err: any) {
      showToast(`Erreur lors de la création du dossier: ${err.message}`);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0 || !token) return;

    const file = fileList[0];
    setIsUploading(true);
    try {
      await uploadFileToDrive(token, file, currentFolderId);
      showToast(`Fichier "${file.name}" envoyé avec succès sur Google Drive !`);
      if (fileInputRef.current) fileInputRef.current.value = '';
      loadFiles();
    } catch (err: any) {
      showToast(`Échec d'envoi: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  // Export Students CSV
  const handleExportStudents = async () => {
    if (!token) return;
    try {
      const header = "Matricule,Nom,Postnom,Prenom,Genre,Faculte,Option,Niveau,AnneeAcademique,StatutFrais,Email,Telephone\n";
      const rows = students.map(s => 
        `"${s.matricule}","${s.lastName}","${s.middleName || ''}","${s.firstName}","${s.gender}","${s.facultyName}","${s.optionName}","${s.level}","${s.academicYear}","${s.tuitionFee.status}","${s.email}","${s.phone}"`
      ).join("\n");
      
      const fileName = `IFADC_Etudiants_${config.academicYear.replace('/', '_')}_${Date.now()}.csv`;
      await exportTextToDrive(token, fileName, header + rows, 'text/csv', currentFolderId);
      showToast(`Exportation réussie : "${fileName}" dans Google Drive !`);
      loadFiles();
    } catch (err: any) {
      showToast(`Erreur lors de l'exportation: ${err.message}`);
    }
  };

  // Export Applications CSV
  const handleExportApplications = async () => {
    if (!token) return;
    try {
      const header = "NumeroDossier,DateSoumission,Nom,Postnom,Prenom,Faculte,Option,Niveau,PourcentageDiplome,Statut,Email,Telephone\n";
      const rows = applications.map(a => 
        `"${a.dossierNumber}","${a.submittedAt}","${a.lastName}","${a.middleName || ''}","${a.firstName}","${a.facultyName}","${a.optionName}","${a.level}","${a.diplomaPercentage}%","${a.status}","${a.email}","${a.phone}"`
      ).join("\n");
      
      const fileName = `IFADC_Candidatures_Admissions_${Date.now()}.csv`;
      await exportTextToDrive(token, fileName, header + rows, 'text/csv', currentFolderId);
      showToast(`Rapport des candidatures sauvegardé sur Google Drive !`);
      loadFiles();
    } catch (err: any) {
      showToast(`Erreur lors de l'exportation: ${err.message}`);
    }
  };

  // Navigate into a folder
  const handleOpenFolder = (folder: DriveFileItem) => {
    setCurrentFolderId(folder.id);
    setFolderBreadcrumbs(prev => [...prev, { id: folder.id, name: folder.name }]);
  };

  // Breadcrumb click
  const handleBreadcrumbClick = (index: number) => {
    const target = folderBreadcrumbs[index];
    setCurrentFolderId(target.id);
    setFolderBreadcrumbs(folderBreadcrumbs.slice(0, index + 1));
  };

  // Confirm delete handler (Mandatory Destructive Confirmation Rule)
  const confirmDeleteFile = async () => {
    if (!token || !fileToDelete) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(token, fileToDelete.id);
      showToast(`Fichier "${fileToDelete.name}" supprimé de Google Drive.`);
      setFileToDelete(null);
      loadFiles();
    } catch (err: any) {
      showToast(`Échec de suppression: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredFiles = files.filter(f => {
    if (filterType === 'folder') return f.isFolder;
    if (filterType === 'pdf') return f.mimeType.includes('pdf');
    if (filterType === 'sheets') return f.mimeType.includes('sheet') || f.mimeType.includes('csv');
    if (filterType === 'images') return f.mimeType.startsWith('image/');
    return true;
  });

  const getFileIcon = (mimeType: string, isFolder: boolean) => {
    if (isFolder) return <Folder className="w-5 h-5 text-[#005a9c] fill-blue-500/20" />;
    if (mimeType.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (mimeType.includes('sheet') || mimeType.includes('csv')) return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    if (mimeType.startsWith('image/')) return <FileImage className="w-5 h-5 text-blue-500" />;
    return <FileText className="w-5 h-5 text-slate-500" />;
  };

  return (
    <div className="min-h-[85vh] bg-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-blue-800/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-[#005a9c]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-white text-xs font-bold uppercase tracking-wider border border-blue-400/30">
                <Cloud className="w-4 h-4" />
                <span>Google Workspace • Cloud Storage</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-tight text-white">
                Espace Google Drive de l'IFADC
              </h1>
              <p className="text-sm text-slate-300 max-w-2xl">
                Accédez à vos documents officiels, stockez les devoirs et relevés de notes, et sauvegardez les données académiques en temps réel sur votre Google Drive personnel ou institutionnel.
              </p>
            </div>

            {/* Auth status block */}
            {user ? (
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-4">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || 'Utilisateur'} className="w-12 h-12 rounded-full border-2 border-blue-400" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#005a9c] text-blue-950 flex items-center justify-center font-bold text-lg">
                    {user.displayName?.charAt(0) || <UserIcon className="w-6 h-6" />}
                  </div>
                )}
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>{user.displayName || 'Compte Google'}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="text-[11px] text-slate-300 font-mono truncate max-w-[180px]">
                    {user.email}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-1 text-[11px] text-white hover:text-blue-100 font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Se déconnecter</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* If NOT Authenticated: High-Converting Google Sign In Card */}
        {!user && !isAuthLoading && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 text-center max-w-2xl mx-auto space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-900 mx-auto flex items-center justify-center border border-blue-200 shadow-inner">
              <HardDrive className="w-8 h-8 text-blue-900" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">
                Connectez votre compte Google Drive
              </h2>
              <p className="text-sm text-slate-600">
                Pour synchroniser vos cours, télécharger vos attestations ou exporter les rapports académiques en un clic, autorisez l'accès sécurisé à Google Drive.
              </p>
            </div>

            <div className="py-2 flex justify-center">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-300 hover:border-blue-600 shadow-md hover:shadow-lg transition duration-200 cursor-pointer disabled:opacity-50"
              >
                {/* Official Google Brand Icon SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isLoggingIn ? 'Connexion en cours...' : 'Se connecter avec Google'}</span>
              </button>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Chiffrement Google OAuth 2.0
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Accès direct sans mot de passe
              </span>
            </div>
          </div>
        )}

        {/* Authenticated Workspace */}
        {user && token && (
          <div className="space-y-6">
            
            {/* Quick Actions Bar (Upload, Create Folder, Academic Exports) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
              
              <div className="flex flex-wrap items-center gap-2.5">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition disabled:opacity-50"
                >
                  <Upload className="w-4 h-4" />
                  <span>{isUploading ? 'Téléversement...' : 'Téléverser un fichier'}</span>
                </button>

                <button
                  onClick={() => setIsCreateFolderOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 border border-slate-300 transition"
                >
                  <FolderPlus className="w-4 h-4 text-[#005a9c]" />
                  <span>Nouveau dossier</span>
                </button>

                <button
                  onClick={loadFiles}
                  disabled={isLoadingFiles}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition cursor-pointer"
                  title="Actualiser les fichiers"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingFiles ? 'animate-spin text-blue-600' : ''}`} />
                </button>
              </div>

              {/* Instant IFADC Academic Data Exports */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider hidden lg:inline">
                  Sauvegardes IFADC :
                </span>
                
                <button
                  onClick={handleExportStudents}
                  className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  title="Exporter tous les étudiants dans Google Drive (.csv)"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Export Étudiants (.csv)</span>
                </button>

                <button
                  onClick={handleExportApplications}
                  className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-300 font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
                  title="Exporter les dossiers d'admission dans Google Drive (.csv)"
                >
                  <Database className="w-3.5 h-3.5 text-purple-600" />
                  <span>Export Candidatures (.csv)</span>
                </button>
              </div>

            </div>

            {/* Folder Creation Modal */}
            {isCreateFolderOpen && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                      <FolderPlus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">Créer un nouveau dossier Drive</h3>
                      <p className="text-xs text-slate-500">Dans {folderBreadcrumbs[folderBreadcrumbs.length - 1].name}</p>
                    </div>
                  </div>

                  <form onSubmit={handleCreateFolder} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Nom du dossier
                      </label>
                      <input
                        type="text"
                        required
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                        placeholder="Ex: IFADC_Cours_L1_Informatique"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900 font-medium"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsCreateFolderOpen(false)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs transition cursor-pointer"
                      >
                        Créer le dossier
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Main File Browser Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              
              {/* Toolbar & Search Bar */}
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-1 text-xs font-bold text-slate-700 overflow-x-auto whitespace-nowrap py-1">
                  {folderBreadcrumbs.map((crumb, idx) => (
                    <React.Fragment key={crumb.id}>
                      <button
                        onClick={() => handleBreadcrumbClick(idx)}
                        className={`hover:text-blue-900 hover:underline px-1 py-0.5 rounded ${
                          idx === folderBreadcrumbs.length - 1 ? 'text-blue-950 font-extrabold bg-white shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        {crumb.name}
                      </button>
                      {idx < folderBreadcrumbs.length - 1 && (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Search & Filter */}
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && loadFiles()}
                      placeholder="Rechercher sur Drive..."
                      className="pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 w-44 sm:w-56"
                    />
                  </div>

                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="py-1.5 px-2.5 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none font-medium text-slate-700"
                  >
                    <option value="all">Tous types</option>
                    <option value="folder">Dossiers</option>
                    <option value="pdf">PDF</option>
                    <option value="sheets">Tableurs (CSV/Excel)</option>
                    <option value="images">Images</option>
                  </select>
                </div>

              </div>

              {/* Files Table / List */}
              {isLoadingFiles ? (
                <div className="p-16 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-blue-900 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-600">Chargement de votre Google Drive...</p>
                </div>
              ) : filteredFiles.length === 0 ? (
                <div className="p-16 text-center space-y-3">
                  <Folder className="w-12 h-12 text-slate-300 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-700">Aucun fichier trouvé dans ce dossier</h4>
                  <p className="text-xs text-slate-500">Téléversez un document ou créez un dossier pour commencer.</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-100/70 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Nom</th>
                        <th className="py-3 px-4">Dernière modification</th>
                        <th className="py-3 px-4">Taille</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredFiles.map((file) => (
                        <tr 
                          key={file.id} 
                          className="hover:bg-blue-50/50 transition group"
                        >
                          <td className="py-3 px-4 flex items-center gap-3">
                            <div className="shrink-0">
                              {getFileIcon(file.mimeType, file.isFolder)}
                            </div>
                            {file.isFolder ? (
                              <button
                                onClick={() => handleOpenFolder(file)}
                                className="font-bold text-slate-900 hover:text-blue-950 hover:underline flex items-center gap-1.5 text-left truncate max-w-xs sm:max-w-md"
                              >
                                <span>{file.name}</span>
                              </button>
                            ) : (
                              <span className="font-medium text-slate-800 truncate max-w-xs sm:max-w-md">
                                {file.name}
                              </span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                            {file.modifiedTime || '--'}
                          </td>

                          <td className="py-3 px-4 text-slate-500 font-mono whitespace-nowrap">
                            {file.isFolder ? '--' : file.size}
                          </td>

                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {file.webViewLink && (
                                <a
                                  href={file.webViewLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg text-blue-900 hover:bg-blue-100 transition"
                                  title="Ouvrir dans Google Drive"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}

                              {file.webContentLink && (
                                <a
                                  href={file.webContentLink}
                                  download
                                  className="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-100 transition"
                                  title="Télécharger directement"
                                >
                                  <Download className="w-4 h-4" />
                                </a>
                              )}

                              {/* Destructive Action Button with safety modal trigger */}
                              <button
                                onClick={() => setFileToDelete(file)}
                                className="p-1.5 rounded-lg text-red-600 hover:bg-red-100 transition"
                                title="Supprimer de Google Drive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>

          </div>
        )}

        {/* Mandatory Destructive Action Confirmation Dialog */}
        {fileToDelete && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-red-200">
              
              <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-7 h-7" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Confirmation de suppression
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Êtes-vous sûr de vouloir supprimer définitivement le fichier <span className="font-bold text-slate-900">"{fileToDelete.name}"</span> de votre Google Drive ? Cette action est irréversible.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setFileToDelete(null)}
                  disabled={isDeleting}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={confirmDeleteFile}
                  disabled={isDeleting}
                  className="w-1/2 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isDeleting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                  <span>{isDeleting ? 'Suppression...' : 'Supprimer'}</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
