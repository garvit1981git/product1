"use client";
import React from "react";

// --- MOCK DATA ---
const aiInsights = [
  {
    id: 1,
    category: "Inventory Alert",
    title: "Fast-Moving Stock Warning",
    description: "Premium White T-Shirts are down to 12 units. Based on last year's data, this item sold out 3 times during this exact month.",
    actionText: "Restock Now",
    type: "critical", // red/rose
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
    )
  },
  {
    id: 2,
    category: "Seasonal Prediction",
    title: "Monsoon Season Approaching",
    description: "Local weather models predict heavy rains starting in 3 weeks. Recommend increasing stock of Raincoats and Umbrellas by 40% to meet projected demand.",
    actionText: "Find Suppliers",
    type: "prediction", // indigo
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
    )
  },
  {
    id: 3,
    category: "Sales Diagnosis",
    title: "Weekend Footfall Spike",
    description: "Store traffic is up 18% on Saturday mornings. Consider running a 'Happy Hour' flash sale on slow-moving inventory to clear shelf space.",
    actionText: "Setup Promotion",
    type: "opportunity", // emerald
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
    )
  }
];

const AiAnalytics = () => {
  // Helper function to map types to their specific colors
  const getColorStyles = (type) => {
    switch (type) {
      case "critical":
        return { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-100", button: "bg-rose-100 text-rose-700 hover:bg-rose-200" };
      case "prediction":
        return { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-100", button: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200" };
      case "opportunity":
        return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-100", button: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" };
      default:
        return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-100", button: "bg-gray-200 text-gray-800 hover:bg-gray-300" };
    }
  };

  return (
    // Component takes up exactly 2 columns in the grid
    <div className="w-full lg:col-span-2 bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col min-h-[250px]">
      
      {/* HEADER WITH AI "SPARKLE" ICON */}
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
        <div className="p-1.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg text-white shadow-sm">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-gray-900 tracking-tight">AI Store Assistant</h2>
          <p className="text-xs font-medium text-gray-500">Smart insights based on your store's data</p>
        </div>
      </div>

      {/* INSIGHTS FEED */}
      <div className="flex flex-col gap-3 flex-1">
        {aiInsights.map((insight) => {
          const styles = getColorStyles(insight.type);
          
          return (
            <div 
              key={insight.id} 
              className={`flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border ${styles.bg} ${styles.border} transition-all hover:shadow-sm`}
            >
              
              {/* Left Icon Badge */}
              <div className={`hidden sm:flex w-10 h-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm ${styles.text}`}>
                {insight.icon}
              </div>

              {/* Main Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${styles.text}`}>
                    {insight.category}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-0.5">{insight.title}</h4>
                <p className="text-xs font-medium text-gray-600 leading-relaxed">
                  {insight.description}
                </p>
              </div>

              {/* Action Button */}
              <div className="shrink-0 mt-2 sm:mt-0">
                <button className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${styles.button}`}>
                  {insight.actionText}
                </button>
              </div>

            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default AiAnalytics;