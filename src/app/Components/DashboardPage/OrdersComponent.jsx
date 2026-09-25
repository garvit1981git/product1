"use client";
import React, { useState } from "react";

// --- MOCK DATA ---
const ordersData = [
  {
    customer: "MegaMart West",
    date: "Aug 15, 2026",
    items: 200,
    products: "200x Winter Jackets",
    category: "Apparel",
    due: "Today at 4:00 PM",
    urgency: "now",
    status: "Waiting for Stock",
    total: 8500.0,
  },
  {
    customer: "Downtown Shop",
    date: "Aug 15, 2026",
    items: 50,
    products: "50x White T-Shirts",
    category: "Apparel",
    due: "Tomorrow Morning",
    urgency: "soon",
    status: "Waiting for Stock",
    total: 450.0,
  },
  {
    customer: "Sarah Jenkins",
    date: "Aug 14, 2026",
    items: 2,
    products: "2x Running Shoes",
    category: "Footwear",
    due: "Tomorrow Evening",
    urgency: "later",
    status: "Ready to Pack",
    total: 180.0,
  },
  {
    customer: "Mike's Shop",
    date: "Aug 13, 2026",
    items: 10,
    products: "10x Blue Jeans",
    category: "Apparel",
    due: "Aug 18, 2026",
    urgency: "later",
    status: "Ready to Pack",
    total: 600.0,
  },
  {
    customer: "Local Gym",
    date: "Aug 13, 2026",
    items: 30,
    products: "30x Water Bottles",
    category: "Accessories",
    due: "Aug 20, 2026",
    urgency: "later",
    status: "Ready to Pack",
    total: 150.0,
  },
];

const missingStuff = [
  { item: "Winter Jackets", short: 180 },
  { item: "White T-Shirts", short: 45 },
];

const missedSales = [
  { item: "Red Summer Dress", reason: "Didn't have it", askedBy: 4 },
  { item: "Waterproof Boots", reason: "Too expensive", askedBy: 2 },
];

const incomingSupplies = [
  { item: "White T-Shirts", qty: 100, arrives: "Tomorrow" },
  { item: "Blue Jeans", qty: 50, arrives: "Aug 18" },
];

const OrdersComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [urgencyFilter, setUrgencyFilter] = useState("All");

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const filteredOrders = ordersData.filter((order) => {
    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch =
      order.customer.toLowerCase().includes(lowerQuery) ||
      order.products.toLowerCase().includes(lowerQuery) ||
      order.category.toLowerCase().includes(lowerQuery);

    const matchesCategory =
      categoryFilter === "All" || order.category === categoryFilter;
    const matchesUrgency =
      urgencyFilter === "All" || order.urgency === urgencyFilter;

    return matchesSearch && matchesCategory && matchesUrgency;
  });

  return (
    <div className="w-full flex flex-col gap-4 max-w-[1600px] mx-auto">
      
      {/* 1. HEADER & NEW ORDER BUTTON */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-1 py-1 rounded-2xl gap-1">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Active Orders To-Do List
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            Manage future customer orders, check quantities, and track delivery deadlines
          </p>
        </div>

        <button className="px-5 py-2.5 text-sm font-bold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors shadow-sm w-full sm:w-auto">
          + New Order
        </button>
      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
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
          <option value="Accessories">Accessories</option>
        </select>

        <select
          className="w-full lg:w-48 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#cdb4db] text-sm font-bold text-gray-700 transition-all cursor-pointer"
          value={urgencyFilter}
          onChange={(e) => setUrgencyFilter(e.target.value)}
        >
          <option value="All">All Urgencies</option>
          <option value="now">Urgent (Due Today)</option>
          <option value="soon">Soon</option>
          <option value="later">Later</option>
        </select>
      </div>

      {/* 3. MAIN LAYOUT: ORDERS TABLE ON LEFT, SUGGESTIONS ON RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* LEFT COLUMN: FULL DETAILED ORDERS TABLE */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-1/4">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider w-1/3">
                    Products Description
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
                    Due / Urgency
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">
                    Total Amount
                  </th>
                  <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order, index) => {
                  const urgencyStyle =
                    order.urgency === "now"
                      ? "bg-rose-50 text-rose-700 border-rose-200"
                      : order.urgency === "soon"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-gray-100 text-gray-700 border-gray-200";

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
                          className={`text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-md border whitespace-nowrap ${urgencyStyle}`}
                        >
                          {order.due}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-extrabold text-gray-900">
                          {formatMoney(order.total)}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => alert(`Marking order for ${order.customer} as Done!`)}
                          className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-extrabold text-xs rounded-xl transition-colors whitespace-nowrap shadow-2xs"
                        >
                          Done ✓
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan="8" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-gray-500 font-medium">
                          No orders found matching "{searchQuery}"
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: SUGGESTIONS & ALERTS BLOCKS */}
        <div className="flex flex-col gap-4">

          {/* BOX 1: Not Enough Items */}
          <div className="bg-rose-50/60 rounded-2xl shadow-sm border border-rose-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⚠️</span>
              <h2 className="text-sm font-extrabold text-rose-900 uppercase tracking-wider">Not Enough Items</h2>
            </div>
            <p className="text-[11px] font-medium text-rose-700 mb-3">You need these to finish active orders.</p>
            <div className="flex flex-col gap-2">
              {missingStuff.map((item, i) => (
                <div key={i} className="bg-white p-3 rounded-xl flex justify-between items-center shadow-2xs border border-rose-100">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{item.item}</h4>
                    <p className="text-[10px] font-bold text-rose-600 mt-0.5">Short by {item.short} units</p>
                  </div>
                  <button onClick={() => alert(`Restocking ${item.item}...`)} className="text-[10px] font-bold px-2.5 py-1.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
                    Buy +
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BOX 2: Lost Sales */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider mb-1">Lost Sales</h2>
            <p className="text-[11px] font-medium text-gray-400 mb-3">Customer requests that resulted in no sales.</p>
            <div className="flex flex-col gap-2">
              {missedSales.map((sale, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{sale.item}</h4>
                    <span className="text-[10px] font-medium text-gray-500">Reason: {sale.reason}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded-md">
                    {sale.askedBy}x
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BOX 3: Items Coming Soon */}
          <div className="bg-emerald-50/60 rounded-2xl shadow-sm border border-emerald-100 p-4">
            <h2 className="text-sm font-extrabold text-emerald-900 uppercase tracking-wider mb-3">Items Coming Soon</h2>
            <div className="flex flex-col gap-2">
              {incomingSupplies.map((supply, i) => (
                <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-2xs border border-emerald-100">
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">{supply.item}</h4>
                    <p className="text-[10px] font-medium text-gray-500 mt-0.5">{supply.qty} units incoming</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                    {supply.arrives}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default OrdersComponent;