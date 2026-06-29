import Image from "next/image";
import Link from "next/link";

import { getUserSession } from "@/lib/core/session";
import { getPurchaseArt } from "@/lib/api/purchase";
import { getArtworkById } from "@/lib/api/artWorks";
import Pagination from "./pagination";

const LIMIT = 6;

export default async function PurchasesPage({
  searchParams,
}) {
  const params = await searchParams;
  const page = Number(params?.page || 1);

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

  const { items: purchases = [], total = 0 } =
    await getPurchaseArt(user.email, {
      page,
      limit: LIMIT,
    });

const purchasedArts = await Promise.all(
  purchases.map(async (purchase) => {
    try {
      console.log(
        "Fetching artwork:",
        purchase.artworkId
      );

      const artwork = await getArtworkById(
        purchase.artworkId
      );

      console.log("Artwork Found:", artwork);

      return {
        ...purchase,
        artwork,
      };
    } catch (error) {
      console.log(
        "Artwork Fetch Error:",
        purchase.artworkId,
        error.message
      );

      return {
        ...purchase,
        artwork: null,
      };
    }
  })
);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <section className="min-h-screen px-6 py-28">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Purchased Artworks
          </h1>

          <p className="mt-2 text-gray-500">
            Total Purchases :
            <span className="ml-2 font-semibold text-green-600">
              {total}
            </span>
          </p>
        </div>

        <div className="rounded-lg bg-gray-100 px-4 py-2">
          Page {page} of {totalPages || 1}
        </div>
      </div>

      {/* Empty State */}
      {purchasedArts.length === 0 ? (
        <div className="rounded-xl border border-dashed py-20 text-center">
          <h2 className="text-2xl font-semibold">
            No Purchases Yet
          </h2>

          <p className="mt-2 text-gray-500">
            You haven't purchased any artwork.
          </p>

          <Link
            href="/gallery"
            className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white"
          >
            Explore Artworks
          </Link>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border bg-white shadow">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-5 py-4 text-left">
                    Artwork
                  </th>

                  <th className="px-5 py-4 text-left">
                    Title
                  </th>

                  <th className="px-5 py-4 text-left">
                    Artist
                  </th>

                  <th className="px-5 py-4 text-left">
                    Price
                  </th>

                  <th className="px-5 py-4 text-left">
                    Purchase Date
                  </th>

                  <th className="px-5 py-4 text-left">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {purchasedArts.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50"
                  >
                    {/* Image */}
                    <td className="px-5 py-4">
                      {item.artwork?.image ? (
                        <Image
                          src={item.artwork?.image}
                          alt={item.artwork?.title}
                          width={70}
                          height={70}
                          className="rounded-lg object-cover"
                        />
                      ) : (
                        <div className="text-sm text-red-500">
                          Not Found
                        </div>
                      )}
                    </td>

                    {/* Title */}
                    <td className="px-5 py-4 font-medium">
                      {item.artwork?.title ||
                        "Artwork Deleted"}
                    </td>

                    {/* Artist */}
                    <td className="px-5 py-4 text-gray-600">
                      {item.artwork?.artist || "N/A"}
                    </td>

                    {/* Price */}
                    <td className="px-5 py-4 font-semibold text-green-600">
                      ${item.price}
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-gray-500">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                        Purchased
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
{totalPages > 1 && (
  <div className="mt-8 flex justify-center gap-2">
    <Pagination
      totalPages={totalPages}
      currentPage={page}
    />
  </div>
          )}
        </>
      )}
    </section>
  );
}