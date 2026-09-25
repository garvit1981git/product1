"use client";
import Link from "next/link";
import React, { useState } from "react";
import InventoryAnalytics from "./InventoryAnalytics";

const InventoryPage = () => {
  let [searchQuery, setSearchQuery] = useState("");
  let [activeFilter, setActiveFilter] = useState("All");

  const products = [
    {
      ProdName: "Classic T-Shirt",
      CostPrice: 100,
      SellingPrice: 400,
      Stock: { m: 2, l: 3, xl: 34, xxl: 23 },
      status: "Full Stock",
    },
    {
      ProdName: "Denim Jeans",
      CostPrice: 600,
      SellingPrice: 1500,
      Stock: { m: 1, l: 2, xl: 0, xxl: 0 },
      status: "Low Stock",
    },
    {
      ProdName: "Leather Jacket",
      CostPrice: 2000,
      SellingPrice: 4500,
      Stock: { m: 0, l: 0, xl: 0, xxl: 0 },
      status: "Out of Stock",
    },
    {
      ProdName: "Running Sneakers",
      CostPrice: 800,
      SellingPrice: 1200,
      Stock: { m: 10, l: 15, xl: 8, xxl: 2 },
      status: "Full Stock",
    },
    {
      ProdName: "Classic T-Shirt",
      CostPrice: 100,
      SellingPrice: 400,
      Stock: { m: 2, l: 3, xl: 34, xxl: 23 },
      status: "Full Stock",
    },
    {
      ProdName: "Denim Jeans",
      CostPrice: 600,
      SellingPrice: 1500,
      Stock: { m: 1, l: 2, xl: 0, xxl: 0 },
      status: "Low Stock",
    },
    {
      ProdName: "Leather Jacket",
      CostPrice: 2000,
      SellingPrice: 4500,
      Stock: { m: 0, l: 0, xl: 0, xxl: 0 },
      status: "Out of Stock",
    },
    {
      ProdName: "Running Sneakers",
      CostPrice: 800,
      SellingPrice: 1200,
      Stock: { m: 10, l: 15, xl: 8, xxl: 2 },
      status: "Full Stock",
    },
  ];

  // MAIN FILTER LOGIC (Case-insensitive search across product name)
  let filteredProducts = products.filter((item) => {
    let matchesSearch = item.ProdName.toLowerCase().includes(
      searchQuery.toLowerCase(),
    );
    let matchesFilter = activeFilter === "All" || item.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full min-h-screen bg-[#f2e8cf] p-6 md:p-10 flex justify-center font-sans">
      {/* EVERYTHING HELD IN ONE UNIFIED BOX */}
      <div className="bg-white w-full max-w-[1400px] h-fit rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200 flex flex-col gap-6">
        {/* TOP HEADER & NAVIGATION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-gray-100 gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Inventory Overview
            </h1>
            <p className="text-sm font-bold text-gray-500 mt-0.5">
              Track stock levels, costs, and product status
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm rounded-xl transition-colors border border-gray-200"
            >
              Home
            </Link>
            <Link
              href="/Dashboard"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
            >
              Dashboard
            </Link>
          </div>
        </div>

        {/* ANALYTICS SECTION */}
        <div className="w-full">
          <InventoryAnalytics />
        </div>

        {/* SECTION HEADER */}
        <div className="flex justify-between items-center mt-2">
          <h2 className="text-xl font-black text-gray-900">Inventory List</h2>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Showing {filteredProducts.length} items
          </span>
        </div>

        {/* SEARCH & FILTER CONTROLS */}
        <div className="flex flex-col sm:flex-row gap-3 items-center">
          <div className="flex-1 w-full">
            <input
              type="text"
              placeholder="🔍 Search products by name..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-medium transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select
            className="w-full sm:w-48 px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm font-bold text-gray-700 cursor-pointer transition-all"
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Full Stock">Full Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>

        {/* PRODUCT LIST CONTAINER */}
        <div className="flex flex-col gap-3">
          {filteredProducts.map((item, index) => {
            const totalStock =
              item.Stock.m + item.Stock.l + item.Stock.xl + item.Stock.xxl;

            const statusStyles =
              item.status === "Out of Stock"
                ? "text-rose-700 bg-rose-50 border-rose-200"
                : item.status === "Low Stock"
                  ? "text-amber-700 bg-amber-50 border-amber-200"
                  : "text-emerald-700 bg-emerald-50 border-emerald-200";

            return (
              <div
                key={index}
                className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 bg-gray-50/50 hover:bg-white rounded-2xl border border-gray-200/80 hover:border-indigo-600/30 transition-all shadow-sm gap-4"
              >
                {/* Product Info */}
                <div className="flex flex-col flex-1">
                  <h3 className="text-base font-extrabold text-gray-900 capitalize mb-1">
                    {item.ProdName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <span>
                      Cost:{" "}
                      <span className="text-gray-900">${item.CostPrice}</span>
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                    <span>
                      Sell:{" "}
                      <span className="text-indigo-600">
                        ${item.SellingPrice}
                      </span>
                    </span>
                  </div>
                </div>

                {/* Sizes Breakdown */}
                <div className="flex gap-1.5">
                  <div className="flex flex-col items-center justify-center w-11 h-11 bg-white rounded-xl border border-gray-200 shadow-2xs">
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      M
                    </span>
                    <span className="text-xs font-black text-gray-900">
                      {item.Stock.m}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center w-11 h-11 bg-white rounded-xl border border-gray-200 shadow-2xs">
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      L
                    </span>
                    <span className="text-xs font-black text-gray-900">
                      {item.Stock.l}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center w-11 h-11 bg-white rounded-xl border border-gray-200 shadow-2xs">
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      XL
                    </span>
                    <span className="text-xs font-black text-gray-900">
                      {item.Stock.xl}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-center w-11 h-11 bg-white rounded-xl border border-gray-200 shadow-2xs">
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      XXL
                    </span>
                    <span className="text-xs font-black text-gray-900">
                      {item.Stock.xxl}
                    </span>
                  </div>
                </div>

                {/* Totals & Status */}
                <div className="flex flex-col items-start lg:items-end min-w-[120px]">
                  <span className="text-xs font-bold text-gray-500 mb-1">
                    Total:{" "}
                    <span className="text-base font-black text-gray-900">
                      {totalStock}
                    </span>
                  </span>
                  <span
                    className={`text-[10px] uppercase tracking-widest font-extrabold px-3 py-0.5 rounded-lg border ${statusStyles}`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                  <button
                    onClick={() => alert(`Restocking ${item.ProdName}...`)}
                    className="flex-1 lg:flex-none text-xs font-bold px-4 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    Restock +
                  </button>
                  <button
                    onClick={() =>
                      alert(`Viewing details for ${item.ProdName}`)
                    }
                    className="flex-1 lg:flex-none text-xs font-bold px-4 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-2xs"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center text-gray-400 text-sm font-bold bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              No inventory items found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
