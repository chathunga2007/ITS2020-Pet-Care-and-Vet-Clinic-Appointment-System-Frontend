import React, { useEffect, useRef, useState } from "react";

// Crisp SVG Dog Paw (Metacarpal pad + 4 oval toe beans)
const DogPawIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9.8c-2.3 0-4.2 1.8-4.2 4.1 0 2 1.5 3.8 3.6 4.3.4.1.8.1 1.2 0 2.1-.5 3.6-2.3 3.6-4.3 0-2.3-1.9-4.1-4.2-4.1z" />
    <circle cx="6.5" cy="9" r="2" />
    <circle cx="10" cy="5.8" r="2" />
    <circle cx="14" cy="5.8" r="2" />
    <circle cx="17.5" cy="9" r="2" />
  </svg>
);

// Delicate SVG Cat Paw (Heart/3-lobed pad + 4 cute round beans)
const CatPawIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11c-1.8 0-3.4 1.3-3.8 3.1-.3 1.3.3 2.6 1.4 3.3.7.4 1.6.6 2.4.6s1.7-.2 2.4-.6c1.1-.7 1.7-2 1.4-3.3-.4-1.8-2-3.1-3.8-3.1z" />
    <circle cx="6.2" cy="10.5" r="1.6" />
    <circle cx="9.5" cy="7.2" r="1.7" />
    <circle cx="14.5" cy="7.2" r="1.7" />
    <circle cx="17.8" cy="10.5" r="1.6" />
  </svg>
);

// Medical Twinkle Star
const SparkleStarIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
  </svg>
);

