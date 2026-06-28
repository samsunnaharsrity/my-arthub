import TransactionTable from "@/app/components/TransactionTable";
import { getPurchaseArt } from "@/lib/api/purchase";
import { getUserSession } from "@/lib/core/session";
import { CreditCard, Wallet } from "lucide-react";

export default async function UserTransactionsPage() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <h2 className="text-2xl font-bold">
            Please login first
          </h2>

          <p className="mt-2 text-gray-500">
            You need to sign in to view transactions.
          </p>
        </div>
      </div>
    );
  }

  const { items: transactions = [] } =
    await getPurchaseArt(user.email);

  const totalSpent = transactions.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  return (
<section className="min-h-screen bg-gray-50 px-4 py-20 md:px-8">

  {/* HEADER */}
  <div className="mb-8 mt-8 rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white shadow-xl">
    <h1 className="text-3xl font-bold">
      Transaction History
    </h1>

    <p className="mt-2 text-sm text-white/80">
      Manage and track all your purchases.
    </p>
  </div>

  {/* STATS */}
  <div className="mb-8 grid gap-4 md:grid-cols-2">

    {/* TOTAL TRANSACTIONS */}
    <div className="rounded-2xl bg-white p-5 shadow-md transition hover:shadow-lg">
      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
          <CreditCard className="text-green-600" size={22} />
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Total Transactions
          </p>

          <h2 className="text-2xl font-bold">
            {transactions.length}
          </h2>
        </div>
      </div>
    </div>

    {/* TOTAL SPENT */}
    <div className="rounded-2xl bg-white p-5 shadow-md transition hover:shadow-lg">
      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
          <Wallet className="text-blue-600" size={22} />
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Total Spent
          </p>

          <h2 className="text-2xl font-bold text-green-600">
            ${totalSpent}
          </h2>
        </div>
      </div>
    </div>
  </div>

  {/* TABLE */}
  {transactions.length === 0 ? (
    <div className="rounded-2xl bg-white py-16 text-center shadow">
      <h2 className="text-xl font-semibold">
        No Transactions Yet
      </h2>

      <p className="mt-2 text-gray-500">
        You haven't purchased any artwork yet.
      </p>
    </div>
  ) : (
    <TransactionTable
      initialTransactions={transactions}
    />
  )}
</section>
  );
}