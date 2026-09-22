import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Globe, 
  Calendar, 
  Download, 
  FileText, 
  Search, 
  Tag, 
  ArrowRight, 
  Eye, 
  X, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Announcement } from '../types';

export const AnnouncementsSection: React.FC = () => {
  const { announcements, faculties, navigateToFacultyDetail, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<Announcement | null>(null);

  const categories = [
    { id: 'ALL', label: 'Toutes les actualités' },
    { id: 'INSCRIPTION', label: 'Inscriptions & Admissions' },
    { id: 'ACADEMIQUE', label: 'Académique & Recherche' },
    { id: 'OFFICIEL', label: 'Communiqués Officiels' },
    { id: 'EVENEMENT', label: 'Événements & Colloques' },
  ];

  const filteredAnnouncements = announcements.filter(a => {
    const matchesCat = selectedCategory === 'ALL' || a.category === selectedCategory;
    const matchesQuery = 
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (a.summary && a.summary.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const getFacultyName = (facultyId?: string) => {
    if (!facultyId || facultyId === 'ALL') return "Tout l'Institut IFADC";
    const found = faculties.find(f => f.id === facultyId);
    return found ? found.name : "Tout l'Institut";
  };

  const handleDownload = (announcement: Announcement) => {
    const fileName = announcement.attachmentName || 'COMMUNIQUE_OFFICIEL_IFADC.pdf';
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
COMMUNIQUÉ OFFICIEL - ANNÉE ACADÉMIQUE 2026-2027
------------------------------------------------------------
Titre: ${announcement.title}
Catégorie: ${announcement.category}
Date de publication: ${announcement.publishedAt}
Faculté: ${getFacultyName(announcement.facultyId)}

RÉSUMÉ:
${announcement.summary || ''}

TEXTE OFFICIEL DU COMMUNIQUÉ:
${announcement.content}

------------------------------------------------------------
Document authentifié par le Secrétariat Général de l'IFADC.
Contact: contact@ifadc.cd | Tél: +243 893 122 361
Site Web: https://ifadc.cd`;

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
    <section className="py-16 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#005a9c] uppercase tracking-widest border border-blue-200">
            <Globe className="w-3.5 h-3.5 text-[#005a9c]" />
            Portail d'Informations & Communiqués
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif tracking-tight">
            Actualités & Communiqués Officiels
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Suivez en temps réel la vie académique, les annonces du Rectorat et les avis décanaux de l'IFADC.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#005a9c] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une annonce..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </div>

        {/* Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Image Cover */}
                {ann.imageUrl ? (
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => setActiveArticle(ann)}>
                    <img
                      src={ann.imageUrl}
                      alt={ann.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-950/90 text-white backdrop-blur-sm border border-slate-700">
                        {ann.category}
                      </span>
                    </div>
                    {ann.isPinned && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#005a9c] text-white shadow">
                          Épinglé
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-28 bg-gradient-to-r from-slate-950 to-slate-900 p-4 flex flex-col justify-between text-white">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white w-fit">
                      {ann.category}
                    </span>
                    <span className="text-[11px] text-slate-300">
                      {new Date(ann.publishedAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(ann.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    <span>•</span>
                    <span className="text-[#005a9c] font-semibold truncate max-w-[140px]">
                      {getFacultyName(ann.facultyId)}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setActiveArticle(ann)}
                    className="text-lg font-bold text-slate-900 font-serif line-clamp-2 cursor-pointer hover:text-[#005a9c] transition"
                  >
                    {ann.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {ann.summary || ann.content}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 space-y-2">
                {ann.attachmentName && (
                  <button
                    onClick={() => handleDownload(ann)}
                    className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold rounded-lg text-xs border border-slate-200 flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#005a9c]" />
                    <span className="truncate max-w-[200px]">Télécharger {ann.attachmentName}</span>
                    {ann.attachmentSize && <span className="text-[10px] text-slate-400">({ann.attachmentSize})</span>}
                  </button>
                )}

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveArticle(ann)}
                    className="text-xs font-bold text-[#005a9c] hover:text-blue-900 flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>Lire le communiqué complet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Article Detail / Lightbox Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col">
            
            {/* Modal Header Image */}
            {activeArticle.imageUrl && (
              <div className="relative h-64 w-full bg-slate-900">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveArticle(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/80 hover:bg-slate-950 text-white flex items-center justify-center transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-6">
              {!activeArticle.imageUrl && (
                <div className="flex justify-end">
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase bg-blue-100 text-[#005a9c]">
                    {activeArticle.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    Publié le {new Date(activeArticle.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  <span className="text-xs font-semibold text-slate-700">
                    • {getFacultyName(activeArticle.facultyId)}
                  </span>
                </div>

                <h2 className="text-2xl font-bold font-serif text-slate-900 leading-snug">
                  {activeArticle.title}
                </h2>
              </div>

              {/* Body Content */}
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line space-y-4">
                {activeArticle.content}
              </div>

              {/* Download attachment file if available */}
              {activeArticle.attachmentName && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#005a9c] text-white flex items-center justify-center font-bold">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Document joint au communiqué
                      </h4>
                      <p className="text-xs text-slate-600">
                        {activeArticle.attachmentName} {activeArticle.attachmentSize && `(${activeArticle.attachmentSize})`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(activeArticle)}
                    className="px-4 py-2 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-lg text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Télécharger le document</span>
                  </button>
                </div>
              )}

              {/* Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Institut Facultaire des Assemblées de Dieu du Congo (IFADC)
                </span>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-xs transition cursor-pointer"
                >
                  Fermer
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
