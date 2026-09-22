import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from './Logo';
import { X, Printer, QrCode, ShieldCheck } from 'lucide-react';

export const StudentCardModal: React.FC = () => {
  const { selectedStudentForCard, setSelectedStudentForCard, config } = useApp();

  if (!selectedStudentForCard) return null;

  const student = selectedStudentForCard;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-md w-full border border-slate-200 print:shadow-none print:border-none">
        
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-3.5 flex items-center justify-between print:hidden">
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Carte d'Étudiant Numérique
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 bg-[#005a9c] text-white rounded-lg hover:bg-blue-300 transition"
              title="Imprimer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedStudentForCard(null)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Physical Badge Card Design */}
        <div className="p-6 bg-slate-100 flex items-center justify-center">
          
          <div className="w-[340px] sm:w-[360px] bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white rounded-2xl shadow-xl overflow-hidden border-2 border-blue-400/80 relative">
            
            {/* Top Card Banner */}
            <div className="bg-blue-900/80 px-4 py-2.5 border-b border-blue-400/40 flex items-center justify-between">
              <Logo size="sm" light={true} showText={false} />
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-white block leading-tight">
                  {config.shortName} • CARTE D'ÉTUDIANT
                </span>
                <span className="text-[8px] text-slate-300 tracking-wider">
                  ANNÉE ACADÉMIQUE {student.academicYear}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 space-y-3">
              
              <div className="flex gap-3 items-center">
                <img
                  src={student.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80"}
                  alt={student.firstName}
                  className="w-20 h-24 rounded-xl object-cover border-2 border-blue-400 shadow-md shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="space-y-1 text-xs">
                  <div className="text-[10px] text-white font-mono font-bold bg-blue-500/20 px-2 py-0.5 rounded w-max">
                    {student.matricule}
                  </div>
                  <h3 className="font-extrabold text-sm text-white font-serif leading-tight">
                    {student.lastName} {student.firstName}
                  </h3>
                  <div className="text-[10px] text-slate-300">
                    <span className="text-blue-100 font-bold block">{student.facultyName}</span>
                    <span className="text-slate-400">{student.optionName} ({student.level})</span>
                  </div>
                </div>
              </div>

              {/* Barcode & Security strip */}
              <div className="bg-white text-slate-900 rounded-lg p-2 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-mono text-[9px] font-bold tracking-widest text-slate-700">
                    ||||| ||| ||||||| |||| |||||| |||||
                  </div>
                  <div className="text-[8px] text-slate-500 font-mono">
                    ID-{student.matricule.replace(/[^a-zA-Z0-9]/g, '')}
                  </div>
                </div>
                <QrCode className="w-8 h-8 text-blue-950" />
              </div>

            </div>

            {/* Bottom Card Footer */}
            <div className="bg-slate-950 px-4 py-1.5 text-[8px] text-slate-400 flex justify-between items-center border-t border-slate-800">
              <span>{config.address}, Kasa-Vubu</span>
              <span className="text-white font-semibold">ESURSI - RDC</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
