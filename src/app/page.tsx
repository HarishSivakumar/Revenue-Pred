"use client";

import { DASHBOARD_KPIS, REVENUE_TREND, TOP_ROUTES, RECENT_ALERTS } from "@/data/dashboard";
import { AIRPORTS } from "@/data/airports";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import {
  IndianRupee, Ticket, Gauge, Users, TrendingUp, TrendingDown,
  Route, ArrowUpRight, ArrowDownRight, Minus, AlertTriangle, Info,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell,
} from "recharts";

const kpiIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  IndianRupee, Ticket, Gauge, Users, TrendingUp, Route,
};

function KPICards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {DASHBOARD_KPIS.map((kpi, index) => {
        const Icon = kpiIconMap[kpi.icon];
        return (
          <div
            key={kpi.id}
            className={cn(
              "bg-card border border-border/40 shadow-sm rounded-xl kpi-glow p-4 cursor-pointer animate-fade-in",
              `delay-${(index + 1) * 100}`
            )}
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                {Icon && <Icon className="w-4 h-4 text-primary" />}
              </div>
              {kpi.trend === "up" && <ArrowUpRight className="w-4 h-4 text-green-400" />}
              {kpi.trend === "down" && <ArrowDownRight className="w-4 h-4 text-red-400" />}
              {kpi.trend === "neutral" && <Minus className="w-4 h-4 text-muted-foreground" />}
            </div>
            <p className="text-2xl font-bold tracking-tight">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{kpi.title}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className={cn(
                "text-xs font-medium",
                kpi.trend === "up" ? "text-green-400" : kpi.trend === "down" ? "text-red-400" : "text-muted-foreground"
              )}>
                {kpi.change > 0 ? "+" : ""}{kpi.change}%
              </span>
              <span className="text-[10px] text-muted-foreground">{kpi.changeLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RevenueTrendChart() {
  return (
    <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Revenue Trend</h3>
          <p className="text-sm text-muted-foreground">Last 30 days performance</p>
        </div>
        <div className="flex gap-2">
          {["7D", "30D", "90D"].map((period) => (
            <button
              key={period}
              className={cn(
                "px-3 py-1 rounded-md text-xs font-medium transition-colors",
                period === "30D" ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-accent"
              )}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={REVENUE_TREND}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
          <XAxis
            dataKey="date"
            stroke="rgba(148,163,184,0.3)"
            fontSize={11}
            tickFormatter={(val) => new Date(val).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
          />
          <YAxis
            stroke="rgba(148,163,184,0.3)"
            fontSize={11}
            tickFormatter={(val) => `₹${(val / 1000000).toFixed(1)}M`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(148,163,184,0.15)",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
            labelStyle={{ color: "rgba(148,163,184,0.7)", fontSize: 12 }}
            itemStyle={{ color: "#3B82F6", fontSize: 13 }}
            formatter={(value: any) => [formatCurrency(value), "Revenue"]}
            labelFormatter={(label) => new Date(label).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={2}
            fill="url(#revenueGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function TopRoutesChart() {
  const colors = ["#3B82F6", "#6366F1", "#8B5CF6", "#A855F7", "#C084FC", "#D8B4FE", "#E9D5FF", "#F3E8FF"];
  return (
    <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-1">Top Revenue Drivers</h3>
      <p className="text-sm text-muted-foreground mb-6">Monthly route revenue ranking</p>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={TOP_ROUTES} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" horizontal={false} />
          <XAxis
            type="number"
            stroke="rgba(148,163,184,0.3)"
            fontSize={11}
            tickFormatter={(val) => `₹${(val / 1000000).toFixed(0)}M`}
          />
          <YAxis
            type="category"
            dataKey="route"
            stroke="rgba(148,163,184,0.3)"
            fontSize={11}
            width={80}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(15,23,42,0.95)",
              border: "1px solid rgba(148,163,184,0.15)",
              borderRadius: "12px",
            }}
            formatter={(value: any) => [formatCurrency(value), "Revenue"]}
          />
          <Bar dataKey="revenue" radius={[0, 6, 6, 0]} barSize={20}>
            {TOP_ROUTES.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function AirportHeatmap() {
  const maxRevenue = Math.max(...AIRPORTS.map((a) => a.revenue));
  return (
    <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-1">Airport Revenue Map</h3>
      <p className="text-sm text-muted-foreground mb-6">Revenue distribution across Indian airports</p>
      <div className="relative w-full h-[320px] bg-accent/20 rounded-xl overflow-hidden">
        {/* Simplified India map outline using positioned dots */}
        <svg viewBox="0 0 500 550" className="w-full h-full">
          {/* India outline path (simplified) */}
          <path
            d="M200,50 L280,40 L340,60 L380,100 L400,150 L420,180 L430,220 L420,280 L400,340 L380,380 L340,420 L300,460 L260,500 L240,510 L220,490 L200,450 L180,400 L160,350 L140,300 L130,250 L140,200 L160,150 L180,100 Z"
            fill="rgba(59,130,246,0.05)"
            stroke="rgba(59,130,246,0.15)"
            strokeWidth="1.5"
          />
          {/* Airport dots */}
          {AIRPORTS.map((airport) => {
            const x = ((airport.lng - 68) / (97 - 68)) * 400 + 50;
            const y = ((35 - airport.lat) / (35 - 8)) * 480 + 30;
            const size = Math.max(4, (airport.revenue / maxRevenue) * 16);
            const opacity = 0.4 + (airport.revenue / maxRevenue) * 0.6;
            return (
              <g key={airport.code}>
                <circle
                  cx={x} cy={y} r={size}
                  fill="#3B82F6"
                  opacity={opacity}
                  className="transition-all duration-300 hover:opacity-100"
                />
                <circle
                  cx={x} cy={y} r={size * 1.8}
                  fill="#3B82F6"
                  opacity={opacity * 0.15}
                />
                {airport.tier === 1 && (
                  <text x={x} y={y - size - 4} textAnchor="middle" fill="rgba(148,163,184,0.7)" fontSize="9" fontWeight="500">
                    {airport.code}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function RecentAlerts() {
  const severityConfig = {
    critical: { color: "text-red-400", bg: "bg-red-400/10", icon: AlertTriangle },
    warning: { color: "text-amber-400", bg: "bg-amber-400/10", icon: AlertTriangle },
    info: { color: "text-blue-400", bg: "bg-blue-400/10", icon: Info },
  };

  return (
    <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">Recent Alerts</h3>
          <p className="text-sm text-muted-foreground">Latest system notifications</p>
        </div>
        <Badge variant="outline" className="text-xs">
          {RECENT_ALERTS.filter(a => !a.isRead).length} unread
        </Badge>
      </div>
      <div className="space-y-3">
        {RECENT_ALERTS.map((alert) => {
          const config = severityConfig[alert.severity];
          const AlertIcon = config.icon;
          return (
            <div
              key={alert.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg transition-colors",
                !alert.isRead ? "bg-accent/40" : "hover:bg-accent/20"
              )}
            >
              <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg shrink-0", config.bg)}>
                <AlertIcon className={cn("w-4 h-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{alert.title}</p>
                  {!alert.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{alert.description}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  {alert.route && (
                    <Badge variant="outline" className="text-[10px] h-4">{alert.route}</Badge>
                  )}
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(alert.timestamp).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Real-time airline revenue intelligence overview</p>
      </div>

      {/* KPI Cards */}
      <KPICards />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueTrendChart />
        </div>
        <div>
          <RecentAlerts />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopRoutesChart />
        <AirportHeatmap />
      </div>
    </div>
  );
}
