"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  ShieldCheck,
  Pencil,
  BadgeCheck,
} from "lucide-react";
import EditProfileModal from "./editProfileModal";
import { Person } from "@gravity-ui/icons";

export default function ProfileClient({ user }) {
  const [data, setData] = useState(user);
  const [open, setOpen] = useState(false);

  const imageSrc =
    data?.image && data.image.startsWith("http")
      ? data.image
      : "/default-avatar.png";

  return (
    <>
      <div className="mx-auto w-full max-w-5xl px-4 py-20">

        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-600 via-green-600 to-teal-500 p-8 text-white shadow-2xl">

          {/* Background Blur */}
          <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col items-center gap-8 md:flex-row">

            {/* PROFILE IMAGE */}
            <div className="relative">
              {data?.image ? (
                <Image
                  src={imageSrc}
                  alt={data?.name || "user"}
                  width={140}
                  height={140}
                  className="h-36 w-36 rounded-full border-4 border-white/80 object-cover shadow-2xl"
                />
              ) : (
                <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-white/20 backdrop-blur">
                  <Person width={70} height={70} />
                </div>
              )}

              {data?.emailVerified && (
                <span className="absolute bottom-2 right-2 rounded-full bg-green-500 p-2 shadow-lg">
                  <BadgeCheck size={18} />
                </span>
              )}
            </div>

            {/* USER INFO */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold">
                {data?.name || "Unknown User"}
              </h1>

              <p className="mt-2 text-lg text-white/80">
                {data?.email}
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3 md:justify-start">

                <span className="rounded-full bg-white/20 px-5 py-2 text-sm capitalize backdrop-blur">
                  {data?.role || "user"}
                </span>

                <span
                  className={`rounded-full px-5 py-2 text-sm backdrop-blur ${
                    data?.emailVerified
                      ? "bg-green-500/30"
                      : "bg-red-500/30"
                  }`}
                >
                  {data?.emailVerified
                    ? "Email Verified"
                    : "Email Not Verified"}
                </span>
              </div>
            </div>

            {/* EDIT BUTTON */}
            <button
              onClick={() => setOpen(true)}
              className="rounded-2xl bg-white px-6 py-3 font-semibold text-gray-900 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-center gap-2">
                <Pencil size={18} />
                Edit Profile
              </div>
            </button>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
              <User className="text-blue-600" />
            </div>

            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <h3 className="mt-2 text-xl font-bold">
              {data?.name}
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
              <Mail className="text-green-600" />
            </div>

            <p className="text-sm text-gray-500">
              Email Address
            </p>

            <h3 className="mt-2 break-all text-lg font-bold">
              {data?.email}
            </h3>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100">
              <ShieldCheck className="text-purple-600" />
            </div>

            <p className="text-sm text-gray-500">
              Account Role
            </p>

            <h3 className="mt-2 text-xl font-bold capitalize">
              {data?.role}
            </h3>
          </div>
        </div>

        {/* ACCOUNT INFO */}
        <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl">
          <h2 className="mb-6 text-2xl font-bold">
            Account Information
          </h2>

          <div className="space-y-5">

            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-500">
                Account Status
              </span>

              <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-gray-500">
                Email Verification
              </span>

              <span
                className={`font-semibold ${
                  data?.emailVerified
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {data?.emailVerified
                  ? "Verified ✅"
                  : "Not Verified ❌"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-500">
                Member Role
              </span>

              <span className="font-semibold capitalize">
                {data?.role}
              </span>
            </div>

          </div>
        </div>
      </div>

      {open && (
        <EditProfileModal
          user={data}
          onClose={() => setOpen(false)}
          onUpdated={(newData) => {
            setData(newData?.data || newData?.user || newData);
          }}
        />
      )}
    </>
  );
}