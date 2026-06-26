import { Star } from "lucide-react";
import { getAllArtistProfiles } from "@/lib/api/artistProfile";

export default async function TestimonialsSection() {
  const data = await getAllArtistProfiles({
    page: 1,
    limit: 3,
  });

  const artists = data?.items || [];

  return (
    <section className="relative overflow-hidden py-10 bg-gradient-to-b from-white via-emerald-50/40 to-white">
      {/* Background */}
      <div className="absolute -top-32 left-0 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="mt-6 text-4xl md:text-5xl font-extrabold text-[#16352E]">
            Trusted by Art Lovers Worldwide
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-500">
            Hear what our talented artists say about our platform.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {artists.map((artist) => (
            <div
              key={artist._id}
              className="group rounded-3xl border border-white/60 bg-white/70 backdrop-blur-xl p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* Rating */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Review */}
              <p className="mt-6 text-gray-600 leading-relaxed">
                "
                {artist.bio ||
                  "This platform helped me showcase my artworks to collectors worldwide."}
                "
              </p>

              {/* Artist */}
              <div className="mt-8 flex items-center gap-4">
                <img
                  src={
                    artist.photo?.startsWith("http")
                      ? artist.photo
                      : "/default-avatar.png"
                  }
                  alt={artist.name}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-emerald-100"
                />

                <div>
                  <h4 className="font-semibold text-gray-900">
                    {artist.name}
                  </h4>

                  <p className="text-sm text-emerald-600">
                    {artist.specialization || "Artist"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}