# Sugar & Spice Provisions

The website for Sugar & Spice Provisions — a mom-and-daughter home bakery. Built with Next.js and Tailwind CSS, deployed on Vercel.

## Updating the menu

All menu items live in [`data/menu.json`](data/menu.json). To add, remove, or change an item:

1. Edit `data/menu.json`. Each item looks like this:
   ```json
   {
     "id": "choc-chip-cookies",
     "name": "Classic Chocolate Chip Cookies",
     "description": "Soft-baked, gooey in the middle.",
     "price": "$3 each / $15 dozen",
     "photo": "/images/menu/choc-chip-cookies.jpg",
     "ingredients": ["flour", "butter", "eggs"],
     "allergens": ["gluten", "dairy", "eggs"],
     "category": "Cookies",
     "available": true
   }
   ```
   - Set `"available": false` to gray out a sold-out item without deleting it.
   - `allergens` shows as a "Contains: ..." tag on the card.
2. To add a real photo, drop the image file into `public/images/menu/` and point `photo` at it, e.g. `/images/menu/your-file.jpg`. (The three sample items currently use placeholder `.svg` graphics — swap those out for real `.jpg`/`.png` photos whenever you're ready.)
3. Commit and push to `main` — Vercel automatically redeploys the site with your changes, usually within a minute or two.

No code changes needed for any of this.

## Before taking real orders

Two placeholder values need to be filled in with real ones, both in [`lib/siteConfig.js`](lib/siteConfig.js):

```js
export const FORMSPREE_FORM_ID = "your-form-id";
export const VENMO_HANDLE = "@your-venmo-handle";
```

- **Formspree ID:** sign up for a free account at [formspree.io](https://formspree.io), create a new form, and copy the form ID into `FORMSPREE_FORM_ID`. This is what makes the Order page's "Submit Order" button actually email the order — until this is set, submissions will fail.
- **Venmo handle:** replace `VENMO_HANDLE` with the real handle. It's shown on the order confirmation message after someone submits the form.

See [SPEC.md](SPEC.md) Section 7 for the other open items before launch (real photos, delivery radius, cottage food law check, etc).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- Google Fonts: Playfair Display + Nunito Sans
- [Formspree](https://formspree.io) for the order form
- Hosted on [Vercel](https://vercel.com)
