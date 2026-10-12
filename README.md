# OCIX Landing Page

The official parent product studio site for OCIX. It presents Vigilante as the live product and DraftShield/GymX as in-development experiments.

## Tech Stack
- **Framework:** React + Vite
- **Styling:** Tailwind CSS
- **Animations:** Motion (Framer Motion)
- **Forms:** Formspree (`@formspree/react`)

## Running the Code

1. Install all dependencies:
   ```bash
   npm i
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

## Integrations

The site intentionally has no waitlist or beta form. DraftShield and GymX have no public URLs or signup CTAs until an owned consent and follow-up process exists.

## Production pages and articles

`npm run build` renders every page to HTML with React at build time. Production pages use native links and disclosure controls without React hydration; analytics loads after the page load event. Space Grotesk is self-hosted with `font-display: optional` to prevent late font swaps from moving article text.

Articles live in `src/content/blog/<slug>.md`, with JSON front matter (`title`, `description`, `publishedAt`, `author`, `status: "published"`). Draft filenames ending in `.draft.md` are excluded. Publishing fails if editorial comments or unresolved `[FOUNDER]`, `[CHECK]`, `[SHOT]`, `[ASK]` or similar markers remain. Run `npm run build` and then `npm run test:unit` before release.
