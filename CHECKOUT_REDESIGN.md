Work only inside this `Sugar & Spice` folder.

The cart itself is good and should stay as-is. But checkout is weak: right now clicking "Checkout" just dumps the cart into a plain free-text textarea on the Order page ("2x Classic Chocolate Chip Cookies..."). It should be a real checkout screen instead.

**Redesign the top of the Order page (`app/order/page.js` / `components/OrderForm.js`) into a proper order summary:**

1. When the cart (`context/CartContext.js`) has items, show a structured **Order Summary** section at the top of the Order page — not a text blob. For each item show: name, unit price, a quantity stepper (+/-) that live-updates the actual cart via `useCart()`, an optional per-item special instructions field (carry over what's already in the cart), a line total, and a remove (×) button. Below the list, show the subtotal clearly labeled "informational only — payment arranged via Venmo/cash," matching the existing subtotal logic in `lib/cart.js` / `lib/parsePrice.js`.

2. Add a small link/button near the summary back to the Menu page (e.g. "Add more items") so people can go add something without losing their place.

3. Replace the current free-text "What would you like to order?" textarea with this structured summary **whenever the cart has items**. If the cart is empty, keep a free-text field as a fallback so someone can still describe an order without using the cart at all (don't force everyone through the cart).

4. The actual Formspree submission still needs a readable order description for Mom's inbox. When submitting with cart items, auto-generate that summary text from the structured cart data (reuse/extend `summarizeCartForOrder` in `lib/cart.js`) and send it as a hidden form field — the customer sees the polished itemized UI, Mom still gets a clear readable order by email.

5. Quantity changes and removals on this Order page summary should update the same cart state used everywhere else (nav badge, Menu page "Add to Cart" buttons) — it's one shared cart, just displayed properly here instead of as text.

6. Keep the cart drawer on the Menu page as-is for quick add-to-cart feedback — this change is specifically about how the Order page displays and lets people edit the cart at checkout time, not about removing the drawer.

7. Make sure it looks good on mobile — the summary list should stack cleanly, steppers and remove buttons need to stay easily tappable.

After it's done: commit with a clear message, push to `main`, and confirm Vercel deploys successfully. Take a screenshot of the new Order page with a couple of items in the cart so I can see it.
