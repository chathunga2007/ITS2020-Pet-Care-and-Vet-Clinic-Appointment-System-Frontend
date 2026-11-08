import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import heroVetFamily from "../assets/hero-vet-family.jpg";
import petcareHomeBg from "../assets/petcare home bg.png";
import {
  ArrowRight,
  Play,
  X,
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
  const [showVideoModal, setShowVideoModal] = useState(false);
  // Default to our 4K ultra-clean generated hero banner, with toggle option
  const [activeImage, setActiveImage] = useState<string>(heroVetFamily);

  const handleScrollToServices = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-[#eaf8f6] via-[#f3fbf9] to-white dark:from-[#061e20] dark:via-[#072427] dark:to-[#07090e] pt-6 sm:pt-10 transition-colors duration-300">
      
      {/* Ambient Lighting Orbs for Deep Depth */}
      <div className="absolute top-10 right-1/4 w-[480px] h-[480px] bg-teal-300/20 dark:bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-36 left-10 w-[380px] h-[380px] bg-emerald-300/15 dark:bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

      {/* Playful Floating Paw Background Accents */}
      <div className="absolute top-12 left-10 text-teal-600/15 dark:text-teal-400/10 text-4xl select-none pointer-events-none transform -rotate-12 animate-pulse-slow">
        🐾
      </div>
      <div className="absolute top-28 left-1/3 text-teal-600/15 dark:text-teal-400/15 text-3xl select-none pointer-events-none transform rotate-12">
        🐾
      </div>
      <div className="absolute top-1/2 left-8 text-teal-600/10 dark:text-teal-400/10 text-5xl select-none pointer-events-none transform -rotate-45">
        🐾
      </div>
      <div className="absolute top-16 right-1/4 text-teal-600/15 dark:text-teal-400/15 text-4xl select-none pointer-events-none transform rotate-45">
        🐾
      </div>
      <div className="absolute top-1/3 right-10 text-teal-600/10 dark:text-teal-400/10 text-5xl select-none pointer-events-none transform -rotate-12">
        🐾
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[540px]">
          
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-6 space-y-6 pt-4 pb-6">
            
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
            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              Expert veterinary care, smart pet care solutions, and a happier life for your furry friends.
              Schedule appointments with certified physicians in under two minutes.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleScrollToServices}
                className="px-7 py-3.5 rounded-full bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold text-sm sm:text-base shadow-xl shadow-teal-800/30 hover:shadow-teal-800/45 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 cursor-pointer group"
              >
                <span className="text-lg">🐾</span>
                <span>{isAuthenticated ? `Book Visit (${user?.name?.split(" ")[0]})` : "Explore Services"}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => setShowVideoModal(true)}
                className="px-6 py-3.5 rounded-full bg-white/95 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 text-[#0f3438] dark:text-white font-bold text-sm sm:text-base border border-teal-200/80 dark:border-white/10 shadow-md shadow-teal-900/5 hover:shadow-lg transition-all flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Watch Video</span>
              </button>
            </div>

            {/* Trust Badges Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 pt-2">
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

          {/* Right Column: Visual Centerpiece Artwork in Unique Luxury Glass Frame */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center lg:py-4">
            
            {/* Playful Handwriting Doodle Text & Paw */}
            <div className="absolute -top-7 sm:-top-9 right-4 sm:right-10 z-30 pointer-events-none select-none flex items-center gap-2">
              <span className="font-handwriting text-2xl sm:text-3xl text-teal-800 dark:text-teal-200 font-bold rotate-[4deg] drop-shadow-sm">
                Because they are family ♡
              </span>
              <span className="text-teal-600 dark:text-teal-300 text-xl rotate-12">🐾</span>
            </div>

            {/* Glowing Ambient Backdrop Aura */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-tr from-teal-400/35 via-emerald-400/25 to-teal-500/30 dark:from-teal-500/25 dark:via-emerald-500/15 dark:to-teal-400/20 rounded-[56px] blur-3xl transform scale-95 pointer-events-none" />

            {/* Main Hero Visual Card - Sculptured Organic Glass Shell */}
            <div className="relative z-10 w-full max-w-xl lg:max-w-none rounded-[36px] sm:rounded-[48px] p-2.5 sm:p-3.5 bg-gradient-to-b from-white/95 via-white/80 to-white/95 dark:from-white/10 dark:via-white/5 dark:to-white/10 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-[0_25px_60px_-15px_rgba(13,148,136,0.25)] dark:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.8)] ring-1 ring-teal-500/20 group">
              
              {/* Image Viewport Container */}
              <div className="relative rounded-[28px] sm:rounded-[40px] overflow-hidden aspect-[16/10] sm:aspect-[16/10.5] w-full bg-gradient-to-br from-teal-50 to-slate-100 dark:from-slate-900 dark:to-[#072427]">
                <img
                  src={activeImage}
                  alt="PetCare & Vet Dedicated Doctors and Animal Companions"
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.03] transition-transform duration-700 ease-out select-none"
                />
                
                {/* Soft Bottom-to-Top Ambient Feather Mask so it blends into the container */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/80 via-white/20 to-transparent dark:from-[#061e20]/80 dark:via-[#061e20]/20 dark:to-transparent pointer-events-none" />
                
                {/* Subtle Inner Ring */}
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10 rounded-[28px] sm:rounded-[40px] pointer-events-none" />

                {/* Optional Interactive Image Style Switcher Pill */}
                <div className="absolute top-3 right-3 z-20 flex items-center gap-1 p-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/60 dark:border-white/10 shadow-md">
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
                </div>
              </div>

              {/* Floating Interactive Glass Badge #1: Doctor Certification (Top Left) */}
              <div className="absolute -top-4 -left-3 sm:-left-6 z-20 bg-white/95 dark:bg-[#08282b]/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-teal-100 dark:border-teal-700/50 shadow-xl shadow-teal-950/15 flex items-center gap-3 animate-float hover:scale-105 transition-transform cursor-default">
                <div className="relative">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white text-base sm:text-lg shadow-sm">
                    🩺
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#08282b] rounded-full animate-ping" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#08282b] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white">Dr. Samantha Perera</span>
                    <span className="text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold uppercase tracking-wider">Online</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-500 dark:text-slate-300 font-semibold flex items-center gap-1.5">
                    <span className="flex items-center text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400 inline mr-0.5" />
                      5.0
                    </span>
                    <span>• Chief Surgeon</span>
                  </p>
                </div>
              </div>

              {/* Floating Interactive Glass Badge #2: Vaccination Schedule (Bottom Left) */}
              <div className="absolute -bottom-5 -left-2 sm:-left-4 z-20 bg-white/95 dark:bg-[#08282b]/95 backdrop-blur-md px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-teal-100 dark:border-teal-700/50 shadow-xl shadow-teal-950/15 flex items-center gap-3 animate-float-slow hover:scale-105 transition-transform cursor-default">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-700/40 flex items-center justify-center text-amber-600 text-sm sm:text-base">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-800 dark:text-white">Vaccination Record</span>
                    <span className="text-[9px] font-extrabold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/50 px-1.5 py-0.5 rounded">100% Up to Date</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-300 font-medium">Buddy 🐕 &amp; Luna 🐈 Protection</p>
                </div>
              </div>

              {/* Floating Interactive Glass Badge #3: 24/7 ICU Trauma Dispatch (Bottom Right) */}
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
      <div className="relative pt-12 pb-6">
        
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
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

      {/* Video Modal Popup */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <span>🐾</span>
                <span>PetCare &amp; Vet Clinic Tour</span>
              </div>
              <button
                onClick={() => setShowVideoModal(false)}
                className="p-1 rounded-full text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="PetCare & Vet Clinic Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default HeroSection;