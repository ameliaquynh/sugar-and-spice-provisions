Work only inside this `Sugar & Spice` folder.

Two bugs found during a live QA pass in Chrome. Fix both — nothing else.

**1. Home page hero text overlap (visible bug, high priority)**
On the Home page (`app/page.js`), the hero section has a large decorative "Sugar & Spice Provisions" wordmark that overlaps directly on top of the "Mom & Millie: Baking Together" heading and the "hero photo coming soon" placeholder text. It reads as garbled, overlapping text — this is the first thing anyone sees on the site. Fix the layering/positioning so the wordmark (if kept at all) sits clearly behind everything with enough visual separation, or remove it if it's not adding anything now that there's a real heading. Take a screenshot after fixing to confirm the heading and subtext are cleanly readable with no overlap.

**2. Cart drawer doesn't close on checkout**
In the cart drawer (`components/CartDrawer.js` or wherever the Checkout button lives), clicking "Checkout" correctly navigates to the Order page with the cart pre-filled into the form — that part works. But the cart drawer itself stays open, overlapping the Order page. Make the drawer close automatically when Checkout is clicked.

Note: Formspree is still a placeholder — that's known and intentionally not being fixed right now, don't touch `siteConfig.js`'s `formspreeFormId`.

After both fixes: commit with a clear message and push to `main`. Confirm Vercel deploys successfully.
