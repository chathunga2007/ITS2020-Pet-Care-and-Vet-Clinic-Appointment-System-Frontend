import React, { useState } from 'react';
import { Calendar, PhoneCall, ShieldCheck, Heart, Sparkles, Star, ChevronRight, Stethoscope } from 'lucide-react';
import VideoBackground from '../common/VideoBackground';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [selectedPet, setSelectedPet] = useState('Dog');
  const [selectedService, setSelectedService] = useState('General Consultation');

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Dynamic Looping Pet Care Video Background */}
      <VideoBackground overlayOpacity="bg-slate-950/70" />

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column: Hero typography & CTAs */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-6">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs sm:text-sm font-semibold backdrop-blur-md animate-pulse-slow">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Sri Lanka's #1 Rated Veterinary Hospital &amp; Pet Spa</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
            World-Class Care for Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Beloved Furry Companions
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
            From routine wellness examinations and specialist surgeries to luxury grooming and 24/7 life-saving emergency support — our compassionate team treats your pets like family.
          </p>

          {/* Trust stats counter */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8 pt-2 text-slate-300 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-base">15+ Vets</p>
                <p className="text-slate-400 text-xs">Board Certified</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
                <Heart className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-base">18,000+</p>
                <p className="text-slate-400 text-xs">Happy Pets Treated</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <div className="text-left">
                <p className="font-bold text-white text-base">4.9 / 5.0</p>
                <p className="text-slate-400 text-xs">Over 3,400 Reviews</p>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold px-7 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:scale-105"
            >
              <Calendar className="w-5 h-5" /> Book an Appointment Now
            </button>

            <a
              href="tel:+94112345678"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-2xl backdrop-blur-md border border-white/20 transition-all duration-300"
            >
              <PhoneCall className="w-5 h-5 text-rose-400 animate-bounce" /> 24/7 Emergency Dispatch
            </a>
          </div>
        </div>

        {/* Right column: Quick Booking Glass Widget */}
        <div className="lg:col-span-5">
          <div className="glass-card-dark p-6 sm:p-8 rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-400">
                  Instant Availability
                </span>
                <h3 className="text-xl font-bold text-white">Quick Appointment Slot</h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
                <Stethoscope className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-5 space-y-4">
              {/* Pet selection radio tabs */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  What kind of pet do you have?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Dog 🐶', val: 'Dog' },
                    { label: 'Cat 🐱', val: 'Cat' },
                    { label: 'Bird 🦜', val: 'Bird' },
                    { label: 'Other 🐾', val: 'Other' },
                  ].map((p) => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setSelectedPet(p.val)}
                      className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition ${
                        selectedPet === p.val
                          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/40 ring-2 ring-emerald-400'
                          : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Service selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Primary Medical Care / Service
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-slate-800/90 text-white border border-white/10 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-400 outline-none"
                >
                  <option value="General Consultation">General Vet Health Examination</option>
                  <option value="Vaccination & Deworming">Vaccination &amp; Preventive Shots</option>
                  <option value="Surgery & Orthopedic">Specialist Vet Surgery</option>
                  <option value="Pet Spa & Grooming">Professional Styling &amp; Grooming</option>
                  <option value="Dental Hygiene">Ultrasonic Dental Scaling</option>
                  <option value="Emergency Care">🚨 Emergency Treatment</option>
                </select>
              </div>

              {/* Quick perks info */}
              <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3 text-xs text-emerald-200/90 flex items-center justify-between">
                <span>🕒 Next Available Slot: <strong>Today at 2:30 PM</strong></span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  Open
                </span>
              </div>

              {/* Instant trigger CTA */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-3 rounded-xl shadow-lg transition flex items-center justify-center gap-2 group"
              >
                <span>Reserve Consultation for {selectedPet}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

