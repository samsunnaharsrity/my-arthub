"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";
import Link from "next/link";

export default function HeroSection() {
  const images = ["/hero1.jfif", "/hero2.jfif", "/hero3.jfif"];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto slide
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [paused]);

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f6f8f7] via-white to-[#eef5f2] dark:from-[#07130F] dark:via-[#0B1B15] dark:to-[#07130F]">

      {/* Glow background — pointer-events-none so it never blocks clicks on content above it */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] bg-green-500/10 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] bg-emerald-500/10 blur-[130px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>

            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-sm font-medium">
              🎨 Premium Art Marketplace
            </span>

            <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold leading-tight text-[#235348] dark:text-white">
              Discover & <br />
              Buy Original{" "}
              <span className="text-green-600 dark:text-green-400">
                Art
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Explore thousands of unique artworks from talented artists worldwide.
              Collect original creations with secure payments and seamless experience.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap gap-4 relative z-20">
              <Link href="/browseArtwork">
                <button
                  type="button"
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#16352E] to-[#1F4A40] text-white font-semibold shadow-lg hover:scale-105 transition cursor-pointer"
                >
                  Browse Artworks
                </button>
              </Link>

              <Link href="/register?role=artist">
                <button
                  type="button"
                  className="px-8 py-4 rounded-xl border border-[#16352E]/20 dark:border-white/10 text-[#16352E] dark:text-white hover:bg-green-600 hover:text-white transition cursor-pointer"
                >
                  Become an Artist
                </button>
              </Link>
            </div>

          </div>

          {/* RIGHT CAROUSEL */}
          <div
            className="relative z-20 h-[550px] hidden lg:flex items-center justify-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >

            {/* LEFT CARD */}
            <img
              src={images[(current + images.length - 1) % images.length]}
              className="absolute left-0 w-56 rounded-3xl rotate-[-14deg] opacity-60 scale-90 border border-green-500/20 shadow-2xl transition-all duration-700 pointer-events-none"
              alt=""
            />

            {/* CENTER CARD (ACTIVE) */}
            <img
              src={images[current]}
              className="relative z-20 w-80 rounded-3xl border-4 border-green-500 shadow-[0_0_70px_rgba(34,197,94,.45)] scale-105 transition-all duration-700 pointer-events-none"
              alt=""
            />

            {/* RIGHT CARD */}
            <img
              src={images[(current + 1) % images.length]}
              className="absolute right-0 w-56 rounded-3xl rotate-[14deg] opacity-60 scale-90 border border-green-500/20 shadow-2xl transition-all duration-700 pointer-events-none"
              alt=""
            />

            {/* NAV BUTTONS */}
            <button
              type="button"
              onClick={prev}
              className="absolute left-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-xl z-30 active:scale-90 transition cursor-pointer"
            >
              <ChevronLeft />
            </button>

            <button
              type="button"
              onClick={next}
              className="absolute right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-xl z-30 active:scale-90 transition cursor-pointer"
            >
              <ChevronRight />
            </button>

          </div>

        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-4 gap-6 mt-10 relative z-10">

          {[
            { icon: "🎨", text: "Original Artworks" },
            { icon: "🛡", text: "Secure Payments" },
            { icon: "🌍", text: "Global Artists" },
            { icon: "⚡", text: "Fast Transactions" },
          ].map((item) => (
            <div
              key={item.text}
              className="p-6 rounded-2xl border border-green-200 dark:border-green-500/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl hover:scale-105 transition"
            >
              <h3 className="text-lg font-semibold text-[#16352E] dark:text-white">
                {item.icon} {item.text}
              </h3>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}