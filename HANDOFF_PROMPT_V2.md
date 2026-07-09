Work only inside this `Sugar & Spice` folder (the repo you're already in). Don't touch sibling project folders in Builds, like `Would You Rather`.

This is a **v2.0 upgrade** to the live Sugar & Spice Provisions site (https://sugar-and-spice-provisions.vercel.app/). Build on top of the existing Next.js app — don't start over. `SPEC.md` has the original v1 spec for background; `PROJECT_OVERVIEW.html` has the full roadmap. This prompt covers **Phase 1 only** — the 8 features below. Everything in Phase 2 on that roadmap (FAQ, reviews, favorite badges, delivery fee display, favicon/social image, background music, Meet the Baker bio) is explicitly **out of scope** for this build — leave it out.

Build these features, end to end:

**1. Shopping Cart**
- Add-to-cart button on each menu item (Menu page), with a quantity stepper.
- A cart drawer/panel (opens from a cart icon in the nav, shows item count) listing everything added: item name, quantity, an optional per-item special instructions field (e.g. "no frosting"), and a running subtotal. This total is informational only — no real payment processing, it just sums prices from the menu data.
- Ability to change quantity or remove an item from the cart.
- A "Checkout" button in the cart takes the user to the Order page with the cart contents pre-filled into the order form, so they don't have to retype what they picked.
- Cart should persist across page navigation (React state is fine; localStorage is fine too since this is a real deployed site, not a sandboxed preview).

**2. Admin Tools — Google Sheet as the menu source**
- Menu data should be able to load from a published Google Sheet (File → Share → Publish to web → CSV) so Mom/Millie can add, edit, or remove items and toggle availability without touching code.
- Read the CSV from an environment variable, e.g. `MENU_SHEET_CSV_URL`. If that env var isn't set, fall back to the existing local `/data/menu.json` so the build never breaks while the Sheet isn't set up yet.
- Sheet columns should match the existing schema: `id, name, description, price, category, ingredients, allergens, photo, available`. Document the exact expected column headers in the README so the Sheet gets built correctly.
- Refresh this data periodically (e.g. Next.js ISR with a short revalidate window like 5 minutes) so Sheet edits show up on the live site without needing a redeploy.
- Photos: expect Google Drive share links converted to `https://lh3.googleusercontent.com/d/FILE_ID` format in the `photo` column — document this with an example in the README.

**3. Pickup Time Slots**
- Replace the free-text "preferred pickup time" field in the Order form with a dropdown of real time slots.
- Slots should live in one config location (see #6) — not hardcoded in multiple places — so they're easy to update.

**4. Order Scheduling**
- Add a short, visible note near the top of the Menu and Order pages showing the current order-by/pickup cadence (e.g. "Order by Thursday for weekend pickup"). Pull this text from the same config file (#6) so it's a one-line edit.

**5. Menu Category Filters**
- Add filter pills above the menu grid (e.g. All / Cookies / Breads / Cakes), auto-generated from whatever categories actually exist in the menu data — don't hardcode the category list.
- Clicking a filter shows only that category; "All" shows everything.

**6. Real Content — make it swappable**
- Consolidate site-wide editable values into one `siteConfig` file/object, clearly commented: business tagline, Instagram handle, Venmo handle, Formspree form ID, contact email, order cadence text, pickup time slots. One place for Mom/Millie to find and update all of it instead of hunting through code.
- Keep current placeholder photos/values as sensible defaults until real ones are swapped in.

**7. Mobile Pass**
- Full responsive check: nav collapses cleanly on small screens, the cart drawer is usable and doesn't overflow on mobile, tap targets (buttons, filter pills) are big enough to tap comfortably, images scale properly, no horizontal scrolling anywhere.

**8. Wrap-up**
- Keep the existing design system (colors/fonts from SPEC.md) consistent across all new UI.
- Commit incrementally with clear messages as each feature is finished, and push to the existing GitHub repo (`sugar-and-spice-provisions`) on `main`.
- Confirm Vercel auto-deploys successfully after pushing.
- Update the README with: how to update the Google Sheet menu (column format + photo link format), where `siteConfig` lives and what to edit there, and a list of remaining placeholder values that still need real ones (Venmo handle, Instagram handle, Formspree ID, Google Sheet URL).

I'm 11 and this is my website — if you hit something that needs my or my mom's input (like us needing to actually go create the Google Sheet or a Formspree account before you can finish wiring it up), stop and ask in plain language instead of guessing.
