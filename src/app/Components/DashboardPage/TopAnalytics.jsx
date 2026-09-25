"use client";
import React, { useState } from "react";

const TopAnalytics = () => {
  // 1. Timeframe State
  const [timeframe, setTimeframe] = useState("This Month");

  // 2. The Data (Includes all your original data points)
  const data = {
    Today: { sales: 450, cashflow: 200, rec: 0, pay: 150, inv: 50, orders: 12 },
    "This Week": {
      sales: 3200,
      cashflow: 1100,
      rec: 400,
      pay: 800,
      inv: 600,
      orders: 78,
    },
    "This Month": {
      sales: 14500,
      cashflow: 4200,
      rec: 1200,
      pay: 3400,
      inv: 4500,
      orders: 315,
    },
  };

  const currentData = data[timeframe];

  // Helper to format currency
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="w-full">
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
            Store Overview
          </h1>
          <p className="text-gray-500 text-sm mt-1 font-bold">
            A quick look at how your business is doing.
          </p>
        </div>

        {/* TIMEFRAME BUTTONS */}
        <div className="flex bg-white/60 border border-gray-200 p-1.5 rounded-xl shadow-sm w-full md:w-auto">
          {["Today", "This Week", "This Month"].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`flex-1 md:flex-none px-4 py-2 text-sm font-bold rounded-lg transition-all ${
                timeframe === tf
                  ? "bg-white text-black shadow-md ring-1 ring-black/5"
                  : "text-gray-500 hover:text-black hover:bg-white/40"
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* THE 5 ANALYTICS BLOCKS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
        {/* 1. TOTAL SALES */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-gray-100 flex flex-col justify-between hover:border-gray-200 transition-colors">
          <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
            Total Sales
          </p>
          <h3 className="text-3xl font-black text-gray-900">
            {formatMoney(currentData.sales)}
          </h3>
        </div>

        {/* 2. MONEY LEFT OVER (Cashflow) */}
        <div className="bg-emerald-50 p-5 rounded-2xl shadow-sm border-2 border-emerald-100 flex flex-col justify-between">
          <p className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-2">
            Money Left Over
          </p>
          <h3 className="text-3xl font-black text-emerald-600">
            {currentData.cashflow >= 0 ? "+" : ""}
            {formatMoney(currentData.cashflow)}
          </h3>
        </div>

        {/* 3. PENDING MONEY (Receivables & Payables Combined) */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-gray-100 flex flex-col justify-between hover:border-gray-200 transition-colors">
          <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
            Pending Money
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Owed To You
              </span>
              <span className="text-lg font-black text-amber-600">
                {formatMoney(currentData.rec)}
              </span>
            </div>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                You Owe
              </span>
              <span className="text-lg font-black text-rose-600">
                {formatMoney(currentData.pay)}
              </span>
            </div>
          </div>
        </div>

        {/* 4. STOCK BOUGHT (Inventory) */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-gray-100 flex flex-col justify-between hover:border-gray-200 transition-colors">
          <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-2">
            Stock Bought
          </p>
          <h3 className="text-3xl font-black text-gray-900">
            {formatMoney(currentData.inv)}
          </h3>
        </div>

        {/* 5. ORDER DETAILS (Orders & Average combined) */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border-2 border-gray-100 flex flex-col justify-between hover:border-gray-200 transition-colors">
          <p className="text-xs font-black text-gray-400 uppercase tracking-wider mb-3">
            Order Details
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Total Orders
              </span>
              <span className="text-lg font-black text-gray-900">
                {currentData.orders || 0}
              </span>
            </div>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Avg. Sale
              </span>
              <span className="text-lg font-black text-emerald-600">
                {formatMoney(currentData.sales / (currentData.orders || 1))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopAnalytics;
