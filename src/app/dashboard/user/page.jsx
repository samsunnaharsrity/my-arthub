import {
  ShoppingBag,
  Palette,
  Crown,
} from "lucide-react";

import { getUserSession } from "@/lib/core/session";
import { getPurchaseArt } from "@/lib/api/purchase";
import { getUserCommentsCount } from "@/lib/api/comments";
import { getUserByEmail } from "@/lib/api/user";
import Link from "next/link";

export default async function UserDashboard() {
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Please login first
      </div>
    );
  }

  // Purchases Count
  const purchaseData = await getPurchaseArt(user.email, {
    page: 1,
    limit: 1,
  });

  // Comment Count
  const commentsData = await getUserCommentsCount(
    user.id
  );

  // User Info
  const currentUser = await getUserByEmail(
    user.email
  );

  const purchasedCount = purchaseData?.total || 0;
  const commentCount = commentsData?.total || 0;
  const currentPlan =
    currentUser?.planId ||
    currentUser?.plan ||
    "Free";

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-28">
      {/* Hero */}
      <section className="mb-8 rounded-3xl bg-gradient-to-r from-green-600 to-green-800 p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome Back, {user.name} 👋
        </h1>

        <p className="mt-2 text-md text-gray-100">
          Discover amazing artworks and support
          talented artists.
        </p>

        <Link href='/browseArtwork'>
        <button className="mt-4 rounded-xl bg-white px-4 py-2 font-semibold text-green-600 cursor-pointer">
          Explore Artworks
        </button>
        </Link>
      </section>

      {/* Stats */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Purchases */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <ShoppingBag className="mb-3 h-8 w-8 text-indigo-600" />

          <h3 className="text-3xl font-bold">
            {purchasedCount}
          </h3>

          <p className="text-gray-500">
            Purchased Arts
          </p>
        </div>

        {/* Comments */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <Palette className="mb-3 h-8 w-8 text-green-500" />

          <h3 className="text-3xl font-bold">
            {commentCount}
          </h3>

          <p className="text-gray-500">
            Total Comments
          </p>
        </div>

        {/* Plan */}
        <div className="rounded-2xl bg-white p-6 shadow">
          <Crown className="mb-3 h-8 w-8 text-yellow-500" />

          <h3 className="text-3xl font-bold capitalize">
            {currentPlan}
          </h3>

          <p className="text-gray-500">
            Current Plan
          </p>
        </div>
      </section>
    </div>
  );
}