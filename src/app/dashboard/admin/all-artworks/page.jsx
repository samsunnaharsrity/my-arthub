"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Trash2, ImageOff, Search } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AllArtworks() {
  const [arts, setArts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);


  const [user, setUser] = useState(null);

useEffect(() => {
  const getSession = async () => {
    const session = await authClient.getSession();

    if (session?.data?.user) {
      setUser(session.data.user);
    }
  };

  getSession();
}, []);

  useEffect(() => {
    loadArts();
  }, []);

  const loadArts = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/artworks`
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setArts(Array.isArray(data) ? data : data?.artworks ?? []);
    } catch (error) {
      console.error("Failed to load artworks:", error);
      setHasError(true);
      toast.error("Failed to load artworks");
    } finally {
      setIsLoading(false);
    }
  };


const handleDelete = async (id, title) => {
  const confirmed = window.confirm(
    `Delete "${title}"? This action cannot be undone.`
  );

  if (!confirmed) return;

  setDeletingId(id);

  try {
    const sessionToken =
      document.cookie
        .split("; ")
        .find((row) =>
          row.startsWith("better-auth.session_token=")
        )
        ?.split("=")[1];

    console.log("TOKEN:", sessionToken);
    console.log("EMAIL:", user?.email);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/artworks/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionToken}`,
          "user-email": user?.email,
        },
      }
    );

    const data = await res.json().catch(() => ({}));

    if (!res.ok || data?.success === false) {
      throw new Error(
        data?.message ||
          `Request failed with status ${res.status}`
      );
    }

    toast.success("Artwork deleted");

    setArts((prev) =>
      prev.filter((art) => art._id !== id)
    );
  } catch (error) {
    console.error("Failed to delete artwork:", error);
    toast.error(
      error.message || "Failed to delete artwork"
    );
  } finally {
    setDeletingId(null);
  }
};

  const filteredArts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return arts;

    return arts.filter(
      (art) =>
        art.title?.toLowerCase().includes(query) ||
        art.artistName?.toLowerCase().includes(query)
    );
  }, [arts, searchTerm]);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price ?? 0);

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 p-6 mt-20">
    <div className="bg-white/80 backdrop-blur-md rounded-[32px] shadow-2xl border border-white p-8">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent">
            Manage Artworks
          </h1>

          <p className="text-slate-500 mt-2">
            Manage, search and remove artworks from the marketplace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">

          {/* Search */}
          <div className="relative flex w-full">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search artworks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-green-200 rounded-2xl pl-11 pr-4 py-3 shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition"
            />
          </div>
        </div>
      </div>

      {/* Table */}
<div className="overflow-x-auto rounded-3xl border border-green-200 shadow-sm bg-white">
  <table className="w-full">
    <thead>
      <tr className="border-b border-slate-200 bg-slate-100">
        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
          Artwork
        </th>

        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
          Artist
        </th>

        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
          Price
        </th>

        <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
          Action
        </th>
      </tr>
    </thead>

    <tbody>
      {!isLoading &&
        !hasError &&
        filteredArts.map((art, index) => (
          <tr
            key={art._id}
            className={`
              border-b border-green-100
              hover:bg-green-50
              transition-all duration-300
              ${index % 2 === 0 ? "bg-white" : "bg-slate-50/40"}
            `}
          >
            {/* Artwork */}
            <td className="px-6 py-5">
              <div className="flex items-center gap-4">
                {art.image ? (
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-16 h-16 rounded-2xl object-cover hover:scale-110 transition duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center">
                    <ImageOff className="text-slate-400" />
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-slate-800">
                    {art.title}
                  </h3>

                  <p className="text-xs text-slate-500">
                    ID: {art._id.slice(-8)}
                  </p>
                </div>
              </div>
            </td>

            {/* Artist */}
            <td className="px-6 py-5">
              <span className="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                {art.artistName || art.artist}
              </span>
            </td>

            {/* Price */}
            <td className="px-6 py-5">
              <span className="font-bold text-emerald-600">
                {formatPrice(art.price)}
              </span>
            </td>

            {/* Action */}
            <td className="px-6 py-5 text-right">
              <button
                onClick={() =>
                  handleDelete(art._id, art.title)
                }
                disabled={deletingId === art._id}
                className="btn btn-error btn-circle btn-sm"
              >
                {deletingId === art._id ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : (
                  <Trash2 size={18} />
                )}
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
</div>

      {/* Empty */}
      {!isLoading &&
        !hasError &&
        filteredArts.length === 0 && (
          <div className="flex flex-col items-center py-24">

            <div className="bg-slate-100 p-8 rounded-full">
              <ImageOff size={60} className="text-slate-400" />
            </div>

            <h3 className="text-2xl font-bold mt-6">
              No Artworks Found
            </h3>

            <p className="text-slate-500 mt-2">
              {searchTerm
                ? "Try a different keyword."
                : "There are no artworks available yet."}
            </p>
          </div>
        )}

    </div>
  </div>
);
}