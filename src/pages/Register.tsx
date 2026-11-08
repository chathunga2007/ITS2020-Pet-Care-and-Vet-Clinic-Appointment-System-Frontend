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
  XCircle
} from "lucide-react";
import toast from "react-hot-toast";

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

  // Password strength checker
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
      
      {/* Decorative Paw Elements */}
      <div className="absolute top-8 left-8 text-teal-600/10 dark:text-teal-400/10 text-5xl select-none pointer-events-none transform -rotate-12 animate-pulse-slow">
        🐾
      </div>
      <div className="absolute bottom-16 right-10 text-teal-600/10 dark:text-teal-400/10 text-6xl select-none pointer-events-none transform rotate-12">
        🐾
      </div>

      {/* Top Header Navigation */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-700/40 flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform">
              <img
                src={clinicLogo}
                alt="PetCare & Vet"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl sm:text-2xl font-black tracking-tight text-[#0f3b46] dark:text-teal-300">
              PetCare <span className="text-teal-600 dark:text-teal-400">&amp; Vet</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
            <Link to="/" className="hover:text-teal-700 dark:hover:text-teal-400 flex items-center gap-1">
              <span>🏠</span> Home
            </Link>
            <a href="/#services" className="hover:text-teal-700 dark:hover:text-teal-400">
              Services
            </a>
            <a href="/#why-us" className="hover:text-teal-700 dark:hover:text-teal-400">
              About
            </a>
            <a href="/#emergency" className="hover:text-teal-700 dark:hover:text-teal-400">
              Contact
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 text-xs font-bold text-teal-800 dark:text-teal-300">
            <span>🐾</span>
            <span>Healthy Pets, Happy Lives</span>
            <span className="text-teal-600">💚</span>
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="p-2.5 rounded-full bg-white dark:bg-white/5 hover:bg-teal-50 dark:hover:bg-white/10 border border-teal-200/80 dark:border-white/10 text-teal-800 dark:text-slate-200 transition-all shadow-sm cursor-pointer"
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
            className="p-2 sm:px-3 sm:py-2 rounded-full bg-white dark:bg-white/5 hover:bg-teal-50 dark:hover:bg-white/10 border border-teal-200/80 dark:border-white/10 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all shadow-sm flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4 text-teal-700" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

      {/* Main Split Grid */}
      <main className="relative z-10 flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
          
          {/* Left Side: Brand Visuals & Cute Pets (Image 2) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="font-handwriting text-2xl sm:text-3xl text-teal-700 dark:text-teal-300 font-bold block rotate-[-3deg]">
                Your Pet's Health, Our Priority
                <svg
                  className="w-36 h-2 text-teal-500/50 mt-0.5"
                  viewBox="0 0 150 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 7C45 2 105 3 148 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>

              <h1 className="text-4xl sm:text-6xl font-black text-[#0f3438] dark:text-white tracking-tight leading-tight">
                Pet Care <span className="text-teal-700 dark:text-teal-400">&amp; Vet</span>
              </h1>

              <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
                Create your verified member account to register your pets, view doctor consultation schedules, and book guaranteed time slots. 💚
              </p>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white dark:bg-[#072427] border border-teal-100 dark:border-teal-800/40 shadow-sm flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-white/5 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-1.5 shadow-sm">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-extrabold text-[#0f3438] dark:text-slate-200">
                  Expert Veterinary Care
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#072427] border border-teal-100 dark:border-teal-800/40 shadow-sm flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-white/5 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-1.5 shadow-sm">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-extrabold text-[#0f3438] dark:text-slate-200">
                  Pet Health Monitoring
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#072427] border border-teal-100 dark:border-teal-800/40 shadow-sm flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-white/5 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-1.5 shadow-sm">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-extrabold text-[#0f3438] dark:text-slate-200">
                  Book Appointments
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white dark:bg-[#072427] border border-teal-100 dark:border-teal-800/40 shadow-sm flex flex-col items-center text-center">
                <div className="w-9 h-9 rounded-full bg-teal-50 dark:bg-white/5 text-teal-700 dark:text-teal-400 flex items-center justify-center mb-1.5 shadow-sm">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="text-[11px] font-extrabold text-[#0f3438] dark:text-slate-200">
                  Pet Care Tips
                </span>
              </div>
            </div>

            {/* Cute Puppy, Kitten, Bunny Visual Banner */}
            <div className="relative rounded-3xl overflow-hidden border border-teal-200/80 dark:border-teal-800/40 shadow-xl bg-white dark:bg-[#061e20]">
              <img
                src={petcareHomeBg}
                alt="Pet Companions"
                className="w-full h-56 sm:h-64 object-cover object-center filter brightness-105"
              />

              <div className="bg-gradient-to-r from-[#033b3a] via-[#044c4a] to-[#033b3a] text-white py-3 px-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
                  <span className="text-base">🐾</span>
                  <span className="font-handwriting text-lg sm:text-xl text-teal-100">
                    Because they can't speak, we care...
                  </span>
                </div>
                <span className="text-teal-300 font-handwriting text-xl">♡</span>
              </div>
            </div>
          </div>

          {/* Right Side: Register Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-md bg-white dark:bg-[#072427]/95 rounded-[36px] shadow-2xl shadow-teal-950/15 border border-teal-100/90 dark:border-teal-800/40 p-7 sm:p-9 relative backdrop-blur-xl">
              
              {/* Top Tabs (Register active, Login inactive) */}
              <div className="grid grid-cols-2 gap-2 p-1.5 rounded-full bg-[#f0f6f8] dark:bg-slate-800/60 border border-teal-100/60 dark:border-slate-700 mb-6">
                <Link
                  to="/login"
                  className="py-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-teal-700 dark:hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
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

              {/* Paw Icon Center Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center gap-2 mb-2">
                  <span className="h-px w-10 bg-teal-500/40" />
                  <span className="text-2xl text-teal-700">🐾</span>
                  <span className="h-px w-10 bg-teal-500/40" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0f3438] dark:text-white tracking-tight">
                  Join PetCare &amp; Vet
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Create your free account in under a minute
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5">
                
                {/* Full Name */}
                <div>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
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

                {/* Email Address */}
                <div>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
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

                {/* Phone Number (Optional) */}
                <div>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type="tel"
                      placeholder="Phone Number (Optional)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                    />
                  </div>
                </div>

                {/* Password and Confirm Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-10 py-3 text-sm rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      placeholder="Confirm"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-11 pr-10 py-3 text-sm rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    >
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Password strength and match */}
                {password && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Strength:</span>
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
                        className={`h-full transition-all duration-300 ${
                          passwordStrength <= 1
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

                {/* Terms agreement */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-teal-300 dark:border-slate-600 text-teal-700 focus:ring-teal-500 bg-[#f0f6f8] dark:bg-slate-800"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-300 leading-tight cursor-pointer">
                    I agree to PetCare &amp; Vet's{" "}
                    <span className="text-teal-700 dark:text-teal-400 font-bold hover:underline">Terms of Service</span>.
                  </label>
                </div>

                {/* Primary CTA Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-2 py-3.5 rounded-full bg-gradient-to-r from-teal-700 via-teal-700 to-emerald-600 hover:from-teal-800 hover:to-emerald-700 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-teal-800/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer group"
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

              {/* Bottom Switch Link with Doodle Arrow */}
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