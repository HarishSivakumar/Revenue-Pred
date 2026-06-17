# Revenue Intelligence Platform | Airline Edition

![Revenue Intelligence Platform](https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop)

An enterprise-grade revenue management, forecasting, and analytics platform designed specifically for airline revenue optimization. Built to simulate internal revenue management tools used by major airlines (e.g., IndiGo, Delta), this platform leverages AI, machine learning, and real-time data to maximize profitability and operational efficiency.

## ✨ Features

- **📊 Comprehensive Dashboard**: High-level KPIs, global route heatmaps, and quick access to critical business metrics.
- **✈️ Route Analytics**: Deep-dive into route-level performance, occupancy rates, and revenue trends.
- **📈 Demand Forecasting**: AI-powered predictions with confidence intervals for future bookings and demand.
- **💰 Dynamic Pricing**: Smart pricing recommendations driven by competitor analysis, demand surges, and historical data.
- **🤖 AI Copilot**: Natural language interface for querying complex revenue data, generating reports, and writing SQL.
- **📈 Business Intelligence (BI)**: Extensive, customizable charts and reporting tools for stakeholders.
- **🔄 Pipeline Monitor**: Track backend data engineering workflows (e.g., Snowflake ETL, Airflow DAGs).
- **👥 Customer Segments**: Analyze passenger demographics, CLV (Customer Lifetime Value), and behavior patterns.
- **🚨 Alerts Engine**: Real-time anomaly detection for sudden demand drops, competitor price changes, or operational issues.
- **🔍 Data Explorer**: Powerful tabular interface to filter, sort, and export raw data.

## 🛠 Tech Stack

### Frontend
- **Next.js 15 (App Router)** - React Framework
- **TypeScript** - Type Safety
- **Tailwind CSS v4** - Utility-first CSS & Modern Theming
- **shadcn/ui** - Accessible, customizable UI components
- **Recharts** - Responsive charting and data visualization
- **TanStack Table** - Headless UI for building powerful tables
- **Zustand** - Lightweight state management

### UI / UX Aesthetics
- **Enterprise Glassmorphism**: Sleek, modern cards with translucent backgrounds.
- **Dark & Light Modes**: Full support for both themes using `next-themes`.
- **Dynamic Micro-animations**: Smooth transitions and interactive data components.

*(Note: The current iteration operates using mock data interfaces to simulate the backend. The architecture is designed to seamlessly integrate with a FastAPI, PostgreSQL, and Snowflake backend in the future.)*

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.x or later) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/HarishSivakumar/Revenue-Pred.git
   cd Revenue-Pred
   ```

2. Install dependencies:
   ```bash
   npm install
   # or yarn install / pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or yarn dev / pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```text
src/
├── app/                  # Next.js App Router pages and layouts
├── components/           # Reusable UI components (shadcn, layout, widgets)
├── data/                 # Mock data layer (Simulates Snowflake/Postgres)
├── lib/                  # Utility functions and formatters
```

## 🔮 Future Roadmap

While v1 focuses exclusively on the **Airline domain**, the core architecture and UI components are built to be extensible. Future iterations may include modules for:
- 🏨 **Hotel Workspace**: Revenue optimization for hospitality chains.
- 🛒 **Retail Workspace**: Dynamic pricing for e-commerce and inventory management.
- 🚗 **Ride Sharing Workspace**: Surge pricing and driver allocation demand.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/HarishSivakumar/Revenue-Pred/issues).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
