"use client";

import { Button, Card } from "@heroui/react";
import { StarFill } from "@gravity-ui/icons";
import Link from "next/link";

export default function ArtworkCard({ art }) {
  return (

    
    <Card className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm hover:shadow-xl transition-all h-full flex flex-col">

      {/* IMAGE SECTION */}
      <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">

        <img
          src={art.image}
          alt={art.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />

        {/* CATEGORY BADGE */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2.5 py-0.5 rounded-lg bg-white/90 text-slate-800 text-[10px] font-bold uppercase border border-slate-200/40 shadow-sm tracking-wider">
            {art.category || "Artwork"}
          </span>
        </div>

        {/* STAR BUTTON */}
        <Button
          isIconOnly
          radius="full"
          size="sm"
          className="absolute top-2.5 right-2.5 bg-white/80 text-slate-400 hover:text-amber-500 shadow-sm"
          onClick={() => {}}
        >
          <StarFill width={16} height={16} />
        </Button>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col justify-between flex-grow">

        {/* TITLE + ARTIST */}
        <div>
          <h4 className="font-bold text-base text-[#16352E] line-clamp-1">
            {art.title}
          </h4>

          <p className="text-slate-400 text-xs mt-1">
            by{" "}
            <span className="text-slate-600 font-semibold">
              {art.artistName || "Unknown Artist"}
            </span>
          </p>
        </div>

        {/* PRICE SECTION */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
          
          <span className="text-emerald-600 font-extrabold text-base">
            {art.currency === "USD" ? "$" : art.currency || "$"}
            {art.price}
          </span>

        <Link href={`/browseArtwork/${art._id}`}>
            <Button
                size="sm"
                className="bg-[#16352E] text-white text-xs font-semibold px-3 rounded-lg h-8 cursor-pointer hover:bg-green-700"
            >
                View
            </Button>
        </Link>

        </div>
      </div>
    </Card>
  );
}