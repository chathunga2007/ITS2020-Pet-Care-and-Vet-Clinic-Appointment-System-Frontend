import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Sparkles,
  ArrowRight,
  Stethoscope,
  Scissors,
  Syringe,
  Activity
} from "lucide-react";
import toast from "react-hot-toast";

interface PetOption {
  id: string;
  type: string;
  icon: string;
  color: string;
  description: string;
}

export const PetBookingWorkflow: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Interactive Simulator States
  const [selectedPetType, setSelectedPetType] = useState<string>("dog");
  const [petName, setPetName] = useState<string>("Rocky");
  const [selectedService, setSelectedService] = useState<string>("Wellness Checkup & Vaccine");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("Dr. Samantha Perera (Surgeon)");
  const [appointmentDate, setAppointmentDate] = useState<string>("2026-11-12");
  const [selectedSlot, setSelectedSlot] = useState<string>("10:30 AM");

  const petOptions: PetOption[] = [
    { id: "dog", type: "Canine (Dog)", icon: "🐶", color: "from-amber-400 to-yellow-500", description: "Vaccinations, ortho check & styling" },
    { id: "cat", type: "Feline (Cat)", icon: "🐱", color: "from-purple-400 to-violet-500", description: "Fear-free exams & hairball care" },
    { id: "rabbit", type: "Rabbit", icon: "🐰", color: "from-pink-400 to-rose-500", description: "Dietary health & dental trimming" },
    { id: "bird", type: "Avian (Bird)", icon: "🦜", color: "from-sky-400 to-blue-500", description: "Beak, feather & respiratory care" },
  ];

  const servicesList = [
    { name: "Comprehensive Wellness & Vaccine", icon: <Syringe className="w-4 h-4 text-sky-400" />, time: "30 Mins" },
    { name: "24/7 Emergency Triage & ICU", icon: <Activity className="w-4 h-4 text-red-400" />, time: "Priority" },
    { name: "Surgical Consultation & Spay/Neuter", icon: <Stethoscope className="w-4 h-4 text-amber-400" />, time: "45 Mins" },
    { name: "Luxury Pet Grooming & Spa", icon: <Scissors className="w-4 h-4 text-pink-400" />, time: "60 Mins" },
  ];

  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "05:00 PM", "07:30 PM"];

  const handleSimulateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.success(`Booking preview ready for ${petName}! Please sign up or login to confirm.`, {
        duration: 5000,
      });
      navigate("/register");
    } else {
      toast.success(`Appointment confirmed for ${petName} on ${appointmentDate} at ${selectedSlot}!`);
    }
  };

  return (
    <section id="booking-simulator" className="py-24 bg-[#0a0d14] relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>How PetVitals Works</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Add Your Pets & Book Appointments in <span className="text-gradient-logo">4 Simple Steps</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Say goodbye to clinic queues. Register your furry companions, schedule appointments
            with trusted veterinarians, and manage digital health records anytime.
          </p>
        </div>

        {/* 4 Steps Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="glass-card rounded-3xl p-6 border border-white/10 hover:border-sky-400/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 font-extrabold text-lg mb-5 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Create Account & Add Pets</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Add profiles for your Dogs, Cats, Rabbits, or Birds with photo, breed, age, and medical history.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-semibold text-sky-400">
              <span>Unlimited Pet Profiles</span>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10 hover:border-purple-400/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 font-extrabold text-lg mb-5 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Choose Service & Vet Doctor</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Select general checks, vaccines, orthopedic surgeries, dental scaling, or grooming stylists.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-semibold text-purple-400">
              <span>25+ Certified Specialists</span>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10 hover:border-pink-400/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-pink-400 font-extrabold text-lg mb-5 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Pick Convenient Date & Slot</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Select your preferred day and available appointment time with instant automated confirmation.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-semibold text-pink-400">
              <span>Zero Waiting Time</span>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-extrabold text-lg mb-5 group-hover:scale-110 transition-transform">
                04
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Digital Medical Book & Prescriptions</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Access vet notes, prescriptions, vaccination due dates, and follow-ups directly in your portal.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-semibold text-amber-400">
              <span>24/7 Digital Access</span>
            </div>
          </div>

        </div>

        {/* ================= LIVE INTERACTIVE APPOINTMENT SIMULATOR ================= */}
        <div className="relative rounded-3xl p-7 sm:p-10 border border-white/15 bg-gradient-to-br from-[#0f1422]/90 via-[#0a0d14]/95 to-[#0f1422]/90 shadow-2xl backdrop-blur-xl">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400">
                  Interactive Live Simulator
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Try Booking an Appointment for Your Pet
              </h3>
            </div>

            <div className="text-xs text-slate-400">
              Select pet, service & slot to test live scheduling
            </div>
          </div>

          <form onSubmit={handleSimulateBooking} className="space-y-8">
            
            {/* Step A: Select Pet Species (Matches Logo animals: Dog, Cat, Rabbit, Bird) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                1. Select Pet Species & Enter Name
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {petOptions.map((pet) => (
                  <button
                    key={pet.id}
                    type="button"
                    onClick={() => setSelectedPetType(pet.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedPetType === pet.id
                        ? "bg-white/15 border-sky-400 shadow-lg shadow-sky-500/20 scale-102"
                        : "bg-white/5 border-white/10 hover:bg-white/10 opacity-70"
                    }`}
                  >
                    <span className="text-3xl mb-2 block">{pet.icon}</span>
                    <p className="text-sm font-bold text-white">{pet.type}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{pet.description}</p>
                  </button>
                ))}
              </div>

              {/* Pet Name Input */}
              <div className="max-w-md">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                  Pet's Name:
                </label>
                <input
                  type="text"
                  required
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="e.g. Charlie / Milo / Snowy"
                  className="w-full px-4 py-2.5 rounded-xl bg-themeDark-950 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>
            </div>

            {/* Step B: Select Service & Doctor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  2. Choose Clinical Service
                </label>
                <div className="space-y-2">
                  {servicesList.map((srv) => (
                    <div
                      key={srv.name}
                      onClick={() => setSelectedService(srv.name)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedService === srv.name
                          ? "bg-sky-500/15 border-sky-400 text-white"
                          : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/10">{srv.icon}</div>
                        <span className="text-xs sm:text-sm font-semibold">{srv.name}</span>
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 bg-white/10 px-2 py-0.5 rounded">
                        {srv.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  3. Select Veterinarian Specialist
                </label>
                <select
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-themeDark-950 border border-white/15 text-white text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 mb-4"
                >
                  <option value="Dr. Samantha Perera (Surgeon)">Dr. Samantha Perera - Chief Veterinary Surgeon & Orthopedics</option>
                  <option value="Dr. Kasun Jayawardena (Emergency)">Dr. Kasun Jayawardena - Emergency Medicine & Trauma</option>
                  <option value="Dr. Nilmini Fernando (Internal Medicine)">Dr. Nilmini Fernando - Feline & Canine Specialist</option>
                  <option value="Dr. Roshan Wickramasinghe (Dentistry)">Dr. Roshan Wickramasinghe - Dermatology & Dentistry</option>
                </select>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Appointment Date</label>
                    <input
                      type="date"
                      value={appointmentDate}
                      onChange={(e) => setAppointmentDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-themeDark-950 border border-white/15 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Select Time Slot</label>
                    <div className="grid grid-cols-3 gap-1">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={`py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                            selectedSlot === slot
                              ? "bg-sky-500 text-slate-950"
                              : "bg-white/5 text-slate-300 hover:bg-white/10"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Summary Bar & Action */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                <span>Selected: </span>
                <strong className="text-white">{petName}</strong>
                <span className="text-slate-400"> ({selectedPetType.toUpperCase()}) </span>
                <span>• </span>
                <strong className="text-sky-300">{selectedService}</strong>
                <span> with </span>
                <strong className="text-purple-300">{selectedDoctor.split("-")[0]}</strong>
                <span> on {appointmentDate} at {selectedSlot}</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600 hover:from-sky-300 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-xl shadow-sky-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Confirm & Schedule Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
};

export default PetBookingWorkflow;
