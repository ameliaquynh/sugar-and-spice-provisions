# Sugar & Spice Provisions — Website Spec

A mom-and-daughter home bakery site. Millie and her mom post what they've made, and people order for pickup or delivery.

This doc is written to be handed directly to Claude Code to build and deploy.

---

## 1. Tech Stack

| Piece | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router) | Great Vercel support, simple file-based pages |
| Styling | Tailwind CSS | Fast to build, easy to theme with the palette below |
| Fonts | Google Fonts: **Playfair Display** (headings) + **Nunito Sans** (body) | Elegant + friendly combo |
| Order form | Formspree (free tier) | No backend/email server needed — form posts straight to Formspree, which emails Mom |
| Menu content | A single JSON file in the repo | Editable without touching code |
| Hosting | Vercel | Already connected |
| Repo | GitHub (new repo, e.g. `sugar-and-spice-provisions`) | Already connected |

**Note for Mom:** since this involves selling food to people outside the family, it's worth a quick check of your state/county's cottage food laws before taking real orders. Not a website problem — just a "before you launch" to-do.

---

## 2. Design System

Inspired by the elegant, editorial feel of thesantaluzclub.com (full-bleed photography, generous white space, thin gold rules, small uppercase eyebrow text, serif headlines) — warmed up for a home bakery instead of a country club.

### Palette
| Name | Hex | Use |
|---|---|---|
| Cream (background) | `#FBF6EC` | Page background |
| Espresso (text) | `#3A2A1E` | Body copy, headings |
| Cinnamon (primary accent — "Spice") | `#C1633D` | Buttons, links, dividers |
| Blush (secondary accent — "Sugar") | `#EFC6C0` | Highlights, tags, card backgrounds |
| Gold hairline | `#D4A537` | Thin decorative divider rules between sections |

### Typography
- **Headings:** Playfair Display, serif, generous size, occasionally italic for subheads (e.g. *"Fresh From Our Kitchen"*)
- **Eyebrow labels:** Nunito Sans, small caps, letter-spaced (e.g. `THIS WEEK'S MENU`)
- **Body:** Nunito Sans, regular weight, comfortable line height

### Layout patterns
- Full-bleed hero photo (Millie + Mom baking, or a hero dish) with centered logo mark and a single CTA button ("See This Week's Menu")
- Thin gold hairline rules separating major sections
- Alternating image/text sections with generous white space (no clutter)
- Menu items shown as soft-shadowed rounded cards in a responsive grid
- Buttons: rounded-pill, uppercase, letter-spaced, cinnamon fill with cream text
- Optional Instagram embed section near the footer ("Follow Along") if they have/want an account
- Simple sticky nav: logo left, 4 links right, becomes a hamburger menu on mobile

---

## 3. Sitemap

1. **Home** — hero, short story teaser, 3 featured menu items, CTA to full menu, footer
2. **Menu** — full grid of everything currently available
3. **About** — Mom & Millie's story: who they are, why they started, a couple of photos
4. **Order** — the order form + payment instructions shown after submitting

---

## 4. Menu Data (no-code editing)

All menu items live in one file: `/data/menu.json`. Mom or Millie edits this file (via GitHub's web editor, or by asking Claude Code to update it) and pushing to `main` auto-redeploys the site on Vercel — no code changes needed.

```json
[
  {
    "id": "choc-chip-cookies",
    "name": "Classic Chocolate Chip Cookies",
    "description": "Soft-baked, gooey in the middle, a family recipe.",
    "price": "$3 each / $15 dozen",
    "photo": "/images/menu/choc-chip-cookies.jpg",
    "ingredients": ["flour", "butter", "eggs", "brown sugar", "chocolate chips", "vanilla"],
    "allergens": ["gluten", "dairy", "eggs"],
    "category": "Cookies",
    "available": true
  }
]
```

Field notes:
- `allergens` — short list, shown as small tags on each card (e.g. "Contains: gluten, dairy, eggs") so people can check before ordering
- `available` — set to `false` to hide/gray-out a sold-out item without deleting it
- `photo` — Mom/Millie drop a photo into `/public/images/menu/` and reference the filename here

---

## 5. Order Form

Page: **Order**. Fields:

1. Name *(required)*
2. Email or phone *(required)*
3. What you'd like to order *(free text — item + quantity)*
4. Pickup or Delivery *(required, radio)*
   - If **Delivery** selected → show: delivery address, delivery notes (e.g. gate code, best time)
   - If **Pickup** selected → show: preferred pickup date/time
5. Allergies or dietary notes *(optional free text — "anything we should know?")*
6. Comments *(optional)*

**Submission:** posts to Formspree, which emails the order to Mom's inbox.

**After submitting:** show a confirmation message with payment instructions, e.g.:
> "Thanks! We'll confirm your order by email/text. Payment: Venmo @[handle] or cash on pickup/delivery."

(Venmo handle to be filled in by Mom before launch.)

---

## 6. Build Steps (for Claude Code)

1. Scaffold a Next.js + Tailwind app
2. Add Playfair Display + Nunito Sans via Google Fonts, configure Tailwind theme with the palette in Section 2
3. Build the shared nav + footer
4. Build Home, Menu, About, Order pages per Section 3
5. Create `/data/menu.json` with 2–3 sample items so the Menu page isn't empty at first
6. Build the Menu grid component reading from `menu.json`, rendering allergen tags and "sold out" state
7. Build the Order form wired to Formspree (placeholder form ID until Mom creates a free Formspree account)
8. Responsive check (mobile nav, grid collapses to 1 column)
9. Init git repo → push to a new GitHub repo → connect to Vercel → deploy
10. Share the live `.vercel.app` URL; custom domain can be added later if wanted

---

## 7. Open items before launch
- Real photos of the food (placeholders okay for first deploy)
- Mom's Venmo handle / preferred payment note
- Formspree account + form ID
- Final decision on delivery radius / pickup location, if any
