"use client";

import { useState } from "react";
import { ROUTE_DATA, COMPETITOR_PRICES, BOOKING_TRENDS, OCCUPANCY_TRENDS, FARE_TRENDS, generateCompetitorComparison, WEEKLY_PERFORMANCE } from "@/data/routes";
import { POPULAR_ROUTES } from "@/data/airports";
import { cn } from "@/lib/utils";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  IndianRupee, Users, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, BarChart3,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(148,163,184,0.15)",
  borderRadius: "12px",
};

export default function RouteAnalyticsPage() {
  const [selectedRoute, setSelectedRoute] = useState("DEL-BOM");
  const route = ROUTE_DATA[selectedRoute] || ROUTE_DATA["DEL-BOM"];
  const competitors = COMPETITOR_PRICES[selectedRoute] || COMPETITOR_PRICES["DEL-BOM"];
  const bookingTrend = BOOKING_TRENDS[selectedRoute] || BOOKING_TRENDS["DEL-BOM"];
  const occupancyTrend = OCCUPANCY_TRENDS[selectedRoute] || OCCUPANCY_TRENDS["DEL-BOM"];
  const fareTrend = FARE_TRENDS[selectedRoute] || FARE_TRENDS["DEL-BOM"];
  const competitorComparison = generateCompetitorComparison(selectedRoute);

  const kpis = [
    { label: "Revenue", value: formatCurrency(route.revenue, true), change: 12.3, icon: IndianRupee, color: "text-blue-400" },
    { label: "Occupancy", value: `${route.occupancy}%`, change: 2.1, icon: Users, color: "text-violet-400" },
    { label: "Average Fare", value: formatCurrency(route.avgFare), change: 3.7, icon: TrendingUp, color: "text-emerald-400" },
    { label: "Competitor Gap", value: `${route.competitorGap > 0 ? "+" : ""}₹${route.competitorGap}`, change: route.competitorGap > 0 ? 5.2 : -3.1, icon: BarChart3, color: "text-amber-400" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Route Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Deep-dive into route-level performance metrics</p>
        </div>
        <Select value={selectedRoute} onValueChange={(v) => v && setSelectedRoute(v)}>
          <SelectTrigger className="w-[200px] bg-accent/40 border-border/30">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
            {POPULAR_ROUTES.slice(0, 10).map((r) => (
              <SelectItem key={`${r.origin}-${r.destination}`} value={`${r.origin}-${r.destination}`}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={kpi.label} className="glass-card p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-2 mb-3">
              <kpi.icon className={cn("w-4 h-4", kpi.color)} />
              <span className="text-sm text-muted-foreground">{kpi.label}</span>
            </div>
            <p className="text-2xl font-bold">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {kpi.change > 0 ? <ArrowUpRight className="w-3.5 h-3.5 text-green-400" /> : <ArrowDownRight className="w-3.5 h-3.5 text-red-400" />}
              <span className={cn("text-xs font-medium", kpi.change > 0 ? "text-green-400" : "text-red-400")}>
                {kpi.change > 0 ? "+" : ""}{kpi.change}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Trend */}
        <div className="glass-card-static p-6">
          <h3 className="text-base font-semibold mb-1">Booking Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Daily bookings over last 30 days</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={bookingTrend}>
              <defs>
                <linearGradient id="bookingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="date" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} />
              <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#bookingGrad)" name="Bookings" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Occupancy Trend */}
        <div className="glass-card-static p-6">
          <h3 className="text-base font-semibold mb-1">Occupancy Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Daily occupancy rate</p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={occupancyTrend}>
              <defs>
                <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="date" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} />
              <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} domain={[50, 100]} tickFormatter={(v) => `${v}%`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [`${v}%`, "Occupancy"]} />
              <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fill="url(#occGrad)" name="Occupancy" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Fare Trend */}
        <div className="glass-card-static p-6">
          <h3 className="text-base font-semibold mb-1">Fare Trend</h3>
          <p className="text-xs text-muted-foreground mb-4">Average fare variation</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={fareTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="date" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} />
              <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => `₹${v}`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [formatCurrency(v), "Fare"]} />
              <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} dot={false} name="Avg Fare" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Competitor Comparison */}
        <div className="glass-card-static p-6">
          <h3 className="text-base font-semibold mb-1">Competitor Price Comparison</h3>
          <p className="text-xs text-muted-foreground mb-4">30-day fare comparison across airlines</p>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={competitorComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="date" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} />
              <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => `₹${v}`} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="IndiGo" stroke="#3B82F6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Air India" stroke="#EF4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="Akasa Air" stroke="#F97316" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Competitor Table */}
      <div className="glass-card-static p-6">
        <h3 className="text-base font-semibold mb-4">Competitor Fare Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Airline</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Current Fare</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Change</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Gap vs IndiGo</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {competitors.map((c) => {
                const gap = c.fare - (competitors.find(x => x.airline === "IndiGo")?.fare || 0);
                return (
                  <tr key={c.airline} className="border-b border-border/30 hover:bg-accent/20 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                        <span className="font-medium">{c.airline}</span>
                        {c.airline === "IndiGo" && <Badge className="text-[10px] h-4 bg-primary/20 text-primary border-0">Us</Badge>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">{formatCurrency(c.fare)}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={cn("flex items-center justify-end gap-1", c.change > 0 ? "text-green-400" : "text-red-400")}>
                        {c.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {c.change > 0 ? "+" : ""}{c.change}%
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">
                      {c.airline === "IndiGo" ? "-" : (
                        <span className={gap > 0 ? "text-green-400" : "text-red-400"}>
                          {gap > 0 ? "+" : ""}₹{gap}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-muted-foreground text-xs">Just now</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="glass-card-static p-6">
        <h3 className="text-base font-semibold mb-4">Weekly Route Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Week</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Revenue</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Bookings</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Occupancy</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Avg Fare</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Load Factor</th>
              </tr>
            </thead>
            <tbody>
              {WEEKLY_PERFORMANCE.map((w) => (
                <tr key={w.week} className="border-b border-border/30 hover:bg-accent/20 transition-colors">
                  <td className="py-3 px-4 font-medium">{w.week}</td>
                  <td className="py-3 px-4 text-right font-mono">{formatCurrency(w.revenue, true)}</td>
                  <td className="py-3 px-4 text-right">{formatNumber(w.bookings)}</td>
                  <td className="py-3 px-4 text-right">{w.occupancy}%</td>
                  <td className="py-3 px-4 text-right font-mono">{formatCurrency(w.avgFare)}</td>
                  <td className="py-3 px-4 text-right">{w.loadFactor}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
