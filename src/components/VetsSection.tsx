import React from "react";
import { Link } from "react-router-dom";
import { Star, Award, Stethoscope } from "lucide-react";
import SectionLiveBackground from "./SectionLiveBackground";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  degrees: string;
  experience: string;
  rating: number;
  reviews: number;
  image: string;
}

export const VetsSection: React.FC = () => {
  const doctors: Doctor[] = [
    {
      id: "doc-1",
      name: "Dr. Samantha Perera",
      specialty: "Chief Veterinary Surgeon & Orthopedics",
      degrees: "BVSc (Hons), MS (Vet Surgery)",
      experience: "14+ Years",
      rating: 4.9,
      reviews: 420,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "doc-2",
      name: "Dr. Kasun Jayawardena",
      specialty: "Emergency Medicine & Critical Care",
      degrees: "BVSc, MRCVS Fellow",
      experience: "11+ Years",
      rating: 5.0,
      reviews: 380,
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "doc-3",
      name: "Dr. Nilmini Fernando",
      specialty: "Internal Medicine & Feline Care",
      degrees: "BVSc, Certified Feline Practitioner",
      experience: "9+ Years",
      rating: 4.9,
      reviews: 310,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "doc-4",
      name: "Dr. Roshan Wickramasinghe",
      specialty: "Dermatology, Allergies & Dentistry",
      degrees: "BVSc, Dip. Vet Dentistry",
      experience: "8+ Years",
      rating: 4.8,
      reviews: 265,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400",
    },
  ];

  return (
    <section id="specialists" className="py-20 sm:py-24 bg-white dark:bg-[#07090e] relative transition-colors overflow-hidden">
      {/* Live Pet Animation Background */}
      <SectionLiveBackground variant="vets" />

      <div id="vets" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Meet Our Specialists</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0f3438] dark:text-white tracking-tight mb-4">
            Compassionate Care by Certified Doctors
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Our multi-disciplinary team brings together decades of clinical excellence to ensure
            your pets receive the precise medical attention they need.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="rounded-3xl overflow-hidden bg-[#f8fcfb] dark:bg-[#082022] border border-teal-100/90 dark:border-teal-800/40 shadow-sm hover:shadow-xl hover:border-teal-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="relative h-64 overflow-hidden bg-slate-100 dark:bg-themeDark-900">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-md">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-[#0f3438] dark:text-white">{doc.rating}</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-300">({doc.reviews})</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-black text-[#0f3438] dark:text-white group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-bold text-teal-700 dark:text-teal-400 mt-1">
                    {doc.specialty}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {doc.degrees}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-teal-100 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <Award className="w-3.5 h-3.5 text-teal-600" />
                    <span>{doc.experience} Exp</span>
                  </div>

                  <Link
                    to="/register"
                    className="text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 px-3.5 py-1.5 rounded-full transition-all shadow-md shadow-teal-700/20"
                  >
                    Consult
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default VetsSection;