"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import {
  Plane, Hotel, ShoppingCart, Car, Settings as SettingsIcon, Key,
  Palette, Globe, Lock, Save, Database, Cpu,
} from "lucide-react";

const futureWorkspaces = [
  { id: "hotel", name: "Hotel Workspace", icon: Hotel, description: "Revenue optimization for hospitality chains", color: "text-emerald-400" },
  { id: "retail", name: "Retail Workspace", icon: ShoppingCart, description: "Dynamic pricing for e-commerce and retail", color: "text-violet-400" },
  { id: "ridesharing", name: "Ride Sharing Workspace", icon: Car, description: "Surge pricing and demand management", color: "text-amber-400" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage workspace configuration and preferences</p>
      </div>

      {/* Workspace Settings */}
      <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
            <Plane className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Workspace Configuration</h3>
            <p className="text-xs text-muted-foreground">Current active workspace settings</p>
          </div>
          <Badge className="ml-auto bg-green-400/10 text-green-400 border-0 text-xs">Active</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs text-muted-foreground">Workspace Name</Label>
            <Input defaultValue="Airline Workspace" className="mt-1.5 bg-accent/30 border-border/30" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Organization</Label>
            <Input defaultValue="IndiGo Airlines" className="mt-1.5 bg-accent/30 border-border/30" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Region</Label>
            <Input defaultValue="Asia Pacific" className="mt-1.5 bg-accent/30 border-border/30" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Currency</Label>
            <Input defaultValue="INR (₹)" className="mt-1.5 bg-accent/30 border-border/30" disabled />
          </div>
        </div>
      </div>

      {/* Theme & Preferences */}
      <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-violet-400/10">
            <Palette className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Appearance & Preferences</h3>
            <p className="text-xs text-muted-foreground">Customize your platform experience</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Use dark theme throughout the platform</p>
            </div>
            <Switch 
              checked={theme === "dark" || (theme === "system" && typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches)} 
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} 
            />
          </div>
          <Separator className="bg-border/30" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Compact View</p>
              <p className="text-xs text-muted-foreground">Reduce spacing for data-dense layouts</p>
            </div>
            <Switch />
          </div>
          <Separator className="bg-border/30" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Real-time Updates</p>
              <p className="text-xs text-muted-foreground">Auto-refresh dashboards every 30 seconds</p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator className="bg-border/30" />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive critical alert notifications via email</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </div>

      {/* Integrations */}
      <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-400/10">
            <Key className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold">API Keys & Integrations</h3>
            <p className="text-xs text-muted-foreground">Manage external service connections</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { name: "OpenAI API Key", icon: Cpu, value: "sk-••••••••••••••••••••pQxT", status: "connected" },
            { name: "Snowflake Connection", icon: Database, value: "org-indigo.snowflakecomputing.com", status: "connected" },
            { name: "Airflow Instance", icon: Globe, value: "https://airflow.internal.indigo.in", status: "connected" },
          ].map((integration) => (
            <div key={integration.name} className="flex items-center gap-4 p-3 rounded-lg bg-accent/20">
              <integration.icon className="w-4 h-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{integration.name}</p>
                <p className="text-xs text-muted-foreground font-mono truncate">{integration.value}</p>
              </div>
              <Badge className="bg-green-400/10 text-green-400 border-0 text-[10px]">Connected</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Future Domains */}
      <div className="bg-card border border-border/40 shadow-sm rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-400/10">
            <Globe className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-base font-semibold">Domain Expansion</h3>
            <p className="text-xs text-muted-foreground">Future workspace capabilities</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {futureWorkspaces.map((ws) => (
            <div
              key={ws.id}
              className="relative p-5 rounded-xl border border-border/30 bg-accent/10 opacity-60 cursor-not-allowed"
            >
              <div className="absolute top-3 right-3">
                <Lock className="w-3.5 h-3.5 text-muted-foreground" />
              </div>
              <div className={cn("flex items-center justify-center w-10 h-10 rounded-xl mb-3", `bg-${ws.color.replace("text-", "")}/10`)}>
                <ws.icon className={cn("w-5 h-5", ws.color)} />
              </div>
              <h4 className="text-sm font-semibold mb-1">{ws.name}</h4>
              <p className="text-xs text-muted-foreground">{ws.description}</p>
              <Badge variant="secondary" className="mt-3 text-[10px]">Coming Soon</Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end">
        <Button className="gap-2">
          <Save className="w-4 h-4" /> Save Settings
        </Button>
      </div>
    </div>
  );
}
