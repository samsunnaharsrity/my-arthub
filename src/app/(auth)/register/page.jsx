"use client";

import { authClient, signUp } from "@/lib/auth-client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Eye, EyeOff, Palette, ShoppingBag } from "lucide-react";

const RegisterPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const roleFormURL = searchParams.get("role") || "user";

  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => { setRole(roleFormURL); }, [roleFormURL]);

  const checkStrength = (value) => {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    if (score <= 1) return "weak";
    if (score <= 3) return "medium";
    return "strong";
  };

  const plan = role === 'user' ? 'user_free' : 'artist';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const passwordValue = form.get("password")?.toString().trim();

    if (!name || !email || !passwordValue) { toast.error("All fields are required"); return; }
    if (passwordValue.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    if (passwordValue !== confirmPassword) { toast.error("Passwords do not match"); return; }

    try {
      setLoading(true);
      const result = await signUp.email({ name, email, password: passwordValue, role, plan, callbackURL: "/" });
      if (result?.error) { toast.error(result.error.message || "Signup failed"); return; }
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
      await authClient.signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google sign-in failed");
    }
  };

  const strengthConfig = {
    weak:   { width: "33%",  color: "#ef4444", label: "Weak password" },
    medium: { width: "66%",  color: "#f59e0b", label: "Medium strength" },
    strong: { width: "100%", color: "#16352E", label: "Strong password" },
  };

  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <>
      <style>{`
        .reg-bg {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2.5rem 1rem;
          position: relative;
          overflow: hidden;
        }
        .reg-bg::before {
          content: '';
          position: fixed;
          top: -180px; left: -140px;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%);
          pointer-events: none;
        }
        .reg-bg::after {
          content: '';
          position: fixed;
          bottom: -180px; right: -120px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .reg-card {
          width: 100%;
          max-width: 460px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 24px;
          padding: 2.25rem 2rem;
          position: relative;
          z-index: 1;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04);
        }
        .reg-card::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 55%; height: 2px;
          background: linear-gradient(90deg, transparent, #059669, #10b981, transparent);
          border-radius: 0 0 2px 2px;
        }

        /* Header */
        .card-header { text-align: center; margin-bottom: 1.75rem; }
        .logo-mark {
          width: 48px; height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #059669, #10b981);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 800; font-size: 18px;
          margin: 0 auto 1.1rem;
          box-shadow: 0 4px 16px rgba(16,185,129,0.3);
        }
        .card-header h1 {
          font-size: 1.5rem; font-weight: 700;
          color: #111827; letter-spacing: -0.02em;
          margin-bottom: 0.35rem;
        }
        .card-header p { font-size: 0.83rem; color: #6b7280; }
        .card-header p strong { color: #059669; font-weight: 600; }

        /* Fields */
        .field { margin-bottom: 1rem; }
        .field label {
          display: block;
          font-size: 0.74rem; font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 0.45rem;
        }
        .field input {
          width: 100%; height: 46px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 0 1rem;
          color: #111827; font-size: 0.88rem;
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .field input::placeholder { color: #d1d5db; }
        .field input:focus {
          border-color: #10b981;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
        }
        .field input.input-error {
          border-color: #fca5a5;
          background: #fff5f5;
          box-shadow: 0 0 0 3px rgba(239,68,68,0.08);
        }
        .field input.input-success {
          border-color: #6ee7b7;
          background: #f0fdf4;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
        }

        .pass-wrap { position: relative; }
        .pass-wrap input { padding-right: 3rem; }
        .eye-btn {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          color: #9ca3af;
          cursor: pointer; padding: 0;
          display: flex; align-items: center;
          transition: color 0.2s;
        }
        .eye-btn:hover { color: #059669; }

        /* Strength */
        .strength-bar-bg {
          height: 3px; width: 100%;
          background: #e5e7eb;
          border-radius: 99px; overflow: hidden;
          margin-top: 8px;
        }
        .strength-bar-fill {
          height: 100%; border-radius: 99px;
          transition: width 0.35s ease, background 0.35s ease;
        }
        .strength-label { font-size: 0.71rem; margin-top: 4px; font-weight: 500; }

        /* Match hint */
        .match-hint {
          font-size: 0.71rem; margin-top: 5px; font-weight: 500;
          display: flex; align-items: center; gap: 5px;
        }

        /* Role selector */
        .role-label {
          font-size: 0.74rem; font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 0.6rem;
          display: block;
        }
        .role-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .role-card {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px; padding: 14px 10px;
          border-radius: 14px;
          border: 1.5px solid #e5e7eb;
          background: #f9fafb;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }
        .role-card:hover {
          border-color: #16352E;
          background: #f0fdf4;
        }
        .role-card.selected {
          border-color: #16352E;
          background: #f0fdf4;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12);
        }
        .role-icon {
          width: 36px; height: 36px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .role-card.selected .role-icon { background: linear-gradient(135deg, rgba(5,150,105,0.15), rgba(16,185,129,0.12)); }
        .role-card:not(.selected) .role-icon { background: #e5e7eb; }
        .role-title { font-size: 0.82rem; font-weight: 600; color: #374151; transition: color 0.2s; }
        .role-card.selected .role-title { color: #16352E; }
        .role-desc { font-size: 0.69rem; color: #9ca3af; text-align: center; line-height: 1.4; }
        .role-card.selected .role-desc { color: #6b7280; }
        .role-dot {
          width: 6px; height: 6px; border-radius: 50%;
          border: 1.5px solid #d1d5db;
          margin-top: 2px; transition: all 0.2s;
        }
        .role-card.selected .role-dot {
          border-color: #16352E; background: #16352E;
          box-shadow: 0 0 6px rgba(16,185,129,0.5);
        }

        /* Submit */
        .btn-submit {
          width: 100%; height: 46px;
          border-radius: 12px; border: none;
          background: linear-gradient(135deg, #059669, #16352E);
          color: #fff; font-size: 0.88rem; font-weight: 600;
          letter-spacing: 0.03em; cursor: pointer;
          position: relative; overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          margin-top: 0.5rem;
          box-shadow: 0 2px 12px rgba(16,185,129,0.3);
        }
        .btn-submit::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, #047857, #059669);
          opacity: 0; transition: opacity 0.25s;
        }
        .btn-submit:hover:not(:disabled)::before { opacity: 1; }
        .btn-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 18px rgba(16,185,129,0.4); }
        .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .btn-submit span { position: relative; z-index: 1; }

        /* Divider */
        .divider { display: flex; align-items: center; gap: 12px; margin: 1.25rem 0; }
        .divider-line { flex: 1; height: 1px; background: #e5e7eb; }
        .divider span { font-size: 0.71rem; color: #9ca3af; letter-spacing: 0.08em; text-transform: uppercase; background: #ffffff; padding: 0 4px; }

        /* Google */
        .btn-google {
          width: 100%; height: 46px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          color: #374151;
          font-size: 0.88rem; font-weight: 500;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          transition: all 0.2s;
        }
        .btn-google:hover { background: #f9fafb; border-color: #d1d5db; color: #111827; }

        /* Footer */
        .card-footer { text-align: center; margin-top: 1.25rem; font-size: 0.8rem; color: #9ca3af; }
        .card-footer a { color: #16352E; font-weight: 600; text-decoration: none; transition: color 0.2s; }
        .card-footer a:hover { color: #047857; }
      `}</style>

      <section className="reg-bg ">
        <div className="reg-card mt-20">
          <div className="card-header">
            <div className="logo-mark">
              <img className="rounded-md" src="/logoIMg.jpeg" alt="" />
            </div>
            <h1>Create Account</h1>
            <p>Joining as <strong className="capitalize">{role === "artist" ? "Artist" : "Buyer"}</strong></p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full Name</label>
              <input name="name" type="text" required placeholder="Your full name" />
            </div>

            <div className="field">
              <label>Email Address</label>
              <input name="email" type="email" required placeholder="you@example.com" />
            </div>

            <div className="field">
              <label>Password</label>
              <div className="pass-wrap">
                <input
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setStrength(checkStrength(e.target.value)); }}
                  placeholder="At least 8 characters"
                />
                <button type="button" className="eye-btn" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {password && (
                <>
                  <div className="strength-bar-bg">
                    <div className="strength-bar-fill" style={{ width: strengthConfig[strength]?.width, background: strengthConfig[strength]?.color }} />
                  </div>
                  <p className="strength-label" style={{ color: strengthConfig[strength]?.color }}>
                    {strengthConfig[strength]?.label}
                  </p>
                </>
              )}
            </div>

            <div className="field">
              <label>Confirm Password</label>
              <div className="pass-wrap">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className={passwordsMismatch ? "input-error" : passwordsMatch ? "input-success" : ""}
                />
                <button type="button" className="eye-btn" onClick={() => setShowConfirm(!showConfirm)}>
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <p className="match-hint" style={{ color: passwordsMatch ? "#16a34a" : "#ef4444" }}>
                  <span>{passwordsMatch ? "✓" : "✗"}</span>
                  {passwordsMatch ? "Passwords match" : "Passwords do not match"}
                </p>
              )}
            </div>

            {/* ROLE */}

            <div style={{ marginBottom: "1.25rem" }}>
              <span className="role-label">Account Type</span>
              <div className="role-grid">
                <div className={`role-card ${role === "user" ? "selected" : ""}`} onClick={() => setRole("user")}>
                  <div className="role-icon">
                    <ShoppingBag size={17} color={role === "user" ? "#16352E" : "#9ca3af"} />
                  </div>
                  <span className="role-title">Buyer</span>
                  <span className="role-desc">Browse & collect art</span>
                  <div className="role-dot" />
                </div>
                <div className={`role-card ${role === "artist" ? "selected" : ""}`} onClick={() => setRole("artist")}>
                  <div className="role-icon">
                    <Palette size={17} color={role === "artist" ? "#16352E" : "#9ca3af"} />
                  </div>
                  <span className="role-title">Artist</span>
                  <span className="role-desc">Sell your creations</span>
                  <div className="role-dot" />
                </div>
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              <span>{loading ? "Creating Account…" : "Create Account"}</span>
            </button>
          </form>

          <div className="divider">
            <div className="divider-line" />
            <span>or</span>
            <div className="divider-line" />
          </div>

          <button className="btn-google" onClick={handleGoogle}>
            <svg width="17" height="17" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <p className="card-footer">
            Already have an account? <Link href="/login">Sign In</Link>
          </p>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
