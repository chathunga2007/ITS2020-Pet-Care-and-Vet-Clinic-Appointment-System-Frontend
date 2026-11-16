import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, Award, Stethoscope, Clock } from "lucide-react";
import SectionLiveBackground from "./SectionLiveBackground";
import { getAllDoctors } from "../service/doctor.service";
import { useAuth } from "../hooks/useAuth";
import type { IDoctor } from "../types/doctor.types";

interface DisplayDoctor {
  id: string;
  name: string;
  specialty: string;
  experienceOrHours: string;
  rating: number;
  reviews: number;
  image: string;
}

export const VetsSection: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [doctorsList, setDoctorsList] = useState<DisplayDoctor[]>([]);

  const defaultDoctors: DisplayDoctor[] = [
    {
      id: "doc-1",
      name: "Dr. Samantha Perera",
      specialty: "Chief Veterinary Surgeon & Orthopedics",
      experienceOrHours: "14+ Years Exp",
      rating: 4.9,
      reviews: 420,
      image:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "doc-2",
      name: "Dr. Kasun Jayawardena",
      specialty: "Emergency Medicine & Critical Care",
      experienceOrHours: "11+ Years Exp",
      rating: 5.0,
      reviews: 380,
      image:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "doc-3",
      name: "Dr. Nilmini Fernando",
      specialty: "Internal Medicine & Feline Care",
      experienceOrHours: "9+ Years Exp",
      rating: 4.9,
      reviews: 310,
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    },
    {
      id: "doc-4",
      name: "Dr. Roshan Wickramasinghe",
      specialty: "Dermatology, Allergies & Dentistry",
      experienceOrHours: "8+ Years Exp",
      rating: 4.8,
      reviews: 265,
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400",
    },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getAllDoctors();
        if (data && data.length > 0) {
          const mapped: DisplayDoctor[] = data.map((d: IDoctor, idx: number) => ({
            id: d._id,
            name: d.name,
            specialty: d.specialization,
            experienceOrHours: d.workingHours || "Full-time Available",
            rating: 4.8 + ((idx % 3) * 0.1),
            reviews: 150 + ((idx + 1) * 45),
            image:
              d.imageURL ||
              defaultDoctors[idx % defaultDoctors.length].image,
          }));
          setDoctorsList(mapped);
        } else {
          setDoctorsList(defaultDoctors);
        }
      } catch {
        setDoctorsList(defaultDoctors);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <section
      id="specialists"
      className="py-20 sm:py-24 relative transition-colors overflow-hidden"
    >
      <SectionLiveBackground variant="vets" />

      <div id="vets" className="sr-only" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Meet Our Specialists</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0f3438] dark:text-white tracking-tight mb-4">
            Compassionate Care by Certified Doctors
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Our multi-disciplinary team brings together decades of clinical
            excellence to ensure your pets receive the precise medical attention
            they need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctorsList.map((doc) => (
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

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-md">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-[#0f3438] dark:text-white">
                    {doc.rating.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-300">
                    ({doc.reviews})
                  </span>
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
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1 truncate">
                    <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{doc.experienceOrHours}</span>
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-teal-100 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    <Award className="w-3.5 h-3.5 text-teal-600" />
                    <span>Certified Vet</span>
                  </div>

                  <Link
                    to={
                      isAuthenticated
                        ? `/user/book?doctorId=${doc.id}`
                        : "/login"
                    }
                    className="text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 px-3.5 py-1.5 rounded-full transition-all shadow-md shadow-teal-700/20 hover:-translate-y-0.5"
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