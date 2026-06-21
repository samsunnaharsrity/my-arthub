"use server";

import { getUserSession } from "@/lib/core/session";

export const createPurchase = async (artWorkId, shipping) => {
  const user = await getUserSession();

  // login check
  if (!user) {
    return {
      error: "Please login first",
    };
  }

  // purchase count check
  const purchaseRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase?buyerId=${user.id}`,
    {
      cache: "no-store",
    }
  );

  const purchases = await purchaseRes.json();

  if (purchases.length >= 3) {
    return {
      error: "You can purchase maximum 3 artworks.",
    };
  }

  // artwork already purchased?
  const alreadyRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase?artWorkId=${artWorkId}&buyerId=${user.id}`,
    {
      cache: "no-store",
    }
  );

  const already = await alreadyRes.json();

  if (already.length > 0) {
    return {
      error: "You already purchased this artwork.",
    };
  }

  // save purchase
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/purchase`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        artWorkId,
        buyerId: user.id,
        buyerEmail: user.email,
        buyerName: user.name,
        shipping,
        purchaseDate: new Date(),
        status: "pending",
      }),
    }
  );

  return await result.json();
};