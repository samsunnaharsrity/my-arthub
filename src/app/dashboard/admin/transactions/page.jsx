"use client";

import { useEffect, useState } from "react";
import {
  RefreshCw,
  Receipt,
  CreditCard,
  CalendarDays,
  Mail,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

const TYPE_BADGE_STYLES = {
  purchase:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",
  subscription:
    "bg-violet-100 text-violet-700 border border-violet-200",
  refund:
    "bg-red-100 text-red-700 border border-red-200",
};

const LIMIT = 10;

export default function TransactionsPage() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [page, typeFilter]);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(LIMIT),
      });

      if (typeFilter) params.append("type", typeFilter);

      const user = await authClient.getSession();

const res = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/transactions?${params}`,
  {
    headers: {
      "user-email": user?.data?.user?.email || "",
    },
  }
);

      console.log("Status:", res.status);

      const json = await res.json();

      console.log("Transactions Response:", json);

      setData(json.items || []);
      setTotal(json.total || 0);
    } catch (error) {
      console.log(error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <section className="mt-28 p-6 dark:text-white/70 dark:bg-black/70">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8 dark:text-white/70 dark:bg-black">
        <div>
          <h1 className="text-3xl font-bold text-[#16352E]">
            Transactions
          </h1>

          <p className="text-slate-500 mt-1">
            Total Transactions:{" "}
            <span className="font-semibold">{total}</span>
          </p>
        </div>

        <div className="flex gap-3">
          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setPage(1);
            }}
            className="border rounded-xl px-4 py-2"
          >
            <option value="">All</option>
            <option value="purchase">Purchase</option>
            <option value="subscription">Subscription</option>
            <option value="refund">Refund</option>
          </select>

          <button
            onClick={fetchData}
            className="bg-[#16352E] text-white px-4 rounded-xl flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border shadow overflow-hidden dark:text-white/70 dark:bg-black">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-100 sticky top-0 z-10">
              <tr className="text-left text-sm text-slate-600">
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                [...Array(6)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={6} className="p-4">
                      <div className="skeleton h-10 w-full"></div>
                    </td>
                  </tr>
                ))
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex flex-col items-center justify-center py-20">
                      <Receipt
                        size={50}
                        className="text-slate-300 mb-4"
                      />

                      <p className="text-slate-500">
                        No Transactions Found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                data.map((trx, index) => (
                  <tr
                    key={trx._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-6 py-5 font-medium">
                      {(page - 1) * LIMIT + index + 1}
                    </td>

                    <td className="px-6 py-5">
                      <div className="font-mono text-xs text-slate-500">
                        {trx._id?.slice(0, 12)}...
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                          TYPE_BADGE_STYLES[trx.type] ||
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {trx.type}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <Mail size={15} />
                        <span className="text-sm">
                          {trx.email ||
                            trx.userEmail ||
                            trx.artistEmail ||
                            "N/A"}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
  {trx.type === "subscription" ? (
    <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 text-xs font-semibold">
      {trx.planId || "No Plan"}
    </span>
  ) : (
    <div className="flex items-center gap-2 font-bold text-emerald-600">
      <CreditCard size={15} />
      ${trx.amount || trx.price || 0}
    </div>
  )}
</td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={15} />
                        {trx.createdAt
                          ? new Date(
                              trx.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      {!isLoading && totalPages > 1 && (
        <div className="flex justify-between items-center mt-6 dark:text-white/70 dark:bg-black">
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </p>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded-xl disabled:opacity-40"
            >
              Previous
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded-xl disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}