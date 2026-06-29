"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { FileText, Pencil, Trash2 } from "lucide-react";
import { deleteArtwork, getAllArtworks } from "@/lib/api/artWorks";

export default function ArtistDraftPage() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      setLoading(true);

      const data = await getAllArtworks("draft");

      setDrafts(data || []);
    } catch (error) {
      toast.error("Failed to load drafts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this draft?"
    );

    if (!confirmDelete) return;

    try {
      await deleteArtwork(id);

      toast.success("Draft deleted successfully");

      setDrafts((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      toast.error(error.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 py-12 mt-20 px-4">
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <span className="text-emerald-700 font-semibold uppercase tracking-widest text-sm">
          Artist Studio
        </span>

        <h1 className="text-4xl font-bold text-slate-900 mt-2">
          My Draft Artworks
        </h1>

        <p className="text-slate-500 mt-3 max-w-xl">
          Manage, edit and publish your saved artwork drafts whenever you're
          ready.
        </p>
      </div>

      {/* Empty State */}
      {drafts.length === 0 ? (
        <div className="bg-white rounded-[30px] shadow-sm border border-slate-100 py-24 px-6 text-center">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <FileText
              size={42}
              className="text-emerald-700"
            />
          </div>

          <h2 className="text-2xl font-bold text-slate-800">
            No Drafts Yet
          </h2>

          <p className="text-slate-500 mt-3 max-w-md mx-auto">
            Your unfinished artworks will appear here. Save your creations as
            drafts and continue editing anytime.
          </p>

          <Link
            href="/dashboard/artist/artWorks/create"
            className="inline-block mt-8 bg-emerald-700 text-white px-8 py-3 rounded-xl hover:bg-emerald-800 transition"
          >
            Create Artwork
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {drafts.map((art) => (
            <div
              key={art._id}
              className="group bg-white rounded-[28px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl transition duration-300"
            >
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-500"
                />

                <span className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-2 rounded-full shadow">
                  Draft
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-slate-900 line-clamp-1">
                    {art.title}
                  </h2>

                  <p className="text-slate-500 mt-1 capitalize">
                    {art.category}
                  </p>
                </div>

                {art.description && (
                  <p className="text-slate-600 text-sm line-clamp-2 mb-5">
                    {art.description}
                  </p>
                )}

                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-emerald-700">
                    ${art.price || 0}
                  </span>

                  <span className="text-xs text-slate-400">
                    {new Date(
                      art.createdAt
                    ).toLocaleDateString()}
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/dashboard/artist/artWorks/edit/${art._id}`}
                    className="flex-1 bg-emerald-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-emerald-800 transition"
                  >
                    <Pencil size={18} />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(art._id)}
                    className="flex-1 border border-red-200 text-red-500 py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-50 transition"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);
}