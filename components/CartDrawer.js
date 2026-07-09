"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/parsePrice";
import CartLineItem from "@/components/CartLineItem";

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
