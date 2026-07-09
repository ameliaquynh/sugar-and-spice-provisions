"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/order", label: "Order" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-gold/30">
      <div className="mx-auto max-w-6xl px-6 flex items-center justify-between h-20">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-serif text-lg sm:text-xl md:text-2xl tracking-wide whitespace-nowrap"
        >
          <span className="sm:hidden">Sugar &amp; Spice</span>
          <span className="hidden sm:inline">Sugar &amp; Spice Provisions</span>
        </Link>

        <div className="flex items-center gap-2">
          <nav className="hidden md:flex items-center gap-10 mr-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="eyebrow tracking-[0.18em] hover:opacity-70 transition-opacity"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <CartButton />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10"
          >
            <span
              className={`block h-[2px] w-6 bg-espresso transition-transform ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-espresso transition-opacity ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[2px] w-6 bg-espresso transition-transform ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-gold/30 bg-cream px-6 py-6 flex flex-col gap-5">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="eyebrow text-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

function CartButton() {
  const { itemCount, setIsOpen } = useCart();

  return (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      aria-label={`Open cart${itemCount > 0 ? ` (${itemCount} items)` : ""}`}
      className="relative w-10 h-10 flex items-center justify-center text-espresso hover:opacity-70 transition-opacity"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M4 7h14l-1.2 10.2a2 2 0 0 1-2 1.8H7.2a2 2 0 0 1-2-1.8L4 7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 7V5.5a3.5 3.5 0 1 1 7 0V7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-cinnamon text-cream text-[10px] font-bold flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  );
}
