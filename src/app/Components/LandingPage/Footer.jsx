"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/all";
import React, { useEffect, useState } from "react";
gsap.registerPlugin(ScrollToPlugin);
const Footer = () => {
  let [move, setmove] = useState("");
  // Fixed a small typo in the first string for professionalism
  let row1 = ["Be in our team", "Our team", "About"];

  // Converted row2 into an array of objects to map names to their exact SVG icons
  let row2 = [
    {
      name: "guide",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
    },
    {
      name: "instagram",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "twitter",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
        </svg>
      ),
    },
    {
      name: "youtube",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      ),
    },
    {
      name: "linkedin",
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
    },
  ];
  const handleIconClick = (e, itemName) => {
    // Only trigger the GSAP scroll if the clicked item is "guide"
    if (itemName === "guide") {
      e.preventDefault(); // Stops the default jumping behavior of the <a> tag
      gsap.to(window, {
        duration: 1,
        scrollTo: "#guide", // Added the '#' so GSAP knows to look for an ID
        ease: "power2.inOut",
      });

    }

  };

  return (
    <footer className="min-h-[90vh] w-full flex flex-col justify-between bg-[#0a0a0a] text-[#f2e8cf] relative z-10 px-8 py-16 md:px-20 md:py-20">
      {/* Top Section: Giant Call to Action */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-5xl md:text-8xl font-[fraunces] font-bold capitalize text-center leading-tight">
          Join us with <br />
          <span className="text-[#bc4749] italic">confidence.</span>
        </h1>
      </div>

      {/* Bottom Section: Links and Socials */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-end gap-10 pt-10 border-t border-[#f2e8cf]/20">
        {/* Row 1: Company Links */}
        <div className="row1 flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 font-[overpass] text-lg">
          {row1.map((link, index) => (
            <a
              key={index}
              href={`#${link.replace(/\s+/g, "-").toLowerCase()}`}
              className="capitalize hover:text-[#bc4749] hover:-translate-y-1 transition-all duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Row 2: Icons & Socials */}
        <div className="row2 flex gap-6">
          {row2.map((item, index) => (
            <a
              key={index}
              onClick={(e) => handleIconClick(e, item.name)}
              // href={`#${item.name}`}
              aria-label={item.name}
              className="p-3 rounded-full  bg-[#f2e8cf]/10 hover:bg-[#bc4749] text-[#f2e8cf] hover:text-white hover:-translate-y-1 transition-all duration-300 group"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
