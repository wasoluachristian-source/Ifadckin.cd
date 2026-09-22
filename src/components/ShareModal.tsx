import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  QrCode, 
  Globe, 
  ExternalLink,
  MessageCircle,
  Mail,
  Send
} from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, siteUrl, config, showToast } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen) return null;

  const shareText = `Découvrez le site officiel de l'${config.name} (${config.shortName}) à Kinshasa Kasa-Vubu. Inscriptions 2026-2027, suivi de dossier et espace étudiant : ${siteUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl);
    setCopied(true);
    showToast("Lien officiel copié dans le presse-papier !");
    setTimeout(() => setCopied(false), 3000);
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareEmail = () => {
    window.open(`mailto:?subject=${encodeURIComponent(`Site Officiel de l'IFADC Kinshasa`)}&body=${encodeURIComponent(shareText)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative flex items-start justify-between border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-300" />
              <span className="text-xs uppercase font-bold tracking-widest text-blue-300">
                Lien Public Universel
              </span>
            </div>
            <h3 className="text-xl font-bold font-serif text-white">
              Partager & Trouver le Site de l'IFADC
            </h3>
            <p className="text-xs text-slate-300">
              Diffusez l'adresse web de l'institut accessible par tous dans le monde entier.
            </p>
          </div>

          <button
            onClick={() => setIsShareModalOpen(false)}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          
          {/* Main Direct URL Box */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Adresse officielle du site web :
            </label>
            <div className="flex items-center gap-2 p-2 bg-slate-50 border border-slate-300 rounded-xl">
              <input
                type="text"
                readOnly
                value={siteUrl}
                className="w-full bg-transparent text-xs font-mono font-bold text-blue-950 px-2 select-all focus:outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 transition ${
                  copied 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-blue-950 hover:bg-blue-900 text-white shadow-sm'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copié !' : 'Copier'}</span>
              </button>
            </div>
          </div>

          {/* Quick Direct Sharing Channels */}
          <div className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              Partage Direct Instantané :
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={shareWhatsApp}
                className="p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Partager sur WhatsApp</span>
              </button>

              <button
                onClick={shareEmail}
                className="p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Mail className="w-4 h-4 text-blue-700" />
                <span>Envoyer par Email</span>
              </button>
            </div>
          </div>

          {/* QR Code scanning showcase */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-4">
            <div className="p-2 bg-white border border-slate-300 rounded-xl shrink-0 shadow-sm">
              <QrCode className="w-14 h-14 text-slate-900" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-slate-900">
                Flash Code pour Smartphones
              </h4>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Scannez ou imprimez ce code sur vos affiches pour permettre aux étudiants d'accéder instantanément au site.
              </p>
            </div>
          </div>

          {/* Open in new window */}
          <div className="pt-2 flex justify-between items-center border-t border-slate-100">
            <span className="text-[11px] text-slate-400">
              Institut Facultaire des Assemblées de Dieu du Congo
            </span>
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
            >
              <span>Ouvrir dans un nouvel onglet</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};
