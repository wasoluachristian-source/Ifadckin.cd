import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  Mail, 
  Phone, 
  FileText, 
  Download, 
  BookOpen, 
  Laptop, 
  Stethoscope, 
  Scale, 
  TrendingUp, 
  Briefcase, 
  Share2, 
  UserCheck, 
  Layers,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Faculty, Announcement } from '../types';

export const FacultyDetailView: React.FC = () => {
  const { 
    faculties, 
    selectedFacultyId, 
    setActiveTab, 
    setSelectedFacultyId, 
    announcements, 
    config, 
    showToast 
  } = useApp();

  const faculty: Faculty | undefined = faculties.find(f => f.id === selectedFacultyId) || faculties[0];

  if (!faculty) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Faculté introuvable</h2>
        <button
          onClick={() => setActiveTab('faculties')}
          className="mt-4 px-6 py-2.5 bg-[#005a9c] text-white font-bold rounded-xl text-xs uppercase cursor-pointer"
        >
          Retour aux facultés
        </button>
      </div>
    );
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-6 h-6" />;
      case 'Stethoscope': return <Stethoscope className="w-6 h-6" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Scale': return <Scale className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6" />;
      default: return <GraduationCap className="w-6 h-6" />;
    }
  };

  // Filter announcements for this faculty
  const facultyAnnouncements = announcements.filter(
    a => a.facultyId === faculty.id || a.facultyId === 'ALL'
  );

  const handleDownloadDoc = (announcement: Announcement) => {
    const fileName = announcement.attachmentName || 'DOCUMENT_FACULTE_IFADC.pdf';
    if (announcement.attachmentUrl && announcement.attachmentUrl.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = announcement.attachmentUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast(`Téléchargement du fichier « ${fileName} » réussi.`);
    } else {
      const content = `INSTITUT FACULTAIRE DES ASSEMBLÉES DE DIEU DU CONGO (IFADC)
FACULTÉ : ${faculty.name} (Code : ${faculty.code})
------------------------------------------------------------
Document: ${announcement.title}
Catégorie: ${announcement.category}
Date: ${announcement.publishedAt}

${announcement.summary ? `RÉSUMÉ:\n${announcement.summary}\n\n` : ''}CONTENU OFFICIEL:
${announcement.content}

------------------------------------------------------------
Contact Décanat: ${faculty.contactPhone || config.phone} | ${faculty.contactEmail || config.email}`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName.endsWith('.txt') || fileName.endsWith('.pdf') ? fileName : `${fileName}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast(`Téléchargement de « ${fileName} » lancé.`);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedFacultyId(null);
              setActiveTab('faculties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#005a9c] transition py-1 px-2.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#005a9c]" />
            <span>Retour à l'offre académique</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Facultés</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-[#005a9c] truncate max-w-[200px]">{faculty.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner with Cover Photo */}
      <div className="relative bg-slate-950 text-white overflow-hidden">
        {faculty.coverImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000"
            style={{ backgroundImage: `url('${faculty.coverImage}')` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl space-y-4">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#005a9c] text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-sm">
                Code : {faculty.code}
              </span>
              {faculty.cycles.map(c => (
                <span key={c} className="px-3 py-1 bg-slate-900 border border-slate-700 text-blue-200 text-xs font-bold rounded-lg uppercase">
                  Cycle {c} LMD
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-serif text-white tracking-tight">
              {faculty.name}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
              {faculty.description}
            </p>

            {/* Quick Contacts & Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => {
                  setActiveTab('admission');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Postuler dans cette Faculté (100$ L1)</span>
              </button>

              {faculty.contactPhone && (
                <a 
                  href={`tel:${faculty.contactPhone}`}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 text-xs font-semibold flex items-center gap-2 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-300" />
                  <span>Secrétariat Décanal : {faculty.contactPhone}</span>
                </a>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10 space-y-10">
        
        {/* Mot du Doyen / Dean Section */}
        {faculty.dean && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Dean Photo & Title */}
              <div className="md:col-span-4 flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="relative mb-4">
                  <img
                    src={faculty.dean.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80"}
                    alt={faculty.dean.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl object-cover shadow-md border-4 border-white"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[#005a9c] text-white p-1.5 rounded-xl shadow">
                    <Award className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-serif">
                  {faculty.dean.name}
                </h3>
                <span className="text-xs font-semibold text-[#005a9c] mt-1">
                  {faculty.dean.title}
                </span>
                <span className="text-[11px] text-slate-500 mt-0.5 max-w-xs">
                  {faculty.dean.academicRank}
                </span>

                <div className="mt-4 pt-3 border-t border-slate-200 w-full space-y-1.5 text-xs text-slate-600">
                  {faculty.dean.email && (
                    <div className="flex items-center justify-center gap-1.5 text-[11px]">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{faculty.dean.email}</span>
                    </div>
                  )}
                  {faculty.dean.phone && (
                    <div className="flex items-center justify-center gap-1.5 text-[11px]">
                      <Phone className="w-3 h-3 text-[#005a9c]" />
                      <span>{faculty.dean.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dean's Message */}
              <div className="md:col-span-8 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-[#005a9c] uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-[#005a9c]" />
                  <span>Mot du Doyen</span>
                </div>

                <h2 className="text-2xl font-bold font-serif text-slate-900">
                  « Former des compétences de classe mondiale guidées par des valeurs d'intégrité »
                </h2>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic bg-slate-50/80 p-5 rounded-2xl border-l-4 border-[#005a9c]">
                  "{faculty.dean.message}"
                </p>

                <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Programme conforme LMD ESURSI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Laboratoires & Stages cliniques</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span>Corps professoral qualifié</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Academic Departments / Filières Breakdown */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                Départements & Filières de Spécialisation
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Cursus académique structuré en crédits capitalisables et transférables.
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-950 font-bold text-xs rounded-full border border-blue-200">
              {faculty.options.length} Filières organisées
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faculty.options.map((opt, idx) => (
              <div 
                key={opt.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#005a9c] text-white font-bold flex items-center justify-center text-xs">
                      {idx + 1}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 font-serif">
                      {opt.name}
                    </h3>
                  </div>
                  <div className="flex gap-1">
                    {opt.cycle.map(c => (
                      <span key={c} className="text-[10px] uppercase font-black px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {opt.description || "Formation approfondie alliant enseignements théoriques magistraux, travaux pratiques dirigés et stage professionnel obligatoire."}
                </p>

                {opt.careerOutcomes && opt.careerOutcomes.length > 0 && (
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                      Débouchés professionnels :
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {opt.careerOutcomes.map((career, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#005a9c]"></span>
                          <span>{career}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Admission Requirements & Career Prospects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Requirements */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#005a9c] flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold font-serif text-slate-900">
                Conditions d'Admission
              </h3>
            </div>
            
            <ul className="space-y-2.5 text-xs text-slate-700">
              {(faculty.admissionRequirements || [
                "Être titulaire d'un Diplôme d'État ou équivalent certifié",
                "Formulaire de candidature complété en ligne ou au guichet",
                "Paiement de l'acompte d'inscription fixé à 100$ pour la Licence 1",
                "Recommandation ecclésiastique ou attestation de bonne conduite et mœurs"
              ]).map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Careers */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#005a9c] flex items-center justify-center font-bold">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold font-serif text-slate-900">
                Perspectives Professionnelles
              </h3>
            </div>
            
            <ul className="space-y-2.5 text-xs text-slate-700">
              {(faculty.careerProspects || [
                "Cadres de direction et experts techniques en entreprises",
                "Consultants spécialisés et chercheurs académiques",
                "Fonction publique, ministères et institutions internationales",
                "Entrepreneuriat innovant et création de cabinets d'expertise"
              ]).map((car, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#005a9c] shrink-0 mt-0.5" />
                  <span>{car}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Faculty Announcements and Downloadable Documents */}
        {facultyAnnouncements.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold font-serif text-slate-900">
                  Actualités & Documents de la Faculté
                </h2>
                <p className="text-xs text-slate-500">
                  Communiqués officiels, syllabus et fiches techniques téléchargeables.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facultyAnnouncements.map((ann) => (
                <div 
                  key={ann.id}
                  className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1.5">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-900 rounded font-bold uppercase text-[10px]">
                        {ann.category}
                      </span>
                      <span>{new Date(ann.publishedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 font-serif">
                      {ann.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                      {ann.summary || ann.content}
                    </p>
                  </div>

                  {ann.attachmentName && (
                    <button
                      onClick={() => handleDownloadDoc(ann)}
                      className="mt-2 w-full py-2 bg-white hover:bg-slate-100 text-blue-950 font-bold rounded-lg text-xs border border-slate-300 flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#005a9c]" />
                      <span className="truncate max-w-[220px]">Télécharger {ann.attachmentName}</span>
                      {ann.attachmentSize && <span className="text-[10px] text-slate-400">({ann.attachmentSize})</span>}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Call to Action */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">
              Rejoignez l'IFADC en 2026-2027
            </span>
            <h3 className="text-2xl font-bold font-serif">
              Postulez en {faculty.name}
            </h3>
            <p className="text-xs text-slate-300">
              Formulaire d'inscription instantané avec acompte fixé à 100$ pour la Licence 1. Attribution rapide du matricule.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('admission');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-[#005a9c] hover:bg-[#004b82] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
            >
              Remplir ma candidature
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
