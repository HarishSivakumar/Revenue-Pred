"use client";

import { useState } from "react";
import { ALL_ALERTS } from "@/data/alerts";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/formatters";
import { AlertTriangle, Info, Bell, Filter, CheckCircle } from "lucide-react";

const severityConfig = {
  critical: { icon: AlertTriangle, color: "text-red-400", bg: "bg-red-400/10", borderColor: "border-red-400/20", label: "Critical" },
  warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-400/10", borderColor: "border-amber-400/20", label: "Warning" },
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-400/10", borderColor: "border-blue-400/20", label: "Info" },
};

export default function AlertsPage() {
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");

  const filteredAlerts = filter === "all" ? ALL_ALERTS : ALL_ALERTS.filter((a) => a.severity === filter);

  const counts = {
    all: ALL_ALERTS.length,
    critical: ALL_ALERTS.filter((a) => a.severity === "critical").length,
    warning: ALL_ALERTS.filter((a) => a.severity === "warning").length,
    info: ALL_ALERTS.filter((a) => a.severity === "info").length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Alerts</h1>
          <p className="text-sm text-muted-foreground mt-1">System notifications and anomaly detection alerts</p>
        </div>
        <Badge variant="outline" className="text-xs gap-1.5">
          <Bell className="w-3 h-3" />
          {ALL_ALERTS.filter((a) => !a.isRead).length} unread
        </Badge>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(["all", "critical", "warning", "info"] as const).map((f) => {
          const isActive = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                isActive ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:bg-accent/40"
              )}
            >
              {f === "all" ? <Filter className="w-3.5 h-3.5" /> :
               f === "critical" ? <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> :
               f === "warning" ? <AlertTriangle className="w-3.5 h-3.5 text-amber-400" /> :
               <Info className="w-3.5 h-3.5 text-blue-400" />}
              <span className="capitalize">{f}</span>
              <Badge variant="secondary" className="text-[10px] h-5 min-w-[20px]">
                {counts[f]}
              </Badge>
            </button>
          );
        })}
      </div>

      {/* Alert Timeline */}
      <div className="space-y-3">
        {filteredAlerts.map((alert, i) => {
          const config = severityConfig[alert.severity];
          const AlertIcon = config.icon;
          return (
            <div
              key={alert.id}
              className={cn(
                "glass-card-static p-5 animate-fade-in border-l-[3px] transition-all",
                config.borderColor,
                !alert.isRead && "ring-1 ring-primary/10"
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={cn("flex items-center justify-center w-10 h-10 rounded-xl shrink-0", config.bg)}>
                  <AlertIcon className={cn("w-5 h-5", config.color)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold">{alert.title}</h3>
                    {!alert.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{alert.description}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <Badge variant="outline" className={cn("text-[10px]", config.color, config.bg, "border-0")}>
                      {config.label}
                    </Badge>
                    {alert.route && (
                      <Badge variant="outline" className="text-[10px]">{alert.route}</Badge>
                    )}
                    <span className="text-[10px] text-muted-foreground">{formatRelativeTime(alert.timestamp)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {alert.isRead ? (
                    <CheckCircle className="w-4 h-4 text-muted-foreground/40" />
                  ) : (
                    <button className="text-xs text-primary hover:underline">Mark read</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
