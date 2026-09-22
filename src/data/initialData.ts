import { InstituteConfig, Faculty, Student, RegistrationApplication, AdminDocument, Announcement, StaffMember, GalleryItem } from '../types';

export const initialInstituteConfig: InstituteConfig = {
  name: "Institut Facultaire des Assemblées de Dieu du Congo",
  shortName: "IFADC",
  tutelle: "Homologué par le Ministère de l'Enseignement Supérieur et Universitaire (ESU) — République Démocratique du Congo",
  motto: "EXCELLENCE, FOI ET SAVOIR",
  address: "Assosa N° 2219 C/ KASA-VUBU",
  reference: "Maison Communale de KASA-VUBU",
  commune: "Kasa-Vubu",
  city: "Kinshasa",
  country: "République Démocratique du Congo",
  phone: "0893122361",
  phoneAlt: "0897260563",
  phoneNumbers: ["0893122361", "0897260563", "0817562082"],
  email: "contact@ifadc.cd",
  academicYear: "2025-2026 / 2026-2027",
  l1TuitionAmount: 100,
  currency: "$",
  logoUrl: "", // SVG fallback rendered dynamically
  bannerTitle: "Bâtir l'élite intellectuelle et morale pour le futur de la RDC",
  bannerSubtitle: "L'IFADC prépare la nouvelle génération de cadres pour un Congo émergent, compétent et guidé par des valeurs d'intégrité.",
  rectorName: "Prof. Dr. Samuel KABEYA TSHIMANGA",
  academicSecretaryName: "Prof. Dr. Michel MUKENDI KALALA",
  websiteUrl: "www.ifadc.cd",
  developerCreditText: "wastus spart dev",
  footerDescription: "Établissement d'enseignement supérieur d'excellence homologué par l'ESU en RDC, formant des cadres chrétiens compétents et intègres.",
  
  // Custom Editable Text
  heroTitle: "Bâtir le futur social & intellectuel de la RDC",
  ctaPrimaryText: "Déposer une candidature",
  ctaSecondaryText: "Espace Étudiant",
  homologationNoticeText: "Homologué par le Ministère de l'Enseignement Supérieur et Universitaire (ESU) — RDC",

  // Typography & Styling
  fontFamily: "serif",
  baseFontSize: "normal",
  headingStyle: "bold",
  heroTheme: "navy-dark",

  // Custom Colors
  heroTitleColor: "#ffffff",
  heroSubtitleColor: "#cbd5e1",
  heroMottoColor: "#93c5fd",
  primaryBrandColor: "#0f172a",
  primaryAccentColor: "#005a9c",

  // Title Size and Weight
  heroTitleSize: "xl",
  heroTitleWeight: "extrabold",

  // Visual Elements Visibility Toggles
  showTopContactBar: true,
  showESUHomologationBanner: true,
  showHeroBadges: true,
  showHeroStats: true,
  showHeroRightCard: true,
  showHeroBgOverlay: true,
  showHeroShareButton: true,
  showHeroCtaButtons: true,
  showDriveMenuTab: true,
  showStudentPortalTab: true,
  showStaffPortalTab: true,
  showNewsMarquee: true,
  showFooterDeans: true,
  showFooterDevCredit: true,
  showCampusMapInContact: true,
};

export const initialAnnouncements: Announcement[] = [
  {
    id: "ann-01",
    title: "Ouverture Officielle des Inscriptions pour l'Année Académique 2026-2027",
    category: "INSCRIPTION",
    summary: "Les inscriptions en Licence 1 (Système LMD) sont désormais ouvertes avec un acompte initial fixé à 100$.",
    content: "Le Secrétariat Général Académique de l'Institut Facultaire des Assemblées de Dieu du Congo (IFADC) porte à la connaissance des diplômés d'État et des candidats que la plateforme d'admission en ligne pour l'année académique 2026-2027 est officiellement opérationnelle. Les candidats peuvent déposer leur dossier en ligne ou directement au campus central de Kasa-Vubu. Les conditions d'accès et la grille des frais sont téléchargeables ci-dessous.",
    publishedAt: "2026-08-15",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1000&auto=format&fit=crop&q=80",
    attachmentUrl: "#",
    attachmentName: "COMMUNIQUE_OFFICIEL_INSCRIPTION_2026_2027.pdf",
    attachmentSize: "1.4 MB",
    facultyId: "ALL",
    isPinned: true
  },
  {
    id: "ann-02",
    title: "Inauguration du Nouveau Laboratoire d'Intelligence Artificielle & Robotique",
    category: "ACADEMIQUE",
    summary: "La Faculté des Sciences Informatiques s'équipe de nouveaux serveurs GPU et d'équipements robotiques IoT.",
    content: "Dans le cadre de l'excellence technologique, l'IFADC a inauguré ce lundi son tout nouveau laboratoire informatique doté de 60 stations de travail haute performance, de kits robotiques industriels et d'un accès dédié à la fibre optique pour les étudiants de Génie Informatique et de Robotique.",
    publishedAt: "2026-08-12",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&auto=format&fit=crop&q=80",
    attachmentUrl: "#",
    attachmentName: "FICHE_TECHNIQUE_LABORATOIRE_INFO.pdf",
    attachmentSize: "2.1 MB",
    facultyId: "info",
    isPinned: false
  },
  {
    id: "ann-03",
    title: "Partenariat Clinique pour les Stages en Soins Généraux et Biologie Médicale",
    category: "OFFICIEL",
    summary: "Signature d'une convention de stage avec les centres hospitaliers majeurs de la ville-province de Kinshasa.",
    content: "Le Décanat de la Faculté des Sciences de Santé annonce la signature d'un accord-cadre permettant aux étudiants inscrits en soins généraux, techniques de laboratoire et maïeutique d'effectuer leurs stages cliniques supervisés dans des structures hospitalières de référence dès le second semestre.",
    publishedAt: "2026-08-08",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=80",
    attachmentUrl: "#",
    attachmentName: "CONVENTION_STAGES_CLINIQUES_SANTE.pdf",
    attachmentSize: "950 KB",
    facultyId: "sante",
    isPinned: false
  },
  {
    id: "ann-04",
    title: "Colloque International de Théologie & Leadership de Transformation",
    category: "EVENEMENT",
    summary: "Rencontre académique sur le thème : « Éthique publique et responsabilité civique de l'Église au XXIe siècle ».",
    content: "La Faculté de Théologie & Études Pastorales organise un grand colloque rassemblant théologiens, pasteurs et universitaires d'Afrique centrale pour débattre du rôle du leadership spirituel dans l'émergence morale et sociale de la RDC.",
    publishedAt: "2026-08-02",
    imageUrl: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000&auto=format&fit=crop&q=80",
    attachmentUrl: "#",
    attachmentName: "PROGRAMME_COLLOQUE_THEOLOGIE_2026.pdf",
    attachmentSize: "1.8 MB",
    facultyId: "theologie",
    isPinned: false
  }
];

