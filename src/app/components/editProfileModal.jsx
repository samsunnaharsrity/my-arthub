"use client";

import { updateUserProfile } from "@/lib/api/user";
import { useState } from "react";
import toast from "react-hot-toast";
import { User, Mail, Image as ImageIcon } from "lucide-react";

export default function EditProfileModal({
  user,
  onClose,
  onUpdated,
}) {
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [image, setImage] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

const handleUpdate = async () => {
  try {
    setLoading(true);

    const res = await updateUserProfile({
      name,
      image,
    });

    if (!res.success) {
      throw new Error(res.error);
    }

    toast.success("Profile updated");

    onUpdated(res.user);
    onClose();

  } catch (err) {
    toast.error(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 dark:text-white/70 dark:bg-black">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Profile
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update your personal information
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <div className="flex items-center rounded-xl border px-3">
              <User className="text-gray-400" size={18} />

              <input
                type="text"
                placeholder="Your name"
                className="w-full p-3 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="flex items-center rounded-xl border bg-gray-100 px-3">
              <Mail className="text-gray-400" size={18} />

              <input
                type="email"
                value={email}
                readOnly
                className="w-full cursor-not-allowed bg-transparent p-3 text-gray-500 outline-none"
              />
            </div>

            <p className="mt-1 text-xs text-gray-400">
              Email cannot be changed.
            </p>
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Profile Image URL
            </label>

            <div className="flex items-center rounded-xl border px-3">
              <ImageIcon
                className="text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="https://example.com/photo.jpg"
                className="w-full p-3 outline-none"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
          </div>

          {/* Preview */}
          {image && (
            <div className="flex justify-center pt-2">
              <img
                src={image}
                alt="Preview"
                className="h-24 w-24 rounded-full border-4 border-gray-200 object-cover"
                onError={(e) =>
                  (e.target.style.display = "none")
                }
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl bg-gray-200 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="rounded-xl bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}