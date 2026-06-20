"use client";

import { useState } from "react";
import { DOMAIN_WORKSPACES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search, Bell, Plane, Hotel, ShoppingCart, Car,
  ChevronDown, User, LogOut, Settings, Lock,
} from "lucide-react";
import { DateRangePicker } from "./date-range-picker";

const domainIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Plane, Hotel, ShoppingCart, Car,
};

export function TopNav() {
  const [notifications] = useState(3);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-border/50 bg-background">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left: Workspace Selector */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-accent/60 transition-colors outline-none">
              <div className="flex items-center justify-center w-6 h-6 rounded bg-primary/20 text-primary">
                <Plane className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-medium">Airline Workspace</span>
              <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 bg-card border-border/50">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-muted-foreground">Workspaces</DropdownMenuLabel>
                {DOMAIN_WORKSPACES.map((ws) => {
                  const Icon = domainIcons[ws.icon];
                  return (
                    <DropdownMenuItem
                      key={ws.id}
                      disabled={ws.comingSoon}
                      className="flex items-center gap-3 py-2.5"
                    >
                      <div className={`flex items-center justify-center w-7 h-7 rounded ${ws.active ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                        {Icon && <Icon className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{ws.name}</p>
                      </div>
                      {ws.active && (
                        <Badge variant="outline" className="text-[10px] border-primary/30 text-primary">Active</Badge>
                      )}
                      {ws.comingSoon && (
                        <div className="flex items-center gap-1">
                          <Lock className="w-3 h-3 text-muted-foreground" />
                          <Badge variant="secondary" className="text-[10px]">Soon</Badge>
                        </div>
                      )}
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search routes, metrics, reports..."
              className="pl-9 bg-accent/40 border-border/30 h-9 text-sm placeholder:text-muted-foreground/60"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground bg-background/60 px-1.5 py-0.5 rounded border border-border/50">
              ⌘K
            </kbd>
          </div>
        </div>

        {/* Right: Date Range + Notifications + Profile */}
        <div className="flex items-center gap-3">
          <DateRangePicker />
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger className="relative p-2 rounded-lg hover:bg-accent/60 transition-colors outline-none">
              <Bell className="w-4 h-4 text-muted-foreground" />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 flex items-center justify-center text-[9px] font-bold bg-destructive text-white rounded-full">
                  {notifications}
                </span>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-card border-border/50">
              <DropdownMenuGroup>
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2">
                    <span className="status-dot status-error" />
                    <span className="text-sm font-medium">Revenue anomaly detected</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">DEL-BOM route • 20 min ago</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2">
                    <span className="status-dot status-warning" />
                    <span className="text-sm font-medium">Competitor price drop</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">DEL-BLR route • 1h ago</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                  <div className="flex items-center gap-2">
                    <span className="status-dot status-success" />
                    <span className="text-sm font-medium">Forecast model updated</span>
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">All routes • 2h ago</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-accent/60 transition-colors outline-none">
              <Avatar className="w-7 h-7">
                <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">HS</AvatarFallback>
              </Avatar>
              <div className="hidden md:block text-left">
                <p className="text-xs font-medium">Harish S.</p>
                <p className="text-[10px] text-muted-foreground">Revenue Analyst</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-card border-border/50">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2"><User className="w-3.5 h-3.5" /> Profile</DropdownMenuItem>
                <DropdownMenuItem className="gap-2"><Settings className="w-3.5 h-3.5" /> Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-destructive"><LogOut className="w-3.5 h-3.5" /> Log out</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
