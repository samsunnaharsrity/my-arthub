"use client"

import { createPurchase } from "@/lib/actions/purchase";
import { useState } from "react";
import toast from "react-hot-toast";

export default function PurchaseForm({ artworkId, userName }) {
  const [shipping, setShipping] = useState({
    name: userName || "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateField = (field, value) => {
    setShipping((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) setError(null);
  };

  const handleConfirm = async () => {
    if (
      !shipping.name.trim() ||
      !shipping.address.trim() ||
      !shipping.city.trim()
    ) {
      setError(
        "Please fill in your name, address, and city before continuing."
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await createPurchase({
        artworkId,
        shipping,
      });

      if (result?.success) {
        toast.success("Purchase completed");

        // success page e redirect
        window.location.href = "/dashboard/my-purchases";
      } else {
        setError(result?.message || "Purchase failed");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
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

      <div className="pp-section">
        <p className="pp-section-label">Payment method</p>
        <div className="pay-options">
          <div className="pay-option selected">
            <span className="pay-radio" />
            <div>
              <p className="pay-label">Card via Stripe</p>
              <p className="pay-desc">You'll enter your card details securely on Stripe's checkout page</p>
            </div>
          </div>
        </div>
      </div>

      {error && <p className="pp-error">{error}</p>}

      <button className="btn-confirm" onClick={handleConfirm} disabled={loading}>
        {loading ? "Starting checkout…" : "Confirm purchase"}
      </button>
    </>
  );
}