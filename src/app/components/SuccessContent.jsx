"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  Mail,
  Package,
  ArrowRight,
} from "lucide-react";

export default function SuccessContent({ customerEmail }) {
  return (
    <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center px-2 py-28 dark:text-white/70 dark:bg-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden"
      >
        {/* Top */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 px-8 py-12 text-center text-white">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 180,
            }}
            className="flex justify-center mb-3"
          >
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="bg-white/20 p-4 rounded-full"
            >
              <CheckCircle2 size={60} />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold mb-3"
          >
            Payment Successful
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-emerald-50 text-md"
          >
            Thank you for your purchase. Your artwork order has been confirmed.
          </motion.p>
        </div>

        {/* Body */}
        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="rounded-2xl bg-stone-50 border border-stone-200 p-6 mb-6"
          >
            <div className="flex gap-4 items-start">
              <Mail className="text-emerald-600 mt-1" />

              <div>
                <h3 className="font-semibold text-lg text-stone-800">
                  Confirmation Email Sent
                </h3>

                <p className="text-stone-600 mt-1">
                  A confirmation receipt and order details have been sent to:
                </p>

                <p className="font-semibold text-emerald-700 mt-2">
                  {customerEmail}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="rounded-2xl bg-stone-50 border border-stone-200 p-6 mb-8"
          >
            <div className="flex gap-4 items-start">
              <Package className="text-emerald-600 mt-1" />

              <div>
                <h3 className="font-semibold text-lg text-stone-800">
                  What's Next?
                </h3>

                <ul className="mt-3 space-y-2 text-stone-600">
                  <li>• Your order is now being processed.</li>
                  <li>• The artist will prepare the artwork for shipment.</li>
                  <li>• Shipping updates will be shared via email.</li>
                  <li>• Delivery typically takes 5–7 business days.</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/dashboard/user"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[#1C1917] text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition"
            >
              View My Purchases
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/browseArtwork"
              className="flex-1 inline-flex items-center justify-center px-6 py-3 rounded-xl border border-stone-300 text-stone-700 font-medium hover:bg-stone-100 transition"
            >
              Continue Browsing
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}