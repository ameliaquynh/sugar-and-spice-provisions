"use client";

import { parsePrice, formatPrice } from "@/lib/parsePrice";

export default function CartLineItem({ item, onQuantityChange, onNotesChange, onRemove }) {
  const lineTotal = parsePrice(item.price) * item.quantity;

  return (
    <li className="flex flex-col gap-3 pb-6 border-b border-espresso/10 last:border-none">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-serif text-lg leading-snug">{item.name}</p>
          <p className="text-xs text-espresso/60">{item.price}</p>
        </div>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${item.name} from cart`}
          className="w-9 h-9 flex-shrink-0 flex items-center justify-center text-espresso/50 hover:text-cinnamon"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path
              d="M3 5h14M8 5V3.5A1.5 1.5 0 0 1 9.5 2h1A1.5 1.5 0 0 1 12 3.5V5m2 0v11a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 6 16V5h8Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onQuantityChange(item.quantity - 1)}
            aria-label="Decrease quantity"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-espresso/20 hover:border-cinnamon text-lg"
          >
            &minus;
          </button>
          <span className="w-8 text-center">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.quantity + 1)}
            aria-label="Increase quantity"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-espresso/20 hover:border-cinnamon text-lg"
          >
            +
          </button>
        </div>
        <span className="text-sm font-semibold">{formatPrice(lineTotal)}</span>
      </div>

      <input
        type="text"
        value={item.notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Special instructions (e.g. no frosting)"
        className="rounded-lg border border-espresso/20 bg-white px-3 py-2 text-sm placeholder:text-espresso/40 focus:outline-none focus:border-cinnamon"
      />
    </li>
  );
}
