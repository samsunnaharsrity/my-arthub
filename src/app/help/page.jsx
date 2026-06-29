export default function HelpCenterPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center pt-20 dark:text-white/70 dark:bg-black">
        Help Center
      </h1>

      <div className="space-y-8">
        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-xl mb-2">
            How do I upload artwork?
          </h2>
          <p className="text-slate-500">
            Login to your artist account and click
            "Create Artwork" from your dashboard.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-xl mb-2">
            How do I buy artwork?
          </h2>
          <p className="text-slate-500">
            Browse artworks, add your favorite piece
            to the cart and complete checkout.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-xl mb-2">
            How do I contact an artist?
          </h2>
          <p className="text-slate-500">
            Open the artist profile and use the
            built-in messaging system.
          </p>
        </div>

        <div className="border rounded-xl p-6">
          <h2 className="font-semibold text-xl mb-2">
            Payment Issues
          </h2>
          <p className="text-slate-500">
            Contact our support team for any
            payment or refund-related problems.
          </p>
        </div>
      </div>
    </section>
  );
}