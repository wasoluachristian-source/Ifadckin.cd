import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  Building2, 
  ShieldCheck,
  Compass
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { config, showToast } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    setSent(true);
    showToast("Votre message a été transmis à l'accueil académique de l'IFADC.");
    setTimeout(() => {
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setSent(false);
    }, 4000);
  };

  return (
    <section className="py-16 bg-slate-100 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-950 uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-blue-700" />
            Campus Universitaire & Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Localisation & Accès à l'IFADC
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Retrouvez-nous au cœur de Kinshasa dans la commune de Kasa-Vubu pour toutes vos formalités académiques et administratives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left info cards */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Campus Address Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Adresse Principale du Campus
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>{config.address}</strong><br />
                Référence : <strong>{config.reference}</strong><br />
                Commune de {config.commune}, Ville de {config.city}, {config.country}
              </p>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Lignes Téléphoniques & Inscriptions
              </h3>
              <p className="text-xs text-slate-600">
                Numéros d'appel officiels pour informations, orientation et inscriptions :
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 pt-1">
                <a 
                  href="tel:0893122361"
                  className="inline-block font-mono text-sm font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition border border-emerald-200"
                >
                  📞 0893122361
                </a>
                <a 
                  href="tel:0897260563"
                  className="inline-block font-mono text-sm font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition border border-emerald-200"
                >
                  📞 0897260563
                </a>
                <a 
                  href="tel:0817562082"
                  className="inline-block font-mono text-sm font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition border border-emerald-200"
                >
                  📞 0817562082
                </a>
              </div>
            </div>

            {/* Secretary Opening Hours */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-serif">
                Horaires d'Ouverture du Secrétariat
              </h3>
              <div className="text-xs text-slate-600 space-y-1">
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span>Lundi à Vendredi :</span>
                  <span className="font-bold text-slate-900">08h00 - 16h30</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-1">
                  <span>Samedi :</span>
                  <span className="font-bold text-slate-900">08h30 - 13h00</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Dimanche :</span>
                  <span>Fermé (Journées de Culte)</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
              
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  Écrire au Secrétariat Général Académique
                </h3>
                <p className="text-xs text-slate-500">
                  Posez vos questions sur les admissions 2026-2027, les équivalences de diplômes ou le système LMD.
                </p>
              </div>

              {sent ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-bold text-emerald-900">Message envoyé !</h4>
                  <p className="text-xs text-emerald-700 max-w-md mx-auto">
                    Notre équipe d'accueil prendra contact avec vous par téléphone ou WhatsApp dans les plus brefs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="ex: Jean MUKENDI"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Numéro de Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="ex: 0893122361"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Adresse Email (optionnel)
                    </label>
                    <input
                      type="email"
                      placeholder="votre.email@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Votre Message ou Question *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Bonjour, je souhaite obtenir des renseignements sur l'inscription en L1 Sciences de l'Informatique..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Envoyer le Message</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
