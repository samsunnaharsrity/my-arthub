"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { editArtwork, getArtworkById  } from "@/lib/api/artWorks";

export default function EditArtworkPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    image: "",
    status: "draft",
  });

useEffect(() => {
  if (!id) return;

  const fetchArtwork = async () => {
    try {
      setLoading(true);

      const data = await getArtworkById(id);

      setFormData({
        title: data.title || "",
        category: data.category || "",
        price: data.price || "",
        image: data.image || "",
        status: data.status || "draft",
      });

    } catch (error) {
      console.log("FETCH ERROR:", error);
      toast.error(error?.message || "Failed to load artwork");
    } finally {
      setLoading(false);
    }
  };

  fetchArtwork();
}, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const res = await editArtwork(id, formData);

    console.log("UPDATE RESPONSE:", res);

    if (!res.success && res.message) {
      throw new Error(res.message);
    }

    toast.success("Artwork updated successfully");
    router.push("/dashboard/artist/artWorks");

  } catch (error) {
    console.log("EDIT ERROR:", error);
    toast.error(error.message || "Update failed");
  }
};

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading artwork...
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto py-10 mt-20">
      <div className="bg-white rounded-3xl shadow border p-8">

        <h1 className="text-3xl font-bold mb-6">
          Edit Artwork
        </h1>

        <form onSubmit={handleUpdate} className="space-y-3">

          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-xl p-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl p-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-xl p-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full border rounded-xl p-2"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl p-2"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            

            <button
                type="submit"
                className="bg-emerald-900 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition cursor-pointer"
            >
                Update Artwork
            </button>

            <button
                type="button"
                onClick={() => router.push("/dashboard/artist/artWorks")}
                className="px-6 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-200 transition cursor-pointer"
            >
                Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}