export const initialFaculties: Faculty[] = [
  {
    id: "info",
    name: "Sciences de l'Informatique",
    code: "INFO",
    icon: "Laptop",
    color: "from-blue-600 to-indigo-900",
    cycles: ["Licence", "Master"],
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
    description: "Formation de pointe en ingénierie logicielle, robotique, architectures cloud, intelligence artificielle et cybersécurité réseau.",
    contactEmail: "info.fac@ifadc.cd",
    contactPhone: "+243 893 122 361",
    dean: {
      name: "Prof. Ir. David LUBOYA TSHISEKEDI",
      title: "Doyen de la Faculté des Sciences Informatiques",
      academicRank: "Professeur Ordinaire • Docteur en Génie Logiciel & Systèmes Embarqués",
      photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      message: "Bienvenue à la Faculté des Sciences Informatiques de l'IFADC ! Notre mission est de former les bâtisseurs du numérique africain. Nous mettons à la disposition de nos apprenants des laboratoires ultra-modernes et un corps professoral de haut vol pour relever les défis de l'intelligence artificielle, du cloud computing et de la souveraineté numérique.",
      email: "david.luboya@ifadc.cd",
      phone: "+243 812 345 678"
    },
    headOfFaculty: "Prof. Ir. David LUBOYA",
    options: [
      { id: "info-1", name: "Conception et Génie Informatique", cycle: ["Licence", "Master"], description: "Développement full-stack, architectures microservices, cloud et intégration d'intelligences artificielles." },
      { id: "info-2", name: "Informatique Robotique & IoT", cycle: ["Licence", "Master"], description: "Systèmes embarqués, mécatronique, automatisation industrielle et objets connectés." },
      { id: "info-3", name: "Analyse et Programmation", cycle: ["Licence"], description: "Algorithmique avancée, bases de données relationnelles et ingénierie Big Data." },
      { id: "info-4", name: "Administration Réseau & Cybersécurité", cycle: ["Licence", "Master"], description: "Télécommunications, infrastructure datacenter et protection proactive contre les cyberattaques." }
    ],
    admissionRequirements: [
      "Diplôme d'État ou Baccalauréat Scientifique, Commercial ou Pédagogique",
      "Solides aptitudes en logique mathématique et esprit d'analyse",
      "Passage du test d'aptitude informatique préliminaire (gratuit)"
    ],
    careerProspects: [
      "Ingénieur Logiciel & Développeur Full-Stack",
      "Architecte Cloud & Administrateur Réseau",
      "Expert en Cybersécurité & Audit des Systèmes",
      "Ingénieur en Robotique & Systèmes Embarqués"
    ]
  },
  {
    id: "sante",
    name: "Sciences de Santé",
    code: "SANTE",
    icon: "Stethoscope",
    color: "from-emerald-600 to-teal-900",
    cycles: ["Licence", "Master"],
    coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop&q=80",
    description: "Corps médical et soignant d'élite voué à l'éthique de la santé publique, à la biologie médicale et aux soins cliniques de qualité.",
    contactEmail: "sante.fac@ifadc.cd",
    contactPhone: "+243 893 122 362",
    dean: {
      name: "Dr. Marie-Claire MBOMBO KALONJI",
      title: "Doyenne de la Faculté des Sciences de Santé",
      academicRank: "Docteur en Médecine & Spécialiste en Santé Publique et Épidémiologie",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=80",
      message: "La santé est le fondement de toute prospérité humaine. À l'IFADC, nous allions rigueur scientifique, formation clinique intensive en hôpitaux de référence et vocation humaniste chrétienne pour former des soignants compétents et compatissants.",
      email: "marieclaire.mbombo@ifadc.cd",
      phone: "+243 898 765 432"
    },
    headOfFaculty: "Dr. Marie-Claire MBOMBO",
    options: [
      { id: "sante-1", name: "Soins Généraux : Sciences Hospitalières", cycle: ["Licence", "Master"], description: "Pratique infirmière avancée, sciences hospitalières, réanimation et soins cliniques spécialisés." },
      { id: "sante-2", name: "Pédiatrie & Soins Infirmiers Pédiatriques", cycle: ["Licence", "Master"], description: "Soins aux nouveau-nés, néonatalogie, nutrition et santé de l'enfant." },
      { id: "sante-3", name: "Sage Femme (Maïeutique)", cycle: ["Licence"], description: "Santé reproductive, suivi obstétrique prénatal, accouchement et périnatalogie." },
      { id: "sante-4", name: "Santé Communautaire (Master 1)", cycle: ["Master"], description: "Épidémiologie appliquée, gestion des programmes de santé publique et prévention communautaire." },
      { id: "sante-5", name: "Techniques de Laboratoire & Biologie Médicale", cycle: ["Licence", "Master"], description: "Analyses biochimiques, hématologie, microbiologie et diagnostic biologique." }
    ],
    admissionRequirements: [
      "Diplôme d'État Scientifique, Biologie-Chimie ou Pédagogique",
      "Attestation médicale d'aptitude physique aux professions soignantes",
      "Engagement au respect du code de déontologie médicale"
    ],
    careerProspects: [
      "Infirmier Diplômé d'État & Cadre Soignant",
      "Biologiste Médical & Responsable de Laboratoire",
      "Sage-Femme / Maïeuticien Clinicien",
      "Gestionnaire d'Établissement de Soins & ONG Médicales"
    ]
  },
  {
    id: "theologie",
    name: "Théologie & Études Pastorales",
    code: "THEO",
    icon: "BookOpen",
    color: "from-blue-700 to-slate-900",
    cycles: ["Licence", "Master", "Doctorat"],
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1200&auto=format&fit=crop&q=80",
    description: "Approfondissement scripturaire, théologie biblique et pratique, leadership ecclésiastique et impact civique transformationnel.",
    contactEmail: "theologie.fac@ifadc.cd",
    contactPhone: "+243 893 122 363",
    dean: {
      name: "Rév. Dr. Jean-Pierre ILUNGA BANZA",
      title: "Doyen de la Faculté de Théologie",
      academicRank: "Docteur en Théologie Biblique • Professeur Associé",
      photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
      message: "Notre faculté forme des serviteurs et des leaders intègres capables d'exposer fidèlement la Parole de Dieu, d'exercer un ministère pastoral puissant et de transformer la société par les valeurs de l'Évangile.",
      email: "jeanpierre.ilunga@ifadc.cd",
      phone: "+243 991 122 334"
    },
    headOfFaculty: "Rév. Dr. Jean-Pierre ILUNGA",
    options: [
      { id: "theo-1", name: "Théologie Pastorale & Ministère Pratique", cycle: ["Licence", "Master", "Doctorat"], description: "Exégèse biblique, homilétique, cure d'âme, missiologie et gouvernance ecclésiale." },
      { id: "theo-2", name: "Théologie Publique, Éthique & Société", cycle: ["Licence", "Master", "Doctorat"], description: "Éthique sociale chrétienne, apologétique, engagement civique et réconciliation." }
    ],
    admissionRequirements: [
      "Diplôme d'État (toutes sections confondues)",
      "Lettre de recommandation d'une église locale ou communauté chrétienne reconnue",
      "Entretien vocationnel avec la commission pastorale"
    ],
    careerProspects: [
      "Pasteur d'Église & Ministre du Culte",
      "Enseignant-Chercheur en Instituts Théologiques",
      "Aumônier Militaire, Hospitalier ou Universitaire",
      "Conseiller en Éthique & Médiateur Communautaire"
    ]
  },
  {
    id: "droit",
    name: "Faculté de Droit",
    code: "DROIT",
    icon: "Scale",
    color: "from-purple-700 to-slate-950",
    coverImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80",
    cycles: ["Licence"],
    description: "Juristes intègres et compétents formés aux enjeux du droit des affaires OHADA, contentieux administratif et justice sociale.",
    contactEmail: "droit.fac@ifadc.cd",
    contactPhone: "+243 893 122 364",
    dean: {
      name: "Prof. Me. Antoine KANKU MPOYI",
      title: "Doyen de la Faculté de Droit",
      academicRank: "Professeur Ordinaire • Avocat au Barreau de Kinshasa / Matete",
      photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=80",
      message: "L'état de droit en RDC a besoin de juristes rigoureux, attachés à la vérité et à la justice impartiale. La Faculté de Droit de l'IFADC vous transmet la maîtrise technique du droit et l'intégrité morale indispensable aux grands praticiens.",
      email: "antoine.kanku@ifadc.cd",
      phone: "+243 823 456 789"
    },
    headOfFaculty: "Prof. Me. Antoine KANKU",
    options: [
      { id: "droit-1", name: "Droit Économique et Social (Affaires & OHADA)", cycle: ["Licence"], description: "Droit commercial général, fiscalité des sociétés, droit bancaire et droit du travail." },
      { id: "droit-2", name: "Droit Public & Administratif", cycle: ["Licence"], description: "Droit constitutionnel, marchés publics, libertés fondamentales et contentieux d'État." },
      { id: "droit-3", name: "Droit Privé Judiciaire", cycle: ["Licence"], description: "Procédure civile, droit pénal général et spécial, voies d'exécution et pratique judiciaire." }
    ],
    admissionRequirements: [
      "Diplôme d'État (toutes sections avec au moins 50%)",
      "Bonne maîtrise de l'expression écrite et orale en langue française",
      "Dépôt du dossier administratif d'admission"
    ],
    careerProspects: [
      "Avocat au Barreau & Défenseur Judiciaire",
      "Magistrat (Parquet et Siège)",
      "Juriste d'Entreprise & Fiscaliste OHADA",
      "Conseiller Juridique en Ministères et Multinationales"
    ]
  },
  {
    id: "eco",
    name: "Sciences Économiques & Commerciales",
    code: "ECO",
    icon: "TrendingUp",
    color: "from-cyan-600 to-blue-950",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    cycles: ["Licence", "Master"],
    description: "Expertise en finance de marché, comptabilité internationale SYSCOHADA révisé, fiscalité et dynamiques macroéconomiques.",
    contactEmail: "eco.fac@ifadc.cd",
    contactPhone: "+243 893 122 365",
    dean: {
      name: "Prof. Dr. Joseph MBAYA TSHIBUABUA",
      title: "Doyen de la Faculté des Sciences Économiques",
      academicRank: "Professeur • Docteur en Économie Appliquée & Analyse Financière",
      photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
      message: "Former des économistes et des financiers capables d'analyser les flux macroéconomiques, de piloter la rentabilité des entreprises et de promouvoir une finance transparente et créatrice d'emplois durables.",
      email: "joseph.mbaya@ifadc.cd",
      phone: "+243 815 678 901"
    },
    headOfFaculty: "Prof. Dr. Joseph MBAYA",
    options: [
      { id: "eco-1", name: "Marketing et Management Commercial", cycle: ["Licence", "Master"], description: "Stratégie de marque, distribution omnicanale, études de marché et commerce international." },
      { id: "eco-2", name: "Gestion Financière et Commerciale", cycle: ["Licence", "Master"], description: "Analyse financière approfondie, ingénierie de trésorerie, investissement et marchés de capitaux." },
      { id: "eco-3", name: "Comptabilité, Audit et Contrôle de Gestion", cycle: ["Licence", "Master"], description: "Normes comptables OHADA, audit légal et contractuel, contrôle budgétaire et tableaux de bord." }
    ],
    admissionRequirements: [
      "Diplôme d'État Commercial, Scientifique ou Économique",
      "Capacités de calcul et d'analyse quantitative",
      "Inscription validée par le bureau décanal"
    ],
    careerProspects: [
      "Directeur Administratif et Financier (DAF)",
      "Auditeur Interne & Commissaire aux Comptes",
      "Analyste Financier & Trader en Banque",
      "Directeur Marketing & Responsable Commercial"
    ]
  },
  {
    id: "management",
    name: "Management & Gestion de Projets",
    code: "MGT",
    icon: "Briefcase",
    color: "from-rose-600 to-indigo-950",
    coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop&q=80",
    cycles: ["Licence"],
    description: "Conduite stratégique d'entreprises, pilotage de projets de développement durable, entrepreneuriat et management agile.",
    contactEmail: "management.fac@ifadc.cd",
    contactPhone: "+243 893 122 366",
    dean: {
      name: "Dr. Patrick NZAMBA KIKWETA",
      title: "Doyen de la Faculté de Management",
      academicRank: "Docteur en Sciences de Gestion • Expert PMP® & Stratégie d'Entreprise",
      photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=80",
      message: "Le management moderne requiert agilité, vision stratégique et leadership collaboratif. Notre programme prépare des chefs de projets et des créateurs d'entreprises aptes à transformer des idées innovantes en succès concrets.",
      email: "patrick.nzamba@ifadc.cd",
      phone: "+243 899 443 322"
    },
    headOfFaculty: "Dr. Patrick NZAMBA",
    options: [
      { id: "mgt-1", name: "Management des Organisations & RH", cycle: ["Licence"], description: "Gouvernance d'entreprise, gestion prévisionnelle des emplois et compétences, leadership d'équipe." },
      { id: "mgt-2", name: "Gestion et Évaluation de Projets", cycle: ["Licence"], description: "Méthodologies agiles, planification budgétaire, suivi-évaluation d'impact et montage de dossiers bailleurs." }
    ],
    admissionRequirements: [
      "Diplôme d'État (toutes sections)",
      "Intérêt marqué pour le leadership et la gestion d'équipe",
      "Dépôt du dossier de candidature en ligne"
    ],
    careerProspects: [
      "Chef de Projet & Project Manager Officer (PMO)",
      "Consultant en Stratégie & Organisation",
      "Responsable des Ressources Humaines (RRH)",
      "Fondateur d'Entreprise & Directeur d'Agence"
    ]
  }
];

