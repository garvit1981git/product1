"use client";
import React, { useState } from "react";

// --- MOCK DATA ---
const salesData = [
  {
    customer: "Sarah Jenkins",
    date: "Aug 15, 2026",
    items: 3,
    products: "Classic T-Shirt (2), Running Sneakers (1)",
    category: "Mixed",
    total: 345.5,
    status: "Completed",
  },
  {
    customer: "Michael Chen",
    date: "Aug 15, 2026",
    items: 1,
    products: "Denim Jeans (1)",
    category: "Apparel",
    total: 120.0,
    status: "Receivable",
  },
  {
    customer: "Emma Thompson",
    date: "Aug 14, 2026",
    items: 5,
    products: "Classic T-Shirt (4), Denim Jeans (1)",
    category: "Apparel",
    total: 890.0,
    status: "Completed",
  },
  {
    customer: "David Rodriguez",
    date: "Aug 14, 2026",
    items: 2,
    products: "Leather Jacket (1), Running Sneakers (1)",
    category: "Mixed",
    total: 210.0,
    status: "Refunded",
  },
  {
    customer: "Lisa Carter",
    date: "Aug 13, 2026",
    items: 1,
    products: "Classic T-Shirt (1)",
    category: "Apparel",
    total: 75.0,
    status: "Completed",
  },
  {
    customer: "James Wilson",
    date: "Aug 13, 2026",
    items: 4,
    products: "Denim Jeans (2), Leather Jacket (2)",
    category: "Apparel",
    total: 540.25,
    status: "Completed",
  },
  {
    customer: "Alex Mercer",
    date: "Aug 12, 2026",
    items: 2,
    products: "Running Sneakers (2)",
    category: "Footwear",
    total: 180.0,
    status: "Receivable",
  },
  {
    customer: "Olivia Davis",
    date: "Aug 12, 2026",
    items: 1,
    products: "Leather Jacket (1)",
    category: "Apparel",
    total: 95.0,
    status: "Completed",
  },
];

// --- DYNAMIC TIMEFRAME DATA ---
const analyticsData = {
  Today: {
    revenue: 1250.0,
    revTrend: "+2.5%",
    revIsUp: true,
    orders: 14,
    ordTrend: "+1.0%",
    ordIsUp: true,
    aov: 89.28,
    aovTrend: "+1.5%",
    aovIsUp: true,
    receivables: 120.0,
    recCount: 1,
    units: 32,
    unitTrend: "+4.0%",
    unitIsUp: true,
    refundRate: "0.0%",
    refTrend: "0.0%",
    refIsUp: true,
  },
  "This Week": {
    revenue: 8450.75,
    revTrend: "+8.2%",
    revIsUp: true,
    orders: 86,
    ordTrend: "+4.1%",
    ordIsUp: true,
    aov: 98.26,
    aovTrend: "+3.8%",
    aovIsUp: true,
    receivables: 850.0,
    recCount: 4,
    units: 195,
    unitTrend: "+11.2%",
    unitIsUp: true,
    refundRate: "0.8%",
    refTrend: "-0.2%",
    refIsUp: true,
  },
  "This Month": {
    revenue: 45231.5,
    revTrend: "+14.5%",
    revIsUp: true,
    orders: 312,
    ordTrend: "+5.2%",
    ordIsUp: true,
    aov: 144.97,
    aovTrend: "+2.1%",
    aovIsUp: true,
    receivables: 3450.0,
    recCount: 12,
    units: 845,
    unitTrend: "+18.4%",
    unitIsUp: true,
    refundRate: "1.2%",
    refTrend: "+0.4%",
    refIsUp: false,
  },
};

const SalesComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [timeframe, setTimeframe] = useState("This Month");

  // Get the data for the currently selected timeframe
  const currentData = analyticsData[timeframe];

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const filteredSales = salesData.filter((order) => {
    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch =
      order.customer.toLowerCase().includes(lowerQuery) ||
      order.products.toLowerCase().includes(lowerQuery) ||
      order.category.toLowerCase().includes(lowerQuery);

    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All" || order.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="w-full flex flex-col gap-4 max-w-[1600px] mx-auto">
      {/* 1. HEADER & TIMEFRAME TOGGLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-1 py-1 rounded-2xl gap-1">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Sales Records
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Keep track of your customers and incoming money
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
            {["Today", "This Week", "This Month"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  timeframe === tf
                    ? "bg-white text-indigo-900 shadow-sm ring-1 ring-black/5"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button className="px-5 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors shadow-sm w-full sm:w-auto">
            Export Report
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC 6-POINT ANALYTICS GRID (Simplified Language + Descriptions) */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 w-full">
        
        {/* Metric 1: Total Sales */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              Total Sales
            </p>
            <p className="text-[9px] font-medium text-gray-400 mb-2 leading-tight">
              All money coming in from purchases
            </p>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            {formatMoney(currentData.revenue)}
          </h3>
          <span className={`text-[10px] font-bold mt-2 ${currentData.revIsUp ? "text-emerald-600" : "text-rose-600"}`}>
            {currentData.revTrend} vs last period
          </span>
        </div>

        {/* Metric 2: Total Orders */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              Number of Orders
            </p>
            <p className="text-[9px] font-medium text-gray-400 mb-2 leading-tight">
              How many times customers bought from you
            </p>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            {currentData.orders}
          </h3>
          <span className={`text-[10px] font-bold mt-2 ${currentData.ordIsUp ? "text-emerald-600" : "text-rose-600"}`}>
            {currentData.ordTrend} vs last period
          </span>
        </div>

        {/* Metric 3: Avg Order Value */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              Average Sale Amount
            </p>
            <p className="text-[9px] font-medium text-gray-400 mb-2 leading-tight">
              The usual amount a customer spends
            </p>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            {formatMoney(currentData.aov)}
          </h3>
          <span className={`text-[10px] font-bold mt-2 ${currentData.aovIsUp ? "text-emerald-600" : "text-rose-600"}`}>
            {currentData.aovTrend} vs last period
          </span>
        </div>

        {/* Metric 4: Pending Receivables */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-0.5">
              Money Owed To You
            </p>
            <p className="text-[9px] font-medium text-amber-600 mb-2 leading-tight">
              Sales that have not been paid yet
            </p>
          </div>
          <h3 className="text-2xl font-extrabold text-amber-700">
            {formatMoney(currentData.receivables)}
          </h3>
          <span className="text-[10px] font-bold text-amber-600 mt-2">
            {currentData.recCount} Unpaid orders
          </span>
        </div>

        {/* Metric 5: Units Sold */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              Total Items Sold
            </p>
            <p className="text-[9px] font-medium text-gray-400 mb-2 leading-tight">
              Physical products given to customers
            </p>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            {currentData.units}
          </h3>
          <span className={`text-[10px] font-bold mt-2 ${currentData.unitIsUp ? "text-emerald-600" : "text-rose-600"}`}>
            {currentData.unitTrend} vs last period
          </span>
        </div>

        {/* Metric 6: Refund Rate */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              Refunds & Returns
            </p>
            <p className="text-[9px] font-medium text-gray-400 mb-2 leading-tight">
              Percentage of purchases returned
            </p>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            {currentData.refundRate}
          </h3>
          <span className={`text-[10px] font-bold mt-2 ${currentData.refIsUp ? "text-emerald-600" : "text-rose-600"}`}>
            {currentData.refTrend} vs last period
          </span>
        </div>
      </div>

      {/* 3. SEARCH & FILTER CONTROLS */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-3 items-center">
        <div className="flex-1 w-full relative">
          <input
            type="text"
            placeholder="Search by customer, product, or category..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#cdb4db] transition-all text-sm font-medium"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="w-full lg:w-48 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#cdb4db] text-sm font-bold text-gray-700 transition-all cursor-pointer"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Apparel">Apparel</option>
          <option value="Footwear">Footwear</option>
          <option value="Mixed">Mixed</option>
        </select>

        <select
          className="w-full lg:w-48 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#cdb4db] text-sm font-bold text-gray-700 transition-all cursor-pointer"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Completed">Completed</option>
          <option value="Receivable">Receivable</option>
          <option value="Refunded">Refunded</option>
        </select>
      </div>

      {/* 4. SALES DATA TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-1/5">
                  Customer
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-1/3">
                  Products Sold
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">
                  Quantity
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSales.map((order, index) => {
                const statusStyles =
                  order.status === "Completed"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : order.status === "Receivable"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-rose-50 text-rose-700 border-rose-200";

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 shrink-0 rounded-full bg-[#cdb4db]/30 flex items-center justify-center text-xs font-bold text-gray-800">
                          {order.customer.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-gray-700 whitespace-nowrap">
                          {order.customer}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-600 line-clamp-2">
                        {order.products}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-md">
                        {order.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                        {order.date}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-extrabold text-gray-700">
                        {order.items}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-md border whitespace-nowrap ${statusStyles}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-extrabold text-gray-900">
                        {formatMoney(order.total)}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="w-12 h-12 text-gray-300 mb-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                      <p className="text-gray-500 font-medium">
                        No sales records found matching "{searchQuery}"
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesComponent;