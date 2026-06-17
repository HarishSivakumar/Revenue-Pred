"use client";

import { useState, useMemo } from "react";
import { BOOKING_RECORDS } from "@/data/explorer";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatters";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Search, Download, ChevronLeft, ChevronRight,
  ArrowUpDown, ArrowUp, ArrowDown, Filter, X,
} from "lucide-react";

type SortField = "date" | "revenue" | "fare" | "loadFactor" | "route";
type SortDir = "asc" | "desc";

export default function ExplorerPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const [originFilter, setOriginFilter] = useState("all");
  const [classFilter, setClassFilter] = useState("all");
  const pageSize = 15;

  const origins = [...new Set(BOOKING_RECORDS.map((r) => r.origin))].sort();
  const classes = [...new Set(BOOKING_RECORDS.map((r) => r.class))].sort();

  const filteredData = useMemo(() => {
    let data = [...BOOKING_RECORDS];
    if (search) {
      const s = search.toLowerCase();
      data = data.filter((r) =>
        r.bookingId.toLowerCase().includes(s) ||
        r.route.toLowerCase().includes(s) ||
        r.aircraft.toLowerCase().includes(s)
      );
    }
    if (originFilter !== "all") data = data.filter((r) => r.origin === originFilter);
    if (classFilter !== "all") data = data.filter((r) => r.class === classFilter);

    data.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });
    return data;
  }, [search, sortField, sortDir, originFilter, classFilter]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pageData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
    setPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-3 h-3 text-muted-foreground/40" />;
    return sortDir === "asc" ? <ArrowUp className="w-3 h-3 text-primary" /> : <ArrowDown className="w-3 h-3 text-primary" />;
  };

  const handleExport = () => {
    const headers = ["Booking ID", "Route", "Date", "Fare", "Revenue", "Load Factor", "Aircraft", "Class", "Passengers"];
    const csv = [
      headers.join(","),
      ...filteredData.map((r) => [r.bookingId, r.route, r.date, r.fare, r.revenue, r.loadFactor, r.aircraft, r.class, r.passengers].join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "booking_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Data Explorer</h1>
          <p className="text-sm text-muted-foreground mt-1">Browse and export booking records</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2 border-border/50" onClick={handleExport}>
          <Download className="w-3.5 h-3.5" /> Export CSV
        </Button>
      </div>

      {/* Filters */}
      <div className="glass-card-static p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by booking ID, route, aircraft..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 bg-accent/30 border-border/30"
            />
          </div>
          <Select value={originFilter} onValueChange={(v) => { setOriginFilter(v || "all"); setPage(1); }}>
            <SelectTrigger className="w-[140px] bg-accent/30 border-border/30">
              <SelectValue placeholder="Origin" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
              <SelectItem value="all">All Origins</SelectItem>
              {origins.map((o) => <SelectItem key={o} value={o}>{o}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={classFilter} onValueChange={(v) => { setClassFilter(v || "all"); setPage(1); }}>
            <SelectTrigger className="w-[160px] bg-accent/30 border-border/30">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent className="bg-card/95 backdrop-blur-xl border-border/50">
              <SelectItem value="all">All Classes</SelectItem>
              {classes.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          {(search || originFilter !== "all" || classFilter !== "all") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => { setSearch(""); setOriginFilter("all"); setClassFilter("all"); setPage(1); }}
              className="gap-1 text-xs"
            >
              <X className="w-3 h-3" /> Clear
            </Button>
          )}
          <Badge variant="secondary" className="text-xs ml-auto">
            {filteredData.length} records
          </Badge>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card-static overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-accent/20">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs">Booking ID</th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs cursor-pointer" onClick={() => handleSort("route")}>
                  <span className="flex items-center gap-1">Route <SortIcon field="route" /></span>
                </th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs cursor-pointer" onClick={() => handleSort("date")}>
                  <span className="flex items-center gap-1">Date <SortIcon field="date" /></span>
                </th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs">Class</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium text-xs cursor-pointer" onClick={() => handleSort("fare")}>
                  <span className="flex items-center gap-1 justify-end">Fare <SortIcon field="fare" /></span>
                </th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium text-xs cursor-pointer" onClick={() => handleSort("revenue")}>
                  <span className="flex items-center gap-1 justify-end">Revenue <SortIcon field="revenue" /></span>
                </th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium text-xs cursor-pointer" onClick={() => handleSort("loadFactor")}>
                  <span className="flex items-center gap-1 justify-end">Load Factor <SortIcon field="loadFactor" /></span>
                </th>
                <th className="text-left py-3 px-4 text-muted-foreground font-medium text-xs">Aircraft</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium text-xs">Pax</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((record) => (
                <tr key={record.id} className="border-b border-border/20 hover:bg-accent/15 transition-colors">
                  <td className="py-2.5 px-4 font-mono text-xs text-primary">{record.bookingId}</td>
                  <td className="py-2.5 px-4 font-medium">{record.route}</td>
                  <td className="py-2.5 px-4 text-muted-foreground">{record.date}</td>
                  <td className="py-2.5 px-4">
                    <Badge variant="outline" className={cn(
                      "text-[10px]",
                      record.class === "Business" ? "border-violet-400/30 text-violet-400" :
                      record.class === "Premium Economy" ? "border-amber-400/30 text-amber-400" :
                      "border-border/50"
                    )}>
                      {record.class}
                    </Badge>
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono">{formatCurrency(record.fare)}</td>
                  <td className="py-2.5 px-4 text-right font-mono">{formatCurrency(record.revenue)}</td>
                  <td className="py-2.5 px-4 text-right">
                    <span className={cn(
                      "text-xs font-medium",
                      record.loadFactor >= 80 ? "text-green-400" : record.loadFactor >= 65 ? "text-amber-400" : "text-red-400"
                    )}>
                      {record.loadFactor}%
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-xs text-muted-foreground">{record.aircraft}</td>
                  <td className="py-2.5 px-4 text-right">{record.passengers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filteredData.length)} of {filteredData.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="h-8 w-8 p-0 border-border/50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(page - 2, totalPages - 4)) + i;
              if (pageNum > totalPages) return null;
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPage(pageNum)}
                  className={cn("h-8 w-8 p-0", page !== pageNum && "border-border/50")}
                >
                  {pageNum}
                </Button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="h-8 w-8 p-0 border-border/50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
