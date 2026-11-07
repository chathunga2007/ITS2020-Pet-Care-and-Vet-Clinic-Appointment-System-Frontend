import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Sparkles, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export const CTASection: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <section className="py-20 relative overflow-hidden bg-themeDark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden bg-gradient-to-r from-themeDark-900 via-themeDark-850 to-themeDark-900 border border-themeYellow-500/25 shadow-2xl">
          
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-themeYellow-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-themeYellow-400/10 border border-themeYellow-400/30 text-themeYellow-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAuthenticated ? "Welcome Back!" : "Join Our Pet Care Community"}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {isAuthenticated ? (
                <>
                  Hello, <span className="text-themeYellow-400">{user?.name}</span>! Need to Book a Vet Visit Today?
                </>
              ) : (
                <>
                  Give Your Beloved Pet the{" "}
                  <span className="text-themeYellow-400">Best Care</span> They Deserve
                </>
              )}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              {isAuthenticated
                ? "Manage your pet records, browse specialist clinic hours, and schedule appointments online in a few clicks."
                : "Create a free PetVitals account in under 60 seconds. Schedule instant appointments, track medical histories, access online prescriptions, and receive 24/7 emergency support."}
            </p>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {[
                "Instant Online Appointment Scheduling",
                "Automated Vaccination Due Date Reminders",
                "Digital Medical Reports & Prescriptions",
                "Priority 24/7 Emergency Dispatch"
              ].map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-themeYellow-400 shrink-0" />
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
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-themeYellow-400 via-amber-400 to-themeYellow-500 hover:from-themeYellow-300 hover:to-themeYellow-400 text-themeDark-950 font-bold text-base shadow-xl shadow-themeYellow-500/25 hover:shadow-themeYellow-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Create Free Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    to="/login"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-semibold text-base border border-white/10 hover:border-white/20 transition-all text-center"
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
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-themeYellow-400 via-amber-400 to-themeYellow-500 hover:from-themeYellow-300 hover:to-themeYellow-400 text-themeDark-950 font-bold text-base shadow-xl shadow-themeYellow-500/25 hover:shadow-themeYellow-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-5 h-5 text-themeDark-950" />
                  <span>Browse Clinic Services & Schedule</span>
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
