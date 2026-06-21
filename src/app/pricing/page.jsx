import Link from "next/link";
import { Check, Crown, Gem } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for new collectors.",
    purchases: "3 paintings / month",
    buttonText: "Current Plan",
    popular: false,
    features: [
      "Purchase up to 3 artworks monthly",
      "View purchase history",
      "Comment on artworks",
      "Profile management",
    ],
  },
  {
    name: "Pro",
    price: "$9.99",
    description: "Best for active collectors.",
    purchases: "9 paintings / month",
    buttonText: "Upgrade to Pro",
    popular: true,
    features: [
      "Purchase up to 9 artworks monthly",
      "Priority support",
      "Exclusive artwork access",
      "Advanced dashboard insights",
    ],
  },
  {
    name: "Premium",
    price: "$19.99",
    description: "Unlimited collecting experience.",
    purchases: "Unlimited purchases",
    buttonText: "Go Premium",
    popular: false,
    features: [
      "Unlimited artwork purchases",
      "VIP collector badge",
      "Early access to new collections",
      "Premium customer support",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.2em] text-sm text-green-700 font-semibold">
            Subscription Plans
          </p>

          <h1 className="text-5xl font-serif text-stone-900 mt-4">
            Choose Your Plan
          </h1>

          <p className="text-stone-500 mt-5 max-w-2xl mx-auto">
            Upgrade your experience and unlock more artwork purchases,
            exclusive collections, and premium features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl
              ${
                plan.popular
                  ? "border-green-600 ring-2 ring-green-600"
                  : "border-stone-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-700 text-white px-5 py-2 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              )}

              <div className="mb-8">
                <div className="mb-5">
                  {plan.name === "Free" && (
                    <Crown className="w-10 h-10 text-stone-700" />
                  )}

                  {plan.name === "Pro" && (
                    <Gem className="w-10 h-10 text-green-700" />
                  )}

                  {plan.name === "Premium" && (
                    <Gem className="w-10 h-10 text-yellow-500" />
                  )}
                </div>

                <h2 className="text-3xl font-bold">{plan.name}</h2>

                <div className="mt-4">
                  <span className="text-5xl font-bold">
                    {plan.price}
                  </span>

                  <span className="text-stone-500 ml-2">
                    / month
                  </span>
                </div>

                <p className="text-stone-500 mt-4">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="rounded-xl bg-stone-100 p-4 text-center">
                  <p className="font-semibold text-stone-900">
                    {plan.purchases}
                  </p>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-700 mt-0.5" />
                    <span className="text-stone-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/dashboard/user"
                className={`block text-center rounded-xl py-3 font-semibold transition
                ${
                  plan.popular
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "bg-stone-900 text-white hover:bg-stone-700"
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mt-24 bg-white rounded-3xl p-8 border border-stone-200 overflow-x-auto">
          <h2 className="text-3xl font-serif mb-8 text-center">
            Compare Plans
          </h2>

          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">Features</th>
                <th>Free</th>
                <th>Pro</th>
                <th>Premium</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-4">Monthly Purchases</td>
                <td className="text-center">3</td>
                <td className="text-center">9</td>
                <td className="text-center">Unlimited</td>
              </tr>

              <tr className="border-b">
                <td className="py-4">Purchase History</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
              </tr>

              <tr className="border-b">
                <td className="py-4">Exclusive Artworks</td>
                <td className="text-center">—</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
              </tr>

              <tr>
                <td className="py-4">Priority Support</td>
                <td className="text-center">—</td>
                <td className="text-center">✓</td>
                <td className="text-center">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}