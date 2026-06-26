"use server";

import Stripe from "stripe";
import { getArtworkById } from "@/lib/api/artWorks";
import { getUserSession } from "@/lib/core/session";
import { getPurchaseArt } from "@/lib/api/purchase";
import { getPlanById } from "@/lib/api/plans";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const stripeCurrencyMap = {
  USD: "usd",
  BDT: "bdt",
};

export async function createCheckoutSession(
  artworkId,
  shippingDetails
) {
  try {
    const [artwork, user] = await Promise.all([
      getArtworkById(artworkId),
      getUserSession(),
    ]);

    if (!user) {
      return {
        error: "You must be logged in to purchase.",
      };
    }

    if (!artwork) {
      return {
        error: "Artwork not found.",
      };
    }

    if (artwork.status === "closed") {
      return {
        error: "This artwork has already been sold.",
      };
    }

    if (user.role !== "user") {
      return {
        error: "Only buyer accounts can purchase artwork.",
      };
    }

    if (user.email === artwork.artistEmail) {
      return {
        error: "You cannot buy your own artwork.",
      };
    }

    const [purchases, plan] = await Promise.all([
      getPurchaseArt(user.email),
      getPlanById(user.planId || "user_free"),
    ]);

    const purchaseCount = purchases?.items?.length || 0;
    const maxPurchases = plan?.maxPurchases ?? 3;

    if (
      maxPurchases !== Infinity &&
      purchaseCount >= maxPurchases
    ) {
      return {
        error:
          "Purchase limit reached. Please upgrade your plan.",
      };
    }

    const price = Number(artwork.price) || 0;
    const serviceFee = Math.round(price * 0.03 * 100) / 100;
    const total = price + serviceFee;

    const currency =
      stripeCurrencyMap[artwork.currency] || "usd";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      customer_email: user.email,

      line_items: [
        {
          quantity: 1,

          price_data: {
            currency,

            unit_amount: Math.round(total * 100),

            product_data: {
              name: artwork.title,

              description: `Original artwork by ${
                artwork.artistName || "Unknown Artist"
              }`,

              images: artwork.image ? [artwork.image] : [],
            },
          },
        },
      ],

      metadata: {
        artworkId,

        buyerEmail: user.email,

        shippingName: shippingDetails?.name || "",

        shippingAddress:
          shippingDetails?.address || "",

        shippingCity: shippingDetails?.city || "",

        shippingPostalCode:
          shippingDetails?.postalCode || "",
      },

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/browseArtwork/${artworkId}/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/browseArtwork/${artworkId}/purchase`,
    });

    return {
      url: session.url,
    };
  } catch (error) {
    console.error("Checkout Error:", error);

    return {
      error: "Could not create checkout session.",
    };
  }
}