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
  UserPlus,
  Dog,
  Stethoscope,
  ClipboardList
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
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    const confirmed = await Swal.confirm({
      title: "Sign Out?",
      text: "Are you sure you want to log out of your account?",
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Cancel",
    });

    if (confirmed) {
      logout();
      setUserDropdownOpen(false);
      setMobileMenuOpen(false);
      Swal.fire({
        icon: "success",
        title: "Signed Out",
        text: "You have been logged out successfully.",
        timer: 1500,
      });
      navigate("/");
    }
  };

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
    <header className="fixed top-0 left-0 right-0 z-50 pt-2.5 sm:pt-3 pb-2 px-3 sm:px-6 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-full backdrop-blur-xl px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 border transition-all duration-300 flex items-center justify-between ${isScrolled
            ? "bg-white/95 dark:bg-[#061e20]/95 border-teal-200/90 dark:border-teal-700/60 shadow-xl shadow-teal-950/10 dark:shadow-black/60"
            : "bg-white/90 dark:bg-[#061e20]/90 border-teal-100/80 dark:border-teal-800/30 shadow-md shadow-teal-900/5 dark:shadow-black/40"
          }`}
      >

        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-700/40 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
            <img
              src={clinicLogo}
              alt="PetCare & Vet"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg sm:text-xl font-black tracking-tight text-[#0f3b46] dark:text-teal-300 group-hover:text-teal-600 transition-colors">
              PetCare &amp; Vet Clinic
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5 mx-auto px-2">
          {navLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => handleLinkClick(item.href)}
              className="px-2.5 xl:px-3 py-1.5 text-xs xl:text-[13px] font-bold text-[#0f3b46] dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-300 transition-all rounded-full hover:bg-teal-50 dark:hover:bg-white/5 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span className="text-xs sm:text-sm">{item.icon}</span>
              <span>{item.name}</span>
              {item.badge && (
                <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 border border-rose-500/25">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2 lg:gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-full bg-teal-50/80 dark:bg-white/5 hover:bg-teal-100 dark:hover:bg-white/10 border border-teal-100/80 dark:border-white/10 text-teal-800 dark:text-slate-200 transition-all cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-teal-700" />
            )}
          </button>

          {!isAuthenticated ? (
            <div className="flex items-center gap-2 lg:gap-3">
              <Link
                to="/login"
                className="px-3.5 py-2 text-xs lg:text-sm font-bold text-[#0f3b46] dark:text-teal-200 hover:text-teal-700 dark:hover:text-teal-300 transition-colors flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-teal-700 dark:text-teal-400" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 text-xs lg:text-sm font-bold rounded-full bg-teal-700 hover:bg-teal-800 text-white shadow-md shadow-teal-800/20 hover:shadow-teal-800/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-1.5"
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
                <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-white dark:bg-[#072124] border border-teal-100 dark:border-teal-700/60 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-teal-100 dark:border-white/10 mb-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Signed in as</p>
                    <p className="text-xs font-bold text-[#0f3b46] dark:text-white truncate">{user?.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-black text-[9px]">
                        ADMINISTRATOR
                      </span>
                    )}
                  </div>

                  {/* Role Specific Dropdown Links */}
                  {isAdmin ? (
                    <>
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-500" />
                        <span>Operations Dashboard</span>
                      </Link>
                      <Link
                        to="/admin/appointments"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <Calendar className="w-4 h-4 text-teal-600" />
                        <span>All Appointments</span>
                      </Link>
                      <Link
                        to="/admin/doctors"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <Stethoscope className="w-4 h-4 text-teal-600" />
                        <span>Manage Doctors</span>
                      </Link>
                      <Link
                        to="/admin/pets"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <Dog className="w-4 h-4 text-teal-600" />
                        <span>Pet Registry</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/user/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <Calendar className="w-4 h-4 text-teal-600" />
                        <span>My Dashboard</span>
                      </Link>
                      <Link
                        to="/user/pets"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <Dog className="w-4 h-4 text-teal-600" />
                        <span>My Pets</span>
                      </Link>
                      <Link
                        to="/user/book"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <Calendar className="w-4 h-4 text-teal-600" />
                        <span>Book Appointment</span>
                      </Link>
                      <Link
                        to="/user/appointments"
                        onClick={() => setUserDropdownOpen(false)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/5 rounded-xl transition-colors text-left"
                      >
                        <ClipboardList className="w-4 h-4 text-teal-600" />
                        <span>My Appointments</span>
                      </Link>
                    </>
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

        {/* Mobile & Tablet Menu Controls (< lg) */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-100 dark:border-white/10 text-teal-800 dark:text-slate-200"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-teal-700" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full bg-teal-50 dark:bg-themeDark-800 text-teal-800 dark:text-slate-200 border border-teal-100 dark:border-white/10 cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 rounded-3xl bg-white/95 dark:bg-[#061e20]/95 backdrop-blur-xl border border-teal-100 dark:border-white/10 p-4 shadow-xl space-y-3">
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

                {isAdmin ? (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 text-center text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 rounded-full block border border-amber-500/30"
                  >
                    🛡️ Admin Dashboard
                  </Link>
                ) : (
                  <Link
                    to="/user/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 text-center text-xs font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-white/5 rounded-full block border border-teal-200"
                  >
                    🐾 Open Member Dashboard
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full py-2 text-center text-xs font-bold text-red-500 bg-red-50 dark:bg-red-500/10 rounded-full cursor-pointer"
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