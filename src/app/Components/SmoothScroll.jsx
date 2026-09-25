"use client";

import { ReactLenis } from "lenis/react";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function SmoothScroll({ children }) {
  const lenisRef = useRef();

  // OPTIONAL BUT HIGHLY RECOMMENDED:
  // This syncs Lenis with GSAP's internal ticker so your ScrollTrigger animations
  // are perfectly buttery and never jitter.
  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time *1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0); // Prevents GSAP from fighting the scroll momentum

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    // 'root' tells Lenis to take over the main browser scrollbar
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{ lerp:0.9, duration: 1.5 }}
    >
      {children}
    </ReactLenis>
  );
}
