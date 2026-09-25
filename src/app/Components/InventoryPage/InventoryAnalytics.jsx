"use client";
import React from "react";

const InventoryAnalytics = () => {
  // Mock calculated data based on your UI
  const analyticsData = {
    totalUnits: 104, // 62 + 3 + 0 + 35...
    totalCategories: 8,
    restockedThisMonth: 120,
    capitalLocked: 11400, // Total Cost of goods on hand
    potentialProfit: 35200, // Total Sell value minus Total Cost
    actionItems: 2, // Low stock + Out of stock items
  };

  const formatCurrency = (val) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
      
      {/* 1. Total Stock (Your Idea) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
          Total Units
        </p>
        <h3 className="text-2xl font-extrabold text-gray-900">
          {analyticsData.totalUnits}
        </h3>
      </div>

      {/* 2. Total Categories (Your Idea) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
          Categories
        </p>
        <h3 className="text-2xl font-extrabold text-gray-900">
          {analyticsData.totalCategories}
        </h3>
      </div>

      {/* 3. Stockup This Month (Your Idea) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
          Added This Month
        </p>
        <h3 className="text-2xl font-extrabold text-indigo-600">
          +{analyticsData.restockedThisMonth}
        </h3>
      </div>

      {/* 4. Capital Locked (New Idea) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
          Capital Locked
        </p>
        <h3 className="text-2xl font-extrabold text-gray-900">
          {formatCurrency(analyticsData.capitalLocked)}
        </h3>
      </div>

      {/* 5. Potential Profit (New Idea) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
          Proj. Gross Profit
        </p>
        <h3 className="text-2xl font-extrabold text-emerald-600">
          {formatCurrency(analyticsData.potentialProfit)}
        </h3>
      </div>

      {/* 6. Action Items / Risk (New Idea) */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-rose-100 flex flex-col justify-between">
        <p className="text-[10px] font-bold text-rose-500 uppercase tracking-wider mb-1">
          Needs Restock
        </p>
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-extrabold text-rose-600">
            {analyticsData.actionItems}
          </h3>
          <span className="text-[10px] font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">
            Alerts
          </span>
        </div>
      </div>

    </div>
  );
};

export default InventoryAnalytics;