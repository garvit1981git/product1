"use client";
import React, { useState } from "react";

// --- MOCK DATA ---
const expenseData = [
  {
    vendor: "Global Wholesale Co.",
    date: "Aug 15, 2026",
    description: "Restock: T-Shirts & Sneakers",
    category: "Inventory",
    amount: 3250.0,
    status: "Paid",
  },
  {
    vendor: "AWS Cloud Services",
    date: "Aug 15, 2026",
    description: "Monthly Server Hosting",
    category: "Software",
    amount: 124.5,
    status: "Paid",
  },
  {
    vendor: "City Utilities",
    date: "Aug 14, 2026",
    description: "Electricity & Water Bill",
    category: "Utilities",
    amount: 410.0,
    status: "Pending",
  },
  {
    vendor: "Shopify",
    date: "Aug 14, 2026",
    description: "E-commerce Platform Fee",
    category: "Software",
    amount: 79.0,
    status: "Paid",
  },
  {
    vendor: "Elite Packaging",
    date: "Aug 13, 2026",
    description: "Branded Boxes & Tape",
    category: "Supplies",
    amount: 850.0,
    status: "Pending",
  },
  {
    vendor: "Fix-It Right Repairs",
    date: "Aug 13, 2026",
    description: "HVAC Maintenance",
    category: "Maintenance",
    amount: 250.0,
    status: "Paid",
  },
  {
    vendor: "Google Ads",
    date: "Aug 12, 2026",
    description: "Summer Campaign Marketing",
    category: "Marketing",
    amount: 600.0,
    status: "Paid",
  },
  {
    vendor: "FastShip Logistics",
    date: "Aug 12, 2026",
    description: "Freight Delivery Charges",
    category: "Shipping",
    amount: 180.5,
    status: "Pending",
  },
];

// --- DYNAMIC TIMEFRAME DATA ---
const analyticsData = {
  Today: {
    totalSpent: 3374.5,
    spendTrend: "+5.2%",
    spendIsUp: false,
    pendingBills: 410.0,
    pendingCount: 1,
    avgExpense: 1687.25,
    avgTrend: "+1.5%",
    topCategory: "Inventory",
    topCatAmount: 3250.0,
    transactions: 2,
    transTrend: "0%",
    budgetUsed: "12%",
    budgetTrend: "+1%",
  },
  "This Week": {
    totalSpent: 5744.0,
    spendTrend: "-2.1%",
    spendIsUp: false,
    pendingBills: 1440.5,
    pendingCount: 3,
    avgExpense: 718.0,
    avgTrend: "-5.4%",
    topCategory: "Inventory",
    topCatAmount: 3250.0,
    transactions: 8,
    transTrend: "+12%",
    budgetUsed: "45%",
    budgetTrend: "-3%",
  },
  "This Month": {
    totalSpent: 18450.75,
    spendTrend: "-8.4%",
    spendIsUp: false,
    pendingBills: 3240.0,
    pendingCount: 7,
    avgExpense: 410.0,
    avgTrend: "-12.1%",
    topCategory: "Inventory",
    topCatAmount: 11500.0,
    transactions: 45,
    transTrend: "+5%",
    budgetUsed: "78%",
    budgetTrend: "-15%",
  },
};

const ExpenseComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [timeframe, setTimeframe] = useState("This Week");

  const currentData = analyticsData[timeframe];

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const filteredExpenses = expenseData.filter((expense) => {
    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch =
      expense.vendor.toLowerCase().includes(lowerQuery) ||
      expense.description.toLowerCase().includes(lowerQuery) ||
      expense.category.toLowerCase().includes(lowerQuery);

    const matchesStatus =
      statusFilter === "All" || expense.status === statusFilter;
    const matchesCategory =
      categoryFilter === "All" || expense.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="w-full flex flex-col gap-4 max-w-[1600px] mx-auto">
      {/* 1. HEADER & TIMEFRAME TOGGLE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-1 py-1 rounded-2xl gap-1">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Expenses (Money Out)
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Keep track of your bills and money spent
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
            {["Today", "This Week", "This Month"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  timeframe === tf
                    ? "bg-white text-rose-900 shadow-sm ring-1 ring-black/5"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button className="px-5 py-2.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm w-full sm:w-auto">
            + Log Expense
          </button>
        </div>
      </div>

      {/* 2. DYNAMIC 6-POINT ANALYTICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2 w-full">
        {/* Metric 1: Total Spent */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              Total Money Spent
            </p>
            <p className="text-[9px] font-medium text-gray-400 mb-2 leading-tight">
              All money going out of your business
            </p>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            {formatMoney(currentData.totalSpent)}
          </h3>
          <span
            className={`text-[10px] font-bold mt-2 ${!currentData.spendIsUp ? "text-emerald-600" : "text-rose-600"}`}
          >
            {currentData.spendTrend} vs last period
          </span>
        </div>

        {/* Metric 2: Pending Bills */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-0.5">
              Unpaid Bills
            </p>
            <p className="text-[9px] font-medium text-amber-600 mb-2 leading-tight">
              Bills you still need to pay
            </p>
          </div>
          <h3 className="text-2xl font-extrabold text-amber-700">
            {formatMoney(currentData.pendingBills)}
          </h3>
          <span className="text-[10px] font-bold text-amber-600 mt-2">
            {currentData.pendingCount} Unpaid bills
          </span>
        </div>

        {/* Metric 3: Top Spend Category */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              Biggest Expense
            </p>
            <p className="text-[9px] font-medium text-gray-400 mb-2 leading-tight">
              Where you spend the most money
            </p>
          </div>
          <h3 className="text-xl font-extrabold text-gray-900 truncate">
            {currentData.topCategory}
          </h3>
          <span className="text-[10px] font-bold text-gray-500 mt-2">
            {formatMoney(currentData.topCatAmount)} spent
          </span>
        </div>

        {/* Metric 4: Avg Expense Size */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              Average Bill Size
            </p>
            <p className="text-[9px] font-medium text-gray-400 mb-2 leading-tight">
              The usual amount you spend at once
            </p>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            {formatMoney(currentData.avgExpense)}
          </h3>
          <span className="text-[10px] font-bold text-emerald-600 mt-2">
            {currentData.avgTrend} vs last period
          </span>
        </div>

        {/* Metric 5: Transaction Count */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              Number of Payments
            </p>
            <p className="text-[9px] font-medium text-gray-400 mb-2 leading-tight">
              How many separate times you paid
            </p>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            {currentData.transactions}
          </h3>
          <span className="text-[10px] font-bold text-gray-500 mt-2">
            {currentData.transTrend} vs last period
          </span>
        </div>

        {/* Metric 6: Budget Utilization */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-800 uppercase tracking-wider mb-0.5">
              Budget Used
            </p>
            <p className="text-[9px] font-medium text-gray-400 mb-2 leading-tight">
              How much of your planned money is gone
            </p>
          </div>
          <h3 className="text-2xl font-extrabold text-gray-900">
            {currentData.budgetUsed}
          </h3>
          <span className="text-[10px] font-bold text-emerald-600 mt-2">
            {currentData.budgetTrend} vs last period
          </span>
        </div>
      </div>

      {/* 3. SEARCH & FILTER CONTROLS */}
      <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-3 items-center">
        <div className="flex-1 w-full relative">
          <input
            type="text"
            placeholder="Search by vendor, description, or category..."
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
          <option value="Inventory">Inventory</option>
          <option value="Software">Software</option>
          <option value="Utilities">Utilities</option>
          <option value="Supplies">Supplies</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Marketing">Marketing</option>
          <option value="Shipping">Shipping</option>
        </select>

        <select
          className="w-full lg:w-48 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#cdb4db] text-sm font-bold text-gray-700 transition-all cursor-pointer"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* 4. EXPENSE DATA TABLE */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-1/5">
                  Paid To
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-1/3">
                  For What
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredExpenses.map((expense, index) => {
                const statusStyles =
                  expense.status === "Paid"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-amber-50 text-amber-700 border-amber-200";

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 shrink-0 rounded-full bg-rose-100 flex items-center justify-center text-xs font-bold text-rose-700">
                          {expense.vendor.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-gray-700 whitespace-nowrap">
                          {expense.vendor}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-600 line-clamp-2">
                        {expense.description}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2.5 py-1 rounded-md">
                        {expense.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-500 whitespace-nowrap">
                        {expense.date}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-md border whitespace-nowrap ${statusStyles}`}
                      >
                        {expense.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <span className="text-sm font-extrabold text-gray-900">
                        -{formatMoney(expense.amount)}
                      </span>
                    </td>
                  </tr>
                );
              })}

              {filteredExpenses.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-gray-500 font-medium">
                        No expenses found matching "{searchQuery}"
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

export default ExpenseComponent;
