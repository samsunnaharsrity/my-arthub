"use client";

import { createPurchase } from "@/lib/actions/purchase";
import { useState } from "react";
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

  const [paymentMethod, setPaymentMethod] = useState("free");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateField = (field, value) => {
    setShipping((prev) => ({ ...prev, [field]: value }));

    if (error) setError(null);
  };

  // Role validation
  const validateUserRole = () => {
    if (!user) {
      toast.error("Please login first");
      return false;
    }

    if (user.role !== "user") {
      toast.error(
        "Only users can purchase artworks. Artists and admins are not allowed."
      );
      return false;
    }

    return true;
  };

  // FREE PURCHASE
  const handleFreePurchase = async () => {
    // Role check
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

      if (res?.error) {
        setError(res.error);
        toast.error(res.error);
        return;
      }

      toast.success("Artwork purchased successfully!");

      setTimeout(() => {
        window.location.href = "/dashboard/user";
      }, 1200);
    } catch (err) {
      console.log(err);
      setError("Free purchase failed");
      toast.error("Free purchase failed");
    } finally {
      setLoading(false);
    }
  };

  // STRIPE PURCHASE
  const handleStripePurchase = async () => {
    // Role check
    if (!validateUserRole()) return;

    if (
      !shipping.name.trim() ||
      !shipping.address.trim() ||
      !shipping.city.trim()
    ) {
      setError("Please fill in your shipping details");
      toast.error("Please fill in your shipping details");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await createCheckoutSession(
        artwork._id,
        shipping
      );

      if (result?.url) {
        window.location.href = result.url;
      } else {
        setError("Stripe checkout failed");
        toast.error("Stripe checkout failed");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SHIPPING */}
      <div className="pp-section">
        <p className="pp-section-label">Shipping details</p>

        <div className="pp-field">
          <label>Full name</label>

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
              updateField("address", e.target.value)
            }
          />
        </div>

        <div className="pp-field-row">
          <div
            className="pp-field"
            style={{ marginBottom: 0 }}
          >
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

          <div
            className="pp-field"
            style={{ marginBottom: 0 }}
          >
            <label>Postal code</label>

            <input
              type="text"
              placeholder="ZIP / Postal code"
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
      <div className="pp-section">
        <p className="pp-section-label">
          Payment method
        </p>

        <div
          className={`pay-option mb-3 ${
            paymentMethod === "free"
              ? "selected"
              : ""
          }`}
          onClick={() => setPaymentMethod("free")}
        >
          <span className="pay-radio" />

          <div>
            <p className="pay-label">
              Free Purchase
            </p>

            <p className="pay-desc">
              Use your 3 free purchases (if
              available)
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
              Pay with Card (Stripe)
            </p>

            <p className="pay-desc">
              Secure checkout with Stripe
            </p>
          </div>
        </div>
      </div>

      {error && (
        <p className="pp-error">{error}</p>
      )}

      {/* BUTTON */}
      <button
        className="btn-confirm"
        disabled={loading}
        onClick={() => {
          if (paymentMethod === "free") {
            handleFreePurchase();
          } else {
            handleStripePurchase();
          }
        }}
      >
        {loading
          ? "Processing..."
          : paymentMethod === "free"
          ? "Confirm Free Purchase"
          : "Proceed to Stripe"}
      </button>
    </>
  );
}