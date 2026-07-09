"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { parsePrice } from "@/lib/parsePrice";

const CartContext = createContext(null);
const STORAGE_KEY = "sugarAndSpiceCart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  // Belt-and-suspenders close: whichever link or button sent the user to a
  // new page (Checkout, a nav link, browser back/forward), the drawer
  // should never still be covering the page they land on. Adjusting state
  // during render (rather than in an effect) closes it in the same render
  // pass as the navigation, so there's no visible frame where it's still
  // open on the new page.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  useEffect(() => {
    // Reading localStorage during render would crash on the server and
    // mismatch what the client hydrates with, so this has to happen in an
    // effect (client-only, after the initial render matches the server).
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed/unavailable storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore storage write failures (e.g. private browsing)
    }
  }, [items, hydrated]);

  const addItem = useCallback((menuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === menuItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity,
          notes: "",
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((id, quantity) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.id !== id)
        : prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const updateNotes = useCallback((id, notes) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, notes } : item))
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + parsePrice(item.price) * item.quantity,
        0
      ),
    [items]
  );

  const value = {
    items,
    isOpen,
    setIsOpen,
    hydrated,
    addItem,
    updateQuantity,
    updateNotes,
    removeItem,
    clearCart,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
