import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  UserCheck,
  FileText
} from "lucide-react";

export const PetBookingWorkflow: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  const steps = [
    {
      number: "01",
      title: "Add Pet Profiles",
      description: "Create dedicated profiles for your dogs, cats, rabbits, or birds with their breed, age, allergy history, and photos.",
      badge: "Dogs, Cats, Rabbits & Birds",
      icon: <UserCheck className="w-6 h-6 text-teal-600 dark:text-teal-400" />,
      color: "border-teal-200/80 bg-teal-50/50 dark:bg-white/5",
    },
    {
      number: "02",
      title: "Choose Doctor & Service",
      description: "Browse 25+ certified veterinary doctors, surgeons, dermatologists, and pet dental specialists for tailored care.",
      badge: "25+ Certified Specialists",
      icon: <ShieldCheck className="w-6 h-6 text-sky-600 dark:text-sky-400" />,
      color: "border-sky-200/80 bg-sky-50/50 dark:bg-white/5",
    },
    {
      number: "03",
      title: "Pick Date & Guaranteed Slot",
      description: "Select available morning or evening time slots with zero waiting time and instant SMS/email confirmations.",
      badge: "Zero Waiting Queues",
      icon: <Calendar className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      color: "border-emerald-200/80 bg-emerald-50/50 dark:bg-white/5",
    },
    {
      number: "04",
      title: "Digital Records & Prescriptions",
      description: "Access doctor diagnoses, vaccination due dates, follow-up advice, and digital prescriptions in your member portal.",
      badge: "24/7 Portal Access",
      icon: <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      color: "border-amber-200/80 bg-amber-50/50 dark:bg-white/5",
    },
  ];

  return (
    <section id="workflow" className="py-20 sm:py-24 bg-[#f8fcfb] dark:bg-[#07090e] relative overflow-hidden transition-colors border-t border-b border-teal-100/70 dark:border-white/5">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Member Appointment Process</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0f3438] dark:text-white tracking-tight mb-4">
            How Pet Healthcare Works at <span className="text-teal-700 dark:text-teal-400">PetCare &amp; Vet</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            We've streamlined clinical appointments so pet parents can schedule visits with top veterinarians
            in under two minutes without waiting in long queues.
          </p>
        </div>

        {/* 4 Steps Visual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`rounded-3xl p-7 border backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group bg-white dark:bg-[#082022] shadow-sm hover:shadow-xl hover:-translate-y-1 ${step.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 border border-teal-100 dark:border-white/15 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-black text-slate-300 dark:text-white/20 font-mono">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-lg font-black text-[#0f3438] dark:text-white mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/10">
                <span className="text-[11px] font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-white/5 px-2.5 py-1 rounded-full border border-teal-200/80 dark:border-white/5">
                  {step.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Call to Sign In & Book */}
        <div className="relative rounded-3xl p-8 sm:p-10 border border-teal-100 dark:border-white/15 bg-gradient-to-r from-teal-50 via-white to-teal-50 dark:from-[#062022] dark:via-[#08292c] dark:to-[#062022] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">

          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-black uppercase tracking-wider text-teal-800 dark:text-teal-300">
                Appointments Open 7 Days A Week
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-[#0f3438] dark:text-white">
              {isAuthenticated
                ? `Ready to schedule a visit for your pets, ${user?.name}?`
                : "Sign in to book an appointment with our specialist veterinarians"}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              {isAuthenticated
                ? "Access your dashboard to select your registered pet, choose your doctor, and pick an available time slot."
                : "Create your free member account or sign in to register your pets, view doctor consultation schedules, and book guaranteed time slots."}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Instant Confirmation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> Free Reminders
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-teal-600" /> 24/7 Emergency Care
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="shrink-0 w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm shadow-xl shadow-teal-800/25 flex items-center justify-center gap-2 transition-all"
                >
                  <span>Sign In to Book Visit</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white dark:bg-white/5 hover:bg-teal-50 dark:hover:bg-white/10 border border-teal-200 dark:border-white/10 text-[#0f3438] dark:text-white font-bold text-sm transition-all text-center"
                >
                  Create Account
                </Link>
              </>
            ) : (
              <a
                href="#services"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-sm shadow-xl shadow-teal-800/25 flex items-center justify-center gap-2 transition-all"
              >
                <span>Browse Clinical Services</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default PetBookingWorkflow;