# Codex Sol 6.1 — implement the OCIX "Kitchen" redesign

You are redesigning the OCIX website (this repo: React + Vite, statically prerendered by `scripts/build.mjs`). The approved design turns OCIX into **a small software kitchen**: Chef OCIX (a 3D robot mascot) cooks products. A finished product is a **served dish**; an unfinished one is **still cooking**. The look is **soft 3D clay renders + frosted glass + neumorphic surfaces + chunky "pop-out" 3D buttons**, on a pale lilac wall, using the colours of the OCIX logo.

Everything you need is in `design/kitchen/`:

| Path | What it is |
|---|---|
| `mockups/*.dc.html` | The approved mockups (HTML with inline styles). **Treat them as the visual spec**: copy exact colours, sizes, radii, shadows, copy and layout. They need a design-canvas runtime to render, so read them as markup. Ignore `<x-dc>`, `<helmet>`, `<script type="text/x-dc">` and `{{…}}` wrappers. |
| `mockups/Main.dc.html` | Home: one screen, the kitchen scene with glass hotspot labels |
| `mockups/Mobile.dc.html` | Home on a phone |
| `mockups/Vigilante.dc.html` | A served product page |
| `mockups/Cooking.dc.html` | A still-cooking product page (DraftShield shown; GymX and Do It! follow the same template) |
| `mockups/System.dc.html` | Identity sheet: materials, colours, the object→page map, motion rules |
| `blender/kitchen.py` | The Blender 4.5 script that built every 3D render (procedural, no external assets) |
| `renders/*.png` | Draft renders made by that script (the kitchen scene, pot, cloche, chef, dough, popcorn) |

Read every mockup and `kitchen.py` before writing code.

---

## 1. Non-negotiable constraints (the existing tests enforce most of these)

Run `npm run build && npm run test:unit` and keep them green. **Do not weaken, skip or delete any test.**

- **No React hydration, and under 10 KB of JS in total** (`tests/publication-and-performance.test.mjs`). Pages stay static HTML. So: **no three.js, no WebGL, no animation libraries in the browser.** The 3D look comes from pre-rendered Blender images, plus CSS animation and at most a few hundred bytes of vanilla JS.
- **Fonts are self-hosted.** No `fonts.googleapis.com`. Use `font-display: optional`, and keep a `<link rel="preload" as="font">` in `index.html`. Replace Space Grotesk with:
  - **Fraunces**, variable, with the `opsz`, `wght` and **`SOFT`** axes plus italic (display; always use `font-variation-settings: 'SOFT' 100`)
  - **Geist** 400/500/600 (UI and body text)
  - **Geist Mono** 400/500 (tickets, status labels, meta text)

  Subset each to Latin and ship it as woff2 under `public/assets/fonts/`. Add their licences to `public/assets/fonts/OFL.txt` and `ATTRIBUTIONS.md`.
- Every route keeps **exactly one `<h1>`**, unique title and description, a canonical URL and og:url, and **more than 100 words of real visible text inside `<main id="main">`**. Hiding text with `display:none` or off-screen tricks to pass the word count is not allowed.
- Keep `aria-label="Primary navigation"` and `aria-label="Footer navigation"` on the nav elements. Every internal link must resolve to a built page.
- DraftShield, GymX and Do It! pages must still contain the exact phrase **`In development, not yet available`**. They also get **no waitlist, signup form or email capture** (see README).
- `dist/assets/ocix-logo.webp` stays under 12 KB. `ocix-logo-transparent.png` must **not** be referenced from built HTML. Make optimised logo derivatives instead (see §4).
- Keep all existing page text (about, product details, verification and access, recovery, tools, contact, privacy, terms, blog articles). It moves into the new layout. Do not delete it.
- Keep the consent script, GTM noscript, analytics loading, JSON-LD, sitemap, robots, ads.txt and the article pipeline exactly as they work today.
- Respect `prefers-reduced-motion: reduce`: every loop stops, and transitions become instant.
- Stay WCAG AA: text contrast at least 4.5:1 (3:1 at 24px and up), visible focus rings, real `<a>`/`<button>` elements, and touch targets of at least 44px.

## 2. Design tokens (put them in `src/styles/theme.css` as CSS custom properties)

