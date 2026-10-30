import React from 'react';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Nadeesha Perera',
      pet: 'Bruno (Golden Retriever, 3 yrs)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      comment:
        'When Bruno swallowed a squeaky toy at 11 PM on a Sunday, the emergency surgical team here saved his life in less than an hour. The care, empathy, and post-operative monitoring were unmatched!',
      rating: 5,
      date: '2 weeks ago',
    },
    {
      name: 'Chamath Wickramasinghe',
      pet: 'Luna & Simba (Persian Cats)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment:
        'The fear-free feline room made all the difference! My Persian cats used to get terrified at clinics, but Dr. Dilini’s gentle handling kept them calm throughout their vaccines and grooming session.',
      rating: 5,
      date: '1 month ago',
    },
    {
      name: 'Shenali De Silva',
      pet: 'Rocky (Beagle, 5 yrs)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      comment:
        'Booking appointments online took me literally 30 seconds. No waiting in a packed lobby with a stressed dog. The ultrasonic teeth cleaning made Rocky’s breath completely fresh again!',
      rating: 5,
      date: '3 weeks ago',
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" /> Real Stories
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved by Over 18,000 Happy Pet Parents
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            See how our medical team, emergency dispatch, and grooming spa have made a difference for furry family members.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col justify-between relative group"
            >
              <div className="absolute top-6 right-6 text-slate-200 group-hover:text-emerald-100 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic relative z-10">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-emerald-500/30"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-slate-900 text-sm">{rev.name}</h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 fill-emerald-50" />
                  </div>
                  <p className="text-xs text-emerald-600 font-medium">{rev.pet}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

