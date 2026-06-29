"use client";

const blogs = [
  {
    title: "The Future of Digital Art Marketplaces",
    desc: "How creators are monetizing their creativity in 2026.",
    tag: "Trends",
  },
  {
    title: "How to Sell Your First Artwork Online",
    desc: "Step-by-step guide for new artists.",
    tag: "Guide",
  },
  {
    title: "Top 10 Art Styles in Modern Era",
    desc: "Explore trending visual styles dominating the market.",
    tag: "Inspiration",
  },
];

export default function BlogPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-emerald-50/20 to-white pt-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-[#16352E]">
            ArtHub <span className="text-emerald-600">Blog</span>
          </h1>
          <p className="text-slate-500 mt-3">
            Insights, guides, and trends from the creative world.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-6">

          {blogs.map((post, i) => (
            <div
              key={i}
              className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
            >
              <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                {post.tag}
              </span>

              <h2 className="text-lg font-bold mt-4 text-[#16352E]">
                {post.title}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                {post.desc}
              </p>

              <button className="mt-5 text-sm text-emerald-600 font-semibold">
                Read more →
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}