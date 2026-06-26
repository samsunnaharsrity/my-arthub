"use client";

import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";

export default function SalesHistoryPage() {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase`)
      .then((res) => res.json())
      .then((data) => {
        setSales(data.items || []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-24 px-6">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
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
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead className="bg-emerald-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left">
                  Artwork
                </th>

                <th className="px-6 py-4 text-left">
                  Buyer
                </th>

                <th className="px-6 py-4 text-left">
                  Purchase Date
                </th>

                <th className="px-6 py-4 text-left">
                  Amount
                </th>
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
                      {sale.artworkTitle || "Untitled"}
                    </td>

                    <td className="px-6 py-5">
                      {sale.shipping?.name ||
                        sale.buyerName ||
                        "Unknown"}
                    </td>

                    <td className="px-6 py-5 text-slate-500">
                      {new Date(
                        sale.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5 font-bold text-emerald-700">
                      ${sale.amount || 0}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-16 text-slate-500"
                  >
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