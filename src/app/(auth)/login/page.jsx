"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const SigninPage = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    try {
      setLoading(true);

      const result = await authClient.signIn.email({
        email,
        password,
        rememberMe:true,
        callbackURL: "/",
      });

      if (result?.error) {
        toast.error(result.error.message || "Login failed");
        return;
      }

      toast.success("Login successful");

      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google login failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-30 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-[#020617] dark:via-[#0f172a] dark:to-[#111827] transition-colors duration-300">

      <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-8 shadow-xl dark:shadow-black/40">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Sign in to continue to ArtHub
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              required
              placeholder="Enter Your Email"
              className="w-full mt-2 h-12 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#16352E] focus:border-[#16352E] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-200">
              Password
            </label>

            <div className="relative mt-2">
              <input
                name="password"
                required
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                className="w-full h-12 px-4 pr-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-[#16352E] focus:border-[#16352E] transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-[#16352E] dark:hover:text-white hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#16352E] text-white font-semibold hover:bg-[#0f241f] transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="border-t border-slate-300 dark:border-slate-700"></div>

          <span className="absolute left-1/2 -translate-x-1/2 -top-3 px-3 bg-white dark:bg-slate-900 text-sm text-slate-500 dark:text-slate-400">
            OR
          </span>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full h-12 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-medium hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-[#16352E] dark:text-emerald-400 hover:underline"
          >
            Create Account
          </Link>
        </p>

      </div>
    </section>
  );
};

export default SigninPage;