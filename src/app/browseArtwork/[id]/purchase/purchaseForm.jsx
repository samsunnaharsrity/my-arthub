"use client";

import { createPurchase } from "@/lib/actions/purchase";
import { useState } from "react";
import { createCheckoutSession } from "./action";

export default function PurchaseForm({ artworkId, userName }) {
  const [shipping, setShipping] = useState({
    name: userName || "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateField = (field, value) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  // 🆓 FREE PURCHASE
  const handleFreePurchase = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await createPurchase({
        artworkId,
        shipping,
      });

      if (res?.error) {
        setError(res.error);
        return;
      }

      window.location.href = "/dashboard";
    } catch (err) {
      setError("Free purchase failed");
    } finally {
      setLoading(false);
    }
  };

  // 💳 STRIPE PURCHASE
  const handleStripePurchase = async () => {
    if (
      !shipping.name.trim() ||
      !shipping.address.trim() ||
      !shipping.city.trim()
    ) {
      setError("Please fill in your shipping details");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await createCheckoutSession(artworkId, shipping);

      if (result?.url) {
        window.location.href = result.url;
      } else {
        setError("Stripe checkout failed");
      }
    } catch (err) {
      setError("Something went wrong");
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

            onChange={(e) => updateField("name", e.target.value)}

          />

        </div>

        <div className="pp-field">

          <label>Address</label>

          <input

            type="text"

            placeholder="Street address"

            value={shipping.address}

            onChange={(e) => updateField("address", e.target.value)}

          />

        </div>

        <div className="pp-field-row">

          <div className="pp-field" style={{ marginBottom: 0 }}>

            <label>City</label>

            <input

              type="text"

              placeholder="City"

              value={shipping.city}

              onChange={(e) => updateField("city", e.target.value)}

            />

          </div>

          <div className="pp-field" style={{ marginBottom: 0 }}>

            <label>Postal code</label>

            <input

              type="text"

              placeholder="ZIP / Postal code"

              value={shipping.postalCode}

              onChange={(e) => updateField("postalCode", e.target.value)}

            />

          </div>

        </div>

      </div>

      {/* PAYMENT METHOD */}
      <div className="pp-section">
        <p className="pp-section-label">Payment method</p>

        <div
          className={`pay-option ${
            paymentMethod === "free" ? "selected" : ""
          }`}
          onClick={() => setPaymentMethod("free")}
        >
          <span className="pay-radio" />
          <div>
            <p className="pay-label">Free Purchase</p>
            <p className="pay-desc">Use 3 free limit</p>
          </div>
        </div>

        <div
          className={`pay-option ${
            paymentMethod === "stripe" ? "selected" : ""
          }`}
          onClick={() => setPaymentMethod("stripe")}
        >
          <span className="pay-radio" />
          <div>
            <p className="pay-label">Card via Stripe</p>
            <p className="pay-desc">Secure checkout</p>
          </div>
        </div>
      </div>

      {error && <p className="pp-error">{error}</p>}

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