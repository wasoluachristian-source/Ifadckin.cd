import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Share2, PlusSquare, CheckCircle2 } from 'lucide-react';

export const PWAInstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // If already running inside installed standalone mode, or dismissed by user
  if (isInstalled || dismissed) {
    return null;
  }

  // Android, Chrome, Edge, PC installable flow
  if (isInstallable) {
    return (
      <div className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#005a9c] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Smartphone className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white block sm:inline">Installer l'Application IFADC</span>
              <span className="text-slate-300 hidden sm:inline sm:ml-2">
                Accès direct sans passer par le navigateur, mode hors-ligne et notifications.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={install}
              className="px-3.5 py-1.5 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-lg text-xs uppercase tracking-wider shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Installer</span>
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <div className="bg-slate-900 border-b border-slate-800 text-white px-4 py-2 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#005a9c]" />
              <span className="text-slate-200">
                Installez l'application IFADC sur votre iPhone / iPad
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowIOSModal(true)}
                className="px-3 py-1 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-lg text-[11px] uppercase tracking-wider transition cursor-pointer"
              >
                Comment faire
              </button>
              <button
                onClick={() => setDismissed(true)}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition"
                aria-label="Fermer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {showIOSModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 text-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#005a9c] text-white flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-serif text-slate-900">Application IFADC Mobile</h3>
                    <p className="text-[11px] text-slate-500">Installation sur iPhone / iPad</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#005a9c] flex items-center justify-center font-bold text-xs shrink-0">
                    1
                  </div>
                  <p>
                    Touchez le bouton <strong className="text-slate-800 flex items-center gap-1 inline-flex"><Share2 className="w-3.5 h-3.5 text-[#005a9c]" /> Partager</strong> situé en bas de votre écran dans Safari.
                  </p>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#005a9c] flex items-center justify-center font-bold text-xs shrink-0">
                    2
                  </div>
                  <p>
                    Faites défiler vers le bas puis sélectionnez <strong className="text-slate-800 flex items-center gap-1 inline-flex"><PlusSquare className="w-3.5 h-3.5 text-[#005a9c]" /> Sur l'écran d'accueil</strong>.
                  </p>
                </div>

                <div className="flex items-start gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-blue-100 text-[#005a9c] flex items-center justify-center font-bold text-xs shrink-0">
                    3
                  </div>
                  <p>
                    Touchez <strong className="text-slate-800">Ajouter</strong> en haut à droite. L'icône officielle de l'IFADC apparaîtra sur votre écran d'accueil.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSModal(false)}
                className="mt-5 w-full py-2.5 bg-[#005a9c] hover:bg-[#004b82] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition cursor-pointer"
              >
                J'ai compris
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const MobileBottomNavigation: React.FC<{
  activeTab: string;
  onNavigate: (tab: any) => void;
}> = ({ activeTab, onNavigate }) => {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1 shadow-lg pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around text-[10px] font-bold">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition ${
            activeTab === 'home' ? 'text-[#005a9c]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Accueil</span>
        </button>

        <button
          onClick={() => onNavigate('faculties')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition ${
            activeTab === 'faculties' ? 'text-[#005a9c]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
          <span>Facultés</span>
        </button>

        <button
          onClick={() => onNavigate('admission')}
          className="flex flex-col items-center gap-0.5 -mt-4"
        >
          <div className="w-11 h-11 rounded-full bg-[#005a9c] text-white flex items-center justify-center shadow-lg ring-4 ring-white">
            <PlusSquare className="w-5 h-5" />
          </div>
          <span className="text-[#005a9c] font-black">Inscription</span>
        </button>

        <button
          onClick={() => onNavigate('student-portal')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition ${
            activeTab === 'student-portal' ? 'text-[#005a9c]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Étudiant</span>
        </button>

        <button
          onClick={() => onNavigate('tracking')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg transition ${
            activeTab === 'tracking' ? 'text-[#005a9c]' : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span>Suivi</span>
        </button>
      </div>
    </div>
  );
};