export const initialStudents: Student[] = [
  {
    id: "stud-001",
    matricule: "26-INFO-0142",
    firstName: "Jonathan",
    lastName: "MUKUNA",
    middleName: "KABAMBA",
    gender: "M",
    email: "jonathan.mukuna@etudiant.ifadc.cd",
    phone: "0812345678",
    dateOfBirth: "2004-03-14",
    placeOfBirth: "Kinshasa",
    address: "Av. Université n° 45, Q/ Matonge, Kalamu",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    facultyId: "info",
    facultyName: "Sciences de l'Informatique",
    optionName: "Conception et Génie Informatique",
    level: "L1 (Système LMD)",
    academicYear: "2026-2027",
    enrollmentDate: "2026-08-01",
    accessCode: "IFADC2026",
    tuitionFee: {
      total: 350,
      paid: 200,
      currency: "$",
      status: "Partiel",
      installments: [
        { id: "inst-1", title: "Acompte Inscription L1 (Frais Fixes)", amount: 100, date: "2026-08-02", receiptNumber: "REC-2026-00412" },
        { id: "inst-2", title: "Première Tranche Frais Académiques", amount: 100, date: "2026-08-10", receiptNumber: "REC-2026-00891" }
      ]
    },
    grades: [
      { courseCode: "INFO101", courseName: "Algorithmique & Structures de Données", credits: 6, grade: 16.5, semester: 1, teacher: "Prof. Ir. D. Luboya", status: "Validé" },
      { courseCode: "INFO102", courseName: "Architecture des Ordinateurs & Logique", credits: 5, grade: 15.0, semester: 1, teacher: "CT K. Mpinga", status: "Validé" },
      { courseCode: "MATH101", courseName: "Analyse Mathématique & Algèbre Linéaire", credits: 6, grade: 14.0, semester: 1, teacher: "Prof. Dr. Ndombe", status: "Validé" },
      { courseCode: "ETH101", courseName: "Éthique Chrétienne & Civisme Universitaire", credits: 3, grade: 18.0, semester: 1, teacher: "Rév. Dr. J.P. Ilunga", status: "Validé" },
      { courseCode: "LANG101", courseName: "Anglais Technique & Scientifique I", credits: 4, grade: 15.5, semester: 1, teacher: "CT Sarah Malu", status: "Validé" },
      { courseCode: "INFO103", courseName: "Programmation Web & Bases de Données", credits: 6, grade: 17.0, semester: 2, teacher: "Ir. Eric Kalambayi", status: "Validé" },
      { courseCode: "INFO104", courseName: "Systèmes d'Exploitation Linux & Scripting", credits: 5, grade: 16.0, semester: 2, teacher: "CT K. Mpinga", status: "Validé" },
      { courseCode: "MATH102", courseName: "Probabilités & Statistiques Appliquées", credits: 5, grade: 13.5, semester: 2, teacher: "Prof. Dr. Ndombe", status: "Validé" }
    ]
  },
  {
    id: "stud-002",
    matricule: "26-SANTE-0089",
    firstName: "Grâce",
    lastName: "KAPINGA",
    middleName: "TSHILOMBA",
    gender: "F",
    email: "grace.kapinga@etudiant.ifadc.cd",
    phone: "0898765432",
    dateOfBirth: "2003-11-20",
    placeOfBirth: "Lubumbashi",
    address: "Av. Victoire n° 12, Kasa-Vubu",
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    facultyId: "sante",
    facultyName: "Sciences de Santé",
    optionName: "Soins Généraux (Infirmerie)",
    level: "L1 (Système LMD)",
    academicYear: "2026-2027",
    enrollmentDate: "2026-07-28",
    accessCode: "SANTE2026",
    tuitionFee: {
      total: 350,
      paid: 350,
      currency: "$",
      status: "En règle",
      installments: [
        { id: "inst-1", title: "Acompte Inscription L1", amount: 100, date: "2026-07-28", receiptNumber: "REC-2026-00102" },
        { id: "inst-2", title: "Tranche Totale Frais Académiques", amount: 250, date: "2026-08-05", receiptNumber: "REC-2026-00714" }
      ]
    },
    grades: [
      { courseCode: "SANTE101", courseName: "Anatomie & Physiologie Humaine I", credits: 6, grade: 17.5, semester: 1, teacher: "Dr. M.C. Mbombo", status: "Validé" },
      { courseCode: "SANTE102", courseName: "Microbiologie & Parasitologie Médicale", credits: 5, grade: 16.0, semester: 1, teacher: "Dr. Kanku", status: "Validé" },
      { courseCode: "SANTE103", courseName: "Principes Fondamentaux des Soins Infirmiers", credits: 6, grade: 18.0, semester: 1, teacher: "Mme Pauline Bope", status: "Validé" },
      { courseCode: "ETH101", courseName: "Éthique Médicale & Déontologie Chrétienne", credits: 4, grade: 19.0, semester: 1, teacher: "Rév. Dr. J.P. Ilunga", status: "Validé" },
      { courseCode: "SANTE104", courseName: "Pharmacologie Générale", credits: 5, grade: 15.5, semester: 2, teacher: "Dr. M.C. Mbombo", status: "Validé" },
      { courseCode: "SANTE105", courseName: "Santé Publique & Épidémiologie", credits: 5, grade: 17.0, semester: 2, teacher: "Prof. Dr. Mbaya", status: "Validé" }
    ]
  },
  {
    id: "stud-003",
    matricule: "26-THEO-0012",
    firstName: "Emmanuel",
    lastName: "BAHATI",
    middleName: "LWAMBO",
    gender: "M",
    email: "emmanuel.bahati@etudiant.ifadc.cd",
    phone: "0991122334",
    dateOfBirth: "2001-07-09",
    placeOfBirth: "Goma",
    address: "Av. Saïo n° 88, Kasa-Vubu",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    facultyId: "theologie",
    facultyName: "Théologie & Études Pastorales",
    optionName: "Théologie Pastorale & Ministère",
    level: "L2 (Système LMD)",
    academicYear: "2026-2027",
    enrollmentDate: "2025-09-15",
    accessCode: "THEO2026",
    tuitionFee: {
      total: 300,
      paid: 300,
      currency: "$",
      status: "En règle",
      installments: [
        { id: "inst-1", title: "Frais Académiques Annuels L2", amount: 300, date: "2026-08-01", receiptNumber: "REC-2026-00998" }
      ]
    },
    grades: [
      { courseCode: "THEO201", courseName: "Herméneutique & Exégèse de l'Ancien Testament", credits: 6, grade: 17.0, semester: 1, teacher: "Rév. Dr. J.P. Ilunga", status: "Validé" },
      { courseCode: "THEO202", courseName: "Grec Biblique & Linguistique Scripturaire", credits: 5, grade: 14.5, semester: 1, teacher: "Pasteur Kazadi", status: "Validé" },
      { courseCode: "THEO203", courseName: "Histoire de l'Église & Réveils Pentecôtistes", credits: 5, grade: 16.5, semester: 1, teacher: "Prof. Dr. S. Kabeya", status: "Validé" },
      { courseCode: "THEO204", courseName: "Homilétique & Prédication Expositive", credits: 6, grade: 18.5, semester: 2, teacher: "Rév. Dr. J.P. Ilunga", status: "Validé" },
      { courseCode: "THEO205", courseName: "Leadership & Gestion Pastorale", credits: 5, grade: 16.0, semester: 2, teacher: "Pasteur Kazadi", status: "Validé" }
    ]
  },
  {
    id: "stud-004",
    matricule: "26-DROIT-0055",
    firstName: "Esther",
    lastName: "MPUTU",
    middleName: "KAZADI",
    gender: "F",
    email: "esther.mputu@etudiant.ifadc.cd",
    phone: "0823456789",
    dateOfBirth: "2005-01-18",
    placeOfBirth: "Kinshasa",
    address: "Av. Ethiopie n° 63, Kasa-Vubu",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    facultyId: "droit",
    facultyName: "Faculté de Droit",
    optionName: "Droit Économique et Social",
    level: "L1 (Système LMD)",
    academicYear: "2026-2027",
    enrollmentDate: "2026-08-05",
    accessCode: "DROIT2026",
    tuitionFee: {
      total: 350,
      paid: 100,
      currency: "$",
      status: "Partiel",
      installments: [
        { id: "inst-1", title: "Acompte Inscription L1 (100$)", amount: 100, date: "2026-08-05", receiptNumber: "REC-2026-00488" }
      ]
    },
    grades: [
      { courseCode: "DROIT101", courseName: "Introduction Générale à l'Étude du Droit", credits: 6, grade: 15.5, semester: 1, teacher: "Prof. Me. A. Kanku", status: "Validé" },
      { courseCode: "DROIT102", courseName: "Droit Constitutionnel & Institutions Politiques", credits: 6, grade: 14.0, semester: 1, teacher: "CT Mukuna", status: "Validé" },
      { courseCode: "DROIT103", courseName: "Histoire du Droit & Institutions Congolaises", credits: 4, grade: 16.0, semester: 1, teacher: "Prof. Me. A. Kanku", status: "Validé" },
      { courseCode: "ETH101", courseName: "Éthique Juridique & Intégrité Judiciaire", credits: 4, grade: 18.0, semester: 1, teacher: "Rév. Dr. J.P. Ilunga", status: "Validé" }
    ]
  }
];

