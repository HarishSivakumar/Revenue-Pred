import type { RouteData, CompetitorPrice, TimeSeriesPoint } from "@/types";

export const ROUTE_DATA: Record<string, RouteData> = {
  "DEL-BOM": {
    id: "DEL-BOM", origin: "DEL", destination: "BOM", originCity: "New Delhi", destinationCity: "Mumbai",
    revenue: 42800000, bookings: 8450, occupancy: 86, avgFare: 5065, competitorGap: 320,
  },
  "DEL-BLR": {
    id: "DEL-BLR", origin: "DEL", destination: "BLR", originCity: "New Delhi", destinationCity: "Bengaluru",
    revenue: 38200000, bookings: 7120, occupancy: 82, avgFare: 5365, competitorGap: -180,
  },
  "BOM-HYD": {
    id: "BOM-HYD", origin: "BOM", destination: "HYD", originCity: "Mumbai", destinationCity: "Hyderabad",
    revenue: 28500000, bookings: 5890, occupancy: 78, avgFare: 4838, competitorGap: 250,
  },
  "DEL-HYD": {
    id: "DEL-HYD", origin: "DEL", destination: "HYD", originCity: "New Delhi", destinationCity: "Hyderabad",
    revenue: 25100000, bookings: 4980, occupancy: 75, avgFare: 5040, competitorGap: 150,
  },
  "BOM-BLR": {
    id: "BOM-BLR", origin: "BOM", destination: "BLR", originCity: "Mumbai", destinationCity: "Bengaluru",
    revenue: 23400000, bookings: 4560, occupancy: 80, avgFare: 5132, competitorGap: -90,
  },
};

export const COMPETITOR_PRICES: Record<string, CompetitorPrice[]> = {
  "DEL-BOM": [
    { airline: "IndiGo", fare: 5065, change: 3.2, lastUpdated: new Date().toISOString(), color: "#3B82F6" },
    { airline: "Air India", fare: 5385, change: -1.5, lastUpdated: new Date().toISOString(), color: "#EF4444" },
    { airline: "Akasa Air", fare: 4745, change: 5.8, lastUpdated: new Date().toISOString(), color: "#F97316" },
    { airline: "SpiceJet", fare: 4580, change: -2.3, lastUpdated: new Date().toISOString(), color: "#EAB308" },
    { airline: "Vistara", fare: 6120, change: 1.1, lastUpdated: new Date().toISOString(), color: "#8B5CF6" },
  ],
  "DEL-BLR": [
    { airline: "IndiGo", fare: 5365, change: 2.1, lastUpdated: new Date().toISOString(), color: "#3B82F6" },
    { airline: "Air India", fare: 5545, change: -3.2, lastUpdated: new Date().toISOString(), color: "#EF4444" },
    { airline: "Akasa Air", fare: 5180, change: 4.5, lastUpdated: new Date().toISOString(), color: "#F97316" },
    { airline: "Vistara", fare: 6450, change: 0.8, lastUpdated: new Date().toISOString(), color: "#8B5CF6" },
  ],
};

function generateTrend(baseLine: number, days: number, volatility: number): TimeSeriesPoint[] {
  const data: TimeSeriesPoint[] = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dow = d.getDay();
    const weekendEffect = dow === 0 || dow === 6 ? volatility * 0.3 : 0;
    const noise = (Math.random() - 0.45) * volatility;
    const growth = ((days - i) / days) * volatility * 0.2;
    data.push({ date: d.toISOString().split("T")[0], value: Math.round(baseLine + weekendEffect + noise + growth) });
  }
  return data;
}

export const BOOKING_TRENDS: Record<string, TimeSeriesPoint[]> = {
  "DEL-BOM": generateTrend(280, 30, 80),
  "DEL-BLR": generateTrend(240, 30, 60),
  "BOM-HYD": generateTrend(200, 30, 50),
  "DEL-HYD": generateTrend(170, 30, 45),
  "BOM-BLR": generateTrend(155, 30, 40),
};

export const OCCUPANCY_TRENDS: Record<string, TimeSeriesPoint[]> = {
  "DEL-BOM": generateTrend(86, 30, 12),
  "DEL-BLR": generateTrend(82, 30, 10),
  "BOM-HYD": generateTrend(78, 30, 14),
  "DEL-HYD": generateTrend(75, 30, 11),
  "BOM-BLR": generateTrend(80, 30, 9),
};

export const FARE_TRENDS: Record<string, TimeSeriesPoint[]> = {
  "DEL-BOM": generateTrend(5065, 30, 600),
  "DEL-BLR": generateTrend(5365, 30, 500),
  "BOM-HYD": generateTrend(4838, 30, 450),
  "DEL-HYD": generateTrend(5040, 30, 520),
  "BOM-BLR": generateTrend(5132, 30, 480),
};

// Generate competitor fare comparison over time
export function generateCompetitorComparison(routeId: string): { date: string; IndiGo: number; "Air India": number; "Akasa Air": number }[] {
  const competitors = COMPETITOR_PRICES[routeId] || COMPETITOR_PRICES["DEL-BOM"];
  const indigoBase = competitors.find(c => c.airline === "IndiGo")?.fare || 5000;
  const aiBase = competitors.find(c => c.airline === "Air India")?.fare || 5300;
  const akasaBase = competitors.find(c => c.airline === "Akasa Air")?.fare || 4700;
  const data: { date: string; IndiGo: number; "Air India": number; "Akasa Air": number }[] = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    data.push({
      date: d.toISOString().split("T")[0],
      IndiGo: Math.round(indigoBase + (Math.random() - 0.5) * 400),
      "Air India": Math.round(aiBase + (Math.random() - 0.5) * 500),
      "Akasa Air": Math.round(akasaBase + (Math.random() - 0.5) * 350),
    });
  }
  return data;
}

export const WEEKLY_PERFORMANCE = [
  { week: "Week 1", revenue: 10200000, bookings: 2100, occupancy: 83, avgFare: 4857, loadFactor: 81 },
  { week: "Week 2", revenue: 10800000, bookings: 2200, occupancy: 85, avgFare: 4909, loadFactor: 83 },
  { week: "Week 3", revenue: 11400000, bookings: 2150, occupancy: 87, avgFare: 5302, loadFactor: 85 },
  { week: "Week 4", revenue: 10400000, bookings: 2000, occupancy: 84, avgFare: 5200, loadFactor: 82 },
];
