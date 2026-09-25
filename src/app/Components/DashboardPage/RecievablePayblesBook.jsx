"use client";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

// --- MOCK DATA FOR BIG ORDERS (ADVANCE & BREAKDOWNS) ---
const bigOrderRecords = [
  {
    id: 1,
    name: "MegaMart Wholesalers",
    type: "Owed To You", // Money they owe you for a big order
    description: "500x Winter Jackets Bulk Order",
    date: "Aug 15, 2026",
    totalAmount: 120000,
    breakdown: {
      advance: 30000,
      receivedToday: 20000,
      pending: 70000,
    },
    status: "Partially Paid",
  },
  {
    id: 2,
    name: "Global Textile Mills",
    type: "You Owe", // Bill you owe for bulk manufacturing stock
    description: "Raw Cotton Fabric Supply",
    date: "Aug 12, 2026",
    totalAmount: 250000,
    breakdown: {
      advance: 50000,
      receivedToday: 50000, // Paid today
      pending: 150000,
    },
    status: "Partially Paid",
  },
  {
    id: 3,
    name: "Downtown Retail Group",
    type: "Owed To You",
    description: "150x Premium Denim Jeans",
    date: "Aug 10, 2026",
    totalAmount: 95000,
    breakdown: {
      advance: 20000,
      receivedToday: 75000,
      pending: 0,
    },
    status: "Fully Paid",
  },
];

const RecievablePayblesBook = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tabFilter, setTabFilter] = useState("All"); // "All", "Owed To You", "You Owe"

  // Track which row's dropdown is currently open
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredRecords = bigOrderRecords.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = tabFilter === "All" || record.type === tabFilter;

    return matchesSearch && matchesTab;
  });

  return (
    <div className="w-full flex flex-col gap-6 max-w-[1600px] mx-auto font-sans text-gray-900 pb-12">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-1">
        <div>
          <h1 className="text-2xl font-black tracking-tight">
            Big Orders Payment Tracker
          </h1>
          <p className="text-sm font-bold text-gray-500 mt-1">
            Manage large bulk transactions, advance payments, and pending
            balances.
          </p>
        </div>
      </div>

      {/* TABS & SEARCH CONTROLS */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200 w-full md:w-auto">
          {["All", "Owed To You", "You Owe"].map((tab) => (
            <button
              key={tab}
              onClick={() => setTabFilter(tab)}
              className={`flex-1 md:flex-none px-5 py-2 text-xs font-bold rounded-lg transition-all ${
                tabFilter === tab
                  ? "bg-white text-gray-900 shadow-sm border border-gray-200"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by client or order description..."
          className="w-full md:w-80 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:border-indigo-600 transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* RECORDS TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/75 border-b border-gray-200">
                <th className="w-12 px-4 py-4"></th>
                <th className="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Client / Vendor
                </th>
                <th className="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-4 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredRecords.map((record) => {
                const isExpanded = expandedRow === record.id;
                const isOwedToYou = record.type === "Owed To You";
                const badgeStyle = isOwedToYou
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-rose-50 text-rose-700 border-rose-200";

                return (
                  <React.Fragment key={record.id}>
                    {/* Main Row */}
                    <tr
                      onClick={() => toggleRow(record.id)}
                      className="hover:bg-gray-50/80 transition-colors cursor-pointer select-none"
                    >
                      {/* Dropdown Arrow Indicator */}
                      <td className="px-4 py-4 text-center text-gray-400 font-bold">
                        <span
                          className={`inline-block transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`}
                        >
                          <ChevronDown size={16} />
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-sm font-bold text-gray-900 block">
                          {record.name}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {record.date}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-md border ${badgeStyle}`}
                        >
                          {record.type}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-sm font-semibold text-gray-700">
                          {record.description}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-lg">
                          {record.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span
                          className={`text-base font-black ${isOwedToYou ? "text-amber-600" : "text-rose-600"}`}
                        >
                          {formatMoney(record.totalAmount)}
                        </span>
                      </td>
                    </tr>

                    {/* Dropdown Bifurcation Detail Row */}
                    {isExpanded && (
                      <tr className="bg-gray-50/50 border-b border-gray-200">
                        <td colSpan="6" className="px-8 py-4">
                          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex flex-col md:flex-row justify-around gap-4 text-center">
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                Advance Paid / Taken
                              </span>
                              <span className="text-lg font-black text-gray-800">
                                {formatMoney(record.breakdown.advance)}
                              </span>
                            </div>

                            <div className="hidden md:block w-px bg-gray-200"></div>

                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                Received / Paid Today
                              </span>
                              <span className="text-lg font-black text-emerald-600">
                                {formatMoney(record.breakdown.receivedToday)}
                              </span>
                            </div>

                            <div className="hidden md:block w-px bg-gray-200"></div>

                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                                Pending Balance
                              </span>
                              <span className="text-lg font-black text-rose-600">
                                {formatMoney(record.breakdown.pending)}
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}

              {filteredRecords.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-400 font-medium text-sm"
                  >
                    No large order records found matching "{searchQuery}"
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

export default RecievablePayblesBook;
