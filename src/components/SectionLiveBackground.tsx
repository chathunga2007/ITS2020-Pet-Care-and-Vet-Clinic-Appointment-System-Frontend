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

interface SectionLiveBackgroundProps {
  variant?: "services" | "why-us" | "vets" | "workflow" | "cta";
}

export const SectionLiveBackground: React.FC<SectionLiveBackgroundProps> = ({ variant = "services" }) => {
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
      
      {/* 1. Dynamic Interactive Spotlight Cursor Glow (Follows Mouse Live in this section) */}
      <div
        className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isHovered
            ? `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 212, 191, 0.2), transparent 75%)`
            : "transparent",
        }}
      />

      {/* 2. Ambient Floating Aurora Glow Blobs */}
      <div className="absolute -top-10 left-10 w-[420px] h-[420px] bg-gradient-to-br from-teal-400/25 via-emerald-400/20 to-transparent dark:from-teal-500/15 dark:via-emerald-500/10 dark:to-transparent rounded-full blur-[100px] animate-hero-blob-1 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[440px] h-[440px] bg-gradient-to-tl from-emerald-400/25 via-teal-400/20 to-transparent dark:from-emerald-500/15 dark:via-teal-500/10 dark:to-transparent rounded-full blur-[100px] animate-hero-blob-2 pointer-events-none" />

      {/* 3. Sequential Walking Paw Steps Trail (Animated Footsteps) */}
      {variant === "services" && (
        <>
          <div
            className="absolute right-[5%] top-[15%] text-teal-700/80 dark:text-teal-300 drop-shadow-[0_4px_12px_rgba(13,148,136,0.45)] dark:drop-shadow-[0_0_16px_rgba(45,212,191,0.7)]"
            style={{ "--step-rot": "20deg", animation: "heroPawStepPop 5s infinite", animationDelay: "0s" } as React.CSSProperties}
          >
            <DogPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div
            className="absolute right-[8%] top-[35%] text-teal-700/80 dark:text-teal-300 drop-shadow-[0_4px_12px_rgba(13,148,136,0.45)] dark:drop-shadow-[0_0_16px_rgba(45,212,191,0.7)]"
            style={{ "--step-rot": "32deg", animation: "heroPawStepPop 5s infinite", animationDelay: "1.2s" } as React.CSSProperties}
          >
            <DogPawIcon className="w-7 h-7 sm:w-9 sm:h-9" />
          </div>
          <div
            className="absolute right-[5%] top-[55%] text-emerald-700/80 dark:text-emerald-300 drop-shadow-[0_4px_12px_rgba(16,185,129,0.45)] dark:drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]"
            style={{ "--step-rot": "18deg", animation: "heroPawStepPop 5s infinite", animationDelay: "2.4s" } as React.CSSProperties}
          >
            <CatPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div
            className="absolute right-[8%] top-[75%] text-emerald-700/80 dark:text-emerald-300 drop-shadow-[0_4px_12px_rgba(16,185,129,0.45)] dark:drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]"
            style={{ "--step-rot": "28deg", animation: "heroPawStepPop 5s infinite", animationDelay: "3.6s" } as React.CSSProperties}
          >
            <CatPawIcon className="w-7 h-7 sm:w-9 sm:h-9" />
          </div>
        </>
      )}

      {variant === "why-us" && (
        <>
          <div
            className="absolute left-[4%] top-[20%] text-teal-700/80 dark:text-teal-300 drop-shadow-[0_4px_12px_rgba(13,148,136,0.45)] dark:drop-shadow-[0_0_16px_rgba(45,212,191,0.7)]"
            style={{ "--step-rot": "-25deg", animation: "heroPawStepPop 5s infinite", animationDelay: "0.5s" } as React.CSSProperties}
          >
            <CatPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div
            className="absolute left-[7%] top-[45%] text-teal-700/80 dark:text-teal-300 drop-shadow-[0_4px_12px_rgba(13,148,136,0.45)] dark:drop-shadow-[0_0_16px_rgba(45,212,191,0.7)]"
            style={{ "--step-rot": "-15deg", animation: "heroPawStepPop 5s infinite", animationDelay: "1.8s" } as React.CSSProperties}
          >
            <CatPawIcon className="w-7 h-7 sm:w-9 sm:h-9" />
          </div>
          <div
            className="absolute left-[4%] top-[70%] text-emerald-700/80 dark:text-emerald-300 drop-shadow-[0_4px_12px_rgba(16,185,129,0.45)] dark:drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]"
            style={{ "--step-rot": "-22deg", animation: "heroPawStepPop 5s infinite", animationDelay: "3.1s" } as React.CSSProperties}
          >
            <DogPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        </>
      )}

      {variant === "vets" && (
        <>
          <div
            className="absolute right-[4%] top-[25%] text-teal-700/80 dark:text-teal-300 drop-shadow-[0_4px_12px_rgba(13,148,136,0.45)] dark:drop-shadow-[0_0_16px_rgba(45,212,191,0.7)]"
            style={{ "--step-rot": "15deg", animation: "heroPawStepPop 5s infinite", animationDelay: "0.8s" } as React.CSSProperties}
          >
            <DogPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div
            className="absolute right-[7%] top-[55%] text-emerald-700/80 dark:text-emerald-300 drop-shadow-[0_4px_12px_rgba(16,185,129,0.45)] dark:drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]"
            style={{ "--step-rot": "25deg", animation: "heroPawStepPop 5s infinite", animationDelay: "2.2s" } as React.CSSProperties}
          >
            <CatPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div
            className="absolute left-[5%] top-[60%] text-amber-500/80 dark:text-amber-400 drop-shadow-[0_4px_12px_rgba(245,158,11,0.45)]"
            style={{ "--step-rot": "-18deg", animation: "heroPawStepPop 5s infinite", animationDelay: "3.4s" } as React.CSSProperties}
          >
            <DogPawIcon className="w-7 h-7 sm:w-9 sm:h-9" />
          </div>
        </>
      )}

      {variant === "workflow" && (
        <>
          <div
            className="absolute left-[6%] top-[30%] text-teal-700/80 dark:text-teal-300 drop-shadow-[0_4px_12px_rgba(13,148,136,0.45)] dark:drop-shadow-[0_0_16px_rgba(45,212,191,0.7)]"
            style={{ "--step-rot": "30deg", animation: "heroPawStepPop 5s infinite", animationDelay: "0.2s" } as React.CSSProperties}
          >
            <CatPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div
            className="absolute right-[6%] top-[65%] text-emerald-700/80 dark:text-emerald-300 drop-shadow-[0_4px_12px_rgba(16,185,129,0.45)] dark:drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]"
            style={{ "--step-rot": "-25deg", animation: "heroPawStepPop 5s infinite", animationDelay: "2.6s" } as React.CSSProperties}
          >
            <DogPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        </>
      )}

      {variant === "cta" && (
        <>
          <div
            className="absolute left-[8%] top-[25%] text-teal-700/80 dark:text-teal-300 drop-shadow-[0_4px_12px_rgba(13,148,136,0.45)] dark:drop-shadow-[0_0_16px_rgba(45,212,191,0.7)]"
            style={{ "--step-rot": "18deg", animation: "heroPawStepPop 5s infinite", animationDelay: "0.4s" } as React.CSSProperties}
          >
            <DogPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div
            className="absolute right-[8%] top-[30%] text-emerald-700/80 dark:text-emerald-300 drop-shadow-[0_4px_12px_rgba(16,185,129,0.45)] dark:drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]"
            style={{ "--step-rot": "-20deg", animation: "heroPawStepPop 5s infinite", animationDelay: "1.9s" } as React.CSSProperties}
          >
            <CatPawIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
        </>
      )}

      {/* 4. Strategic Twinkling Clinical Stars & Floating Paw Accents */}
      <div className="absolute top-12 left-[15%] animate-hero-sparkle text-amber-500 dark:text-amber-300">
        <SparkleStarIcon className="w-5 h-5" />
      </div>
      <div className="absolute bottom-16 right-[18%] animate-hero-sparkle text-teal-500 dark:text-teal-300" style={{ animationDelay: "2s" }}>
        <SparkleStarIcon className="w-5 h-5" />
      </div>
      <div className="absolute top-[48%] left-4 sm:left-8 animate-hero-float-1 text-teal-600/70 dark:text-teal-400 drop-shadow-md">
        <CatPawIcon className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>
      <div className="absolute top-[52%] right-4 sm:right-8 animate-hero-sway text-emerald-600/70 dark:text-emerald-400 drop-shadow-md">
        <DogPawIcon className="w-7 h-7 sm:w-8 sm:h-8" />
      </div>

    </div>
  );
};

export default SectionLiveBackground;
