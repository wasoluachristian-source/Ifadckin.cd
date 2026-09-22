import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  FileText, 
  UserCheck, 
  ArrowRight, 
  Building2, 
  Calendar, 
  Award,
  AlertCircle,
  Download,
  Printer
} from 'lucide-react';
import { ApplicationStatus } from '../types';

export const ApplicationTracker: React.FC = () => {
  const { applications, findApplicationByNumber, setActiveTab, loginStudent, students, config } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('IFADC-2026-REG-8492');
  const [searchedDossier, setSearchedDossier] = useState(() => {
    return applications[0] || null;
  });
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = findApplicationByNumber(searchQuery.trim());
    setSearchedDossier(found || null);
    setHasSearched(true);
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'INSCRIPTION_VALIDEE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Inscription Définitive Validée
          </span>
        );
      case 'ACCEPTE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-900 border border-blue-300">
            <CheckCircle2 className="w-4 h-4 text-blue-700" />
            Admissibilité Confirmée
          </span>
        );
      case 'EN_COURS':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-950 border border-blue-300">
            <Clock className="w-4 h-4 text-blue-800" />
            Dossier en cours d'évaluation
          </span>
        );
      case 'REFUSE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-4 h-4 text-rose-600" />
            Dossier Non Retenu
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <Clock className="w-4 h-4 text-slate-500" />
            Dossier Soumis
          </span>
        );
    }
  };

  // Switch to student portal if matricule exists
  const handleGoToStudentPortal = (matricule?: string) => {
    if (matricule) {
      loginStudent(matricule, 'IFADC2026');
    }
    setActiveTab('student-portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-950 uppercase tracking-wider">
            <Search className="w-3.5 h-3.5 text-blue-700" />
            Vérification Instantanée
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Suivi de Dossier & Statut d'Admission
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Consultez en direct l'avancement de votre dossier d'inscription en entrant votre référence de candidature.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md mb-8">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Entrez votre Numéro de Dossier (ex: IFADC-2026-REG-8492)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="IFADC-2026-REG-XXXX"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 text-sm font-mono font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none uppercase"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Rechercher</span>
              </button>
            </div>

            {/* Quick Demo Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 text-xs text-slate-500">
              <span className="font-semibold">Exemples de dossiers actifs :</span>
              {applications.slice(0, 3).map((app) => (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => {
                    setSearchQuery(app.dossierNumber);
                    setSearchedDossier(app);
                    setHasSearched(true);
                  }}
                  className="underline hover:text-blue-950 font-mono text-[11px] bg-slate-100 px-2 py-0.5 rounded"
                >
                  {app.dossierNumber} ({app.firstName})
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Results Card */}
        {hasSearched && (
          <div>
            {searchedDossier ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden space-y-6 p-6 sm:p-8">
                
                {/* Status Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-1">
                    <div className="text-xs font-mono font-bold text-slate-500">
                      RÉFÉRENCE : {searchedDossier.dossierNumber}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 font-serif">
                      {searchedDossier.firstName} {searchedDossier.middleName ? searchedDossier.middleName + ' ' : ''}{searchedDossier.lastName}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Candidature soumise le {new Date(searchedDossier.submittedAt).toLocaleDateString('fr-FR')} • {searchedDossier.academicYear}
                    </p>
                  </div>
                  <div>
                    {getStatusBadge(searchedDossier.status)}
                  </div>
                </div>

                {/* Academic Choice info */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                  <div>
                    <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                      Faculté sollicitée
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {searchedDossier.facultyName}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                      Option & Niveau
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {searchedDossier.optionName} ({searchedDossier.level})
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px]">
                      Examen d'État / Bac
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {searchedDossier.diplomaPercentage}% ({searchedDossier.diplomaYear})
                    </span>
                  </div>
                </div>

                {/* Visual Timeline of Dossier Tracking */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Chronologie du Traitement du Dossier :
                  </h3>

                  <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-6 text-xs">
                    
                    {/* Step 1: Submission */}
                    <div className="relative">
                      <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 ring-4 ring-white"></div>
                      <div className="font-bold text-slate-900">1. Dépôt et enregistrement numérique du dossier</div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Dossier reçu avec pièces justificatives ({searchedDossier.documents.length} document(s) téléversé(s)).
                      </p>
                    </div>

                    {/* Step 2: Verification */}
                    <div className="relative">
                      <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full ring-4 ring-white ${
                        searchedDossier.status !== 'SOUMIS' ? 'bg-emerald-500' : 'bg-[#005a9c] animate-pulse'
                      }`}></div>
                      <div className="font-bold text-slate-900">2. Examen de conformité académique</div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        Vérification de l'attestation du Bac et des bulletins scolaires par la commission d'admission.
                      </p>
                    </div>

                    {/* Step 3: Decision */}
                    <div className="relative">
                      <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full ring-4 ring-white ${
                        ['ACCEPTE', 'INSCRIPTION_VALIDEE'].includes(searchedDossier.status)
                          ? 'bg-emerald-500'
                          : searchedDossier.status === 'REFUSE'
                            ? 'bg-rose-500'
                            : 'bg-slate-300'
                      }`}></div>
                      <div className="font-bold text-slate-900">3. Décision du Jury d'Admission</div>
                      <p className="text-slate-500 text-[11px] mt-0.5">
                        {searchedDossier.adminNotes || "En cours d'étude par la commission académique."}
                      </p>
                    </div>

                    {/* Step 4: Final Admission & Matricule */}
                    <div className="relative">
                      <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full ring-4 ring-white ${
                        searchedDossier.status === 'INSCRIPTION_VALIDEE' || searchedDossier.assignedMatricule
                          ? 'bg-emerald-500'
                          : 'bg-slate-300'
                      }`}></div>
                      <div className="font-bold text-slate-900">4. Attribution du Matricule & Accès Espace Étudiant</div>
                      {searchedDossier.assignedMatricule ? (
                        <div className="mt-1 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                          <span className="font-bold">Matricule Officiel Attribué : </span>
                          <span className="font-mono font-black text-sm bg-emerald-200 px-2 py-0.5 rounded ml-1">
                            {searchedDossier.assignedMatricule}
                          </span>
                        </div>
                      ) : (
                        <p className="text-slate-500 text-[11px] mt-0.5">
                          Après versement de l'acompte de {config.l1TuitionAmount}{config.currency} à la caisse centrale ({config.address}, Kasa-Vubu).
                        </p>
                      )}
                    </div>

                  </div>
                </div>

                {/* Actions & Next Steps */}
                <div className="border-t border-slate-100 pt-5 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimer l'état du dossier</span>
                    </button>
                  </div>

                  {searchedDossier.assignedMatricule ? (
                    <button
                      onClick={() => handleGoToStudentPortal(searchedDossier.assignedMatricule)}
                      className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-sm transition flex items-center gap-2"
                    >
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>Accéder à mon Espace Étudiant (Notes)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="text-xs text-slate-500 italic">
                      Campus IFADC: {config.address}, Réf: {config.reference} • Tél: {config.phone}
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                <AlertCircle className="w-10 h-10 text-[#005a9c] mx-auto" />
                <h3 className="text-lg font-bold text-slate-900">Aucun dossier trouvé</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Le numéro de dossier "{searchQuery}" n'existe pas ou comporte une faute de frappe. Vérifiez le reçu d'inscription.
                </p>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
