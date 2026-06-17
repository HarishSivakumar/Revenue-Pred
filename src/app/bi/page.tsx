"use client";

import { useState } from "react";
import { REVENUE_TREND, TOP_ROUTES } from "@/data/dashboard";
import { BOOKING_TRENDS, OCCUPANCY_TRENDS } from "@/data/routes";
import { MONTHLY_SEASONALITY } from "@/data/forecasting";
import { SEGMENTS } from "@/data/segments";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, Legend,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(148,163,184,0.15)",
  borderRadius: "12px",
};

const PIE_COLORS = ["#3B82F6", "#8B5CF6", "#F97316", "#10B981", "#EF4444"];

export default function BIPage() {
  const [activeTab, setActiveTab] = useState("revenue");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Business Intelligence</h1>
          <p className="text-sm text-muted-foreground mt-1">Comprehensive analytics dashboards and reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 border-border/50">
            <Filter className="w-3.5 h-3.5" /> Filters
          </Button>
          <Button variant="outline" size="sm" className="gap-2 border-border/50">
            <Download className="w-3.5 h-3.5" /> Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => v && setActiveTab(v)}>
        <TabsList className="bg-accent/40 border border-border/30">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="loadfactor">Load Factor</TabsTrigger>
          <TabsTrigger value="airports">Airports</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card-static p-6">
              <h3 className="text-base font-semibold mb-1">Revenue Trend</h3>
              <p className="text-xs text-muted-foreground mb-4">30-day rolling revenue</p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={REVENUE_TREND}>
                  <defs>
                    <linearGradient id="biRevGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                  <XAxis dataKey="date" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} />
                  <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => `₹${(v / 1000000).toFixed(0)}M`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [formatCurrency(v), "Revenue"]} />
                  <Area type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} fill="url(#biRevGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="glass-card-static p-6">
              <h3 className="text-base font-semibold mb-1">Revenue by Route</h3>
              <p className="text-xs text-muted-foreground mb-4">Top performing routes</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={TOP_ROUTES}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                  <XAxis dataKey="route" stroke="rgba(148,163,184,0.3)" fontSize={10} />
                  <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => `₹${(v / 1000000).toFixed(0)}M`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [formatCurrency(v), "Revenue"]} />
                  <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="glass-card-static p-6">
            <h3 className="text-base font-semibold mb-1">Monthly Revenue Seasonality</h3>
            <p className="text-xs text-muted-foreground mb-4">Revenue patterns across months</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={MONTHLY_SEASONALITY}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                <XAxis dataKey="month" stroke="rgba(148,163,184,0.3)" fontSize={11} />
                <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="demand" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Revenue Index" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card-static p-6">
              <h3 className="text-base font-semibold mb-1">DEL-BOM Booking Trend</h3>
              <p className="text-xs text-muted-foreground mb-4">Daily booking volumes</p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={BOOKING_TRENDS["DEL-BOM"]}>
                  <defs>
                    <linearGradient id="biBookGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                  <XAxis dataKey="date" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} />
                  <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2} fill="url(#biBookGrad)" name="Bookings" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="glass-card-static p-6">
              <h3 className="text-base font-semibold mb-1">Multi-Route Comparison</h3>
              <p className="text-xs text-muted-foreground mb-4">Booking trends across top routes</p>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                  <XAxis dataKey="date" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} />
                  <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line data={BOOKING_TRENDS["DEL-BOM"]} type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} dot={false} name="DEL-BOM" />
                  <Line data={BOOKING_TRENDS["DEL-BLR"]} type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} dot={false} name="DEL-BLR" />
                  <Line data={BOOKING_TRENDS["BOM-HYD"]} type="monotone" dataKey="value" stroke="#F97316" strokeWidth={2} dot={false} name="BOM-HYD" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="loadfactor" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(OCCUPANCY_TRENDS).slice(0, 4).map(([route, data]) => (
              <div key={route} className="glass-card-static p-6">
                <h3 className="text-base font-semibold mb-1">{route} Load Factor</h3>
                <p className="text-xs text-muted-foreground mb-4">30-day load factor trend</p>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id={`lfGrad-${route}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.25} />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                    <XAxis dataKey="date" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => new Date(v).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} />
                    <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} domain={[50, 100]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fill={`url(#lfGrad-${route})`} name="Load Factor %" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="airports" className="space-y-6 mt-4">
          <div className="glass-card-static p-6">
            <h3 className="text-base font-semibold mb-1">Revenue by Route</h3>
            <p className="text-xs text-muted-foreground mb-4">Top 8 routes by total revenue</p>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={TOP_ROUTES} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" horizontal={false} />
                <XAxis type="number" stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => `₹${(v / 1000000).toFixed(0)}M`} />
                <YAxis type="category" dataKey="route" stroke="rgba(148,163,184,0.3)" fontSize={11} width={90} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [formatCurrency(v), "Revenue"]} />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[0, 6, 6, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6 mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="glass-card-static p-6">
              <h3 className="text-base font-semibold mb-1">Customer Segments</h3>
              <p className="text-xs text-muted-foreground mb-4">Distribution of customer types</p>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={SEGMENTS} dataKey="percentage" nameKey="name" cx="50%" cy="50%" outerRadius={100} innerRadius={60} label={({ name, percentage }: any) => `${name}: ${percentage}%`} labelLine={{ stroke: "rgba(148,163,184,0.3)" }}>
                    {SEGMENTS.map((s, i) => (
                      <Cell key={s.id} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="glass-card-static p-6">
              <h3 className="text-base font-semibold mb-1">Revenue by Segment</h3>
              <p className="text-xs text-muted-foreground mb-4">Average revenue per customer segment</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={SEGMENTS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                  <XAxis dataKey="name" stroke="rgba(148,163,184,0.3)" fontSize={11} />
                  <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: any) => [formatCurrency(v), "Avg Revenue"]} />
                  <Bar dataKey="avgRevenue" radius={[4, 4, 0, 0]}>
                    {SEGMENTS.map((s, i) => (
                      <Cell key={s.id} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6 mt-4">
          <div className="glass-card-static p-6">
            <h3 className="text-base font-semibold mb-1">Forecast Accuracy by Route</h3>
            <p className="text-xs text-muted-foreground mb-4">Model performance across top routes</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { route: "DEL-BOM", accuracy: 96.2, mae: 12.4 },
                { route: "DEL-BLR", accuracy: 94.8, mae: 15.1 },
                { route: "BOM-HYD", accuracy: 93.5, mae: 18.2 },
                { route: "DEL-HYD", accuracy: 91.2, mae: 22.4 },
                { route: "BOM-BLR", accuracy: 95.1, mae: 14.3 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
                <XAxis dataKey="route" stroke="rgba(148,163,184,0.3)" fontSize={11} />
                <YAxis stroke="rgba(148,163,184,0.3)" fontSize={10} domain={[85, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="accuracy" fill="#10B981" radius={[4, 4, 0, 0]} name="Accuracy %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
