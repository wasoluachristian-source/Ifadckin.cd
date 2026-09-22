import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { 
  Phone, 
  MapPin, 
  Mail, 
  ShieldCheck, 
  Lock, 
  GraduationCap, 
  FileText, 
  Search, 
  Award, 
  Share2, 
  Globe 
} from 'lucide-react';
import { ActiveTab } from '../types';

export const Footer: React.FC = () => {
  const { config, faculties, setActiveTab, setIsShareModalOpen, isAdminLoggedIn } = useApp();

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const accentColor = config.primaryAccentColor || '#005a9c';
  const devCredit = config.developerCreditText || "wastus spart dev";
  const homologationText = config.homologationNoticeText || config.tutelle;
  const footerDesc = config.footerDescription || "L'Institut Facultaire des Assemblées de Dieu du Congo forme les cadres d'excellence pour le développement économique, technologique et spirituel de la nation.";

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      
      {/* Top Academic Trust Banner (Toggleable) */}
      {config.showESUHomologationBanner !== false && (
        <div className="bg-slate-900 border-b border-slate-800 py-6 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 text-blue-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-white block text-sm">
                  Agrément Officiel & Système L.M.D
                </span>
                <span className="text-[11px] text-slate-400">
                  {homologationText}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-blue-200 font-bold rounded-lg text-xs transition border border-slate-700 flex items-center gap-1.5 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Trouver & Partager le Site</span>
              </button>
              <button
                onClick={() => handleNav('admission')}
                className="px-4 py-2 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-lg uppercase tracking-wider text-xs transition cursor-pointer"
              >
                Je m'inscris (Acompte : {config.l1TuitionAmount}{config.currency})
              </button>
              <button
                onClick={() => handleNav('student-portal')}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg text-xs transition border border-slate-700 cursor-pointer"
              >
                Consulter Notes en Direct
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <Logo size="md" light={true} />
            <p className="text-slate-400 text-xs leading-relaxed font-light">
              {footerDesc}
            </p>
            {config.motto && (
              <div className="text-[11px] italic font-serif text-blue-200">
                "{config.motto}"
              </div>
            )}
          </div>

          {/* Col 2: Faculties List (Toggleable) */}
          {config.showFooterDeans !== false && (
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-serif">
                Facultés Organisées ({config.academicYear})
              </h4>
              <ul className="space-y-2 text-xs">
                {faculties.map((f) => (
                  <li key={f.id}>
                    <button
                      onClick={() => handleNav('faculties')}
                      className="hover:text-blue-300 transition text-left cursor-pointer"
                    >
                      • {f.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Col 3: Quick Navigation Portals */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-serif">
              Espaces & Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('admission')} className="hover:text-white transition flex items-center gap-1.5 cursor-pointer">
                  <FileText className="w-3.5 h-3.5 text-blue-400" />
                  <span>Dépôt de candidature en ligne</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('tracking')} className="hover:text-white transition flex items-center gap-1.5 cursor-pointer">
                  <Search className="w-3.5 h-3.5 text-blue-400" />
                  <span>Suivi de dossier d'admission</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('student-portal')} className="hover:text-white transition flex items-center gap-1.5 cursor-pointer">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Espace Étudiant (Notes & Relevés)</span>
                </button>
              </li>
              {config.showDriveMenuTab !== false && (
                <li>
                  <button onClick={() => handleNav('drive')} className="hover:text-blue-300 transition flex items-center gap-1.5 text-slate-300 cursor-pointer">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                    <span>Google Drive • Cloud Académique</span>
                  </button>
                </li>
              )}
              <li>
                <button onClick={() => setIsShareModalOpen(true)} className="hover:text-blue-300 transition flex items-center gap-1.5 text-slate-300 cursor-pointer">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>Lien officiel d'accès au site</span>
                </button>
              </li>
              {isAdminLoggedIn ? (
                <li>
                  <button onClick={() => handleNav('admin-portal')} className="hover:text-blue-300 transition flex items-center gap-1.5 text-blue-400 font-semibold cursor-pointer">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Tableau de bord Administrateur</span>
                  </button>
                </li>
              ) : (
                <li className="pt-2">
                  <button 
                    onClick={() => handleNav('admin-portal')} 
                    className="text-[10px] text-slate-600 hover:text-slate-400 transition flex items-center gap-1 opacity-75 hover:opacity-100 cursor-pointer"
                    title="Accès réservé administration"
                  >
                    <Lock className="w-3 h-3" />
                    <span>Portail SGAC</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: Campus Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-serif">
              Coordonnées Campus (Kinshasa)
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Assosa N° 2219 C/ KASA-VUBU</strong><br />
                  <span className="text-slate-400">Réf: Maison Communale de KASA-VUBU</span><br />
                  Kinshasa — République Démocratique du Congo
                </span>
              </div>
              
              <div className="space-y-1 pt-1">
                <div className="text-[11px] text-slate-400 flex items-center gap-1 font-semibold">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>Lignes Téléphoniques Officielles :</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-0.5">
                  <a href="tel:0893122361" className="font-mono font-bold text-white hover:text-blue-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    0893122361
                  </a>
                  <a href="tel:0897260563" className="font-mono font-bold text-white hover:text-blue-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    0897260563
                  </a>
                  <a href="tel:0817562082" className="font-mono font-bold text-white hover:text-blue-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    0817562082
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{config.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright & Developer mention */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {config.academicYear} {config.name} (IFADC). Tous droits réservés.
          </div>

          {/* User explicit request: Développé par wastus spart dev (Toggleable / Customizable by Admin) */}
          {config.showFooterDevCredit !== false && (
            <div className="text-slate-400 font-medium flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              <span>Développé par</span>
              <span className="font-bold tracking-wide text-white">{devCredit}</span>
            </div>
          )}

          <div className="flex items-center gap-4">
            <button onClick={() => handleNav('admin-portal')} className="hover:text-blue-300 cursor-pointer">
              Administration Sécurisée
            </button>
            <span>•</span>
            <button onClick={() => setIsShareModalOpen(true)} className="hover:text-blue-300 cursor-pointer">
              Lien de partage
            </button>
            <span>•</span>
            <span>Système L.M.D RDC</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
