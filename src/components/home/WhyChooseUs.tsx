import React from 'react';
import { Award, HeartHandshake, Zap, Sparkles, Clock, CheckCircle } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const highlights = [
    {
      icon: <Award className="w-7 h-7 text-emerald-500" />,
      title: 'Board-Certified Specialists',
      desc: 'Our team includes university-trained surgeons, internal medicine specialists, and veterinary dermatologists.',
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-teal-500" />,
      title: 'Fear-Free Pet Handling',
      desc: 'Stress-free examination rooms with separate canine & feline lounges and soothing pet pheromones.',
    },
    {
      icon: <Zap className="w-7 h-7 text-amber-500" />,
      title: 'Advanced Medical Diagnostics',
      desc: 'High-speed blood analyzers, modern ultrasound scanners, and digital X-rays provide reports in under 30 minutes.',
    },
    {
      icon: <Clock className="w-7 h-7 text-rose-500" />,
      title: 'Zero Wait Online Booking',
      desc: 'Guaranteed scheduled consultation times without long waiting room queues for you and your companion.',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-50 group">
              <img
                src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=800&q=80"
                alt="Veterinarian examining dog with love"
                className="w-full h-[460px] object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="text-xs uppercase tracking-wider text-emerald-400 font-extrabold">Excellence in Veterinary Care</p>
                <h4 className="text-base font-bold">100% Gentle, Family-Centered Philosophy</h4>
                <p className="text-xs text-slate-300 mt-1">We treat your pet with the same unconditional love you do.</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 border-2 border-white">
              <Sparkles className="w-6 h-6 animate-spin" />
              <div>
                <p className="font-extrabold text-sm leading-none">ISO 9001:2020</p>
                <p className="text-[10px] text-emerald-100 uppercase tracking-wider">Certified Vet Clinic</p>
              </div>
            </div>
          </div>

          {/* Right Highlights Column */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              Why Pet Parents Trust Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Veterinary Care Crafted with Empathy, Precision &amp; Love
            </h2>
            <p className="text-slate-600 mt-4 text-base leading-relaxed">
              We understand that bringing your pet to a clinic can be emotional. That's why we have created a serene, state-of-the-art medical environment designed specifically to put both pets and owners completely at ease.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              {highlights.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-200 transition">
                  <div className="mb-3">{item.icon}</div>
                  <h4 className="font-bold text-slate-900 text-base mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-slate-100 text-sm font-semibold text-slate-700">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Sterile Surgical Suites
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> In-House Pet Pharmacy
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-500" /> Ambulance Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

