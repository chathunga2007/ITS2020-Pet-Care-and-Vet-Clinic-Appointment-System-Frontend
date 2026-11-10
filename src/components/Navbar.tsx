import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";
import clinicLogo from "../assets/pet-care-web-logo.png";
import {
  Menu,
  X,
  ShieldCheck,
  LogOut,
  Calendar,
  ChevronDown,
  Sun,
  Moon,
  LogIn,
  UserPlus
} from "lucide-react";
import Swal from "../utils/sweetalert";

interface NavLinkItem {
  name: string;
  href: string;
  icon: string;
  badge?: string;
}

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    Swal.fire({
      icon: "success",
      title: "Logged Out",
      text: "You have been signed out successfully.",
      timer: 1500,
    });
    navigate("/");
  };

  // Nav links matching the AI design layout with all clinic pages & sections in orderly sequence
  const navLinks: NavLinkItem[] = [
    { name: "Home", href: "/#home", icon: "🏠" },
    { name: "Services", href: "/#services", icon: "🐾" },
    { name: "About", href: "/#why-us", icon: "✨" },
    { name: "Doctors", href: "/#specialists", icon: "🩺" },
    { name: "How It Works", href: "/#workflow", icon: "📋" },
    { name: "Contact", href: "/#contact", icon: "📞", badge: "24/7" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location.pathname !== "/") {
        navigate(`/${href}`);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const navOffset = 90;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navOffset,
            behavior: "smooth"
          });
        }
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="sticky top-0 z-50 pt-3 pb-2 px-3 sm:px-6 transition-all duration-300">
      <div className="max-w-7xl mx-auto rounded-full bg-white/90 dark:bg-[#061e20]/90 backdrop-blur-md px-4 sm:px-6 py-2.5 sm:py-3 border border-teal-100/80 dark:border-teal-800/30 shadow-lg shadow-teal-900/5 dark:shadow-black/40 flex items-center justify-between">
        
        {/* Brand Logo & Title */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-700/40 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
            <img
              src={clinicLogo}
              alt="PetCare & Vet"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0f3b46] dark:text-teal-300 group-hover:text-teal-600 transition-colors">
              PetCare & Vet Clinic
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5">
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => handleLinkClick(item.href)}
              className="px-2.5 lg:px-3 py-1.5 text-xs lg:text-sm font-bold text-[#0f3b46] dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-300 transition-colors rounded-full hover:bg-teal-50 dark:hover:bg-white/5 flex items-center gap-1 lg:gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span className="text-xs">{item.icon}</span>
              <span>{item.name}</span>
              {item.badge && (
                <span className="text-[9px] lg:text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-2.5">
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full bg-teal-50/70 dark:bg-white/5 hover:bg-teal-100 dark:hover:bg-white/10 border border-teal-100 dark:border-white/10 text-teal-800 dark:text-slate-200 transition-all cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-teal-700" />
            )}
          </button>

          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-xs sm:text-sm font-bold rounded-full border border-teal-600/40 text-[#0f3b46] dark:text-teal-200 bg-white/80 dark:bg-white/5 hover:bg-teal-50 dark:hover:bg-white/10 transition-all shadow-sm flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-xs sm:text-sm font-bold rounded-full bg-teal-700 hover:bg-teal-800 text-white shadow-md shadow-teal-800/20 hover:shadow-teal-800/30 transition-all flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5 text-white" />
                <span>Register</span>
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-themeDark-800 border border-teal-200 dark:border-white/10 hover:border-teal-500 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                  {user?.name ? user.name.slice(0, 2) : "US"}
                </div>
                <span className="text-xs font-bold text-[#0f3b46] dark:text-white max-w-[100px] truncate">
                  {user?.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-teal-700 dark:text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-themeDark-900 border border-teal-100 dark:border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-teal-100 dark:border-white/10 mb-1">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                    <p className="text-sm font-bold text-[#0f3b46] dark:text-white truncate">{user?.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleLinkClick("/#services");
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
                  >
                    <Calendar className="w-4 h-4 text-teal-600" />
                    <span>Book Appointments</span>
                  </button>

                  {isAdmin && (
                    <div className="px-3 py-2 text-xs font-bold text-amber-600 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Admin Access</span>
                    </div>
                  )}

                  <div className="border-t border-teal-100 dark:border-white/10 my-1" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-100 dark:border-white/10 text-teal-800 dark:text-slate-200"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-teal-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-teal-50 dark:bg-themeDark-800 text-teal-800 dark:text-slate-200 border border-teal-100 dark:border-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 rounded-3xl bg-white/95 dark:bg-[#061e20]/95 backdrop-blur-xl border border-teal-100 dark:border-white/10 p-4 shadow-xl space-y-3">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleLinkClick(item.href)}
                className="w-full text-left px-4 py-2 text-sm font-bold text-[#0f3b46] dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-white/5 rounded-xl flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-500">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-teal-100 dark:border-white/10">
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-bold text-[#0f3b46] dark:text-white bg-teal-50 dark:bg-white/5 rounded-full border border-teal-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2 text-xs font-bold text-white bg-teal-700 rounded-full shadow-md"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-2.5 bg-teal-50 dark:bg-white/5 rounded-2xl flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
                    {user?.name?.slice(0, 2).toUpperCase() || "US"}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0f3b46] dark:text-white">{user?.name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-center text-xs font-bold text-red-500 bg-red-50 dark:bg-red-500/10 rounded-full"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;