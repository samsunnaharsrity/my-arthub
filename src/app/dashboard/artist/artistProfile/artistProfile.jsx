"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  MapPin,
  Globe,
  Upload,
  Pencil,
  X,
  Palette,
  Briefcase,
  ExternalLink,
  DollarSign,
  Layers,
  CheckCircle,
  Users,
} from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { createArtistProfile } from "@/lib/actions/artistProfile";

const specializations = [
  "Painting",
  "Digital Art",
  "Photography",
  "Illustration",
  "Sculpture",
];

export default function ArtistProfile({ user, artistProfile }) {
  const [isEditing, setIsEditing] = useState(!artistProfile);
  const [profile, setProfile] = useState(artistProfile || null);
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [imagePreview, setImagePreview] = useState(
    artistProfile?.photo || ""
  );

  const [photoUrl, setPhotoUrl] = useState(
    artistProfile?.photo || ""
  );

  const [formData, setFormData] = useState({
    name: artistProfile?.name || user?.name || "",
    email: user?.email || "",
    location: artistProfile?.location || "",
    website: artistProfile?.website || "",
    instagram: artistProfile?.instagram || "",
    specialization:
      artistProfile?.specialization || "",
    bio: artistProfile?.bio || "",
    photo: artistProfile?.photo || "",
    userId: user?.id || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);

    try {
      const imageData = new FormData();
      imageData.append("image", file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
        {
          method: "POST",
          body: imageData,
        }
      );

      const data = await res.json();
      const uploadedUrl = data?.data?.url;

      setPhotoUrl(uploadedUrl);

      setFormData((prev) => ({
        ...prev,
        photo: uploadedUrl,
      }));
    } catch (error) {
      console.log(error);
      alert("Image upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const artistData = {
        ...formData,
        photo: photoUrl,
      };

      console.log("[handleSubmit] sending to createArtistProfile:", artistData);

      const result = await createArtistProfile(artistData);

      console.log("[handleSubmit] server action result:", result);

      if (result?.error) {
        console.error("[handleSubmit] save failed:", result.error);
        alert(result.error);
        return;
      }

      setProfile(result?.data || artistData);
      setIsEditing(false);
    } catch (error) {
      console.error("[handleSubmit] caught error:", error);
      alert(error.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };


  // UPDATE PROFILE VIEW MODE 

  if (!isEditing && profile) {
    return (
      <section className="min-h-screen w-full bg-slate-50 p-6 mt-20">
        <div className="w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">

          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between gap-8 border-b pb-8">

            <div className="flex flex-col md:flex-row items-center gap-6">
              {profile.photo ? (
                <Image
                  src={profile.photo}
                  alt={profile.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-emerald-100"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-emerald-50 flex items-center justify-center">
                  <User className="w-12 h-12 text-emerald-600" />
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-4xl font-bold">
                    {profile.name}
                  </h1>

                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                    Verified Artist
                  </span>
                </div>

                <p className="flex items-center gap-2 mt-3 text-emerald-600 font-semibold">
                  <Briefcase size={18} />
                  {profile.specialization}
                </p>

                <div className="flex flex-wrap gap-4 mt-4 text-slate-500">

                  {profile.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {profile.location}
                    </div>
                  )}

                  {profile.website && (
                    <a
                      href={profile.website}
                      target="_blank"
                      className="flex items-center gap-2 hover:text-emerald-600"
                    >
                      <Globe size={16} />
                      {profile.website}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="h-fit flex items-center gap-2 px-5 py-3 rounded-xl border hover:bg-emerald-50"
            >
              <Pencil size={18} />
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            <StatCard
              title="Artworks"
              value="86"
              icon={<Layers className="text-emerald-600" />}
            />

            <StatCard
              title="Sales"
              value="120"
              icon={<CheckCircle className="text-green-600" />}
            />

            <StatCard
              title="Followers"
              value="2.3K"
              icon={<Users className="text-blue-600" />}
            />

            <StatCard
              title="Revenue"
              value="$12K"
              icon={<DollarSign className="text-yellow-600" />}
            />
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-8 mt-10">

            <div className="lg:col-span-2">
              <div className="border rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-4">
                  About Artist
                </h2>

                <p className="text-slate-600 leading-8">
                  {profile.bio ||
                    "No biography added yet."}
                </p>
              </div>
            </div>

            <div>
              <div className="border rounded-3xl p-6">
                <h2 className="text-xl font-bold mb-4">
                  Social Links
                </h2>

                {profile.instagram ? (
                  <a
                    href={`https://instagram.com/${profile.instagram.replace(
                      "@",
                      ""
                    )}`}
                    target="_blank"
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-emerald-50"
                  >
                    <div className="flex items-center gap-3">
                      <FaInstagram
                        size={20}
                        className="text-pink-500"
                      />

                      <span>{profile.instagram}</span>
                    </div>

                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <p className="text-slate-400">
                    No social profile added.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  //  ARTIST FORM 

  return (
    <section className="min-h-screen w-full bg-slate-50 p-6 mt-20">

      <div className="w-full bg-white rounded-3xl border border-slate-200 p-4 shadow-sm">

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-6 mb-8">

          <div className="flex items-center gap-4">

            <div className="p-4 rounded-2xl bg-emerald-50">
              <Palette className="text-emerald-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Artist Profile
              </h1>

              <p className="text-slate-500">
                Setup your public profile
              </p>
            </div>
          </div>

          {profile && (
            <button onClick={() => setIsEditing(false)}>
              <X />
            </button>
          )}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-8"
        >

          <div className="grid lg:grid-cols-2 gap-6">

            <InputField
              label="Artist Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <InputField
              label="Portfolio Website"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />

            <InputField
              label="Instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
            />
          </div>

          {/* Specialization */}
          <div>
            <label className="font-medium">
              Specialization
            </label>

            <select
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            >
              <option value="">
                Select Specialization
              </option>

              {specializations.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Photo */}
          <div>
            <label className="font-medium">
              Profile Photo
            </label>

            <label className="mt-3 border-2 border-dashed rounded-2xl h-60 flex items-center justify-center cursor-pointer overflow-hidden">

              {isUploading ? (
                <p>Uploading...</p>
              ) : imagePreview ? (
                <img
                  src={imagePreview}
                  className="h-full object-contain"
                  alt=""
                />
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto text-emerald-600" />
                  <p className="mt-2">
                    Upload Profile Photo
                  </p>
                </div>
              )}

              <input
                type="file"
                hidden
                onChange={handlePhotoChange}
              />
            </label>
          </div>

          {/* Bio */}
          <div>
            <label className="font-medium">
              Bio
            </label>

            <textarea
              rows={6}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full mt-2 border rounded-2xl p-4"
              placeholder="Tell people about yourself..."
            />
          </div>

          <button
            disabled={loading || isUploading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl"
          >
            {loading
              ? "Saving..."
              : "Save Profile"}
          </button>
        </form>
      </div>
    </section>
  );
}

// COMPONENTS 

function InputField({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="font-medium">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full mt-2 border rounded-xl p-3"
      />
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="border rounded-2xl p-6 flex items-center justify-between hover:shadow-md transition">
      <div>
        <h3 className="text-3xl font-bold">
          {value}
        </h3>

        <p className="text-slate-500 mt-1">
          {title}
        </p>
      </div>

      <div className="bg-slate-100 p-3 rounded-xl">
        {icon}
      </div>
    </div>
  );
}
