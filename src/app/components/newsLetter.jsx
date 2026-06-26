"use client";

import React, { useState } from "react";
import { Mail } from "lucide-react";
import toast from "react-hot-toast";

const NewsLetter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    toast.success("🎉 Successfully subscribed!");

    setEmail("");
  };

  return (
    <section className="relative overflow-hidden py-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-r from-[#16352E] via-emerald-900 to-[#16352E]" />

      <div className="relative mx-auto max-w-3xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl px-6 py-10 text-center shadow-2xl">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
            <Mail className="h-7 w-7 text-emerald-300" />
          </div>

          <h2 className="mt-5 text-3xl font-bold text-white">
            Stay Inspired
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm text-gray-300">
            Get updates on new artworks, artists, and exclusive collections.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 text-white placeholder:text-gray-400 outline-none"
            />

            <button
              onClick={handleSubscribe}
              className="h-12 rounded-xl bg-emerald-500 px-6 font-medium text-white transition hover:bg-emerald-400 cursor-pointer"
            >
              Subscribe
            </button>
          </div>

          <p className="mt-4 text-xs text-gray-400">
            No spam • Unsubscribe anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;