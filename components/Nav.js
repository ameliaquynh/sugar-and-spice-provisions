"use client";

import Link from "next/link";
import { useState } from "react";

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
          className="font-serif text-xl md:text-2xl tracking-wide"
        >
          Sugar &amp; Spice Provisions
        </Link>

        <nav className="hidden md:flex items-center gap-10">
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
