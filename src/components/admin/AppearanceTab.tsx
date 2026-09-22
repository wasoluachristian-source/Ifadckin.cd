import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Palette, 
  Type, 
  Eye, 
  EyeOff, 
  Save, 
  RotateCcw, 
Check, 
  Sliders, 
  Layers, 
  Layout, 
  CheckCircle2, 
  Monitor, 
  Moon, 
  Sun, 
  Flame,
  MousePointerClick,
  FileText,
  Phone,
  GraduationCap,
  HardDrive,
  Users,
  Compass,
  Code2,
  Brush
} from 'lucide-react';
import { InstituteConfig } from '../../types';

export const AppearanceTab: React.FC = () => {
  const { config, updateConfig, showToast } = useApp();

  // Local working state for the visual customizer
  const [form, setForm] = useState<Partial<InstituteConfig>>({
    fontFamily: config.fontFamily || 'serif',
    baseFontSize: config.baseFontSize || 'normal',
    headingStyle: config.headingStyle || 'bold',
    heroTheme: config.heroTheme || 'navy-dark',
    heroTitle: config.heroTitle || config.bannerTitle || "Bâtir le futur social & intellectuel de la RDC",
    heroTitleColor: config.heroTitleColor || '#ffffff',
    heroSubtitleColor: config.heroSubtitleColor || '#cbd5e1',
    heroMottoColor: config.heroMottoColor || '#fbbf24',
    bannerSubtitle: config.bannerSubtitle || "L'IFADC prépare la nouvelle génération de cadres pour un Congo émergent, compétent et guidé par des valeurs d'intégrité.",
    motto: config.motto || "EXCELLENCE, FOI ET SAVOIR",
    ctaPrimaryText: config.ctaPrimaryText || "Déposer une candidature",
    ctaSecondaryText: config.ctaSecondaryText || "Espace Étudiant",
    homologationNoticeText: config.homologationNoticeText || config.tutelle || "Homologué par le Ministère de l'Enseignement Supérieur et Universitaire (ESU) — RDC",
    developerCreditText: config.developerCreditText || "wastus spart dev",
    footerDescription: config.footerDescription || "Établissement d'enseignement supérieur d'excellence homologué par l'ESU en RDC, formant des cadres chrétiens compétents et intègres.",
    primaryBrandColor: config.primaryBrandColor || '#0f172a',
    primaryAccentColor: config.primaryAccentColor || '#f59e0b',
    heroTitleSize: config.heroTitleSize || 'xl',
    heroTitleWeight: config.heroTitleWeight || 'extrabold',
    showTopContactBar: config.showTopContactBar !== false,
    showESUHomologationBanner: config.showESUHomologationBanner !== false,
    showHeroBadges: config.showHeroBadges !== false,
    showHeroStats: config.showHeroStats !== false,
    showHeroRightCard: config.showHeroRightCard !== false,
    showHeroBgOverlay: config.showHeroBgOverlay !== false,
    showHeroShareButton: config.showHeroShareButton !== false,
    showHeroCtaButtons: config.showHeroCtaButtons !== false,
    showDriveMenuTab: config.showDriveMenuTab !== false,
    showStudentPortalTab: config.showStudentPortalTab !== false,
    showStaffPortalTab: config.showStaffPortalTab !== false,
    showNewsMarquee: config.showNewsMarquee !== false,
    showFooterDeans: config.showFooterDeans !== false,
    showFooterDevCredit: config.showFooterDevCredit !== false,
    showCampusMapInContact: config.showCampusMapInContact !== false,
  });

  const [activeSubSection, setActiveSubSection] = useState<'typography' | 'colors' | 'visibility' | 'texts'>('typography');
  const [isSaving, setIsSaving] = useState(false);

  // Preset color options
  const colorPresets = [
    { name: 'Or & Ambre Chaud', hex: '#f59e0b' },
    { name: 'Doré Royal Profond', hex: '#d97706' },
    { name: 'Bleu Azur Moderne', hex: '#2563eb' },
    { name: 'Vert Émeraude Naturel', hex: '#10b981' },
    { name: 'Rubis / Bordeau', hex: '#e11d48' },
    { name: 'Blanc Pur Épuré', hex: '#ffffff' },
    { name: 'Bleu Ciel Lumineux', hex: '#38bdf8' },
    { name: 'Ardoise Foncée', hex: '#0f172a' },
  ];

  const brandColorPresets = [
    { name: 'Bleu Marine Profond', hex: '#0f172a' },
    { name: 'Bleu Royal Académique', hex: '#1e3a8a' },
    { name: 'Vert Forêt Sombre', hex: '#064e3b' },
    { name: 'Ardoise Minérale', hex: '#1e293b' },
    { name: 'Bordeau Impérial', hex: '#4c0519' },
  ];

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await updateConfig(form);
      showToast("Toutes les modifications visuelles et textuelles ont été enregistrées !");
    } catch {
      showToast("Erreur lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetDefaults = async () => {
    const defaults: Partial<InstituteConfig> = {
      fontFamily: 'serif',
      baseFontSize: 'normal',
      headingStyle: 'bold',
      heroTheme: 'navy-dark',
      heroTitle: "Bâtir le futur social & intellectuel de la RDC",
      heroTitleColor: '#ffffff',
      heroSubtitleColor: '#cbd5e1',
      heroMottoColor: '#fbbf24',
      bannerSubtitle: "L'IFADC prépare la nouvelle génération de cadres pour un Congo émergent, compétent et guidé par des valeurs d'intégrité.",
      motto: "EXCELLENCE, FOI ET SAVOIR",
      ctaPrimaryText: "Déposer une candidature",
      ctaSecondaryText: "Espace Étudiant",
      homologationNoticeText: "Homologué par le Ministère de l'Enseignement Supérieur et Universitaire (ESU) — RDC",
      developerCreditText: "wastus spart dev",
      primaryBrandColor: '#0f172a',
      primaryAccentColor: '#f59e0b',
      heroTitleSize: 'xl',
      heroTitleWeight: 'extrabold',
      showTopContactBar: true,
      showESUHomologationBanner: true,
      showHeroBadges: true,
      showHeroStats: true,
      showHeroRightCard: true,
      showHeroBgOverlay: true,
      showHeroShareButton: true,
      showHeroCtaButtons: true,
      showDriveMenuTab: true,
      showStudentPortalTab: true,
      showStaffPortalTab: true,
      showNewsMarquee: true,
      showFooterDeans: true,
      showFooterDevCredit: true,
      showCampusMapInContact: true,
    };
    setForm(defaults);
    await updateConfig(defaults);
    showToast("Paramètres visuels réinitialisés aux valeurs standards.");
  };

  return (
    <div className="space-y-8">
      
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-300 text-blue-950 flex items-center justify-center font-bold">
            <Brush className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
              <span>Personnalisation Visuelle & Typographie</span>
              <span className="text-[11px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full font-sans font-semibold">
                Design Sur Mesure
              </span>
            </h2>
            <p className="text-xs text-slate-600">
              Modifiez la forme des textes, les polices, tailles, couleurs de l'Institut et supprimez ou masquez les éléments visuels selon vos souhaits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleResetDefaults}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Restaurer l'aspect visuel par défaut"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
          
          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex-1 md:flex-none px-6 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "Enregistrement..." : "Appliquer & Sauvegarder"}</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubSection('typography')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubSection === 'typography'
              ? 'bg-blue-950 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Type className="w-4 h-4" />
          <span>1. Typographie & Formes de Texte</span>
        </button>

        <button
          onClick={() => setActiveSubSection('colors')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubSection === 'colors'
              ? 'bg-blue-950 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>2. Couleurs & Ambiance Thématique</span>
        </button>

        <button
          onClick={() => setActiveSubSection('visibility')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubSection === 'visibility'
              ? 'bg-blue-950 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>3. Affichage / Suppression d'Éléments Visuels</span>
        </button>

        <button
          onClick={() => setActiveSubSection('texts')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeSubSection === 'texts'
              ? 'bg-blue-950 text-white shadow-sm'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>4. Textes, Titres & Mentions</span>
        </button>
      </div>

      {/* LIVE INTERACTIVE PREVIEW PANEL */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-blue-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
              Aperçu en Direct du Thème et des Textes
            </span>
          </div>
          <span className="text-[11px] text-slate-400">
            Police : <strong className="text-white capitalize">{form.fontFamily}</strong> • Ambiance : <strong className="text-white capitalize">{form.heroTheme}</strong>
          </span>
        </div>

        {/* Live Hero Mockup */}
        <div className={`p-6 rounded-2xl border transition-all duration-200 ${
          form.heroTheme === 'clean-light'
            ? 'bg-slate-50 text-slate-900 border-slate-200'
            : form.heroTheme === 'warm-paper'
            ? 'bg-[#fcfaf6] text-[#292524] border-[#e7e5e4]'
            : form.heroTheme === 'slate-minimal'
            ? 'bg-slate-900 text-slate-100 border-slate-700'
            : 'bg-slate-950 text-white border-slate-800'
        }`}>
          
          {/* Simulated Top Badges */}
          {form.showHeroBadges && (
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span 
                className="px-2.5 py-0.5 rounded-full text-[11px] font-bold"
                style={{ 
                  backgroundColor: form.primaryAccentColor || '#f59e0b',
                  color: '#0f172a'
                }}
              >
                Inscriptions Ouvertes • {config.academicYear}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-black/10 dark:bg-white/10 border border-current/20">
                Système L.M.D
              </span>
            </div>
          )}

          {/* Simulated Main Title */}
          <div className="space-y-3 max-w-3xl">
            <h1 
              className={`leading-tight ${
                form.fontFamily === 'serif' ? 'font-serif' : form.fontFamily === 'humanist' ? 'font-sans tracking-wide' : 'font-sans'
              } ${
                form.heroTitleSize === 'sm' ? 'text-xl' :
                form.heroTitleSize === 'md' ? 'text-2xl' :
                form.heroTitleSize === 'lg' ? 'text-3xl sm:text-4xl' :
                form.heroTitleSize === '2xl' ? 'text-4xl sm:text-6xl' :
                'text-3xl sm:text-5xl'
              } ${
                form.heroTitleWeight === 'normal' ? 'font-normal' :
                form.heroTitleWeight === 'semibold' ? 'font-semibold' :
                form.heroTitleWeight === 'bold' ? 'font-bold' : 'font-extrabold'
              }`}
              style={{
                color: form.heroTheme === 'clean-light' || form.heroTheme === 'warm-paper' 
                  ? (form.heroTitleColor === '#ffffff' ? '#0f172a' : form.heroTitleColor)
                  : form.heroTitleColor
              }}
            >
              {form.heroTitle || "Bâtir le futur social & intellectuel de la RDC"}
            </h1>

            <p 
              className="text-sm leading-relaxed max-w-xl"
              style={{
                color: form.heroTheme === 'clean-light' || form.heroTheme === 'warm-paper'
                  ? '#475569'
                  : (form.heroSubtitleColor || '#cbd5e1')
              }}
            >
              {form.bannerSubtitle}
            </p>

            {/* Simulated Stats Row */}
            {form.showHeroStats && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="bg-black/10 dark:bg-white/10 rounded-lg p-2 text-center border border-current/10">
                  <div className="font-bold text-base" style={{ color: form.primaryAccentColor }}>6</div>
                  <div className="text-[10px] opacity-80">Facultés</div>
                </div>
                <div className="bg-black/10 dark:bg-white/10 rounded-lg p-2 text-center border border-current/10">
                  <div className="font-bold text-base text-blue-400">L.M.D</div>
                  <div className="text-[10px] opacity-80">Cycle officiel</div>
                </div>
                <div className="bg-black/10 dark:bg-white/10 rounded-lg p-2 text-center border border-current/10">
                  <div className="font-bold text-base text-emerald-400">100%</div>
                  <div className="text-[10px] opacity-80">Suivi notes</div>
                </div>
                <div className="bg-black/10 dark:bg-white/10 rounded-lg p-2 text-center border border-current/10">
                  <div className="font-bold text-base text-purple-400">Kinshasa</div>
                  <div className="text-[10px] opacity-80">Kasa-Vubu</div>
                </div>
              </div>
            )}

            {/* Simulated CTA Buttons */}
            {form.showHeroCtaButtons && (
              <div className="flex flex-wrap gap-2 pt-3">
                <button 
                  className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer"
                  style={{
                    backgroundColor: form.primaryAccentColor || '#f59e0b',
                    color: '#0f172a'
                  }}
                >
                  {form.ctaPrimaryText || "Déposer une candidature"}
                </button>
                <button className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 border border-current/20 cursor-pointer">
                  {form.ctaSecondaryText || "Espace Étudiant"}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* SECTION 1: TYPOGRAPHY & FONT STYLING */}
      {activeSubSection === 'typography' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 font-serif text-base flex items-center gap-2">
                <Type className="w-5 h-5 text-blue-900" />
                <span>Choix de la Famille de Police & Échelle de Texte</span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Sélectionnez une typographie naturelle, chaleureuse et lisible pour l'ensemble du site web.
              </p>
            </div>

            {/* Font Family Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  id: 'serif', 
                  title: 'Académique & Prestigieuse (Sérif)', 
                  desc: 'Élégante, institutionnelle et chaleureuse, idéale pour les universités d’excellence.',
                  sample: 'Institut Facultaire IFADC',
                  styleClass: 'font-serif'
                },
                { 
                  id: 'sans', 
                  title: 'Épurée & Moderne (Sans-Serif)', 
                  desc: 'Sobre, contemporaine, ultra-lisible sur écrans mobiles et ordinateurs.',
                  sample: 'Institut Facultaire IFADC',
                  styleClass: 'font-sans'
                },
                { 
                  id: 'humanist', 
                  title: 'Humaine & Naturelle (Humanist)', 
                  desc: 'Douce, conviviale, avec une excellente rondeur naturelle et ergonomique.',
                  sample: 'Institut Facultaire IFADC',
                  styleClass: 'font-sans tracking-wide'
                },
                { 
                  id: 'classic', 
                  title: 'Éditoriale & Classique', 
                  desc: 'Charme traditionnel des grandes revues scientifiques et encyclopédies.',
                  sample: 'Institut Facultaire IFADC',
                  styleClass: 'font-serif italic'
                },
              ].map((f) => (
                <div 
                  key={f.id}
                  onClick={() => setForm(prev => ({ ...prev, fontFamily: f.id as any }))}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition flex flex-col justify-between space-y-3 ${
                    form.fontFamily === f.id
                      ? 'border-blue-900 bg-blue-50/50 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{f.title}</span>
                    {form.fontFamily === f.id && (
                      <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0" />
                    )}
                  </div>
                  <div className={`text-base font-bold text-slate-800 py-2 border-y border-slate-100 ${f.styleClass}`}>
                    {f.sample}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Base Font Size & Title Scale */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              
              {/* Overall Website Font Size */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Taille Générale du Texte du Site :
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'small', label: 'Compacte (14px)' },
                    { id: 'normal', label: 'Normale (16px)' },
                    { id: 'large', label: 'Grande (18px)' }
                  ].map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, baseFontSize: s.id as any }))}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border transition text-center ${
                        form.baseFontSize === s.id
                          ? 'bg-blue-950 text-white border-blue-950'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hero Title Size */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Taille du Grand Titre d'Accueil :
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: 'sm', label: 'Moyen' },
                    { id: 'md', label: 'Grand' },
                    { id: 'xl', label: 'Très Grand' },
                    { id: '2xl', label: 'Géant' },
                  ].map(ts => (
                    <button
                      key={ts.id}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, heroTitleSize: ts.id as any }))}
                      className={`py-2 px-1 text-xs font-bold rounded-xl border transition text-center ${
                        form.heroTitleSize === ts.id
                          ? 'bg-blue-950 text-white border-blue-950'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {ts.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title Weight */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Épaisseur / Graisse du Titre :
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'semibold', label: 'Semi-Gras' },
                    { id: 'bold', label: 'Gras' },
                    { id: 'extrabold', label: 'Extra-Gras' }
                  ].map(w => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, heroTitleWeight: w.id as any }))}
                      className={`py-2 px-2 text-xs font-bold rounded-xl border transition text-center ${
                        form.heroTitleWeight === w.id
                          ? 'bg-blue-950 text-white border-blue-950'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SECTION 2: COLORS & THEME ATMOSPHERE */}
      {activeSubSection === 'colors' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 font-serif text-base flex items-center gap-2">
                <Palette className="w-5 h-5 text-[#005a9c]" />
                <span>Palette de Couleurs & Ambiance Thématique de l'IFADC</span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Ajustez les nuances institutionnelles pour donner un aspect humain, naturel et chaleureux au portail.
              </p>
            </div>

            {/* Atmosphere Theme Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 uppercase">
                Style d'Ambiance de l'En-tête & Arrière-Plan :
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    id: 'navy-dark',
                    title: 'Bleu Nuit Académique',
                    desc: 'Prestigieux, classique et solennel, haut contraste avec les dorures.',
                    badge: '🌙 Sombre Noble'
                  },
                  {
                    id: 'clean-light',
                    title: 'Blanc Épuré & Naturel',
                    desc: 'Très lumineux, doux, humain et moderne avec une lecture apaisante.',
                    badge: '☀️ Clair Lumineux'
                  },
                  {
                    id: 'warm-paper',
                    title: 'Papier Chaud & Lin',
                    desc: 'Tons chauds naturels, organiques et confortables pour les yeux.',
                    badge: '📜 Papier Doux'
                  },
                  {
                    id: 'slate-minimal',
                    title: 'Ardoise Minérale & Sobre',
                    desc: 'Design contemporain neutre, gris perle et ardoise subtile.',
                    badge: '⚡ Moderne Sobre'
                  },
                ].map(th => (
                  <div
                    key={th.id}
                    onClick={() => setForm(prev => ({ ...prev, heroTheme: th.id as any }))}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition space-y-2 ${
                      form.heroTheme === th.id
                        ? 'border-blue-500 bg-blue-50/40 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{th.title}</span>
                      <span className="text-[10px] font-semibold text-slate-500">{th.badge}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{th.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Highlight Color Picker */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              
              {/* Primary Accent / Gold Color */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase flex items-center justify-between">
                  <span>Couleur d'Accentuation Principale (Boutons & Dorures) :</span>
                  <span className="font-mono text-xs font-bold text-slate-500">{form.primaryAccentColor}</span>
                </label>

                {/* Preset circles */}
                <div className="flex flex-wrap items-center gap-2">
                  {colorPresets.map(cp => (
                    <button
                      key={cp.hex}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, primaryAccentColor: cp.hex }))}
                      className={`w-8 h-8 rounded-full border-2 transition relative flex items-center justify-center ${
                        form.primaryAccentColor?.toLowerCase() === cp.hex.toLowerCase()
                          ? 'border-blue-900 scale-110 shadow-md ring-2 ring-blue-900/20'
                          : 'border-white shadow-xs hover:scale-105'
                      }`}
                      style={{ backgroundColor: cp.hex }}
                      title={cp.name}
                    >
                      {form.primaryAccentColor?.toLowerCase() === cp.hex.toLowerCase() && (
                        <Check className={`w-4 h-4 ${cp.hex === '#ffffff' ? 'text-slate-900' : 'text-slate-950 font-black'}`} />
                      )}
                    </button>
                  ))}

                  {/* Custom Color Input */}
                  <div className="flex items-center gap-2 ml-2">
                    <input
                      type="color"
                      value={form.primaryAccentColor || '#f59e0b'}
                      onChange={(e) => setForm(prev => ({ ...prev, primaryAccentColor: e.target.value }))}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                      title="Sélecteur libre de couleur d'accent"
                    />
                    <input
                      type="text"
                      value={form.primaryAccentColor || '#f59e0b'}
                      onChange={(e) => setForm(prev => ({ ...prev, primaryAccentColor: e.target.value }))}
                      className="w-24 px-2 py-1 text-xs font-mono rounded border border-slate-300 font-bold"
                      placeholder="#f59e0b"
                    />
                  </div>
                </div>
              </div>

              {/* Hero Title Color Override */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 uppercase flex items-center justify-between">
                  <span>Couleur du Grand Titre de l'Accueil :</span>
                  <span className="font-mono text-xs font-bold text-slate-500">{form.heroTitleColor}</span>
                </label>

                <div className="flex flex-wrap items-center gap-2">
                  {colorPresets.map(cp => (
                    <button
                      key={cp.hex}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, heroTitleColor: cp.hex }))}
                      className={`w-8 h-8 rounded-full border-2 transition relative flex items-center justify-center ${
                        form.heroTitleColor?.toLowerCase() === cp.hex.toLowerCase()
                          ? 'border-blue-900 scale-110 shadow-md ring-2 ring-blue-900/20'
                          : 'border-white shadow-xs hover:scale-105'
                      }`}
                      style={{ backgroundColor: cp.hex }}
                      title={cp.name}
                    >
                      {form.heroTitleColor?.toLowerCase() === cp.hex.toLowerCase() && (
                        <Check className={`w-4 h-4 ${cp.hex === '#ffffff' ? 'text-slate-900' : 'text-slate-950 font-black'}`} />
                      )}
                    </button>
                  ))}

                  <div className="flex items-center gap-2 ml-2">
                    <input
                      type="color"
                      value={form.heroTitleColor || '#ffffff'}
                      onChange={(e) => setForm(prev => ({ ...prev, heroTitleColor: e.target.value }))}
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300"
                    />
                    <input
                      type="text"
                      value={form.heroTitleColor || '#ffffff'}
                      onChange={(e) => setForm(prev => ({ ...prev, heroTitleColor: e.target.value }))}
                      className="w-24 px-2 py-1 text-xs font-mono rounded border border-slate-300 font-bold"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* SECTION 3: VISIBILITY & DELETION/TOGGLING OF VISUAL ELEMENTS */}
      {activeSubSection === 'visibility' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 font-serif text-base flex items-center gap-2">
                <Sliders className="w-5 h-5 text-emerald-700" />
                <span>Affichage & Suppression d'Éléments Visuels</span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Vous avez le plein contrôle : activez ou masquez n'importe quel bloc visuel, bouton ou bandeau pour épurer le site web à votre convenance.
              </p>
            </div>

            {/* Toggles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: 'showTopContactBar',
                  label: 'Barre Supérieure de Contact & Urgences',
                  desc: 'Affiche la barre noire tout en haut avec le téléphone, email, l’année académique et l’adresse.',
                  checked: form.showTopContactBar,
                  icon: <Phone className="w-4 h-4 text-emerald-600" />
                },
                {
                  id: 'showESUHomologationBanner',
                  label: 'Bandeau Officiel Homologation ESU Ministère',
                  desc: 'Bannière jaune d’accréditation ministérielle officielle RDC au-dessus du menu.',
                  checked: form.showESUHomologationBanner,
                  icon: <GraduationCap className="w-4 h-4 text-blue-600" />
                },
                {
                  id: 'showHeroBadges',
                  label: 'Badges Supérieurs du Hero',
                  desc: 'Pillules "Inscriptions Ouvertes", "Système L.M.D" et "Acompte L1 100$".',
                  checked: form.showHeroBadges,
                  icon: <Flame className="w-4 h-4 text-rose-600" />
                },
                {
                  id: 'showHeroStats',
                  label: 'Chiffres Clés Statistiques (6 Facultés, LMD, 100%)',
                  desc: 'Bloc des 4 indicateurs chiffrés sous le grand titre de la page d\'accueil.',
                  checked: form.showHeroStats,
                  icon: <Layers className="w-4 h-4 text-blue-600" />
                },
                {
                  id: 'showHeroRightCard',
                  label: 'Bloc d’Admission Rapide L1 (Carte Latérale Droite)',
                  desc: 'Encadré récapitulatif des étapes d’admission et acompte 100$ dans le Hero.',
                  checked: form.showHeroRightCard,
                  icon: <FileText className="w-4 h-4 text-indigo-600" />
                },
                {
                  id: 'showHeroBgOverlay',
                  label: 'Texture / Image de Fond Campus dans le Hero',
                  desc: 'Image d’auditorium universitaire en transparence dans l’en-tête principal.',
                  checked: form.showHeroBgOverlay,
                  icon: <Layout className="w-4 h-4 text-teal-600" />
                },
                {
                  id: 'showHeroCtaButtons',
                  label: 'Boutons d’Appel à l’Action (Candidature & Espace Étudiant)',
                  desc: 'Les gros boutons interactifs sous le grand titre d’accueil.',
                  checked: form.showHeroCtaButtons,
                  icon: <MousePointerClick className="w-4 h-4 text-[#005a9c]" />
                },
                {
                  id: 'showHeroShareButton',
                  label: 'Bouton "Partager le site officiel"',
                  desc: 'Bouton permettant de copier ou diffuser l’adresse web de l’IFADC.',
                  checked: form.showHeroShareButton,
                  icon: <GraduationCap className="w-4 h-4 text-blue-600" />
                },
                {
                  id: 'showDriveMenuTab',
                  label: 'Onglet "Google Drive" dans la Barre de Navigation',
                  desc: 'Bouton d’accès direct aux cours et supports partagés Google Drive.',
                  checked: form.showDriveMenuTab,
                  icon: <HardDrive className="w-4 h-4 text-blue-600" />
                },
                {
                  id: 'showStudentPortalTab',
                  label: 'Onglet "Espace Étudiant" dans le Menu',
                  desc: 'Accès direct pour la consultation des relevés de notes et cartes d’étudiants.',
                  checked: form.showStudentPortalTab,
                  icon: <GraduationCap className="w-4 h-4 text-purple-600" />
                },
                {
                  id: 'showStaffPortalTab',
                  label: 'Onglet "Espace Personnel" dans le Menu',
                  desc: 'Accès pour les professeurs, doyens et gestionnaires académiques.',
                  checked: form.showStaffPortalTab,
                  icon: <Users className="w-4 h-4 text-emerald-600" />
                },
                {
                  id: 'showNewsMarquee',
                  label: 'Ruban Défilant des Dernières Nouvelles & Alertes',
                  desc: 'Bandeau d’information en continu sous la navigation principale.',
                  checked: form.showNewsMarquee,
                  icon: <Flame className="w-4 h-4 text-rose-600" />
                },
                {
                  id: 'showFooterDeans',
                  label: 'Liste des Doyens et Facultés dans le Pied de Page',
                  desc: 'Colonne récapitulative des doyens de facultés dans le bas de page.',
                  checked: form.showFooterDeans,
                  icon: <Compass className="w-4 h-4 text-slate-700" />
                },
                {
                  id: 'showFooterDevCredit',
                  label: 'Mention Développeur ("wastus spart dev")',
                  desc: 'Affichage de la signature du concepteur dans le pied de page du site.',
                  checked: form.showFooterDevCredit,
                  icon: <Code2 className="w-4 h-4 text-[#005a9c]" />
                },
                {
                  id: 'showCampusMapInContact',
                  label: 'Carte Interactive Google Maps dans la Section Contact',
                  desc: 'Carte et repères d’orientation du campus central de Kasa-Vubu.',
                  checked: form.showCampusMapInContact,
                  icon: <Compass className="w-4 h-4 text-rose-600" />
                }
              ].map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setForm(prev => ({ ...prev, [item.id]: !prev[item.id as keyof InstituteConfig] }))}
                  className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                    item.checked
                      ? 'bg-emerald-50/40 border-emerald-300'
                      : 'bg-slate-50 border-slate-200 opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl mt-0.5 ${item.checked ? 'bg-emerald-100' : 'bg-slate-200'}`}>
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{item.label}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Switch Toggle Visual */}
                  <div className={`w-11 h-6 rounded-full transition flex items-center px-1 shrink-0 ${
                    item.checked ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                  }`}>
                    <div className="w-4 h-4 rounded-full bg-white shadow-md"></div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* SECTION 4: TEXTS, TITLES & CUSTOM LABELS */}
      {activeSubSection === 'texts' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-slate-900 font-serif text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-900" />
                <span>Textes Principaux, Titres & Mentions Personnalisées</span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Rédigez les textes exactement comme vous le désirez pour que votre site ait une tonalité parfaitement humaine et authentique.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Hero Big Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Grand Titre Principal d'Accueil :
                </label>
                <input
                  type="text"
                  value={form.heroTitle || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, heroTitle: e.target.value }))}
                  placeholder="Bâtir le futur social & intellectuel de la RDC"
                  className="w-full px-4 py-2.5 text-sm font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 bg-white"
                />
              </div>

              {/* Hero Subtitle */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Sous-titre Explicatif du Hero :
                </label>
                <textarea
                  rows={3}
                  value={form.bannerSubtitle || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, bannerSubtitle: e.target.value }))}
                  placeholder="L'IFADC prépare la nouvelle génération de cadres pour un Congo émergent..."
                  className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-900 bg-white"
                />
              </div>

              {/* Motto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Devise Officielle de l'Institut :
                  </label>
                  <input
                    type="text"
                    value={form.motto || ''}
                    onChange={(e) => setForm(prev => ({ ...prev, motto: e.target.value }))}
                    placeholder="EXCELLENCE, FOI ET SAVOIR"
                    className="w-full px-4 py-2 text-xs font-bold rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Texte de la Mention Développeur (Footer) :
                  </label>
                  <input
                    type="text"
                    value={form.developerCreditText || ''}
                    onChange={(e) => setForm(prev => ({ ...prev, developerCreditText: e.target.value }))}
                    placeholder="wastus spart dev"
                    className="w-full px-4 py-2 text-xs font-bold text-[#005a9c] rounded-xl border border-slate-300 bg-white font-mono"
                  />
                </div>
              </div>

              {/* CTA Buttons text */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Libellé Bouton Principal (CTA 1) :
                  </label>
                  <input
                    type="text"
                    value={form.ctaPrimaryText || ''}
                    onChange={(e) => setForm(prev => ({ ...prev, ctaPrimaryText: e.target.value }))}
                    placeholder="Déposer une candidature"
                    className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase">
                    Libellé Bouton Secondaire (CTA 2) :
                  </label>
                  <input
                    type="text"
                    value={form.ctaSecondaryText || ''}
                    onChange={(e) => setForm(prev => ({ ...prev, ctaSecondaryText: e.target.value }))}
                    placeholder="Espace Étudiant"
                    className="w-full px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white"
                  />
                </div>
              </div>

              {/* Homologation text */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Mention d'Homologation & Tutelle Ministérielle :
                </label>
                <input
                  type="text"
                  value={form.homologationNoticeText || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, homologationNoticeText: e.target.value }))}
                  placeholder="Homologué par le Ministère de l'Enseignement Supérieur et Universitaire (ESU) — RDC"
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                />
              </div>

              {/* Footer Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">
                  Description Résumée en Pied de Page :
                </label>
                <textarea
                  rows={2}
                  value={form.footerDescription || ''}
                  onChange={(e) => setForm(prev => ({ ...prev, footerDescription: e.target.value }))}
                  placeholder="Établissement d'enseignement supérieur d'excellence homologué par l'ESU en RDC..."
                  className="w-full px-4 py-2 text-xs rounded-xl border border-slate-300 bg-white"
                />
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Bottom Save Action Bar */}
      <div className="sticky bottom-4 z-20 bg-blue-950 text-white p-4 rounded-2xl shadow-2xl border border-blue-900 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-white font-semibold">
          <GraduationCap className="w-4 h-4 text-blue-600" />
          <span>N'oubliez pas d'appliquer vos modifications pour les publier en direct sur le site web.</span>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="px-6 py-2.5 bg-[#005a9c] hover:bg-blue-300 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition shrink-0 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? "Enregistrement en cours..." : "Enregistrer les modifications"}</span>
        </button>
      </div>

    </div>
  );
};
