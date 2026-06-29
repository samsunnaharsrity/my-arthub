import {
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16 pt-30 dark:text-white/70 dark:bg-black">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">
          Support Center
        </h1>

        <p className="text-slate-500 mt-3">
          We're here to help artists and collectors.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="border rounded-2xl p-6 text-center">
          <Mail className="mx-auto mb-4 text-green-700" />
          <h3 className="font-semibold mb-2">
            Email Support
          </h3>
          <p className="text-slate-500">
            support@arthub.com
          </p>
        </div>

        <div className="border rounded-2xl p-6 text-center">
          <Phone className="mx-auto mb-4 text-green-700" />
          <h3 className="font-semibold mb-2">
            Phone Support
          </h3>
          <p className="text-slate-500">
            +880 1234 567890
          </p>
        </div>

        <div className="border rounded-2xl p-6 text-center">
          <MessageCircle className="mx-auto mb-4 text-green-700" />
          <h3 className="font-semibold mb-2">
            Live Chat
          </h3>
          <p className="text-slate-500">
            Available 24/7
          </p>
        </div>
      </div>

      <div className="mt-12 border rounded-2xl p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium">
              How do I upload artwork?
            </h3>
            <p className="text-slate-500">
              Go to your dashboard and click "Create Artwork".
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How do I purchase artwork?
            </h3>
            <p className="text-slate-500">
              Browse artworks, add them to your cart, and complete checkout.
            </p>
          </div>

          <div>
            <h3 className="font-medium">
              How do I contact an artist?
            </h3>
            <p className="text-slate-500">
              Visit the artist profile and use the messaging feature.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}