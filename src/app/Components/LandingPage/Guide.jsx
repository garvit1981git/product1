"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin, ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const Guide = () => {
  let letters = ["g", "u", "i", "d", "e"];
  let LetterContainerRef = useRef(null);
  let LetterConatiner = useRef(null);
  let cardsContainerRef = useRef(null);
  let horizontalSectionRef = useRef(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray(".stacked-card");

      // 1. Initial setup: Place all cards except the first one at the far right of the arc (start: 1)
      cards.forEach((card, index) => {
        gsap.set(card, {
          motionPath: {
            path: "#card-arc-path",
            align: "#card-arc-path",
            alignOrigin: [0.5, 0.5],
            start: index === 0 ? 0.5 : 2, // First card starts dead center (0.5), rest start off-screen right (1)
            end: index === 0 ? 0.5 : 2,
          },
          scale: index === 0 ? 1 : 0.8,
          opacity: index === 0 ? 1 : 0, // Hidden until they enter the arc loop
        });
      });
      
      // 2. Create the Pinning Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: horizontalSectionRef.current,
          start: "top 20%",
          pin: true,
          scrub: 1,
          end: `+=${cards.length * 900}`, // Gives enough scroll length for smooth travel
          invalidateOnRefresh: true,
        },
      });

      // 3. Animate each card sequentially along the arc path loop
      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          const nextCard = cards[index + 1];

          // A: Current card sweeps from center (0.5) to the far left (0.0) and disappears
          tl.to(
            card,
            {
              motionPath: {
                path: "#card-arc-path",
                align: "#card-arc-path",
                alignOrigin: [0.5, 0.5],
                start: 0.5,
                end: 0.0,
              },
              scale: 0.8,
              opacity: 0,
              ease: "power1.inOut",
            },
            index,
          );

          // B: Next card sweeps from far right (1.0) into the center (0.5)
          tl.to(
            nextCard,
            {
              motionPath: {
                path: "#card-arc-path",
                align: "#card-arc-path",
                alignOrigin: [0.5, 0.5],
                start: 1.0,
                end: 0.5,
              },
              scale: 1,
              opacity: 1,
              ease: "power1.inOut",
            },
            index,
          );
        }
      });

      // Letters reveal animation
      gsap.to(".letter", {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: LetterConatiner.current,
          start: "top 90%",
          end: "+=91%",
          scrub: 3,
        },
      });
    },
    { scope: LetterContainerRef },
  );

  const guideSteps = [
    {
      step: "01",
      title: "Connect Your Store",
      desc: "Sync your inventory and sales data seamlessly with our secure API integration in just three clicks.",
    },
    {
      step: "02",
      title: "Track Analytics",
      desc: "Monitor your daily performance with real-time charts, transaction records, and custom dashboard widgets.",
    },
    {
      step: "03",
      title: "Automate Tasks",
      desc: "Set up smart rules to handle restocking, invoicing, and customer notifications automatically while you sleep.",
    },
    {
      step: "04",
      title: "Grow Your Business",
      desc: "Leverage AI-driven insights to optimize your pricing, reduce dead stock, and expand your market reach.",
    },
  ];

  return (
    <div
      ref={LetterContainerRef}
      id="guide"
      className="w-full min-h-screen overflow-x-hidden z-10 relative block bg-[#f2e8cf]/70 pb-20"
    >
      <div ref={LetterConatiner} className="flex z-10 pt-16 justify-center">
        {letters.map((l, index) => {
          let coloredindex = index % 2;
          let position = -((letters.length - index) * 10);

          return (
            <div key={index} className="">
              <h1
                className={`letter relative z-20 opacity-0 text-center text-[15vw] uppercase font-[fraunces] [-webkit-text-stroke:5px_black] ${
                  !coloredindex ? null : "text-transparent"
                } `}
                style={{ transform: `translateY(${position}px)` }}
              >
                {l}
              </h1>
            </div>
          );
        })}
      </div>

      <div
        ref={horizontalSectionRef}
        className="w-full h-[80vh] flex justify-center items-center relative overflow-hidden"
      >
        {/* SVG Arc Path (Stroke can be changed to transparent later if you want to hide the line) */}
        <svg
          viewBox="0 0 1000 500"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[50vw] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="card-arc-path"
            d="M -600 650 Q 500 -250, 1600 650"
            stroke="black"
            strokeWidth="1"
            strokeDasharray="10 10"
            fill="none"
          />
        </svg>

        <div
          ref={cardsContainerRef}
          className="allcards w-full h-full relative flex justify-center items-center"
        >
          {guideSteps.map((itm, index) => {
            return (
              <div
                key={itm.step}
                className="stacked-card absolute flex flex-col border border-black/10 bg-[#f2e8cf] aspect-square rounded-xl items-center h-[22vw] w-[32vw] min-w-[320px] min-h-[320px] shadow-2xl overflow-hidden"
                style={{ zIndex: 50 - index }}
              >
                <div className="head text-xl w-full bg-[#bc4749]/20 px-5 py-4 rounded-t-xl capitalize flex justify-center items-center gap-4 font-[fraunces] font-bold text-[#bc4749]">
                  <span className="bg-white/60 px-2.5 py-1 rounded-md text-sm">
                    {itm.step}
                  </span>
                  <span>{itm.title}</span>
                </div>

                <div className="desc m-8 font-[overpass] text-base text-center text-gray-700 capitalize p-2">
                  {itm.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Guide;
