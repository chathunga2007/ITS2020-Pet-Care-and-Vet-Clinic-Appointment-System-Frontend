import React from "react";
import { Link } from "react-router-dom";
import SectionLiveBackground from "./SectionLiveBackground";
import {
  Stethoscope,
  Activity,
  Scissors,
  Syringe,
  Pill,
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
      icon: <Stethoscope className="w-6 h-6 text-teal-700 dark:text-teal-300" />,
      tags: ["Preventative", "Full Exam", "Nutrition"],
      popular: true,
    },
    {
      id: "emergency-care",
      title: "24/7 Emergency & ICU Trauma",
      description: "Immediate triage, oxygen therapy, urgent trauma management, and intensive monitoring available round the clock 365 days a year.",
      icon: <ShieldAlert className="w-6 h-6 text-red-500 dark:text-red-400" />,
      tags: ["24/7 Available", "ICU Support", "Rapid Response"],
      popular: true,
    },
    {
      id: "surgery",
      title: "Advanced Surgery & Laparoscopy",
      description: "Modern sterile surgical suite performing soft tissue, spay/neuter, orthopedic corrections, and minimally invasive procedures with safe anesthesia.",
      icon: <Activity className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
      tags: ["Sterile Suite", "Orthopedic", "Safe Anesthesia"],
    },
    {
      id: "vaccination",
      title: "Vaccination & Microchipping",
      description: "Essential core and non-core vaccines (Rabies, DHPP, FVRCP) along with painless microchipping and digital registry records.",
      icon: <Syringe className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      tags: ["Immunization", "Global Microchip", "Digital Passport"],
    },
    {
      id: "grooming",
      title: "Luxury Grooming & Spa Care",
      description: "Stress-free grooming, coat styling, medicated baths for dermatology issues, gentle nail clipping, and ear cleaning by certified pet stylists.",
      icon: <Scissors className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      tags: ["Medicated Bath", "Nail Clipping", "Styling"],
    },
    {
      id: "dental-care",
      title: "Ultrasonic Dental Scaling & Oral Care",
      description: "Professional dental cleaning under monitored sedation, plaque removal, polishing, extractions, and gum disease prevention.",
      icon: <Bone className="w-6 h-6 text-pink-500 dark:text-pink-400" />,
      tags: ["Scaling", "Fresh Breath", "Oral Health"],
    },
    {
      id: "pharmacy",
      title: "In-House Certified Pharmacy",
      description: "Fully stocked veterinary dispensary offering prescription medications, flea & tick prevention, heartworm treatments, and specialized diets.",
      icon: <Pill className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
      tags: ["Genuine Meds", "Parasite Control", "Prescriptions"],
    },
  ];

  return (
    <section id="services" className="relative py-20 sm:py-24 bg-white dark:bg-[#07090e] transition-colors overflow-hidden">
      
      {/* Live Pet Animation Background */}
      <SectionLiveBackground variant="services" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <span>🐾</span>
            <span>Our Veterinary &amp; Pet Care Services</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0f3438] dark:text-white tracking-tight mb-4">
            World-Class Healthcare for Every Paw, Claws &amp; Tail
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            From routine wellness visits to high-precision surgical intervention and luxury styling,
            we offer end-to-end pet healthcare under one roof.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl p-6 sm:p-7 bg-[#f8fcfb] dark:bg-[#082022] border border-teal-100/90 dark:border-teal-800/40 shadow-sm hover:shadow-xl hover:border-teal-400 dark:hover:border-teal-500 hover:-translate-y-1 transition-all duration-300 relative flex flex-col justify-between group overflow-hidden"
            >
              {item.popular && (
                <div className="absolute top-4 right-4">
                  <span className="text-[11px] font-extrabold px-3 py-1 rounded-full bg-teal-700 text-white shadow-sm">
                    High Demand
                  </span>
                </div>
              )}

              <div>
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-teal-100 dark:border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 shadow-sm transition-all">
                  {item.icon}
                </div>

                <h3 className="text-xl font-black text-[#0f3438] dark:text-white mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-white/5 px-2.5 py-1 rounded-lg border border-teal-200/60 dark:border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-teal-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-700 dark:text-teal-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Explore Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <Link
                    to="/register"
                    className="text-xs font-bold text-teal-800 dark:text-teal-200 hover:text-white px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-white/5 hover:bg-teal-700 dark:hover:bg-teal-700 transition-all border border-teal-200/80 dark:border-white/10 shadow-sm"
                  >
                    Book Visit
                  </Link>
                </div>
              </div>

            </div>
          ))}

          {/* Special 24/7 Emergency Feature Card */}
          <div
            id="emergency"
            className="rounded-3xl p-6 sm:p-7 relative flex flex-col justify-between bg-gradient-to-br from-rose-50 via-red-50/70 to-rose-100/50 dark:from-red-950/60 dark:via-themeDark-900 dark:to-themeDark-950 border border-red-200 dark:border-red-500/30 shadow-xl overflow-hidden group"
          >
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-red-500/15 dark:bg-red-500/20 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-2xl bg-red-500/15 dark:bg-red-500/20 border border-red-500/30 flex items-center justify-center mb-6 shadow-sm">
                <ShieldAlert className="w-7 h-7 text-red-600 dark:text-red-400 animate-pulse" />
              </div>

              <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400">
                Critical Assistance
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1 mb-3">
                Need Immediate Emergency Help?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                Our surgical team and oxygen ICU are ready for severe injuries, poison ingestions,
                breathing distress, and unexpected critical illnesses.
              </p>
            </div>

            <div>
              <div className="p-4 rounded-2xl bg-white/90 dark:bg-black/40 border border-red-200 dark:border-red-500/20 mb-4 shadow-sm">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Direct Hotline (24/7)</p>
                <p className="text-xl font-black text-red-600 dark:text-red-400 tracking-wide mt-0.5">
                  +94 (11) 234-5678
                </p>
              </div>

              <a
                href="tel:+94112345678"
                className="w-full py-3.5 rounded-full bg-red-600 hover:bg-red-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/30"
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