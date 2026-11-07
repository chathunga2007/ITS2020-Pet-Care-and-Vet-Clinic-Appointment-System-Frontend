import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { login, register } from "../service/auth";
import {
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2
} from "lucide-react";
import toast from "react-hot-toast";

interface ColorTheme {
  id: string;
  name: string;
  hex: string;
  glow: string;
  bgGlow: string;
  gradient: string;
  ring: string;
  buttonClass: string;
}

const LAMP_THEMES: ColorTheme[] = [
  {
    id: "amber",
    name: "Golden Amber",
    hex: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.45)",
    bgGlow: "radial-gradient(ellipse 65% 55% at 30% 40%, rgba(245, 158, 11, 0.22), rgba(7, 9, 14, 0))",
    gradient: "from-amber-400 via-amber-500 to-yellow-500",
    ring: "focus:ring-amber-400",
    buttonClass: "bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 hover:from-amber-300 hover:to-yellow-400 shadow-amber-500/30",
  },
  {
    id: "magenta",
    name: "Neon Magenta",
    hex: "#ec4899",
    glow: "rgba(236, 72, 153, 0.45)",
    bgGlow: "radial-gradient(ellipse 65% 55% at 30% 40%, rgba(236, 72, 153, 0.22), rgba(7, 9, 14, 0))",
    gradient: "from-pink-400 via-rose-500 to-pink-500",
    ring: "focus:ring-pink-400",
    buttonClass: "bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-400 hover:to-rose-400 shadow-pink-500/30",
  },
  {
    id: "cyan",
    name: "Electric Cyan",
    hex: "#0ea5e9",
    glow: "rgba(14, 165, 233, 0.45)",
    bgGlow: "radial-gradient(ellipse 65% 55% at 30% 40%, rgba(14, 165, 233, 0.22), rgba(7, 9, 14, 0))",
    gradient: "from-cyan-400 via-sky-500 to-blue-500",
    ring: "focus:ring-sky-400",
    buttonClass: "bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 hover:from-cyan-300 hover:to-sky-400 shadow-sky-500/30",
  },
  {
    id: "emerald",
    name: "Emerald Mint",
    hex: "#10b981",
    glow: "rgba(16, 185, 129, 0.45)",
    bgGlow: "radial-gradient(ellipse 65% 55% at 30% 40%, rgba(16, 185, 129, 0.22), rgba(7, 9, 14, 0))",
    gradient: "from-emerald-400 via-teal-500 to-emerald-500",
    ring: "focus:ring-emerald-400",
    buttonClass: "bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 hover:from-emerald-300 hover:to-teal-400 shadow-emerald-500/30",
  },
];

interface InteractiveLampAuthProps {
  initialMode?: "signin" | "signup";
}

