import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import heroVetFamily from "../assets/hero-vet-family.jpg";
import petcareHomeBg from "../assets/petcare home bg.png";
import HeroLiveBackground from "./HeroLiveBackground";
import {
  ArrowRight,
  Stethoscope,
  Syringe,
  Scissors,
  HeartPulse,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Star
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  // Clinic Art is loaded by default as requested; switcher allows testing 4K Studio
  const [activeImage, setActiveImage] = useState<string>(petcareHomeBg);

  const handleScrollToServices = () => {
    const el = document.getElementById("services");
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - navOffset, behavior: "smooth" });
    }
  };

  const handleScrollToVets = () => {
    const el = document.getElementById("specialists");
    if (el) {
      const navOffset = 90;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - navOffset, behavior: "smooth" });
    }
  };

  const serviceHighlights = [
    {
      title: "Veterinary Care",
      desc: "Professional medical care for your pets.",
      icon: <Stethoscope className="w-5 h-5 text-teal-600 dark:text-teal-400" />,
      bg: "bg-teal-50 dark:bg-teal-950/60",
      link: "#services",
    },
    {
      title: "Vaccination",
      desc: "Keep your pets safe and healthy.",
      icon: <Syringe className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      bg: "bg-sky-50 dark:bg-sky-950/60",
      link: "#services",
    },
    {
      title: "Pet Grooming",
      desc: "Look good, feel great.",
      icon: <Scissors className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      bg: "bg-emerald-50 dark:bg-emerald-950/60",
      link: "#services",
    },
    {
      title: "Health Monitoring",
      desc: "Track and manage your pet's health.",
      icon: <HeartPulse className="w-5 h-5 text-rose-500 dark:text-rose-400" />,
      bg: "bg-rose-50 dark:bg-rose-950/60",
      link: "#services",
    },
    {
      title: "Pet Care Tips",
      desc: "Expert advice for a better life.",
      icon: <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
      bg: "bg-amber-50 dark:bg-amber-950/60",
      link: "#why-us",
    },
  ];

  return (
    <section id="home" className="relative overflow-hidden pt-20 sm:pt-24 transition-colors duration-300">
      
      {/* Hero Live Background Animation System (Living Aurora, Sequential Walking Trail, Floating Particles, Interactive Glow) */}
      <HeroLiveBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Split Grid: On Mobile Image Renders First (order-1), Text Below (order-2) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[540px]">
          
          {/* Left Column (Text & CTAs): order-2 on mobile, order-1 on desktop */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-5 sm:space-y-6 pt-2 lg:pt-4 pb-6 text-center lg:text-left">
            
            {/* Tagline Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-teal-100/70 dark:bg-teal-900/40 border border-teal-200/80 dark:border-teal-700/50 backdrop-blur-sm shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-teal-800 dark:text-teal-200">
                Healthy Pets, Happy Lives
              </span>
            </div>

            {/* Massive Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0f3438] dark:text-white tracking-tight leading-[1.08]">
              Pet Care <span className="text-teal-700 dark:text-teal-400">&amp; Vet</span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#114045] dark:text-slate-100 mt-2">
                Your Trusted Partner for Your Pet’s Health
                <span className="inline-block text-teal-600 dark:text-teal-400 text-3xl sm:text-5xl ml-2 font-handwriting rotate-[-10deg]">
                  ♡
                </span>
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              Expert veterinary care, smart pet care solutions, and a happier life for your furry friends.
              Schedule appointments with certified physicians in under two minutes.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2">
              <button
                onClick={handleScrollToServices}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold text-sm sm:text-base shadow-xl shadow-teal-800/30 hover:shadow-teal-800/45 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 cursor-pointer group"
              >
                <span className="text-lg">🐾</span>
                <span>{isAuthenticated ? `Book Visit (${user?.name?.split(" ")[0]})` : "Explore Services"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              {/* Replaced 'Watch Video' with 'Meet Doctors' which scrolls directly to Specialists */}
              <button
                onClick={handleScrollToVets}
                className="px-6 py-3.5 rounded-full bg-white/95 dark:bg-white/10 hover:bg-teal-50 dark:hover:bg-white/15 text-[#0f3438] dark:text-white font-bold text-sm sm:text-base border border-teal-200/90 dark:border-white/15 shadow-md shadow-teal-900/5 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <span>Meet Doctors</span>
              </button>
            </div>

            {/* Trust Badges Row */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 pt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-900/70 text-teal-700 dark:text-teal-300 flex items-center justify-center text-[10px] font-black">✓</span>
                <span>Zero Waiting Queues</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-900/70 text-teal-700 dark:text-teal-300 flex items-center justify-center text-[10px] font-black">✓</span>
                <span>25+ Certified Doctors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-teal-100 dark:bg-teal-900/70 text-teal-700 dark:text-teal-300 flex items-center justify-center text-[10px] font-black">✓</span>
                <span>24/7 ICU Trauma</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Centerpiece Artwork (order-1 on mobile so it displays FIRST at the top) */}
          <div className="order-1 lg:order-2 lg:col-span-6 relative flex flex-col items-center justify-center pt-2 pb-4 lg:py-4">
            
            {/* Mobile-only Cute Top Handwritten Doodle */}
            <div className="flex lg:hidden items-center justify-center gap-2 mb-3 pointer-events-none select-none">
              <span className="font-handwriting text-2xl sm:text-3xl text-teal-800 dark:text-teal-200 font-bold rotate-[-2deg] drop-shadow-sm">
                Because they are family ♡
              </span>
              <span className="text-teal-600 dark:text-teal-300 text-xl rotate-12">🐾</span>
            </div>

            {/* Desktop Floating Handwritten Doodle */}
            <div className="hidden lg:flex absolute -top-8 right-6 xl:right-10 z-30 pointer-events-none select-none items-center gap-2">
              <span className="font-handwriting text-2xl xl:text-3xl text-teal-800 dark:text-teal-200 font-bold rotate-[4deg] drop-shadow-sm">
                Because they are family ♡
              </span>
              <span className="text-teal-600 dark:text-teal-300 text-xl rotate-12">🐾</span>
            </div>

            {/* Glowing Ambient Backdrop Aura */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-teal-400/35 via-emerald-400/25 to-teal-500/30 dark:from-teal-500/25 dark:via-emerald-500/15 dark:to-teal-400/20 rounded-[56px] blur-3xl transform scale-95 pointer-events-none" />

            {/* Main Hero Visual Card - Sculptured Organic Glass Shell */}
            <div className="relative z-10 w-full max-w-lg lg:max-w-none my-4 sm:my-2 rounded-[32px] sm:rounded-[48px] p-2.5 sm:p-3.5 bg-gradient-to-b from-white/95 via-white/80 to-white/95 dark:from-white/10 dark:via-white/5 dark:to-white/10 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-[0_25px_60px_-15px_rgba(13,148,136,0.25)] dark:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] ring-1 ring-teal-500/20 group">
              
              {/* Image Viewport Container */}
              <div className="relative rounded-[24px] sm:rounded-[40px] overflow-hidden aspect-[16/10] sm:aspect-[16/10.5] w-full bg-gradient-to-br from-teal-50 to-slate-100 dark:from-slate-900 dark:to-[#072427]">
                <img
                  src={activeImage}
                  alt="PetCare & Vet Dedicated Doctors and Animal Companions"
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out select-none"
                />
                
                {/* Soft Bottom-to-Top Ambient Feather Mask so it blends into the container */}
                <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-white/80 via-white/20 to-transparent dark:from-[#061e20]/80 dark:via-[#061e20]/20 dark:to-transparent pointer-events-none" />
                
                {/* Subtle Inner Ring */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10 rounded-[24px] sm:rounded-[40px] pointer-events-none" />

                {/* Interactive Image Style Switcher Pill: Positioned at bottom-right on mobile to prevent overlapping badges */}
                <div className="absolute bottom-3 right-3 sm:top-3 sm:right-3 sm:bottom-auto z-20 flex items-center gap-1 p-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-md">
                  <button
                    onClick={() => setActiveImage(petcareHomeBg)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase transition-all cursor-pointer ${
                      activeImage === petcareHomeBg
                        ? "bg-teal-700 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white"
                    }`}
                  >
                    Clinic Art
                  </button>
                  <button
                    onClick={() => setActiveImage(heroVetFamily)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase transition-all cursor-pointer ${
                      activeImage === heroVetFamily
                        ? "bg-teal-700 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white"
                    }`}
                  >
                    4K Studio
                  </button>
                </div>
              </div>

              {/* Floating Interactive Glass Badge #1: Certified Specialists (Top Left) - No specific doctor name as requested */}
              <div className="absolute -top-3.5 left-2 sm:-top-4 sm:-left-6 z-20 bg-white/95 dark:bg-[#08282b]/95 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl border border-teal-100 dark:border-teal-700/50 shadow-xl shadow-teal-950/15 flex items-center gap-2.5 sm:gap-3 animate-float hover:scale-105 transition-transform cursor-default max-w-[72%] sm:max-w-none">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white text-sm sm:text-lg shadow-sm">
                    🩺
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white dark:border-[#08282b] rounded-full animate-ping" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-500 border-2 border-white dark:border-[#08282b] rounded-full" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white truncate">Certified Vet Specialists</span>
                    <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold uppercase tracking-wider shrink-0">Online</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-300 font-semibold flex items-center gap-1.5 truncate">
                    <span className="flex items-center text-amber-500 shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline mr-0.5" />
                      5.0
                    </span>
                    <span className="truncate">• 25+ Expert Doctors</span>
                  </p>
                </div>
              </div>

              {/* Floating Interactive Glass Badge #2: Vaccination Schedule (Bottom Left) */}
              <div className="absolute -bottom-3.5 left-2 sm:-bottom-5 sm:-left-4 z-20 bg-white/95 dark:bg-[#08282b]/95 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-2xl border border-teal-100 dark:border-teal-700/50 shadow-xl shadow-teal-950/15 flex items-center gap-2.5 sm:gap-3 animate-float-slow hover:scale-105 transition-transform cursor-default max-w-[75%] sm:max-w-none">
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700/40 flex items-center justify-center text-amber-600 text-xs sm:text-base shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white truncate">Vaccination Record</span>
                    <span className="text-[8px] sm:text-[9px] font-extrabold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/50 px-1.5 py-0.5 rounded shrink-0">100% Up to Date</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-300 font-medium truncate">Buddy 🐕 &amp; Luna 🐈 Protection</p>
                </div>
              </div>

              {/* Floating Interactive Glass Badge #3: 24/7 ICU Trauma Dispatch (Bottom Right, Hidden on very small screens to avoid clutter) */}
              <div className="hidden sm:flex absolute -bottom-4 -right-3 sm:-right-6 z-20 bg-white/95 dark:bg-[#08282b]/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-teal-100 dark:border-teal-700/50 shadow-xl shadow-teal-950/15 items-center gap-3 animate-float hover:scale-105 transition-transform cursor-default">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-700/40 flex items-center justify-center text-rose-600 text-sm sm:text-base">
                  <ShieldCheck className="w-4 h-4 text-rose-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-800 dark:text-white">24/7 Trauma ICU</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-300 font-medium">Zero-Delay Rapid Dispatch</p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Wave Transition Header into Services Cards */}
      <div className="relative pt-10 pb-2">
        
        {/* Services Section Intro Banner */}
        <div className="text-center max-w-2xl mx-auto px-4 mb-8">
          <div className="inline-flex items-center gap-1.5 text-2xl sm:text-3xl font-black text-[#0f3438] dark:text-white">
            <span className="text-teal-600">🐾</span>
            <span>Our Services</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
            Comprehensive care for every pet
          </p>
        </div>

        {/* 5 Rounded Floating Pill Cards Row (Image 1 Layout) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {serviceHighlights.map((s, idx) => (
              <a
                key={idx}
                href={s.link}
                className="group p-5 rounded-3xl bg-white dark:bg-[#092224] border border-teal-100/80 dark:border-teal-800/30 shadow-md shadow-teal-900/5 dark:shadow-black/20 hover:shadow-xl hover:border-teal-300 dark:hover:border-teal-600 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${s.bg} border border-teal-100 dark:border-teal-800/40 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                    {s.icon}
                  </div>
                  <h3 className="text-base font-extrabold text-[#0f3438] dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                    {s.desc}
                  </p>
                </div>

                <div className="pt-4 flex justify-end">
                  <div className="w-7 h-7 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-100 dark:border-white/10 flex items-center justify-center text-teal-700 dark:text-teal-400 group-hover:bg-teal-700 group-hover:text-white transition-all shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Deep Organic Wavy Ribbon with Stats & Script (Image 1 Bottom Ribbon) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2">
          <div className="relative rounded-3xl bg-gradient-to-r from-[#033b3a] via-[#044c4a] to-[#033b3a] text-white p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 border border-teal-700/40">
            
            {/* Background Paw Watermark */}
            <div className="absolute right-12 top-0 text-white/5 text-9xl pointer-events-none select-none">
              🐾
            </div>

            {/* Left Column: Key Stats with Icons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🐾</span>
                <div>
                  <p className="text-xl sm:text-2xl font-black tracking-tight">10K+</p>
                  <p className="text-xs text-teal-200 uppercase font-semibold">Happy Pets</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">👤</span>
                <div>
                  <p className="text-xl sm:text-2xl font-black tracking-tight">5K+</p>
                  <p className="text-xs text-teal-200 uppercase font-semibold">Pet Owners</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-2xl">🛡️</span>
                <div>
                  <p className="text-xl sm:text-2xl font-black tracking-tight">24/7</p>
                  <p className="text-xs text-teal-200 uppercase font-semibold">Emergency Support</p>
                </div>
              </div>
            </div>

            {/* Center: Hand-written Script Banner */}
            <div className="text-center font-handwriting text-3xl sm:text-4xl text-teal-100 drop-shadow-md font-bold rotate-[-2deg]">
              Healthy Pets. Happy Lives. ♡
            </div>

            {/* Right: Learn More Pill Button */}
            <div className="shrink-0">
              <a
                href="#why-us"
                className="px-6 py-2.5 rounded-full border border-teal-300/40 hover:bg-white hover:text-[#033b3a] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};

export default HeroSection;