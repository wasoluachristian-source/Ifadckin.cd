import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FacultiesSection } from './components/FacultiesSection';
import { FacultyDetailView } from './components/FacultyDetailView';
import { AnnouncementsSection } from './components/AnnouncementsSection';
import { RegistrationForm } from './components/RegistrationForm';
import { ApplicationTracker } from './components/ApplicationTracker';
import { StudentPortal } from './components/StudentPortal';
import { StaffPortal } from './components/StaffPortal';
import { AdminPortal } from './components/AdminPortal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { TranscriptView } from './components/TranscriptView';
import { StudentCardModal } from './components/StudentCardModal';
import { ShareModal } from './components/ShareModal';
import { GoogleDrivePortal } from './components/GoogleDrivePortal';
import { PWAInstallPrompt, MobileBottomNavigation } from './components/PWAInstallPrompt';
import { useOnlineStatus } from './hooks/usePWAInstall';
import { 
  FileText, 
  Download, 
  Search, 
  GraduationCap, 
  Lock, 
  CheckCircle, 
  Award, 
  FolderDown, 
  ArrowRight,
  ShieldCheck,
  Building,
  Share2,
  Globe
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    adminDocuments, 
    toastMessage, 
    config, 
    showToast,
    setIsShareModalOpen
  } = useApp();

  const [selectedFacultyForAdmission, setSelectedFacultyForAdmission] = useState<string | undefined>(undefined);
  const isOnline = useOnlineStatus();

  const fontClass = 
    config.fontFamily === 'serif' ? 'font-serif' :
    config.fontFamily === 'humanist' ? 'font-sans tracking-normal' :
    config.fontFamily === 'classic' ? 'font-serif' :
    'font-sans';

  const textSizeClass =
    config.baseFontSize === 'sm' ? 'text-xs' :
    config.baseFontSize === 'lg' ? 'text-base' :
    'text-sm';

  return (
    <div className={`min-h-screen flex flex-col bg-slate-100 ${fontClass} ${textSizeClass} text-slate-900 antialiased selection:bg-blue-600 selection:text-white`}>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-800 text-xs font-semibold flex items-center gap-2.5">
          <CheckCircle className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Offline Status Indicator */}
      {!isOnline && (
        <div className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>Mode Hors-Ligne — Consultation des données mises en cache activée.</span>
        </div>
      )}

      {/* In-App PWA Install Banner */}
      <PWAInstallPrompt />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <div>
            <Hero />
            
            {/* Quick Action Navigation Strip */}
            <div className="bg-white border-b border-slate-200 py-6 px-4 shadow-sm">
              <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div 
                  onClick={() => {
                    setActiveTab('admission');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition duration-150 flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#005a9c] text-white flex items-center justify-center font-bold shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                      Admissions {config.academicYear}
                    </h4>
                    <p className="text-[11px] text-slate-500">Inscriptions L1 (Acompte {config.l1TuitionAmount}{config.currency})</p>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setActiveTab('tracking');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition duration-150 flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold shrink-0">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                      Suivi de Dossier
                    </h4>
                    <p className="text-[11px] text-slate-500">Vérifier l'état d'admission en direct</p>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setActiveTab('student-portal');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition duration-150 flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                      Portail Étudiant
                    </h4>
                    <p className="text-[11px] text-slate-500">Notes en direct & Relevés LMD</p>
                  </div>
                </div>

                <div 
                  onClick={() => {
                    setActiveTab('announcements');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer p-4 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 transition duration-150 flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#005a9c] text-white flex items-center justify-center font-bold shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900">
                      Actualités & Avis
                    </h4>
                    <p className="text-[11px] text-slate-500">Communiqués & Téléchargements</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Dynamic Faculties Section with Dean Profiles */}
            <FacultiesSection onSelectFacultyForAdmission={(fId) => setSelectedFacultyForAdmission(fId)} />

            {/* Dynamic Announcements & Press Releases Section */}
            <AnnouncementsSection />

            {/* Official Administrative Documents Download Showcase */}
            <section className="py-14 bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase font-bold text-blue-900 tracking-wider block">
                      Publications & Circulaires Officielles
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                      Documents & Règlements Académiques
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('admin-portal');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-blue-950 hover:underline flex items-center gap-1"
                  >
                    <span>Espace d'Administration (/admin)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {adminDocuments.filter(d => d.isPublic).slice(0, 3).map((doc) => (
                    <div key={doc.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:shadow-md transition flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-950">
                            {doc.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {doc.uploadedAt}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-2">
                          {doc.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {doc.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 font-mono">
                          {doc.fileSize}
                        </span>
                        <button
                          onClick={() => showToast(`Téléchargement officiel de ${doc.fileName}...`)}
                          className="px-3 py-1.5 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-sm"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Télécharger</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Campus & Contact Section */}
            <ContactSection />
          </div>
        )}

        {activeTab === 'faculties' && (
          <div>
            <FacultiesSection onSelectFacultyForAdmission={(fId) => setSelectedFacultyForAdmission(fId)} />
            <ContactSection />
          </div>
        )}

        {activeTab === 'faculty-detail' && (
          <FacultyDetailView />
        )}

        {activeTab === 'announcements' && (
          <div>
            <AnnouncementsSection />
            <ContactSection />
          </div>
        )}

        {activeTab === 'admission' && (
          <RegistrationForm preSelectedFacultyId={selectedFacultyForAdmission} />
        )}

        {activeTab === 'tracking' && (
          <ApplicationTracker />
        )}

        {activeTab === 'student-portal' && (
          <StudentPortal />
        )}

        {activeTab === 'staff-portal' && (
          <StaffPortal />
        )}

        {activeTab === 'admin-portal' && (
          <AdminPortal />
        )}

        {activeTab === 'drive' && (
          <GoogleDrivePortal />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Transcript Modal */}
      <TranscriptView />

      {/* Student Card Modal */}
      <StudentCardModal />

      {/* Share / Find Website Link Modal */}
      <ShareModal />

      {/* Universal Footer */}
      <Footer />

      {/* Mobile-First Bottom Navigation Bar (Smartphones & Tablets) */}
      <MobileBottomNavigation 
        activeTab={activeTab} 
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />

      {/* Spacing for mobile fixed bottom bar */}
      <div className="sm:hidden h-14" />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
