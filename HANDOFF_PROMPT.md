Work only inside the `Sugar & Spice` folder (the folder you're running in right now, e.g. `~/Builds/Sugar & Spice`). My Builds folder has multiple separate website projects in it as sibling folders (e.g. `Would You Rather`) — each is its own independent git repo. Don't read, modify, or touch anything outside this `Sugar & Spice` folder.

I want you to build and deploy a website called "Sugar & Spice Provisions" — a mom-and-daughter home bakery ordering site. The full design/content spec is in `SPEC.md` in this folder — read it first and follow it closely.

Please do the following, end to end:

**1. Scaffold the app**
- Initialize a Next.js (App Router) project in this folder with Tailwind CSS.
- Add Google Fonts Playfair Display + Nunito Sans per the spec.
- Set up the Tailwind theme with the color palette in Section 2 of SPEC.md.

**2. Build the site**
- Build the shared nav + footer, and the four pages (Home, Menu, About, Order) per Section 3 of SPEC.md.
- Create `/data/menu.json` with 2–3 sample bakery items (placeholder photos are fine for now) per Section 4.
- Build the menu grid component that reads from `menu.json`, shows allergen tags, and grays out sold-out items.
- Build the Order page form per Section 5 (pickup/delivery branching, allergy notes). Wire it to Formspree — use a placeholder form ID (e.g. `your-form-id`) and clearly flag in a README/comment that I need to swap in my real Formspree form ID before taking real orders.
- Make sure everything is responsive (mobile nav collapses, menu grid goes to 1 column).

**3. Git + GitHub**
- Initialize a fresh git repo in this folder (this folder should be its own repo, separate from anything else in my Builds directory).
- Create a new **public** GitHub repo named `sugar-and-spice-provisions` under my account using the `gh` CLI.
- Commit everything and push to `main`.

**4. Vercel**
- Create a new Vercel project linked to this repo using the `vercel` CLI.
- Deploy it to production.
- Give me the live `.vercel.app` URL when done.

**5. Wrap up**
- Add a short README explaining how to update the menu (edit `data/menu.json`, commit, push — Vercel auto-deploys) and where to plug in the real Formspree ID and Venmo handle.
- List anything from Section 7 of SPEC.md ("Open items before launch") that's still outstanding.

I'm 11 and this is my first website, so if you hit a decision that needs my input, just ask me in plain language.
