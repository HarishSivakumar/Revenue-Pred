"use client";

import { useState } from "react";
import { PRICING_DATA, PRICE_SIMULATION, PRICING_HISTORY } from "@/data/pricing";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { useAppStore } from "@/stores/app-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  IndianRupee, ArrowRight, TrendingUp, Calendar, ArrowUp,
  BarChart, AlertTriangle, Check, X, Zap, Shield,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, ComposedChart, Bar, Line,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(148,163,184,0.15)",
  borderRadius: "12px",
};

const reasonIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  TrendingUp, Calendar, ArrowUp, BarChart, AlertTriangle,
};

export default function DynamicPricingPage() {
  const [applied, setApplied] = useState(false);
  const { dateRange } = useAppStore();
  const { currentFare, recommendedFare, confidenceScore, expectedImpact, reasons } = PRICING_DATA;
  const fareDiff = recommendedFare - currentFare;
  const fareDiffPct = ((fareDiff / currentFare) * 100).toFixed(1);

  const filteredHistory = PRICING_HISTORY.filter((h) => {
    const d = new Date(h.date);
    return d >= dateRange.from && d <= dateRange.to;
  });

  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const periodLabel = `${fmt(dateRange.from)} – ${fmt(dateRange.to)}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dynamic Pricing</h1>
        <p className="text-sm text-muted-foreground mt-1">{periodLabel} · AI-powered fare optimization for DEL → BOM</p>
      </div>

      {/* Main Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current vs Recommended */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Pricing Recommendation</h3>
              <Badge className="bg-green-400/10 text-green-400 border-0 text-xs ml-auto">AI Generated</Badge>
            </div>

            <div className="flex items-center justify-center gap-8 mb-8">
              {/* Current Fare */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Current Fare</p>
                <p className="text-4xl font-bold text-muted-foreground">{formatCurrency(currentFare)}</p>
              </div>

              {/* Arrow */}
              <div className="flex flex-col items-center gap-1">
                <ArrowRight className="w-8 h-8 text-primary" />
                <Badge className="bg-primary/20 text-primary border-0 text-xs">
                  +{fareDiffPct}%
                </Badge>
              </div>

              {/* Recommended Fare */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Recommended Fare</p>
                <p className={cn("text-4xl font-bold", applied ? "text-green-400" : "text-primary animate-pulse-glow")}>
                  {formatCurrency(recommendedFare)}
                </p>
              </div>
            </div>

            {/* Confidence + Impact */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-accent/30 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                <p className="text-xl font-bold text-green-400">{confidenceScore}%</p>
              </div>
              <div className="bg-accent/30 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Revenue Impact</p>
                <p className="text-xl font-bold text-green-400">+{expectedImpact.revenueChange}%</p>
              </div>
              <div className="bg-accent/30 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Expected Uplift</p>
                <p className="text-xl font-bold">{formatCurrency(expectedImpact.revenueAmount, true)}</p>
              </div>
              <div className="bg-accent/30 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground mb-1">Booking Impact</p>
                <p className="text-xl font-bold text-amber-400">{expectedImpact.bookingsChange}%</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={() => setApplied(true)}
                disabled={applied}
                className={cn(
                  "flex-1 gap-2",
                  applied ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-primary hover:bg-primary/90"
                )}
              >
                {applied ? <Check className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                {applied ? "Recommendation Applied" : "Apply Recommendation"}
              </Button>
              <Button variant="outline" className="gap-2 border-border/50">
                <X className="w-4 h-4" />
                Override
              </Button>
            </div>
          </div>
        </div>

        {/* Reasons */}
        <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="text-base font-semibold">Pricing Signals</h3>
          </div>
          <div className="space-y-3">
            {reasons.map((r) => {
              const Icon = reasonIcons[r.icon] || TrendingUp;
              const impactColor = r.impact === "high" ? "text-red-400 bg-red-400/10" : r.impact === "medium" ? "text-amber-400 bg-amber-400/10" : "text-blue-400 bg-blue-400/10";
              return (
                <div key={r.id} className="flex items-start gap-3 p-3 rounded-lg bg-accent/20">
                  <div className={cn("flex items-center justify-center w-8 h-8 rounded-lg shrink-0", impactColor.split(" ")[1])}>
                    <Icon className={cn("w-4 h-4", impactColor.split(" ")[0])} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{r.reason}</p>
                    <Badge variant="outline" className="text-[10px] mt-1.5 capitalize">{r.impact} impact</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Price Simulation */}
      <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-1">Price Simulation</h3>
        <p className="text-sm text-muted-foreground mb-6">Revenue curve across different fare levels</p>
        <ResponsiveContainer width="100%" height={340}>
          <ComposedChart data={PRICE_SIMULATION}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
            <XAxis dataKey="fare" stroke="rgba(148,163,184,0.3)" fontSize={11} tickFormatter={(v) => `₹${v}`} />
            <YAxis yAxisId="revenue" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => `₹${(v / 1000000).toFixed(1)}M`} />
            <YAxis yAxisId="lf" orientation="right" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => `${v}%`} />
            <Tooltip contentStyle={tooltipStyle} formatter={(value: any, name: any) => [name === "revenue" ? formatCurrency(value, true) : name === "loadFactor" ? `${value}%` : value, name === "revenue" ? "Revenue" : name === "loadFactor" ? "Load Factor" : "Bookings"]} />
            <Bar yAxisId="revenue" dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} opacity={0.6} name="revenue" />
            <Line yAxisId="lf" type="monotone" dataKey="loadFactor" stroke="#10B981" strokeWidth={2} dot={false} name="loadFactor" />
            <ReferenceLine yAxisId="revenue" x={currentFare} stroke="#EF4444" strokeDasharray="4 4" label={{ value: "Current", position: "top", fill: "#EF4444", fontSize: 11 }} />
            <ReferenceLine yAxisId="revenue" x={recommendedFare} stroke="#10B981" strokeDasharray="4 4" label={{ value: "Recommended", position: "top", fill: "#10B981", fontSize: 11 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Pricing History */}
      <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
        <h3 className="text-base font-semibold mb-4">Pricing Decision History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Date</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Route</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Previous</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">New Fare</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Action</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Impact</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-sm text-muted-foreground">
                    No pricing decisions in the selected date range
                  </td>
                </tr>
              ) : (
                filteredHistory.map((h, i) => (
                <tr key={i} className="border-b border-border/30 hover:bg-accent/20 transition-colors">
                  <td className="py-3 px-4 text-muted-foreground">{h.date}</td>
                  <td className="py-3 px-4 font-medium">{h.route}</td>
                  <td className="py-3 px-4 text-right font-mono">{formatCurrency(h.previousFare)}</td>
                  <td className="py-3 px-4 text-right font-mono">{formatCurrency(h.newFare)}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className={cn("text-[10px]", h.action.includes("AI") ? "border-primary/30 text-primary" : "border-amber-400/30 text-amber-400")}>
                      {h.action.includes("AI") ? "🤖 AI" : "✋ Manual"}
                    </Badge>
                    <span className="text-xs text-muted-foreground ml-2">{h.action}</span>
                  </td>
                  <td className={cn("py-3 px-4 text-right text-xs font-medium", h.impact.startsWith("+") ? "text-green-400" : "text-red-400")}>
                    {h.impact}
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
