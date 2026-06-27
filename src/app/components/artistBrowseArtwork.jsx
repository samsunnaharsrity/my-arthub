"use client";

import { useEffect, useMemo, useState } from "react";
import { getBrowseArtwork } from "@/lib/api/artWorks";

export default function useBrowseArtworks() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const data = await getBrowseArtwork();
        const arts = data?.data || data || [];
        setArtworks(arts);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  return { artworks, loading };
}