export const InteractiveLampAuth: React.FC<InteractiveLampAuthProps> = ({
  initialMode = "signin",
}) => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  // Mode state: 'signin' | 'signup'
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);

  // Lamp state
  const [isLampOn, setIsLampOn] = useState<boolean>(true);
  const [isCordPulled, setIsCordPulled] = useState<boolean>(false);
  const [colorIndex, setColorIndex] = useState<number>(0);
  const [autoCycle, setAutoCycle] = useState<boolean>(true);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  // Current active theme
  const currentTheme = LAMP_THEMES[colorIndex];

  // Auto-cycle colors every 4 seconds when lamp is ON
  useEffect(() => {
    if (!isLampOn || !autoCycle) return;
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % LAMP_THEMES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isLampOn, autoCycle]);

  // Handle Cord Pull Click
  const handlePullCord = () => {
    setIsCordPulled(true);
    setTimeout(() => setIsCordPulled(false), 500);

    setIsLampOn((prev) => {
      const next = !prev;
      if (next) {
        toast("💡 Click! Lamp turned on", {
          icon: "✨",
          style: {
            background: "#111520",
            color: currentTheme.hex,
            border: `1px solid ${currentTheme.hex}`,
          },
        });
      }
      return next;
    });
  };

  // Sign In Handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please enter email and password!");
      return;
    }

    try {
      setLoading(true);
      const res = await login({ email, password });
      if (res && res.data) {
        loginUser(res.data);
        toast.success(`Welcome back, ${res.data.name}!`);
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Login failed! Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Sign Up Handler
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("Please fill in all required fields!");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await register({
        name,
        email,
        password,
        phone,
        roles: ["USER"],
      });
      toast.success(res?.message || "Account created! Please sign in.");
      setMode("signin");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Login Helper
  const fillDemoAccount = () => {
    setEmail("admin@petcare.com");
    setPassword("admin123");
    toast("Filled demo credentials!", { icon: "🔑" });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between relative overflow-hidden select-none">
      
      {/* Dynamic Ambient Background Glow from Lamp */}
      {isLampOn && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-in-out opacity-85"
          style={{ background: currentTheme.bgGlow }}
        />
      )}

      {/* Subtle Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="relative z-30 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        
        {/* Brand Logo & Back to Home */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 p-1 flex items-center justify-center group-hover:border-white/30 transition-colors">
            <img
              src="/pet-care-web-logo.png"
              alt="PetVitals"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-lg font-black tracking-tight text-white group-hover:text-sky-400 transition-colors">
              Pet<span style={{ color: currentTheme.hex }}>Vitals</span>
            </span>
            <p className="text-[10px] text-slate-400 font-medium">Pet Care & Vet System</p>
          </div>
        </Link>

        {/* Back Link & Active Color Dots */}
        <div className="flex items-center gap-4">
          {/* Color Switcher Pills */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            {LAMP_THEMES.map((theme, i) => (
              <button
                key={theme.id}
                onClick={() => {
                  setColorIndex(i);
                  setAutoCycle(false);
                }}
                title={theme.name}
                className={`w-4 h-4 rounded-full transition-transform ${
                  colorIndex === i ? "scale-125 ring-2 ring-white" : "opacity-60 hover:opacity-100"
                }`}
                style={{ backgroundColor: theme.hex }}
              />
            ))}
            <button
              onClick={() => setAutoCycle(!autoCycle)}
              className="text-[10px] text-slate-400 px-2 hover:text-white"
            >
              {autoCycle ? "Auto" : "Locked"}
            </button>
          </div>

          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
        </div>

      </header>

      {/* Main Center Stage: Lamp (Left) + Interactive Auth Card (Right) */}
      <main className="relative z-20 flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
        
        {/* ==================== LEFT: THE INTERACTIVE DESK LAMP ==================== */}
        <div className="relative flex flex-col items-center justify-center w-full max-w-[340px] lg:max-w-[420px] shrink-0">
          
          {/* SVG Art: Articulated Modern Desk Lamp with Pull Cord */}
          <div className="relative w-72 sm:w-80 h-[380px] sm:h-[420px] flex items-center justify-center">
            
            <svg
              viewBox="0 0 320 420"
              className="w-full h-full drop-shadow-2xl overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Metallic Dark Gradients */}
                <linearGradient id="lampMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2c3345" />
                  <stop offset="50%" stopColor="#141824" />
                  <stop offset="100%" stopColor="#0a0d14" />
                </linearGradient>

                {/* Brass Knobs & Accents */}
                <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#78350f" />
                </linearGradient>

                {/* Spotlight Beam Gradient when ON */}
                <radialGradient id="lampBeam" cx="15%" cy="30%" r="90%">
                  <stop offset="0%" stopColor={currentTheme.hex} stopOpacity="0.75" />
                  <stop offset="40%" stopColor={currentTheme.hex} stopOpacity="0.25" />
                  <stop offset="75%" stopColor={currentTheme.hex} stopOpacity="0.08" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* LAMP SPOTLIGHT CONE (Radiates downwards & to the right onto card) */}
              {isLampOn && (
                <path
                  d="M 175 145 L 360 40 L 400 380 L 195 195 Z"
                  fill="url(#lampBeam)"
                  className="transition-all duration-700 ease-out opacity-90 filter blur-md"
                />
              )}

              {/* Heavy Lamp Circular Base */}
              <ellipse cx="100" cy="370" rx="65" ry="16" fill="url(#lampMetal)" stroke="#374151" strokeWidth="2" />
              <ellipse cx="100" cy="365" rx="58" ry="13" fill="#131722" stroke="url(#brassGrad)" strokeWidth="1" />
              <circle cx="100" cy="365" r="12" fill="url(#brassGrad)" />

              {/* Lower Articulated Arm */}
              <line
                x1="100"
                y1="365"
                x2="70"
                y2="230"
                stroke="url(#lampMetal)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <line
                x1="94"
                y1="365"
                x2="64"
                y2="230"
                stroke="#374151"
                strokeWidth="2"
              />

              {/* Elbow Joint (Brass Knob) */}
              <circle cx="70" cy="230" r="14" fill="url(#brassGrad)" stroke="#1f2937" strokeWidth="2" />
              <circle cx="70" cy="230" r="6" fill="#111827" />

              {/* Upper Articulated Arm */}
              <line
                x1="70"
                y1="230"
                x2="160"
                y2="130"
                stroke="url(#lampMetal)"
                strokeWidth="11"
                strokeLinecap="round"
              />

              {/* Head Pivot Joint */}
              <circle cx="160" cy="130" r="12" fill="url(#brassGrad)" stroke="#1f2937" strokeWidth="2" />

              {/* Lampshade Cone Body (Angled toward the card on the right) */}
              <g transform="rotate(22 160 130)">
                {/* Outer Dark Dome */}
                <path
                  d="M 130 90 C 130 50, 190 50, 190 90 L 220 150 C 220 160, 100 160, 100 150 Z"
                  fill="url(#lampMetal)"
                  stroke="#374151"
                  strokeWidth="2"
                />

                {/* Inner Shade Rim / Brass Bevel */}
                <ellipse
                  cx="160"
                  cy="150"
                  rx="60"
                  ry="14"
                  fill={isLampOn ? currentTheme.hex : "#1e2433"}
                  stroke="url(#brassGrad)"
                  strokeWidth="3"
                  className="transition-colors duration-500"
                  style={{
                    filter: isLampOn ? `drop-shadow(0 0 16px ${currentTheme.hex})` : "none",
                  }}
                />

                {/* Glowing Light Bulb inside Shade */}
                <circle
                  cx="160"
                  cy="135"
                  r={isLampOn ? "18" : "15"}
                  fill={isLampOn ? "#ffffff" : "#374151"}
                  className="transition-all duration-300"
                  style={{
                    filter: isLampOn ? `drop-shadow(0 0 25px ${currentTheme.hex})` : "none",
                  }}
                />
              </g>

              {/* PULL CORD WIRE & BOBBLE (The Interactive Switch!) */}
              <g
                className="cursor-pointer transition-transform duration-300 group/cord"
                onClick={handlePullCord}
                style={{
                  transform: isCordPulled ? "translateY(24px)" : "translateY(0)",
                }}
              >
                {/* Thin Golden Cord */}
                <line
                  x1="185"
                  y1="165"
                  x2="195"
                  y2="280"
                  stroke="#facc15"
                  strokeWidth="2"
                  strokeDasharray="2 2"
                  className="group-hover/cord:stroke-white transition-colors"
                />

                {/* Pull Bobble / Brass Weight */}
                <ellipse
                  cx="195"
                  cy="285"
                  rx="7"
                  ry="12"
                  fill="url(#brassGrad)"
                  stroke="#451a03"
                  strokeWidth="1.5"
                  className="group-hover/cord:scale-110 transition-transform"
                />
                <circle
                  cx="195"
                  cy="292"
                  r="3"
                  fill={isLampOn ? currentTheme.hex : "#78350f"}
                />
              </g>
            </svg>

            {/* Click / Pull To Turn On Tooltip */}
            <div
              onClick={handlePullCord}
              className={`absolute top-[280px] left-[185px] z-30 cursor-pointer flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide transition-all duration-300 shadow-xl border ${
                isLampOn
                  ? "bg-themeDark-900/90 text-slate-300 border-white/10 hover:border-white/30"
                  : "bg-amber-400 text-slate-950 border-amber-300 animate-bounce shadow-amber-400/40"
              }`}
            >
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: isLampOn ? currentTheme.hex : "#000" }}
              />
              <span>{isLampOn ? "Pull to Turn Off" : "Pull to Turn On"}</span>
            </div>

          </div>

          {/* Lamp Status & Pet Care Badge */}
          <div className="mt-2 text-center">
            <p className="text-xs font-semibold text-slate-400 flex items-center justify-center gap-1.5">
              <span>Theme:</span>
              <span className="font-bold" style={{ color: currentTheme.hex }}>
                {currentTheme.name}
              </span>
              <span className="text-[10px] text-slate-500">(Auto-syncs with Pet Care Logo)</span>
            </p>
          </div>

        </div>

        {/* ==================== RIGHT: AUTHENTICATION CARD (ILLUMINATED) ==================== */}
        <div className="w-full max-w-md relative">
          
          {/* Spotlight Glow behind card */}
          {isLampOn && (
            <div
              className="absolute -inset-1 rounded-3xl blur-2xl opacity-60 pointer-events-none transition-all duration-700"
              style={{ backgroundColor: currentTheme.glow }}
            />
          )}

          {/* The Glass Auth Card */}
          <div
            className={`relative rounded-3xl p-7 sm:p-9 border transition-all duration-500 backdrop-blur-2xl ${
              isLampOn
                ? "bg-[#0d111a]/95 border-white/15 shadow-2xl"
                : "bg-[#090c14]/90 border-white/5 opacity-70 filter brightness-75"
            }`}
          >
            
            {/* Header: "YOUR SPACE" & Close Dot */}
            <div className="flex items-center justify-between mb-5">
              <span
                className="text-[11px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border transition-colors duration-500"
                style={{
                  color: currentTheme.hex,
                  borderColor: `${currentTheme.hex}40`,
                  backgroundColor: `${currentTheme.hex}15`,
                }}
              >
                YOUR SPACE • PET PORTAL
              </span>
              
              <Link
                to="/"
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-slate-400 hover:text-white text-xs transition-colors"
                title="Back to Home"
              >
                ✕
              </Link>
            </div>

            {/* Title & Subtitle */}
            <div className="mb-6">
              <h1 className="text-3xl font-extrabold text-white tracking-tight">
                {mode === "signin" ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                {mode === "signin"
                  ? "Sign in to manage your pets & appointments"
                  : "Register your pet profile and book vet visits instantly"}
              </p>
            </div>

            {/* Mode Switcher Tabs (Sign In / Sign Up) */}
            <div className="flex items-center p-1 rounded-2xl bg-white/5 border border-white/10 mb-6">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === "signin"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                style={mode === "signin" ? { color: currentTheme.hex } : {}}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === "signup"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
                style={mode === "signup" ? { color: currentTheme.hex } : {}}
              >
                Sign Up
              </button>
            </div>

            {/* ================= FORM: SIGN IN ================= */}
            {mode === "signin" && (
              <form onSubmit={handleSignIn} className="space-y-4">
                {/* Email / Username */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Username or Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-themeDark-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${currentTheme.ring}`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">Password</label>
                    <button
                      type="button"
                      onClick={() => toast("Contact clinic admin to reset credentials.", { icon: "ℹ️" })}
                      className="text-[11px] text-slate-400 hover:underline"
                      style={{ color: currentTheme.hex }}
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full pl-10 pr-10 py-2.5 rounded-xl bg-themeDark-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${currentTheme.ring}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded bg-themeDark-950 border-white/20 text-sky-500 focus:ring-0"
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={fillDemoAccount}
                    className="text-[11px] underline text-slate-400 hover:text-white"
                  >
                    Use Demo
                  </button>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer mt-2 disabled:opacity-60 ${currentTheme.buttonClass}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* ================= FORM: SIGN UP ================= */}
            {mode === "signup" && (
              <form onSubmit={handleSignUp} className="space-y-3.5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <UserIcon className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ruwan Perera"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-xl bg-themeDark-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${currentTheme.ring}`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-xl bg-themeDark-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${currentTheme.ring}`}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile Phone (For Visit Reminders)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      placeholder="077 123 4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2 rounded-xl bg-themeDark-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${currentTheme.ring}`}
                    />
                  </div>
                </div>

                {/* Passwords (2 cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Min 6 chars"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-xl bg-themeDark-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${currentTheme.ring}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Confirm *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Re-enter"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`w-full px-3.5 py-2 rounded-xl bg-themeDark-950/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${currentTheme.ring}`}
                    />
                  </div>
                </div>

                {/* Create Account Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer mt-3 disabled:opacity-60 ${currentTheme.buttonClass}`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Registering...</span>
                    </>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Social Divider */}
            <div className="my-5 flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                Or Continue With
              </span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Social / Quick Pills */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => toast("Google SSO ready for staging", { icon: "🌐" })}
                className="py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => toast("GitHub SSO ready for staging", { icon: "🐙" })}
                className="py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <span>GitHub</span>
              </button>
              <button
                type="button"
                onClick={() => toast("Apple SSO ready for staging", { icon: "🍎" })}
                className="py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-xs font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <span>Apple</span>
              </button>
            </div>

          </div>

        </div>

      </main>

      {/* Bottom Footer Note */}
      <footer className="relative z-20 py-4 text-center text-xs text-slate-400 border-t border-white/5">
        <p>PetVitals Pet Care & Vet Clinic System • RAD Final Coursework</p>
      </footer>

    </div>
  );
};

export default InteractiveLampAuth;
