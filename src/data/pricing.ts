export const PRICING_DATA = {
  currentFare: 5230,
  recommendedFare: 5600,
  confidenceScore: 93,
  expectedImpact: {
    revenueChange: 7.1,
    revenueAmount: 880000,
    bookingsChange: -2.3,
    loadFactorChange: -1.1,
  },
  reasons: [
    { id: "r1", reason: "Weekend demand surge detected", impact: "high", icon: "TrendingUp" },
    { id: "r2", reason: "Upcoming festival effect (Dussehra)", impact: "high", icon: "Calendar" },
    { id: "r3", reason: "Competitor fare increase by Air India (+8%)", impact: "medium", icon: "ArrowUp" },
    { id: "r4", reason: "Historical load factor supports premium", impact: "medium", icon: "BarChart" },
    { id: "r5", reason: "Limited seat availability on peak slots", impact: "low", icon: "AlertTriangle" },
  ],
};

// Price simulation data - revenue at different price points
export const PRICE_SIMULATION = [
  { fare: 4200, revenue: 8900000, bookings: 2119, loadFactor: 92 },
  { fare: 4400, revenue: 9400000, bookings: 2136, loadFactor: 90 },
  { fare: 4600, revenue: 9800000, bookings: 2130, loadFactor: 88 },
  { fare: 4800, revenue: 10400000, bookings: 2167, loadFactor: 86 },
  { fare: 5000, revenue: 11200000, bookings: 2240, loadFactor: 84 },
  { fare: 5200, revenue: 11800000, bookings: 2269, loadFactor: 82 },
  { fare: 5400, revenue: 12100000, bookings: 2241, loadFactor: 80 },
  { fare: 5600, revenue: 12400000, bookings: 2214, loadFactor: 78 },
  { fare: 5800, revenue: 12200000, bookings: 2103, loadFactor: 75 },
  { fare: 6000, revenue: 11800000, bookings: 1967, loadFactor: 72 },
  { fare: 6200, revenue: 11200000, bookings: 1806, loadFactor: 68 },
  { fare: 6400, revenue: 10400000, bookings: 1625, loadFactor: 64 },
];

export const PRICING_HISTORY = [
  { date: "2025-06-15", route: "DEL-BOM", previousFare: 5100, newFare: 5230, action: "Applied AI recommendation", impact: "+5.2% revenue" },
  { date: "2025-06-12", route: "DEL-BOM", previousFare: 5350, newFare: 5100, action: "Manual override - competitive response", impact: "-3.1% revenue" },
  { date: "2025-06-08", route: "DEL-BOM", previousFare: 4900, newFare: 5350, action: "Applied AI recommendation", impact: "+8.7% revenue" },
  { date: "2025-06-05", route: "DEL-BOM", previousFare: 4750, newFare: 4900, action: "Applied AI recommendation", impact: "+3.2% revenue" },
  { date: "2025-06-01", route: "DEL-BOM", previousFare: 5200, newFare: 4750, action: "Manual override - promotional pricing", impact: "-8.6% revenue" },
];
