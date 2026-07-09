"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function MenuCard({ item }) {
  const soldOut = !item.available;
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(item, qty);
    setQty(1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  }

  return (
    <div
      className={`rounded-2xl overflow-hidden bg-white shadow-[0_8px_24px_rgba(58,42,30,0.08)] flex flex-col ${
        soldOut ? "opacity-60" : ""
      }`}
    >
      <div className="relative aspect-[4/3] bg-blush/40">
        <Image
          src={item.photo}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover ${soldOut ? "grayscale" : ""}`}
        />
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-espresso/40">
            <span className="eyebrow bg-cream px-4 py-2 rounded-full text-espresso">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col gap-2 flex-1">
        <p className="eyebrow">{item.category}</p>
        <h3 className="font-serif text-xl leading-snug">{item.name}</h3>
        <p className="text-sm text-espresso/75 leading-relaxed flex-1">
          {item.description}
        </p>
        <p className="font-serif text-lg text-cinnamon mt-1">{item.price}</p>

        {item.allergens?.length > 0 && (
          <p className="text-xs text-espresso/60 mt-2">
            Contains: {item.allergens.join(", ")}
          </p>
        )}

        {!soldOut && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label={`Decrease quantity for ${item.name}`}
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border border-espresso/20 hover:border-cinnamon text-lg"
              >
                &minus;
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                aria-label={`Increase quantity for ${item.name}`}
                className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full border border-espresso/20 hover:border-cinnamon text-lg"
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={handleAdd}
              className="btn-pill w-full sm:w-auto sm:flex-1"
            >
              {justAdded ? "Added!" : "Add to Cart"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
