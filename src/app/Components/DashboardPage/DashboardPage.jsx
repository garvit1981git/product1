"use client";
import React from "react";
import Sidebar from "./Sidebar";
import SalesChart from "./SalesChart";
import TopAnalytics from "./TopAnalytics";
import ExpenseList from "./ExpenseList";
import AiAnalytics from "./AiAnalytics";
import SalesComponent from "./SalesComponent";
import ExpenseComponent from "./ExpenseComponent";
import OrdersComponent from "./OrdersComponent";
import PosComponent from "./PosComponent,";
import RecievablePayblesBook from "./RecievablePayblesBook";
// import PosComponent from "./PosComponent"; // <-- Fixed the typo here (removed the comma)

const DashboardPage = () => {
  let [component, setcomponent] = React.useState("Overview");
  console.log("this is the component", component);

  return (
    <div className="min-h-screen w-full bg-[#f2e8cf] font-sans flex">
      {/* SIDEBAR */}
      <Sidebar setcomponent={setcomponent} component={component} />

      {/* MAIN CONTENT AREA */}
      {/* FIXED: Removed overflow-x-hidden from here so the POS cart can stick! */}
      <main className="ml-[20%] w-[80%] min-h-screen">
        {component == "Overview" && (
          <div className="flex flex-col gap-6 p-4 md:p-6 mx-auto max-w-[1600px]">
            <TopAnalytics />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
              <SalesChart />
              <ExpenseList />
              <AiAnalytics />
            </div>
          </div>
        )}

        {component == "Sales" && (
          <div className="flex flex-col gap-6 p-4 md:p-6 mx-auto max-w-[1600px]">
            <SalesComponent />
          </div>
        )}

        {component == "Expenses" && (
          <div className="flex flex-col gap-6 p-4 md:p-6 mx-auto max-w-[1600px]">
            <ExpenseComponent />
          </div>
        )}

        {/* Note: You tied Ai-Reports to Orders Component */}
        {component == "Orders" && (
          <div className="flex flex-col gap-6 p-4 md:p-6 mx-auto max-w-[1600px]">
            <OrdersComponent />
          </div>
        )}

        {/* Note: You tied Receivables & Payables to POS Component */}
        {component == "Record-Payment" && (
          <div className="flex flex-col gap-6 p-4 md:p-6 mx-auto max-w-[1600px]">
            <PosComponent />
          </div>
        )}
        {component == "Recievables And Paybles" && (
          <div className="flex flex-col gap-6 p-4 md:p-6 mx-auto max-w-[1600px]">
            <RecievablePayblesBook />
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
