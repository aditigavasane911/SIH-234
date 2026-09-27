export type UserRole = 'kitchen' | 'receiving' | 'logistics';

export type ScreenId =
  | 'splash'
  | 'signin'
  | 'create_account'
  | 'kitchen_dashboard'
  | 'list_surplus'
  | 'matched_orgs'
  | 'receiving_dashboard'
  | 'logistics_dashboard'
  | 'sustainability_dashboard'
  | 'leaderboard'
  | 'subscription'
  | 'alerts'
  | 'settings';

export interface FoodBatch {
  id: string;
  batchNumber: string;
  title: string;
  category: 'Cooked Meals' | 'Fresh Produce' | 'Bakery & Dairy' | 'Biomass / Trimmings';
  volumeKg: number;
  aiFreshnessScore: number;
  shelfLifeRemainingHours: number;
  storageTempC: number;
  targetTempC: number;
  preparationTime: string;
  status: 'active' | 'matched' | 'in_transit' | 'delivered';
  imageUrl: string;
  triageDestination: string;
  matchedOrg?: {
    id: string;
    name: string;
    type: 'Community Kitchen' | 'Shelter Home' | 'Biogas Unit' | 'Animal Sanctuary';
    distanceKm: number;
    matchScore: number;
    assignedDriver?: string;
    vehiclePlate?: string;
  };
  co2eAvertedKg: number;
  otp?: string;
}

export interface RedistributionTicket {
  ticketId: string;
  batchId: string;
  batchTitle: string;
  volumeKg: number;
  fromKitchen: string;
  toOrg: string;
  driverName: string;
  vehicleNumber: string;
  pickupBay: string;
  otp: string;
  status: 'pending_acceptance' | 'accepted' | 'in_transit' | 'delivered' | 'declined';
  etaMinutes: number;
  freshnessScore: number;
  qrCodeUrl?: string;
  timestamp: string;
}

export interface AppAlert {
  id: string;
  category: 'critical' | 'freshness' | 'pickup';
  title: string;
  description: string;
  timestamp: string;
  source: string;
  unread: boolean;
  statusBadge?: string;
  actionType?: 'view_log' | 'expedite' | 'track' | 'certificate' | 'resolved' | 'receipt';
  actionTargetScreen?: ScreenId;
  relatedBatchId?: string;
  ticketId?: string;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  type: string;
  location: string;
  kgDiverted: number;
  percentDiverted: number;
  co2eTons: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  billingPeriod: string;
  tagline: string;
  popular?: boolean;
  features: string[];
}
