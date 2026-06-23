"use client";

import { useState } from "react";
import Image from "next/image";
import EditProfileModal from "./EditProfileModal";

export default function ProfileClient({ user }) {
  const [data, setData] = useState(user);
  const [open, setOpen] = useState(false);

  const avatar =
    data?.image 
    // `https://ui-avatars.com/api/?name=${data?.name}&background=0D8ABC&color=fff`;

  return (
    <div className="w-full max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <div className="flex items-center gap-5">
          <Image
            src={avatar}
            width={80}
            height={80}
            className="rounded-full object-cover"
            alt="avatar"
          />

          <div>
            <h2 className="text-xl font-semibold">{data.name}</h2>
            <p className="text-gray-500">{data.email}</p>
          </div>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Edit Profile
        </button>
      </div>

      {open && (
        <EditProfileModal
          user={data}
          onClose={() => setOpen(false)}
          onUpdated={(newData) => setData(newData)}
        />
      )}
    </div>
  );
}