import Image from "next/image";
import Link from "next/link";
import { getAllArtistProfiles } from "@/lib/api/artistProfile";

export default async function FeaturedArtists() {
  const data = await getAllArtistProfiles({
    page: 1,
    limit: 3,
  });

  const artists = data?.items || [];

  if (!artists.length) return null;

  return (
    <section className="py-20 bg-gray-50 dark:text-white/70 dark:bg-black">
      <div className="max-w-6xl mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-[#16352E]">
            Featured <span className="text-green-700">Artists</span>
          </h2>

          <p className="mt-3 text-gray-500">
            Discover talented artists from around the world
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <Link
              key={artist._id}
              href={`/artist/${artist._id}`}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
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

              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-900">
                  {artist.name}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  📍 {artist.location || "Unknown"}
                </p>

                <p className="mt-3 line-clamp-3 text-sm text-gray-500">
                  {artist.bio}
                </p>

                <div className="mt-5">
                  <span className="inline-flex rounded-lg bg-black px-4 py-2 text-sm text-white group-hover:bg-green-700">
                    View Details →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* BUTTON */}
        <div className="flex justify-center mt-10">
          <Link
            href="/artist"
            className="rounded-xl bg-[#16352E] px-6 py-3 text-white hover:bg-green-700 transition"
          >
            View All Artists
          </Link>
        </div>
      </div>
    </section>
  );
}