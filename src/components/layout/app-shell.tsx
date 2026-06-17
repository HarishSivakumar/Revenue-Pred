"use client";

import { useAppStore } from "@/stores/app-store";
import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          "transition-all duration-300",
          sidebarCollapsed ? "ml-[68px]" : "ml-[240px]"
        )}
      >
        <TopNav />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
