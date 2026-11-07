import React from "react";
import { Link } from "react-router-dom";
import {
  Stethoscope,
  Activity,
  Scissors,
  Syringe,
  Pill,
  Sparkles,
  ShieldAlert,
  Bone,
  ArrowRight
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  popular?: boolean;
}

export const ServicesSection: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: "general-consultation",
      title: "Comprehensive Wellness & Checkups",
      description: "Thorough head-to-tail examinations, weight tracking, vital signs assessment, and preventative care plans tailored to your pet's life stage.",
      icon: <Stethoscope className="w-6 h-6 text-themeYellow-400" />,
      tags: ["Preventative", "Full Exam", "Nutrition"],
      popular: true,
    },
    {
      id: "emergency-care",
      title: "24/7 Emergency & ICU Trauma",
      description: "Immediate triage, oxygen therapy, urgent trauma management, and intensive monitoring available round the clock 365 days a year.",
      icon: <ShieldAlert className="w-6 h-6 text-red-400" />,
      tags: ["24/7 Available", "ICU Support", "Rapid Response"],
      popular: true,
    },
    {
      id: "surgery",
      title: "Advanced Surgery & Laparoscopy",
      description: "Modern sterile surgical suite performing soft tissue, spay/neuter, orthopedic corrections, and minimally invasive procedures with safe anesthesia.",
      icon: <Activity className="w-6 h-6 text-amber-400" />,
      tags: ["Sterile Suite", "Orthopedic", "Safe Anesthesia"],
    },
    {
      id: "vaccination",
      title: "Vaccination & Microchipping",
      description: "Essential core and non-core vaccines (Rabies, DHPP, FVRCP) along with painless microchipping and digital registry records.",
      icon: <Syringe className="w-6 h-6 text-themeYellow-400" />,
      tags: ["Immunization", "Global Microchip", "Digital Passport"],
    },
    {
      id: "grooming",
      title: "Luxury Grooming & Spa Care",
      description: "Stress-free grooming, coat styling, medicated baths for dermatology issues, gentle nail clipping, and ear cleaning by certified pet stylists.",
      icon: <Scissors className="w-6 h-6 text-yellow-300" />,
      tags: ["Medicated Bath", "Nail Clipping", "Styling"],
    },
    {
      id: "dental-care",
      title: "Ultrasonic Dental Scaling & Oral Care",
      description: "Professional dental cleaning under monitored sedation, plaque removal, polishing, extractions, and gum disease prevention.",
      icon: <Bone className="w-6 h-6 text-themeYellow-400" />,
      tags: ["Scaling", "Fresh Breath", "Oral Health"],
    },
    {
      id: "pharmacy",
      title: "In-House Certified Pharmacy",
      description: "Fully stocked veterinary dispensary offering prescription medications, flea & tick prevention, heartworm treatments, and specialized diets.",
      icon: <Pill className="w-6 h-6 text-amber-300" />,
      tags: ["Genuine Meds", "Parasite Control", "Prescriptions"],
    },
  ];

  return (
    <section id="services" className="relative py-24 bg-themeDark-950 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-themeYellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-themeYellow-400/10 border border-themeYellow-400/25 text-themeYellow-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Veterinary & Pet Care Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            World-Class Healthcare for Every Paw, Claws & Tail
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            From routine wellness visits to high-precision surgical intervention and luxury styling,
            we offer end-to-end pet healthcare under one roof.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-7 relative flex flex-col justify-between group overflow-hidden"
            >
              {/* Popular Yellow Ribbon */}
              {item.popular && (
                <div className="absolute top-4 right-4">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-themeYellow-400/20 text-themeYellow-300 border border-themeYellow-400/40">
                    High Demand
                  </span>
                </div>
              )}

              <div>
                {/* Icon Container */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-themeYellow-400/10 group-hover:border-themeYellow-400/30 transition-all">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-themeYellow-400 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-themeYellow-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <Link
                    to="/register"
                    className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 hover:bg-themeYellow-400/20 hover:text-themeYellow-300 transition-all"
                  >
                    Book Visit
                  </Link>
                </div>
              </div>

            </div>
          ))}

          {/* Special 24/7 Emergency Feature Card */}
          <div className="rounded-3xl p-6 sm:p-7 relative flex flex-col justify-between bg-gradient-to-br from-red-950/60 via-themeDark-900 to-themeDark-950 border border-red-500/30 shadow-xl overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-red-500/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-6">
                <ShieldAlert className="w-7 h-7 text-red-400 animate-pulse" />
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                Critical Assistance
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-1 mb-3">
                Need Immediate Emergency Help?
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Our surgical team and oxygen ICU are ready for severe injuries, poison ingestions,
                breathing distress, and unexpected critical illnesses.
              </p>
            </div>

            <div>
              <div className="p-4 rounded-2xl bg-black/40 border border-red-500/20 mb-4">
                <p className="text-xs text-slate-400">Direct Hotline (24/7)</p>
                <p className="text-xl font-black text-red-400 tracking-wide mt-0.5">
                  +94 (11) 234-5678
                </p>
              </div>

              <a
                href="tel:+94112345678"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/30"
              >
                <span>Call Emergency Squad Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
