import { create } from "zustand";

interface AppState {
  sidebarCollapsed: boolean;
  selectedRoute: string;
  selectedForecastHorizon: 7 | 30 | 90;
  activeAlertFilter: "all" | "critical" | "warning" | "info";
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setSelectedRoute: (route: string) => void;
  setSelectedForecastHorizon: (horizon: 7 | 30 | 90) => void;
  setActiveAlertFilter: (filter: "all" | "critical" | "warning" | "info") => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  selectedRoute: "DEL-BOM",
  selectedForecastHorizon: 30,
  activeAlertFilter: "all",
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  setSelectedForecastHorizon: (horizon) => set({ selectedForecastHorizon: horizon }),
  setActiveAlertFilter: (filter) => set({ activeAlertFilter: filter }),
}));
