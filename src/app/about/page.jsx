"use client";

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white pt-28 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-[#16352E]">
            About <span className="text-emerald-600">ArtHub</span>
          </h1>
          <p className="mt-4 text-slate-500 text-lg max-w-2xl mx-auto">
            A modern marketplace where artists showcase, sell, and grow their creative journey globally.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#16352E] mb-2">Our Mission</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We empower creators by providing a seamless platform to share digital art,
              connect with buyers, and build sustainable income streams.
            </p>
          </div>

          <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#16352E] mb-2">Our Vision</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              To become the world’s most trusted and artist-first digital art ecosystem.
            </p>
          </div>

        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">

          {[
            { label: "Artists", value: "2.5K+" },
            { label: "Artworks", value: "10K+" },
            { label: "Sales", value: "5K+" },
            { label: "Countries", value: "40+" },
          ].map((item) => (
            <div key={item.label} className="bg-white border rounded-2xl p-4 shadow-sm">
              <h3 className="text-2xl font-bold text-emerald-600">{item.value}</h3>
              <p className="text-xs text-slate-500">{item.label}</p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}