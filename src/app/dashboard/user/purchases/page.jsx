import Image from "next/image";

import { getUserSession } from "@/lib/core/session";
import { getPurchaseArt } from "@/lib/api/purchase";
import { getArtworkById } from "@/lib/api/artWorks";

const LIMIT = 6;

export default async function PurchasesPage({ searchParams }) {
  const params = await searchParams; 

  const page = Number(params?.page || 1);
  const user = await getUserSession();

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-lg font-medium">
        Please login first
      </div>
    );
  }

const { items: purchases, total } = await getPurchaseArt(user.email, {
  page,
  limit: LIMIT,
});

const purchasedArts = await Promise.all(
  (purchases || []).map(async (purchase) => {
    const artwork = await getArtworkById(purchase.artworkId);
    return { ...purchase, artwork };
  })
);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="px-6 py-28 md:px-10">
      {/* Header */}
     <div className="">
       <div className="mb-3 flex justify-between">
        <h1 className="text-3xl font-bold">Purchased Artworks</h1>
        <span className="text-sm text-gray-500">
          Page {page} of {totalPages}
        </span>
      </div>
      <div className="mb-6 text-left text-md text-gray-500">
        Total Purchases:{" "}
        <span className="font-semibold text-green-900">
          {total}
        </span>
      </div>
     </div>


      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {purchasedArts.map((item) => (

          
          <div
            key={item._id}
            className="overflow-hidden rounded-2xl bg-white shadow-md"
          >
            <Image
              src={item.artwork?.image}
              alt={item.artwork?.title}
              width={500}
              height={300}
              className="h-60 w-full object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold">
                {item.artwork?.title}
              </h2>

              <p className="text-gray-500">
                Artist: {item.artwork?.artistName}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Numbers */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;

            return (
              <a
                key={pageNum}
                href={`?page=${pageNum}`}
                className={`rounded-lg border px-4 py-2 text-sm transition ${
                  pageNum === page
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}