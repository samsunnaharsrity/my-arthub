"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f8f7] px-4 relative overflow-hidden py-30">

      {/* FLOATING SHAPES */}
      <div className="absolute w-72 h-72 bg-[#16352E]/10 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-[#16352E]/5 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <div
        className={`text-center max-w-md transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* BIG 404 */}
        <h1 className="text-8xl font-extrabold text-[#16352E] tracking-tight">
          404
        </h1>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold mt-4 text-[#16352E]">
          Oops! Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="text-[#16352E]/60 mt-3 leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.
          <br />
          Let’s get you back on track.
        </p>

        {/* BUTTONS */}
        <div className="flex gap-3 justify-center mt-7">
          
          <button
            onClick={() => router.back()}
            className="px-5 py-2 rounded-xl border border-[#16352E]/30 text-[#16352E] hover:bg-[#16352E] hover:text-white transition"
          >
            Go Back
          </button>

          <Link href="/">
            <button className="px-5 py-2 rounded-xl bg-[#16352E] text-white hover:bg-[#0f241f] transition">
              Home
            </button>
          </Link>
        </div>

        {/* BRAND FOOTER */}
        <div className="mt-10 text-[#16352E]/40 text-sm">
          🎨 ArtHub — Lost in creativity, not in code
        </div>
      </div>
    </div>
  );
}