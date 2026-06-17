"use client";

import { SEGMENTS, TOP_CUSTOMERS, CLV_TREND, RETENTION_DATA } from "@/data/segments";
import { cn } from "@/lib/utils";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { Badge } from "@/components/ui/badge";
import { Users, Crown, Repeat, TrendingUp } from "lucide-react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(148,163,184,0.15)",
  borderRadius: "12px",
};

export default function SegmentsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Customer Segments</h1>
        <p className="text-sm text-muted-foreground mt-1">ML-powered customer segmentation using KMeans clustering</p>
      </div>

      {/* Segment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SEGMENTS.map((seg, i) => (
          <div key={seg.id} className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl" style={{ backgroundColor: `${seg.color}15` }}>
                  {seg.id === "premium" ? <Crown className="w-5 h-5" style={{ color: seg.color }} /> :
                   seg.id === "frequent" ? <Repeat className="w-5 h-5" style={{ color: seg.color }} /> :
                   <Users className="w-5 h-5" style={{ color: seg.color }} />}
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{seg.name}</h3>
                  <p className="text-[10px] text-muted-foreground">{seg.description}</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs" style={{ borderColor: `${seg.color}40`, color: seg.color }}>
                {seg.percentage}%
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-accent/20 rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground">Customers</p>
                <p className="text-lg font-bold">{formatNumber(seg.count, true)}</p>
              </div>
              <div className="bg-accent/20 rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground">Avg Revenue</p>
                <p className="text-lg font-bold">{formatCurrency(seg.avgRevenue, true)}</p>
              </div>
              <div className="bg-accent/20 rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground">Avg Bookings</p>
                <p className="text-lg font-bold">{seg.avgBookings}</p>
              </div>
              <div className="bg-accent/20 rounded-lg p-3">
                <p className="text-[10px] text-muted-foreground">Retention</p>
                <p className="text-lg font-bold">{seg.retention}%</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Segment Distribution Pie */}
        <div className="glass-card-static p-6">
          <h3 className="text-base font-semibold mb-1">Segment Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Customer breakdown by segment</p>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={SEGMENTS}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                innerRadius={60}
                paddingAngle={4}
                label={({ name, percentage }: any) => `${name} (${percentage}%)`}
                labelLine={{ stroke: "rgba(148,163,184,0.3)" }}
              >
                {SEGMENTS.map((seg) => (
                  <Cell key={seg.id} fill={seg.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* CLV Trend */}
        <div className="glass-card-static p-6">
          <h3 className="text-base font-semibold mb-1">Customer Lifetime Value</h3>
          <p className="text-xs text-muted-foreground mb-4">Monthly CLV trend by segment</p>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={CLV_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
              <XAxis dataKey="month" stroke="rgba(148,163,184,0.3)" fontSize={11} />
              <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [formatCurrency(v), ""]} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="premium" stroke="#3B82F6" strokeWidth={2} dot={false} name="Premium" />
              <Line type="monotone" dataKey="frequent" stroke="#8B5CF6" strokeWidth={2} dot={false} name="Frequent" />
              <Line type="monotone" dataKey="budget" stroke="#F97316" strokeWidth={2} dot={false} name="Budget" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Customers Table */}
      <div className="glass-card-static p-6">
        <h3 className="text-base font-semibold mb-4">Top Customers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Customer</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Segment</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Tier</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Revenue</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Bookings</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">LTV</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Last Booking</th>
              </tr>
            </thead>
            <tbody>
              {TOP_CUSTOMERS.map((c) => {
                const tierColor = c.loyaltyTier === "Platinum" ? "text-blue-400 bg-blue-400/10" :
                                  c.loyaltyTier === "Gold" ? "text-amber-400 bg-amber-400/10" :
                                  c.loyaltyTier === "Silver" ? "text-slate-300 bg-slate-300/10" :
                                  "text-orange-400 bg-orange-400/10";
                return (
                  <tr key={c.id} className="border-b border-border/30 hover:bg-accent/20 transition-colors">
                    <td className="py-3 px-4 font-medium">{c.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-[10px]">{c.segment}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={cn("text-[10px] border-0", tierColor)}>{c.loyaltyTier}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-mono">{formatCurrency(c.totalRevenue, true)}</td>
                    <td className="py-3 px-4 text-right">{c.bookings}</td>
                    <td className="py-3 px-4 text-right font-mono">{formatCurrency(c.ltv, true)}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{c.lastBooking}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Retention Heatmap */}
      <div className="glass-card-static p-6">
        <h3 className="text-base font-semibold mb-1">Cohort Retention Analysis</h3>
        <p className="text-xs text-muted-foreground mb-4">Customer retention by monthly cohort</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Cohort</th>
                {["M1", "M2", "M3", "M4", "M5", "M6"].map((m) => (
                  <th key={m} className="text-center py-3 px-4 text-muted-foreground font-medium">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RETENTION_DATA.map((row) => (
                <tr key={row.cohort} className="border-b border-border/30">
                  <td className="py-3 px-4 font-medium text-xs">{row.cohort}</td>
                  {[row.month1, row.month2, row.month3, row.month4, row.month5, row.month6].map((val, i) => (
                    <td key={i} className="py-3 px-4 text-center">
                      {val !== undefined ? (
                        <span
                          className="inline-flex items-center justify-center w-12 h-8 rounded text-xs font-medium"
                          style={{
                            backgroundColor: `rgba(59,130,246,${val / 100 * 0.5})`,
                            color: val > 50 ? "white" : "rgba(148,163,184,0.7)",
                          }}
                        >
                          {val}%
                        </span>
                      ) : (
                        <span className="text-muted-foreground/30">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
