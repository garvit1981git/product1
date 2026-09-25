"use client";
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- MOCK DATA ---
const generateData = (count, labelPrefix, baseValue, volatility) => {
  return Array.from({ length: count }).map((_, index) => ({
    time: `${labelPrefix} ${index + 1}`,
    sales: Math.round(baseValue + Math.random() * volatility - volatility / 4),
  }));
};

const storeData = {
  daily: {
    label: "Today",
    total: 1450,
    chart: generateData(14, "Hr", 100, 250),
  },
  weekly: {
    label: "This Week",
    total: 8240,
    chart: [
      { time: "Mon", sales: 1250 },
      { time: "Tue", sales: 980 },
      { time: "Wed", sales: 1420 },
      { time: "Thu", sales: 1810 },
      { time: "Fri", sales: 3250 },
      { time: "Sat", sales: 4800 },
      { time: "Sun", sales: 4150 },
    ],
  },
  monthly: {
    label: "This Month",
    total: 34500,
    chart: generateData(30, "Day", 1000, 1500),
  },
  yearly: {
    label: "This Year",
    total: 245000,
    chart: generateData(12, "Month", 20000, 10000),
  },
};

const SalesChart = () => {
  const [timeframe, setTimeframe] = useState("weekly");
  const activeData = storeData[timeframe];

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    // FIXED: Removed lg:row-span-0. It is just lg:col-span-2 now.
    <div className="w-full lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col min-h-[300px]">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4 gap-4">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
            Net Sales
          </p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {formatCurrency(activeData.total)}
            </h2>
          </div>
        </div>

        {/* TIMEFRAME TOGGLES */}
        <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-100">
          {["daily", "weekly", "monthly", "yearly"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md capitalize transition-all ${
                timeframe === tf
                  ? "bg-white text-indigo-900 shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* THE GRAPH */}
      {/* FIXED: Replaced flex-1 and min-h with a STRICT h-[250px] so it stops breaking the scroll calculation */}
      <div className="w-full h-[250px] mt-2">
        <ResponsiveContainer width="99%" height="100%">
          <AreaChart
            data={activeData.chart}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00B7CD" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00B7CD" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f3f4f6"
            />
            <XAxis
              dataKey="time"
              stroke="#9ca3af"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
              minTickGap={20}
            />
            <YAxis
              stroke="#9ca3af"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ color: "#4f46e5", fontWeight: "bold" }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#00B7CD"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorSales)"
              activeDot={{ r: 6, fill: "#00B7CD", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SalesChart;
