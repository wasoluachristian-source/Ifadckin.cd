import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  Lock, 
  UserCheck, 
  FileText, 
  Download, 
  CreditCard, 
  Calendar, 
  Award, 
  CheckCircle, 
  AlertTriangle, 
  BookOpen, 
  Printer, 
  Clock, 
  ShieldCheck, 
  HelpCircle,
  Eye,
  LogOut,
  Send,
  HardDrive
} from 'lucide-react';
import { Student, SubjectGrade } from '../types';

export const StudentPortal: React.FC = () => {
  const { 
    students, 
    currentStudent, 
    loginStudent, 
    logoutStudent, 
    setSelectedStudentForTranscript,
    setSelectedStudentForCard,
    config,
    setActiveTab,
    showToast 
  } = useApp();

  // Login Form state
  const [matriculeInput, setMatriculeInput] = useState<string>('');
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active view inside portal
  const [portalTab, setPortalTab] = useState<'grades' | 'fees' | 'documents' | 'profile'>('grades');
  const [selectedSemester, setSelectedSemester] = useState<1 | 2 | 'all'>('all');

  // Claim / Administrative Request state
  const [claimSubject, setClaimSubject] = useState<string>('');
  const [claimMessage, setClaimMessage] = useState<string>('');
  const [claimSubmitted, setClaimSubmitted] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matriculeInput.trim()) {
      setLoginError("Veuillez saisir votre numéro matricule.");
      return;
    }
    const success = loginStudent(matriculeInput, passwordInput || 'IFADC2026');
    if (!success) {
      setLoginError("Matricule ou code d'accès erroné. Veuillez vérifier ou contacter le secrétariat.");
    } else {
      setLoginError(null);
    }
  };

  const handleDemoSelect = (student: Student) => {
    setMatriculeInput(student.matricule);
    setPasswordInput(student.accessCode || 'IFADC2026');
    loginStudent(student.matricule, student.accessCode || 'IFADC2026');
  };

  // Grade stats calculations
  const calculateGradesSummary = (grades: SubjectGrade[]) => {
    if (!grades || grades.length === 0) return { average: 0, totalCredits: 0, validatedCredits: 0, mention: 'En cours' };
    
    let totalScore = 0;
    let totalCredits = 0;
    let validatedCredits = 0;

    grades.forEach(g => {
      totalScore += g.grade * g.credits;
      totalCredits += g.credits;
      if (g.grade >= 10) {
        validatedCredits += g.credits;
      }
    });

    const average = totalCredits > 0 ? Number((totalScore / totalCredits).toFixed(2)) : 0;
    
    let mention = 'Ajourné';
    if (average >= 16) mention = 'Grande Distinction (GD)';
    else if (average >= 14) mention = 'Distinction (D)';
    else if (average >= 12) mention = 'Satisfaction (S)';
    else if (average >= 10) mention = 'Passable (P)';

    return { average, totalCredits, validatedCredits, mention };
  };

  const handleSendClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimSubject || !claimMessage) return;
    setClaimSubmitted(true);
    showToast("Votre requête a été transmise au Secrétariat Général Académique.");
    setTimeout(() => {
      setClaimSubject('');
      setClaimMessage('');
      setClaimSubmitted(false);
    }, 4000);
  };

  // IF NOT LOGGED IN, SHOW SECURE LOGIN GATE
  if (!currentStudent) {
    return (
      <div className="py-12 bg-slate-100 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-blue-950 text-blue-300 flex items-center justify-center mx-auto shadow-md">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 font-serif">
              Portail Numérique de l'Étudiant
            </h1>
            <p className="text-xs text-slate-600">
              Espace sécurisé de consultation des notes en temps réel et relevés académiques ({config.academicYear}).
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-5">
            <form onSubmit={handleLogin} className="space-y-4">
              
              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Matricule Étudiant *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ex: 26-INFO-0142"
                  value={matriculeInput}
                  onChange={(e) => setMatriculeInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm font-mono font-bold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Code d'accès / Mot de passe personnel
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Code par défaut : IFADC2026 (ou code confidentiel remis à l'inscription).
                </span>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Se connecter en toute sécurité</span>
                </button>
              </div>
            </form>

            {/* Quick Demo Test Profiles for previewing */}
            <div className="border-t border-slate-100 pt-4 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Comptes étudiants de test (Accès 1-clic) :
              </span>
              <div className="grid grid-cols-1 gap-2">
                {students.slice(0, 3).map((st) => (
                  <button
                    key={st.id}
                    onClick={() => handleDemoSelect(st)}
                    className="p-2 text-left rounded-lg bg-slate-50 hover:bg-blue-50 border border-slate-200 transition flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{st.firstName} {st.lastName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{st.matricule} • {st.facultyName}</div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                      Tester →
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="text-center text-[11px] text-slate-500">
            Protection des données certifiée conforme aux normes universitaires ESURSI - RDC.
          </div>
        </div>
      </div>
    );
  }

  // LOGGED-IN STUDENT DASHBOARD
  const gradesToDisplay = currentStudent.grades.filter(g => 
    selectedSemester === 'all' ? true : g.semester === selectedSemester
  );
  const summary = calculateGradesSummary(currentStudent.grades);

  return (
    <div className="py-10 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Student Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-900/60 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* Student identity info */}
            <div className="flex items-center gap-5">
              <div className="relative">
                <img 
                  src={currentStudent.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"} 
                  alt={currentStudent.firstName}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-blue-400 shadow-md"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center text-[10px] text-white">
                  ✓
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white bg-blue-500/20 px-2 py-0.5 rounded border border-blue-400/30">
                    MATRICULE : {currentStudent.matricule}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-800/80 text-blue-200">
                    {currentStudent.level}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                  {currentStudent.firstName} {currentStudent.middleName ? currentStudent.middleName + ' ' : ''}{currentStudent.lastName}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">
                  {currentStudent.facultyName} • <span className="text-blue-100">{currentStudent.optionName}</span>
                </p>
                <div className="text-[11px] text-slate-400">
                  Année Académique : {currentStudent.academicYear} • Campus Assosa 2219 (Kasa-Vubu)
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => setSelectedStudentForTranscript(currentStudent)}
                className="flex-1 md:flex-initial px-4 py-2.5 bg-[#005a9c] hover:bg-blue-300 text-slate-950 font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Relevé (PDF)</span>
              </button>

              <button
                onClick={() => setSelectedStudentForCard(currentStudent)}
                className="flex-1 md:flex-initial px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs uppercase tracking-wider transition border border-slate-600 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-blue-300" />
                <span>Carte</span>
              </button>

              <button
                onClick={() => setActiveTab('drive')}
                className="flex-1 md:flex-initial px-4 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition border border-blue-700 flex items-center justify-center gap-2"
                title="Accéder à Google Drive"
              >
                <HardDrive className="w-4 h-4" />
                <span>Google Drive</span>
              </button>

              <button
                onClick={logoutStudent}
                title="Se déconnecter"
                className="p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* Live Academic Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Moyenne Générale (Temps Réel)
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-blue-950 font-serif">
                {summary.average}
              </span>
              <span className="text-xs font-bold text-slate-500">/ 20</span>
            </div>
            <div className="text-[11px] font-semibold text-emerald-700">
              Mention : {summary.mention}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Crédits ECTS / LMD
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-serif">
                {summary.validatedCredits}
              </span>
              <span className="text-xs font-bold text-slate-500">/ {summary.totalCredits} crédits</span>
            </div>
            <div className="text-[11px] font-semibold text-blue-700">
              Taux de validation : {summary.totalCredits > 0 ? Math.round((summary.validatedCredits / summary.totalCredits) * 100) : 0}%
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Statut Frais Académiques
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900 font-serif">
                {currentStudent.tuitionFee.paid}{currentStudent.tuitionFee.currency}
              </span>
              <span className="text-xs font-bold text-slate-500">/ {currentStudent.tuitionFee.total}{currentStudent.tuitionFee.currency}</span>
            </div>
            <div className="text-[11px]">
              <span className={`font-bold px-2 py-0.5 rounded ${
                currentStudent.tuitionFee.status === 'En règle' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-blue-100 text-blue-900'
              }`}>
                {currentStudent.tuitionFee.status} (Acompte L1 OK)
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Statut d'Inscription
            </span>
            <div className="flex items-center gap-2 pt-1">
              <CheckCircle className="w-7 h-7 text-emerald-600" />
              <div>
                <span className="text-sm font-bold text-slate-900 block">Régulièrement Inscrit</span>
                <span className="text-[10px] text-slate-500">Année {currentStudent.academicYear}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 space-x-4">
          {[
            { id: 'grades', label: 'Suivi des Notes & Matières', icon: <Award className="w-4 h-4" /> },
            { id: 'fees', label: 'Historique des Frais & Reçus', icon: <CreditCard className="w-4 h-4" /> },
            { id: 'documents', label: 'Demandes Administratives', icon: <FileText className="w-4 h-4" /> },
            { id: 'profile', label: 'Dossier Personnel', icon: <UserCheck className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPortalTab(tab.id as any)}
              className={`pb-3 text-xs uppercase tracking-wider font-bold transition flex items-center gap-2 border-b-2 ${
                portalTab === tab.id
                  ? 'border-blue-950 text-blue-950'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: REAL-TIME GRADES TABLE */}
        {portalTab === 'grades' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6">
            
            {/* Header & Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 font-serif">
                  Grille des Notes & Évaluations Semestrielles (LMD)
                </h2>
                <p className="text-xs text-slate-500">
                  Notes officielles publiées en direct par le secrétariat académique de l'IFADC.
                </p>
              </div>

              {/* Semester Filter */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedSemester('all')}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                    selectedSemester === 'all' ? 'bg-white text-blue-950 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tous les semestres
                </button>
                <button
                  onClick={() => setSelectedSemester(1)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                    selectedSemester === 1 ? 'bg-white text-blue-950 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semestre 1
                </button>
                <button
                  onClick={() => setSelectedSemester(2)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                    selectedSemester === 2 ? 'bg-white text-blue-950 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Semestre 2
                </button>
              </div>
            </div>

            {/* Grades Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                    <th className="py-3 px-4">Code</th>
                    <th className="py-3 px-4">Intitulé du Cours</th>
                    <th className="py-3 px-4 text-center">Semestre</th>
                    <th className="py-3 px-4 text-center">Crédits (LMD)</th>
                    <th className="py-3 px-4 text-center">Note / 20</th>
                    <th className="py-3 px-4 text-center">Pondération</th>
                    <th className="py-3 px-4 text-center">Statut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {gradesToDisplay.map((grade) => {
                    const isSuccess = grade.grade >= 10;
                    return (
                      <tr key={grade.courseCode} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-blue-950">
                          {grade.courseCode}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{grade.courseName}</div>
                          {grade.teacher && (
                            <span className="text-[10px] text-slate-400">Titulaire : {grade.teacher}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                            S{grade.semester}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-slate-800">
                          {grade.credits}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`font-mono text-sm font-black px-2 py-1 rounded ${
                            grade.grade >= 16 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : grade.grade >= 12 
                                ? 'bg-blue-100 text-blue-900' 
                                : isSuccess 
                                  ? 'bg-slate-100 text-slate-800' 
                                  : 'bg-rose-100 text-rose-800'
                          }`}>
                            {grade.grade.toFixed(1)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono text-slate-600">
                          {(grade.grade * grade.credits).toFixed(1)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {isSuccess ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              Validé
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                              <AlertTriangle className="w-3 h-3 text-rose-600" />
                              Ajourné
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom calculation summary */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-600">
                <span>Total unités d'enseignement affichées : <strong>{gradesToDisplay.length} cours</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedStudentForTranscript(currentStudent)}
                  className="px-4 py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-lg text-xs tracking-wider transition flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimer le Relevé de Notes Officiel</span>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TUITION FEES & RECEIPTS */}
        {portalTab === 'fees' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Situation Financière & Historique des Versements
              </h2>
              <p className="text-xs text-slate-500">
                Suivi des acomptes et tranches payées pour l'année académique {currentStudent.academicYear}.
              </p>
            </div>

            {/* Installments Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200">
                    <th className="py-3 px-4">N° Reçu</th>
                    <th className="py-3 px-4">Libellé du Paiement</th>
                    <th className="py-3 px-4">Date de Versement</th>
                    <th className="py-3 px-4 text-right">Montant</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentStudent.tuitionFee.installments.map((inst) => (
                    <tr key={inst.id} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {inst.receiptNumber}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">
                        {inst.title}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {new Date(inst.date).toLocaleDateString('fr-FR')}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-emerald-700 text-sm">
                        {inst.amount} {currentStudent.tuitionFee.currency}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => showToast(`Téléchargement de la quittance ${inst.receiptNumber}...`)}
                          className="text-blue-900 hover:text-blue-700 underline text-xs font-semibold"
                        >
                          Télécharger Reçu
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Remaining balance */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-950">
              <div>
                <span className="font-bold">Total payé : </span>
                <span className="font-mono font-bold">{currentStudent.tuitionFee.paid}{currentStudent.tuitionFee.currency}</span> sur {currentStudent.tuitionFee.total}{currentStudent.tuitionFee.currency}.
                <span className="block text-[11px] text-blue-900 mt-0.5">
                  Solde restant : {currentStudent.tuitionFee.total - currentStudent.tuitionFee.paid}{currentStudent.tuitionFee.currency} (payable avant les examens finaux de S2).
                </span>
              </div>
              <div className="font-bold bg-blue-200 px-3 py-1.5 rounded-lg">
                Statut : {currentStudent.tuitionFee.status}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: ADMINISTRATIVE REQUESTS & CLAIMS */}
        {portalTab === 'documents' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Demandes Administratives & Réclamations de Notes
              </h2>
              <p className="text-xs text-slate-500">
                Formulez une requête officielle au secrétariat ou signalez une anomalie de transcription de cote.
              </p>
            </div>

            <form onSubmit={handleSendClaim} className="max-w-xl space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Type de demande / Objet *
                </label>
                <select
                  required
                  value={claimSubject}
                  onChange={(e) => setClaimSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                >
                  <option value="">Sélectionnez l'objet de votre demande...</option>
                  <option value="reclamation-note">Réclamation sur une cote d'examen (Recours)</option>
                  <option value="attestation-frequentation">Demande d'Attestation de Fréquentation</option>
                  <option value="releve-provisoire">Demande de Relevé de Notes Provisoire Certifié</option>
                  <option value="duplicata-carte">Demande de Duplicata de Carte d'Étudiant</option>
                  <option value="autre">Autre requête administrative</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Détails & Justification de la requête *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Précisez le cours concerné, la session, ou l'objet exact de votre demande..."
                  value={claimMessage}
                  onChange={(e) => setClaimMessage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={claimSubmitted}
                className="px-6 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{claimSubmitted ? 'Envoi en cours...' : 'Envoyer ma demande officielle'}</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: STUDENT PROFILE & DETAILS */}
        {portalTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-slate-900 font-serif">
                Fiche d'Identification Personnelle
              </h2>
              <p className="text-xs text-slate-500">
                Informations officielles enregistrées au fichier central de l'IFADC.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Nom & Prénoms</span>
                <span className="font-bold text-slate-900">{currentStudent.lastName} {currentStudent.middleName} {currentStudent.firstName}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Matricule Officiel</span>
                <span className="font-mono font-black text-blue-950">{currentStudent.matricule}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Date & Lieu de Naissance</span>
                <span className="font-medium text-slate-900">{currentStudent.dateOfBirth} à {currentStudent.placeOfBirth}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Adresse Kinshasa</span>
                <span className="font-medium text-slate-900">{currentStudent.address}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Téléphone & WhatsApp</span>
                <span className="font-medium text-slate-900">{currentStudent.phone}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Email Institutionnel</span>
                <span className="font-medium text-slate-900">{currentStudent.email}</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
