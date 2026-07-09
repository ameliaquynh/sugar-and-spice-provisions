"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { parsePrice, formatPrice } from "@/lib/parsePrice";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, updateNotes, removeItem, subtotal } =
    useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-espresso/40 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed right-0 top-0 z-[60] h-full w-full sm:w-96 bg-cream shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-gold/30">
          <h2 className="font-serif text-xl">Your Cart</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
            className="w-10 h-10 flex items-center justify-center text-espresso/70 hover:text-espresso"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M1 1L19 19M19 1L1 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4">
              <p className="text-espresso/60">
                Your cart is empty. Add something tasty from the menu!
              </p>
              <Link
                href="/menu"
                onClick={() => setIsOpen(false)}
                className="eyebrow text-cinnamon border-b border-cinnamon pb-1"
              >
                See the Menu
              </Link>
            </div>
          ) : (
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
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gold/30 px-6 py-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="eyebrow">Subtotal</span>
              <span className="font-serif text-xl text-cinnamon">
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-xs text-espresso/60">
              Informational only — payment is Venmo or cash, arranged when we
              confirm your order.
            </p>
            <Link
              href="/order"
              onClick={() => setIsOpen(false)}
              className="btn-pill w-full"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}

function CartLineItem({ item, onQuantityChange, onNotesChange, onRemove }) {
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
