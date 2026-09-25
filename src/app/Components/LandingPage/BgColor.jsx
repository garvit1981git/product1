"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground({ children }) {
  const blobRef = useRef(null);

  useEffect(() => {
    let time = 0;
    let animationFrameId;

    const animateBlob = () => {
      time += 0.005; // Reactivated so the blob moves!

      // Math functions create the smooth, oscillating movement
      const x = Math.sin(time) * 180;
      const y = Math.cos(time) * 120;

      // Apply hardware-accelerated CSS transforms for smooth performance
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }

      animationFrameId = requestAnimationFrame(animateBlob);
    };

    // Start loop
    animateBlob();

    // Cleanup the animation loop when the component unmounts
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg- overflow-hidden">
      {/* Background Container 
        pointer-events-none ensures the background doesn't block clicks 
      */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Single Top Corner Blob */}
        <div
          ref={blobRef}
          // Offset it slightly (-top, -right) so it bleeds naturally from the corner
          className="absolute -right-[150px] -top-[150px] h-[500px] w-[600px] rounded-full bg-[#023e8a] opacity-70 blur-[120px] will-change-transform"
        />
      </div>

      {/* Main Website Content 
        Changed to text-slate-900 so you can read your text against the white background 
      */}
      <div className="relative z-10 h-full w-full bg-[#f2e8cf] text-slate-900">
        {children}
      </div>
    </div>
  );
}
