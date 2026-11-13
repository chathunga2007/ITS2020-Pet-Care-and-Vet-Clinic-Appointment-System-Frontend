import React, { useEffect, useState } from "react";

export const HomeLiveBackground: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden">
      
      {/* 1. Global Interactive Mouse Spotlight Glow (Follows cursor smoothly across entire page) */}
      <div
        className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: isHovered
            ? `radial-gradient(750px circle at ${mousePos.x}px ${mousePos.y}px, rgba(45, 212, 191, 0.22), transparent 75%)`
            : "transparent",
        }}
      />

      {/* 2. Seamless Living Ambient Aurora Gradient Mesh (Whole Page Flow) */}
      {/* Top-Left Aura */}
      <div className="absolute -top-24 -left-24 w-[600px] h-[600px] bg-gradient-to-br from-teal-400/35 via-emerald-400/20 to-transparent dark:from-teal-500/20 dark:via-emerald-500/15 dark:to-transparent rounded-full blur-[120px] animate-hero-blob-1 pointer-events-none" />

      {/* Top-Right Aura */}
      <div className="absolute top-1/4 -right-24 w-[650px] h-[650px] bg-gradient-to-bl from-emerald-400/30 via-teal-400/25 to-sky-400/15 dark:from-emerald-500/20 dark:via-teal-500/15 dark:to-cyan-500/10 rounded-full blur-[130px] animate-hero-blob-2 pointer-events-none" />

      {/* Center Transition Bridge (Seamlessly blends Hero and Services) */}
      <div className="absolute top-[26%] left-1/2 -translate-x-1/2 w-[680px] h-[380px] bg-gradient-to-b from-teal-300/20 via-emerald-300/15 to-transparent dark:from-teal-500/15 dark:via-emerald-500/10 dark:to-transparent rounded-full blur-[110px] animate-hero-blob-3 pointer-events-none" />

      {/* Mid-Left Honey Amber / Mint Aura */}
      <div className="absolute top-1/2 -left-20 w-[550px] h-[550px] bg-gradient-to-tr from-amber-300/18 via-teal-300/20 to-emerald-300/18 dark:from-amber-500/12 dark:via-teal-600/12 dark:to-emerald-500/12 rounded-full blur-[110px] animate-hero-blob-3 pointer-events-none" />

      {/* Lower-Right Emerald Aura */}
      <div className="absolute top-3/4 -right-20 w-[600px] h-[600px] bg-gradient-to-tl from-teal-400/30 via-emerald-400/20 to-transparent dark:from-teal-500/18 dark:via-emerald-500/12 dark:to-transparent rounded-full blur-[120px] animate-hero-blob-1 pointer-events-none" />

    </div>
  );
};

export default HomeLiveBackground;

