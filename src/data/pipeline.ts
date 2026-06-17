import type { Pipeline } from "@/types";

export const PIPELINES: Pipeline[] = [
  {
    id: "p1",
    name: "Booking Ingestion",
    status: "success",
    lastRun: new Date(Date.now() - 900000).toISOString(),
    duration: "4m 23s",
    nextRun: new Date(Date.now() + 2700000).toISOString(),
    tasks: [
      { id: "t1", name: "Extract from POS", status: "success", duration: "45s", dependencies: [] },
      { id: "t2", name: "Validate schema", status: "success", duration: "12s", dependencies: ["t1"] },
      { id: "t3", name: "Transform & clean", status: "success", duration: "1m 30s", dependencies: ["t2"] },
      { id: "t4", name: "Load to PostgreSQL", status: "success", duration: "58s", dependencies: ["t3"] },
      { id: "t5", name: "Sync to Snowflake", status: "success", duration: "58s", dependencies: ["t4"] },
    ],
  },
  {
    id: "p2",
    name: "Forecast Generation",
    status: "running",
    lastRun: new Date(Date.now() - 300000).toISOString(),
    duration: "Running...",
    nextRun: "-",
    tasks: [
      { id: "t1", name: "Fetch historical data", status: "success", duration: "1m 12s", dependencies: [] },
      { id: "t2", name: "Feature engineering", status: "success", duration: "2m 45s", dependencies: ["t1"] },
      { id: "t3", name: "Run Prophet model", status: "running", duration: "Running...", dependencies: ["t2"] },
      { id: "t4", name: "Run XGBoost model", status: "pending", duration: "-", dependencies: ["t2"] },
      { id: "t5", name: "Ensemble & publish", status: "pending", duration: "-", dependencies: ["t3", "t4"] },
    ],
  },
  {
    id: "p3",
    name: "Competitor Pricing",
    status: "success",
    lastRun: new Date(Date.now() - 1800000).toISOString(),
    duration: "2m 15s",
    nextRun: new Date(Date.now() + 1800000).toISOString(),
    tasks: [
      { id: "t1", name: "Scrape competitor fares", status: "success", duration: "1m 05s", dependencies: [] },
      { id: "t2", name: "Parse & normalize", status: "success", duration: "28s", dependencies: ["t1"] },
      { id: "t3", name: "Detect anomalies", status: "success", duration: "15s", dependencies: ["t2"] },
      { id: "t4", name: "Update price table", status: "success", duration: "27s", dependencies: ["t3"] },
    ],
  },
  {
    id: "p4",
    name: "Customer Segmentation",
    status: "failed",
    lastRun: new Date(Date.now() - 7200000).toISOString(),
    duration: "8m 42s",
    nextRun: new Date(Date.now() + 3600000).toISOString(),
    tasks: [
      { id: "t1", name: "Aggregate customer data", status: "success", duration: "3m 10s", dependencies: [] },
      { id: "t2", name: "Compute RFM scores", status: "success", duration: "1m 45s", dependencies: ["t1"] },
      { id: "t3", name: "Run KMeans clustering", status: "failed", duration: "3m 47s", dependencies: ["t2"] },
      { id: "t4", name: "Generate profiles", status: "pending", duration: "-", dependencies: ["t3"] },
    ],
  },
  {
    id: "p5",
    name: "Revenue Reconciliation",
    status: "success",
    lastRun: new Date(Date.now() - 3600000).toISOString(),
    duration: "6m 10s",
    nextRun: new Date(Date.now() + 82800000).toISOString(),
    tasks: [
      { id: "t1", name: "Pull payment data", status: "success", duration: "2m 00s", dependencies: [] },
      { id: "t2", name: "Match with bookings", status: "success", duration: "2m 30s", dependencies: ["t1"] },
      { id: "t3", name: "Flag discrepancies", status: "success", duration: "45s", dependencies: ["t2"] },
      { id: "t4", name: "Generate report", status: "success", duration: "55s", dependencies: ["t3"] },
    ],
  },
];

export const PIPELINE_STATS = {
  totalRuns: 1247,
  successRate: 96.8,
  avgDuration: "5m 12s",
  failuresLast24h: 3,
};
