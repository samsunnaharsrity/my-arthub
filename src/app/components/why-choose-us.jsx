import React from "react";
import { Palette, ShieldCheck, Globe2 } from "lucide-react";

const features = [
  {
    id: 1,
    title: "Exclusive Art Collection",
    description:
      "Explore curated artworks from talented artists worldwide.",
    icon: Palette,
  },
  {
    id: 2,
    title: "Secure Transactions",
    description:
      "Enjoy safe and trusted payments with complete confidence.",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Worldwide Community",
    description:
      "Connect with artists and collectors across the globe.",
    icon: Globe2,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            A Trusted Destination for Art Lovers
          </h2>

          <p className="mt-3 text-gray-600">
            We provide a seamless platform where creativity meets trust, enabling artists and collectors to connect effortlessly.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-green-600" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;