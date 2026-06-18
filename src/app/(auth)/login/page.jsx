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
    <section className="min-h-screen bg-[#f6f8f7] dark:bg-slate-950 flex items-center justify-center px-4 py-30 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-[#16352E]/10 dark:border-white/10 p-8 shadow-sm">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#16352E] dark:text-white">
            Welcome Back
          </h1>

          <p className="text-[#16352E]/60 dark:text-gray-400 mt-2">
            Sign in to continue to ArtHub
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-[#16352E] dark:text-white">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              required
              placeholder="john@example.com"
              className="w-full mt-2 h-12 px-4 rounded-xl border border-[#16352E]/20 dark:border-white/10 bg-white dark:bg-slate-800 text-[#16352E] dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#16352E]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-[#16352E] dark:text-white">
              Password
            </label>

            <div className="relative mt-2">
              <input
                name="password"
                required
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="w-full h-12 px-4 pr-12 rounded-xl border border-[#16352E]/20 dark:border-white/10 bg-white dark:bg-slate-800 text-[#16352E] dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#16352E]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#16352E]/60 dark:text-gray-400"
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
              className="text-sm text-[#16352E] dark:text-gray-300 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#16352E] text-white font-semibold hover:bg-[#0f241f] transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="border-t border-[#16352E]/10 dark:border-white/10"></div>

          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white dark:bg-slate-900 px-3 text-sm text-[#16352E]/60 dark:text-gray-400">
            OR
          </span>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full h-12 border border-[#16352E]/20 dark:border-white/10 rounded-xl font-medium text-[#16352E] dark:text-white hover:bg-[#16352E]/5 dark:hover:bg-white/5 transition cursor-pointer"
        >
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-[#16352E]/60 dark:text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#16352E] dark:text-white font-medium"
          >
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SigninPage;