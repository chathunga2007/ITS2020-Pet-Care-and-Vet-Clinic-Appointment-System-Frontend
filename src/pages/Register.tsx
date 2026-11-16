import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { register } from "../service/auth";
import clinicLogo from "../assets/pet-care-web-logo.png";
import petcareHomeBg from "../assets/petcare home bg.png";
import {
  User as UserIcon,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  Stethoscope,
  HeartPulse,
  Calendar,
  Sparkles,
  Sun,
  Moon,
  LogIn,
  UserPlus,
  CheckCircle2,
  XCircle,
  Star
} from "lucide-react";
import toast from "react-hot-toast";

const DogPaw: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9.8c-2.3 0-4.2 1.8-4.2 4.1 0 2 1.5 3.8 3.6 4.3.4.1.8.1 1.2 0 2.1-.5 3.6-2.3 3.6-4.3 0-2.3-1.9-4.1-4.2-4.1z" />
    <circle cx="6.5" cy="9" r="2" />
    <circle cx="10" cy="5.8" r="2" />
    <circle cx="14" cy="5.8" r="2" />
    <circle cx="17.5" cy="9" r="2" />
  </svg>
);

const CatPaw: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 11c-1.8 0-3.4 1.3-3.8 3.1-.3 1.3.3 2.6 1.4 3.3.7.4 1.6.6 2.4.6s1.7-.2 2.4-.6c1.1-.7 1.7-2 1.4-3.3-.4-1.8-2-3.1-3.8-3.1z" />
    <circle cx="6.2" cy="10.5" r="1.6" />
    <circle cx="9.5" cy="7.2" r="1.7" />
    <circle cx="14.5" cy="7.2" r="1.7" />
    <circle cx="17.8" cy="10.5" r="1.6" />
  </svg>
);

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Please fill in your name, email, and password.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please verify.");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please accept the PetCare & Vet clinic terms & privacy policy.");
      return;
    }

    try {
      setLoading(true);
      const res = await register({
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim() || undefined,
        roles: ["USER"],
      });

      toast.success(res.message || "Account registered successfully! Please sign in.", {
        icon: "🎉",
      });

      setTimeout(() => {
        navigate("/login");
      }, 700);
    } catch (err: any) {
      console.error("Registration failed:", err);
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. The email might already be registered. Try logging in.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3faf8] dark:bg-[#061e20] text-slate-800 dark:text-slate-100 flex flex-col justify-between relative overflow-hidden transition-colors duration-300">

      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-teal-300/25 dark:bg-teal-500/15 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-emerald-300/20 dark:bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute top-6 left-8 flex items-center gap-2 select-none pointer-events-none transform -rotate-12 animate-pulse-slow">
        <DogPaw className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600/35 dark:text-teal-300/45 drop-shadow-[0_2px_8px_rgba(13,148,136,0.25)] dark:drop-shadow-[0_0_12px_rgba(45,212,191,0.45)]" />
        <DogPaw className="w-7 h-7 sm:w-8 sm:h-8 text-teal-700/40 dark:text-teal-200/50 transform translate-y-2.5 rotate-6 drop-shadow-[0_2px_8px_rgba(13,148,136,0.25)] dark:drop-shadow-[0_0_12px_rgba(45,212,191,0.45)]" />
      </div>

      <div className="absolute top-16 left-1/3 flex items-center gap-1.5 select-none pointer-events-none transform rotate-20">
        <CatPaw className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600/35 dark:text-emerald-300/40 drop-shadow-[0_2px_6px_rgba(16,185,129,0.25)] dark:drop-shadow-[0_0_10px_rgba(52,211,153,0.45)]" />
        <CatPaw className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700/40 dark:text-emerald-200/45 transform translate-y-2 -rotate-10 drop-shadow-[0_2px_6px_rgba(16,185,129,0.25)] dark:drop-shadow-[0_0_10px_rgba(52,211,153,0.45)]" />
      </div>

      <div className="absolute top-[55%] left-4 sm:left-10 flex items-center gap-2 select-none pointer-events-none transform -rotate-25">
        <DogPaw className="w-8 h-8 sm:w-11 sm:h-11 text-teal-600/30 dark:text-teal-300/40 drop-shadow-[0_2px_8px_rgba(13,148,136,0.25)] dark:drop-shadow-[0_0_12px_rgba(45,212,191,0.45)]" />
        <CatPaw className="w-6 h-6 sm:w-8 sm:h-8 text-teal-700/35 dark:text-teal-200/45 transform translate-y-2.5 rotate-15 drop-shadow-[0_2px_8px_rgba(13,148,136,0.25)] dark:drop-shadow-[0_0_12px_rgba(45,212,191,0.45)]" />
      </div>
      <div className="absolute top-10 right-12 sm:right-24 flex items-center gap-2 select-none pointer-events-none transform rotate-30">
        <CatPaw className="w-7 h-7 sm:w-8 sm:h-8 text-teal-600/35 dark:text-teal-300/45 drop-shadow-[0_2px_6px_rgba(13,148,136,0.2)] dark:drop-shadow-[0_0_10px_rgba(45,212,191,0.4)]" />
        <DogPaw className="w-8 h-8 sm:w-9 sm:h-9 text-teal-700/35 dark:text-teal-200/45 transform translate-y-2 -rotate-12 drop-shadow-[0_2px_6px_rgba(13,148,136,0.2)] dark:drop-shadow-[0_0_10px_rgba(45,212,191,0.4)]" />
      </div>

      <div className="absolute bottom-10 right-8 sm:right-16 flex items-center gap-2 select-none pointer-events-none transform -rotate-15">
        <DogPaw className="w-8 h-8 sm:w-12 sm:h-12 text-teal-600/35 dark:text-teal-300/45 drop-shadow-[0_2px_10px_rgba(13,148,136,0.3)] dark:drop-shadow-[0_0_14px_rgba(45,212,191,0.5)]" />
      </div>

      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-700/40 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
            <img
              src={clinicLogo}
              alt="PetCare & Vet"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0f3b46] dark:text-teal-300 group-hover:text-teal-600 transition-colors">
            PetCare & Vet Clinic
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 text-xs font-bold text-teal-800 dark:text-teal-300 shadow-xs">
            <span>🐾</span>
            <span>Healthy Pets, Happy Lives</span>
            <span className="text-teal-600">💚</span>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2 sm:p-2.5 rounded-full bg-white dark:bg-white/5 hover:bg-teal-50 dark:hover:bg-white/10 border border-teal-200/80 dark:border-white/10 text-teal-800 dark:text-slate-200 transition-all shadow-sm cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-teal-700" />
            )}
          </button>

          <Link
            to="/"
            className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-white dark:bg-white/5 hover:bg-teal-50 dark:hover:bg-white/10 border border-teal-200/90 dark:border-white/15 text-xs sm:text-sm font-bold text-[#0f3b46] dark:text-slate-100 transition-all shadow-sm hover:shadow-md flex items-center gap-2 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-teal-700 dark:text-teal-300 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-6 w-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">

          <div className="hidden lg:block lg:col-span-6 space-y-5 sm:space-y-6">

            <div className="space-y-2">
              <span className="font-handwriting text-2xl sm:text-3xl text-teal-700 dark:text-teal-300 font-bold block rotate-[-3deg]">
                Your Pet's Health, Our Priority
                <svg
                  className="w-40 h-2 text-teal-500/50 mt-0.5"
                  viewBox="0 0 150 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 7C45 2 105 3 148 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>

              <h1 className="text-3xl sm:text-5xl font-black text-[#0f3438] dark:text-white tracking-tight leading-tight">
                Pet Care <span className="text-teal-700 dark:text-teal-400">&amp; Vet</span>
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
                Create your verified member account to register your pets, view doctor consultation schedules, and book guaranteed time slots. 💚
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-1">
              <div className="p-3 rounded-2xl bg-white/90 dark:bg-[#072427] border border-teal-100 dark:border-teal-800/40 shadow-sm flex flex-col items-center text-center hover:-translate-y-0.5 transition-transform">
                <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-white/5 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-1.5 shadow-xs">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-extrabold text-[#0f3438] dark:text-slate-200">
                  Expert Veterinary Care
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 dark:bg-[#072427] border border-teal-100 dark:border-teal-800/40 shadow-sm flex flex-col items-center text-center hover:-translate-y-0.5 transition-transform">
                <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-white/5 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-1.5 shadow-xs">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-extrabold text-[#0f3438] dark:text-slate-200">
                  Pet Health Monitoring
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 dark:bg-[#072427] border border-teal-100 dark:border-teal-800/40 shadow-sm flex flex-col items-center text-center hover:-translate-y-0.5 transition-transform">
                <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-white/5 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-1.5 shadow-xs">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-extrabold text-[#0f3438] dark:text-slate-200">
                  Book Appointments
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/90 dark:bg-[#072427] border border-teal-100 dark:border-teal-800/40 shadow-sm flex flex-col items-center text-center hover:-translate-y-0.5 transition-transform">
                <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-white/5 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-1.5 shadow-xs">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-[11px] font-extrabold text-[#0f3438] dark:text-slate-200">
                  Pet Care Tips
                </span>
              </div>
            </div>

            <div className="relative pt-2">
              <div className="absolute -inset-2 bg-gradient-to-tr from-teal-400/30 via-emerald-400/20 to-teal-500/25 dark:from-teal-500/20 dark:via-emerald-500/10 dark:to-teal-400/20 rounded-[36px] blur-xl transform scale-95 pointer-events-none" />

              <div className="relative z-10 rounded-[32px] sm:rounded-[36px] p-2.5 sm:p-3 bg-gradient-to-b from-white/95 via-white/85 to-white/95 dark:from-white/10 dark:via-white/5 dark:to-white/10 backdrop-blur-2xl border border-white/80 dark:border-white/15 shadow-xl shadow-teal-950/15 ring-1 ring-teal-500/20">

                <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden aspect-[16/9.5] w-full bg-gradient-to-br from-teal-50 to-slate-100 dark:from-slate-900 dark:to-[#072427]">
                  <img
                    src={petcareHomeBg}
                    alt="PetCare & Vet Companions"
                    className="w-full h-full object-cover object-center filter brightness-105 select-none"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  <div className="absolute top-2.5 left-2.5 z-20 bg-white/95 dark:bg-[#08282b]/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-teal-100 dark:border-teal-700/50 shadow-md flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs shadow-xs">
                      🩺
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black text-slate-800 dark:text-white">Certified Specialists</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                      <p className="text-[9px] text-amber-500 font-bold flex items-center">
                        <Star className="w-2.5 h-2.5 fill-amber-400 inline mr-0.5" /> 5.0 Top Rated
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-[#033b3a]/95 via-[#044c4a]/95 to-[#033b3a]/95 text-white py-2.5 px-4 flex items-center justify-between backdrop-blur-xs">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="text-sm">🐾</span>
                      <span className="font-handwriting text-base sm:text-lg text-teal-100">
                        Because they can't speak, we care...
                      </span>
                    </div>
                    <span className="text-teal-300 font-handwriting text-lg">♡</span>
                  </div>

                </div>

              </div>
            </div>

          </div>

          <div className="w-full lg:col-span-6 flex justify-center py-2 sm:py-4">
            <div className="w-full max-w-md bg-white/95 dark:bg-[#072427]/95 rounded-[36px] sm:rounded-[40px] shadow-2xl shadow-teal-950/15 border border-teal-100/90 dark:border-teal-700/40 p-7 sm:p-9 relative backdrop-blur-2xl ring-1 ring-teal-500/20">

              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-full bg-[#f0f6f8] dark:bg-slate-800/60 border border-teal-100/60 dark:border-slate-700 mb-6">
                <Link
                  to="/login"
                  className="py-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </Link>
                <button
                  type="button"
                  className="py-2.5 rounded-full bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-teal-800/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center gap-2 mb-2">
                  <span className="h-px w-10 bg-teal-500/40" />
                  <span className="text-2xl text-teal-700 dark:text-teal-400">🐾</span>
                  <span className="h-px w-10 bg-teal-500/40" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0f3438] dark:text-white tracking-tight">
                  Join PetCare &amp; Vet
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Create your free account in under a minute
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">

                <div>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-4" />
                    <input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-9 py-3 text-sm rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="Confirm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-9 py-3 text-sm rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {password && (
                  <div className="space-y-1 pt-0.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Password strength:</span>
                      <span
                        className={
                          passwordStrength <= 1
                            ? "text-rose-500 font-bold"
                            : passwordStrength <= 3
                              ? "text-amber-500 font-bold"
                              : "text-teal-600 font-bold"
                        }
                      >
                        {passwordStrength <= 1 ? "Weak" : passwordStrength <= 3 ? "Medium" : "Strong"}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${passwordStrength <= 1
                            ? "w-1/4 bg-rose-500"
                            : passwordStrength <= 3
                              ? "w-3/4 bg-amber-500"
                              : "w-full bg-teal-600"
                          }`}
                      />
                    </div>
                    {confirmPassword && (
                      <div className="text-[11px] flex items-center gap-1 mt-0.5">
                        {password === confirmPassword ? (
                          <span className="text-teal-600 flex items-center gap-1 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
                          </span>
                        ) : (
                          <span className="text-rose-500 flex items-center gap-1 font-semibold">
                            <XCircle className="w-3.5 h-3.5" /> Passwords do not match
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-teal-300 dark:border-slate-600 text-teal-700 focus:ring-teal-500 bg-[#f0f6f8] dark:bg-slate-800"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-300 leading-tight cursor-pointer select-none">
                    I agree to PetCare &amp; Vet's{" "}
                    <span className="text-teal-700 dark:text-teal-400 font-bold hover:underline">Terms of Service</span>.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 rounded-full bg-gradient-to-r from-teal-700 via-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-teal-800/30 hover:shadow-teal-800/40 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer group"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      <span>Register</span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-5 text-center text-xs text-slate-600 dark:text-slate-400">
                <span>Already have an account? </span>
                <Link
                  to="/login"
                  className="font-black text-teal-700 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>Login here</span>
                  <span className="font-handwriting text-lg text-teal-600 inline-block rotate-[15deg]">⤹</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </main>

      <footer className="relative z-20 py-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>PetCare &amp; Vet Clinic Appointment System • Safe &amp; Secure Medical Portal</p>
      </footer>

    </div>
  );
};

export default Register;