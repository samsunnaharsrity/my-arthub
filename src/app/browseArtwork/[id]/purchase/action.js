"use server";

import Stripe from "stripe";
import { getArtworkById } from "@/lib/api/artWorks";
import { getUserSession } from "@/lib/core/session";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeCurrencyMap = {
  USD: "usd",
  BDT: "bdt", // Note: confirm BDT is supported on your Stripe account/region.
              // If not, convert to USD server-side before creating the session.
};

export async function createCheckoutSession(artworkId, shippingDetails) {
  const [artwork, user] = await Promise.all([
    getArtworkById(artworkId),
    getUserSession(),
  ]);

  if (!user) {
    return { error: "You must be logged in to purchase." };
  }

  if (!artwork) {
    return { error: "This artwork could not be found." };
  }

  if (artwork.status === "closed") {
    return { error: "This artwork has already sold." };
  }

  if (user.role !== "user") {
    return { error: "Only buyer accounts can purchase artwork." };
  }

  if (user.email === artwork.artistEmail) {
    return { error: "You can't purchase your own artwork." };
  }

  const priceNumber = Number(artwork.price) || 0;
  const serviceFee = Math.round(priceNumber * 0.03 * 100) / 100;
  const total = priceNumber + serviceFee;
  const currency = stripeCurrencyMap[artwork.currency] || "usd";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: artwork.title,
              description: `Original artwork by ${artwork.artistName || "Unknown artist"}`,
              images: artwork.image ? [artwork.image] : [],
            },
            // Stripe expects the smallest currency unit (cents)
            unit_amount: Math.round(total * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        artworkId,
        buyerEmail: user.email,
        shippingName: shippingDetails?.name || "",
        shippingAddress: shippingDetails?.address || "",
        shippingCity: shippingDetails?.city || "",
        shippingPostalCode: shippingDetails?.postalCode || "",
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/browseArtwork/${artworkId}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/browseArtwork/${artworkId}/purchase`,
    });

    return { url: session.url };
  } catch (error) {
    console.error("[createCheckoutSession] Stripe error:", error);
    return { error: "Could not start checkout. Please try again." };
  }
}