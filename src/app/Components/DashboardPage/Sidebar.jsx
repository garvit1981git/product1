import Link from "next/link";
import React from "react";

const Sidebar = ({ component, setcomponent }) => {
  let Navigation = ["/", "Inventory"];
  let NavigationBottom = ["Help", "Settings", "Log-out"];
  let NavigationMiddle = [
    "Overview",
    "Record-Payment",
    "Orders",
    "Sales",
    "Expenses",
    "Recievables And Paybles"
  ];

  return (
    // FIXED: Made this strictly 'fixed top-0 left-0 h-screen'
    <div className="fixed top-0 left-0 h-screen w-[20%] bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
      {/* Header / User Profile */}
      <div className="p-6 border-b border-gray-100 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#cdb4db] flex items-center justify-center text-gray-900 font-extrabold text-xl shadow-sm">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold capitalize tracking-tight text-gray-900">
              User1
            </span>
            <span className="text-xs font-bold text-gray-500">Store Owner</span>
          </div>
        </div>
      </div>

      {/* Links Container */}
      <div className="flex flex-col justify-between flex-1 px-4 pb-6 overflow-y-hidden">
        <div className="flex flex-col gap-6">
          {/* Top Navigation */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-3">
              Main Menu
            </span>
            {Navigation.map((item) => {
              let it = item === "/" ? "Home" : item;
              return (
                <Link
                  href={item}
                  key={item}
                  className="px-3 py-2.5 text-gray-600 hover:text-black hover:bg-[#cdb4db]/40 font-bold rounded-xl transition-all"
                >
                  {it}
                </Link>
              );
            })}
          </div>

          {/* Middle Navigation (Analytics) */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-3">
              Analytics & Reports
            </span>
            {NavigationMiddle.map((item) => (
              <div
                onClick={() => setcomponent(item)}
                key={item}
                className="px-3 py-2.5 text-gray-600 hover:text-black hover:bg-[#cdb4db]/40 font-bold rounded-xl transition-all capitalize"
              > 
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation (Settings etc.) */}
        <div className="flex flex-col gap-1 mt-8 pt-6 border-t border-gray-100">
          {NavigationBottom.map((item) => (
            <div
              onClick={() => setcomponent(item)}
              key={item}
              className="px-3 py-2.5 text-gray-500 hover:text-black hover:bg-gray-100 font-bold rounded-xl transition-all"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