export const HeroLiveBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* =========================================================================
          1. Dynamic Interactive Spotlight Cursor Glow (Follows Mouse Live)
         ========================================================================= */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isHovered
            ? `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 212, 191, 0.22), transparent 75%)`
            : "transparent",
        }}
      />

      {/* =========================================================================
          2. Living Aurora Gradient Mesh Blobs (Vibrant & High-Contrast)
         ========================================================================= */}
      {/* Top-Left Vibrant Mint/Teal Aurora */}
      <div className="absolute -top-16 -left-16 w-[520px] sm:w-[650px] h-[520px] sm:h-[650px] bg-gradient-to-br from-teal-400/40 via-emerald-400/25 to-transparent dark:from-teal-500/25 dark:via-emerald-500/20 dark:to-transparent rounded-full blur-[100px] animate-hero-blob-1 pointer-events-none" />

      {/* Top-Right Emerald / Medical Cyan Aura */}
      <div className="absolute top-4 -right-20 w-[550px] sm:w-[700px] h-[550px] sm:h-[700px] bg-gradient-to-bl from-emerald-400/35 via-teal-400/30 to-sky-400/20 dark:from-emerald-500/25 dark:via-teal-500/20 dark:to-cyan-500/15 rounded-full blur-[110px] animate-hero-blob-2 pointer-events-none" />

      {/* Center-Bottom Warm Honey Amber Glow */}
      <div className="absolute top-[38%] left-[28%] w-[450px] sm:w-[580px] h-[450px] sm:h-[580px] bg-gradient-to-tr from-amber-300/20 via-teal-300/25 to-emerald-300/20 dark:from-amber-500/15 dark:via-teal-600/15 dark:to-emerald-500/15 rounded-full blur-[95px] animate-hero-blob-3 pointer-events-none" />

      {/* =========================================================================
          3. Animated Medical ECG Vitality Wave (Clean Clinical Rhythm Line)
         ========================================================================= */}
      <div className="hidden xl:flex absolute top-12 left-1/2 -translate-x-1/2 z-10 items-center gap-2 animate-hero-ecg pointer-events-none">
        <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="text-teal-600/70 dark:text-teal-400/80">
          <path
            d="M0 12H35L42 3L48 21L54 8L60 16L65 12H120"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-ping" />
      </div>

      {/* =========================================================================
          4. Sequential Animated Walking Paw Footprint Trails
         ========================================================================= */}
      {/* Left Walking Trail: 4 Steps spaced comfortably down the left side */}
      <div
        className="absolute left-[7%] top-[12%] text-teal-700/80 dark:text-teal-300 drop-shadow-[0_4px_12px_rgba(13,148,136,0.45)] dark:drop-shadow-[0_0_16px_rgba(45,212,191,0.7)]"
        style={{
          "--step-rot": "18deg",
          animation: "heroPawStepPop 5s infinite",
          animationDelay: "0s",
        } as React.CSSProperties}
      >
        <DogPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      <div
        className="absolute left-[11%] top-[25%] text-teal-700/80 dark:text-teal-300 drop-shadow-[0_4px_12px_rgba(13,148,136,0.45)] dark:drop-shadow-[0_0_16px_rgba(45,212,191,0.7)]"
        style={{
          "--step-rot": "26deg",
          animation: "heroPawStepPop 5s infinite",
          animationDelay: "1.25s",
        } as React.CSSProperties}
      >
        <DogPawIcon className="w-7 h-7 sm:w-9 sm:h-9" />
      </div>

      <div
        className="absolute left-[8%] top-[39%] text-emerald-700/80 dark:text-emerald-300 drop-shadow-[0_4px_12px_rgba(16,185,129,0.45)] dark:drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]"
        style={{
          "--step-rot": "15deg",
          animation: "heroPawStepPop 5s infinite",
          animationDelay: "2.5s",
        } as React.CSSProperties}
      >
        <CatPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      <div
        className="absolute left-[12%] top-[53%] text-emerald-700/80 dark:text-emerald-300 drop-shadow-[0_4px_12px_rgba(16,185,129,0.45)] dark:drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]"
        style={{
          "--step-rot": "25deg",
          animation: "heroPawStepPop 5s infinite",
          animationDelay: "3.75s",
        } as React.CSSProperties}
      >
        <CatPawIcon className="w-7 h-7 sm:w-9 sm:h-9" />
      </div>

      {/* Right Walking Trail: 4 Steps spaced comfortably down the right side */}
      <div
        className="absolute right-[8%] top-[14%] text-teal-700/80 dark:text-teal-300 drop-shadow-[0_4px_12px_rgba(13,148,136,0.45)] dark:drop-shadow-[0_0_16px_rgba(45,212,191,0.7)]"
        style={{
          "--step-rot": "-20deg",
          animation: "heroPawStepPop 5s infinite",
          animationDelay: "0.6s",
        } as React.CSSProperties}
      >
        <DogPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      <div
        className="absolute right-[12%] top-[27%] text-teal-700/80 dark:text-teal-300 drop-shadow-[0_4px_12px_rgba(13,148,136,0.45)] dark:drop-shadow-[0_0_16px_rgba(45,212,191,0.7)]"
        style={{
          "--step-rot": "-28deg",
          animation: "heroPawStepPop 5s infinite",
          animationDelay: "1.85s",
        } as React.CSSProperties}
      >
        <DogPawIcon className="w-7 h-7 sm:w-9 sm:h-9" />
      </div>

      <div
        className="absolute right-[9%] top-[41%] text-emerald-700/80 dark:text-emerald-300 drop-shadow-[0_4px_12px_rgba(16,185,129,0.45)] dark:drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]"
        style={{
          "--step-rot": "-16deg",
          animation: "heroPawStepPop 5s infinite",
          animationDelay: "3.1s",
        } as React.CSSProperties}
      >
        <CatPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
      </div>

      <div
        className="absolute right-[13%] top-[55%] text-emerald-700/80 dark:text-emerald-300 drop-shadow-[0_4px_12px_rgba(16,185,129,0.45)] dark:drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]"
        style={{
          "--step-rot": "-24deg",
          animation: "heroPawStepPop 5s infinite",
          animationDelay: "4.35s",
        } as React.CSSProperties}
      >
        <CatPawIcon className="w-7 h-7 sm:w-9 sm:h-9" />
      </div>

      {/* =========================================================================
          5. Strategic Golden & Teal Twinkle Stars
         ========================================================================= */}
      {/* Top Left Sparkle */}
      <div className="absolute top-10 left-[22%] animate-hero-sparkle text-amber-500 dark:text-amber-300">
        <SparkleStarIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Top Right Sparkle */}
      <div className="absolute top-8 right-[24%] animate-hero-sparkle text-teal-500 dark:text-teal-300" style={{ animationDelay: "1.8s" }}>
        <SparkleStarIcon className="w-5 h-5 sm:w-6 sm:h-6" />
      </div>

      {/* Mid Center Sparkle */}
      <div className="absolute top-[48%] left-[48%] animate-hero-sparkle text-emerald-500 dark:text-emerald-300" style={{ animationDelay: "2.7s" }}>
        <SparkleStarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Lower Left Sparkle */}
      <div className="absolute top-[78%] left-[18%] animate-hero-sparkle text-teal-600 dark:text-teal-200" style={{ animationDelay: "0.9s" }}>
        <SparkleStarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Lower Right Sparkle */}
      <div className="absolute top-[76%] right-[20%] animate-hero-sparkle text-amber-500 dark:text-amber-300" style={{ animationDelay: "3.2s" }}>
        <SparkleStarIcon className="w-4 h-4 sm:w-6 sm:h-6" />
      </div>

      {/* =========================================================================
          6. Concentric Glow Ripple Rings
         ========================================================================= */}
      <div className="absolute top-[22%] left-1/4 w-36 h-36 rounded-full border-2 border-teal-500/30 dark:border-teal-400/35 animate-hero-pulse-ring pointer-events-none" />
      <div className="absolute top-[60%] right-1/4 w-40 h-40 rounded-full border-2 border-emerald-500/30 dark:border-emerald-400/35 animate-hero-pulse-ring pointer-events-none" style={{ animationDelay: "3s" }} />

    </div>
  );
};

export default HeroLiveBackground;
