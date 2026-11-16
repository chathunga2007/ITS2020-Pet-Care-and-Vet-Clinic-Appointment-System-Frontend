import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { forgotPassword, resetPassword } from "../service/auth";
import clinicLogo from "../assets/pet-care-web-logo.png";
import {
  Mail,
  Lock,
  KeyRound,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  Sun,
  Moon,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "../utils/sweetalert";

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [step, setStep] = useState<1 | 2>(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your registered email address.");
      return;
    }

    try {
      setLoading(true);
      const res = await forgotPassword(email.trim());
      toast.success(res.message || "6-digit OTP sent to your email!");
      setStep(2);
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
        "Failed to send reset code. Please check your email and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResending(true);
      const res = await forgotPassword(email.trim());
      toast.success(res.message || "A new 6-digit OTP has been sent!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to resend code.");
    } finally {
      setResending(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp.trim()) {
      toast.error("Please enter the 6-digit OTP code sent to your email.");
      return;
    }
    if (!newPassword) {
      toast.error("Please enter a new password.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password should be at least 6 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match. Please verify.");
      return;
    }

    try {
      setLoading(true);
      const res = await resetPassword({
        email: email.trim(),
        otp: otp.trim(),
        newPassword,
      });

      await Swal.fire({
        icon: "success",
        title: "Password Reset Successful!",
        text: res.message || "You can now log in with your new password.",
        confirmButtonText: "Proceed to Login",
      });

      navigate("/login");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
        "Failed to reset password. Please verify the OTP and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f9f9] dark:bg-[#041517] flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-teal-300/30 dark:bg-teal-700/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-emerald-300/30 dark:bg-emerald-700/15 blur-3xl pointer-events-none" />

      <header className="relative z-10 max-w-5xl mx-auto w-full p-4 sm:p-6 flex items-center justify-between">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-800 dark:text-teal-300 hover:text-teal-600 dark:hover:text-teal-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>

        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-full bg-white/80 dark:bg-white/5 border border-teal-100 dark:border-white/10 text-teal-800 dark:text-slate-200 shadow-sm cursor-pointer"
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-teal-700" />
          )}
        </button>
      </header>

      <main className="relative z-10 max-w-md mx-auto w-full px-4 py-8">
        <div className="rounded-3xl bg-white dark:bg-[#072124] border border-teal-100 dark:border-teal-700/40 p-6 sm:p-8 shadow-2xl shadow-teal-950/10 dark:shadow-black/50">

          <div className="text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-teal-50 dark:bg-white/5 border border-teal-200/80 dark:border-white/10 mx-auto flex items-center justify-center p-2 mb-3 shadow-sm">
              <img
                src={clinicLogo}
                alt="PetCare & Vet Clinic"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-white/5 border border-teal-200/60 dark:border-white/10 text-teal-700 dark:text-teal-300 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure Account Recovery</span>
            </div>
            <h1 className="text-2xl font-black text-[#0f3438] dark:text-white">
              {step === 1 ? "Forgot Password?" : "Reset Password"}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {step === 1
                ? "Enter your registered email address and we'll send you a 6-digit OTP code."
                : `Enter the 6-digit OTP code sent to ${email} along with your new password.`}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="e.g. john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-teal-700/25 hover:shadow-teal-700/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Code...</span>
                  </>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" />
                    <span>Send Verification Code</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <Link
                  to="/login"
                  className="text-xs font-bold text-teal-700 dark:text-teal-400 hover:underline"
                >
                  Remembered your password? Back to Login
                </Link>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    6-Digit Verification Code (OTP)
                  </label>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resending}
                    className="text-[11px] font-bold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${resending ? "animate-spin" : ""}`} />
                    <span>Resend Code</span>
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="w-full pl-11 pr-4 py-3 text-sm tracking-widest font-mono text-center rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 text-sm rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Re-type new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 text-sm rounded-2xl bg-[#f0f6f8] dark:bg-slate-800/80 text-[#0f3438] dark:text-white placeholder-slate-400 border border-teal-100 dark:border-slate-700 focus:ring-2 focus:ring-teal-500 focus:bg-white dark:focus:bg-slate-800 outline-none transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white font-bold text-sm shadow-xl shadow-teal-700/25 hover:shadow-teal-700/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Reset Password &amp; Login</span>
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-teal-600 transition-colors cursor-pointer"
                >
                  Entered wrong email? Change email
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <footer className="relative z-10 py-4 text-center text-xs text-slate-400">
        &copy; {new Date().getFullYear()} PetCare &amp; Vet Clinic. All rights reserved.
      </footer>
    </div>
  );
};

export default ForgotPassword;