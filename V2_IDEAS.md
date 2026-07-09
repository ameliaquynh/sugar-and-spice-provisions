# Sugar & Spice Provisions — V2.0 Ideas

Running list, will become the v2.0 handoff prompt once the brainstorm is done.

## Claude's suggestions
- Ordering flow: let people pick items directly off the menu (checkboxes/quantities) instead of typing free text
- Order scheduling: define a real order-by/pickup cadence (e.g. "order by Thursday for weekend pickup") and show it on the site
- Trust-building: FAQ (delivery area, lead time, allergen/cottage-food disclaimer) + a "How It Works" 1-2-3 strip
- Real content: real photos, Instagram handle, Venmo, Formspree ID (swap out placeholders)
- Polish: favicon/logo mark, social preview image (Open Graph) for link sharing, background music toggle
- Personal touch: "Meet the Baker" bio section with photos of Millie & Mom

## Millie's ideas
- Admin content tools — an easy way for Mom/Millie to update what's available without touching code or GitHub
- Shopping cart — customers add items from the menu, see what's in their cart, adjust quantities/remove items, and see a running total before submitting the order. (Ties into the "pick items off the menu" idea above — the cart becomes the ordering mechanism, then feeds into the Order page/form on checkout. Still no real payment processing — total is just informational, payment stays Venmo/cash per the existing plan.)

## From researching other ordering sites
- Pickup **time slots** — instead of free-text "preferred time," let customers pick from actual available windows
- **Category filters** on the Menu page (Cookies / Breads / Cakes) so browsing is faster
- **Customer Favorite** badges on top-selling items once we know what sells
- **Reviews/testimonials** section (customer name, what they ordered, maybe a photo) once there are real customers — big trust builder
- **Special instructions per item** in the cart (e.g. "no frosting," gift note) — pairs with the shopping cart idea
- If we ever charge a delivery fee, show it **up front** in the cart, not as a surprise at the end — hidden fees are the #1 reason people abandon online orders
- Confirmed mobile-first is critical — most bakery site visits happen on phones, so v2.0 needs a solid mobile pass

**Deliberately skipping** (too much for this project's scope): customer accounts/login, real-time online payment (Stripe/Apple Pay), live order-tracking dashboards. Big platforms like Uber Eats do this, but it adds real complexity/cost we don't need — Formspree + Venmo/cash stays the plan.

## Open questions
- **How should the admin tool work?**
  - *Google Sheet as the menu source* — Mom edits it like a spreadsheet, site reads from it live. No login needed, easiest for a non-coder.
  - *Password-protected admin page on the site* — add/edit/remove items, toggle sold out, upload photos, all in a real dashboard. More polished, more to build.
  - Decide based on: how comfortable is Mom with spreadsheets vs. wanting a "real app" feel?
- **Photo hosting for the Google Sheet approach:**
  - *Google Drive links* (leaning this way for v1) — upload to a shared Drive folder, get shareable link, convert to `https://lh3.googleusercontent.com/d/FILE_ID`, paste into sheet. No new accounts, but can be occasionally flaky.
  - *Cloudinary* — free, built for hotlinking + auto-optimizes images. More reliable, one more account to manage. Good upgrade path later.

*(Keep adding below as more ideas come in.)*
