import React from 'react';
import {
  Stethoscope,
  Scissors,
  Syringe,
  Activity,
  HeartPulse,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Smile,
} from 'lucide-react';

interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const services = [
    {
      id: 'general',
      title: 'General Health & Wellness',
      icon: <Stethoscope className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50 text-emerald-600',
      description: 'Comprehensive physical exams, blood panels, routine checkups, and early disease detection for long healthy lives.',
      price: 'From LKR 2,500',
      badge: 'Most Popular',
      features: ['Head-to-tail physical exam', 'Vitals & weight assessment', 'Tailored preventive advice'],
    },
    {
      id: 'vaccination',
      title: 'Vaccination & Deworming',
      icon: <Syringe className="w-6 h-6 text-teal-600" />,
      bg: 'bg-teal-50 text-teal-600',
      description: 'Core and non-core immunization schedules, rabies protection, deworming, and government certified microchipping.',
      price: 'From LKR 3,000',
      badge: 'Essential',
      features: ['Rabies & DHPP vaccine', 'Internal parasite deworming', 'Official pet health passport'],
    },
    {
      id: 'surgery',
      title: 'Advanced Surgery & ICU',
      icon: <HeartPulse className="w-6 h-6 text-rose-600" />,
      bg: 'bg-rose-50 text-rose-600',
      description: 'State-of-the-art sterile surgical suites, soft tissue surgery, orthopedic repairs, and spay/neuter operations.',
      price: 'Free Consultation',
      badge: 'Specialist',
      features: ['Inhalation anesthesia', 'Continuous multi-parameter monitoring', 'Post-op pain management'],
    },
    {
      id: 'grooming',
      title: 'Pet Spa & Luxury Grooming',
      icon: <Scissors className="w-6 h-6 text-violet-600" />,
      bg: 'bg-violet-50 text-violet-600',
      description: 'Full hygienic bath, breed-standard scissor cuts, medicated fur baths, nail trimming, and ear cleaning.',
      price: 'From LKR 3,500',
      badge: 'Spa Treatment',
      features: ['Hypoallergenic shampoo', 'Ear plucking & nail clipping', 'Sanitary trims & blow dry'],
    },
    {
      id: 'dental',
      title: 'Ultrasonic Dental Scaling',
      icon: <Smile className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50 text-amber-600',
      description: 'Prevent periodontal disease, eliminate bad breath, and protect vital organs with professional ultrasonic scaling.',
      price: 'From LKR 4,500',
      badge: 'Preventive',
      features: ['Ultrasonic tartar removal', 'Gingival pocket cleaning', 'Tooth enamel polishing'],
    },
    {
      id: 'diagnostics',
      title: 'In-House Laboratory & X-Ray',
      icon: <Activity className="w-6 h-6 text-cyan-600" />,
      bg: 'bg-cyan-50 text-cyan-600',
      description: 'Digital radiography, ultrasound scans, rapid blood analysis (CBC, Biochemistry), and urinalysis within 30 minutes.',
      price: 'From LKR 3,200',
      badge: 'Same-Day Results',
      features: ['High-def digital X-Rays', 'Comprehensive blood biochemistry', 'Rapid viral PCR test kits'],
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" /> What We Offer
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Care for Every Stage of Your Pet's Life
          </h2>
          <p className="mt-4 text-base text-slate-600">
            From puppy &amp; kitten wellness to specialized senior pet therapies, we deliver hospital-grade veterinary medicine with gentle compassion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-emerald-200 flex flex-col justify-between group transform hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3.5 rounded-2xl ${svc.bg} shadow-sm group-hover:scale-110 transition-transform`}>
                    {svc.icon}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    {svc.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-slate-600 mb-5 leading-relaxed">{svc.description}</p>

                <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                  {svc.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Price Range</span>
                  <span className="font-extrabold text-slate-900 text-sm">{svc.price}</span>
                </div>

                <button
                  type="button"
                  onClick={() => onBookService(svc.title)}
                  className="inline-flex items-center gap-1 bg-slate-900 hover:bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition duration-200 group-hover:bg-emerald-600"
                >
                  Book Service <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

