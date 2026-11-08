import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Sparkles, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export const CTASection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="py-20 relative overflow-hidden bg-white dark:bg-[#07090e] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-r from-teal-50 via-[#f0fbf9] to-teal-100/50 dark:from-[#062022] dark:via-[#08292c] dark:to-[#062022] border border-teal-200/80 dark:border-teal-800/40 shadow-xl">
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/80 dark:bg-white/5 border border-teal-200 dark:border-white/10 text-teal-800 dark:text-teal-300 text-xs font-black uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>{isAuthenticated ? "Welcome Back!" : "Join Our Pet Care Community"}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-[#0f3438] dark:text-white tracking-tight leading-tight mb-4">
              {isAuthenticated ? (
                <>
                  Hello, <span className="text-teal-700 dark:text-teal-400">{user?.name}</span>! Need to Book a Vet Visit Today?
                </>
              ) : (
                <>
                  Give Your Beloved Pet the{" "}
                  <span className="text-teal-700 dark:text-teal-400">Best Care</span> They Deserve
                  <span className="font-handwriting text-3xl text-teal-600 ml-2">♡</span>
                </>
              )}
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              {isAuthenticated
                ? "Manage your pet records, browse specialist clinic hours, and schedule appointments online in a few clicks."
                : "Create a free PetCare & Vet account in under 60 seconds. Schedule instant appointments, track medical histories, access online prescriptions, and receive 24/7 emergency support."}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                "Instant Online Appointment Scheduling",
                "Automated Vaccination Due Date Reminders",
                "Digital Medical Reports & Prescriptions",
                "Priority 24/7 Emergency Dispatch"
              ].map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-base shadow-xl shadow-teal-800/25 hover:shadow-teal-800/35 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Create Free Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white dark:bg-white/5 hover:bg-teal-50 dark:hover:bg-white/10 text-[#0f3438] dark:text-white font-bold text-base border border-teal-200 dark:border-white/10 transition-all text-center shadow-sm"
                  >
                    Already Registered? Sign In
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    const el = document.getElementById("services");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-teal-700 hover:bg-teal-800 text-white font-extrabold text-base shadow-xl shadow-teal-800/25 hover:shadow-teal-800/35 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-5 h-5 text-white" />
                  <span>Browse Clinic Services &amp; Schedule</span>
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CTASection;