"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";
import Image from "next/image";
import { ScrollTrigger } from "gsap/all";
// import GlassDashboard from "./GlassDashboard";
gsap.registerPlugin(ScrollTrigger);

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Navbar from "./Navbar";

export const chartData = [
  { month: "Jan", metric1: 40, metric2: 30, metric3: 20, trend: 35 },
  { month: "Feb", metric1: 90, metric2: 85, metric3: 50, trend: 75 },
  { month: "Mar", metric1: 45, metric2: 40, metric3: 25, trend: 30 },
  { month: "Apr", metric1: 70, metric2: 60, metric3: 35, trend: 80 },
  { month: "May", metric1: 50, metric2: 35, metric3: 15, trend: 40 },
  { month: "Jun", metric1: 40, metric2: 35, metric3: 30, trend: 25 },
  { month: "Jul", metric1: 85, metric2: 70, metric3: 45, trend: 50 },
];
const HerosSection = () => {
  const textRef = useRef(null);
  let containerRef = useRef(null);
  const sectionRef = useRef(null); // NEW: Outer wrapper for pinning
  useGSAP(
    () => {
      // ScrollTrigger.create({
      //   trigger: containerRef.current,
      //   start: "top top", // Activates when the bottom of this section hits the bottom of the viewport
      //   pin: true,
      //   pinSpacing: false, // CRITICAL: This allows the next component in the DOM (Footer) to scroll over it!
      // });

      gsap.from(textRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".tags", {
        y: 150,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
      });
      gsap.to(containerRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.9,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=70%", // This dictates how long the scrub lasts
          pin: true,
          pinSpacing: false,
          scrub: 1,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <>
      <div
        ref={sectionRef}
        className=" bg-[#f2e8cf]/10 w-full min-h-[80vh]  relative  "
      >
        <div
          ref={containerRef}
          className="gap-10 min-h-[80vh] flex mx-5 justify-center items-center "
        >
          <div className="left flex-col h-full gap-10 flex justify-center items-center flex-1">
            <h1
              ref={textRef}
              className="font-[fraunces] whitespace-nowrap  md:text-6xl font-bold capitalize text-slate-800 text-center leading-tight"
            >
              smartly manage your shop
            </h1>
            <p className="text-center font-[overpass] capitalize text-sm">
              {" "}
              manage my shop is a platform with multiple feautures such as
              inventery tracking , monthly sales overview , transaction records
              and many more ...
            </p>

            <div className=" whitespace-nowrap capitalize flex w-full text-xl justify-center items-center gap-2 font-[fraunces]">
              <div className="border px-3 py-1.5  hover:bg-white/85  bg-white transition-all duration-200 hover:scale-110 opacity-100  rounded-4xl">
                get started
              </div>
              <div className="border px-3 py-1.5 hover:bg-black/85  transition-all duration-200 hover:scale-110 opacity-100 rounded-4xl bg-black text-white">
                {" "}
                see guide
              </div>
            </div>
          </div>
          <div className="right flex flex-1  justify-center items-center">
            <div className="h-[300px] w-[40vw] bg-blue-600/10 backdrop-blur-xl border border-blue-400/20 shadow-2xl shadow-blue-900/30 rounded-3xl p-6">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartData}
                  margin={{ top: 30, right: 0, bottom: 0, left: 0 }}
                >
                  <text
                    x={0}
                    y={10}
                    fill="black"
                    fontSize={15}
                    fontWeight={500}
                    className="tracking-wide m-5"
                  >
                    Monthly Sales Overview
                  </text>
                  <CartesianGrid
                    vertical={false}
                    stroke="black"
                    strokeDasharray="1  1"
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "black", fontSize: 12 }}
                    dy={10}
                  />
                  <Bar
                    dataKey="metric1"
                    fill="black"
                    barSize={6}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="metric2"
                    fill="#FFFFFF"
                    barSize={6}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="metric3"
                    fill="#60A5FA"
                    barSize={6}
                    radius={[4, 4, 0, 0]}
                  />{" "}
                  {/* Changed to a blue shade */}
                  <Line
                    type="monotone"
                    dataKey="trend"
                    stroke="black"
                    strokeWidth={1}
                    strokeDasharray="6 6"
                    dot={false}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HerosSection;
