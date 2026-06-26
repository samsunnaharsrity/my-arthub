import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllArtistProfiles } from "@/lib/api/artistProfile";

const LIMIT = 6;

export default async function ArtistPage({ searchParams }) {
  const page = Math.max(Number(searchParams?.page || 1), 1);

  const data = await getAllArtistProfiles({
    page,
    limit: LIMIT,
  });

  const artists = data?.items ?? [];
  const total = data?.total ?? 0;

  const totalPages = Math.max(Math.ceil(total / LIMIT), 1);

  const hasArtists = artists.length > 0;

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-28">
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Featured <span className="text-green-700">Artists</span>
          </h1>
          <p className="mt-3 text-gray-500">
            Discover talented artists from around the world
          </p>
        </div>

        {/* EMPTY STATE */}
        {!hasArtists && (
          <div className="rounded-2xl border bg-white py-20 text-center shadow-sm">
            <h2 className="text-xl font-semibold text-gray-700">
              No Artists Found
            </h2>
            <p className="mt-2 text-gray-500">
              Try again later or add new artists.
            </p>
          </div>
        )}

        {/* GRID */}
        {hasArtists && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {artists.map((artist) => (
              
<Link
  key={artist._id}
  href={`/artist/${artist._id}`}
  className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
>

  {/* IMAGE */}
  <div className="relative h-64 w-full overflow-hidden bg-gray-100">
    <Image
      src={
        artist.photo?.startsWith("http")
          ? artist.photo
          : "/default-avatar.png"
      }
      alt={artist.name || "Artist"}
      fill
      className="object-cover transition group-hover:scale-105"
    />
  </div>

  {/* CONTENT */}
  <div className="p-5">
    <h2 className="text-xl font-semibold text-gray-900">
      {artist.name}
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      📍 {artist.location || "Unknown"}
    </p>

    <p className="mt-3 text-sm text-gray-600">
      <span className="font-medium text-gray-800">
        Specialization:
      </span>{" "}
      {artist.specialization || "Not specified"}
    </p>

    <p className="mt-3 line-clamp-3 text-sm text-gray-500">
      {artist.bio}
    </p>

    {/* BUTTON */}
    <div className="mt-5">
      <span className="inline-flex items-center justify-center rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition group-hover:bg-green-700">
        View Details →
      </span>
    </div>

  </div>

</Link>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {hasArtists && totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">

            {/* PREV */}
            <Link
              href={`/artist?page=${page - 1}`}
              className={`rounded-full border p-2 transition ${
                page <= 1
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-white"
              }`}
            >
              <ChevronLeft size={20} />
            </Link>

            {/* PAGE INFO */}
            <span className="rounded-lg bg-black px-4 py-2 text-sm text-white">
              {page} / {totalPages}
            </span>

            {/* NEXT */}
            <Link
              href={`/artist?page=${page + 1}`}
              className={`rounded-full border p-2 transition ${
                page >= totalPages
                  ? "pointer-events-none opacity-40"
                  : "hover:bg-white"
              }`}
            >
              <ChevronRight size={20} />
            </Link>

          </div>
        )}

      </div>
    </section>
  );
}