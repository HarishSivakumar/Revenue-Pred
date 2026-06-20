"use client";

import { PIPELINES, PIPELINE_STATS } from "@/data/pipeline";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/formatters";
import {
  CheckCircle, XCircle, Loader2, Clock, GitBranch,
  ChevronRight, Activity, Zap, AlertTriangle,
} from "lucide-react";

const statusConfig = {
  success: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/10", label: "Success", dotClass: "status-success" },
  running: { icon: Loader2, color: "text-blue-400", bg: "bg-blue-400/10", label: "Running", dotClass: "status-running" },
  failed: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", label: "Failed", dotClass: "status-error" },
  scheduled: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted/10", label: "Scheduled", dotClass: "" },
  pending: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted/10", label: "Pending", dotClass: "" },
};

export default function PipelinePage() {
  const { dateRange } = useAppStore();
  const fmt = (d: Date) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  const periodLabel = `${fmt(dateRange.from)} – ${fmt(dateRange.to)}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pipeline Monitor</h1>
        <p className="text-sm text-muted-foreground mt-1">{periodLabel} · Data pipeline run history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Runs (24h)", value: PIPELINE_STATS.totalRuns.toLocaleString(), icon: Activity, color: "text-blue-400" },
          { label: "Success Rate", value: `${PIPELINE_STATS.successRate}%`, icon: Zap, color: "text-green-400" },
          { label: "Avg Duration", value: PIPELINE_STATS.avgDuration, icon: Clock, color: "text-violet-400" },
          { label: "Failures (24h)", value: PIPELINE_STATS.failuresLast24h.toString(), icon: AlertTriangle, color: "text-red-400" },
        ].map((stat, i) => (
          <div key={stat.label} className="bg-card border border-border/40 shadow-sm rounded-xl p-5 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className={cn("w-4 h-4", stat.color)} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Pipelines */}
      <div className="space-y-4">
        {PIPELINES.map((pipeline) => {
          const config = statusConfig[pipeline.status];
          const StatusIcon = config.icon;
          return (
            <div key={pipeline.id} className="bg-card border border-border/40 shadow-sm rounded-xl overflow-hidden">
              {/* Pipeline Header */}
              <div className="flex items-center justify-between p-5 border-b border-border/30">
                <div className="flex items-center gap-4">
                  <div className={cn("flex items-center justify-center w-10 h-10 rounded-xl", config.bg)}>
                    <StatusIcon className={cn("w-5 h-5", config.color, pipeline.status === "running" && "animate-spin")} />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{pipeline.name}</h3>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span>Last run: {formatRelativeTime(pipeline.lastRun)}</span>
                      <span>•</span>
                      <span>Duration: {pipeline.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className={cn("text-xs", config.color, config.bg, "border-0")}>
                    {config.label}
                  </Badge>
                  {pipeline.nextRun !== "-" && (
                    <span className="text-xs text-muted-foreground">
                      Next: {formatRelativeTime(pipeline.nextRun)}
                    </span>
                  )}
                </div>
              </div>

              {/* DAG Visualization */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground font-medium">Task DAG</span>
                </div>
                <div className="flex items-center gap-1 overflow-x-auto pb-2">
                  {pipeline.tasks.map((task, i) => {
                    const taskConfig = statusConfig[task.status];
                    const TaskIcon = taskConfig.icon;
                    return (
                      <div key={task.id} className="flex items-center gap-1">
                        <div className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-lg border text-xs shrink-0 transition-colors",
                          task.status === "success" ? "border-green-400/20 bg-green-400/5" :
                          task.status === "running" ? "border-blue-400/20 bg-blue-400/5" :
                          task.status === "failed" ? "border-red-400/20 bg-red-400/5" :
                          "border-border/30 bg-accent/10"
                        )}>
                          <TaskIcon className={cn("w-3.5 h-3.5", taskConfig.color, task.status === "running" && "animate-spin")} />
                          <span className="font-medium whitespace-nowrap">{task.name}</span>
                          <span className="text-muted-foreground">{task.duration}</span>
                        </div>
                        {i < pipeline.tasks.length - 1 && (
                          <ChevronRight className="w-4 h-4 text-muted-foreground/40 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
