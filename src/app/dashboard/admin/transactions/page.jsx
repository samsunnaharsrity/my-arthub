"use client";

import { useEffect, useState } from "react";
import { DollarSign } from "lucide-react";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/transactions`)
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        All Transactions
      </h1>

      <div className="overflow-x-auto rounded-xl border">
        <table className="table">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Type</th>
              <th>User / Artist</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((trx, index) => (
              <tr key={trx._id}>
                <td>{index + 1}</td>

                <td>{trx._id}</td>

                <td>
                  <span className="badge badge-info">
                    {trx.type}
                  </span>
                </td>

                <td>
                  {trx.userEmail || trx.artistEmail}
                </td>

                <td className="font-semibold text-green-600">
                  ${trx.amount}
                </td>

                <td>
                  {new Date(
                    trx.createdAt
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}