import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../service/auth';
import { useAuth } from '../hooks/useAuth';
import VideoBackground from '../components/common/VideoBackground';
import petLogo from '../assets/pet-care-web-logo.png';
import toast from 'react-hot-toast';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Home,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please enter both email and password!');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email.trim(), password);
      const resData = res?.data;

      const accessToken = resData?.access_token || resData?.accessToken;
      const refreshToken = resData?.refresh_token || resData?.refreshToken;

      if (!accessToken) {
        throw new Error('Access token missing from server response');
      }

      // Store tokens according to rad-article-web standard
      localStorage.setItem('ACCESS_TOKEN', accessToken);
      if (refreshToken) {
        localStorage.setItem('REFRESH_TOKEN', refreshToken);
      }

      // Update auth context state
      if (resData) {
        setUser({
          id: resData.id || resData._id,
          name: resData.name,
          email: resData.email,
          roles: resData.roles || ['USER'],
          phone: resData.phone,
        });
      }

      toast.success(res?.message || 'Login successful! Welcome back.');

      // Smooth navigate to home
      setTimeout(() => {
        window.location.href = '/';
      }, 700);
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Invalid email or password. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Demo user helper for instant coursework testing
  const handleQuickDemo = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      setEmail('admin@petcare.lk');
      setPassword('Admin@1234');
    } else {
      setEmail('john@example.com');
      setPassword('Password123');
    }
    toast('Demo credentials populated!', { icon: '✨' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
      {/* Background Video Looping */}
      <VideoBackground overlayOpacity="bg-slate-950/75" showControls={false} />

      {/* Floating Back to Home button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all shadow-lg hover:scale-105"
      >
        <Home className="w-4 h-4 text-emerald-400" /> Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-4xl bg-slate-900/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-8">
        {/* Left Side: Brand Visual & Features */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950/90 via-slate-900/90 to-teal-950/90 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={petLogo} alt="Pet Care Clinic" className="h-12 w-auto object-contain" />
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight flex items-center gap-1">
                  PetCare <span className="text-emerald-400">&amp; Vet</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-300 block">
                  Hospital Portal
                </span>
              </div>
            </Link>

            <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
              Welcome to Your Pet’s Dedicated Health Hub
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Log in to manage appointments, access clinical records, track vaccination timelines, and communicate with certified veterinarians.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant vet appointment scheduling</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>24/7 direct doctor communication</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Digital pet medical history passport</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Credentials pill */}
          <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Quick Test Credentials
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('user')}
                className="flex-1 py-1.5 px-2 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-medium transition border border-white/10"
              >
                Demo User
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemo('admin')}
                className="flex-1 py-1.5 px-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 rounded-lg text-xs font-medium transition border border-emerald-500/30"
              >
                Demo Admin
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Sign In to Your Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Enter your registered email address and password below
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email input */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast('Please contact clinic support or register a new account.', { icon: 'ℹ️' });
                  }}
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition"
                >
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-200 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me toggle */}
            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 text-emerald-500 focus:ring-emerald-400 bg-slate-800"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Register */}
          <div className="mt-6 pt-6 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Don’t have an account yet?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="font-bold text-emerald-400 hover:text-emerald-300 transition underline underline-offset-4"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
