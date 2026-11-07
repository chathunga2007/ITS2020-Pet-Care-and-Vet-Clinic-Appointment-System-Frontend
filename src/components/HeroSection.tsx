import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Calendar,
  PhoneCall,
  ArrowRight,
  PlusCircle,
  Clock,
  Award
} from "lucide-react";

export const HeroSection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate("/register");
    } else {
      const el = document.getElementById("booking-simulator");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center overflow-hidden pt-28 pb-20">
      
      {/* Cinematic High-Res Pet Clinic & Veterinarian Care Backdrop */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=2000"
          alt="Veterinary Pet Care"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.15] scale-105"
        />

        {/* Multi-layered Clinic Gradients (Logo Cyan, Purple & Amber Ambience) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/75 to-[#07090e]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_-15%,rgba(14,165,233,0.18),rgba(168,85,247,0.12),rgba(7,9,14,0))]" />
      </div>

      {/* Floating Animated Light Blobs Matching Logo Colors */}
      <div className="absolute top-1/4 left-8 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-8 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />
      <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Brand Highlight Badge with Actual PetVitals Logo */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-sky-400/30 backdrop-blur-xl mb-6 shadow-xl shadow-sky-500/10">
          <div className="w-5 h-5 rounded-full bg-white/10 p-0.5 flex items-center justify-center">
            <img
              src="/pet-care-web-logo.png"
              alt="Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xs sm:text-sm font-bold text-sky-300 tracking-wide">
            Add Your Pets • Book Vet Appointments • 24/7 Clinic Care
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Everything Your Pets Need to{" "}
          <span className="text-gradient-logo relative inline-block">
            Thrive & Stay Healthy
            <svg
              className="absolute -bottom-2 left-0 w-full text-sky-400/30"
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
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed mb-10">
          Create individual profiles for your dogs, cats, rabbits, and birds.
          Schedule appointments with specialized veterinarians, track digital prescriptions,
          and receive round-the-clock emergency care.
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={handleBookNow}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold text-base shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer group"
          >
            <PlusCircle className="w-5 h-5 text-slate-950 group-hover:rotate-90 transition-transform duration-300" />
            <span>{isAuthenticated ? `Welcome ${user?.name} - Book Appointment` : "Add Pet & Book Appointment"}</span>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="tel:+94112345678"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#0d111a]/80 hover:bg-[#131926] text-white font-semibold text-base border border-red-500/30 hover:border-red-500/60 hover:text-red-300 transition-all flex items-center justify-center gap-3 shadow-lg"
          >
            <PhoneCall className="w-5 h-5 text-red-400 animate-pulse" />
            <span>24/7 Emergency Hotline</span>
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

        {/* Quick Trust Highlights Banner (Supports Dogs, Cats, Rabbits, Birds) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          
          <div className="glass-card rounded-2xl p-4 text-center border border-white/10 hover:border-sky-400/40 transition-all">
            <span className="text-2xl mb-1 block">🐶 🐱 🐰 🦜</span>
            <p className="text-xl sm:text-2xl font-extrabold text-white">All Pets</p>
            <p className="text-xs text-slate-400">Dogs, Cats, Rabbits & Birds</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border border-white/10 hover:border-purple-400/40 transition-all">
            <div className="w-8 h-8 mx-auto rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center mb-1">
              <Calendar className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white">Instant</p>
            <p className="text-xs text-slate-400">Online Appointment Booking</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border border-white/10 hover:border-pink-400/40 transition-all">
            <div className="w-8 h-8 mx-auto rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center mb-1">
              <Award className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white">25+ Vets</p>
            <p className="text-xs text-slate-400">Certified Surgeons & Physicians</p>
          </div>

          <div className="glass-card rounded-2xl p-4 text-center border border-white/10 hover:border-red-400/40 transition-all">
            <div className="w-8 h-8 mx-auto rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <p className="text-xl sm:text-2xl font-extrabold text-white">24/7 Care</p>
            <p className="text-xs text-slate-400">Trauma ICU Always Open</p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;
