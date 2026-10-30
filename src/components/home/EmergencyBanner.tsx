import React from 'react';
import { PhoneCall, Ambulance, Clock } from 'lucide-react';

export const EmergencyBanner: React.FC = () => {
  return (
    <section id="emergency" className="relative z-20 -mt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 rounded-3xl p-6 sm:p-8 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-400/30">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md shrink-0">
            <Ambulance className="w-8 h-8 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                24/7 Emergency Hospital
              </span>
              <span className="flex items-center gap-1 text-xs text-rose-100 font-medium">
                <Clock className="w-3.5 h-3.5" /> Immediate Triage
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Does Your Pet Need Critical or Emergency Medical Attention?
            </h3>
            <p className="text-rose-100/90 text-sm mt-1 max-w-2xl">
              Poison ingestion, trauma, breathing difficulty, or sudden seizures? Our trauma ICU and emergency vet surgeons are stationed 24/7.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
          <a
            href="tel:+94112345678"
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white hover:bg-rose-50 text-rose-700 font-extrabold px-6 py-3.5 rounded-2xl shadow-lg transition duration-200 transform hover:scale-105 text-base"
          >
            <PhoneCall className="w-5 h-5 text-rose-600 animate-bounce" /> Call (011) 234-5678
          </a>
        </div>
      </div>
    </section>
  );
};

export default EmergencyBanner;
