import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  Menu,
  X,
  ShieldCheck,
  LogOut,
  PhoneCall,
  Calendar,
  Sparkles,
  ChevronDown
} from "lucide-react";
import toast from "react-hot-toast";

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  interface NavLinkItem {
    name: string;
    href: string;
    badge?: string;
  }

  const navLinks: NavLinkItem[] = [
    { name: "Home", href: "/" },
    { name: "Book Visit", href: "/#booking-simulator" },
    { name: "Services", href: "/#services" },
    { name: "Specialists", href: "/#specialists" },
    { name: "Why Us", href: "/#why-us" },
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
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-nav py-3 shadow-xl shadow-black/40"
          : "bg-themeDark-950/60 backdrop-blur-md py-4 border-b border-white/5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center p-1 shadow-md shadow-sky-500/10 group-hover:border-sky-400/40 transition-all">
                <img
                  src="/pet-care-web-logo.png"
                  alt="PetCare Clinic"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#07090e] rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-sky-400 transition-colors">
                  Pet<span className="text-gradient-logo">Vitals</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-sky-400/10 text-sky-400 border border-sky-400/20">
                  Clinic
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-medium">
                Pet Care & Vet System
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleLinkClick(item.href)}
                className="relative px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-themeYellow-400 transition-colors rounded-lg hover:bg-white/5 flex items-center gap-1.5 group cursor-pointer"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Quick Emergency Call Button */}
            <a
              href="tel:+94112345678"
              className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/25 hover:bg-red-500/20 transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400 animate-bounce" />
              <span>(011) 234-5678</span>
            </a>

            {/* Guest vs Authenticated User View */}
            {!isAuthenticated ? (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-semibold text-slate-200 hover:text-themeYellow-400 hover:bg-white/5 rounded-xl transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 text-sm font-bold text-themeDark-950 bg-gradient-to-r from-themeYellow-400 via-amber-400 to-themeYellow-500 hover:from-themeYellow-300 hover:to-themeYellow-400 rounded-xl shadow-md shadow-themeYellow-500/20 hover:shadow-themeYellow-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-themeDark-950" />
                  <span>Sign Up</span>
                </Link>
              </div>
            ) : (
              /* User Profile & Menu */
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-themeDark-800/80 border border-white/10 hover:border-themeYellow-500/50 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-themeYellow-400 to-amber-500 text-themeDark-950 flex items-center justify-center font-bold text-xs uppercase shadow-inner">
                    {user?.name ? user.name.slice(0, 2) : "US"}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-white leading-tight">
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-themeYellow-400 font-medium">
                      {isAdmin ? "Administrator" : "Pet Parent"}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-themeDark-900 border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
                      <div className="mt-1 flex gap-1">
                        {user?.roles?.map((r) => (
                          <span
                            key={r}
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-themeYellow-400/20 text-themeYellow-400 border border-themeYellow-400/30"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleLinkClick("/#services");
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left"
                    >
                      <Calendar className="w-4 h-4 text-themeYellow-400" />
                      <span>Book Appointments</span>
                    </button>

                    {isAdmin && (
                      <div className="px-3 py-2 text-xs font-semibold text-amber-400 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Admin Access Active</span>
                      </div>
                    )}

                    <div className="border-t border-white/10 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-themeDark-800 text-slate-300 hover:text-white border border-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-nav border-t border-white/10 px-4 pt-3 pb-6 mt-3 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => handleLinkClick(item.href)}
                className="w-full text-left px-3.5 py-2.5 text-sm font-medium text-slate-200 hover:text-themeYellow-400 hover:bg-white/5 rounded-xl flex items-center justify-between"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10">
            {!isAuthenticated ? (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-semibold text-slate-200 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 text-sm font-bold text-themeDark-950 bg-themeYellow-400 hover:bg-themeYellow-300 rounded-xl shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-3 bg-white/5 rounded-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-themeYellow-400 text-themeDark-950 flex items-center justify-center font-bold">
                    {user?.name?.slice(0, 2).toUpperCase() || "US"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{user?.name}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full py-2.5 text-center text-sm font-semibold text-red-400 bg-red-500/10 rounded-xl flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
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
