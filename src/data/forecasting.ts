import type { TimeSeriesPoint, ForecastMetrics } from "@/types";

function generateForecastData(days: number): { actual: TimeSeriesPoint[]; forecast: TimeSeriesPoint[] } {
  const actual: TimeSeriesPoint[] = [];
  const forecast: TimeSeriesPoint[] = [];
  const now = new Date();
  const baseValue = 280;

  // Always generate 365 days of historical actuals (date range picker controls how much is shown)
  for (let i = 365; i >= 1; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const dow = d.getDay();
    const weekendEffect = dow === 0 || dow === 6 ? 60 : 0;
    const seasonality = Math.sin((d.getDate() / 30) * Math.PI * 2) * 25;
    const noise = (Math.random() - 0.5) * 40;
    const trend = ((365 - i) / 365) * 30;
    actual.push({ date: dateStr, value: Math.round(baseValue + weekendEffect + seasonality + noise + trend) });
  }

  // Future forecast: starts from today + 1, extends `days` into the future
  for (let i = 1; i <= days; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().split("T")[0];
    const dow = d.getDay();
    const weekendEffect = dow === 0 || dow === 6 ? 60 : 0;
    const seasonality = Math.sin(((d.getDate()) / 30) * Math.PI * 2) * 25;
    const noise = (Math.random() - 0.5) * 15;
    const trend = 30 + (i / days) * 20;
    const val = Math.round(baseValue + weekendEffect + seasonality + noise + trend);
    const uncertainty = Math.max(15, i * 3);
    forecast.push({
      date: dateStr,
      value: val,
      predicted: val,
      upperBound: val + uncertainty,
      lowerBound: val - uncertainty,
    });
  }

  return { actual, forecast };
}

export const FORECAST_DATA_7 = generateForecastData(7);
export const FORECAST_DATA_30 = generateForecastData(30);
export const FORECAST_DATA_90 = generateForecastData(90);

export function getForecastData(horizon: 7 | 30 | 90) {
  switch (horizon) {
    case 7: return FORECAST_DATA_7;
    case 30: return FORECAST_DATA_30;
    case 90: return FORECAST_DATA_90;
  }
}

export const FORECAST_METRICS: Record<number, ForecastMetrics> = {
  7: { accuracy: 96.2, mae: 12.4, rmse: 18.7, mape: 3.8 },
  30: { accuracy: 94.1, mae: 18.2, rmse: 24.5, mape: 5.9 },
  90: { accuracy: 89.7, mae: 28.6, rmse: 35.2, mape: 10.3 },
};

export const SEASONALITY_DATA = [
  { day: "Mon", demand: 245 }, { day: "Tue", demand: 258 },
  { day: "Wed", demand: 262 }, { day: "Thu", demand: 270 },
  { day: "Fri", demand: 310 }, { day: "Sat", demand: 340 },
  { day: "Sun", demand: 325 },
];

export const MONTHLY_SEASONALITY = [
  { month: "Jan", demand: 280 }, { month: "Feb", demand: 265 },
  { month: "Mar", demand: 290 }, { month: "Apr", demand: 310 },
  { month: "May", demand: 350 }, { month: "Jun", demand: 320 },
  { month: "Jul", demand: 295 }, { month: "Aug", demand: 275 },
  { month: "Sep", demand: 260 }, { month: "Oct", demand: 340 },
  { month: "Nov", demand: 380 }, { month: "Dec", demand: 420 },
];

// Demand heatmap calendar data (last 90 days)
export function generateDemandCalendar(): { date: string; demand: number }[] {
  const data: { date: string; demand: number }[] = [];
  const now = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dow = d.getDay();
    const weekendBoost = dow === 0 || dow === 6 ? 80 : 0;
    data.push({
      date: d.toISOString().split("T")[0],
      demand: Math.round(200 + Math.random() * 150 + weekendBoost),
    });
  }
  return data;
}

export const DEMAND_CALENDAR = generateDemandCalendar();
