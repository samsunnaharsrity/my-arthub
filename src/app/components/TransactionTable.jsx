"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function TransactionTable({
  initialTransactions,
}) {
  const [transactions, setTransactions] =
    useState(initialTransactions);
const router = useRouter();

const handleDelete = async (id) => {
  try {
    const session = await authClient.getSession();

    const email = session?.data?.user?.email;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase/${id}`,
      {
        method: "DELETE",
        headers: {
          "user-email": email,
        },
      }
    );

    const data = await res.json();

    console.log(data);

    if (data.success) {
    setTransactions((prev) =>
        prev.filter(
        (item) => String(item._id) !== String(id)
        )
    );
    router.refresh();
      toast.success("Transaction deleted");
    } else {
      toast.error(data.message || "Delete failed");
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};

  return (
    <div className="overflow-x-auto rounded-3xl bg-white shadow-xl dark:text-white/70 dark:bg-black">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Transactions ID</th>
            <th className="p-4 text-left">Artwork</th>
            <th className="p-4 text-left">Amount</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((tx) => (
            <tr
              key={tx._id}
              className="border-t hover:bg-gray-50"
            >
              <td className="p-4">{tx._id}</td>

              <td className="p-4">
                {tx.title || "Artwork"}
              </td>

              <td className="p-4 font-semibold text-green-600">
                ${tx.price}
              </td>

              <td className="p-4">
                {new Date(
                  tx.createdAt
                ).toLocaleDateString()}
              </td>

              <td className="p-4">
                <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                  Completed
                </span>
              </td>

              <td className="p-4 text-center">
                <button
                  onClick={() =>
                    handleDelete(tx._id)
                  }
                  className="rounded-xl bg-red-500 p-2 text-white transition hover:bg-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}