"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/parsePrice";
import CartLineItem from "@/components/CartLineItem";

export default function OrderSummary() {
  const { items, updateQuantity, updateNotes, removeItem, subtotal } = useCart();

  if (items.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white shadow-[0_8px_24px_rgba(58,42,30,0.08)] p-6 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="eyebrow">Order Summary</h2>
        <Link
          href="/menu"
          className="text-xs text-cinnamon underline underline-offset-2"
        >
          Add more items
        </Link>
      </div>

      <ul className="flex flex-col gap-6">
        {items.map((item) => (
          <CartLineItem
            key={item.id}
            item={item}
            onQuantityChange={(qty) => updateQuantity(item.id, qty)}
            onNotesChange={(notes) => updateNotes(item.id, notes)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </ul>

      <div className="border-t border-gold/30 pt-4 mt-2 flex items-center justify-between">
        <span className="eyebrow">Subtotal</span>
        <span className="font-serif text-xl text-cinnamon">
          {formatPrice(subtotal)}
        </span>
      </div>
      <p className="text-xs text-espresso/60">
        Informational only — payment arranged via Venmo/cash.
      </p>
    </div>
  );
}
