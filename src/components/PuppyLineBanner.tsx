import React from "react";
import { Link } from "react-router-dom";
import puppyGif from "../assets/puppy_gif.gif";
import {
  Sparkles,
  ArrowRight,
} from "lucide-react";

export const PuppyLineBanner: React.FC = () => {
  const highlights = [
    { text: "100% Gentle Care", icon: "🐾" },
    { text: "25+ Certified Veterinary Specialists", icon: "🩺" },
    { text: "24/7 Emergency Hospital", icon: "🚑" },
    { text: "Zero-Queue Instant Booking", icon: "⚡" },
    { text: "Loved by 10,000+ Pets & Families", icon: "❤️" },
    { text: "Advanced Digital Lab & Ultrasound", icon: "🔬" },
  ];

  return (
    <section className="relative my-8 sm:my-12 overflow-hidden px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[32px] sm:rounded-[40px] p-0.5 bg-gradient-to-r from-teal-400/40 via-emerald-400/50 to-teal-500/40 dark:from-teal-600/30 dark:via-emerald-500/30 dark:to-teal-700/30 shadow-2xl shadow-teal-900/10 dark:shadow-black/50">

          <div className="rounded-[30px] sm:rounded-[38px] bg-gradient-to-r from-white via-teal-50/60 to-white dark:from-[#062022] dark:via-[#08292c] dark:to-[#062022] backdrop-blur-xl border border-white/80 dark:border-white/10 p-5 sm:p-7 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">

            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-teal-300/20 dark:bg-teal-500/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-emerald-300/20 dark:bg-emerald-500/10 blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4 sm:gap-6 shrink-0 relative z-10">

              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-tr from-teal-400/30 to-emerald-400/30 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-teal-950/20 dark:bg-black/50 rounded-full blur-sm" />

                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex items-center justify-center">
                  <img
                    src={puppyGif}
                    alt="Playful Clinic Puppy"
                    className="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(13,148,136,0.25)] dark:drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] transform hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <span className="absolute -top-1 -right-1 text-base sm:text-lg animate-bounce">
                  💖
                </span>
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100/80 dark:bg-teal-900/60 border border-teal-200 dark:border-teal-700/50 text-teal-800 dark:text-teal-200 text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Meet Our Happy Patients!</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0f3438] dark:text-white tracking-tight">
                  Because They’re Family ♡
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xs sm:max-w-sm">
                  Compassionate, gentle veterinary healthcare with guaranteed zero-queue visits.
                </p>
              </div>

            </div>

            <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-2xl bg-teal-50/80 dark:bg-white/5 border border-teal-100 dark:border-white/10 shrink-0">
              <span className="text-xs font-black uppercase text-teal-800 dark:text-teal-300 tracking-wider">
                Live Vitality Line:
              </span>
              <svg
                width="140"
                height="28"
                viewBox="0 0 140 28"
                fill="none"
                className="text-teal-600 dark:text-teal-400"
              >
                <path
                  d="M0 14H35L42 4L48 24L54 9L60 19L65 14H140"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shadow-[0_0_8px_rgba(16,185,129,0.9)]" />
            </div>

            <div className="shrink-0 flex items-center gap-3 w-full sm:w-auto justify-end relative z-10">
              <Link
                to="/user/book"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-teal-700/25 hover:shadow-teal-700/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Book Doctor Appointment</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>

          <div className="rounded-b-[30px] sm:rounded-b-[38px] bg-teal-50/90 dark:bg-[#031d1f] text-teal-900 dark:text-white py-2 px-4 overflow-hidden border-t border-teal-200/80 dark:border-teal-600/30">
            <div className="flex items-center gap-8 text-xs font-bold tracking-wide animate-marquee whitespace-nowrap">
              {highlights.concat(highlights).map((item, i) => (
                <div key={i} className="inline-flex items-center gap-2 text-teal-800 dark:text-teal-100">
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                  <span className="text-teal-400/50">•</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PuppyLineBanner;