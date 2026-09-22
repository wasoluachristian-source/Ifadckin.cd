import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Edit3, 
  Upload, 
  Search, 
  Calendar, 
  Tag, 
  ExternalLink,
  Eye
} from 'lucide-react';
import { GalleryItem } from '../../types';

export const GalleryManagementTab: React.FC = () => {
  const { 
    gallery, 
    addGalleryItem, 
    updateGalleryItem, 
    deleteGalleryItem, 
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'CAMPUS' | 'CEREMONIE' | 'LABORATOIRE' | 'BIBLIOTHEQUE' | 'SPORT' | 'AUTRE'>('CAMPUS');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const filteredGallery = gallery.filter(item => {
    const matchCategory = categoryFilter === 'ALL' || item.category === categoryFilter;
    const matchSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const handleOpenAddModal = () => {
    setEditingItemId(null);
    setFormTitle('');
    setFormCategory('CAMPUS');
    setFormImageUrl('https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=800&auto=format&fit=crop&q=80');
    setFormDescription('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryItem) => {
    setEditingItemId(item.id);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormImageUrl(item.imageUrl);
    setFormDescription(item.description || '');
    setIsModalOpen(true);
  };

  const handleImageFileUpload = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast("Veuillez sélectionner un fichier image valide.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result as string;
      if (res) {
        setFormImageUrl(res);
        showToast("Photo importée avec succès !");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formImageUrl.trim()) {
      showToast("Veuillez renseigner le titre et l'image.");
      return;
    }

    if (editingItemId) {
      await updateGalleryItem(editingItemId, {
        title: formTitle.trim(),
        category: formCategory,
        imageUrl: formImageUrl.trim(),
        description: formDescription.trim()
      });
      showToast("Élément de la galerie mis à jour !");
    } else {
      await addGalleryItem({
        title: formTitle.trim(),
        category: formCategory,
        imageUrl: formImageUrl.trim(),
        description: formDescription.trim()
      });
      showToast("Photo ajoutée à la galerie du campus !");
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-blue-700" />
            Galerie & Médiathèque Officielle de l'IFADC
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Gérez les visuels du campus, laboratoires d'informatique, bibliothèques et cérémonies de collation des grades.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-blue-700/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Ajouter une Photo / Média</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['ALL', 'CAMPUS', 'LABORATOIRE', 'CEREMONIE', 'BIBLIOTHEQUE', 'SPORT', 'AUTRE'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                categoryFilter === cat 
                  ? 'bg-blue-950 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'Toutes les catégories' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher média..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div className="relative h-48 bg-slate-100 overflow-hidden group">
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                {item.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                {item.description && (
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3 h-3" />
                  {item.uploadedAt}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(item)}
                    className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition"
                    title="Modifier"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Supprimer la photo « ${item.title} » ?`)) {
                        deleteGalleryItem(item.id);
                      }
                    }}
                    className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg transition"
                    title="Supprimer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-700" />
              <span>{editingItemId ? "Modifier la photo" : "Ajouter une photo à la galerie"}</span>
            </h3>

            <form onSubmit={handleSaveGalleryItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Titre de la photo :</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ex: Laboratoire Informatique CISCO"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Catégorie :</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 bg-white"
                >
                  <option value="CAMPUS">Campus & Bâtiments</option>
                  <option value="LABORATOIRE">Laboratoire & Équipements</option>
                  <option value="CEREMONIE">Cérémonies & Collations</option>
                  <option value="BIBLIOTHEQUE">Bibliothèque & Documentation</option>
                  <option value="SPORT">Activités & Sports</option>
                  <option value="AUTRE">Autre</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Fichier Photo (Téléversement ou URL) :</label>
                <div className="flex items-center gap-2 mb-2">
                  <label className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer flex items-center gap-1.5 transition">
                    <Upload className="w-4 h-4 text-blue-600" />
                    <span>Choisir fichier image local</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageFileUpload(file);
                      }}
                    />
                  </label>
                </div>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... ou Base64"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 font-mono"
                  required
                />
              </div>

              {formImageUrl && (
                <div className="h-32 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                  <img src={formImageUrl} alt="Aperçu" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Description (Optionnelle) :</label>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  rows={2}
                  placeholder="Détails sur l'infrastructure ou l'événement..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
