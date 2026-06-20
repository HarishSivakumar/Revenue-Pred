import { create } from "zustand";

export type DateRangePreset = "7d" | "30d" | "90d" | "6m" | "1y" | "custom";

export interface DateRange {
  from: Date;
  to: Date;
  preset: DateRangePreset;
}

export function buildRange(preset: Exclude<DateRangePreset, "custom">): DateRange {
  const to = new Date();
  const from = new Date();
  if (preset === "7d")  from.setDate(to.getDate() - 7);
  if (preset === "30d") from.setDate(to.getDate() - 30);
  if (preset === "90d") from.setDate(to.getDate() - 90);
  if (preset === "6m")  from.setMonth(to.getMonth() - 6);
  if (preset === "1y")  from.setFullYear(to.getFullYear() - 1);
  return { from, to, preset };
}

interface AppState {
  sidebarCollapsed: boolean;
  selectedRoute: string;
  selectedForecastHorizon: 7 | 30 | 90;
  activeAlertFilter: "all" | "critical" | "warning" | "info";
  dateRange: DateRange;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSelectedRoute: (route: string) => void;
  setSelectedForecastHorizon: (horizon: 7 | 30 | 90) => void;
  setActiveAlertFilter: (filter: "all" | "critical" | "warning" | "info") => void;
  setDateRange: (range: DateRange) => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  selectedRoute: "DEL-BOM",
  selectedForecastHorizon: 30,
  activeAlertFilter: "all",
  dateRange: buildRange("30d"),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  setSelectedForecastHorizon: (horizon) => set({ selectedForecastHorizon: horizon }),
  setActiveAlertFilter: (filter) => set({ activeAlertFilter: filter }),
  setDateRange: (range) => set({ dateRange: range }),
}));
