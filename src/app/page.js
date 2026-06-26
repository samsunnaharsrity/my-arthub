import HeroSection from "./components/shared/hero";
import PricingPage from "./pricing/page";
import ArtworkCard from "./components/artworkCard";
import FeaturedArtists from "./components/FeaturedArtists";
import { getBrowseArtwork } from "@/lib/api/artWorks";
import Link from "next/link";
import { Button } from "@heroui/react";
import FeaturedCategories from "./components/FeaturedCategories";
import WhyChooseUs from "./components/why-choose-us";

export default async function Home() {
  const data = await getBrowseArtwork();
  const artworks = data?.data || data || [];

  return (
    <div>
      <HeroSection />

      <div className="max-w-6xl mx-auto px-4 py-5">
        <div className="py-10 text-center">
          <h2 className="text-5xl font-extrabold text-[#16352E] tracking-tight">
            Featured <span className="text-emerald-600">Artworks</span>
          </h2>

          <p className="text-slate-500 mt-1 text-sm md:text-base">
            Carefully selected artworks showcasing creativity, passion, and imagination.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {artworks.slice(0, 6).map((art) => (
            <ArtworkCard key={art._id} art={art} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/browseArtwork">
            <Button className="bg-[#16352E] text-white px-6 py-2 rounded-xl">
              View More Artworks
            </Button>
          </Link>
        </div>
      </div>

      <FeaturedArtists />
      <FeaturedCategories></FeaturedCategories>
      <WhyChooseUs></WhyChooseUs>
      <StatsSection />
      <TestimonialSection />
      <PricingPage />
      <NewsletterSection />
    </div>
  );
}