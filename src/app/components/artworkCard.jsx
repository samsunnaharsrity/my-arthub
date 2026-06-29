"use client";

import { Button, Card } from "@heroui/react";
import { StarFill } from "@gravity-ui/icons";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ArtworkCard({ art }) {
  if (!art) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      className="h-full"
    >
      <Card className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm hover:shadow-xl transition-all h-full flex flex-col dark:text-white/70 dark:bg-black">

        {/* IMAGE SECTION */}
        <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
          <motion.img
            src={art.image}
            alt={art.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
          />

          {/* CATEGORY BADGE */}
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2.5 py-0.5 rounded-lg bg-white/90 text-slate-800 text-[10px] font-bold uppercase border border-slate-200/40 shadow-sm tracking-wider">
              {art.category || "Artwork"}
            </span>
          </div>

          {/* STAR BUTTON */}
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              isIconOnly
              radius="full"
              size="sm"
              className="absolute top-2.5 right-2.5 bg-white/80 text-slate-400 hover:text-amber-500 shadow-sm"
            >
              <motion.div
                whileHover={{
                  rotate: 360,
                  scale: 1.2,
                }}
                transition={{ duration: 0.4 }}
              >
                <StarFill width={16} height={16} />
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h4 className="font-bold text-base text-[#16352E] line-clamp-1">
              {art.title}
            </h4>

            <p className="text-slate-400 text-xs mt-1">
              by{" "}
              <span className="text-slate-600 font-semibold">
                {art.artist || "Unknown Artist"}
              </span>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
            <span className="text-emerald-600 font-extrabold text-base">
              {art.currency === "USD" ? "$" : art.currency || "$"}
              {art.price}
            </span>

            <Link href={art?._id ? `/browseArtwork/${art._id}` : "#"}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="sm"
                  className="bg-[#16352E] text-white text-xs font-semibold px-3 rounded-lg h-8 cursor-pointer hover:bg-green-700"
                >
                  View
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}