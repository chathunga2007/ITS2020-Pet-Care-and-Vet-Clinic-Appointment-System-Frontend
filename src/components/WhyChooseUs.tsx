import React from "react";
import {
  ShieldCheck,
  Zap,
  Award,
  HeartPulse,
  Clock,
  Sparkles,
  CheckCircle2
} from "lucide-react";

export const WhyChooseUs: React.FC = () => {
  const highlights = [
    {
      title: "Board Certified Surgeons & Vets",
      description: "Our physicians have over 15+ years of clinical surgery and veterinary diagnostic mastery.",
      icon: <Award className="w-5 h-5 text-themeYellow-400" />
    },
    {
      title: "Zero-Stress & Fear-Free Certified",
      description: "Gentle handling techniques, soothing environment, and separate waiting areas for dogs and cats.",
      icon: <HeartPulse className="w-5 h-5 text-themeYellow-400" />
    },
    {
      title: "Instant Digital Records & Booking",
      description: "Log in anytime to view medical histories, vaccination reminders, and schedule next visits in 30 seconds.",
      icon: <Zap className="w-5 h-5 text-themeYellow-400" />
    },
    {
      title: "365-Day 24/7 Availability",
      description: "Holidays, late nights, or weekend emergencies — our trauma staff is always on duty to save lives.",
      icon: <Clock className="w-5 h-5 text-themeYellow-400" />
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-themeDark-900/60 relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and Highlights */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-themeYellow-400/10 border border-themeYellow-400/25 text-themeYellow-400 text-xs font-bold uppercase tracking-wider mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Why Pet Parents Trust PetVitals</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              The Gold Standard of Modern Veterinary Care
            </h2>

            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              We treat your pets like our own family. Combining cutting-edge medical technology with gentle,
              heartfelt empathy, we deliver compassionate outcomes every single day.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {highlights.map((item, idx) => (
                <div key={idx} className="glass-card rounded-2xl p-5 border border-white/5 hover:border-themeYellow-500/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-themeYellow-400/10 border border-themeYellow-400/20 flex items-center justify-center mb-3">
                    {item.icon}
                  </div>
                  <h4 className="text-base font-bold text-white mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-themeYellow-500/20 to-amber-600/20 blur-xl opacity-70" />
            
            <div className="relative glass-card rounded-3xl p-8 sm:p-10 border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold text-themeYellow-400 uppercase tracking-widest">
                    Clinic Standards
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">Our Care Guarantee</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-themeYellow-400/10 border border-themeYellow-400/30 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-themeYellow-400" />
                </div>
              </div>

              <div className="space-y-4">
                {[
                  "ISO-Certified sterilization protocols for every surgical procedure",
                  "Dedicated feline-only & canine-only recovery wards to minimize stress",
                  "Real-time vital monitoring & digital telemetry during anesthesia",
                  "Transparent estimates with zero surprise hidden clinic costs",
                  "Post-treatment follow-up calls & direct doctor messaging"
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-themeYellow-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-200">{text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Emergency & Standard Care</p>
                  <p className="text-sm font-bold text-white">Colombo 07, Sri Lanka</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Clinic Open Now</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;

