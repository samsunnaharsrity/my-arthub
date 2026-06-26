"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getBrowseArtwork } from "@/lib/api/artWorks";
import Image from "next/image";

export default function GalleryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const data = await getBrowseArtwork(category);

      setArtworks(Array.isArray(data) ? data : data?.data || []);

      setLoading(false);
    };

    fetchData();
  }, [category]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 px-6 py-28">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">

          <h1 className="text-4xl font-bold text-emerald-900">
            {category ? `${category} Collection` : "All Artworks"}
          </h1>

          <p className="text-gray-500 mt-2">
            Discover amazing artworks from talented artists
          </p>

          <div className="mx-auto mt-4 w-24 h-1 bg-emerald-500 rounded-full" />

          {/* BACK BUTTON */}
          <button
            onClick={() => router.back()}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
          >
            ← Back
          </button>

        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="text-center text-gray-500">Loading artworks...</div>
        ) : artworks.length === 0 ? (
          <div className="text-center text-gray-500">
            No artworks found for "{category}"
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {artworks.map((art) => (
              <div
                key={art._id}
                className="group bg-white border border-emerald-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition"
              >

                {/* IMAGE */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={art.image || "/default-art.png"}
                    alt={art.title || "Artwork"}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-white/90 text-emerald-700 text-xs px-3 py-1 rounded-full font-semibold">
                    {art.category || "Uncategorized"}
                  </span>
                </div>

                {/* INFO */}
                <div className="p-4">
                  <h2 className="font-semibold text-emerald-900 truncate">
                    {art.title}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    ${art.price}
                  </p>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}