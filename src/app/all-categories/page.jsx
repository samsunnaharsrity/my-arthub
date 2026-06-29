import Link from "next/link";

export default function CategoriesPage() {
  const categories = [
    "Digital",
    "Photography",
    "Illustration",
    "Painting",
    "3D Art",
    "Typography",
    "Abstract",
    "Nature",
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50 px-6 py-28 dark:text-white/70 dark:bg-black">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-900">
            Art Categories
          </h1>

          <p className="mt-3 text-gray-600 text-sm md:text-base">
            Explore artworks by style, theme, and creative expression
          </p>

          <div className="mx-auto mt-5 h-1 w-28 rounded-full bg-emerald-500" />
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => {
            const slug = encodeURIComponent(category);

            return (
              <div
                key={category}
                className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 group-hover:opacity-100 transition" />

                {/* content */}
                <div className="relative z-10">

                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-emerald-700 transition">
                    {category}
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Discover unique {category.toLowerCase()} artworks
                  </p>

                  <Link
                    href={`/gallery?category=${slug}`}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2 text-white font-medium transition hover:bg-emerald-700"
                  >
                    Explore Collection
                  </Link>

                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}