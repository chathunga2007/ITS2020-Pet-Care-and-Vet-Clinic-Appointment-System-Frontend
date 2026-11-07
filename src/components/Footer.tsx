import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-themeDark-950 border-t border-white/10 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-themeYellow-400 to-amber-500 p-0.5 flex items-center justify-center">
                <img
                  src="/pet-care-web-logo.png"
                  alt="PetVitals"
                  className="w-full h-full object-contain rounded-lg"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Pet<span className="text-themeYellow-400">Vitals</span> Clinic
              </span>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Premier pet care and veterinary clinic appointment system. Delivering compassionate,
              cutting-edge clinical medicine, emergency surgeries, and luxury pet grooming.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-themeYellow-400/20 hover:text-themeYellow-400 border border-white/10 flex items-center justify-center transition-colors text-slate-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-themeYellow-400/20 hover:text-themeYellow-400 border border-white/10 flex items-center justify-center transition-colors text-slate-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#twitter"
                aria-label="X / Twitter"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-themeYellow-400/20 hover:text-themeYellow-400 border border-white/10 flex items-center justify-center transition-colors text-slate-300"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-themeYellow-400 pl-3">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-themeYellow-400 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <a href="#services" className="hover:text-themeYellow-400 transition-colors">
                  Clinical Services
                </a>
              </li>
              <li>
                <a href="#specialists" className="hover:text-themeYellow-400 transition-colors">
                  Our Veterinarians
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-themeYellow-400 transition-colors">
                  Why Choose Us
                </a>
              </li>
              <li>
                <Link to="/register" className="hover:text-themeYellow-400 transition-colors">
                  Create Member Account
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-themeYellow-400 transition-colors">
                  Client Portal Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Operating Hours */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-themeYellow-400 pl-3">
              Operating Hours
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                <div className="flex items-center gap-2 text-red-400 font-bold mb-1">
                  <Clock className="w-4 h-4" />
                  <span>24/7 Emergency Care</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Open 24 hours every day, including public holidays and Sundays.
                </p>
              </div>

              <div className="text-slate-400 space-y-1 text-xs">
                <p><strong className="text-slate-200">Routine Consultations:</strong> 8:00 AM – 8:00 PM</p>
                <p><strong className="text-slate-200">Surgery & Procedures:</strong> 9:00 AM – 6:00 PM</p>
                <p><strong className="text-slate-200">Spa & Grooming:</strong> 9:00 AM – 7:00 PM</p>
              </div>
            </div>
          </div>

          {/* Col 4: Contact Information */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-themeYellow-400 pl-3">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-themeYellow-400 shrink-0 mt-0.5" />
                <span>No. 125, Horton Place, Cinnamon Gardens, Colombo 07, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-themeYellow-400 shrink-0" />
                <span>+94 (11) 234-5678 / +94 77 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-themeYellow-400 shrink-0" />
                <span>appointments@petvitalclinic.lk</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} PetVitals Pet Care & Vet Clinic System. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
            <span>RAD Final Coursework</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span className="text-themeYellow-400 font-semibold flex items-center gap-1">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> & Tailwind CSS
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
