Work only inside this `Sugar & Spice` folder (the repo you're already in).

This is a quick follow-up pass on the v2.0 build, not a new feature build. Please check and fix these five things:

**1. Contact email**
The footer shows a placeholder: `hello@your-email.com`. Replace it site-wide with the real contact email: `ameliaquynh@gmail.com` (ask me first if a different email should be used instead).

**2. Formspree — confirm it's real, then test it**
Check whether the Order form is wired to a real Formspree form ID or still a placeholder. If it's still a placeholder, tell me exactly what steps I need to take to get a real Formspree account + form ID, then wire it in once I give it to you. Either way, once it's confirmed real, walk me through submitting one actual test order so we can verify it lands in an inbox.

**3. Google Sheet admin tool — status check**
Tell me plainly whether this got built in the last pass or not.
- If yes: give me the exact column headers expected and the steps to publish a Google Sheet as CSV, so I can go set up the real Sheet.
- If no: build it now, per section 2 of `HANDOFF_PROMPT_V2.md` in this folder.

**4. Placeholder audit**
Give me a full list of every remaining placeholder value on the live site right now (photos, Instagram handle, Venmo handle, any other fake text) so I know exactly what still needs real content.

**5. Mobile check**
Test the cart drawer, category filters, and nav at a small screen width. Fix anything that overflows, is too small to tap, or breaks.

Don't add any new features or touch anything outside these five items — this is a fix/confirm pass, not a build pass. If anything needs my input, ask in plain language.
