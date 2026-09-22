export type AcademicCycle = 'Licence' | 'Master' | 'Doctorat';

export interface FacultyOption {
  id: string;
  name: string;
  cycle: AcademicCycle[];
  description?: string;
  careerOutcomes?: string[];
}

export interface DeanProfile {
  name: string;
  title: string; // ex: 'Doyen de la Faculté'
  academicRank: string; // ex: 'Professeur Ordinaire, Dr. en Informatique'
  photoUrl: string;
  message: string; // 'Mot du Doyen'
  email?: string;
  phone?: string;
}

export interface Faculty {
  id: string;
  name: string;
  code: string;
  icon: string;
  color: string;
  cycles: AcademicCycle[];
  options: FacultyOption[];
  description: string;
  coverImage: string;
  dean: DeanProfile;
  headOfFaculty?: string; // fallback
  contactEmail?: string;
  contactPhone?: string;
  admissionRequirements?: string[];
  careerProspects?: string[];
}

export interface Announcement {
  id: string;
  title: string;
  category: 'COMMUNIQUE' | 'ACADEMIQUE' | 'EVENEMENT' | 'INSCRIPTION' | 'OFFICIEL' | 'GENERAL';
  content: string;
  summary: string;
  publishedAt: string;
  imageUrl: string;
  attachmentUrl?: string;
  attachmentName?: string;
  attachmentSize?: string;
  facultyId?: string; // 'ALL' or specific faculty id
  isPinned?: boolean;
}

export type GradeStatus = 'Brouillon' | 'Soumis' | 'Validé' | 'Ajourné' | 'En attente';
export type ExamSession = 'Principale' | 'Rattrapage';

export interface SubjectGrade {
  courseCode: string;
  courseName: string;
  credits: number;
  grade: number; // /20
  semester: 1 | 2;
  teacher?: string;
  teacherId?: string;
  session?: ExamSession;
  status: GradeStatus;
  gradedAt?: string;
  validatedBy?: string;
  validatedAt?: string;
}

export interface Student {
  id: string;
  matricule: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: 'M' | 'F';
  email: string;
  phone: string;
  dateOfBirth: string;
  placeOfBirth: string;
  address: string;
  photoUrl: string;
  facultyId: string;
  facultyName: string;
  optionName: string;
  level: string; // ex: 'L1', 'L2', 'L3', 'M1', 'M2', 'D1'
  academicYear: string; // ex: '2026-2027'
  enrollmentDate: string;
  grades: SubjectGrade[];
  tuitionFee: {
    total: number;
    paid: number;
    currency: string;
    status: 'En règle' | 'Partiel' | 'Non payé';
    installments: {
      id: string;
      title: string;
      amount: number;
      date: string;
      receiptNumber: string;
    }[];
  };
  accessCode: string; // Code personnel de l'étudiant
}

export type ApplicationStatus = 'SOUMIS' | 'EN_COURS' | 'ACCEPTE' | 'REFUSE' | 'INSCRIPTION_VALIDEE';

export interface ApplicationDocument {
  id: string;
  name: string;
  type: 'diplome' | 'bulletin' | 'photo' | 'identite' | 'autre';
  url: string;
  uploadedAt: string;
  fileSize?: string;
}

export interface RegistrationApplication {
  id: string;
  dossierNumber: string; // ex: IFADC-2026-8941
  submittedAt: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  gender: 'M' | 'F';
  email: string;
  phone: string;
  dateOfBirth: string;
  placeOfBirth: string;
  address: string;
  lastSchool: string;
  diplomaYear: string;
  diplomaPercentage: number;
  facultyId: string;
  facultyName: string;
  optionName: string;
  level: string;
  academicYear: string;
  status: ApplicationStatus;
  adminNotes?: string;
  assignedMatricule?: string;
  documents: ApplicationDocument[];
  initialFeePaid: boolean;
}

