import type { Alert } from "@/types";

// Helper — generate a timestamp N days + H hours ago
function daysAgo(days: number, hoursOffset = 0): string {
  return new Date(Date.now() - days * 86400000 - hoursOffset * 3600000).toISOString();
}

export const ALL_ALERTS: Alert[] = [
  { id: "a1", title: "Revenue dropped 20% on DEL-BOM", description: "Daily revenue on DEL-BOM fell to ₹3.42M vs ₹4.28M 7-day average. Competitor fare reduction identified as primary driver. Immediate pricing review recommended.", severity: "critical", timestamp: daysAgo(0, 0.17), route: "DEL-BOM", isRead: false },
  { id: "a2", title: "Competitor lowered fares on DEL-BLR", description: "Air India reduced DEL-BLR economy fares by 15% (₹5,545 → ₹4,713). SpiceJet followed with 8% reduction. Market share at risk.", severity: "warning", timestamp: daysAgo(0, 0.5), route: "DEL-BLR", isRead: false },
  { id: "a3", title: "Demand anomaly detected on BOM-GOI", description: "Isolation Forest model detected 40% higher than expected bookings on BOM-GOI route. Likely driven by festival season. Dynamic pricing engine activated.", severity: "warning", timestamp: daysAgo(1, 2), route: "BOM-GOI", isRead: false },
  { id: "a4", title: "Forecast model retrained successfully", description: "Prophet + XGBoost ensemble model retrained with 90 days of data. Accuracy improved: MAPE 3.8% → 3.2%. Model deployed to production.", severity: "info", timestamp: daysAgo(2, 0), isRead: true },
  { id: "a5", title: "Load factor below threshold on CCU-DEL", description: "Morning flights (6E-2341, 6E-2343) averaging 58% load factor vs 65% threshold. Revenue at risk: ₹2.8L per day. Consider promotional pricing.", severity: "critical", timestamp: daysAgo(3, 3), route: "CCU-DEL", isRead: true },
  { id: "a6", title: "Customer segmentation updated", description: "KMeans clustering completed. Premium segment grew 2.3% MoM. Budget segment retention improved to 48% from 45%.", severity: "info", timestamp: daysAgo(5, 1), isRead: true },
  { id: "a7", title: "Data pipeline failure - Customer Segmentation", description: "KMeans clustering task failed with OOM error. Memory limit exceeded at feature matrix generation step. Auto-retry scheduled.", severity: "critical", timestamp: daysAgo(7, 0), isRead: false },
  { id: "a8", title: "Booking surge on DEL-GOI weekend flights", description: "Saturday DEL-GOI bookings up 35% vs previous Saturday. Goa tourism season driving demand. Fare optimization opportunity identified.", severity: "warning", timestamp: daysAgo(10, 6), route: "DEL-GOI", isRead: true },
  { id: "a9", title: "Scheduled maintenance: Snowflake warehouse", description: "Snowflake warehouse COMPUTE_WH scheduled for maintenance window 02:00-04:00 IST. BI dashboards may show stale data.", severity: "info", timestamp: daysAgo(14, 0), isRead: true },
  { id: "a10", title: "Revenue target exceeded on BOM-BLR", description: "BOM-BLR monthly revenue exceeded target by 12%. ₹23.4M actual vs ₹20.9M target. Dynamic pricing contributed 65% of uplift.", severity: "info", timestamp: daysAgo(21, 0), route: "BOM-BLR", isRead: true },
  { id: "a11", title: "New competitor — Akasa Air on DEL-HYD", description: "Akasa Air launched DEL-HYD with introductory fares at ₹3,499. Our current fare is ₹5,040. Demand impact estimated at -8% over next 30 days.", severity: "critical", timestamp: daysAgo(25, 0), route: "DEL-HYD", isRead: true },
  { id: "a12", title: "Monthly revenue report ready", description: "May 2025 revenue report generated. Total: ₹248.3M, up 9.2% MoM. DEL-BOM continues to be top performer.", severity: "info", timestamp: daysAgo(30, 0), isRead: true },
];
