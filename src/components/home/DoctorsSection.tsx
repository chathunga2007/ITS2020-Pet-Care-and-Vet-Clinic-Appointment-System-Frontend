import React from 'react';
import { Star, Calendar, Award } from 'lucide-react';

interface DoctorsSectionProps {
  onBookWithDoctor: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onBookWithDoctor }) => {
  const doctors = [
    {
      name: 'Dr. Kavinga Senaratne',
      qualification: 'BVSc (Hons), MS (Surg), FAVA',
      role: 'Chief Veterinary Surgeon',
      experience: '14+ Years Experience',
      rating: '4.95',
      reviews: '480+ Cases',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      availability: 'Mon - Fri',
    },
    {
      name: 'Dr. Dilini Jayawardena',
      qualification: 'BVSc, Dip. Feline Medicine',
      role: 'Feline & Exotic Pet Specialist',
      experience: '10+ Years Experience',
      rating: '4.98',
      reviews: '390+ Cases',
      image: 'https://images.unsplash.com/photo-1594824813576-02e646fa32d4?auto=format&fit=crop&w=600&q=80',
      availability: 'Tue - Sat',
    },
    {
      name: 'Dr. Ruwan Karunaratne',
      qualification: 'BVSc, PhD (Vet Orthopedics)',
      role: 'Senior Trauma & Joint Surgeon',
      experience: '16+ Years Experience',
      rating: '4.92',
      reviews: '560+ Cases',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
      availability: 'Wed - Sun',
    },
    {
      name: 'Dr. Oshadi Weerakkody',
      qualification: 'BVSc, Certified Pet Nutritionist',
      role: 'Dermatology & Wellness Consultant',
      experience: '8+ Years Experience',
      rating: '4.96',
      reviews: '310+ Cases',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
      availability: 'Mon - Thu',
    },
  ];

  return (
    <section id="vets" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" /> Medical Faculty
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Meet Our Senior Veterinarians
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base">
            Compassionate, university-trained specialists who put your pet's comfort and clinical recovery above all else.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 rounded-3xl overflow-hidden border border-slate-700/60 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-emerald-400 flex items-center gap-1 border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-emerald-400" /> {doc.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-emerald-500/90 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {doc.availability}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-white mb-0.5">{doc.name}</h3>
                  <p className="text-xs text-emerald-400 font-semibold">{doc.role}</p>
                  <p className="text-[11px] text-slate-400 mt-1">{doc.qualification}</p>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-300 pt-3 border-t border-slate-700/50">
                    <span>{doc.experience}</span>
                    <span className="text-slate-400">{doc.reviews}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => onBookWithDoctor(doc.name)}
                  className="w-full bg-slate-700 hover:bg-emerald-500 text-white font-semibold text-xs py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book with Doctor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;