export const initialApplications: RegistrationApplication[] = [
  {
    id: "app-101",
    dossierNumber: "IFADC-2026-REG-8492",
    submittedAt: "2026-08-14T10:30:00Z",
    firstName: "Samuel",
    lastName: "TSHIBANGU",
    middleName: "MUTOMBO",
    gender: "M",
    email: "samuel.tshibangu@gmail.com",
    phone: "0845566778",
    dateOfBirth: "2006-04-12",
    placeOfBirth: "Kinshasa",
    address: "Av. Libération n° 144, Selembao",
    lastSchool: "Collège Boboto",
    diplomaYear: "2026",
    diplomaPercentage: 74.5,
    facultyId: "info",
    facultyName: "Sciences de l'Informatique",
    optionName: "Conception et Génie Informatique",
    level: "L1 (Système LMD)",
    academicYear: "2026-2027",
    status: "ACCEPTE",
    adminNotes: "Dossier académique excellent (74.5% aux Exétats 2026). Pièces complètes et certifiées conformes.",
    assignedMatricule: "26-INFO-0198",
    initialFeePaid: true,
    documents: [
      { id: "doc-1", name: "Diplome_Etat_2026_Tshibangu.pdf", type: "diplome", url: "#", uploadedAt: "2026-08-14", fileSize: "1.4 MB" },
      { id: "doc-2", name: "Bulletin_6eme_Humanites.pdf", type: "bulletin", url: "#", uploadedAt: "2026-08-14", fileSize: "2.1 MB" },
      { id: "doc-3", name: "Photo_Passeport_Officielle.jpg", type: "photo", url: "#", uploadedAt: "2026-08-14", fileSize: "450 KB" }
    ]
  },
  {
    id: "app-102",
    dossierNumber: "IFADC-2026-REG-7120",
    submittedAt: "2026-08-17T14:15:00Z",
    firstName: "Dorcas",
    lastName: "MALU",
    middleName: "MBELU",
    gender: "F",
    email: "dorcas.malu99@yahoo.fr",
    phone: "0891234455",
    dateOfBirth: "2005-09-24",
    placeOfBirth: "Mbuji-Mayi",
    address: "Av. Oshwe n° 30, Kasa-Vubu",
    lastSchool: "Lycée Sainte Germaine",
    diplomaYear: "2026",
    diplomaPercentage: 68.0,
    facultyId: "sante",
    facultyName: "Sciences de Santé",
    optionName: "Techniques de Laboratoire & Biologie Médicale",
    level: "L1 (Système LMD)",
    academicYear: "2026-2027",
    status: "EN_COURS",
    adminNotes: "En cours de vérification de l'attestation de réussite du Baccalauréat.",
    initialFeePaid: false,
    documents: [
      { id: "doc-4", name: "Attestation_Reussite_Exetat.pdf", type: "diplome", url: "#", uploadedAt: "2026-08-17", fileSize: "980 KB" },
      { id: "doc-5", name: "Acte_De_Naissance_Legalise.pdf", type: "identite", url: "#", uploadedAt: "2026-08-17", fileSize: "1.1 MB" }
    ]
  },
  {
    id: "app-103",
    dossierNumber: "IFADC-2026-REG-3904",
    submittedAt: "2026-08-18T09:00:00Z",
    firstName: "Caleb",
    lastName: "KASENDE",
    middleName: "LUMUMBA",
    gender: "M",
    email: "caleb.kasende@gmail.com",
    phone: "0998877665",
    dateOfBirth: "2004-12-05",
    placeOfBirth: "Kananga",
    address: "Av. Victoire n° 102, Matonge",
    lastSchool: "Institut Lumumba",
    diplomaYear: "2025",
    diplomaPercentage: 62.0,
    facultyId: "eco",
    facultyName: "Sciences Économiques & Commerciales",
    optionName: "Gestion Financière et Commerciale",
    level: "L1 (Système LMD)",
    academicYear: "2026-2027",
    status: "SOUMIS",
    adminNotes: "Nouveau dossier déposé en ligne. En attente d'évaluation de la commission d'admission.",
    initialFeePaid: false,
    documents: [
      { id: "doc-6", name: "Diplome_Etat_2025.pdf", type: "diplome", url: "#", uploadedAt: "2026-08-18", fileSize: "1.6 MB" }
    ]
  }
];

