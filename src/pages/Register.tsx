import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../service/auth';
import VideoBackground from '../components/common/VideoBackground';
import petLogo from '../assets/pet-care-web-logo.png';
import toast from 'react-hot-toast';
import {
  User as UserIcon,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Home,
  CheckCircle2,
  XCircle,
} from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [role, setRole] = useState<'USER' | 'ADMIN'>('USER');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  // Password strength calculation
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !confirmedPassword.trim()) {
      toast.error('Please fill in all mandatory fields!');
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long!');
      return;
    }

    if (password !== confirmedPassword) {
      toast.error('Passwords do not match! Please re-verify.');
      return;
    }

    if (!agreeTerms) {
      toast.error('Please accept the clinic terms and privacy policy.');
      return;
    }

    try {
      setLoading(true);
      const res = await register(
        name.trim(),
        email.trim(),
        password,
        phone.trim() || undefined,
        [role]
      );

      toast.success(res?.message || 'Registration successful! Please login.');

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err: any) {
      console.error('Registration error:', err);
      const errorMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        'Registration failed. Please try again.';
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 select-none">
      {/* Background Video Looping */}
      <VideoBackground overlayOpacity="bg-slate-950/80" showControls={false} />

      {/* Floating Back to Home button */}
      <Link
        to="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs sm:text-sm font-semibold border border-white/15 transition-all shadow-lg hover:scale-105"
      >
        <Home className="w-4 h-4 text-emerald-400" /> Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-4xl bg-slate-900/85 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12 my-8">
        {/* Left Side: Brand Visual & Perks */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-950/90 via-slate-900/90 to-teal-950/90 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 relative overflow-hidden">
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={petLogo} alt="Pet Care Clinic" className="h-12 w-auto object-contain" />
              <div>
                <span className="font-extrabold text-xl text-white tracking-tight flex items-center gap-1">
                  PetCare <span className="text-emerald-400">&amp; Vet</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-emerald-300 block">
                  Registration
                </span>
              </div>
            </Link>

            <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
              Join Our Caring Pet Health Community
            </h2>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Create your account in seconds to manage multiple pets, book instant slots with top surgeons, and receive vaccination reminders.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Secure &amp; Confidential Medical Data</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>One-tap Emergency Booking &amp; Hotline</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>SMS and Email Booking Confirmations</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 text-xs text-slate-400 relative z-10">
            <p className="text-emerald-300 font-semibold mb-1">🐾 Already registered?</p>
            <p>Log in with your existing email and password to access your appointments.</p>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create New Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Join PetCare &amp; Vet Clinic today
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Kasun Fernando"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none transition"
                />
              </div>
            </div>

            {/* Email and Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Email Address <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    placeholder="kasun@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    placeholder="077 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 text-sm bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Account Role Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Account Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('USER')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition border ${
                    role === 'USER'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-sm'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  🐾 Pet Parent / Owner
                </button>
                <button
                  type="button"
                  onClick={() => setRole('ADMIN')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition border ${
                    role === 'ADMIN'
                      ? 'bg-teal-500/20 text-teal-300 border-teal-400/50 shadow-sm'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                  }`}
                >
                  🩺 Clinic Staff / Admin
                </button>
              </div>
            </div>

            {/* Password and Confirm Password Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Min. 6 chars"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-9 py-2 text-sm bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Confirm Password <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showConfirmedPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter password"
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    className="w-full pl-10 pr-9 py-2 text-sm bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-400 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-200"
                  >
                    {showConfirmedPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password match feedback & strength bar */}
            {password && (
              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Password strength:</span>
                  <span
                    className={
                      passwordStrength <= 1
                        ? 'text-rose-400'
                        : passwordStrength <= 3
                        ? 'text-amber-400'
                        : 'text-emerald-400 font-bold'
                    }
                  >
                    {passwordStrength <= 1 ? 'Weak' : passwordStrength <= 3 ? 'Medium' : 'Strong'}
                  </span>
                </div>
                <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength <= 1
                        ? 'w-1/4 bg-rose-500'
                        : passwordStrength <= 3
                        ? 'w-3/4 bg-amber-500'
                        : 'w-full bg-emerald-500'
                    }`}
                  />
                </div>

                {confirmedPassword && (
                  <div className="text-[11px] flex items-center gap-1.5 mt-1">
                    {password === confirmedPassword ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Passwords match
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Passwords do not match
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-1 rounded border-slate-700 text-emerald-500 focus:ring-emerald-400 bg-slate-800"
              />
              <label htmlFor="terms" className="text-xs text-slate-300 leading-snug cursor-pointer">
                I agree to the PetCare &amp; Vet Clinic{' '}
                <span className="text-emerald-400 hover:underline">Terms of Service</span> and{' '}
                <span className="text-emerald-400 hover:underline">Privacy Policy</span>.
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
                  <span>Registering account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Switch to Login */}
          <div className="mt-5 pt-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-bold text-emerald-400 hover:text-emerald-300 transition underline underline-offset-4"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

