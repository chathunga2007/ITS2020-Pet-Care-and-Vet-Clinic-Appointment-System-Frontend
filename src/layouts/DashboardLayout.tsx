import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";
import clinicLogo from "../assets/pet-care-web-logo.png";
import {
  LayoutDashboard,
  Calendar,
  Dog,
  Stethoscope,
  PlusCircle,
  Menu,
  X,
  LogOut,
  Sun,
  Moon,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import Swal from "../utils/sweetalert";

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle?: string;
  pageSubtitle?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  pageTitle,
  pageSubtitle,
}) => {
  const { user, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    const confirmed = await Swal.confirm({
      title: "Sign Out?",
      text: "Are you sure you want to log out of the clinic system?",
      confirmButtonText: "Yes, Sign Out",
      cancelButtonText: "Cancel",
    });

    if (confirmed) {
      logout();
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out of the clinic system.",
        timer: 1500,
      });
      navigate("/");
    }
  };

  // User navigation items
  const userNavItems = [
    {
      name: "Dashboard",
      path: "/user/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      exact: true,
    },
    {
      name: "My Pets",
      path: "/user/pets",
      icon: <Dog className="w-5 h-5" />,
    },
    {
      name: "Book Appointment",
      path: "/user/book",
      icon: <PlusCircle className="w-5 h-5" />,
    },
    {
      name: "My Appointments",
      path: "/user/appointments",
      icon: <Calendar className="w-5 h-5" />,
    },
  ];

  // Admin navigation items
  const adminNavItems = [
    {
      name: "Admin Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      exact: true,
    },
    {
      name: "Appointments",
      path: "/admin/appointments",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      name: "Doctors & Specialists",
      path: "/admin/doctors",
      icon: <Stethoscope className="w-5 h-5" />,
    },
    {
      name: "Pet Registry",
      path: "/admin/pets",
      icon: <Dog className="w-5 h-5" />,
    },
    {
      name: "Clinical Services",
      path: "/admin/services",
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f3faf8] dark:bg-[#06181a] text-slate-800 dark:text-slate-100 flex transition-colors duration-300">
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-md lg:hidden animate-in fade-in duration-200"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-[#072124] border-r border-teal-100 dark:border-teal-700/40 flex flex-col justify-between transition-transform duration-300 shadow-xl lg:shadow-none lg:translate-x-0 ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6 border-b border-teal-100/70 dark:border-teal-700/30">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-3 group"
              onClick={() => setMobileSidebarOpen(false)}
            >
              <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-900/40 border border-teal-200/80 dark:border-teal-700/40 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
                <img
                  src={clinicLogo}
                  alt="PetCare & Vet"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block text-base font-black tracking-tight text-[#0f3b46] dark:text-white leading-tight">
                  PetCare &amp; Vet
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  {isAdmin ? "Admin Operations" : "Member Portal"}
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4 px-3 py-1.5 rounded-xl bg-teal-50/80 dark:bg-white/5 border border-teal-100/80 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isAdmin ? (
                <ShieldCheck className="w-4 h-4 text-amber-500" />
              ) : (
                <HeartHandshake className="w-4 h-4 text-teal-600" />
              )}
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isAdmin ? "Administrator" : "Pet Parent"}
              </span>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5">
          <p className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-3">
            {isAdmin ? "Clinic Management" : "Pet Care Hub"}
          </p>

          {navItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${isActive
                    ? "bg-teal-700 text-white shadow-lg shadow-teal-700/25"
                    : "text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/5"
                  }`}
              >
                <span className={isActive ? "text-white" : "text-teal-600 dark:text-teal-400"}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-white/70" />}
              </Link>
            );
          })}

          <div className="pt-4 border-t border-teal-100/70 dark:border-teal-700/30 mt-6 space-y-1.5">
            <p className="px-3 text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-400 mb-3">
              External &amp; Public
            </p>
            <Link
              to="/"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-teal-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
            >
              <ExternalLink className="w-4 h-4 text-slate-400" />
              <span>Back to Public Website</span>
            </Link>
          </div>
        </div>

        <div className="p-4 border-t border-teal-100/70 dark:border-teal-700/30">
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-teal-50/50 dark:bg-white/5 border border-teal-100/60 dark:border-white/5">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs uppercase shrink-0 shadow-sm">
                {user?.name ? user.name.slice(0, 2) : "US"}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-black text-slate-800 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:pl-72 flex flex-col min-h-screen min-w-0 w-full max-w-full overflow-x-hidden">
        <header className="sticky top-0 z-30 min-h-[4.5rem] bg-white/95 dark:bg-[#072124] backdrop-blur-md border-b border-teal-100 dark:border-teal-800/60 px-4 sm:px-8 py-3 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-teal-50 dark:bg-white/5 text-teal-800 dark:text-slate-200 border border-teal-100 dark:border-white/10 shrink-0"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex flex-col justify-center min-w-0">
              <h2 className="text-sm sm:text-base font-black text-slate-800 dark:text-white tracking-tight leading-snug">
                {pageTitle || (isAdmin ? "Clinic Administrative Operations" : "Pet Care Member Portal")}
              </h2>
              {pageSubtitle && (
                <p className="hidden sm:block text-[11px] text-slate-500 dark:text-teal-300/80 leading-normal mt-0.5 truncate max-w-xl">
                  {pageSubtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Clinic System Online</span>
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full bg-teal-50 dark:bg-white/5 hover:bg-teal-100 dark:hover:bg-white/10 border border-teal-100 dark:border-white/10 text-teal-800 dark:text-slate-200 transition-all cursor-pointer"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-teal-700" />
              )}
            </button>

            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-100 dark:border-white/10 hover:border-teal-400 transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                  {user?.name ? user.name.slice(0, 2) : "US"}
                </div>
                <span className="hidden sm:inline-block text-xs font-bold text-slate-800 dark:text-white max-w-[100px] truncate">
                  {user?.name?.split(" ")[0]}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white dark:bg-[#072124] border border-teal-100 dark:border-teal-700/60 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-teal-100 dark:border-white/10 mb-1">
                    <p className="text-[10px] uppercase font-bold text-slate-400">Signed in as</p>
                    <p className="text-xs font-bold text-[#0f3b46] dark:text-white truncate">
                      {user?.email}
                    </p>
                  </div>
                  <Link
                    to="/"
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white hover:bg-teal-50 dark:hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-teal-600" />
                    <span>View Public Website</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full min-w-0 mx-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;