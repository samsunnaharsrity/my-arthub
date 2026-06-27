"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditProfileModal({
  user,
  onClose,
  onUpdated,
}) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const session = await authClient.getSession();

    const email = session?.data?.user?.email;

    const token = document.cookie
      .split("; ")
      .find((row) =>
        row.startsWith("better-auth.session_token=")
      )
      ?.split("=")[1];

    const res = await editArtwork(
      id,
      formData,
      email,
      token
    );

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          Edit Profile
        </h2>

        <div className="space-y-3">
          <input
            className="w-full rounded border p-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            className="w-full rounded border p-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full rounded border p-2"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}