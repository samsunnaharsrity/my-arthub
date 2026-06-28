"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 🔥 ১. এটি যুক্ত করা হয়েছে
import { CheckCircle, XCircle, Clock3, ImageOff } from "lucide-react";
import toast from "react-hot-toast";
import { updateArts } from "@/lib/actions/artWorks";
import { authClient } from "@/lib/auth-client";
import { approveArtwork, rejectArtwork } from "@/lib/api/artWorks";

export default function ApprovalPage({ permission }) {
  console.log("PERMISSION:", permission);

  const router = useRouter(); // 🔥 ২. রাউটার ইনিশিয়ালাইজ করা হয়েছে
  const [artworks, setArtworks] = useState(permission || []);
  const getId = (art) => art._id?.$oid || art._id || art.id;

  const handleApprove = async (id) => {
    try {
      const session = await authClient.getSession();
      const email = session?.data?.user?.email;

      const data = await approveArtwork(id, email);

      if (data.success) {
        // লোকাল স্টেট আপডেট
        setArtworks((prev) =>
          prev.map((art) =>
            String(getId(art)) === String(id)
              ? { ...art, status: "approved" }
              : art
          )
        );

        toast.success("Artwork approved");
        
        // 🔥 ৩. এটি অত্যন্ত গুরুত্বপূর্ণ! এটি Next.js-এর ডেটা ক্যাশ সম্পূর্ণ ক্লিয়ার করে সার্ভার থেকে ফ্রেশ ডেটা নিয়ে আসবে।
        router.refresh(); 
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    try {
      const session = await authClient.getSession();
      const email = session?.data?.user?.email;

      const data = await rejectArtwork(id, email);

      if (data.success) {
        setArtworks((prev) =>
          prev.map((art) =>
            String(getId(art)) === String(id)
              ? { ...art, status: "rejected" }
              : art
          )
        );

        toast.success("Artwork rejected");
        
        // 🔥 ৪. রিজেক্ট করার পরও ক্যাশ ক্লিয়ার করবে
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error("Reject failed");
    }
  };

  return (
    <section className="pt-28 px-6 pb-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mt-1">
              Artwork Approval Center
            </h1>
            <p className="text-slate-500 mt-2">
              Review and manage submitted artworks from artists.
            </p>
          </div>

          <div className="mt-4 md:mt-0 bg-white border rounded-2xl px-5 py-2 shadow-sm">
            <p className="text-sm text-slate-500">Pending Requests</p>
            <h3 className="text-xl text-center font-bold text-green-700">
              {artworks.filter((a) => a.status === "pending").length}
            </h3>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left p-5 text-xs uppercase text-slate-500">Artwork</th>
                  <th className="text-left p-5 text-xs uppercase text-slate-500">Artist</th>
                  <th className="text-left p-5 text-xs uppercase text-slate-500">Category</th>
                  <th className="text-left p-5 text-xs uppercase text-slate-500">Price</th>
                  <th className="text-left p-5 text-xs uppercase text-slate-500">Status</th>
                  <th className="text-center p-5 text-xs uppercase text-slate-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {artworks.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="py-16 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-slate-100 mx-auto flex items-center justify-center">
                          <ImageOff size={28} />
                        </div>
                        <h3 className="mt-4 text-lg font-semibold">No Requests Found</h3>
                        <p className="text-slate-500 text-sm mt-1">
                          There are currently no artwork approval requests.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  artworks.map((art) => (
                    <tr key={art._id} className="border-b hover:bg-slate-50 transition">
                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          {art.image ? (
                            <img
                              src={art.image}
                              alt={art.title}
                              className="w-14 h-14 rounded-xl object-cover"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center">
                              <ImageOff size={18} />
                            </div>
                          )}
                          <div>
                            <h4 className="font-semibold text-slate-900">{art.title}</h4>
                            <p className="text-xs text-slate-500">Submitted Artwork</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-slate-700">{art.artist || "Unknown"}</td>
                      <td className="p-5">
                        <span className="px-3 py-1 rounded-full bg-slate-100 text-sm">
                          {art.category}
                        </span>
                      </td>
                      <td className="p-5 font-semibold">${art.price}</td>
                      <td className="p-5">
                        {art.status === "pending" ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
                            <Clock3 size={14} /> Pending
                          </span>
                        ) : art.status === "approved" ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                            <CheckCircle size={14} /> Approved
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm">
                            <XCircle size={14} /> Rejected
                          </span>
                        )}
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleApprove(getId(art))}
                            className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-sm font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(getId(art))}
                            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 text-sm font-medium"
                          >
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}