export const initialAdminDocuments: AdminDocument[] = [
  {
    id: "doc-adm-1",
    title: "Calendrier Académique Officiel 2026-2027",
    category: "CALENDRIER",
    description: "Chronogramme des cours, examens semestriels, délibérations et sessions de soutenance LMD.",
    fileName: "IFADC_CALENDRIER_ACADEMIQUE_2026_2027.pdf",
    fileSize: "2.4 MB",
    fileUrl: "#",
    uploadedAt: "2026-08-01",
    uploadedBy: "Secrétariat Général Académique",
    isPublic: true
  },
  {
    id: "doc-adm-2",
    title: "Grille Tarifaire et Modalités de Paiement L1 (100$ acompte)",
    category: "FRAIS",
    description: "Modalités de versement des frais d'inscription et d'études par faculté (Kinshasa - Kasa-Vubu).",
    fileName: "IFADC_GRILLE_FRAIS_2026_2027.pdf",
    fileSize: "1.1 MB",
    fileUrl: "#",
    uploadedAt: "2026-08-05",
    uploadedBy: "Direction des Finances",
    isPublic: true
  },
  {
    id: "doc-adm-3",
    title: "Règlement Intérieur et Charte d'Éthique Universitaire",
    category: "REGLEMENT",
    description: "Normes académiques, déontologie chrétienne, assiduité et conditions de délibération LMD.",
    fileName: "IFADC_REGLEMENT_INTERIEUR_ETUDIANTS.pdf",
    fileSize: "3.8 MB",
    fileUrl: "#",
    uploadedAt: "2026-07-20",
    uploadedBy: "Comité de Direction",
    isPublic: true
  },
  {
    id: "doc-adm-4",
    title: "Procès-Verbal et Grille Officielle de Délibération Semestre 1",
    category: "DELIBERATION",
    description: "Grille récapitulative des cotes par promotion sous scellé académique.",
    fileName: "IFADC_PV_DELIBERATION_S1_2026.pdf",
    fileSize: "4.2 MB",
    fileUrl: "#",
    uploadedAt: "2026-08-15",
    uploadedBy: "Bureau du Jury Central",
    isPublic: false
  }
];