```
--wall:        #ECE8F3   page background (flat; neumorphism needs a flat ground)
--ink:         #27245A   OCIX navy, from the logo; all primary text
--ink-2:       #3F3C6E   body text      --ink-3: #4B4878   secondary
--meta:        #6B6894   mono labels    (check contrast; darken if a label fails AA)
--italic:      #5B4FC4   the italic second line of every headline
--teal:        #2EC4B6   served / open / live
--violet:      #7B4FD6   --magenta: #E0457B   --amber: #F2A93B (heat, primary CTA)
--stamp:       #B4531A   "Served" text on glass
--paper:       #FFFDF8
```

Three materials. Each has its own job, so don't mix them up:

1. **Clay (neumorphic):** kitchen surfaces. Use it for the header logo pill, the nav pill, back buttons, the hob discs behind 3D objects, step tiles, tasting tiles and the dish switcher.
   `background: linear-gradient(145deg,#F7F5FB,#E2DDEB); box-shadow: 8px 8px 18px rgba(39,36,90,.16), -8px -8px 18px rgba(255,255,255,.95);`
   Pressed/inset state: `background:#E9E5F0; box-shadow: inset 4px 4px 9px rgba(39,36,90,.16), inset -4px -4px 9px rgba(255,255,255,.95);`
2. **Glass:** anything floating over the 3D scene. Use it for hotspot labels, the intro card, recipe cards, status chips and the phone's "served" dock.
   `background: rgba(255,255,255,.42); backdrop-filter: blur(16px) saturate(170%); border: 1px solid rgba(255,255,255,.75); box-shadow: 0 18px 40px -18px rgba(39,36,90,.35), inset 0 1px 0 rgba(255,255,255,.9);`
   Add an `@supports not (backdrop-filter: blur(1px))` fallback of `rgba(255,255,255,.85)`.
3. **Pop (3D buttons):** actions only. Navy: `linear-gradient(#3D3988,#27245A)` with `box-shadow: 0 5px 0 #15133A, 0 12px 18px -6px rgba(39,36,90,.55), inset 0 1px 0 rgba(255,255,255,.25)`. On hover it rises 2px and the base grows to 7px. On `:active` it sinks 4px and the base shrinks to 1px.
   The amber variant (the main CTA, e.g. "Lift the lid") uses `linear-gradient(#F7BE5C,#E8962A)` with a `#B86E14` base and navy text.

Radii: pills 999px, cards 22–28px, small tiles 12–18px. Headlines use Fraunces 500, letter-spacing −0.035 to −0.045em, line-height 0.9–0.95. The second line is italic 400 in `--italic`.

## 3. The language (use it consistently in nav, labels and copy)

Home is **the kitchen**, products are **the menu**, blog is **Recipes**, free tools are **Free tastings**, About is **The cook / Meet the cook**, Live is **Served**, and In development is **Still cooking**. Statuses per product: DraftShield is *Simmering*, GymX is *Proving* and Do It! is *Popping*. Body copy stays plain and short. The kitchen is the metaphor, so don't put a pun in every sentence. Reuse the mockup copy verbatim.

**Every object in the kitchen is a door:**
cloche → `/products/vigilante` · pot → `/products/draftshield` · dough bowl → `/products/gymx` · popcorn pan → `/products/do-it` · fridge → `/blog` · spice shelf → `/tools` · chef → `/about`.

## 4. 3D assets: rebuild them properly in Blender

`design/kitchen/blender/kitchen.py` is a working draft. Run it with:
`/Applications/Blender.app/Contents/MacOS/Blender -b --factory-startup -P design/kitchen/blender/kitchen.py -- <outdir> [--quick] [--only pot,cloche]`

Improve it, keep the same composition and colours, and commit the improved script plus its outputs:

