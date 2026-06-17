import type { KPICard, TimeSeriesPoint, Alert } from "@/types";

export const DASHBOARD_KPIS: KPICard[] = [
  { id: "revenue", title: "Revenue Today", value: "₹12.4M", change: 8.2, changeLabel: "vs yesterday", icon: "IndianRupee", trend: "up" },
  { id: "bookings", title: "Bookings", value: "42,360", change: 5.1, changeLabel: "vs yesterday", icon: "Ticket", trend: "up" },
  { id: "load-factor", title: "Load Factor", value: "81%", change: -1.3, changeLabel: "vs last week", icon: "Gauge", trend: "down" },
  { id: "occupancy", title: "Occupancy", value: "84%", change: 2.4, changeLabel: "vs last week", icon: "Users", trend: "up" },
  { id: "avg-fare", title: "Average Fare", value: "₹5,230", change: 3.7, changeLabel: "vs last month", icon: "TrendingUp", trend: "up" },
  { id: "active-routes", title: "Active Routes", value: "154", change: 0, changeLabel: "no change", icon: "Route", trend: "neutral" },
];

// Generate 30-day revenue trend
function generateRevenueTrend(): TimeSeriesPoint[] {
  const data: TimeSeriesPoint[] = [];
  const now = new Date();
  const baseRevenue = 11000000;

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const weekendBoost = dayOfWeek === 0 || dayOfWeek === 6 ? 1500000 : 0;
    const randomVariation = (Math.random() - 0.4) * 2000000;
    const trendGrowth = (30 - i) * 40000;

    data.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(baseRevenue + weekendBoost + randomVariation + trendGrowth),
    });
  }
  return data;
}

export const REVENUE_TREND = generateRevenueTrend();

export const TOP_ROUTES = [
  { route: "DEL → BOM", revenue: 42800000, bookings: 8450, change: 12.3 },
  { route: "DEL → BLR", revenue: 38200000, bookings: 7120, change: 8.7 },
  { route: "BOM → HYD", revenue: 28500000, bookings: 5890, change: -2.1 },
  { route: "DEL → HYD", revenue: 25100000, bookings: 4980, change: 5.4 },
  { route: "BOM → BLR", revenue: 23400000, bookings: 4560, change: 3.9 },
  { route: "DEL → MAA", revenue: 21800000, bookings: 4230, change: 7.2 },
  { route: "DEL → CCU", revenue: 19600000, bookings: 3890, change: -1.5 },
  { route: "BOM → GOI", revenue: 17200000, bookings: 3450, change: 15.8 },
];

export const RECENT_ALERTS: Alert[] = [
  {
    id: "a1",
    title: "Revenue anomaly detected",
    description: "DEL-BOM route showing 23% revenue deviation from forecast. Investigating potential data quality issues.",
    severity: "critical",
    timestamp: new Date(Date.now() - 1200000).toISOString(),
    route: "DEL-BOM",
    isRead: false,
  },
  {
    id: "a2",
    title: "Competitor price drop",
    description: "Air India reduced DEL-BLR fares by 15% for next week departures. Consider pricing adjustment.",
    severity: "warning",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    route: "DEL-BLR",
    isRead: false,
  },
  {
    id: "a3",
    title: "Forecast model updated",
    description: "Prophet model retrained with latest 90 days of data. Accuracy improved to 94.2% from 92.8%.",
    severity: "info",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    isRead: true,
  },
  {
    id: "a4",
    title: "Demand spike detected",
    description: "BOM-GOI route showing 40% higher than expected bookings. Festival season driving demand.",
    severity: "warning",
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    route: "BOM-GOI",
    isRead: false,
  },
  {
    id: "a5",
    title: "Load factor critical",
    description: "CCU-DEL morning flights averaging 58% load factor. Below minimum threshold of 65%.",
    severity: "critical",
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    route: "CCU-DEL",
    isRead: true,
  },
];

// Revenue by hour (for heatmap)
export const HOURLY_REVENUE = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  revenue: Math.round(400000 + Math.random() * 800000 + (i >= 6 && i <= 22 ? 500000 : 0)),
  bookings: Math.round(200 + Math.random() * 600 + (i >= 6 && i <= 22 ? 400 : 0)),
}));
