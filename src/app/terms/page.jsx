export default function TermsPage() {
  return (
    <section className="max-w-4xl mx-auto px-4 py-16 pt-30">
      <h1 className="text-4xl font-bold mb-6">
        Terms & Conditions
      </h1>

      <div className="space-y-6 text-slate-600">
        <p>
          By using ArtHub, you agree to these terms and conditions.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            User Accounts
          </h2>
          <p>
            Users are responsible for maintaining the security of their
            accounts and passwords.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Artwork Ownership
          </h2>
          <p>
            Artists retain ownership of their artworks while granting ArtHub
            permission to display and promote them on the platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Prohibited Activities
          </h2>
          <p>
            Users may not upload illegal, harmful, or copyrighted content
            without permission.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            Changes to Terms
          </h2>
          <p>
            ArtHub reserves the right to modify these terms at any time.
          </p>
        </div>
      </div>
    </section>
  );
}