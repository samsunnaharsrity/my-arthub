"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  Mail,
  ShieldCheck,
  Pencil,
} from "lucide-react";

import EditProfileModal from "./editProfileModal";
import { Person } from "@gravity-ui/icons";

export default function ProfileClient({ user }) {
  const [data, setData] = useState(user);
  const [open, setOpen] = useState(false);



  return (
    <>
      <div className="w-full max-w-3xl pt-20">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-green-600 to-green-500 p-4 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-white/10"></div>

          <div className="relative flex flex-col items-center gap-5 md:flex-row">
<div className="relative">
  {data?.image ? (
    <Image
      src={data.image}
      alt={data.name}
      width={120}
      height={120}
      className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
    />
  ) : (
    <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gray-100 shadow-lg">
  <Person width={60} height={60} className="text-gray-500" />
</div>
  )}
</div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold">
                {data?.name}
              </h1>

              <p className="mt-2 text-white/90">
                {data?.email}
              </p>

              <span className="mt-4 inline-flex rounded-full bg-white/20 px-4 py-1 text-sm backdrop-blur">
                {data?.role}
              </span>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-medium text-gray-900 transition hover:scale-105"
            >
              <Pencil size={18} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Information Cards */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
              <User className="text-blue-600" />
            </div>

            <p className="text-sm text-gray-500">
              Full Name
            </p>

            <h3 className="mt-2 text-lg font-semibold">
              {data?.name}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <Mail className="text-green-600" />
            </div>

            <p className="text-sm text-gray-500">
              Email Address
            </p>

            <h3 className="mt-2 text-lg font-semibold break-all">
              {data?.email}
            </h3>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
              <ShieldCheck className="text-purple-600" />
            </div>

            <p className="text-sm text-gray-500">
              Account Role
            </p>

            <h3 className="mt-2 text-lg font-semibold capitalize">
              {data?.role}
            </h3>
          </div>
        </div>

        {/* Additional Section */}
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-md">
          <h2 className="mb-4 text-xl font-bold">
            Account Information
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">
                Account Status
              </span>

              <span className="font-medium text-green-600">
                Active
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-500">
                Email Verified
              </span>

              <span className="font-medium">
                {data?.emailVerified ? "Yes" : "No"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Member Role
              </span>

              <span className="font-medium capitalize">
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
          onUpdated={(newData) => setData(newData)}
        />
      )}
    </>
  );
}