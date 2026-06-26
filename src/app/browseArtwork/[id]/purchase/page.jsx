import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BadgeCheck, Truck } from "lucide-react";

import { getArtworkById } from "@/lib/api/artWorks";
import { getUserSession } from "@/lib/core/session";
import PurchaseForm from "./purchaseForm";
import { getPurchaseArt } from "@/lib/api/purchase";
import { getPlanById } from "@/lib/api/plans";

const currencySymbols = { USD: "$", BDT: "৳" };

const PurchasePage = async ({ params }) => {
  const { id } = await params;
  
  
  const [artwork, user] = await Promise.all([
    getArtworkById(id),
    getUserSession(),
  ]);

console.log("USER SESSION:", user);

const plan = await getPlanById(
  user?.plan || user?.planId || "user_free"
);


  
  
  if (!artwork) {
    return (
      <div style={pageStyles.notFoundWrap}>
        <p style={pageStyles.notFoundEyebrow}>404</p>
        <h2 style={pageStyles.notFoundTitle}>This piece isn't here</h2>
        <p style={pageStyles.notFoundSub}>
          The artwork you're trying to purchase may have been sold, removed, or never existed.
        </p>
        <Link href="/browseArtwork" style={pageStyles.notFoundLink}>
          <ArrowLeft size={15} />
          Back to the gallery
        </Link>
      </div>
    );
  }


  const isSold = artwork.status === "closed";
  const isOwner = Boolean(user && user?.email === artwork?.artistEmail);
  const currencySymbol = currencySymbols[artwork.currency] || artwork.currency || "$";
  const priceNumber = Number(artwork.price) || 0;
  const serviceFee = Math.round(priceNumber * 0.03 * 100) / 100;
  const total = priceNumber + serviceFee;



// USER LOGIN CHECK FIRST
if (!user) {
  return (
    <div style={pageStyles.notFoundWrap}>
      <p style={pageStyles.notFoundEyebrow}>Sign in required</p>
      <h2 style={pageStyles.notFoundTitle}>
        Log in to complete this purchase
      </h2>
      <Link
        href={`/login?redirect=/browseArtwork/${id}/purchase`}
        style={pageStyles.notFoundLink}
      >
        Login
      </Link>
    </div>
  );
}

// GET USER PURCHASES
const purchases = await getPurchaseArt(user.email);

console.log(purchases);

const purchaseItems = purchases?.items || [];

const purchaseCount = purchaseItems?.length


// DETERMINE LIMIT
let maxPurchases = 3;
const hasReachedLimit = purchaseCount >= maxPurchases;

if (user?.planId === "user_pro") {
  maxPurchases = 9;
}

if (user?.planId === "user_premium") {
  maxPurchases = Infinity;
}

// OR DATABASE PLAN
if (plan?.maxPurchases) {
  maxPurchases = plan.maxPurchases;
}


console.log({
  userPlan: user?.plan,
  purchaseCount,
  maxPurchases,
  hasReachedLimit,
});

  if (user.role !== "user") {
    return (
      <div style={pageStyles.notFoundWrap}>
        <p style={pageStyles.notFoundEyebrow}>Not available for this account</p>
        <h2 style={pageStyles.notFoundTitle}>Only buyer accounts can purchase artwork</h2>
        <p style={pageStyles.notFoundSub}>
          You're signed in as {user.role === "artist" ? "an artist" : "an admin"}. Only user
          (buyer) accounts can purchase artwork on ArtHub.
        </p>
        <Link href={`/browseArtwork/${id}`} style={pageStyles.notFoundLink}>
          <ArrowLeft size={15} />
          Back to artwork
        </Link>
      </div>
    );
  }


if (hasReachedLimit) {
  return (
    <div style={pageStyles.notFoundWrap}>
      <p style={pageStyles.notFoundEyebrow}>
        Purchase limit reached
      </p>

      <h2 style={pageStyles.notFoundTitle}>
        You've reached your purchase limit
      </h2>

      <p style={pageStyles.notFoundSub}>
        Your current plan allows {maxPurchases} purchases.
        Please upgrade your account to continue.
      </p>

      <Link href="/pricing" style={pageStyles.notFoundLink}>
        View pricing plans
      </Link>
    </div>
  );
}

  if (isSold || isOwner) {
    return (
      <div style={pageStyles.notFoundWrap}>
        <p style={pageStyles.notFoundEyebrow}>{isSold ? "Sold" : "Not available"}</p>
        <h2 style={pageStyles.notFoundTitle}>
          {isSold ? "This piece has already sold" : "You own this artwork"}
        </h2>
        <p style={pageStyles.notFoundSub}>
          {isSold
            ? "Someone collected this piece before you. Take a look at similar work in the gallery."
            : "You can't purchase a piece you already own."}
        </p>
        <Link href={`/browseArtwork/${id}`} style={pageStyles.notFoundLink}>
          <ArrowLeft size={15} />
          Back to artwork
        </Link>
      </div>
    );
  }

  const remaining = Math.max(maxPurchases - purchaseCount, 0);
const isUnlimited = maxPurchases === Infinity;

  return (
    <>
      <style>{`
        .pp-wrap { background: #FAF8F4; min-height: 100vh; width: 100%; }
        .pp-inner { max-width: 1040px; width: 100%; margin: 0 auto; padding: 2rem 1.5rem 5rem; }

        .pp-breadcrumb {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.78rem; font-weight: 500; color: #8a8377;
          text-decoration: none; margin-bottom: 1.75rem; transition: color 0.2s;
        }
        .pp-breadcrumb:hover { color: #1C1917; }

        .pp-title {
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(1.8rem, 3.2vw, 2.4rem); font-weight: 400;
          color: #1C1917; margin-bottom: 0.4rem;
        }
        .pp-sub { font-size: 0.88rem; color: #8a8377; margin-bottom: 2.5rem; }

        .pp-grid { display: grid; grid-template-columns: 1fr; gap: 2.5rem; }
        @media (min-width: 880px) {
          .pp-grid { grid-template-columns: 1fr 360px; gap: 3rem; }
        }

        .pp-section { margin-bottom: 2rem; }
        .pp-section-label {
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #8a8377; margin-bottom: 0.9rem;
        }

        .pp-field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
        .pp-field { margin-bottom: 12px; }
        .pp-field label {
          display: block; font-size: 0.78rem; font-weight: 600; color: #44403c; margin-bottom: 0.4rem;
        }
        .pp-field input {
          width: 100%; height: 46px; border-radius: 4px; border: 1px solid #d9d4c8;
          background: #fff; padding: 0 0.9rem; font-size: 0.86rem; color: #1C1917; outline: none;
          transition: border-color 0.2s;
        }
        .pp-field input::placeholder { color: #b0a99c; }
        .pp-field input:focus { border-color: #1C1917; }

        .pay-options { display: flex; flex-direction: column; gap: 10px; }
        .pay-option {
          display: flex; align-items: center; gap: 12px; padding: 14px 16px;
          border: 1px solid #d9d4c8; border-radius: 6px; background: #fff;
        }
        .pay-option.selected { border-color: #1C1917; background: #f7f5f0; }
        .pay-radio {
          width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid #b0a99c;
          flex-shrink: 0; position: relative;
        }
        .pay-option.selected .pay-radio { border-color: #1C1917; }
        .pay-option.selected .pay-radio::after {
          content: ''; position: absolute; inset: 3px; border-radius: 50%; background: #1C1917;
        }
        .pay-label { font-size: 0.86rem; font-weight: 600; color: #1C1917; }
        .pay-desc { font-size: 0.76rem; color: #8a8377; margin-top: 1px; }

        .pp-error {
          font-size: 0.82rem; font-weight: 500; color: #b91c1c;
          background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px;
          padding: 10px 14px; margin-bottom: 1rem;
        }

        .summary-card {
          border: 1px solid #e8e4dc; border-radius: 8px; padding: 1.5rem;
          background: #fff; align-self: flex-start; position: sticky; top: 6.5rem;
        }

        .summary-art { display: flex; gap: 12px; padding-bottom: 1.25rem; border-bottom: 1px solid #e8e4dc; margin-bottom: 1.1rem; }
        .summary-thumb-frame { background: #fff; padding: 4px; border: 1px solid #e8e4dc; border-radius: 4px; flex-shrink: 0; }
        .summary-thumb { width: 64px; height: 80px; object-fit: cover; display: block; border-radius: 2px; }
        .summary-art-title { font-size: 0.9rem; font-weight: 600; color: #1C1917; line-height: 1.3; }
        .summary-art-artist { font-size: 0.78rem; color: #8a8377; margin-top: 3px; }

        .summary-row {
          display: flex; align-items: center; justify-content: space-between;
          font-size: 0.86rem; color: #44403c; padding: 0.5rem 0;
        }
        .summary-row.total {
          border-top: 1px solid #e8e4dc; margin-top: 0.4rem; padding-top: 0.9rem;
          font-weight: 700; font-size: 0.96rem; color: #1C1917;
        }

        .authenticity-note {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 0.74rem; color: #8a8377; line-height: 1.5;
          margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e8e4dc;
        }
        .authenticity-note svg { flex-shrink: 0; color: #13382e; margin-top: 1px; }

        .ship-note {
          display: flex; align-items: flex-start; gap: 8px;
          font-size: 0.74rem; color: #8a8377; line-height: 1.5; margin-top: 0.6rem;
        }
        .ship-note svg { flex-shrink: 0; color: #8a8377; margin-top: 1px; }

        .btn-confirm {
          width: 100%; height: 50px; margin-top: 1.25rem; border-radius: 4px; border: none;
          background: #1C1917; color: #FAF8F4; font-size: 0.86rem; font-weight: 600;
          letter-spacing: 0.02em; cursor: pointer; transition: background 0.2s, transform 0.2s;
        }
        .btn-confirm:hover:not(:disabled) { background: #288734; transform: translateY(-1px); }
        .btn-confirm:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>


<div className="max-w-4xl mx-auto mt-28 rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 to-green-500/5 p-6">

  <div className="flex items-center justify-between">
    <div>
      <p className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
        Subscription Status
      </p>

      {/* PLAN TITLE */}
      <h2 className="mt-2 text-2xl font-bold text-white">
        {user?.planId === "user_premium"
          ? "Premium Plan Active 👑"
          : user?.planId === "user_pro"
          ? "Pro Plan Active 🎉"
          : "Free Plan Active"}
      </h2>

      {/* SUB TEXT */}
      <p className="mt-1 text-gray-400">
        {user?.planId === "user_premium"
          ? `You’ve purchased ${purchaseCount} artworks`
          : user?.planId === "user_pro"
          ? "Unlimited purchases unlocked."
          : `You’ve used ${purchaseCount} of 3 free purchases`}
      </p>
    </div>

    <div className="rounded-xl bg-emerald-500 px-4 py-2 text-white font-semibold">
      Active
    </div>
  </div>

  {/* PROGRESS SECTION */}
  <div className="mt-6">
    <div className="flex justify-between text-sm text-gray-400 mb-2">
      <span>
        {user?.planId === "user_premium"
          ? "Total Purchases"
          : "Purchase Limit"}
      </span>

      <span>
        {isUnlimited
          ? "Unlimited"
          : `${purchaseCount}/${maxPurchases}`}
      </span>
    </div>

    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-800">
      <div
        className="h-full rounded-full bg-emerald-500"
        style={{
          width: isUnlimited
            ? "100%"
            : `${Math.min((purchaseCount / maxPurchases) * 100, 100)}%`,
        }}
      />
    </div>
  </div>

  {/* FOOTER MESSAGE */}
  <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
    {user?.planId === "user_premium" ? (
      <p className="text-sm text-emerald-300">
        👑 Premium user — unlimited purchases enabled. You own {purchaseCount} artworks.
      </p>
    ) : user?.planId === "user_pro" ? (
      <p className="text-sm text-emerald-300">
        🎉 Pro subscription active — You can purchase up to 9 artworks.
      </p>
    ) : (
      <p className="text-sm text-emerald-300">
        {remaining > 0
          ? `⚡ You can still purchase ${remaining} artworks for free.`
          : `🚫 Free limit reached. Upgrade to continue.`}
      </p>
    )}
  </div>
</div>

{/* FORM */}

      <div className="pp-wrap">
        <div className="pp-inner">
          <Link href={`/browseArtwork/${id}`} className="pp-breadcrumb">
            <ArrowLeft size={14} />
            Back to artwork
          </Link>

          <h1 className="pp-title">Complete your purchase</h1>
          <p className="pp-sub">You're one step from owning "{artwork.title}".</p>

          <div className="pp-grid">
            <div>
              <PurchaseForm artwork={artwork}
              user={user}
              userName={user?.name} />
            </div>

            <div className="summary-card">
              <div className="summary-art">
                <div className="summary-thumb-frame">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    width={64}
                    height={80}
                    className="summary-thumb"
                  />
                </div>
                <div>
                  <p className="summary-art-title">{artwork.title}</p>
                  <p className="summary-art-artist">by {artwork.artistName || "Unknown artist"}</p>
                </div>
              </div>

              <div className="summary-row">
                <span>Artwork price</span>
                <span>{currencySymbol}{priceNumber.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Service fee</span>
                <span>{currencySymbol}{serviceFee.toLocaleString()}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{currencySymbol}{total.toLocaleString()}</span>
              </div>

              <div className="authenticity-note">
                <BadgeCheck size={15} />
                <span>Includes a certificate of authenticity — this is the only copy of this piece.</span>
              </div>
              <div className="ship-note">
                <Truck size={15} />
                <span>Ships within 5–7 business days, insured in transit.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const pageStyles = {
  notFoundWrap: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "2rem",
    background: "#FAF8F4",
  },
  notFoundEyebrow: {
    fontSize: "0.78rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    color: "#13382e",
    marginBottom: "0.6rem",
    marginTop: "5rem",
  },
  notFoundTitle: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontSize: "2rem",
    color: "#1C1917",
    marginBottom: "0.6rem",
  },
  notFoundSub: {
    fontSize: "0.9rem",
    color: "#8a8377",
    maxWidth: 380,
    marginBottom: "1.75rem",
  },
  notFoundLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#1C1917",
    textDecoration: "none",
    borderBottom: "1px solid #1C1917",
    paddingBottom: 2,
  },
};

export default PurchasePage;