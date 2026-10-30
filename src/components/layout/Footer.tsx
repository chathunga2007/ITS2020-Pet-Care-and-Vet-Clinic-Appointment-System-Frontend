import React from 'react';
import { Link } from 'react-router-dom';
import petLogo from '../../assets/pet-care-web-logo.png';
import { PhoneCall, Mail, MapPin, Clock, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={petLogo} alt="Pet Care Clinic" className="h-12 w-auto object-contain" />
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight flex items-center gap-1">
                  PetCare <span className="text-emerald-400">&amp; Vet</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-300 block">
                  Hospital &amp; Animal Clinic
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Sri Lanka's premier veterinary hospital and compassionate pet health network. Dedicated to safeguarding the health, happiness, and vitality of dogs, cats, and beloved domestic pets.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-white transition text-slate-300 flex items-center justify-center font-bold text-xs"
              >
                f
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-white transition text-slate-300 flex items-center justify-center font-bold text-xs"
              >
                ig
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-500 hover:text-white transition text-slate-300 flex items-center justify-center font-bold text-xs"
              >
                x
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-emerald-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <a href="#services" className="hover:text-emerald-400 transition">
                  Clinic Services
                </a>
              </li>
              <li>
                <a href="#vets" className="hover:text-emerald-400 transition">
                  Senior Veterinarians
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-emerald-400 transition">
                  Why Choose Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-emerald-400 transition">
                  Reviews &amp; Ratings
                </a>
              </li>
              <li>
                <Link to="/login" className="hover:text-emerald-400 transition">
                  Member Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-emerald-400 transition">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Services list */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Veterinary Services</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>General Health &amp; Blood Panel</li>
              <li>Core Pet Vaccinations</li>
              <li>Soft Tissue &amp; Bone Surgery</li>
              <li>Ultrasonic Dental Cleaning</li>
              <li>Pet Spa &amp; Breed Grooming</li>
              <li>24/7 Trauma Emergency ICU</li>
              <li>In-house Ultrasound &amp; Digital X-Ray</li>
            </ul>
          </div>

          {/* Clinic hours & Emergency */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Clinic &amp; Hospital</h4>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>No. 128, Galle Road, Colombo 03, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">+94 (11) 234-5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>care@petcarevet.lk</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
              <p className="font-semibold text-emerald-300 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5" /> Consultation Hours
              </p>
              <p className="text-slate-400">Mon - Sat: 8:00 AM - 9:00 PM</p>
              <p className="text-slate-400">Sun: 9:00 AM - 5:00 PM</p>
              <p className="text-rose-400 font-bold mt-1">🚨 Emergency ICU: 24/7/365 Open</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} PetCare &amp; Vet Clinic System. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Happy Pets &amp; Caring Owners
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
