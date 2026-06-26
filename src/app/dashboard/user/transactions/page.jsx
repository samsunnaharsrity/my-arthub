import { getUserSession } from "@/lib/core/session";
import { getPurchaseArt } from "@/lib/api/purchase";

export default async function UserTransactionsPage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-xl font-semibold">
          Please login first
        </h2>
      </div>
    );
  }

  const { items: transactions = [] } =
    await getPurchaseArt(user.email);

  return (
    <section className="min-h-screen px-6 py-28 md:px-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Transaction History
        </h1>

        <p className="mt-2 text-gray-500">
          Total Transactions:{" "}
          <span className="font-semibold text-green-600">
            {transactions.length}
          </span>
        </p>
      </div>

      {/* Empty State */}
      {transactions.length === 0 ? (
        <div className="rounded-2xl border border-dashed py-20 text-center">
          <h2 className="text-2xl font-semibold">
            No Transactions Found
          </h2>

          <p className="mt-2 text-gray-500">
            You haven't purchased any artwork yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl bg-white shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">
                  Transaction ID
                </th>

                <th className="p-4 text-left">
                  Artwork
                </th>

                <th className="p-4 text-left">
                  Amount
                </th>

                <th className="p-4 text-left">
                  Payment Method
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-left">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4 text-sm">
                    {tx.transactionId || tx._id}
                  </td>

                  <td className="p-4">
                    {tx.title || "Artwork"}
                  </td>

                  <td className="p-4 font-semibold text-green-600">
                    ${tx.price}
                  </td>

                  <td className="p-4">
                    {tx.paymentMethod || "Stripe"}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}