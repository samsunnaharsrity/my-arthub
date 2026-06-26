"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Crown, Gem } from "lucide-react";

export default function PricingPage() {
  const router = useRouter();

  const handlePlanAction = (plan) => {
    if (plan.id === "user_free") {
      // FREE plan → redirect to purchase page
      router.push("/purchase");
    } else {
      // PRO / PREMIUM → checkout API
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/api/checkout_sessions";

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "plan_id";
      input.value = plan.id;

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    }
  };

  const plans = [
    {
      name: "Free",
      id: "user_free",
      price: "$0",
      description: "Perfect for new collectors.",
      purchases: "3 paintings / month",
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
      id: "user_pro",
      price: "$9.99",
      description: "Best for active collectors.",
      purchases: "9 paintings / month",
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
      id: "user_premium",
      price: "$19.99",
      description: "Unlimited collecting experience.",
      purchases: "Unlimited purchases",
      popular: false,
      features: [
        "Unlimited artwork purchases",
        "VIP collector badge",
        "Early access to new collections",
        "Premium customer support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F4] py-20 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.03 }}
              className={`relative rounded-2xl bg-white p-6 shadow-sm border ${
                plan.popular
                  ? "border-green-600 ring-1 ring-green-600"
                  : "border-stone-200"
              }`}
            >
              {/* Badge */}
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-700 text-white px-4 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              )}

              {/* Title */}
              <h2 className="text-2xl font-bold">{plan.name}</h2>

              <div className="mt-3">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-stone-500 ml-1 text-sm">/ month</span>
              </div>

              <p className="text-stone-500 mt-3 text-sm">
                {plan.description}
              </p>

              {/* Features */}
              <ul className="space-y-3 my-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-700 mt-1" />
                    <span className="text-sm text-stone-700">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button
                onClick={() => handlePlanAction(plan)}
                className={`w-full rounded-lg py-2.5 font-medium transition ${
                  plan.popular
                    ? "bg-green-700 text-white hover:bg-green-800"
                    : "bg-stone-900 text-white hover:bg-stone-700"
                }`}
              >
                {plan.id === "user_free" ? "Start Free" : "Checkout"}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}