- **Fix the shadows (the owner flagged this).** Renders must never show a hard-edged dark or grey rectangle around an object. Don't put a big shadow-catcher plane behind close-ups. Instead, bake a **soft radial contact shadow** that fades to fully transparent well inside the frame: a small catcher disc with a radial alpha falloff, or a separate blurred shadow PNG drawn with CSS. For the full kitchen scene, fade the floor shadow to zero before the left, right and bottom edges, so the image sits on any screen width with no visible seam.
- Polish the models, staying cute and clay-like. Give the chef's apron a small embroidered rainbow ring, and make the hat emblem match the logo ring (teal → violet → magenta → amber). Drape a real cloth over the dough. Give the fridge a frosted glass door with visible shelves. Make the steam softer (metaballs or volumetric puffs, not hard spheres).
- **Layered sprites for animation.** Besides the flat still, render separate transparent layers: pot body, pot lid, steam puffs, dough (proving), popcorn kernels, the cloche dome, and the chef's head (so it can turn toward a hovered object). CSS then animates these layers: the lid rattles, steam rises, the dough breathes, kernels pop, the cloche lifts slightly on hover, and the chef's head tilts.
- Optional, only if it stays light: a 2–3 s seamless loop of the pot steam as an animated AVIF/WebP of 300 KB or less, with a still poster image.
- **Outputs:** export AVIF plus a WebP fallback through `<picture>`, at 1× and 2×, with a mobile crop of the kitchen. Budgets: home hero 260 KB or less at desktop 1×, mobile hero 140 KB or less, each product hero 160 KB or less. Give every `<img>` explicit `width`/`height`. Preload the hero (replace the current Vigilante preload in `build.mjs`). Use `fetchpriority="high"` on the hero and lazy-load everything else.
- **Logo derivatives:** `ocix-logo.webp` (navy wordmark plus mark, under 12 KB) for the header pill. Also make a **mark-only** transparent webp/svg (the rainbow ring and arrow). It's used as the heat dial on still-cooking pages, as the burner glow and as the favicon source. Keep the existing favicon set working.

## 5. Pages

### Home `/`: one screen, no long scroll (follow `Main.dc.html` exactly)
- On desktop at 1440×900 and similar sizes the page fits one viewport: header, headline, the kitchen scene anchored to the bottom, and a slim footer line. Scale the scene by width and keep the hotspots attached to their objects. Position hotspots in percentages of the scene box, not in px.
- **Header:** the neumorphic logo pill on the left, the neumorphic nav pill (The menu, Recipes, Free tastings, The cook) in the centre, and an inset "Kitchen open" chip with a pulsing teal dot on the right. On phones the nav collapses into a neumorphic menu button that opens a glass sheet. Use `<details>`/`<dialog>` or about 300 bytes of vanilla JS.
- **Headline:** "A small kitchen / *for software.*" Put the glass intro card at the top right.
- **Hotspots:** glass pills with a name, a status line, a short white stem down to the object and a round pop button. Vigilante gets the larger "Taste →" pill. On hover/focus a pill rises 5px and grows 3%. The object under it lifts as well (a CSS transform on its sprite layer). Keyboard focus must show the same state.
- **Word count (>100 words in main):** give each product hotspot a one-line description that appears inside the glass pill, as in the phone dock. Add a short "Today's menu" line under the intro. Real, visible copy only.
- **Phone (`Mobile.dc.html`):** the headline, then the kitchen scene in a horizontal scroll area (`scroll-snap`), starting on the stove, with hotspots attached. A fixed glass dock at the bottom says "● Served now · Vigilante · Taste →". It's one screen tall.

### Served product `/products/vigilante` (follow `Vigilante.dc.html`)
- The hero fills one screen. On the left: a glass "Order №01 · Served" chip, the h1, the italic tagline, a paragraph, an amber pop "Lift the lid →" linking to `https://vigilante.ocix.in/briefing` and a neumorphic "Read the briefing" link. On the right: the cloche render on two neumorphic hob discs (raised outer, inset inner), with a pulsing amber glow and a tilted glass "Served hot" chip.
- Then "On the *plate.*": the Vigilante world screenshot (`/assets/vigilante-world-desktop.webp`) in a glass frame, next to three neumorphic step tiles. Then "Free *tastings.*" with two neumorphic tiles that have round pop buttons.
- The page's existing long-form content (the everyday loop, a target you can keep, verification and access, recovery and optional upgrades, and so on) goes below as **"Recipe notes"**: frosted-glass `<details>` panels, closed by default. That keeps the visible page short and the HTML substantive.

