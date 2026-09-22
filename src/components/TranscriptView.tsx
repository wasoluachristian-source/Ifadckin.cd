import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { Printer, Download, X, ShieldCheck, Award } from 'lucide-react';

export const TranscriptView: React.FC = () => {
  const { selectedStudentForTranscript, setSelectedStudentForTranscript, config } = useApp();

  if (!selectedStudentForTranscript) return null;

  const student = selectedStudentForTranscript;

  // Calculate totals
  let totalScore = 0;
  let totalCredits = 0;
  let validatedCredits = 0;

  student.grades.forEach(g => {
    totalScore += g.grade * g.credits;
    totalCredits += g.credits;
    if (g.grade >= 10) validatedCredits += g.credits;
  });

  const average = totalCredits > 0 ? (totalScore / totalCredits).toFixed(2) : '0.00';
  const percentage = totalCredits > 0 ? ((Number(average) / 20) * 100).toFixed(1) : '0.0';

  let mention = 'Ajourné';
  if (Number(average) >= 16) mention = 'Grande Distinction (GD)';
  else if (Number(average) >= 14) mention = 'Distinction (D)';
  else if (Number(average) >= 12) mention = 'Satisfaction (S)';
  else if (Number(average) >= 10) mention = 'Passable (P)';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto print:p-0 print:bg-white">
      
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-slate-300 my-auto print:border-none print:shadow-none print:max-w-none">
        
        {/* Modal Toolbar (hidden in print) */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-300" />
            <span className="font-bold text-xs uppercase tracking-wider">
              Relevé de Notes Officiel LMD • {student.matricule}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-[#005a9c] hover:bg-blue-300 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimer / Exporter PDF</span>
            </button>
            <button
              onClick={() => setSelectedStudentForTranscript(null)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-8 sm:p-12 space-y-6 text-slate-900 bg-white relative">
          
          {/* Subtle Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <span className="text-9xl font-black font-serif">IFADC</span>
          </div>

          {/* Official Academic Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <div className="flex items-center justify-between gap-4">
              <div className="text-center sm:text-left space-y-1">
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-600">
                  RÉPUBLIQUE DÉMOCRATIQUE DU CONGO
                </div>
                <div className="text-[10px] font-bold uppercase text-slate-800">
                  {config.tutelle}
                </div>
                <div className="text-xl sm:text-2xl font-black font-serif text-blue-950 tracking-tight">
                  {config.name} ({config.shortName})
                </div>
                <div className="text-[11px] text-slate-500 font-serif italic">
                  "{config.motto}"
                </div>
                <div className="text-[10px] text-slate-600">
                  Campus : {config.address}, Réf: {config.reference}, {config.commune} - {config.city} • Contact : {config.phone}
                </div>
              </div>

              <div className="hidden sm:block shrink-0">
                <Logo size="lg" showText={false} />
              </div>
            </div>
          </div>

          {/* Title Box */}
          <div className="text-center py-2 bg-slate-100 border border-slate-300 rounded-lg">
            <h1 className="text-base sm:text-lg font-black uppercase tracking-widest text-slate-900 font-serif">
              RELEVÉ DE NOTES OFFICIEL • SYSTÈME L.M.D
            </h1>
            <span className="text-xs font-mono font-bold text-blue-950">
              Année Académique : {student.academicYear}
            </span>
          </div>

          {/* Student ID & Promotion Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="font-semibold text-slate-500">Nom & Prénoms : </span>
              <span className="font-bold text-slate-950 uppercase">{student.lastName} {student.middleName} {student.firstName}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500">Matricule : </span>
              <span className="font-mono font-black text-blue-950">{student.matricule}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500">Faculté : </span>
              <span className="font-bold text-slate-900">{student.facultyName}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500">Département / Option : </span>
              <span className="font-bold text-slate-900">{student.optionName}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500">Niveau / Promotion : </span>
              <span className="font-bold text-slate-900">{student.level}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-500">Lieu & Date de Naissance : </span>
              <span className="font-medium text-slate-900">{student.placeOfBirth}, le {student.dateOfBirth}</span>
            </div>
          </div>

          {/* Grades Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-300">
              <thead>
                <tr className="bg-slate-200 text-slate-900 uppercase font-bold border-b border-slate-300">
                  <th className="py-2 px-3 border-r border-slate-300">Code</th>
                  <th className="py-2 px-3 border-r border-slate-300">Intitulé de l'Unité d'Enseignement (UE)</th>
                  <th className="py-2 px-2 text-center border-r border-slate-300">Sem.</th>
                  <th className="py-2 px-2 text-center border-r border-slate-300">Crédits</th>
                  <th className="py-2 px-2 text-center border-r border-slate-300">Note /20</th>
                  <th className="py-2 px-2 text-center border-r border-slate-300">Pondération</th>
                  <th className="py-2 px-3 text-center">Décision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {student.grades.map((grade) => (
                  <tr key={grade.courseCode}>
                    <td className="py-2 px-3 font-mono font-bold border-r border-slate-200">{grade.courseCode}</td>
                    <td className="py-2 px-3 font-medium border-r border-slate-200">{grade.courseName}</td>
                    <td className="py-2 px-2 text-center border-r border-slate-200">S{grade.semester}</td>
                    <td className="py-2 px-2 text-center font-bold border-r border-slate-200">{grade.credits}</td>
                    <td className="py-2 px-2 text-center font-mono font-bold border-r border-slate-200">{grade.grade.toFixed(1)}</td>
                    <td className="py-2 px-2 text-center font-mono border-r border-slate-200">{(grade.grade * grade.credits).toFixed(1)}</td>
                    <td className="py-2 px-3 text-center font-semibold">
                      {grade.grade >= 10 ? 'Validé' : 'Ajourné'}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100 font-bold border-t-2 border-slate-400">
                  <td colSpan={3} className="py-2.5 px-3 uppercase text-right border-r border-slate-300">
                    Bilan Académique Global :
                  </td>
                  <td className="py-2.5 px-2 text-center font-black border-r border-slate-300">
                    {totalCredits} cr.
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono font-black text-blue-950 border-r border-slate-300 text-sm">
                    {average} / 20
                  </td>
                  <td className="py-2.5 px-2 text-center font-mono border-r border-slate-300">
                    {totalScore.toFixed(1)}
                  </td>
                  <td className="py-2.5 px-3 text-center font-bold text-blue-950">
                    {percentage}%
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Academic Deliberation Result */}
          <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-slate-700">Décision Finale du Jury : </span>
              <span className="font-black text-sm text-blue-950 uppercase">{mention}</span>
            </div>
            <div>
              <span className="font-bold text-slate-700">Crédits ECTS validés : </span>
              <span className="font-bold text-emerald-800">{validatedCredits} sur {totalCredits} crédits</span>
            </div>
          </div>

          {/* Signatures & Official Seals */}
          <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-12">
              <div>
                <span className="font-bold uppercase tracking-wider block">Le Doyen de la Faculté</span>
                <span className="text-[10px] text-slate-500">{student.facultyName}</span>
              </div>
              <div className="border-t border-slate-400 pt-1 font-semibold text-slate-800">
                Sceau & Signature
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <span className="font-bold uppercase tracking-wider block">Le Secrétaire Général Académique</span>
                <span className="text-[10px] text-slate-500">{config.name}</span>
              </div>
              <div className="border-t border-slate-400 pt-1 font-semibold text-slate-800">
                {config.academicSecretaryName}
              </div>
            </div>
          </div>

          {/* Security & Verification Footer */}
          <div className="pt-6 border-t border-slate-200 text-[10px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Authenticité certifiée par le système informatique IFADC • Réf: {student.matricule}-{student.academicYear}</span>
            <span>Fait à Kinshasa, le {new Date().toLocaleDateString('fr-FR')}</span>
          </div>

        </div>

      </div>
    </div>
  );
};