export const initialStaffMembers: StaffMember[] = [
  {
    id: "staff-01",
    username: "prof.luboya",
    fullName: "Prof. Ir. David LUBOYA TSHISEKEDI",
    title: "Professeur Ordinaire • Chef de Département Génie Logiciel",
    email: "david.luboya@ifadc.cd",
    phone: "+243 812 345 678",
    role: "PROFESSEUR",
    facultyId: "info",
    facultyName: "Sciences de l'Informatique",
    password: "3435PROF",
    status: "ACTIF",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-08-01",
    assignedCourses: [
      { courseCode: "INFO101", courseName: "Algorithmique & Structures de Données", credits: 6, facultyId: "info", level: "L1 (Système LMD)", semester: 1 },
      { courseCode: "INFO103", courseName: "Programmation Web & Bases de Données", credits: 6, facultyId: "info", level: "L1 (Système LMD)", semester: 2 },
      { courseCode: "INFO104", courseName: "Systèmes d'Exploitation Linux & Scripting", credits: 5, facultyId: "info", level: "L1 (Système LMD)", semester: 2 }
    ]
  },
  {
    id: "staff-02",
    username: "doyen.info",
    fullName: "Prof. Dr. Emmanuel KABEYA",
    title: "Doyen de la Faculté des Sciences Informatiques",
    email: "emmanuel.kabeya@ifadc.cd",
    phone: "+243 893 122 361",
    role: "DOYEN",
    facultyId: "info",
    facultyName: "Sciences de l'Informatique",
    password: "3435PROF",
    status: "ACTIF",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-08-01"
  },
  {
    id: "staff-03",
    username: "doyenne.sante",
    fullName: "Dr. Marie-Claire MBOMBO KALONJI",
    title: "Doyenne de la Faculté des Sciences de Santé",
    email: "marieclaire.mbombo@ifadc.cd",
    phone: "+243 898 765 432",
    role: "DOYEN",
    facultyId: "sante",
    facultyName: "Sciences de Santé",
    password: "3435PROF",
    status: "ACTIF",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-08-01"
  },
  {
    id: "staff-04",
    username: "recteur.bakamba",
    fullName: "Rév. Prof. Dr. Jean-Luc BAKAMBA",
    title: "Recteur de l'Institut Facultaire (IFADC)",
    email: "recteur@ifadc.cd",
    phone: "+243 81 000 0000",
    role: "RECTEUR",
    password: "3435PROF",
    status: "ACTIF",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-08-01"
  },
  {
    id: "staff-05",
    username: "inscriptions.sgac",
    fullName: "M. Jean-Paul KASONGO",
    title: "Secrétaire Principal aux Admissions & Inscriptions",
    email: "admission@ifadc.cd",
    phone: "+243 82 555 0101",
    role: "GESTIONNAIRE_INSCRIPTIONS",
    password: "3435PROF",
    status: "ACTIF",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=80",
    createdAt: "2026-08-01"
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "gal-01",
    title: "Campus Central & Bâtiment Décanal de Kasa-Vubu",
    category: "CAMPUS",
    description: "Vue extérieure de l'Institut Facultaire des Assemblées de Dieu du Congo.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&auto=format&fit=crop&q=80",
    uploadedAt: "2026-08-01",
    uploadedBy: "Direction de la Communication"
  },
  {
    id: "gal-02",
    title: "Laboratoire Informatique & Salle de Serveurs IA",
    category: "LABORATOIRE",
    description: "Équipements haute performance dédiés au génie logiciel et à l'intelligence artificielle.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80",
    uploadedAt: "2026-08-05",
    uploadedBy: "Département Informatique"
  },
  {
    id: "gal-03",
    title: "Cérémonie Officielle de Collation des Grades Académiques",
    category: "CEREMONIE",
    description: "Remise des diplômes homologués de Licence et Master LMD aux lauréats.",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    uploadedAt: "2026-08-10",
    uploadedBy: "Secrétariat Général Académique"
  },
  {
    id: "gal-04",
    title: "Bibliothèque Universitaire & Centre de Recherche Documentaire",
    category: "BIBLIOTHEQUE",
    description: "Plus de 15 000 ouvrages physiques et accès aux revues scientifiques numériques internationales.",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=1200&auto=format&fit=crop&q=80",
    uploadedAt: "2026-08-12",
    uploadedBy: "Service Bibliothèque"
  }
];

