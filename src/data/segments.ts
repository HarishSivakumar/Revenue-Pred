import type { CustomerSegment, Customer } from "@/types";

export const SEGMENTS: CustomerSegment[] = [
  {
    id: "premium", name: "Premium Flyers", count: 12450, percentage: 18,
    avgRevenue: 42500, avgBookings: 8.2, retention: 92,
    color: "#3B82F6", description: "High-value business travelers with frequent premium bookings",
  },
  {
    id: "frequent", name: "Frequent Flyers", count: 28900, percentage: 42,
    avgRevenue: 18200, avgBookings: 5.4, retention: 78,
    color: "#8B5CF6", description: "Regular travelers with moderate booking frequency",
  },
  {
    id: "budget", name: "Budget Travelers", count: 27650, percentage: 40,
    avgRevenue: 6800, avgBookings: 2.1, retention: 45,
    color: "#F97316", description: "Price-sensitive travelers booking primarily during sales",
  },
];

export const TOP_CUSTOMERS: Customer[] = [
  { id: "c1", name: "Rajesh Mehta", segment: "Premium", totalRevenue: 842000, bookings: 34, ltv: 1250000, lastBooking: "2025-06-15", loyaltyTier: "Platinum" },
  { id: "c2", name: "Priya Sharma", segment: "Premium", totalRevenue: 756000, bookings: 28, ltv: 1120000, lastBooking: "2025-06-14", loyaltyTier: "Platinum" },
  { id: "c3", name: "Amit Patel", segment: "Premium", totalRevenue: 698000, bookings: 32, ltv: 980000, lastBooking: "2025-06-16", loyaltyTier: "Gold" },
  { id: "c4", name: "Sunita Reddy", segment: "Frequent", totalRevenue: 524000, bookings: 22, ltv: 780000, lastBooking: "2025-06-13", loyaltyTier: "Gold" },
  { id: "c5", name: "Vikram Singh", segment: "Premium", totalRevenue: 489000, bookings: 18, ltv: 720000, lastBooking: "2025-06-12", loyaltyTier: "Gold" },
  { id: "c6", name: "Ananya Gupta", segment: "Frequent", totalRevenue: 412000, bookings: 20, ltv: 650000, lastBooking: "2025-06-11", loyaltyTier: "Silver" },
  { id: "c7", name: "Deepak Kumar", segment: "Frequent", totalRevenue: 385000, bookings: 16, ltv: 580000, lastBooking: "2025-06-10", loyaltyTier: "Silver" },
  { id: "c8", name: "Neha Joshi", segment: "Frequent", totalRevenue: 342000, bookings: 14, ltv: 510000, lastBooking: "2025-06-09", loyaltyTier: "Silver" },
  { id: "c9", name: "Karthik Nair", segment: "Budget", totalRevenue: 156000, bookings: 8, ltv: 240000, lastBooking: "2025-06-08", loyaltyTier: "Bronze" },
  { id: "c10", name: "Ritu Agarwal", segment: "Budget", totalRevenue: 128000, bookings: 6, ltv: 195000, lastBooking: "2025-06-07", loyaltyTier: "Bronze" },
];

export const CLV_TREND = [
  { month: "Jan", premium: 42500, frequent: 18200, budget: 6800 },
  { month: "Feb", premium: 43100, frequent: 18500, budget: 6650 },
  { month: "Mar", premium: 44200, frequent: 19100, budget: 7200 },
  { month: "Apr", premium: 43800, frequent: 18800, budget: 7100 },
  { month: "May", premium: 45100, frequent: 19500, budget: 7350 },
  { month: "Jun", premium: 46200, frequent: 20100, budget: 7500 },
];

export const RETENTION_DATA = [
  { cohort: "Jan 2025", month1: 100, month2: 82, month3: 71, month4: 65, month5: 58, month6: 54 },
  { cohort: "Feb 2025", month1: 100, month2: 85, month3: 74, month4: 67, month5: 61 },
  { cohort: "Mar 2025", month1: 100, month2: 80, month3: 69, month4: 63 },
  { cohort: "Apr 2025", month1: 100, month2: 83, month3: 72 },
  { cohort: "May 2025", month1: 100, month2: 86 },
  { cohort: "Jun 2025", month1: 100 },
];
