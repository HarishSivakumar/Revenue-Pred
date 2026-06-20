"use client";

import { useState } from "react";
import { getForecastData, FORECAST_METRICS, SEASONALITY_DATA, MONTHLY_SEASONALITY, DEMAND_CALENDAR } from "@/data/forecasting";
import { POPULAR_ROUTES } from "@/data/airports";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Target, Activity, BarChart3, TrendingUp } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, ComposedChart, Line,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(148,163,184,0.15)",
  borderRadius: "12px",
};

export default function ForecastingPage() {
  const [horizon, setHorizon] = useState<7 | 30 | 90>(30);
  const [selectedRoute, setSelectedRoute] = useState("DEL-BOM");
  const { dateRange } = useAppStore();
  const forecastData = getForecastData(horizon);
  const metrics = FORECAST_METRICS[horizon];

  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  // Merge actual + forecast: actual filtered by dateRange, forecast always includes future dates
  const mergedData = (() => {
    const today = new Date();
    const map = new Map<string, { date: string; actual?: number; forecast?: number; upper?: number; lower?: number }>();
    // Actuals: only show from dateRange.from onward
    forecastData.actual
      .filter((p) => new Date(p.date) >= dateRange.from)
      .forEach((p) => {
        const existing = map.get(p.date) || { date: p.date };
        existing.actual = p.value;
        map.set(p.date, existing);
      });
    // Forecast: always show (future dates are always >= today >= dateRange.from)
    forecastData.forecast.forEach((p) => {
      const existing = map.get(p.date) || { date: p.date };
      existing.forecast = p.value;
      existing.upper = p.upperBound;
      existing.lower = p.lowerBound;
      map.set(p.date, existing);
    });
    return Array.from(map.values()).sort((a, b) => a.date.localeCompare(b.date));
  })();

  const metricCards = [
    { label: "Forecast Accuracy", value: `${metrics.accuracy}%`, icon: Target, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "MAE", value: metrics.mae.toFixed(1), icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "RMSE", value: metrics.rmse.toFixed(1), icon: BarChart3, color: "text-violet-400", bg: "bg-violet-400/10" },
    { label: "MAPE", value: `${metrics.mape}%`, icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-400/10" },
  ];

  // Demand heatmap data organized by weeks
  const calendarWeeks = (() => {
    const weeks: { date: string; demand: number; dayOfWeek: number }[][] = [];
    let currentWeek: { date: string; demand: number; dayOfWeek: number }[] = [];
    DEMAND_CALENDAR.forEach((d) => {
      const dow = new Date(d.date).getDay();
      if (dow === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push({ ...d, dayOfWeek: dow });
    });
    if (currentWeek.length > 0) weeks.push(currentWeek);
    return weeks;
  })();

  const maxDemand = Math.max(...DEMAND_CALENDAR.map((d) => d.demand));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Demand Forecasting</h1>
          <p className="text-sm text-muted-foreground mt-1">
            History: {fmt(dateRange.from)} – today · Forecast: next {horizon} days
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedRoute} onValueChange={(v) => v && setSelectedRoute(v)}>
            <SelectTrigger className="w-[180px] bg-accent/40 border-border/30">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border/50">
              {POPULAR_ROUTES.slice(0, 10).map((r) => (
                <SelectItem key={`${r.origin}-${r.destination}`} value={`${r.origin}-${r.destination}`}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex bg-accent/40 rounded-lg p-0.5">
            {([7, 30, 90] as const).map((h) => (
              <button
                key={h}
                onClick={() => setHorizon(h)}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  horizon === h ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {h}D
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((m, i) => (
          <div key={m.label} className="bg-card border border-border/40 shadow-sm rounded-xl p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-2 mb-3">
              <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg", m.bg)}>
                <m.icon className={cn("w-4 h-4", m.color)} />
              </div>
            </div>
            <p className="text-2xl font-bold">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Main Forecast Chart */}
      <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">Actual vs Forecast</h3>
            <p className="text-sm text-muted-foreground">
              Historical from {fmt(dateRange.from)} · {horizon}D forecast ahead
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-blue-400 rounded" />Actual</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-0.5 bg-green-400 rounded" />Forecast</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-400/15 rounded" />Confidence</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={mergedData}>
            <defs>
              <linearGradient id="confGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#10B981" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
            <XAxis dataKey="date" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} />
            <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} />
            <Tooltip contentStyle={tooltipStyle} labelFormatter={(l) => new Date(l).toLocaleDateString("en-IN", { day: "2-digit", month: "long" })} />
            <Area type="monotone" dataKey="upper" stroke="none" fill="url(#confGrad)" name="Upper Bound" />
            <Area type="monotone" dataKey="lower" stroke="none" fill="transparent" name="Lower Bound" />
            <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} dot={false} name="Actual" connectNulls={false} />
            <Line type="monotone" dataKey="forecast" stroke="#10B981" strokeWidth={2} strokeDasharray="6 3" dot={false} name="Forecast" connectNulls={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Seasonality */}
        <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
          <h3 className="text-base font-semibold mb-1">Weekly Seasonality</h3>
          <p className="text-xs text-muted-foreground mb-4">Average demand by day of week</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={SEASONALITY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="day" stroke="rgba(148,163,184,0.3)" fontSize={11} />
              <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="demand" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Avg Demand" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Seasonality */}
        <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
          <h3 className="text-base font-semibold mb-1">Monthly Seasonality</h3>
          <p className="text-xs text-muted-foreground mb-4">Demand pattern across months</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MONTHLY_SEASONALITY}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="month" stroke="rgba(148,163,184,0.3)" fontSize={11} />
              <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="demand" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Avg Demand" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demand Heatmap Calendar */}
      <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
        <h3 className="text-base font-semibold mb-1">Demand Heatmap</h3>
        <p className="text-xs text-muted-foreground mb-4">Daily demand intensity over the last 90 days</p>
        <div className="flex gap-1 text-[10px] text-muted-foreground mb-2 pl-8">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <span key={d} className="w-4 text-center">{d[0]}</span>
          ))}
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {calendarWeeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((day) => {
                const intensity = day.demand / maxDemand;
                return (
                  <div
                    key={day.date}
                    className="w-4 h-4 rounded-sm cursor-pointer transition-transform hover:scale-125"
                    style={{ backgroundColor: `rgba(59,130,246,${0.1 + intensity * 0.8})` }}
                    title={`${day.date}: ${day.demand} bookings`}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-[10px] text-muted-foreground">
          <span>Less</span>
          {[0.15, 0.3, 0.5, 0.7, 0.9].map((op) => (
            <div key={op} className="w-3 h-3 rounded-sm" style={{ backgroundColor: `rgba(59,130,246,${op})` }} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
