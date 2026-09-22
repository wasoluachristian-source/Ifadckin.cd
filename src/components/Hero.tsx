import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  GraduationCap, 
  FileText, 
  Search, 
  CheckCircle2, 
  Award, 
  MapPin, 
  Phone,
  Share2,
  Globe,
  BookOpen,
  ChevronRight,
  Calendar,
  Users
} from 'lucide-react';

export const Hero: React.FC = () => {
  const { config, setActiveTab, setIsShareModalOpen, faculties } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'programme' | 'facultes' | 'conditions' | 'etudiant'>('programme');

  const heroTitle = config.heroTitle || config.bannerTitle || "PRÉ-RENTRÉE EN LICENCE LMD (L1)";
  const heroSubtitle = config.bannerSubtitle || `Année Académique ${config.academicYear} • Du lundi au vendredi • Assosa N° 2219 Kasa-Vubu`;

  return (
    <div className="bg-white text-slate-900">
      
      {/* ========================================================================= */}
      {/* 1. UNIVERSITÉ DE MONTRÉAL HERO BANNER WITH SOLID BLUE CARD (IMG_6461) */}
      {/* ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-slate-100 border-b border-slate-200">
        
        {/* Campus facade background photo */}
        <div className="relative w-full h-[280px] sm:h-[380px] lg:h-[440px] overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&auto=format&fit=crop&q=80" 
            alt="Campus Universitaire IFADC Kinshasa"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-950/20" />
        </div>

        {/* Floating Solid Blue Card Overlaid on Campus Photo */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-28 sm:-mt-40 lg:-mt-48 mb-12 z-20">
          <div className="max-w-md sm:max-w-lg bg-[#005a9c] text-white p-6 sm:p-8 rounded-none shadow-xl space-y-4">
            
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-sans text-white leading-tight">
              Bonne rentrée !
            </h2>

            <p className="text-base sm:text-lg text-blue-100 font-light leading-relaxed">
              Profitez des formations universitaires et des ressources d'excellence de l'IFADC
            </p>

            <div className="pt-3 space-y-2.5 text-sm sm:text-base font-semibold text-white">
              <button
                onClick={() => {
                  setActiveTab('announcements');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left flex items-center gap-1.5 hover:text-blue-200 transition py-0.5 cursor-pointer"
              >
                <span>Calendrier de la vie étudiante</span>
                <ChevronRight className="w-4 h-4 text-blue-200" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('student-portal');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left flex items-center gap-1.5 hover:text-blue-200 transition py-0.5 cursor-pointer"
              >
                <span>Soutien pour réussir & Espace Étudiant</span>
                <ChevronRight className="w-4 h-4 text-blue-200" />
              </button>

              <button
                onClick={() => {
                  setActiveTab('admission');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left flex items-center gap-1.5 hover:text-blue-200 transition py-0.5 cursor-pointer"
              >
                <span>Admissions L1 (Acompte {config.l1TuitionAmount}{config.currency})</span>
                <ChevronRight className="w-4 h-4 text-blue-200" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LES COURS DU PARNASSE HERO BANNER (IMG_6460) */}
      {/* ========================================================================= */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        {/* Photographic background with dark overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&auto=format&fit=crop&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-slate-950/80" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-10 pb-12 sm:pt-14 sm:pb-16 space-y-6">
          
          {/* Main Uppercase Headline matching IMG_6460 */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight font-sans">
            {heroTitle}
          </h1>

          {/* Subtitle / Dates */}
          <p className="text-sm sm:text-base text-slate-300 font-medium tracking-wide">
            {heroSubtitle}
          </p>

          {/* Key Checklist / Value Propositions */}
          <div className="space-y-2.5 text-sm sm:text-base text-slate-200 leading-relaxed font-light">
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Prendre le rythme de l'université</strong> avant la rentrée académique</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Acquérir les bonnes méthodes</strong> en Santé, Économie, Droit, Informatique & Théologie</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Identifier ses points forts et ses fragilités</strong> grâce à des entraînements guidés</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Comprendre les attentes du système LMD</strong> dès le début de l'année</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold">•</span>
              <span><strong>Gagner en confiance</strong> pour aborder les premières semaines plus sereinement</span>
            </div>
          </div>

          {/* Blue CTA Button "Je m'inscris" */}
          <div className="pt-2">
            <button
              onClick={() => {
                setActiveTab('admission');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#005a9c] hover:bg-[#004b82] text-white font-extrabold text-base rounded-md transition shadow-lg flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wide active:scale-98"
            >
              <span>Je m'inscris</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SUB-NAVIGATION BAR (Dark Slate Bar with active Blue Underline) */}
      {/* ========================================================================= */}
      <div className="bg-slate-900 text-slate-300 border-b border-slate-800 sticky top-16 z-30 shadow-md">
        <div className="max-w-4xl mx-auto px-4 flex items-center gap-6 overflow-x-auto no-scrollbar text-xs sm:text-sm font-semibold">
          
          <button
            onClick={() => setActiveSubTab('programme')}
            className={`py-3 px-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeSubTab === 'programme'
                ? 'border-[#005a9c] text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Programme
          </button>

          <button
            onClick={() => setActiveSubTab('facultes')}
            className={`py-3 px-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeSubTab === 'facultes'
                ? 'border-[#005a9c] text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Facultés Organisées ({faculties.length})
          </button>

          <button
            onClick={() => setActiveSubTab('conditions')}
            className={`py-3 px-2 border-b-2 transition whitespace-nowrap cursor-pointer ${
              activeSubTab === 'conditions'
                ? 'border-[#005a9c] text-white font-bold'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Modalités L1 (Acompte {config.l1TuitionAmount}{config.currency})
          </button>

          <button
            onClick={() => {
              setActiveTab('student-portal');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="py-3 px-2 border-b-2 border-transparent text-slate-400 hover:text-white transition whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          >
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span>Espace Étudiant</span>
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. EDITORIAL CONTENT SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        {activeSubTab === 'programme' && (
          <div className="space-y-6">
            
            {/* Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-slate-900 tracking-tight leading-snug font-sans">
                STAGE DE PRÉ-RENTRÉE & CURSUS LMD : BIEN DÉMARRER SA PREMIÈRE ANNÉE
              </h2>
              {/* Blue Accent Underline Bar */}
              <div className="w-16 h-1 bg-[#005a9c] mt-3" />
            </div>

            {/* Paragraphs with bold keywords */}
            <div className="text-slate-700 text-base leading-relaxed space-y-4 font-normal">
              <p>
                La première année de Licence LMD (L1), très exigeante, représente souvent un changement de rythme important pour les étudiants : nouvelles méthodes à assimiler, exigences élevées, volume de travail soutenu et nécessité d'être rapidement efficace.
              </p>

              <p>
                Ce cursus et ces séances d'orientation permettent de <strong>prendre de l'avance sur les méthodes et les attendus du système LMD</strong>, afin d'aborder la première session d'examens avec sérénité et d'acquérir les bases solides indispensables à la réussite universitaire.
              </p>
            </div>

            {/* Key Academic Pillars Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#005a9c] flex items-center justify-center font-bold">
                  <Award className="w-5 h-5 text-[#005a9c]" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm uppercase">Agrément Officiel ESU</h3>
                <p className="text-xs text-slate-600">
                  Diplômes d'État officiellement homologués et conformes aux directives nationales du système LMD.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#005a9c] flex items-center justify-center font-bold">
                  <BookOpen className="w-5 h-5 text-[#005a9c]" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm uppercase">6 Facultés d'Avenir</h3>
                <p className="text-xs text-slate-600">
                  Santé, Sciences Économiques, Droit, Informatique de Gestion, Théologie & Sciences de l'Éducation.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#005a9c] flex items-center justify-center font-bold">
                  <GraduationCap className="w-5 h-5 text-[#005a9c]" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm uppercase">Notes en Direct</h3>
                <p className="text-xs text-slate-600">
                  Portail étudiant sécurisé pour consulter ses cotes, bulletins et relevés de notes en temps réel.
                </p>
              </div>
            </div>

            {/* Direct CTA Box */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md mt-6">
              <div>
                <h4 className="font-bold text-base uppercase tracking-wide text-blue-300">
                  Inscriptions Ouvertes ({config.academicYear})
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Déposez votre dossier en ligne ou passez au campus Assosa 2219 Kasa-Vubu.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('admission');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition whitespace-nowrap cursor-pointer shadow"
              >
                Commencer l'inscription
              </button>
            </div>

          </div>
        )}

        {activeSubTab === 'facultes' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold uppercase text-slate-900 tracking-tight font-sans">
                LES 6 FACULTÉS DE L'IFADC
              </h2>
              <div className="w-16 h-1 bg-[#005a9c] mt-2 mb-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faculties.map((fac) => (
                <div 
                  key={fac.id}
                  onClick={() => {
                    setActiveTab('faculties');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-slate-50 transition cursor-pointer group shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800 group-hover:bg-blue-50 group-hover:text-blue-900 transition">
                      {fac.code}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#005a9c] transition group-hover:translate-x-1" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mt-2 group-hover:text-blue-900 transition">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                    {fac.description}
                  </p>
                  <div className="mt-3 text-[11px] font-semibold text-blue-900">
                    Doyen : {fac.deanName}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'conditions' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold uppercase text-slate-900 tracking-tight font-sans">
                MODALITÉS & CONDITIONS D'ADMISSION L1
              </h2>
              <div className="w-16 h-1 bg-[#005a9c] mt-2 mb-6" />
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 text-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#005a9c] text-white flex items-center justify-center font-black text-lg">
                  {config.l1TuitionAmount}{config.currency}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Frais d'acompte première tranche (L1)</h3>
                  <p className="text-xs text-slate-600">Possibilité d'échelonnement et validation immédiate du dossier.</p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-700 pt-2 border-t border-blue-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Photocopie du Diplôme d'État ou attestation de réussite / Bac</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Extrait d'acte de naissance ou certificat de nationalité</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>4 photos passeport récentes & fiche d'inscription remplie</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setActiveTab('admission');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition"
                >
                  Remplir le formulaire en ligne
                </button>
              </div>
            </div>
          </div>
        )}

      </section>

    </div>
  );
};
