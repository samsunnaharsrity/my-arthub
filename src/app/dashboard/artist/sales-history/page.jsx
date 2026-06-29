"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function SalesHistoryPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  //  FETCH SALES -
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase`)
      .then((res) => res.json())
      .then((data) => {
        setSales(data.items || []);
      })
      .finally(() => setLoading(false));
  }, []);

  //  DELETE 
const handleDelete = async (id) => {
  if (!confirm("Are you sure?")) return;

  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase/${id}`, {
      method: "DELETE",
    });

    toast.success("Deleted");

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase`);
    const data = await res.json();

    setSales(data.items || []);
  } catch (err) {
    toast.error("Delete failed");
  }
};

  //  LOADING 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-28 px-6">

      {/* HEADER */}
      <div className="mb-8 flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-emerald-100">
          <ShoppingBag className="text-emerald-700" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-emerald-900">
            Sales History
          </h1>
          <p className="text-slate-500 mt-1">
            Track all your artwork sales and earnings.
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-emerald-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Artwork</th>
                <th className="px-6 py-4 text-left">Buyer</th>
                <th className="px-6 py-4 text-left">Purchase Date</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>

            <tbody>

              {sales.length > 0 ? (
                sales.map((sale) => (
                  <tr
                    key={sale._id}
                    className="border-b hover:bg-emerald-50 transition"
                  >
                    <td className="px-6 py-5 font-medium">
                      {sale.title || "Untitled"}
                    </td>

                    <td className="px-6 py-5">
                      {sale.shipping?.name ||
                        sale.buyerName ||
                        "Unknown"}
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5 font-bold text-emerald-700">
                      ${sale.price || 0}
                    </td>

                    {/* DELETE BUTTON */}
                    <td className="px-6 py-5">
                      <button
                        onClick={() => handleDelete(sale._id)}
                        disabled={deletingId === sale._id}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50"
                      >
                        {deletingId === sale._id ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <Trash2 size={16} />
                        )}
                        Delete
                      </button>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-16 text-slate-500">
                    No sales history found.
                  </td>
                </tr>
              )}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}