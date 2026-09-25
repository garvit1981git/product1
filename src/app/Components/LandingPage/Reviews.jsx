"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const Reviews = () => {
  let letters = ["r", "e", "v", "i  ", "e", "w", "s"];
  let reviews = [
    {
      name: "garvit start",
      desc: " “This is the best AI product I've used since ChatGPT.”",
      designation: "founderTKRG groups ,ceo Krishna hospitals",
    },
    {
      name: "garvit gupta",
      desc: " “I've been using Wispr almost every day since I downloaded it. It's probably my favorite part of the day, especially at the end when I go through my inbox with Wispr.”",
      designation: "founderTKRG groups ,ceo Krishna hospitals",
    },
    {
      name: "garvit gupta",
      desc: "“I can make quick edits while speaking to it because flow really understands me perfectly and can make the necessary changes. Flow's accuracy and speed make it a real game changer.”",
      designation: "founderTKRG groups ,ceo Krishna hospitals",
    },
    {
      name: "garvit gupta",
      desc: "“You're making texting actually delightful right now! Can see it becoming a can't live without product fast.”",
      designation: "founderTKRG groups ,ceo Krishna hospitals",
    },
    {
      name: "garvit gupta",
      desc: " “This is the best AI product I've used since ChatGPT.”",
      designation: "founderTKRG groups ,ceo Krishna hospitals",
    },
    {
      name: "garvit gupta",
      desc: " “This is the best AI product I've used since ChatGPT.”",
      designation: "founderTKRG groups ,ceo Krishna hospitals",
    },
    {
      name: "garvit gupta",
      desc: "“You're making texting actually delightful right now! Can see it becoming a can't live without product fast.”",
      designation: "founderTKRG groups ,ceo Krishna hospitals",
    },
    {
      name: "garvit gupta",
      desc: " “This is the best AI product I've used since ChatGPT.”",
      designation: "founderTKRG groups ,ceo Krishna hospitals",
    },
    {
      name: "garvit gupta",
      desc: " “I can make quick edits while speaking to it because flow really understands me perfectly and can make the necessary changes. Flow's accuracy and speed make it a real game changer.”",
      designation: "founderTKRG groups ,ceo Krishna hospitals",
    },
    {
      name: "garvit end",
      desc: " “This is the best AI product I've used since ChatGPT.”",
      designation: "founderTKRG groups ,ceo Krishna hospitals",
    },
  ];
  let LetterContainer = useRef(null);
  let TrackRef = useRef(null);
  let tweenRef = useRef(null);
  useGSAP(() => {
    let letter = gsap.utils.toArray(".letter");
    letter.forEach((l, index) => {
      let position = -((letter.length - index) * 40);
      gsap.from(l, {
        y: position,
        duration: 0.6,
        scrollTrigger: {
          trigger: LetterContainer.current,
          start: "top 70%",
          end: "+=80%",
          scrub: 3,
        },
      });
    });
    const playCarousel = () => {
      // 2. Assign the fromTo animation to the tweenRef so we can control it later
      tweenRef.current = gsap.fromTo(
        TrackRef.current,
        { xPercent: 0 },
        {
          xPercent: -50,
          ease: "none",
          duration: reviews.length * 5,
          onComplete: playCarousel,
        },
      );
    };

    playCarousel();
  });
  // 3. Handlers to pause and play the animation
  const handlePause = () => {
    if (tweenRef.current) tweenRef.current.pause();
  };

  const handlePlay = () => {
    if (tweenRef.current) tweenRef.current.play();
  };
  return (
    <div className="bg-[#f2e8cf]/70">
      <div
        ref={LetterContainer}
        className="flex relative z-10  justify-center items-center"
      >
        {letters.map((l, index) => {
          let coloredindex = index % 2;
          return (
            <div key={index} className="">
              <h1
                className={`letter   text-center text-[18vw] uppercase font-[fraunces] [-webkit-text-stroke:5px_black] ${
                  !coloredindex ? null : "text-transparent"
                } `}
              >
                {l}
              </h1>
            </div>
          );
        })}
      </div>
      <div className="bg-black  flex flex-col">
        <div
          ref={TrackRef}
          onPointerEnter={handlePause}
          onPointerLeave={handlePlay}
          className="reviews w-max flex bg-black group "
        >
          <div className=" flex  justify-center gap-2   items-end pr-2 py-10">
            {reviews.map((review, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="flex flex-col bg-[#f2e8cf] rounded-4xl items-center h-fit capitalize aspect-square w-[320px] shrink-0 relative transition-all duration-500 group-hover:opacity-40 group-hover:blur-[2px] hover:scale-[1.05]! hover:opacity-100! hover:blur-[0px]!   cursor-pointer shadow-lg">
                    <div className="head text-2xl w-full text-center whitespace-nowrap bg-[#bc4749]/20 px-5 py-5 rounded-t-4xl capitalize  font-[fraunces]">
                      <h2>{review.name}</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1 px-5 m-5 gap-7 font-[overpass]">
                      <div className="desc text-center text-lg">
                        {review.desc}
                      </div>
                      <div className="designation text-center text-xs font-black">
                        {review.designation}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <div className=" flex  justify-center gap-2   items-end py-10">
            {reviews.map((review, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="flex flex-col bg-[#f2e8cf] rounded-4xl items-center h-fit capitalize aspect-square w-[320px] shrink-0 relative transition-all duration-500 group-hover:opacity-40 group-hover:blur-[2px] hover:scale-[1.05]! hover:opacity-100! hover:blur-[0px]!    cursor-pointer shadow-lg">
                    <div className="head text-2xl w-full text-center whitespace-nowrap bg-[#bc4749]/20 px-5 py-5 rounded-t-4xl capitalize  font-[fraunces]">
                      <h2>{review.name}</h2>
                    </div>
                    <div className="flex flex-col items-center justify-center flex-1  m-5  font-[overpass]">
                      <div className="desc text-center text-lg">
                        {review.desc}
                      </div>
                      <div className="designation text-center text-xs font-black">
                        {review.designation}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="h-[20vh] flex flex-col justify-center w-full text-white  items-center text-3xl font-[fraunces]">
          <div className="span flex gap-2 mb-5">
            <span className="">share</span>
            <span className="">your</span>
            <span className="bg-[#f2e8cf]  text-black">story</span>
          </div>

          <div className="bg-[#f2e8cf] w-1/4 text-black rounded-4xl">
            Check all reviews
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
