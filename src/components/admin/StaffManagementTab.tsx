import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UserCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  KeyRound, 
  RotateCcw, 
  Search, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  BookOpen, 
  Award, 
  Crown,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { StaffMember, StaffRole } from '../../types';

export const StaffManagementTab: React.FC = () => {
  const { 
    staffMembers, 
    addStaffMember, 
    updateStaffMember, 
    deleteStaffMember, 
    resetStaffPassword,
    faculties,
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('ALL');

  // Modal / Form state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaffId, setEditingStaffId] = useState<string | null>(null);

  const [formFullName, setFormFullName] = useState('');
  const [formUsername, setFormUsername] = useState('');
  const [formTitle, setFormTitle] = useState('Professeur');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRole, setFormRole] = useState<StaffRole>('PROFESSEUR');
  const [formFacultyId, setFormFacultyId] = useState<string>('info');

  const filteredStaff = staffMembers.filter(staff => {
    const matchRole = roleFilter === 'ALL' || staff.role === roleFilter;
    const matchSearch = 
      staff.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRole && matchSearch;
  });

  const handleOpenAddModal = () => {
    setEditingStaffId(null);
    setFormFullName('');
    setFormUsername('');
    setFormTitle('Professeur');
    setFormEmail('');
    setFormPhone('');
    setFormRole('PROFESSEUR');
    setFormFacultyId(faculties[0]?.id || 'info');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (staff: StaffMember) => {
    setEditingStaffId(staff.id);
    setFormFullName(staff.fullName);
    setFormUsername(staff.username);
    setFormTitle(staff.title || '');
    setFormEmail(staff.email);
    setFormPhone(staff.phone || '');
    setFormRole(staff.role);
    setFormFacultyId(staff.facultyId || faculties[0]?.id || '');
    setIsModalOpen(true);
  };

  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFullName.trim() || !formUsername.trim()) {
      showToast("Veuillez renseigner le nom complet et l'identifiant.");
      return;
    }

    const selectedFaculty = faculties.find(f => f.id === formFacultyId);

    if (editingStaffId) {
      await updateStaffMember(editingStaffId, {
        fullName: formFullName.trim(),
        username: formUsername.trim().toLowerCase(),
        title: formTitle.trim(),
        email: formEmail.trim(),
        phone: formPhone.trim(),
        role: formRole,
        facultyId: (formRole === 'PROFESSEUR' || formRole === 'DOYEN') ? formFacultyId : undefined,
        facultyName: (formRole === 'PROFESSEUR' || formRole === 'DOYEN') ? selectedFaculty?.name : undefined
      });
      showToast("Compte mis à jour avec succès !");
    } else {
      await addStaffMember({
        fullName: formFullName.trim(),
        username: formUsername.trim().toLowerCase(),
        title: formTitle.trim(),
        email: formEmail.trim() || `${formUsername.trim().toLowerCase()}@ifadc.cd`,
        phone: formPhone.trim() || '+243 893 122 361',
        role: formRole,
        facultyId: (formRole === 'PROFESSEUR' || formRole === 'DOYEN') ? formFacultyId : undefined,
        facultyName: (formRole === 'PROFESSEUR' || formRole === 'DOYEN') ? selectedFaculty?.name : undefined,
        password: '3435PROF',
        status: 'ACTIF',
        assignedCourses: formRole === 'PROFESSEUR' ? [
          { courseCode: "COURS101", courseName: "Matière Principale", credits: 5, facultyId: formFacultyId, level: "L1 (Système LMD)", semester: 1 }
        ] : undefined
      });
    }

    setIsModalOpen(false);
  };

  const handleToggleStatus = async (staff: StaffMember) => {
    const nextStatus = staff.status === 'ACTIF' ? 'SUSPENDU' : 'ACTIF';
    await updateStaffMember(staff.id, { status: nextStatus });
    showToast(`Compte ${staff.fullName} : ${nextStatus}`);
  };

  const getRoleBadge = (role: StaffRole) => {
    switch (role) {
      case 'PROFESSEUR':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800"><BookOpen className="w-3 h-3" /> Professeur</span>;
      case 'DOYEN':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800"><ShieldCheck className="w-3 h-3" /> Doyen</span>;
      case 'RECTEUR':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800"><Award className="w-3 h-3" /> Recteur</span>;
      case 'GESTIONNAIRE_INSCRIPTIONS':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-900"><Briefcase className="w-3 h-3" /> Inscriptions</span>;
      default:
        return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800">{role}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-blue-700" />
            Gestion Globale des Comptes du Personnel
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Création, modification et réinitialisation des accès pour Professeurs, Doyens, Rectorat & Inscriptions.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl text-xs flex items-center gap-2 shadow-md shadow-blue-700/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Créer un Compte Personnel</span>
        </button>
      </div>

      {/* Password Rule Notice */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3 text-slate-700 text-xs">
        <KeyRound className="w-5 h-5 shrink-0 text-blue-700 mt-0.5" />
        <div>
          <strong className="block font-bold text-slate-900">Gestion des accès et réinitialisation :</strong>
          Lors de la création d'un compte enseignant ou administratif, un mot de passe d'initialisation est configuré. En tant qu'administrateur, vous pouvez à tout moment réinitialiser le mot de passe ou suspendre les privilèges d'accès.
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {['ALL', 'PROFESSEUR', 'DOYEN', 'RECTEUR', 'GESTIONNAIRE_INSCRIPTIONS'].map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                roleFilter === role 
                  ? 'bg-blue-900 text-white' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {role === 'ALL' ? 'Tous les Rôles' : role}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher personnel, identifiant..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">Personnel & Titre</th>
                <th className="px-6 py-3.5">Identifiant</th>
                <th className="px-6 py-3.5">Rôle & Espace</th>
                <th className="px-6 py-3.5">Faculté / Affectation</th>
                <th className="px-6 py-3.5">Statut</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.map(staff => (
                <tr key={staff.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{staff.fullName}</div>
                    <div className="text-xs text-slate-500">{staff.title || 'Enseignant'} • {staff.phone}</div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs font-bold text-blue-700">
                    {staff.username}
                  </td>
                  <td className="px-6 py-4">
                    {getRoleBadge(staff.role)}
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-700">
                    {staff.facultyName || (staff.role === 'RECTEUR' ? 'Institut Global' : staff.role === 'GESTIONNAIRE_INSCRIPTIONS' ? 'Scolarité Centrale' : '-')}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                      staff.status === 'ACTIF' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                    }`}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => resetStaffPassword(staff.id)}
                        title="Réinitialiser mot de passe (3435PROF)"
                        className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg text-xs font-medium transition"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleToggleStatus(staff)}
                        title={staff.status === 'ACTIF' ? "Suspendre l'accès" : "Activer l'accès"}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs transition"
                      >
                        {staff.status === 'ACTIF' ? <XCircle className="w-3.5 h-3.5 text-rose-600" /> : <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                      </button>

                      <button
                        onClick={() => handleOpenEditModal(staff)}
                        title="Modifier"
                        className="p-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Confirmer la suppression du compte de ${staff.fullName} ?`)) {
                            deleteStaffMember(staff.id);
                          }
                        }}
                        title="Supprimer"
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-700" />
              <span>{editingStaffId ? "Modifier le Compte Personnel" : "Créer un Compte Personnel"}</span>
            </h3>

            <form onSubmit={handleSaveStaff} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nom complet & Titre :</label>
                <input
                  type="text"
                  value={formFullName}
                  onChange={(e) => setFormFullName(e.target.value)}
                  placeholder="Ex: Prof. Dr. LUBOYA Joseph"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Identifiant de connexion :</label>
                  <input
                    type="text"
                    value={formUsername}
                    onChange={(e) => setFormUsername(e.target.value)}
                    placeholder="Ex: prof.luboya"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Rôle :</label>
                  <select
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value as StaffRole)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="PROFESSEUR">Professeur (Saisie Notes)</option>
                    <option value="DOYEN">Doyen (Validation Délibération)</option>
                    <option value="RECTEUR">Recteur (Supervision Globale)</option>
                    <option value="GESTIONNAIRE_INSCRIPTIONS">Gestionnaire Inscriptions</option>
                  </select>
                </div>
              </div>

              {(formRole === 'PROFESSEUR' || formRole === 'DOYEN') && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Faculté d'affectation :</label>
                  <select
                    value={formFacultyId}
                    onChange={(e) => setFormFacultyId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    {faculties.map(fac => (
                      <option key={fac.id} value={fac.id}>
                        {fac.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email :</label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="contact@ifadc.cd"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Téléphone :</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+243 893 122 361"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-600">
                🔑 Mot de passe par défaut : <strong>3435PROF</strong>
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
