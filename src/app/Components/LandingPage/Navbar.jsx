"use client";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  let centerLinks = ["home", "about", "Inventory", "Dashboard"];
  let AuthLinks = ["sign-in", "sign-out"];

  return (
    <nav className="flex capitalize fixed w-full top-0 z-50 items-center font-medium justify-between px-6 py-4 backdrop-blur-md  whitespace-nowrap">
      <div className="logo ">logo</div>
      <div className="centre flex gap-7  ml-10">
        {centerLinks.map((itm) => {
          return (
            <React.Fragment key={itm}>
              <Link href={itm}>
              
              <div className="item transition-colors duration-300  ease-in-out group-hover:delay-0 flex flex-col group cursor-pointer px-3.5 py-2  hover:bg-[#cdb4db]/40 rounded-4xl">
                <span>{itm}</span>

                {/* <span className='h-0.5 group-hover:w-full  origin-left transition-all duration-300  w-0 bg-red-500'></span> */}
              </div>
              </Link>
            </React.Fragment>
          );
        })}
      </div>
      <div className="right flex  gap-5">
        {AuthLinks.map((itm) => {
          return (
            <React.Fragment key={itm}>
              <div className="item flex flex-col group cursor-pointer px-3 py-2  hover:bg-[#cdb4db]/40 rounded-4xl">
                <span>{itm}</span>

                {/* <span className='h-0.5 group-hover:w-full  origin-left transition-all duration-300  w-0 bg-red-500'></span> */}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </nav>  
  );
};

export default Navbar;
