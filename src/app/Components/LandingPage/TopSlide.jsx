"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import createOrderImg from "./SlideImages/create-order.png";
import expenseImg from "./SlideImages/expense.png";
import inventoryImg from "./SlideImages/inventory.png";
import ordersImg from "./SlideImages/orders.png";
import overviewImg from "./SlideImages/overview.png";
import salesImg from "./SlideImages/sales.png";
import recPayImg from "./SlideImages/Rec-and-Pay.png";

gsap.registerPlugin(ScrollTrigger);

const TopSlide = () => {
  let elemnt3 = [
    {
      feature: "Store Overview",
      desc: "Get a quick look at your daily sales, money left over, and pending totals.",
      img: overviewImg,
    },
    {
      feature: "Point of Sale (Checkout)",
      desc: "Quickly create instant sales or schedule future customer orders.",
      img: createOrderImg,
    },
    {
      feature: "Active Orders",
      desc: "Manage future deliveries, track what you need to pack, and watch what's missing.",
      img: ordersImg,
    },
    {
      feature: "Inventory Management",
      desc: "Keep track of stock levels across all sizes and restock items instantly.",
      img: inventoryImg,
    },
    {
      feature: "Sales Records",
      desc: "Track incoming money, view completed transactions, and filter by customer or category.",
      img: salesImg,
    },
    {
      feature: "Expense Book",
      desc: "Monitor your operating costs, paid bills, and upcoming payments easily.",
      img: expenseImg,
    },
    {
      feature: "Receivables & Payables",
      desc: "Manage large bulk orders, track advances, and bifurcate pending balances.",
      img: recPayImg,
    },
  ];

  let scrollTrackRef = useRef(null);

  useGSAP(
    () => {
      let cards = gsap.utils.toArray(".stacked-card");

      cards.forEach((card, i) => {
        if (i > 0) {
          gsap.set(card, { yPercent: 100, opacity: 0 });
        }
      });

      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollTrackRef.current,
          start: "top top",
          end: "+=4500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i > 0) {
          tl.to(card, {
            yPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          });
        }
      });

      ScrollTrigger.refresh();
    },
    { scope: scrollTrackRef },
  );

  return (
    <div
      ref={scrollTrackRef}
      className="relative z-10 bg-[#f2e8cf]/40 min-h-screen flex flex-col items-center justify-center overflow-hidden py-16"
    >
      {/* 1. THE BLURRY TRANSITION BLOCK */}
      <div className="absolute top-0 left-0 w-full h-23 -mt-23 pointer-events-none z-10">
        <div className="absolute z-1 inset-0 backdrop-blur-[50px] [mask-image:linear-gradient(to_bottom,transparent_100%,black_100%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f2e8cf]/50"></div>
      </div>

      {/* 2. CONTENT CONTAINER */}
      <div className="container mx-auto relative px-4 flex flex-col items-center justify-center">
        <h1 className="capitalize font-[fraunces] font-bold text-3xl md:text-4xl text-center mb-8 text-gray-900 tracking-tight">
          Explore What You Get
        </h1>

        <div className="allcards relative w-[90vw] md:w-[580px] lg:w-[620px] h-[500px] md:h-[530px] flex items-center justify-center">
          {elemnt3.map((itm, index) => {
            return (
              <div
                key={itm.feature}
                className="stacked-card absolute inset-0 flex flex-col border border-black/10 bg-[#f2e8cf] rounded-2xl overflow-hidden justify-between "
                style={{
                  zIndex: index + 1,
                }}
              >
                {/* Card Header */}
                <div className="head w-full text-center bg-[#bc4749]/15 px-6 py-3 border-b border-[#bc4749]/20 capitalize font-[fraunces]">
                  <h2 className="text-xl md:text-2xl font-black text-[#bc4749]">
                    {itm.feature}
                  </h2>
                </div>

                {/* Card Image Display Area - Fixed with object-contain so images never get cut off */}
                <div className="w-full bg-white/60 p-3 md:p-4 flex items-center justify-center flex-1">
                  <div className="relative w-full h-[220px] md:h-[260px] rounded-xl overflow-hidden shadow-sm border border-black/5 bg-white">
                    <Image
                      src={itm.img}
                      alt={itm.feature}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </div>

                {/* Card Description */}
                <div className="desc font-[overpass] text-sm md:text-base text-center text-gray-700 font-medium px-6 py-4 bg-[#f2e8cf]">
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

export default TopSlide;