### Still-cooking products `/products/draftshield`, `/products/gymx`, `/products/do-it` (follow `Cooking.dc.html`)
- One template, one screen. On the left: a glass status chip ("Order №02 · Simmering"), the h1 (product name), the italic line "is still cooking.", a paragraph, a **neumorphic segmented progress control** (✓ Prep / ● Cooking (pressed in, amber) / Plate), and a pop button "While you wait, taste Vigilante →". At the bottom left is an "Also on the stove" switcher: three neumorphic tiles with small renders. The current page's tile is inset and has `aria-current="page"`.
- In the middle: two neumorphic hob discs with **that product's own dish**. DraftShield is the pot simmering (the lid rattles every ~2.4 s, steam puffs rise and fade). GymX is the dough proving under a cloth (it slowly swells and settles, a ~4 s breath). Do It! is the popcorn pan (kernels pop at random offsets, and every few seconds one jumps out of the pan). Below the hob sits a **neumorphic heat dial with the OCIX mark** that turns slowly and glows amber. The label reads "Low & slow".
- On the right: a glass **recipe card** with "What's going in" (three numbered neumorphic chips), plus "No waitlist, no sign-up. When it's ready, it goes on the menu." Take the card copy for each product from its current page text.
- **Entrance animation** (CSS only, about 1 s, staggered): text rises 24px and fades in, the dish zooms in from 60% scale, and the recipe card drops from above with a little overshoot, as if it fell off the order rail.
- The required phrase `In development, not yet available` must appear visibly, e.g. as the card's footer line. The existing long-form text goes below as glass `<details>` "Recipe notes".

### Every other page
`/about`, `/tools`, `/blog`, `/blog/*`, `/contact`, `/privacy`, `/terms` and 404 adopt the same header, footer and tokens:
- `/about` ("Meet the cook"): chef render on a hob disc, with the founder text in glass panels.
- `/blog` ("Recipes"): the fridge render, with article cards as glass "recipe cards" on the wall.
- `/tools` ("Free tastings"): the spice shelf render and two tasting tiles.
- 404: the chef shrugging, "That dish isn't on the menu."
- Long article pages stay readable. Use a glass reading column of about 68ch with Geist 18px/1.65 and Fraunces headings. No 3D clutter inside article bodies.

## 6. Transitions (CSS, no JS)

- Turn on cross-document View Transitions: `@view-transition { navigation: auto; }`.
- Give each object's image on the home page and the matching hero image on its product page the same `view-transition-name` (`dish-vigilante`, `dish-draftshield`, `dish-gymx`, `dish-doit`, `chef`, `fridge`, `shelf`). Clicking the pot then **morphs the pot from the counter into the product page's hob**, like a camera dolly. Use `::view-transition-group(*)` with about 550 ms and `cubic-bezier(.2,.8,.2,1)`. Cross-fade everything else.
- Unsupported browsers get a normal navigation. Under reduced motion, set `animation: none` on the view-transition pseudo-elements.

## 7. Clean-up

- Remove the old design: the lime accent, `studio.css` rules that are no longer used, the dark theme and the unused components (`Navbar.tsx`, `Philosophy.tsx`, `FutureVision.tsx`, the old `Hero`/`Products`/`Tools`/`HowItWorks`/`TrustClarity`/`LeadCapture` home sections). Delete unused `ui/*` files only if nothing imports them.
- Update `index.html` `theme-color` to `#ECE8F3`.
- Update `README.md`: the design system and how to re-render the Blender assets.

## 8. Definition of done

1. `npm run build && npm run test:unit` pass with no test edits.
2. Desktop 1440×900 and 1280×800: the home page and each product hero fit one viewport, with no vertical scrollbar on home. Phone 390×844: the home page is one screen, with the horizontal kitchen scroll and the dock.
3. No visible shadow box or seam around any render on any background or width.
4. Lighthouse mobile on `/`: Performance ≥ 90, Accessibility ≥ 95, CLS < 0.05.
5. Keyboard: every hotspot, nav item, button and details panel is reachable, with a visible focus ring. Reduced motion stops every loop.
6. Screenshots at 1440×900 and 390×844 of `/`, `/products/vigilante` and `/products/draftshield`, compared side by side with the mockups. List any deviations and why.

Work in small commits: tokens and fonts → Blender assets → home → product templates → other pages → transitions → clean-up.
