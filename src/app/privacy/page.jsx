export default function PrivacyPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 pt-30">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <div className="space-y-6 text-slate-600">
        <p>
          At ArtHub, we value your privacy and are committed to protecting
          your personal information.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Information We Collect
          </h2>
          <p>
            We may collect account information, profile details, artwork
            submissions, transaction records, and communication data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            How We Use Information
          </h2>
          <p>
            Information is used to provide marketplace services, process
            purchases, improve platform performance, and communicate with
            users.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Data Security
          </h2>
          <p>
            We implement industry-standard security measures to protect user
            information from unauthorized access.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Contact Us
          </h2>
          <p>
            For privacy-related concerns, contact us at
            support@arthub.com.
          </p>
        </div>
      </div>
    </section>
  );
}