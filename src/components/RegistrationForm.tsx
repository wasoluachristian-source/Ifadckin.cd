import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft, 
  Printer, 
  Copy, 
  Search, 
  AlertCircle,
  FileCheck,
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import { ApplicationDocument } from '../types';

export const RegistrationForm: React.FC<{ preSelectedFacultyId?: string }> = ({ 
  preSelectedFacultyId 
}) => {
  const { faculties, config, submitApplication, setActiveTab, showToast } = useApp();

  const [step, setStep] = useState<number>(1);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    gender: 'M' as 'M' | 'F',
    email: '',
    phone: '',
    dateOfBirth: '',
    placeOfBirth: '',
    address: '',
    lastSchool: '',
    diplomaYear: '2026',
    diplomaPercentage: 65,
    facultyId: preSelectedFacultyId || (faculties[0]?.id || 'info'),
    optionName: '',
    level: 'L1 (Système LMD)',
    academicYear: config.academicYear || '2026-2027',
  });

  // Selected faculty object
  const currentFaculty = faculties.find(f => f.id === formData.facultyId) || faculties[0];

  // Uploaded documents simulation
  const [documents, setDocuments] = useState<ApplicationDocument[]>([
    {
      id: 'doc-initial-1',
      name: 'Diplome_ou_Attestation_Reussite.pdf',
      type: 'diplome',
      url: '#',
      uploadedAt: new Date().toISOString().split('T')[0],
      fileSize: '1.8 MB'
    }
  ]);

  const [submittedDossierNumber, setSubmittedDossierNumber] = useState<string | null>(null);

  // Handle option initialization when faculty changes
  const handleFacultyChange = (facultyId: string) => {
    const fac = faculties.find(f => f.id === facultyId);
    setFormData(prev => ({
      ...prev,
      facultyId,
      optionName: fac?.options[0]?.name || ''
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: ApplicationDocument['type']) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newDoc: ApplicationDocument = {
        id: `doc-${Date.now()}`,
        name: file.name,
        type: type,
        url: URL.createObjectURL(file),
        uploadedAt: new Date().toISOString().split('T')[0],
        fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      setDocuments(prev => [...prev.filter(d => d.type !== type), newDoc]);
      showToast(`Fichier ${file.name} ajouté avec succès.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.lastName || !formData.firstName || !formData.phone || !formData.email) {
      showToast("Veuillez renseigner tous les champs obligatoires (*).");
      return;
    }

    const dossierNum = submitApplication({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      middleName: formData.middleName.trim(),
      gender: formData.gender,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      dateOfBirth: formData.dateOfBirth || '2005-01-01',
      placeOfBirth: formData.placeOfBirth || 'Kinshasa',
      address: formData.address || 'Kinshasa, RDC',
      lastSchool: formData.lastSchool || 'Humanités secondaires',
      diplomaYear: formData.diplomaYear,
      diplomaPercentage: Number(formData.diplomaPercentage) || 60,
      facultyId: currentFaculty.id,
      facultyName: currentFaculty.name,
      optionName: formData.optionName || currentFaculty.options[0]?.name || 'Général',
      level: formData.level,
      academicYear: formData.academicYear,
      documents: documents,
      initialFeePaid: false,
    });

    setSubmittedDossierNumber(dossierNum);
    setStep(4); // Success step
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast("Numéro de dossier copié dans le presse-papier !");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="py-12 bg-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center mb-8 space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#005a9c] border border-blue-200 uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5" />
            Admissions Officielles {config.academicYear}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-serif">
            Inscription & Dépôt de Candidature en Ligne
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Remplissez ce formulaire pour créer votre dossier académique officiel à l'IFADC. Frais d'inscription L1 à {config.l1TuitionAmount}{config.currency}.
          </p>
        </div>

        {/* Step Indicator */}
        {step < 4 && (
          <div className="bg-white rounded-xl p-4 mb-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between">
              {[
                { num: 1, title: 'Identité du Candidat' },
                { num: 2, title: 'Filière & Diplôme' },
                { num: 3, title: 'Pièces Justificatives' },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      step === s.num 
                        ? 'bg-[#005a9c] text-white ring-2 ring-blue-300' 
                        : step > s.num 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
                  </div>
                  <span className={`hidden sm:inline text-xs font-semibold ${step === s.num ? 'text-blue-950 font-bold' : 'text-slate-500'}`}>
                    {s.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
          
          {/* STEP 1: IDENTITY */}
          {step === 1 && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900 font-serif">
                  Étape 1 : Informations Personnelles & État Civil
                </h2>
                <p className="text-xs text-slate-500">
                  Ces informations figureront sur votre carte d'étudiant et vos futurs relevés de notes officiels.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Nom de famille *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: KABAMBA"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Post-nom
                  </label>
                  <input
                    type="text"
                    placeholder="ex: MUKUNA"
                    value={formData.middleName}
                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Jonathan"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Genre / Sexe *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'M' | 'F' })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  >
                    <option value="M">Masculin (M)</option>
                    <option value="F">Féminin (F)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Date de naissance *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Lieu de naissance
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Kinshasa"
                    value={formData.placeOfBirth}
                    onChange={(e) => setFormData({ ...formData, placeOfBirth: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Numéro de Téléphone (WhatsApp / SMS) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="ex: 0893122361 ou +243..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Adresse Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ex: candidat@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Adresse de résidence actuelle (Kinshasa)
                </label>
                <input
                  type="text"
                  placeholder="ex: Av. Université n° 45, Commune de Kasa-Vubu, Kinshasa"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.lastName || !formData.firstName || !formData.phone || !formData.email) {
                      showToast("Veuillez renseigner les champs obligatoires (Nom, Prénom, Téléphone, Email).");
                      return;
                    }
                    setStep(2);
                  }}
                  className="px-6 py-2.5 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Suivant : Filière & Diplôme</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: ACADEMIC CHOICE */}
          {step === 2 && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900 font-serif">
                  Étape 2 : Choix de la Faculté & Antécédents Scolaires
                </h2>
                <p className="text-xs text-slate-500">
                  Sélectionnez votre orientation académique pour l'année {config.academicYear}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Faculté choisie *
                  </label>
                  <select
                    value={formData.facultyId}
                    onChange={(e) => handleFacultyChange(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none font-medium"
                  >
                    {faculties.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Département / Option *
                  </label>
                  <select
                    value={formData.optionName}
                    onChange={(e) => setFormData({ ...formData, optionName: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  >
                    {currentFaculty.options.map((opt) => (
                      <option key={opt.id} value={opt.name}>
                        {opt.name} ({opt.cycle.join(', ')})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Niveau d'admission
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none font-medium"
                  >
                    <option value="L1 (Système LMD)">Licence 1 - L1 (Acompte {config.l1TuitionAmount}{config.currency})</option>
                    <option value="L2 (Système LMD)">Licence 2 - L2</option>
                    <option value="L3 (Système LMD)">Licence 3 - L3</option>
                    <option value="Master 1 - M1">Master 1 - M1</option>
                    <option value="Master 2 - M2">Master 2 - M2</option>
                    <option value="Doctorat LMD">Doctorat (Théologie)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Dernière École / Institut fréquenté
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Collège Boboto, Lycée Sainte Germaine..."
                    value={formData.lastSchool}
                    onChange={(e) => setFormData({ ...formData, lastSchool: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Année d'obtention du Diplôme d'État / Bac
                  </label>
                  <input
                    type="text"
                    value={formData.diplomaYear}
                    onChange={(e) => setFormData({ ...formData, diplomaYear: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Pourcentage obtenu à l'Examen d'État (%)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={formData.diplomaPercentage}
                    onChange={(e) => setFormData({ ...formData, diplomaPercentage: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-950 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2.5 bg-[#005a9c] hover:bg-[#004b82] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>Suivant : Pièces du Dossier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENTS UPLOAD */}
          {step === 3 && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900 font-serif">
                  Étape 3 : Téléversement des Pièces Justificatives Numériques
                </h2>
                <p className="text-xs text-slate-500">
                  Déposez vos documents scannés ou photos nettes (PDF, JPG, PNG). Sécurité et confidentialité garanties.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Document 1: Diplôme */}
                <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 hover:bg-slate-100/80 transition">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-blue-900" />
                      <span className="text-xs font-bold text-slate-900">
                        1. Diplôme d'État ou Attestation de réussite *
                      </span>
                    </div>
                    {documents.some(d => d.type === 'diplome') && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Joint ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Document officiel justifiant la fin du cycle secondaire.
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choisir un fichier</span>
                    <input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, 'diplome')}
                    />
                  </label>
                </div>

                {/* Document 2: Bulletin */}
                <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 hover:bg-slate-100/80 transition">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-blue-900" />
                      <span className="text-xs font-bold text-slate-900">
                        2. Bulletin de 6e des humanités
                      </span>
                    </div>
                    {documents.some(d => d.type === 'bulletin') && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Joint ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Relevé de notes de terminale ou certificat de scolarité.
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choisir un fichier</span>
                    <input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, 'bulletin')}
                    />
                  </label>
                </div>

                {/* Document 3: Photo Passeport */}
                <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 hover:bg-slate-100/80 transition">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-blue-900" />
                      <span className="text-xs font-bold text-slate-900">
                        3. Photo Passeport récente (Identité) *
                      </span>
                    </div>
                    {documents.some(d => d.type === 'photo') && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Joint ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Photo couleur fond blanc pour la carte d'étudiant.
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choisir un fichier</span>
                    <input 
                      type="file" 
                      accept=".jpg,.jpeg,.png"
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, 'photo')}
                    />
                  </label>
                </div>

                {/* Document 4: Pièce d'identité */}
                <div className="border border-dashed border-slate-300 rounded-xl p-4 bg-slate-50 hover:bg-slate-100/80 transition">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-5 h-5 text-blue-900" />
                      <span className="text-xs font-bold text-slate-900">
                        4. Pièce d'identité ou Acte de naissance
                      </span>
                    </div>
                    {documents.some(d => d.type === 'identite') && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                        Joint ✓
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Carte d'électeur, passeport ou attestation de naissance.
                  </p>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choisir un fichier</span>
                    <input 
                      type="file" 
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden" 
                      onChange={(e) => handleFileUpload(e, 'identite')}
                    />
                  </label>
                </div>

              </div>

              {/* Financial commitment note */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-950 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertCircle className="w-4 h-4 text-[#005a9c] shrink-0" />
                  <span>Modalité financière L1 (Acompte d'inscription : {config.l1TuitionAmount}{config.currency})</span>
                </div>
                <p className="text-slate-700">
                  Après validation de ce dossier en ligne par le secrétariat académique, le paiement de l'acompte de <strong>{config.l1TuitionAmount}{config.currency}</strong> au guichet financier (Campus Assosa 2219 Kasa-Vubu) ou par mobile money confirmera définitivement votre attribution de matricule officiel.
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Retour</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-[#005a9c] hover:bg-[#004b82] text-white font-extrabold rounded-xl text-xs uppercase tracking-wider transition flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Soumettre mon dossier officiel</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS RECEIPT */}
          {step === 4 && submittedDossierNumber && (
            <div className="p-6 sm:p-10 space-y-6 text-center">
              
              <div className="w-16 h-16 rounded-full bg-blue-50 text-[#005a9c] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest text-[#005a9c]">
                  Candidature enregistrée avec succès
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif">
                  Félicitations, {formData.firstName} {formData.lastName} !
                </h2>
                <p className="text-xs text-slate-600 max-w-lg mx-auto">
                  Votre dossier a été transmis à la commission d'admission de l'IFADC ({config.academicYear}). Conservez précieusement votre référence :
                </p>
              </div>

              {/* Dossier Code Box */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 max-w-md mx-auto shadow-xl space-y-3 border border-slate-800">
                <span className="text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                  Numéro de Suivi de Dossier
                </span>
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-wider">
                  {submittedDossierNumber}
                </div>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => copyToClipboard(submittedDossierNumber)}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copié !' : 'Copier le numéro'}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-[#005a9c] hover:bg-[#004b82] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimer la Fiche</span>
                  </button>
                </div>
              </div>

              {/* Summary details */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-2 text-slate-700">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="font-semibold text-slate-500">Faculté :</span>
                  <span className="font-bold text-slate-900">{currentFaculty.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="font-semibold text-slate-500">Option choisie :</span>
                  <span className="font-bold text-slate-900">{formData.optionName || currentFaculty.options[0]?.name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="font-semibold text-slate-500">Niveau :</span>
                  <span className="font-bold text-slate-900">{formData.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-500">Campus de dépôt :</span>
                  <span className="font-bold text-slate-900">{config.address}, Kasa-Vubu</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={() => {
                    setActiveTab('tracking');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-[#005a9c] text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md hover:bg-[#004b82] transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Vérifier le statut du dossier</span>
                </button>

                <button
                  onClick={() => {
                    setStep(1);
                    setSubmittedDossierNumber(null);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      middleName: '',
                      gender: 'M',
                      email: '',
                      phone: '',
                      dateOfBirth: '',
                      placeOfBirth: '',
                      address: '',
                      lastSchool: '',
                      diplomaYear: '2026',
                      diplomaPercentage: 65,
                      facultyId: faculties[0]?.id || 'info',
                      optionName: '',
                      level: 'L1 (Système LMD)',
                      academicYear: config.academicYear || '2026-2027',
                    });
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs uppercase tracking-wider transition"
                >
                  Nouvelle inscription
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
