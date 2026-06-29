"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Input, Button, Card, Skeleton } from "@heroui/react";
import {
  Magnifier,
  Funnel,
  StarFill,
} from "@gravity-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { getBrowseArtwork } from "@/lib/api/artWorks";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
    "All",
    "Digital",
    "Photography",
    "Illustration",
    "Painting",
    "3D Art",
    "Typography",
    "Abstract",
    "Nature",
];

export default function BrowseArtworkPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("newest");


const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 9;

useEffect(() => {
  const fetchArtworks = async () => {
    try {
      setLoading(true);
      const data = await getBrowseArtwork();

      const arts = data?.data || data || [];

      console.log(
        arts.map((a) => ({
          title: a.title,
          category: a.category,
        }))
      );

      setArtworks(arts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchArtworks();
}, []);

  const filteredArtworks = useMemo(() => {
    let filtered = [...artworks];

    // Search Filter
    if (search) {
      filtered = filtered.filter((art) =>
        art?.title?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category Filter
    if (selectedCategory !== "All") {
  filtered = filtered.filter(
    (art) =>
      art?.category?.trim().toLowerCase() ===
      selectedCategory.trim().toLowerCase()
  );
}

    // Price Filter
    filtered = filtered.filter(
      (art) => Number(art?.price || 0) <= Number(maxPrice)
    );

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        break;
      case "newest":
        filtered.sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        break;
      default:
        break;
    }

    return filtered;
  }, [artworks, search, selectedCategory, maxPrice, sortBy]);

  const totalPages = Math.ceil(
  filteredArtworks.length / itemsPerPage
);

const startIndex =
  (currentPage - 1) * itemsPerPage;

const paginatedArtworks =
  filteredArtworks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-green-50/30 to-white pt-28 text-slate-800 dark:text-white/70 dark:bg-black">
      <div className="max-w-6xl mx-auto px-4 py-6">
        
        {/* Top Intro Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-green-100 pb-6">
          <div>
            <h1 className="text-4xl font-extrabold text-[#16352E] tracking-tight">
              Browse <span className="text-emerald-600">Artworks</span>
            </h1>
            <p className="text-slate-500 mt-1 text-sm md:text-base">
              Discover amazing masterworks from our global community of talented artists.
            </p>
          </div>
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-4 py-2 rounded-2xl text-sm font-semibold shadow-sm">
            {filteredArtworks.length} Masterpieces Found
          </div>
        </div>

        {/*  CATEGORY CARDS SECTION */}
        <div className="w-full mb-8">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">
            Select Category
          </h2>
          {/* Touch Screen Devices */}
          <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide snap-x">
            {categories.map((item) => {
              const isActive = selectedCategory === item;
             
              const count =
                    item === "All"
                      ? artworks.length
                      : artworks.filter(
                          (a) =>
                            a?.category?.trim().toLowerCase() ===
                            item.trim().toLowerCase()
                        ).length;

              return (
                <button
                  key={item}
                  onClick={() => setSelectedCategory(item)}
                  className={`flex-none min-w-[140px] md:min-w-[160px] p-4 rounded-2xl border text-center transition-all duration-300 snap-center shadow-sm relative overflow-hidden group
                    ${
                      isActive
                        ? "bg-[#16352E] border-[#16352E] text-white transform scale-[1.02]"
                        : "bg-white border-slate-200 hover:border-emerald-500 text-slate-700 hover:bg-emerald-50/30"
                    }
                  `}
                >
                  <p className="font-bold text-sm md:text-base tracking-tight truncate">
                    {item}
                  </p>
                  <span 
                    className={`inline-block mt-2 text-[11px] font-semibold px-2 py-0.5 rounded-full
                      ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700"}
                    `}
                  >
                    {count} Arts
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/*  Filters Side vs Content */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Controls & Range Filters Sidebar */}
          <div className="lg:col-span-3">
            <Card className="p-6 rounded-3xl border border-green-100 shadow-md sticky top-28 bg-white">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#16352E]">
                  Refine Options
                </h3>

                {/* Search Bar Input */}
                <div className="relative p-2">
                  <Magnifier
                    width={14}
                    height={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 z-10"
                  />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search title..."
                    variant="bordered"
                    radius="lg"
                    className="pl-6"
                  />
                </div>

                {/* Slider Price Filter */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-sm text-[#16352E]">Max Budget:</h4>
                    <span className="text-sm font-bold text-emerald-600">${maxPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full accent-[#16352E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium mt-1">
                    <span>$0</span>
                    <span>$500</span>
                    <span>$1000+</span>
                    <span>$10000+</span>
                  </div>
                </div>

                {/* Sort Option Selector */}
                <div>
                  <label className="font-semibold text-sm block mb-2 text-[#16352E]">
                    Sort Sequence
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 outline-none text-sm bg-white text-slate-700 cursor-pointer focus:border-emerald-500 transition-colors"
                  >
                    <option value="newest">Release Date: Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                <Button className="w-full bg-[#16352E] text-white font-medium rounded-xl shadow-sm flex items-center justify-center py-2">
                  <Funnel width={14} height={14} className="mr-2" />
                  Active Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Artworks Display View Layout */}
          <div className="lg:col-span-9">
            
            {/* Loading Grid View Layout */}
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="p-3 rounded-3xl bg-white border border-slate-100">
                    <Skeleton className="rounded-2xl h-52 w-full" />
                    <div className="mt-4 space-y-3">
                      <Skeleton className="h-4 w-3/4 rounded-lg" />
                      <Skeleton className="h-3 w-1/2 rounded-lg" />
                      <div className="flex justify-between items-center pt-2">
                        <Skeleton className="h-5 w-1/3 rounded-lg" />
                        <Skeleton className="h-7 w-12 rounded-lg" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              
            ) : filteredArtworks.length === 0 ? (
              
              /* No matching elements Alert Layout */
              <div className="h-[400px] flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-green-200 bg-white p-6 text-center">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                  <Funnel width={24} height={24} />
                </div>
                <h3 className="text-xl font-bold text-[#16352E]">
                  No Masterpieces Found
                </h3>
                <p className="text-slate-500 mt-2 text-sm max-w-sm">
                  We could not find anything matching &quot;{selectedCategory}&quot; category with your active filter options.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedCategory("All");
                    setMaxPrice(100000);
                    setSortBy("newest");
                  }}
                  className="mt-5 text-xs bg-[#16352E] hover:bg-emerald-800 text-white font-semibold px-4 py-2.5 rounded-xl transition"
                >
                  Reset Parameters
                </button>
              </div>
              
            ) : (
              
              /* Responsive Art Card Framework Execution Group */
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedArtworks.map((art) => (
                  <motion.div
                    key={art._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ y: -6 }}
                    className="h-full"
                  >
                    <Link href={`/browseArtwork/${art._id}`}>
                      <Card className="overflow-hidden rounded-3xl border border-slate-200/60 bg-white shadow-sm hover:shadow-xl hover:border-emerald-500/20 transition-all cursor-pointer h-full flex flex-col justify-between">

                        <div className="relative overflow-hidden aspect-[4/3] bg-slate-50">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />

                          <div className="absolute top-2.5 left-2.5">
                            <span className="px-2.5 py-0.5 rounded-lg bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold uppercase border border-slate-200/40 shadow-sm tracking-wider">
                              {art.category || "Artwork"}
                            </span>
                          </div>

                          <Button
                            isIconOnly
                            radius="full"
                            size="sm"
                            className="absolute top-2.5 right-2.5 bg-white/80 backdrop-blur-sm rounded-md text-slate-400 hover:text-amber-500 shadow-sm transition-colors"
                            onClick={(e) => e.preventDefault()}
                          >
                            <StarFill width={16} height={16} />
                          </Button>
                        </div>

                        <div className="p-4 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-base text-[#16352E] line-clamp-1 tracking-tight">
                              {art.title}
                            </h4>

                            <p className="text-slate-400 text-xs mt-0.5 font-medium truncate">
                              by{" "}
                              <span className="text-slate-600 font-semibold">
                                {art.artistName ||
                                  art.artist ||
                                  "Unknown Artist"}
                              </span>
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-base font-extrabold text-emerald-600">
                              {art.currency === "USD"
                                ? "$"
                                : art.currency || "$"}
                              {art.price}
                            </span>

                            <Button
                              size="sm"
                              className="bg-[#16352E] text-white text-xs font-semibold px-3 rounded-lg min-w-max h-8"
                            >
                              View
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
              </div>
              
            )}
          </div>
{totalPages > 1 && (
  <div className="flex justify-center items-center gap-2 mt-10">

    {/* Previous Button */}
    <button
      onClick={() =>
        setCurrentPage((prev) => Math.max(prev - 1, 1))
      }
      disabled={currentPage === 1}
      className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
    >
    <ChevronLeft size={18} />    
    </button>

    {/* Page Numbers */}
    {Array.from(
      { length: totalPages },
      (_, i) => i + 1
    ).map((page) => (
      <button
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`h-10 w-10 rounded-full font-medium transition ${
          currentPage === page
            ? "bg-[#16352E] text-white"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
      >
        {page}
      </button>
    ))}

    {/* Next Button */}
    <button
      onClick={() =>
        setCurrentPage((prev) =>
          Math.min(prev + 1, totalPages)
        )
      }
      disabled={currentPage === totalPages}
      className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
    >
    <ChevronRight size={18} />
    </button>

  </div>
)}
        </div>
      </div>
    </section>
  );
}