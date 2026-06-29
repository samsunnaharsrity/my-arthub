import Image from "next/image";
import Link from "next/link";
import { getArtistById, getArtworksByArtist } from "@/lib/api/artistProfile";

export default async function ArtistDetailsPage({ params }) {
  const { id } = await params;

  const artist = await getArtistById(id);
  const artworks = await getArtworksByArtist(id);

  if (!artist) {
    return (
      <div className="flex h-screen items-center justify-center bg-green-50">
        <h2 className="text-xl font-semibold text-green-800">
          Artist not found
        </h2>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 px-6 py-24 dark:text-white/70 dark:bg-black">
      <div className="mx-auto max-w-6xl py-10">

        {/* HERO */}
        <div className="grid gap-10 md:grid-cols-3">

          {/* IMAGE */}
          <div className="relative h-80 w-full overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm">
            <Image
              src={
                artist.photo?.startsWith("http")
                  ? artist.photo
                  : "/default-avatar.png"
              }
              alt={artist.name || "Artist"}
              fill
              className="object-cover"
            />
          </div>

          {/* INFO */}
          <div className="md:col-span-2 pt-12">
            <h1 className="text-4xl font-bold text-green-900">
              {artist.name}
            </h1>

            <p className="mt-2 text-green-700">
              📍 {artist.location || "Unknown Location"}
            </p>

            <p className="mt-5 text-gray-700 leading-relaxed">
              {artist.bio}
            </p>

            <div className="mt-6 space-y-2 text-sm text-gray-600">

              <p>
                <span className="font-semibold text-green-800">
                  Specialization:
                </span>{" "}
                {artist.specialization}
              </p>

              <p>
                <span className="font-semibold text-green-800">
                  Email:
                </span>{" "}
                {artist.email}
              </p>

              {artist.website && (
                <p>
                  <span className="font-semibold text-green-800">
                    Website:
                  </span>{" "}
                  <a
                    href={artist.website}
                    target="_blank"
                    className="text-green-700 underline"
                  >
                    Visit
                  </a>
                </p>
              )}

              {artist.instagram && (
                <p>
                  <span className="font-semibold text-green-800">
                    Instagram:
                  </span>{" "}
                  <a
                    href={artist.instagram}
                    target="_blank"
                    className="text-pink-600 underline"
                  >
                    Follow
                  </a>
                </p>
              )}

            </div>
          </div>
        </div>

        {/* ARTWORKS */}
        <div className="mt-16">

          <h2 className="mb-6 text-2xl font-bold text-green-900">
            🎨 More Artworks by {artist.name}
          </h2>

          {!artworks || artworks.length === 0 ? (
            <p className="text-gray-500">No artworks found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {artworks.map((art) => (
                <div
                  key={art._id}
                  className="group overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition hover:shadow-lg"
                >

                  {/* IMAGE */}
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image
                      src={art.image}
                      alt={art.title || "Artwork"}
                      fill
                      className="object-cover transition group-hover:scale-105"
                    />
                  </div>

                  {/* INFO */}
                  <div className="p-4">
                    <h3 className="font-semibold text-green-900">
                      {art.title}
                    </h3>
                    <p className="text-sm text-green-700">
                      ${art.price}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          )}
        </div>

        {/* BACK BUTTON */}
        <div className="mt-12">
          <Link
            href="/artist"
            className="inline-flex items-center rounded-xl bg-green-700 px-6 py-2 text-white transition hover:bg-green-800"
          >
            ← Back to Artists
          </Link>
        </div>

      </div>
    </section>
  );
}