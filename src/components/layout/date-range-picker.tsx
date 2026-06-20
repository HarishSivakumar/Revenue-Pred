"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, ArrowRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useAppStore, buildRange, type DateRangePreset, type DateRange } from "@/stores/app-store";

const PRESETS: { label: string; value: Exclude<DateRangePreset, "custom"> }[] = [
  { label: "7D",  value: "7d"  },
  { label: "30D", value: "30d" },
  { label: "90D", value: "90d" },
  { label: "6M",  value: "6m"  },
  { label: "1Y",  value: "1y"  },
];

function toInputValue(d: Date) {
  return d.toISOString().split("T")[0];
}

function formatDisplay(from: Date, to: Date) {
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  return `${fmt(from)} – ${fmt(to)}`;
}

export function DateRangePicker() {
  const { dateRange, setDateRange } = useAppStore();
  const [open, setOpen] = useState(false);

  const [draft, setDraft] = useState<{ from: string; to: string }>({
    from: toInputValue(dateRange.from),
    to: toInputValue(dateRange.to),
  });
  const [activePreset, setActivePreset] = useState<DateRangePreset>(dateRange.preset);

  const handleOpen = (v: boolean) => {
    if (v) {
      setDraft({ from: toInputValue(dateRange.from), to: toInputValue(dateRange.to) });
      setActivePreset(dateRange.preset);
    }
    setOpen(v);
  };

  const handlePreset = (preset: Exclude<DateRangePreset, "custom">) => {
    const range = buildRange(preset);
    setDraft({ from: toInputValue(range.from), to: toInputValue(range.to) });
    setActivePreset(preset);
  };

  const handleInputChange = (field: "from" | "to", value: string) => {
    setDraft((d) => ({ ...d, [field]: value }));
    setActivePreset("custom");
  };

  const handleApply = () => {
    if (!draft.from || !draft.to) return;
    const from = new Date(draft.from);
    const to = new Date(draft.to);
    if (from > to) return;
    setDateRange({ from, to, preset: activePreset });
    setOpen(false);
  };

  const draftFrom = draft.from ? new Date(draft.from) : dateRange.from;
  const draftTo   = draft.to   ? new Date(draft.to)   : dateRange.to;

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      {/* @base-ui/react renders PopoverTrigger as a <button> natively — no asChild needed */}
      <PopoverTrigger
        id="global-date-range-picker"
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/40 bg-accent/30 hover:bg-accent/60 transition-all text-sm font-medium outline-none"
      >
        <CalendarDays className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="text-foreground/80 transition-colors hidden sm:inline whitespace-nowrap">
          {formatDisplay(dateRange.from, dateRange.to)}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-muted-foreground transition-transform duration-200 shrink-0 ${open ? "rotate-180" : ""}`}
        />
      </PopoverTrigger>

      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-80 p-0 bg-card border-border/50 shadow-2xl rounded-xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-4 pt-4 pb-3 border-b border-border/40">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
            Date Range
          </p>
          <p className="text-sm font-medium text-foreground">
            {formatDisplay(draftFrom, draftTo)}
          </p>
        </div>

        <div className="p-4 space-y-4">
          {/* Quick preset pills */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Quick select
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => handlePreset(p.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    activePreset === p.value
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "bg-accent/60 text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom date inputs */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Custom range
            </p>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-[10px] text-muted-foreground block mb-1">Start</label>
                <input
                  id="date-range-from"
                  type="date"
                  value={draft.from}
                  max={draft.to || undefined}
                  onChange={(e) => handleInputChange("from", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-accent/40 border border-border/40 text-xs text-foreground outline-none focus:border-primary/60 focus:bg-accent/60 transition-all [color-scheme:dark]"
                />
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-4" />
              <div className="flex-1">
                <label className="text-[10px] text-muted-foreground block mb-1">End</label>
                <input
                  id="date-range-to"
                  type="date"
                  value={draft.to}
                  min={draft.from || undefined}
                  onChange={(e) => handleInputChange("to", e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-accent/40 border border-border/40 text-xs text-foreground outline-none focus:border-primary/60 focus:bg-accent/60 transition-all [color-scheme:dark]"
                />
              </div>
            </div>
          </div>

          {/* Apply */}
          <button
            onClick={handleApply}
            disabled={!draft.from || !draft.to || new Date(draft.from) > new Date(draft.to)}
            className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Apply
          </button>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-border/40 bg-accent/10">
          <p className="text-[10px] text-muted-foreground">
            Applies to all pages — snapshots and trends
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
