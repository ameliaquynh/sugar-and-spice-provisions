"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/siteConfig";
import { useCart } from "@/context/CartContext";
import { summarizeCartForOrder } from "@/lib/cart";
import { formatPrice } from "@/lib/parsePrice";

const FORMSPREE_ENDPOINT = `https://formspree.io/f/${siteConfig.formspreeFormId}`;

export default function OrderForm() {
  const [fulfillment, setFulfillment] = useState("pickup");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const { items: cartItems, subtotal, hydrated, clearCart } = useCart();

  const [orderText, setOrderText] = useState("");
  const [prefilledFromHydration, setPrefilledFromHydration] = useState(false);

  // The cart loads from localStorage a moment after mount (see
  // CartContext), so the first render or two still show hydrated=false.
  // Once it flips to true, adjust orderText right here during render —
  // React re-renders immediately rather than committing an extra effect
  // pass — but only the first time, so it never overwrites later typing.
  if (hydrated && !prefilledFromHydration) {
    setPrefilledFromHydration(true);
    if (cartItems.length > 0) {
      setOrderText(summarizeCartForOrder(cartItems));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
        setFulfillment("pickup");
        clearCart();
        setOrderText("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-blush/40 p-8 text-center">
        <h2 className="font-serif text-2xl mb-4">Thank you!</h2>
        <p className="text-espresso/80 leading-relaxed">
          We&rsquo;ll confirm your order by email or text. Payment: Venmo{" "}
          <span className="font-semibold">{siteConfig.venmoHandle}</span> or
          cash on pickup/delivery.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <Field label="Name" name="name" required />
      <Field
        label="Email or phone"
        name="contact"
        required
        placeholder="How should we reach you?"
      />

      <div className="flex flex-col gap-2">
        {cartItems.length > 0 && (
          <p className="text-xs text-espresso/60">
            Prefilled from your cart &middot; Subtotal:{" "}
            {formatPrice(subtotal)} (informational only)
          </p>
        )}
        <TextArea
          key={orderText}
          label="What would you like to order?"
          name="order"
          required
          defaultValue={orderText}
          placeholder="e.g. 1 dozen chocolate chip cookies"
        />
      </div>

      <fieldset>
        <legend className="eyebrow mb-3">Pickup or Delivery</legend>
        <div className="flex gap-8">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="fulfillment"
              value="pickup"
              checked={fulfillment === "pickup"}
              onChange={() => setFulfillment("pickup")}
              className="accent-cinnamon"
            />
            Pickup
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="fulfillment"
              value="delivery"
              checked={fulfillment === "delivery"}
              onChange={() => setFulfillment("delivery")}
              className="accent-cinnamon"
            />
            Delivery
          </label>
        </div>
      </fieldset>

      {fulfillment === "delivery" ? (
        <>
          <Field
            label="Delivery address"
            name="deliveryAddress"
            required
            placeholder="Where should we bring it?"
          />
          <TextArea
            label="Delivery notes"
            name="deliveryNotes"
            placeholder="Gate code, best time, anything else that helps"
          />
        </>
      ) : (
        <Select
          label="Preferred pickup time"
          name="pickupTime"
          required
          options={siteConfig.pickupTimeSlots}
        />
      )}

      <TextArea
        label="Allergies or dietary notes"
        name="allergies"
        placeholder="Anything we should know?"
      />

      <TextArea label="Comments" name="comments" />

      {status === "error" && (
        <p className="text-sm text-cinnamon">
          Something went wrong sending your order. Please try again, or reach
          out to us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-pill self-start mt-2"
      >
        {status === "submitting" ? "Sending..." : "Submit Order"}
      </button>
    </form>
  );
}

function Field({ label, name, required, placeholder }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type="text"
        name={name}
        required={required}
        placeholder={placeholder}
        className="rounded-lg border border-espresso/20 bg-white px-4 py-3 text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-cinnamon"
      />
    </label>
  );
}

function TextArea({ label, name, required, placeholder, defaultValue }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow">
        {label}
        {required ? " *" : ""}
      </span>
      <textarea
        name={name}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        rows={3}
        className="rounded-lg border border-espresso/20 bg-white px-4 py-3 text-espresso placeholder:text-espresso/40 focus:outline-none focus:border-cinnamon resize-y"
      />
    </label>
  );
}

function Select({ label, name, required, options }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="eyebrow">
        {label}
        {required ? " *" : ""}
      </span>
      <select
        name={name}
        required={required}
        defaultValue=""
        className="rounded-lg border border-espresso/20 bg-white px-4 py-3 text-espresso focus:outline-none focus:border-cinnamon"
      >
        <option value="" disabled>
          Choose a pickup time
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