export interface AdminDocument {
  id: string;
  title: string;
  category: 'REGLEMENT' | 'CALENDRIER' | 'FRAIS' | 'COMMUNIQUE' | 'FORMULAIRE' | 'DELIBERATION';
  description: string;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  uploadedAt: string;
  uploadedBy: string;
  isPublic: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'CAMPUS' | 'LABORATOIRE' | 'EVENEMENT' | 'CEREMONIE' | 'BIBLIOTHEQUE' | 'AUTRE';
  description?: string;
  imageUrl: string;
  uploadedAt: string;
  uploadedBy?: string;
}

export type StaffRole = 'PROFESSEUR' | 'DOYEN' | 'RECTEUR' | 'GESTIONNAIRE_INSCRIPTIONS';

export interface StaffCourseAssignment {
  courseCode: string;
  courseName: string;
  credits: number;
  facultyId: string;
  level: string;
  semester: 1 | 2;
}

export interface StaffMember {
  id: string;
  username: string;
  fullName: string;
  title?: string; // ex: 'Professeur Ordinaire', 'Chef de Travaux', 'Docteur'
  email: string;
  phone?: string;
  role: StaffRole;
  facultyId?: string; // for Professeur & Doyen
  facultyName?: string;
  assignedCourses?: StaffCourseAssignment[];
  password: string; // Default '3435PROF'
  status: 'ACTIF' | 'SUSPENDU';
  avatarUrl?: string;
  createdAt: string;
}

export interface InstituteConfig {
  name: string;
  shortName: string;
  tutelle: string;
  motto: string;
  address: string;
  reference: string;
  commune: string;
  city: string;
  country: string;
  phone: string;
  phoneAlt?: string;
  phoneNumbers?: string[];
  email: string;
  academicYear: string;
  l1TuitionAmount: number;
  currency: string;
  logoUrl: string;
  bannerTitle: string;
  bannerSubtitle: string;
  rectorName: string;
  academicSecretaryName: string;
  websiteUrl: string;
  developerCreditText?: string;
  footerDescription?: string;

  // Custom Editable Text Labels
  heroTitle?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
  homologationNoticeText?: string;

  // Typography & Styling (aspect normal et humain)
  fontFamily?: 'sans' | 'serif' | 'humanist' | 'classic';
  baseFontSize?: 'small' | 'normal' | 'large';
  headingStyle?: 'bold' | 'extra-bold' | 'serif-classic' | 'modern-light';
  heroTheme?: 'navy-dark' | 'clean-light' | 'warm-paper' | 'slate-minimal';

  // Custom Text & Brand Colors
  heroTitleColor?: string;
  heroSubtitleColor?: string;
  heroMottoColor?: string;
  primaryBrandColor?: string;
  primaryAccentColor?: string;

  // Font Size & Weight adjustments for titles
  heroTitleSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  heroTitleWeight?: 'normal' | 'semibold' | 'bold' | 'extrabold';

  // Toggle & Delete/Hide Visual Elements
  showTopContactBar?: boolean;
  showESUHomologationBanner?: boolean;
  showHeroBadges?: boolean;
  showHeroStats?: boolean;
  showHeroRightCard?: boolean;
  showHeroBgOverlay?: boolean;
  showHeroShareButton?: boolean;
  showHeroCtaButtons?: boolean;
  showDriveMenuTab?: boolean;
  showStudentPortalTab?: boolean;
  showStaffPortalTab?: boolean;
  showNewsMarquee?: boolean;
  showFooterDeans?: boolean;
  showFooterDevCredit?: boolean;
  showCampusMapInContact?: boolean;
}

export interface DriveFileItem {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  webViewLink?: string;
  webContentLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
  parents?: string[];
  isFolder: boolean;
}

export type ActiveTab = 
  | 'home' 
  | 'faculties' 
  | 'faculty-detail' 
  | 'announcements' 
  | 'admission' 
  | 'tracking' 
  | 'student-portal' 
  | 'staff-portal'
  | 'admin-portal' 
  | 'contact'
  | 'drive';

