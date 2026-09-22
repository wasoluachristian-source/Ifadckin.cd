import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  UserCheck, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet, 
  Send, 
  ShieldCheck, 
  LogOut, 
  Users, 
  GraduationCap, 
  FileText, 
  Search, 
  Save, 
  AlertCircle,
  Building,
  DollarSign,
  TrendingUp,
  Download,
  Upload,
  Eye,
  KeyRound,
Lock
} from 'lucide-react';
import { ExamSession, GradeStatus, StaffRole, SubjectGrade } from '../types';

export const StaffPortal: React.FC = () => {
  const { 
    currentStaff, 
    loginStaff, 
    logoutStaff, 
    staffLoginError,
    faculties,
    students,
    applications,
    updateApplicationStatus,
    enrollApplicantAsStudent,
    submitBatchGrades,
    validateBatchGrades,
    rejectBatchGrades,
    showToast,
    config,
    staffMembers
  } = useApp();

  // Login Form State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Professor Tab State
  const [profSelectedCourseCode, setProfSelectedCourseCode] = useState<string>('');
  const [profSelectedSemester, setProfSelectedSemester] = useState<1 | 2>(1);
  const [profSelectedSession, setProfSelectedSession] = useState<ExamSession>('Principale');
  const [studentGradesMap, setStudentGradesMap] = useState<Record<string, number>>({});
  const [profSearchFilter, setProfSearchFilter] = useState('');

  // Dean Tab State
  const [deanSelectedFacultyId, setDeanSelectedFacultyId] = useState<string>('');
  const [deanActiveTab, setDeanActiveTab] = useState<'deliberations' | 'students' | 'stats'>('deliberations');

  // Admission Manager Tab State
  const [appFilterStatus, setAppFilterStatus] = useState<string>('ALL');
  const [appSearchQuery, setAppSearchQuery] = useState<string>('');
  const [selectedAppModal, setSelectedAppModal] = useState<any | null>(null);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      showToast("Veuillez saisir votre identifiant et mot de passe.");
      return;
    }
    loginStaff(username.trim(), password.trim());
  };

  // Quick Demo Login helper
  const handleQuickLogin = (demoUsername: string) => {
    setUsername(demoUsername);
    setPassword('3435PROF');
    loginStaff(demoUsername, '3435PROF');
  };

  // If not logged in, show Login Screen
  if (!currentStaff) {
    return (
      <div className="min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-inner">
              <KeyRound className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Espace Personnel Sécurisé</h2>
            <p className="text-sm text-slate-600 mt-1">
              Professeurs, Doyens de Faculté, Rectorat & Inscriptions
            </p>
          </div>

          {staffLoginError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Erreur de connexion</p>
                <p>{staffLoginError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Identifiant du Personnel
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: prof.luboya ou doyen.info"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-slate-800"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                Mot de Passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all text-slate-800"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl shadow-lg shadow-blue-700/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Accéder à mon tableau de bord</span>
            </button>
          </form>

          {/* Quick demo accounts for evaluator convenience */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center mb-3">
              Accès Rapide par Rôle
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleQuickLogin('prof.luboya')}
                className="p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-slate-700 text-left transition-colors"
              >
                <span className="font-semibold block text-blue-700">Prof. LUBOYA</span>
                <span className="text-[10px] text-slate-500">Saisie des Notes LMD</span>
              </button>
              <button
                onClick={() => handleQuickLogin('doyen.info')}
                className="p-2.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-lg text-slate-700 text-left transition-colors"
              >
                <span className="font-semibold block text-emerald-700">Doyen KABEYA</span>
                <span className="text-[10px] text-slate-500">Validation Délibération</span>
              </button>
              <button
                onClick={() => handleQuickLogin('recteur.bakamba')}
                className="p-2.5 bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 rounded-lg text-slate-700 text-left transition-colors"
              >
                <span className="font-semibold block text-purple-700">Recteur BAKAMBA</span>
                <span className="text-[10px] text-slate-500">Supervision Globale</span>
              </button>
              <button
                onClick={() => handleQuickLogin('inscriptions.sgac')}
                className="p-2.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-lg text-slate-700 text-left transition-colors"
              >
                <span className="font-semibold block text-blue-800">M. KASONGO</span>
                <span className="text-[10px] text-slate-500">Gestion Inscriptions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active user details
  const userRole = currentStaff.role;

  // ----------------------------------------------------
  // 1. PROFESSOR PORTAL (Saisie des Notes LMD)
  // ----------------------------------------------------
  const renderProfessorView = () => {
    const assignedCourses = currentStaff.assignedCourses || [
      { courseCode: "INFO101", courseName: "Algorithmique & Structures de Données", credits: 6, facultyId: "info", level: "L1 (Système LMD)", semester: 1 },
      { courseCode: "INFO103", courseName: "Programmation Web & Bases de Données", credits: 6, facultyId: "info", level: "L1 (Système LMD)", semester: 2 },
      { courseCode: "INFO104", courseName: "Systèmes d'Exploitation Linux", credits: 5, facultyId: "info", level: "L1 (Système LMD)", semester: 2 }
    ];

    const currentCourse = assignedCourses.find(c => c.courseCode === (profSelectedCourseCode || assignedCourses[0]?.courseCode)) || assignedCourses[0];

    // Filter students eligible for this course (by faculty and level)
    const targetFacultyStudents = students.filter(s => 
      (!currentCourse.facultyId || s.facultyId === currentCourse.facultyId) &&
      (s.firstName.toLowerCase().includes(profSearchFilter.toLowerCase()) || 
       s.lastName.toLowerCase().includes(profSearchFilter.toLowerCase()) ||
       s.matricule.toLowerCase().includes(profSearchFilter.toLowerCase()))
    );

    const handleGradeInputChange = (studentId: string, value: string) => {
      const num = parseFloat(value);
      if (isNaN(num)) {
        const next = { ...studentGradesMap };
        delete next[studentId];
        setStudentGradesMap(next);
      } else {
        const clamped = Math.max(0, Math.min(20, num));
        setStudentGradesMap(prev => ({ ...prev, [studentId]: clamped }));
      }
    };

    const handleSaveGrades = (asDraft: boolean) => {
      if (!currentCourse) return;

      const gradesList = targetFacultyStudents.map(student => {
        const existingGrade = student.grades.find(g => g.courseCode === currentCourse.courseCode);
        const entered = studentGradesMap[student.id] !== undefined 
          ? studentGradesMap[student.id] 
          : (existingGrade ? existingGrade.grade : 10);

        return {
          studentId: student.id,
          grade: entered,
          credits: currentCourse.credits,
          session: profSelectedSession
        };
      });

      submitBatchGrades(
        currentCourse.courseCode,
        currentCourse.courseName,
        currentCourse.facultyId,
        currentCourse.level,
        profSelectedSemester,
        currentStaff.fullName,
        currentStaff.id,
        gradesList,
        asDraft
      );
    };

    // Calculate current submission status for this course
    const gradesForCourse = students
      .flatMap(s => s.grades.filter(g => g.courseCode === currentCourse?.courseCode));
    const isSubmitted = gradesForCourse.some(g => g.status === 'Soumis');
    const isValidated = gradesForCourse.some(g => g.status === 'Validé');
    const isDraft = gradesForCourse.some(g => g.status === 'Brouillon');

    return (
      <div className="space-y-8">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-800/80 text-blue-200 border border-blue-700/50 mb-3">
                <BookOpen className="w-3.5 h-3.5" />
                Interface de Saisie des Notes LMD
              </span>
              <h2 className="text-2xl font-bold">{currentStaff.fullName}</h2>
              <p className="text-blue-200 text-sm mt-1">{currentStaff.title || "Enseignant Universitaire"}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs border border-white/10">
                <span className="text-blue-300 block">Année Académique</span>
                <span className="font-bold text-white text-sm">{config.academicYear}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow Guide Notice */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">1</span>
            <span>Saisie Enseignant</span>
            <span className="text-slate-400">➔</span>
            <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">2</span>
            <span>Stockage Base Cloud</span>
            <span className="text-slate-400">➔</span>
            <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">3</span>
            <span>Validation Doyen</span>
            <span className="text-slate-400">➔</span>
            <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">4</span>
            <span>Consultation Étudiant</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-semibold">
            Statut actuel du cours : 
            {isValidated ? (
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Validé & Publié
              </span>
            ) : isSubmitted ? (
              <span className="text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Transmis pour Délibération
              </span>
            ) : (
              <span className="text-slate-700 bg-slate-200 px-2 py-0.5 rounded-md">
                Brouillon / En saisie
              </span>
            )}
          </div>
        </div>

        {/* Course & Session Selector Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            Sélection du Cours et Paramètres de la Session
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Matière & Promotion</label>
              <select
                value={profSelectedCourseCode || assignedCourses[0]?.courseCode}
                onChange={(e) => {
                  setProfSelectedCourseCode(e.target.value);
                  setStudentGradesMap({});
                }}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800"
              >
                {assignedCourses.map(course => (
                  <option key={course.courseCode} value={course.courseCode}>
                    [{course.courseCode}] {course.courseName} ({course.credits} Crédits)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Semestre</label>
              <select
                value={profSelectedSemester}
                onChange={(e) => setProfSelectedSemester(Number(e.target.value) as 1 | 2)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800"
              >
                <option value={1}>Semestre 1 (Session Normale)</option>
                <option value={2}>Semestre 2 (Session Normale)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">Session d'Examen</label>
              <select
                value={profSelectedSession}
                onChange={(e) => setProfSelectedSession(e.target.value as ExamSession)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none text-slate-800"
              >
                <option value="Principale">Session Principale (1ère Session)</option>
                <option value="Rattrapage">Session de Rattrapage (2ème Session)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Grade Entry Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                Grille de Cotation : {currentCourse.courseName}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Promotion : {currentCourse.level} • Faculté des Sciences de l'Informatique • {targetFacultyStudents.length} Étudiant(s) inscrit(s)
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Rechercher étudiant..."
                  value={profSearchFilter}
                  onChange={(e) => setProfSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Matricule</th>
                  <th className="px-6 py-3.5">Nom complet de l'Étudiant</th>
                  <th className="px-6 py-3.5">Frais de Scolarité</th>
                  <th className="px-6 py-3.5">Note sur 20</th>
                  <th className="px-6 py-3.5">Mention LMD</th>
                  <th className="px-6 py-3.5">Statut Actuel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {targetFacultyStudents.map(student => {
                  const existingGrade = student.grades.find(g => g.courseCode === currentCourse.courseCode);
                  const currentVal = studentGradesMap[student.id] !== undefined 
                    ? studentGradesMap[student.id] 
                    : (existingGrade ? existingGrade.grade : '');
                  
                  const numVal = typeof currentVal === 'number' ? currentVal : parseFloat(currentVal);
                  const mention = !isNaN(numVal) 
                    ? (numVal >= 16 ? 'Très Bien' : numVal >= 14 ? 'Bien' : numVal >= 10 ? 'Passable' : 'Ajourné')
                    : '-';

                  const gradeStatus = existingGrade?.status || 'Brouillon';

                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-xs text-blue-700">
                        {student.matricule}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">
                          {student.lastName} {student.firstName} {student.middleName || ''}
                        </div>
                        <div className="text-xs text-slate-500">{student.optionName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                          student.tuitionFee.status === 'En règle' ? 'bg-emerald-50 text-emerald-700' :
                          student.tuitionFee.status === 'Partiel' ? 'bg-blue-50 text-blue-800' :
                          'bg-red-50 text-red-700'
                        }`}>
                          {student.tuitionFee.status} ({student.tuitionFee.paid}$/{student.tuitionFee.total}$)
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="20"
                            step="0.5"
                            value={currentVal}
                            onChange={(e) => handleGradeInputChange(student.id, e.target.value)}
                            placeholder="0 - 20"
                            className="w-24 px-3 py-1.5 font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-600"
                          />
                          <span className="text-xs text-slate-400 font-semibold">/ 20</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold ${
                          numVal >= 10 ? 'text-emerald-700' : 'text-red-600'
                        }`}>
                          {mention}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          gradeStatus === 'Validé' ? 'bg-emerald-100 text-emerald-800' :
                          gradeStatus === 'Soumis' ? 'bg-blue-100 text-blue-900' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {gradeStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Action Bar */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-xs text-slate-500">
              💡 <strong>Rappel :</strong> Les notes enregistrées comme « Soumis » sont directement transmises au Doyen de Faculté pour la séance de délibération.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleSaveGrades(true)}
                className="flex-1 sm:flex-none px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Save className="w-4 h-4 text-slate-500" />
                <span>Enregistrer Brouillon</span>
              </button>

              <button
                onClick={() => handleSaveGrades(false)}
                className="flex-1 sm:flex-none px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl text-xs shadow-md shadow-blue-700/20 flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Transmettre pour Délibération</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // 2. DEAN PORTAL (Validation des Délibérations)
  // ----------------------------------------------------
  const renderDeanView = () => {
    const deanFaculty = faculties.find(f => f.id === currentStaff.facultyId) || faculties[0];
    const facultyStudents = students.filter(s => !currentStaff.facultyId || s.facultyId === currentStaff.facultyId);

    // Identify courses with grades submitted for this faculty
    const facultyCoursesCodes = Array.from(
      new Set(facultyStudents.flatMap(s => s.grades.map(g => g.courseCode)))
    );

    return (
      <div className="space-y-8">
        {/* Dean Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                Doyen de Faculté • Jury & Délibérations
              </span>
              <h2 className="text-2xl font-bold">{currentStaff.fullName}</h2>
              <p className="text-emerald-200 text-sm mt-1">Faculté : {deanFaculty.name}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 text-right">
              <span className="text-emerald-300 text-xs block">Effectif Étudiants</span>
              <span className="font-bold text-2xl text-white">{facultyStudents.length}</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setDeanActiveTab('deliberations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              deanActiveTab === 'deliberations' 
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            📋 Grilles de Délibération & Validation
          </button>
          <button
            onClick={() => setDeanActiveTab('students')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              deanActiveTab === 'students' 
                ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20' 
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            👥 Liste des Étudiants de la Faculté
          </button>
        </div>

        {deanActiveTab === 'deliberations' ? (
          <div className="space-y-6">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              Matières en attente ou validées par le Décanat
            </h3>

            {facultyCoursesCodes.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
                Aucune note n'a encore été saisie par les professeurs de cette faculté.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {facultyCoursesCodes.map(code => {
                  const courseGrades = facultyStudents.flatMap(s => s.grades.filter(g => g.courseCode === code));
                  const first = courseGrades[0];
                  const submittedCount = courseGrades.filter(g => g.status === 'Soumis').length;
                  const validatedCount = courseGrades.filter(g => g.status === 'Validé').length;
                  const draftCount = courseGrades.filter(g => g.status === 'Brouillon').length;
                  const avg = courseGrades.length > 0
                    ? (courseGrades.reduce((acc, c) => acc + c.grade, 0) / courseGrades.length).toFixed(1)
                    : '0';

                  return (
                    <div key={code} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                            {code}
                          </span>
                          <h4 className="font-bold text-slate-900 text-base">{first?.courseName || code}</h4>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          Enseignant titulaire : {first?.teacher || 'Non spécifié'} • Moyenne de classe : <strong className="text-slate-800">{avg}/20</strong>
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                            {validatedCount} Validée(s)
                          </span>
                          <span className="text-blue-800 bg-blue-50 px-2 py-0.5 rounded font-semibold">
                            {submittedCount} Soumise(s) en attente
                          </span>
                          <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            {draftCount} Brouillon(s)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto">
                        <button
                          onClick={() => validateBatchGrades(code, currentStaff.facultyId || '', currentStaff.fullName)}
                          className="flex-1 md:flex-none px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Valider & Publier la Délibération</span>
                        </button>
                        <button
                          onClick={() => rejectBatchGrades(code, currentStaff.facultyId || '', 'Révision demandée par le Doyen')}
                          className="flex-1 md:flex-none px-3 py-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-600 font-semibold rounded-xl text-xs transition-colors"
                          title="Retourner au professeur pour correction"
                        >
                          Réviser
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Étudiants de la Faculté : {deanFaculty.name}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3.5">Matricule</th>
                    <th className="px-6 py-3.5">Nom complet</th>
                    <th className="px-6 py-3.5">Promotion / Niveau</th>
                    <th className="px-6 py-3.5">Matières Délibérées</th>
                    <th className="px-6 py-3.5">Frais</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {facultyStudents.map(student => (
                    <tr key={student.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-mono font-bold text-xs text-emerald-700">{student.matricule}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{student.lastName} {student.firstName}</td>
                      <td className="px-6 py-4 text-xs text-slate-600">{student.level} ({student.optionName})</td>
                      <td className="px-6 py-4 text-xs font-bold text-slate-800">
                        {student.grades.filter(g => g.status === 'Validé').length} validée(s) / {student.grades.length} totales
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                          student.tuitionFee.status === 'En règle' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-800'
                        }`}>
                          {student.tuitionFee.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ----------------------------------------------------
  // 3. RECTOR PORTAL (Supervision Globale Institut)
  // ----------------------------------------------------
  const renderRectorView = () => {
    const totalStudents = students.length;
    const totalApplications = applications.length;
    const enrolledStudents = applications.filter(a => a.status === 'INSCRIPTION_VALIDEE').length;
    const totalGrades = students.flatMap(s => s.grades);
    const validatedGrades = totalGrades.filter(g => g.status === 'Validé').length;

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/80 text-purple-200 border border-purple-700/50 mb-3">
                <Crown className="w-3.5 h-3.5" />
                Cabinet du Recteur de l'IFADC
              </span>
              <h2 className="text-2xl font-bold">{currentStaff.fullName}</h2>
              <p className="text-purple-200 text-sm mt-1">Supervision Générale Académique, Financière & Gouvernance</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-purple-300">Année Académique</span>
              <span className="block font-bold text-white text-lg">{config.academicYear}</span>
            </div>
          </div>
        </div>

        {/* Global KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Effectif Étudiants</span>
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{totalStudents}</p>
            <p className="text-xs text-slate-500 mt-1">Répartis sur 5 facultés LMD</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Candidatures & Inscrits</span>
              <GraduationCap className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{totalApplications}</p>
            <p className="text-xs text-emerald-600 font-semibold mt-1">{enrolledStudents} inscriptions validées</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Notes Validées</span>
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-2xl font-black text-slate-900">{validatedGrades}</p>
            <p className="text-xs text-slate-500 mt-1">Sur {totalGrades.length} cotes saisies</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Personnel Enseignant</span>
              <UserCheck className="w-5 h-5 text-[#005a9c]" />
            </div>
            <p className="text-2xl font-black text-slate-900">{staffMembers.length}</p>
            <p className="text-xs text-slate-500 mt-1">Comptes académiques actifs</p>
          </div>
        </div>

        {/* Faculty Breakdown Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-lg">Tableau Synoptique par Faculté LMD</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">Faculté</th>
                  <th className="px-6 py-3.5">Doyen en Titre</th>
                  <th className="px-6 py-3.5">Étudiants</th>
                  <th className="px-6 py-3.5">Options LMD</th>
                  <th className="px-6 py-3.5">Statut Académique</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {faculties.map(fac => {
                  const fStudents = students.filter(s => s.facultyId === fac.id);
                  return (
                    <tr key={fac.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-900 flex items-center gap-2">
                        <span>{fac.icon}</span>
                        <span>{fac.name}</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-semibold text-slate-700">{fac.dean.name}</td>
                      <td className="px-6 py-4 font-mono font-bold text-xs text-blue-700">{fStudents.length}</td>
                      <td className="px-6 py-4 text-xs text-slate-600">{fac.options.length} filières</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                          En activité
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ----------------------------------------------------
  // 4. ADMISSIONS MANAGER PORTAL (Inscriptions & Scolarité)
  // ----------------------------------------------------
  const renderAdmissionManagerView = () => {
    const filteredApps = applications.filter(app => {
      const matchStatus = appFilterStatus === 'ALL' || app.status === appFilterStatus;
      const matchSearch = 
        app.dossierNumber.toLowerCase().includes(appSearchQuery.toLowerCase()) ||
        app.firstName.toLowerCase().includes(appSearchQuery.toLowerCase()) ||
        app.lastName.toLowerCase().includes(appSearchQuery.toLowerCase()) ||
        app.facultyName.toLowerCase().includes(appSearchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });

    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-[#005a9c] text-white rounded-2xl p-6 sm:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/80 text-blue-100 border border-blue-700/50 mb-3">
                <FileText className="w-3.5 h-3.5" />
                Service des Inscriptions & Scolarité Centrale
              </span>
              <h2 className="text-2xl font-bold">{currentStaff.fullName}</h2>
              <p className="text-blue-100 text-sm mt-1">Traitement des Candidatures, Validation et Immatriculation</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-xl border border-white/10 text-right">
              <span className="text-white text-xs block">Dossiers Reçus</span>
              <span className="font-bold text-2xl text-white">{applications.length}</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {['ALL', 'SOUMIS', 'ACCEPTE', 'INSCRIPTION_VALIDEE', 'REFUSE'].map(st => (
              <button
                key={st}
                onClick={() => setAppFilterStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  appFilterStatus === st 
                    ? 'bg-[#004b82] text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st === 'ALL' ? 'Tous les Dossiers' : st}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="N° dossier, nom, faculté..."
              value={appSearchQuery}
              onChange={(e) => setAppSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005a9c]"
            />
          </div>
        </div>

        {/* Applications List Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-6 py-3.5">N° Dossier</th>
                  <th className="px-6 py-3.5">Candidat</th>
                  <th className="px-6 py-3.5">Faculté & Option</th>
                  <th className="px-6 py-3.5">Diplôme & %</th>
                  <th className="px-6 py-3.5">Statut</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono font-bold text-xs text-blue-800">
                      {app.dossierNumber}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{app.lastName} {app.firstName}</div>
                      <div className="text-xs text-slate-500">{app.phone} • {app.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-800">{app.facultyName}</div>
                      <div className="text-xs text-slate-500">{app.optionName}</div>
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className="font-bold text-slate-800">{app.diplomaPercentage}%</span> ({app.diplomaYear})
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'INSCRIPTION_VALIDEE' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'ACCEPTE' ? 'bg-blue-100 text-blue-800' :
                        app.status === 'SOUMIS' ? 'bg-blue-100 text-blue-900' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {app.status !== 'INSCRIPTION_VALIDEE' ? (
                        <button
                          onClick={() => enrollApplicantAsStudent(app.id)}
                          className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg shadow-sm transition-all inline-flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Valider Inscription</span>
                        </button>
                      ) : (
                        <span className="text-xs font-mono font-bold text-emerald-700">
                          Matricule: {app.assignedMatricule || 'Inscrit'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Helper to get role badge label
  const getRoleLabel = (role: StaffRole) => {
    switch(role) {
      case 'PROFESSEUR': return 'Espace Enseignant / Professeur';
      case 'DOYEN': return 'Décanat / Doyen de Faculté';
      case 'RECTEUR': return 'Rectorat / Direction Générale';
      case 'GESTIONNAIRE_INSCRIPTIONS': return 'Gestionnaire des Inscriptions';
      default: return 'Personnel';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top User Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
            {currentStaff.fullName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">{currentStaff.fullName}</h3>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-md text-[10px] font-bold uppercase tracking-wider">
                {currentStaff.role}
              </span>
            </div>
            <p className="text-xs text-slate-500">{getRoleLabel(currentStaff.role)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={logoutStaff}
            className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </div>

      {/* Dynamic View based on Role */}
      {userRole === 'PROFESSEUR' && renderProfessorView()}
      {userRole === 'DOYEN' && renderDeanView()}
      {userRole === 'RECTEUR' && renderRectorView()}
      {userRole === 'GESTIONNAIRE_INSCRIPTIONS' && renderAdmissionManagerView()}
    </div>
  );
};

// Crown icon fallback
function Crown(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.957-.735L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
      <path d="M5 21h14" />
    </svg>
  );
}
