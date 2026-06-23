"use client"
import HeroSection from "./components/shared/hero";
import PricingPage from "./pricing/page";
import ArtworkCard from "./components/artworkCard";
import { getBrowseArtwork } from "@/lib/api/artWorks";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";



export default function Home() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBrowseArtwork();
      setArtworks(data?.data || data || []);
    };

    fetchData();
  }, []);


  return (
  <div>
    <HeroSection />

    <div className="max-w-6xl mx-auto px-4 py-5">

      {/* HEADER */}
      <div className="py-10 text-center">
        <h2 className=" text-5xl font-extrabold text-[#16352E] tracking-tight">
        Featured <span className="text-emerald-600">
          Artworks
        </span>
      </h2>
      <p className="text-slate-500 mt-1 text-sm md:text-base">Carefully selected artworks showcasing creativity, passion, and imagination.</p>
      </div>

      {/* 6 CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {artworks.slice(0, 6).map((art) => (
          <ArtworkCard key={art._id} art={art} />
        ))}
      </div>

      {/* VIEW MORE */}
      <Link href="/browseArtwork">
        <div className="flex justify-center mt-10">
          <Button className="bg-[#16352E] text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-green-600">
            View More Artworks
          </Button>
        </div>
      </Link>

    </div>

    <PricingPage />
  </div>
  );
}
