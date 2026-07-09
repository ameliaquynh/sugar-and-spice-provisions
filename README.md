# Sugar & Spice Provisions

The website for Sugar & Spice Provisions — a mom-and-daughter home bakery. Built with Next.js and Tailwind CSS, deployed on Vercel. Includes a shopping cart, a menu that can be edited from a Google Sheet, pickup time slots, and menu category filters.

## Updating the menu

There are two ways the menu gets its data — pick whichever is easier for you.

### Option A: Google Sheet (no code, recommended for day-to-day edits)

1. Make a Google Sheet with exactly these column headers in the first row:

   ```
   id, name, description, price, category, ingredients, allergens, photo, available
   ```

   One row per menu item. Notes on a few columns:
   - `id` — a short unique code like `choc-chip-cookies`. You can leave this blank and the site will generate one from the name automatically.
   - `ingredients` / `allergens` — type a plain comma-separated list in the cell, e.g. `flour, butter, eggs`.
   - `available` — type `TRUE` or `FALSE` (a checkbox column also works).
   - `photo` — see the photo instructions below.

2. In Google Sheets: **File → Share → Publish to web**. Choose the sheet, choose **Comma-separated values (.csv)** as the format, and click Publish. Copy the link it gives you.
3. In the Vercel project settings (Settings → Environment Variables), add:
   ```
   MENU_SHEET_CSV_URL = <the published CSV link>
   ```
   Redeploy once after adding it. After that, the site re-checks the Sheet automatically every 5 minutes — future edits to the Sheet show up on the live site with no redeploy needed.
4. **Photos:** upload the photo to a shared Google Drive folder, get its shareable link, pull out the file ID from that link, and paste it into the `photo` column in this format:
   ```
   https://lh3.googleusercontent.com/d/FILE_ID
   ```
   Example: if your Drive share link is `https://drive.google.com/file/d/1AbCdEfGhIjKlMnOp/view`, the file ID is `1AbCdEfGhIjKlMnOp`, so the `photo` column should contain `https://lh3.googleusercontent.com/d/1AbCdEfGhIjKlMnOp`.

If `MENU_SHEET_CSV_URL` isn't set yet, or the Sheet can't be reached for any reason, the site automatically falls back to the local file below — it will never break the site.

### Option B: Local file (for developers, or before the Sheet is set up)

Edit [`data/menu.json`](data/menu.json) directly, commit, and push to `main` — Vercel redeploys automatically. Each item looks like this:

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

To add a real photo this way, drop the image file into `public/images/menu/` and point `photo` at it, e.g. `/images/menu/your-file.jpg`.

Either way: `"available": false` grays out a sold-out item without deleting it, and whatever `category` values you use become the filter pills on the Menu page automatically.

## Site settings — `lib/siteConfig.js`

Everything else editable about the site lives in one file: [`lib/siteConfig.js`](lib/siteConfig.js). Open it and edit the values directly — each one has a comment explaining what it controls:

- `tagline` — the line shown on the Home page hero
- `instagramHandle` — shown in the footer
- `venmoHandle` — shown on the order confirmation message
- `formspreeFormId` — makes the Order form actually send orders (see below)
- `contactEmail` — shown in the footer
- `orderCadence` — the banner shown near the top of the Menu and Order pages (e.g. "Order by Thursday for weekend pickup")
- `pickupTimeSlots` — the list of options in the Order page's pickup time dropdown

After editing, commit and push — Vercel redeploys automatically.

## Remaining placeholders before real orders

These still need real values:

| What | Where | Why it matters |
|---|---|---|
| Formspree form ID | `lib/siteConfig.js` → `formspreeFormId` | Sign up free at [formspree.io](https://formspree.io), create a form, paste the ID here. Until it's real, the Order form can't send orders. |
| Venmo handle | `lib/siteConfig.js` → `venmoHandle` | Shown on the order confirmation message. |
| Instagram handle | `lib/siteConfig.js` → `instagramHandle` | Shown in the footer. |
| Google Sheet CSV URL | Vercel env var `MENU_SHEET_CSV_URL` | Only needed if you want to manage the menu from a Sheet instead of editing `data/menu.json` directly — see Option A above. |

See [SPEC.md](SPEC.md) Section 7 for other pre-launch items (real photos, delivery radius, a quick check of your state/county's cottage food laws).

## How the shopping cart works

Customers can add items from the Menu page with a quantity stepper. The cart icon in the nav opens a slide-out drawer showing everything added, where quantities can be changed, items removed, and special instructions typed per item. The subtotal shown is informational only — there's no real payment processing; the "Checkout" button takes the customer to the Order page with their cart contents already filled into the order text field, ready to submit. The cart is saved in the browser (localStorage) so it survives page navigation and reloads.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech stack

- [Next.js](https://nextjs.org) (App Router, ISR for the Sheet-based menu)
- [Tailwind CSS](https://tailwindcss.com)
- Google Fonts: Playfair Display + Nunito Sans
- [Formspree](https://formspree.io) for the order form
- [PapaParse](https://www.papaparse.com) for reading the Google Sheet CSV
- Hosted on [Vercel](https://vercel.com)
