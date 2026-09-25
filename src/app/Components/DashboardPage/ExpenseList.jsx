"use client";
import React from "react";

const recentExpenses = [
  { id: 1, name: "Wholesale Supplies", category: "Inventory", amount: 450.0, date: "Today, 11:30 AM" },
  { id: 2, name: "Shopify Subscription", category: "Software", amount: 29.0, date: "Today, 09:00 AM" },
  { id: 3, name: "Electricity Bill", category: "Utilities", amount: 120.0, date: "Yesterday" },
  { id: 4, name: "Store Maintenance", category: "Repair", amount: 75.5, date: "Yesterday" },
  { id: 5, name: "Packaging Materials", category: "Supplies", amount: 210.0, date: "Aug 12" },
  { id: 6, name: "Internet Bill", category: "Utilities", amount: 60.0, date: "Aug 10" },
  { id: 7, name: "Store Maintenance", category: "Repair", amount: 75.5, date: "Yesterday" },
  { id: 8, name: "Packaging Materials", category: "Supplies", amount: 210.0, date: "Aug 12" },
  { id: 9, name: "Internet Bill", category: "Utilities", amount: 60.0, date: "Aug 10" },
  { id: 10, name: "Store Maintenance", category: "Repair", amount: 75.5, date: "Yesterday" },
  { id: 11, name: "Packaging Materials", category: "Supplies", amount: 210.0, date: "Aug 12" },
  { id: 12, name: "Store Maintenance", category: "Repair", amount: 75.5, date: "Yesterday" },
];

const ExpenseList = () => {
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    // 1. ADDED overflow-hidden here to stop the card from stretching!
    <div className="w-full h-full bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col lg:col-span-1 lg:row-span-2 overflow-hidden">
      
      {/* WIDGET HEADER */}
      <div className="flex justify-between items-center mb-6 shrink-0">
        <h3 className="text-lg font-extrabold text-gray-900 tracking-tight">
          Recent Expenses
        </h3>
        <button className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
          View All
        </button>
      </div>

      {/* SCROLLABLE LIST */}
      {/* 2. ADDED flex-1 overflow-y-auto here so only the items scroll! */}
      <div className="flex flex-col gap-5 flex-1 overflow-y-auto pr-2">
        {recentExpenses.map((expense) => (
          <div key={expense.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 shrink-0 rounded-xl bg-rose-50 flex items-center justify-center font-bold text-sm text-rose-600 shadow-sm">
                {expense.category.charAt(0)}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900 line-clamp-1">
                  {expense.name}
                </span>
                <span className="text-[10px] font-semibold text-gray-500">
                  {expense.date}
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-sm font-extrabold text-gray-900">
                -{formatMoney(expense.amount)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;