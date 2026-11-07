import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Calendar,
  PhoneCall,
  Sparkles,
  ShieldCheck,
  Heart,
  Award,
  Clock,
  ArrowRight
} from "lucide-react";

export const VideoHero: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate("/register");
    } else {
      const el = document.getElementById("services");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Video Player */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-[0.45] contrast-[1.1]"
        >
          <source src="/videos/hero-bg.mp4" type="video/mp4" />
          <source src="/videos/puppy-bg.webm" type="video/webm" />
          Your browser does not support HTML5 video.
        </video>

        {/* Sophisticated Overlay Gradients (Black + Golden Yellow Ambient Glow) */}
        <div className="absolute inset-0 bg-gradient-to-t from-themeDark-950 via-themeDark-950/70 to-themeDark-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(245,158,11,0.18),rgba(10,13,20,0))]" />
      </div>

      {/* Floating Animated Ambient Elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-themeYellow-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none animate-float-slow" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Top Highlight Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-themeYellow-400/10 border border-themeYellow-400/30 backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-3 duration-500 shadow-lg shadow-themeYellow-500/10">
          <Sparkles className="w-4 h-4 text-themeYellow-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs sm:text-sm font-semibold text-themeYellow-300 tracking-wide">
            #1 Advanced Veterinary Hospital & Pet Wellness Clinic
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Compassionate Care for Your{" "}
          <span className="text-gradient-yellow relative inline-block">
            Furry Family
            <svg
              className="absolute -bottom-2 left-0 w-full text-themeYellow-400/40"
              viewBox="0 0 250 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 11C60 3 190 3 247 11"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed mb-10">
          Experience state-of-the-art veterinary medicine, 24/7 emergency response,
          gentle pet grooming, and seamless online appointments designed for modern pet parents.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={handleBookNow}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-themeYellow-400 via-amber-400 to-themeYellow-500 hover:from-themeYellow-300 hover:to-themeYellow-400 text-themeDark-950 font-bold text-base shadow-xl shadow-themeYellow-500/30 hover:shadow-themeYellow-500/50 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Calendar className="w-5 h-5 text-themeDark-950 group-hover:rotate-12 transition-transform" />
            <span>{isAuthenticated ? "Book Appointment Now" : "Get Started / Register"}</span>
            <ArrowRight className="w-5 h-5 text-themeDark-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="tel:+94112345678"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-themeDark-850/80 hover:bg-themeDark-800 text-white font-semibold text-base border border-white/10 hover:border-red-500/50 hover:text-red-300 transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <PhoneCall className="w-5 h-5 text-red-400 animate-pulse" />
            <span>24/7 Emergency ICU</span>
          </a>

          {!isAuthenticated && (
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-slate-300 hover:text-white hover:bg-white/5 font-semibold text-base transition-colors"
            >
              Sign In to Account &rarr;
            </Link>
          )}
        </div>

        {/* Floating Quick Trust Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          
          <div className="glass-card rounded-2xl p-4 text-center border border-white/10 hover:border-themeYellow-500/30 transition-all">
            <div className="w-10 h-10 mx-auto rounded-xl bg-themeYellow-500/10 text-themeYellow-400 flex items-center justify-center mb-2">
              <Heart className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">15,000+</p>
            <p className="text-xs text-slate-400 font-medium">Pets Treated With Love</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border border-white/10 hover:border-themeYellow-500/30 transition-all">
            <div className="w-10 h-10 mx-auto rounded-xl bg-themeYellow-500/10 text-themeYellow-400 flex items-center justify-center mb-2">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">25+ Vets</p>
            <p className="text-xs text-slate-400 font-medium">Certified Specialists</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border border-white/10 hover:border-themeYellow-500/30 transition-all">
            <div className="w-10 h-10 mx-auto rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">24/7 Hours</p>
            <p className="text-xs text-slate-400 font-medium">Always Open For Emergencies</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border border-white/10 hover:border-themeYellow-500/30 transition-all">
            <div className="w-10 h-10 mx-auto rounded-xl bg-themeYellow-500/10 text-themeYellow-400 flex items-center justify-center mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold text-white">99.8%</p>
            <p className="text-xs text-slate-400 font-medium">Client Satisfaction</p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VideoHero;

