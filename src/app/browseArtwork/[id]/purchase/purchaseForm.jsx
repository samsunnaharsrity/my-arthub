"use client";

import { useState } from "react";
import { createPurchase } from "@/lib/actions/purchase";
import { createCheckoutSession } from "./action";
import toast from "react-hot-toast";

export default function PurchaseForm({
  artwork,
  user,
  userName,
}) {
  const [shipping, setShipping] = useState({
    name: userName || "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("free");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // PRO USER CHECK
  const isProUser =
    user?.plan === "user_pro" ||
    user?.planId === "user_pro";

  const updateField = (field, value) => {
    setShipping((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) setError(null);
  };

  // ROLE VALIDATION
  const validateUserRole = () => {
    if (!user) {
      toast.error("Please login first");
      return false;
    }

    if (user.role !== "user") {
      toast.error(
        "Only users can purchase artworks."
      );
      return false;
    }

    return true;
  };

  // DIRECT PURCHASE
  const handleFreePurchase = async () => {
    if (!validateUserRole()) return;

    try {
      setLoading(true);
      setError(null);

const res = await createPurchase({
  artworkId: artwork._id,
  title: artwork.title,
  price: artwork.price,
  artistName: artwork.artist,
  buyerId: user.id,
  buyerEmail: user.email,
  shipping,
});

console.log("Purchase response:", res);

if (!res.success) {
  throw new Error(
    res.message || "Purchase failed"
  );
}

toast.success(
  "Artwork purchased successfully!"
);

setTimeout(() => {
  window.location.href =
    "/dashboard/user/purchases";
}, 1200);
    } catch (err) {
      console.log(err);
      setError("Purchase failed");
      toast.error("Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  // STRIPE PURCHASE
  const handleStripePurchase = async () => {
    if (!validateUserRole()) return;

    if (
      !shipping.name.trim() ||
      !shipping.address.trim() ||
      !shipping.city.trim()
    ) {
      setError(
        "Please fill in your shipping details"
      );

      toast.error(
        "Please fill in your shipping details"
      );

      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result =
        await createCheckoutSession(
          artwork._id,
          shipping
        );

      if (result?.url) {
        window.location.href = result.url;
      } else {
        toast.error("Stripe checkout failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* PRO NOTICE */}
      {isProUser && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <h3 className="text-lg font-semibold text-emerald-700">
            ✨ Pro Membership Active
          </h3>

          <p className="mt-1 text-sm text-emerald-600">
            You can purchase artworks instantly
            without Stripe checkout.
          </p>
        </div>
      )}

      {/* SHIPPING */}
      <div className="pp-section">
        <p className="pp-section-label">
          Shipping Details
        </p>

        <div className="pp-field">
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Your full name"
            value={shipping.name}
            onChange={(e) =>
              updateField("name", e.target.value)
            }
          />
        </div>

        <div className="pp-field">
          <label>Address</label>

          <input
            type="text"
            placeholder="Street address"
            value={shipping.address}
            onChange={(e) =>
              updateField(
                "address",
                e.target.value
              )
            }
          />
        </div>

        <div className="pp-field-row">
          <div className="pp-field">
            <label>City</label>

            <input
              type="text"
              placeholder="City"
              value={shipping.city}
              onChange={(e) =>
                updateField("city", e.target.value)
              }
            />
          </div>

          <div className="pp-field">
            <label>Postal Code</label>

            <input
              type="text"
              placeholder="ZIP Code"
              value={shipping.postalCode}
              onChange={(e) =>
                updateField(
                  "postalCode",
                  e.target.value
                )
              }
            />
          </div>
        </div>
      </div>

      {/* PAYMENT METHOD */}
      {!isProUser && (
        <div className="pp-section">
          <p className="pp-section-label">
            Payment Method
          </p>

          <div
            className={`pay-option mb-3 ${
              paymentMethod === "free"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setPaymentMethod("free")
            }
          >
            <span className="pay-radio" />

            <div>
              <p className="pay-label">
                Free Purchase
              </p>

              <p className="pay-desc">
                Use your free purchase quota
              </p>
            </div>
          </div>

          <div
            className={`pay-option ${
              paymentMethod === "stripe"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setPaymentMethod("stripe")
            }
          >
            <span className="pay-radio" />

            <div>
              <p className="pay-label">
                Pay with Stripe
              </p>

              <p className="pay-desc">
                Secure payment using Stripe
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <p className="pp-error">{error}</p>
      )}

      {/* BUTTON */}
      <button
        className="btn-confirm"
        disabled={loading}
        onClick={() => {
          // PRO USER -> Direct Purchase
          if (isProUser) {
            handleFreePurchase();
            return;
          }

          // NORMAL USER
          if (paymentMethod === "free") {
            handleFreePurchase();
          } else {
            handleStripePurchase();
          }
        }}
      >
        {loading
          ? "Processing..."
          : isProUser
          ? "Confirm Purchase"
          : paymentMethod === "free"
          ? "Confirm Free Purchase"
          : "Proceed to Stripe"}
      </button>
    </>
  );
}