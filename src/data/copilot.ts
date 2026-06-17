import type { ChatMessage, ChatConversation } from "@/types";

export const SAMPLE_CONVERSATIONS: ChatConversation[] = [
  {
    id: "conv1",
    title: "DEL-BOM Revenue Analysis",
    lastMessage: "The revenue dip was primarily caused by...",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    messages: [
      {
        id: "m1", role: "user", content: "Why did DEL-BOM revenue fall yesterday?",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: "m2", role: "assistant",
        content: "Based on my analysis of the DEL-BOM route data, yesterday's revenue dropped by **12.3%** compared to the 7-day average. Here are the key contributing factors:\n\n**1. Competitor Price War** — Air India reduced fares by ₹680 on morning slots (6E was ₹5,200 vs AI ₹4,520), pulling 340+ bookings.\n\n**2. Load Factor Drop** — Average load factor fell to 71% from the typical 84%, primarily on the 14:00 and 16:30 departures.\n\n**3. Seasonal Dip** — Mid-week Tuesday demand was 18% below Monday baseline, consistent with historical patterns.\n\n**Recommendation**: Consider a tactical fare reduction of ₹300-400 on afternoon slots to recapture demand. The pricing model estimates this could recover 65% of lost revenue.",
        timestamp: new Date(Date.now() - 7100000).toISOString(),
        sql: "SELECT date, SUM(revenue) as total_revenue, AVG(load_factor) as avg_lf,\n       COUNT(*) as total_bookings\nFROM fact_bookings fb\nJOIN dim_routes dr ON fb.route_id = dr.route_id\nWHERE dr.origin = 'DEL' AND dr.destination = 'BOM'\n  AND date >= CURRENT_DATE - INTERVAL '7 days'\nGROUP BY date\nORDER BY date DESC;",
        chartData: [
          { date: "Jun 10", value: 4280000 },
          { date: "Jun 11", value: 4150000 },
          { date: "Jun 12", value: 4320000 },
          { date: "Jun 13", value: 4100000 },
          { date: "Jun 14", value: 3980000 },
          { date: "Jun 15", value: 3520000 },
          { date: "Jun 16", value: 3890000 },
        ],
        chartType: "bar",
        chartTitle: "DEL-BOM Daily Revenue (Last 7 Days)",
        sources: ["fact_bookings", "fact_revenue", "fact_competitor_prices", "dim_routes"],
        actions: ["Apply recommended fare adjustment", "Set up price monitoring alert", "Generate competitor analysis report"],
      },
    ],
  },
  {
    id: "conv2",
    title: "Route Comparison",
    lastMessage: "DEL-BLR outperforms in revenue per ASK...",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    messages: [],
  },
  {
    id: "conv3",
    title: "Diwali Demand Forecast",
    lastMessage: "Expect 45% surge in bookings...",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    messages: [],
  },
  {
    id: "conv4",
    title: "Capacity Planning",
    lastMessage: "BOM-GOI needs 2 additional frequencies...",
    timestamp: new Date(Date.now() - 259200000).toISOString(),
    messages: [],
  },
];

export const SUGGESTED_QUESTIONS = [
  "Why did DEL-BOM revenue fall yesterday?",
  "Compare DEL-BOM and DEL-BLR performance",
  "Predict Diwali demand for top 5 routes",
  "Which route should receive additional capacity?",
  "What caused low load factor on BOM-HYD?",
  "Show me revenue trends for the past quarter",
  "Identify routes with pricing opportunities",
  "Analyze customer segment shift this month",
];
