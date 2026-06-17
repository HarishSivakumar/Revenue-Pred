// ===== Core Types for Revenue Intelligence Platform =====

export interface KPICard {
  id: string;
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: string;
  trend: "up" | "down" | "neutral";
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
  predicted?: number;
  upperBound?: number;
  lowerBound?: number;
}

export interface RouteData {
  id: string;
  origin: string;
  destination: string;
  originCity: string;
  destinationCity: string;
  revenue: number;
  bookings: number;
  occupancy: number;
  avgFare: number;
  competitorGap: number;
}

export interface CompetitorPrice {
  airline: string;
  fare: number;
  change: number;
  lastUpdated: string;
  color: string;
}

export interface BookingRecord {
  id: string;
  bookingId: string;
  route: string;
  origin: string;
  destination: string;
  revenue: number;
  fare: number;
  loadFactor: number;
  date: string;
  aircraft: string;
  class: string;
  passengers: number;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  timestamp: string;
  route?: string;
  isRead: boolean;
}

export interface Pipeline {
  id: string;
  name: string;
  status: "success" | "running" | "failed" | "scheduled";
  lastRun: string;
  duration: string;
  nextRun: string;
  tasks: PipelineTask[];
}

export interface PipelineTask {
  id: string;
  name: string;
  status: "success" | "running" | "failed" | "pending";
  duration: string;
  dependencies: string[];
}

export interface CustomerSegment {
  id: string;
  name: string;
  count: number;
  percentage: number;
  avgRevenue: number;
  avgBookings: number;
  retention: number;
  color: string;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  segment: string;
  totalRevenue: number;
  bookings: number;
  ltv: number;
  lastBooking: string;
  loyaltyTier: string;
}

export interface ForecastMetrics {
  accuracy: number;
  mae: number;
  rmse: number;
  mape: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sql?: string;
  chartData?: TimeSeriesPoint[];
  chartType?: "line" | "bar" | "area";
  chartTitle?: string;
  sources?: string[];
  actions?: string[];
}

export interface ChatConversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  messages: ChatMessage[];
}

export interface Airport {
  code: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  tier: 1 | 2 | 3;
  revenue: number;
}

export type NavItem = {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: string;
};

export type DomainWorkspace = {
  id: string;
  name: string;
  icon: string;
  active: boolean;
  comingSoon: boolean;
};
