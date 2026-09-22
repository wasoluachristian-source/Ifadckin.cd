import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { 
  GraduationCap, 
  Search, 
  Lock, 
  Menu, 
  X, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Layers,
  UserCheck,
  LogOut,
  Share2,
  Globe,
  HardDrive,
  Briefcase,
  User,
  BookOpen,
  Calendar,
  Award,
  ChevronRight,
  Smartphone,
  Download
} from 'lucide-react';
import { ActiveTab } from '../types';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const Navbar: React.FC = () => {
  const { 
    config, 
    activeTab, 
    setActiveTab, 
    isAdminLoggedIn, 
    logoutAdmin,
    currentStudent,
    logoutStudent,
    currentStaff,
    logoutStaff,
    setIsShareModalOpen
  } = useApp();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setDrawerOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.toLowerCase();
    if (q.includes('facult') || q.includes('droit') || q.includes('santé') || q.includes('info') || q.includes('éco')) {
      handleNavClick('faculties');
    } else if (q.includes('inscri') || q.includes('admi') || q.includes('bac') || q.includes('frais') || q.includes('80')) {
      handleNavClick('admission');
    } else if (q.includes('note') || q.includes('cote') || q.includes('relev') || q.includes('bulletin') || q.includes('etudiant')) {
      handleNavClick('student-portal');
    } else if (q.includes('suivi') || q.includes('dossier')) {
      handleNavClick('tracking');
    } else if (q.includes('contact') || q.includes('kasa') || q.includes('assosa') || q.includes('tel')) {
      handleNavClick('contact');
    } else {
      handleNavClick('faculties');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Left: Mobile Drawer Hamburger Button (matching Université de Montréal IMG_6461) */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 -ml-2 text-slate-900 hover:bg-slate-100 rounded-md focus:outline-none cursor-pointer transition"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-7 h-7 stroke-[2.2]" />
              </button>

              {/* Logo / University Header (matching centered / prominent academic typography) */}
              <div 
                className="cursor-pointer flex items-center"
                onClick={() => handleNavClick('home')}
              >
                <Logo size="md" />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <button
                onClick={() => handleNavClick('home')}
                className={`px-3 py-2 rounded-md text-xs uppercase tracking-wider font-bold transition cursor-pointer ${
                  activeTab === 'home'
                    ? 'text-[#005a9c] bg-blue-50 font-extrabold border-b-2 border-[#005a9c]'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                L'Institut
              </button>

              <button
                onClick={() => handleNavClick('faculties')}
                className={`px-3 py-2 rounded-md text-xs uppercase tracking-wider font-bold transition cursor-pointer ${
                  activeTab === 'faculties' || activeTab === 'faculty-detail'
                    ? 'text-[#005a9c] bg-blue-50 font-extrabold border-b-2 border-[#005a9c]'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Facultés
              </button>

              <button
                onClick={() => handleNavClick('announcements')}
                className={`px-3 py-2 rounded-md text-xs uppercase tracking-wider font-bold transition cursor-pointer ${
                  activeTab === 'announcements'
                    ? 'text-[#005a9c] bg-blue-50 font-extrabold border-b-2 border-[#005a9c]'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Actualités
              </button>

              <button
                onClick={() => handleNavClick('student-portal')}
                className={`px-3 py-2 rounded-md text-xs uppercase tracking-wider font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'student-portal'
                    ? 'text-[#005a9c] bg-blue-50 font-extrabold border-b-2 border-[#005a9c]'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#005a9c]" />
                <span>Espace Étudiant</span>
              </button>

              <button
                onClick={() => handleNavClick('tracking')}
                className={`px-3 py-2 rounded-md text-xs uppercase tracking-wider font-bold transition cursor-pointer ${
                  activeTab === 'tracking'
                    ? 'text-[#005a9c] bg-blue-50 font-extrabold border-b-2 border-[#005a9c]'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Suivi
              </button>

              <button
                onClick={() => handleNavClick('contact')}
                className={`px-3 py-2 rounded-md text-xs uppercase tracking-wider font-bold transition cursor-pointer ${
                  activeTab === 'contact'
                    ? 'text-[#005a9c] bg-blue-50 font-extrabold border-b-2 border-[#005a9c]'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                Contact
              </button>

              {/* Admission CTA button */}
              <button
                onClick={() => handleNavClick('admission')}
                className="ml-2 px-5 py-2.5 bg-[#005a9c] hover:bg-[#004b82] text-white rounded-md text-xs uppercase tracking-wider font-extrabold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-white" />
                <span>Inscriptions L1</span>
              </button>
            </nav>

            {/* Right: Search Icon + App Install Button + Inscription */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* PWA Install Button on Desktop/Tablet if available */}
              {!isInstalled && isInstallable && (
                <button
                  onClick={install}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#005a9c] text-[#005a9c] hover:bg-blue-50 text-xs font-bold transition cursor-pointer"
                  title="Installer l'application IFADC"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Installer l'App</span>
                </button>
              )}

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-slate-800 hover:bg-slate-100 rounded-md transition cursor-pointer"
                title="Rechercher une formation, faculté ou service"
                aria-label="Rechercher"
              >
                <Search className="w-6 h-6 stroke-[2.2] text-[#005a9c]" />
              </button>

              <button
                onClick={() => handleNavClick('admission')}
                className="hidden sm:inline-flex lg:hidden px-3.5 py-1.5 bg-[#005a9c] hover:bg-[#004b82] text-white rounded-md text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Inscription
              </button>
            </div>

          </div>
        </div>

        {/* Expandable Search Bar */}
        {searchOpen && (
          <div className="border-t border-slate-200 bg-slate-50 px-4 py-3 shadow-inner">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une faculté (Droit, Santé, Informatique...), un document, les frais L1..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#005a9c]"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#005a9c] hover:bg-[#00487c] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition"
              >
                Chercher
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* SIDE DRAWER MENU MATCHING EXACTLY IMG_6464 (formationadistance.be style) */}
      {/* ========================================================================= */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer container from Left */}
          <div className="relative w-full max-w-xs sm:max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between z-10 overflow-y-auto animate-in slide-in-from-left duration-300">
            
            {/* Drawer Top Header with Globe (Share) + Close X */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  setIsShareModalOpen(true);
                }}
                className="p-2 text-slate-600 hover:text-[#005a9c] hover:bg-slate-100 rounded-full transition cursor-pointer"
                title="Lien du site & Partage"
              >
                <Globe className="w-6 h-6 text-[#005a9c]" />
              </button>

              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition cursor-pointer"
                aria-label="Fermer le menu"
              >
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            {/* Drawer Body Links matching IMG_6464 */}
            <div className="p-6 space-y-6 flex-1">
              
              {/* Primary Section Links (Formations, Module gratuit, Avantages...) */}
              <div className="space-y-4 text-base font-bold text-slate-800">
                <div>
                  <button
                    onClick={() => handleNavClick('faculties')}
                    className="w-full text-left hover:text-[#005a9c] transition py-1 flex items-center justify-between cursor-pointer"
                  >
                    <span>Formations & Facultés</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => handleNavClick('admission')}
                    className="w-full text-left hover:text-[#005a9c] transition py-1 flex items-center justify-between cursor-pointer"
                  >
                    <span>Admissions L1 (Acompte {config.l1TuitionAmount}{config.currency})</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => handleNavClick('home')}
                    className="w-full text-left hover:text-[#005a9c] transition py-1 flex items-center justify-between cursor-pointer"
                  >
                    <span>Notre méthode & Système LMD</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => handleNavClick('announcements')}
                    className="w-full text-left hover:text-[#005a9c] transition py-1 flex items-center justify-between cursor-pointer"
                  >
                    <span>Actualités & Communiqués</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => handleNavClick('home')}
                    className="w-full text-left hover:text-[#005a9c] transition py-1 flex items-center justify-between cursor-pointer"
                  >
                    <span>Notre institut (IFADC)</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>

                <div>
                  <button
                    onClick={() => handleNavClick('contact')}
                    className="w-full text-left hover:text-[#005a9c] transition py-1 flex items-center justify-between cursor-pointer"
                  >
                    <span>Contact</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

              {/* Section 2: "Profil" with round icon matching IMG_6464 */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                
                <div className="flex items-center gap-2 text-slate-900 font-bold text-base mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#005a9c]/10 text-[#005a9c] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span>Profil</span>
                </div>

                <div className="space-y-2.5 text-sm font-medium text-slate-700 pl-3">
                  <button
                    onClick={() => handleNavClick('student-portal')}
                    className="w-full text-left hover:text-[#005a9c] transition py-1 block cursor-pointer"
                  >
                    Mon profil
                  </button>

                  <button
                    onClick={() => handleNavClick('student-portal')}
                    className="w-full text-left hover:text-[#005a9c] transition py-1 block cursor-pointer"
                  >
                    Mes cours & Notes en direct
                  </button>

                  <button
                    onClick={() => handleNavClick('tracking')}
                    className="w-full text-left hover:text-[#005a9c] transition py-1 block cursor-pointer"
                  >
                    Suivi de mon dossier
                  </button>

                  <button
                    onClick={() => handleNavClick('student-portal')}
                    className="w-full text-left hover:text-[#005a9c] transition py-1 block cursor-pointer"
                  >
                    Mes diplômes & Relevés LMD
                  </button>

                  <button
                    onClick={() => handleNavClick('announcements')}
                    className="w-full text-left hover:text-[#005a9c] transition py-1 block cursor-pointer"
                  >
                    Mon agenda académique
                  </button>

                  {/* Identification / Login links */}
                  {currentStudent ? (
                    <div className="pt-2 flex items-center justify-between text-xs bg-emerald-50 text-emerald-900 p-2 rounded-lg">
                      <span className="font-semibold">{currentStudent.firstName} {currentStudent.lastName}</span>
                      <button onClick={logoutStudent} className="text-rose-600 font-bold hover:underline">
                        Déconnexion
                      </button>
                    </div>
                  ) : currentStaff ? (
                    <div className="pt-2 flex items-center justify-between text-xs bg-blue-50 text-blue-900 p-2 rounded-lg">
                      <span className="font-semibold">{currentStaff.fullName} ({currentStaff.role})</span>
                      <button onClick={logoutStaff} className="text-rose-600 font-bold hover:underline">
                        Déconnexion
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleNavClick('student-portal')}
                      className="w-full text-left text-[#005a9c] font-bold hover:underline transition py-1 block cursor-pointer"
                    >
                      S'identifier
                    </button>
                  )}

                  {/* Mobile App Install Button inside drawer */}
                  {!isInstalled && isInstallable && (
                    <button
                      onClick={() => {
                        install();
                        setDrawerOpen(false);
                      }}
                      className="w-full mt-2 py-2 px-3 bg-blue-50 hover:bg-blue-100 text-[#005a9c] rounded-lg text-xs font-bold transition flex items-center justify-between cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        <span>Installer l'application IFADC</span>
                      </span>
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Discrete Staff & Admin portals */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <button
                      onClick={() => handleNavClick('staff-portal')}
                      className="hover:text-slate-700 transition"
                    >
                      Espace Personnel
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => handleNavClick('admin-portal')}
                      className="hover:text-slate-700 transition flex items-center gap-1"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Admin</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Sticky Blue Bar: "Inscription" matching IMG_6464 */}
            <div className="bg-[#005a9c] text-white">
              <button
                onClick={() => handleNavClick('admission')}
                className="w-full py-4 px-6 text-left font-bold text-base uppercase tracking-wider hover:bg-[#004b82] transition flex items-center justify-between cursor-pointer"
              >
                <span>Inscription</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
