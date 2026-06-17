"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/stores/app-store";
import { NAV_ITEMS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, Route, TrendingUp, DollarSign, Bot,
  BarChart3, GitBranch, Users, Bell, Table2, Settings,
  ChevronLeft, ChevronRight, Plane,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, Route, TrendingUp, DollarSign, Bot,
  BarChart3, GitBranch, Users, Bell, Table2, Settings,
};

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen flex flex-col border-r border-border/50 transition-all duration-300",
        "bg-sidebar/80 backdrop-blur-xl",
        sidebarCollapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-border/50">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/20 text-primary shrink-0">
            <Plane className="w-4 h-4" />
          </div>
          {!sidebarCollapsed && (
            <div className="animate-fade-in min-w-0">
              <h1 className="text-sm font-semibold tracking-tight truncate">Revenue Intel</h1>
              <p className="text-[10px] text-muted-foreground truncate">Airline Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2">
        <div className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  "hover:bg-accent/80 group relative",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full" />
                )}
                {Icon && <Icon className={cn("w-4 h-4 shrink-0", isActive && "text-primary")} />}
                {!sidebarCollapsed && (
                  <span className="truncate animate-fade-in">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge && (
                  <Badge
                    variant="destructive"
                    className="ml-auto text-[10px] h-5 min-w-[20px] flex items-center justify-center animate-fade-in"
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-2 border-t border-border/50">
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center w-full py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-colors"
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
}
