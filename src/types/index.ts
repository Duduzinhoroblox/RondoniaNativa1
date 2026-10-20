export type UserProfile = 'TURISTA' | 'GUIA' | 'LIDERANCA' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserProfile;
  avatarUrl: string;
  phone: string;
  cpf?: string;
  cadasturNum?: string; // For Guia
  cadasturStatus?: 'ATIVO' | 'EM_ANALISE' | 'PENDENTE';
  specialties?: string[];
  communityName?: string; // For Liderança
  communityCnpj?: string;
  pixKey?: string;
  bio?: string;
  createdAt: string;
}

export interface CommunityAssociation {
  id: string;
  name: string;
  location: string;
  cnpj: string;
  pixKey: string;
  bankAccount: string;
  leaderName: string;
  peopleCount: number;
  totalFundsReceived: number;
  communityProjects: string[];
  logoUrl: string;
  contactEmail: string;
}

export interface Guide {
  id: string;
  name: string;
  cadastur: string;
  specialty: string;
  rating: number;
  totalExpeditions: number;
  avatarUrl: string;
  phone: string;
  verifiedCadastur?: boolean;
}

export interface ExperienceItineraryItem {
  time: string;
  title: string;
  description: string;
  location: string;
}

export interface Review {
  id: string;
  experienceId: string;
  touristName: string;
  touristAvatar: string;
  rating: number; // 1 to 5
  communityHospitalityRating: number; // 1 to 5
  guidePerformanceRating: number; // 1 to 5
  environmentalRespectRating: number; // 1 to 5
  comment: string;
  date: string;
}

export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  category: 'CULTURAL' | 'TRILHA' | 'FLUVIAL' | 'FAUNA' | 'HISTORICO';
  region: string;
  locationName: string;
  latitude: number;
  longitude: number;
  priceTotal: number;
  durationHours: number;
  difficulty: 'Leve' | 'Moderado' | 'Desafiador';
  maxCapacityPerDay: number;
  currentBookedCount: number;
  description: string;
  highlights: string[];
  itinerary: ExperienceItineraryItem[];
  included: string[];
  notIncluded: string[];
  mandatoryItems: string[];
  images: string[];
  
  // Conformidade e Governança
  requiresFUNAI: boolean;
  funaiAuthNumber?: string;
  requiresICMBio: boolean;
  icmbioAuthNumber?: string;
  cadasturGuideId: string;
  guide: Guide;
  associationId: string;
  association: CommunityAssociation;
  curatorshipStatus: 'APROVADO' | 'PENDENTE' | 'EM_ANALISE';
  curatorshipNotes?: string;

  // Split de pagamento pactuado
  splitPercentages: {
    communityAssociation: number; // ex: 60%
    guide: number;               // ex: 28%
    platform: number;            // ex: 12%
  };

  reviews?: Review[];
}

export interface Booking {
  id: string;
  experienceId: string;
  experienceTitle: string;
  touristName: string;
  touristEmail: string;
  touristPhone: string;
  date: string;
  spotsCount: number;
  totalPrice: number;
  voucherHash: string;
  status: 'CONFIRMADA' | 'UTILIZADA' | 'CANCELADA';
  createdAt: string;
  
  // Split payment breakdown
  splitBreakdown: {
    associationAmount: number;
    guideAmount: number;
    platformAmount: number;
    associationPixKey: string;
    guideCadastur: string;
  };
  
  // Validação Offline
  validatedOffline: boolean;
  validatedAtTimestamp?: string;
  validatedGpsCoordinates?: {
    lat: number;
    lng: number;
  };
  validatedByGuideCadastur?: string;
  ethicsCodeAccepted: boolean;
  downloadedForOffline: boolean;
}

export interface OfflineValidationLog {
  id: string;
  voucherHash: string;
  touristName: string;
  experienceTitle: string;
  validatedAt: string;
  latitude: number;
  longitude: number;
  syncedToCloud: boolean;
  guideCadastur: string;
}

export interface CuratorshipProposal {
  id: string;
  experienceTitle: string;
  submittedBy: string;
  community: string;
  areaType: 'TI' | 'UC' | 'MUNICIPAL' | 'PRIVADA';
  funaiDocAttached: boolean;
  icmbioDocAttached: boolean;
  cadasturVerified: boolean;
  capacityPerDay: number;
  status: 'PENDENTE' | 'APROVADO' | 'REJEITADO';
  submissionDate: string;
  notes: string;
}

export interface RondoniaDestination {
  id: string;
  name: string;
  municipality: string;
  ecosystem: string;
  baciaHidrografica: string;
  description: string;
  historyAndCulture: string;
  distanceFromPortoVelhoKm: number;
  howToGetThere: {
    rodoviario: string;
    fluvial?: string;
    aereo?: string;
  };
  bestSeason: string;
  seasonType: 'SECA_PRAIAS' | 'CHEIA_IGAPO' | 'ANO_TODO';
  latitude: number;
  longitude: number;
  photos: string[];
  highlights: string[];
  conservationUnitOrIndigenousLand: string;
  relatedExperienceIds: string[];
}
