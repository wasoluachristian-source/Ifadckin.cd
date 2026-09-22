import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Laptop, 
  Stethoscope, 
  BookOpen, 
  Scale, 
  TrendingUp, 
  Briefcase, 
  Check, 
  ArrowRight,
  GraduationCap,
  Search,
  Award,
  UserCheck,
  Eye
} from 'lucide-react';
import { AcademicCycle, Faculty } from '../types';

export const FacultiesSection: React.FC<{ onSelectFacultyForAdmission?: (facultyId: string) => void }> = ({ 
  onSelectFacultyForAdmission 
}) => {
  const { faculties, config, setActiveTab, navigateToFacultyDetail } = useApp();
  const [selectedCycle, setSelectedCycle] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Stethoscope': return <Stethoscope className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Scale': return <Scale className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      default: return <GraduationCap className="w-5 h-5" />;
    }
  };

  const filteredFaculties = faculties.filter((faculty) => {
    const matchesCycle = selectedCycle === 'all' || faculty.cycles.includes(selectedCycle as AcademicCycle);
    const matchesSearch = 
      faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faculty.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (faculty.dean && faculty.dean.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      faculty.options.some(opt => opt.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCycle && matchesSearch;
  });

  const handleApply = (facultyId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onSelectFacultyForAdmission) {
      onSelectFacultyForAdmission(facultyId);
    }
    setActiveTab('admission');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#005a9c] border border-blue-200 uppercase tracking-widest">
            <GraduationCap className="w-3.5 h-3.5 text-[#005a9c]" />
            Offre Académique {config.academicYear}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Facultés organisées
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Formations d'excellence certifiées conformes au système <span className="font-semibold text-[#005a9c]">L.M.D (Licence - Master - Doctorat)</span> par le Ministère de l'Enseignement Supérieur et Universitaire (ESU).
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          {/* Cycle Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase mr-2">Filtrer par cycle :</span>
            {[
              { id: 'all', label: 'Tous les cycles' },
              { id: 'Licence', label: 'Licence (L1 - L3)' },
              { id: 'Master', label: 'Master (M1 - M2)' },
              { id: 'Doctorat', label: 'Doctorat LMD' },
            ].map((cycle) => (
              <button
                key={cycle.id}
                onClick={() => setSelectedCycle(cycle.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedCycle === cycle.id
                    ? 'bg-[#005a9c] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cycle.label}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une faculté ou filière..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </div>

        {/* Faculties Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculties.map((faculty) => (
            <div 
              key={faculty.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                {/* Cover Image Header */}
                <div 
                  className="relative h-44 w-full bg-slate-900 overflow-hidden cursor-pointer"
                  onClick={() => navigateToFacultyDetail(faculty.id)}
                >
                  <img
                    src={faculty.coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"}
                    alt={faculty.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 bg-slate-950/90 backdrop-blur-sm border border-slate-700 text-white font-black text-[10px] uppercase rounded-md shadow">
                      {faculty.code}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end">
                    {faculty.cycles.map((c) => (
                      <span 
                        key={c} 
                        className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-white border border-white/30"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {/* Title overlay on bottom of banner */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-white font-serif leading-tight drop-shadow-sm group-hover:text-blue-200 transition">
                      {faculty.name}
                    </h3>
                  </div>
                </div>

                {/* Dean Mini-Profile Badge */}
                {faculty.dean && (
                  <div className="px-5 py-3 bg-slate-50 border-b border-slate-100 flex items-center gap-3">
                    <img
                      src={faculty.dean.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"}
                      alt={faculty.dean.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-300 shadow-2xs shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Doyen de Faculté :
                      </span>
                      <span className="text-xs font-bold text-slate-800 truncate block">
                        {faculty.dean.name}
                      </span>
                    </div>
                  </div>
                )}

                {/* Description & Options List */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {faculty.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Filières proposées ({faculty.options.length}) :
                    </span>

                    <ul className="space-y-1.5">
                      {faculty.options.slice(0, 3).map((opt) => (
                        <li key={opt.id} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-800 truncate">{opt.name}</span>
                        </li>
                      ))}
                      {faculty.options.length > 3 && (
                        <li className="text-[11px] text-[#005a9c] font-bold pl-5">
                          + {faculty.options.length - 3} autre(s) filière(s)...
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0">
                <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => navigateToFacultyDetail(faculty.id)}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs tracking-wider transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#005a9c]" />
                    <span>En savoir plus</span>
                  </button>

                  <button
                    onClick={(e) => handleApply(faculty.id, e)}
                    className="w-full py-2 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-lg text-xs tracking-wider transition flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                  >
                    <span>S'inscrire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs uppercase font-bold text-blue-400 tracking-wider">
              Conditions d'Admission {config.academicYear}
            </span>
            <h3 className="text-2xl font-bold font-serif">
              Inscrivez-vous dès maintenant en L1 avec seulement {config.l1TuitionAmount}{config.currency} d'acompte
            </h3>
            <p className="text-xs text-slate-300">
              Profitez d'un encadrement académique moderne, de laboratoires informatiques équipés et de stages cliniques conventionnés à Kinshasa.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => {
                setActiveTab('admission');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 bg-[#005a9c] hover:bg-[#004b82] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-lg transition cursor-pointer"
            >
              Postuler en ligne
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
