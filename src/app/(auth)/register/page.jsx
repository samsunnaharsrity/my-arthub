"use client";

import { authClient } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { Label, Radio, RadioGroup } from "@heroui/react";

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const roleFormURL = searchParams.get("role") || "seeker";

  const [role, setRole] = useState(roleFormURL);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [loading, setLoading] = useState(false);

  // PASSWORD STRENGTH CHECKER
  const checkStrength = (value) => {
    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 1) return "weak";
    if (score === 2 || score === 3) return "medium";
    return "strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const passwordValue = form.get("password")?.toString().trim();

    if (!name || !email || !passwordValue) {
      toast.error("All fields are required");
      return;
    }

    if (passwordValue.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);

      const result = await authClient.signUp.email({
        name,
        email,
        password: passwordValue,
        role,
        callbackURL: "/",
      });

      if (result?.error) {
        toast.error(result.error.message || "Signup failed");
        return;
      }

      toast.success("Account created successfully");
      router.push("/");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <section className="min-h-screen bg-[#f6f8f7] flex items-center justify-center px-4 py-30">
      <div className="w-full max-w-md bg-white border border-[#16352E]/10 rounded-3xl p-8 shadow-sm">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#16352E]">
            Create Account
          </h1>

          <p className="text-[#16352E]/60 mt-2">
            Register as{" "}
            <span className="font-semibold capitalize text-[#16352E]">
              {role}
            </span>
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <div>
            <label className="text-sm font-medium text-[#16352E]">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Enter Your Name"
              className="w-full mt-2 h-12 px-4 rounded-xl border border-[#16352E]/20 outline-none focus:ring-2 focus:ring-[#16352E]"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium text-[#16352E]">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter Your Email"
              className="w-full mt-2 h-12 px-4 rounded-xl border border-[#16352E]/20 outline-none focus:ring-2 focus:ring-[#16352E]"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium text-[#16352E]">
              Password
            </label>

            <div className="relative mt-2">
              <input
                name="password"
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  const val = e.target.value;
                  setPassword(val);
                  setStrength(checkStrength(val));
                }}
                placeholder="At least 8 characters"
                className="w-full h-12 px-4 pr-12 rounded-xl border border-[#16352E]/20 outline-none focus:ring-2 focus:ring-[#16352E]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#16352E]/60"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* STRENGTH BAR */}
            {password && (
              <div className="mt-2">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      strength === "weak"
                        ? "w-1/3 bg-red-500"
                        : strength === "medium"
                        ? "w-2/3 bg-yellow-500"
                        : "w-full bg-green-600"
                    }`}
                  />
                </div>

                <p
                  className={`text-xs mt-1 ${
                    strength === "weak"
                      ? "text-red-500"
                      : strength === "medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {strength === "weak" && "Weak password"}
                  {strength === "medium" && "Medium password"}
                  {strength === "strong" && "Strong password"}
                </p>
              </div>
            )}
          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-3">
            <Label className="text-[#16352E] font-medium">
              Account Type
            </Label>

            <RadioGroup
              defaultValue={roleFormURL}
              value={role}
              onValueChange={setRole}
              orientation="horizontal"
            >
              <div className="flex gap-6">
                <Radio value="seeker">
                  <Label className="text-[#16352E]">Job Seeker</Label>
                </Radio>

                <Radio value="recruiter">
                  <Label className="text-[#16352E]">Recruiter</Label>
                </Radio>
              </div>
            </RadioGroup>
          </div>

          {/* SUBMIT */}
          <button
            disabled={loading}
            className="w-full h-12 rounded-xl bg-[#16352E] text-white font-semibold hover:bg-[#0f241f] transition disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="relative my-6">
          <div className="border-t border-[#16352E]/10"></div>
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-3 text-sm text-[#16352E]/60">
            OR
          </span>
        </div>

        {/* GOOGLE */}
        <button
          onClick={handleGoogle}
          className="w-full h-12 border border-[#16352E]/20 rounded-xl font-medium text-[#16352E] hover:bg-[#16352E]/5 transition cursor-pointer"
        >
          Continue with Google
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-sm text-[#16352E]/60 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[#16352E] font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;