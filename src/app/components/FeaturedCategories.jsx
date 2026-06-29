import Link from "next/link";

export default function FeaturedCategories() {
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
    <section className="bg-gradient-to-b from-emerald-50 via-white to-emerald-50 px-6 py-20 dark:text-white/70 dark:bg-black">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900">
            Featured Categories
          </h2>

          <p className="mt-3 text-gray-600 text-sm md:text-base">
            Explore artworks by style, theme, and creative expression
          </p>

          <div className="mx-auto mt-5 h-1 w-28 rounded-full bg-emerald-500" />
        </div>

        {/* SHOW ONLY FIRST 4 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 4).map((category) => {
            const slug = encodeURIComponent(category);

            return (
              <div
                key={category}
                className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-0 transition group-hover:opacity-100" />

                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-gray-800 transition group-hover:text-emerald-700">
                    {category}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Discover unique {category.toLowerCase()} artworks
                  </p>

                  <Link
                    href={`/gallery?category=${slug}`}
                    className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2 font-medium text-white transition hover:bg-emerald-700"
                  >
                    Explore Collection
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/all-categories"
            className="rounded-xl bg-[#16352E] px-6 py-3 text-white transition hover:bg-green-700"
          >
            View All Categories
          </Link>
        </div>

      </div>
    </section>
  );
}