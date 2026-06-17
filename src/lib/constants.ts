import type { NavItem, DomainWorkspace } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard", href: "/" },
  { id: "routes", label: "Route Analytics", icon: "Route", href: "/routes" },
  { id: "forecasting", label: "Demand Forecasting", icon: "TrendingUp", href: "/forecasting" },
  { id: "pricing", label: "Dynamic Pricing", icon: "DollarSign", href: "/pricing" },
  { id: "copilot", label: "AI Copilot", icon: "Bot", href: "/copilot" },
  { id: "bi", label: "Business Intelligence", icon: "BarChart3", href: "/bi" },
  { id: "pipeline", label: "Pipeline Monitor", icon: "GitBranch", href: "/pipeline" },
  { id: "segments", label: "Customer Segments", icon: "Users", href: "/segments" },
  { id: "alerts", label: "Alerts", icon: "Bell", href: "/alerts", badge: "3" },
  { id: "explorer", label: "Data Explorer", icon: "Table2", href: "/explorer" },
  { id: "settings", label: "Settings", icon: "Settings", href: "/settings" },
];

export const DOMAIN_WORKSPACES: DomainWorkspace[] = [
  { id: "airline", name: "Airline Workspace", icon: "Plane", active: true, comingSoon: false },
  { id: "hotel", name: "Hotel Workspace", icon: "Hotel", active: false, comingSoon: true },
  { id: "retail", name: "Retail Workspace", icon: "ShoppingCart", active: false, comingSoon: true },
  { id: "ridesharing", name: "Ride Sharing", icon: "Car", active: false, comingSoon: true },
];

export const CHART_COLORS = {
  primary: "oklch(0.65 0.2 260)",
  secondary: "oklch(0.65 0.18 180)",
  tertiary: "oklch(0.70 0.15 320)",
  quaternary: "oklch(0.75 0.15 75)",
  quinary: "oklch(0.65 0.2 25)",
  success: "oklch(0.65 0.2 150)",
  warning: "oklch(0.75 0.15 75)",
  danger: "oklch(0.65 0.2 25)",
};

export const CHART_THEME = {
  backgroundColor: "transparent",
  textColor: "oklch(0.60 0.015 260)",
  gridColor: "oklch(0.25 0.015 260)",
  tooltipBg: "oklch(0.17 0.015 260)",
  tooltipBorder: "oklch(0.28 0.015 260)",
};

export const AIRLINES = [
  { code: "6E", name: "IndiGo", color: "#3B82F6" },
  { code: "AI", name: "Air India", color: "#EF4444" },
  { code: "QP", name: "Akasa Air", color: "#F97316" },
  { code: "SG", name: "SpiceJet", color: "#EAB308" },
  { code: "UK", name: "Vistara", color: "#8B5CF6" },
];

export const AIRCRAFT_TYPES = ["A320neo", "A321neo", "A320", "ATR-72", "B737-800", "B777-300ER"];
