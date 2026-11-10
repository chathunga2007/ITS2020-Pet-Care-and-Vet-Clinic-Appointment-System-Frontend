import React from "react";
import { Link } from "react-router-dom";
import clinicLogo from "../assets/pet-care-web-logo.png";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#032e30] text-slate-300 text-sm border-t border-teal-800/40 relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative Paws in Background */}
      <div className="absolute top-8 left-10 text-white/5 text-8xl pointer-events-none select-none">🐾</div>
      <div className="absolute bottom-6 right-12 text-white/5 text-9xl pointer-events-none select-none">🐾</div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/10 border border-teal-500/30 p-1.5 flex items-center justify-center shadow-sm">
                <img
                  src={clinicLogo}
                  alt="PetCare & Vet"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                PetCare <span className="text-teal-400">&amp; Vet</span>
              </span>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Premier pet care and veterinary clinic appointment system. Delivering compassionate,
              cutting-edge clinical medicine, emergency surgeries, and luxury pet grooming.
            </p>

            <div className="font-handwriting text-2xl text-teal-300 font-bold rotate-[-3deg] pt-1">
              Because they are family ♡
            </div>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal-600 hover:text-white border border-teal-500/20 flex items-center justify-center transition-colors text-slate-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal-600 hover:text-white border border-teal-500/20 flex items-center justify-center transition-colors text-slate-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal-600 hover:text-white border border-teal-500/20 flex items-center justify-center transition-colors text-slate-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-400 pl-3">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <span>🏠</span> Home Overview
                </Link>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <span>🐾</span> Clinical Services
                </a>
              </li>
              <li>
                <a href="#specialists" className="text-slate-300 hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <span>👨‍⚕️</span> Our Veterinarians
                </a>
              </li>
              <li>
                <a href="#why-us" className="text-slate-300 hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <span>🛡️</span> Why Choose Us
                </a>
              </li>
              <li>
                <Link to="/register" className="text-slate-300 hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <span>✨</span> Create Member Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-300 hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <span>🔐</span> Client Portal Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-400 pl-3">
              Operating Hours
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3.5 rounded-2xl bg-red-500/15 border border-red-500/30">
                <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
                  <Clock className="w-4 h-4" />
                  <span>24/7 Emergency Care</span>
                </div>
                <p className="text-[11px] text-slate-200">
                  Open 24 hours every day, including public holidays and Sundays.
                </p>
              </div>

              <div className="text-slate-300 space-y-1.5 text-xs">
                <p><strong className="text-white">Routine Consultations:</strong> 8:00 AM – 8:00 PM</p>
                <p><strong className="text-white">Surgery &amp; Procedures:</strong> 9:00 AM – 6:00 PM</p>
                <p><strong className="text-white">Spa &amp; Grooming:</strong> 9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact & Location */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-teal-400 pl-3">
              Contact &amp; Location
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="text-slate-300">No. 125, Horton Place, Cinnamon Gardens, Colombo 07, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-300">+94 (11) 234-5678 / +94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span className="text-slate-300">appointments@petvitalclinic.lk</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-teal-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} PetCare &amp; Vet Clinic Appointment System. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <span>Healthy Pets, Happy Lives</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span className="text-white font-semibold">by Chathunga</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;