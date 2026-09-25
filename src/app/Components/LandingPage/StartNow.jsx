"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const StartNow = () => {
  let InviteRef = useRef(null);
  useGSAP(() => {
    gsap.to(InviteRef.current, {
      opacity: 0,
      // duration: 1,
      scrollTrigger: {
        trigger: InviteRef.current,
        pin: true,
        pinSpacing: false,
        start: "bottom bottom",
        end: "+=90%",
        scrub: 2,
      },
    });
  });
  return (
    <div
      ref={InviteRef}
      className="relative -z-10 min-h-[100vh] w-full flex flex-col items-center justify-center gap-10 bg-[#f2e8cf]/40 py-20 px-5 text-center"
    >
      {/* Headline */}
      <h1 className="text-4xl md:text-5xl  font-bold font-[fraunces] text-gray-900 capitalize tracking-tight max-w-4xl">
        Reduce the stress of your shop. <br className="hidden md:block" />
        <span className="text-[#bc4749]/70">Start growing.</span>
      </h1>

      {/* Expanded Subtext (designed to span ~2 lines) */}
      <p className="text-lg font-medium  font-[overpass] text-gray-600 max-w-3xl leading-relaxed">
        Track your inventory, manage daily sales, and monitor your entire
        business directly from your mobile device. Isn't it time running your
        shop felt this effortless?
      </p>

      {/* Call to Action Button */}
      <button className="bg-[#bc4749] text-white px-12 py-4 rounded-full text-xl font-bold font-[overpass] shadow-lg shadow-[#bc4749]/30 hover:bg-[#a63f41] hover:scale-105  hover:shadow-xl transition-all duration-300 flex items-center gap-3 cursor-pointer mt-4">
        Start Free Trial
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default StartNow;
