"use client";

const jobs = [
  {
    title: "Frontend Developer (Next.js)",
    type: "Remote",
    level: "Mid Level",
  },
  {
    title: "UI/UX Designer",
    type: "Hybrid",
    level: "Senior",
  },
  {
    title: "Backend Engineer (Node.js)",
    type: "Remote",
    level: "Junior",
  },
];

export default function CareersPage() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white pt-28 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-[#16352E]">
            Join Our <span className="text-emerald-600">Team</span>
          </h1>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Build the future of digital art with us. We are always looking for passionate creators & engineers.
          </p>
        </div>

        {/* Job Cards */}
        <div className="grid md:grid-cols-3 gap-6">

          {jobs.map((job, i) => (
            <div
              key={i}
              className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-lg font-bold text-[#16352E]">
                {job.title}
              </h2>

              <div className="mt-3 space-y-1 text-sm text-slate-500">
                <p>📍 {job.type}</p>
                <p>📊 {job.level}</p>
              </div>

              <button className="mt-5 w-full bg-[#16352E] text-white py-2 rounded-xl text-sm font-semibold">
                Apply Now
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}