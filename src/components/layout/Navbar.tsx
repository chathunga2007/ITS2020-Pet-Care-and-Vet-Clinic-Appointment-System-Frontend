import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import petLogo from '../../assets/pet-care-web-logo.png';
import {
  PhoneCall,
  Clock,
  MapPin,
  Calendar,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoutClick = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top emergency & clinic info bar */}
      <div className="bg-slate-950/80 backdrop-blur-md text-slate-300 text-xs border-b border-white/5 py-1.5 px-4 sm:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <Clock className="w-3.5 h-3.5" /> Mon - Sat: 8:00 AM - 9:00 PM | Sunday: 9:00 AM - 5:00 PM
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> No. 128, Galle Road, Colombo 03
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="tel:+94112345678"
              className="flex items-center gap-1.5 text-rose-300 hover:text-rose-200 font-semibold bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20 transition"
            >
              <PhoneCall className="w-3 h-3 animate-pulse text-rose-400" /> 24/7 Vet Hotline: (011) 234-5678
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav
        className={`px-4 sm:px-8 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/90 backdrop-blur-lg shadow-xl shadow-black/20 border-b border-white/10 py-3'
            : 'bg-gradient-to-b from-slate-950/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src={petLogo}
              alt="Pet Care Clinic Logo"
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1">
                PetCare <span className="text-emerald-400">&amp; Vet</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-300/80 -mt-1">
                Hospital &amp; Clinic
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-200">
            <Link to="/" className="hover:text-emerald-400 transition-colors">
              Home
            </Link>
            <a href="#services" className="hover:text-emerald-400 transition-colors">
              Services
            </a>
            <a href="#vets" className="hover:text-emerald-400 transition-colors">
              Our Vets
            </a>
            <a href="#why-us" className="hover:text-emerald-400 transition-colors">
              Why Us
            </a>
            <a href="#testimonials" className="hover:text-emerald-400 transition-colors">
              Reviews
            </a>
            <a href="#emergency" className="hover:text-rose-400 transition-colors flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> Emergency
            </a>
          </div>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Quick appointment CTA */}
            {onOpenBooking && (
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold px-4 py-2 rounded-xl shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:scale-[1.02] text-sm"
              >
                <Calendar className="w-4 h-4" /> Book Appointment
              </button>
            )}

            {/* Auth State Switch */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-white transition text-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                  <span className="font-medium max-w-[110px] truncate">{user.name}</span>
                  <ChevronDown className="w-4 h-4 text-slate-300" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-slate-200">
                    <div className="px-4 py-2 border-b border-slate-800 text-xs">
                      <p className="font-semibold text-white truncate">{user.name}</p>
                      <p className="text-slate-400 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full uppercase">
                        {user.roles?.[0] || 'Member'}
                      </span>
                    </div>

                    <button
                      onClick={handleLogoutClick}
                      className="w-full text-left px-4 py-2.5 text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 text-sm transition mt-1"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-white hover:text-emerald-400 font-medium px-3.5 py-2 rounded-xl hover:bg-white/5 transition text-sm flex items-center gap-1.5"
                >
                  <UserIcon className="w-4 h-4 text-emerald-400" /> Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white/15 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-xl backdrop-blur-md border border-white/20 transition text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile slide drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl flex flex-col space-y-3 text-slate-200">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Home
            </Link>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Services
            </a>
            <a
              href="#vets"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Our Veterinarians
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-white/5"
            >
              Why Choose Us
            </a>
            <a
              href="#emergency"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-rose-400 font-semibold flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> 24/7 Emergency Hotline
            </a>

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              {onOpenBooking && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-xl transition"
                >
                  <Calendar className="w-4 h-4" /> Book Appointment
                </button>
              )}

              {user ? (
                <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl mt-1">
                  <div>
                    <p className="font-semibold text-white text-sm">{user.name}</p>
                    <p className="text-xs text-slate-400">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogoutClick}
                    className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 rounded-xl transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded-xl transition"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
