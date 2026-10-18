# Kitchen welcome and mobile first viewport · 19 October 2026

Today’s menu uses a distinct raised button with a menu-sheet icon, stronger label and action arrow on phones and tablets up to 1000 px. Desktop keeps the earlier plain label and plus sign. It retains the existing dialog behavior and inset keyboard focus.

The white outer glow is removed from the shared raised material. Menu surfaces, close controls and the chef profile button retain a soft navy shadow. Recipes points up toward the fridge; Meet the cook points diagonally toward the chef. The chef’s head gently looks around, with all movement disabled under reduced motion.

A circular chef profile button sits at the bottom right. It opens a welcome based on the visitor’s device-local time, suggests the served Vigilante product and links to Recipes. The panel supports its close button, Escape and native light dismissal. No location lookup is needed.

Phone home pages now fit their first viewport: header, introduction, kitchen, swipe hint, Vigilante Taste dock, footer and guide button. The guide button never covers the CTA or footer links. Short landscape screens use two columns; very short screens keep product labels in Today’s menu so the artwork remains clear. The kitchen opens with the fridge and chef in view, with the other dishes available by swiping right.

## Verification

- Build and all 7 existing unit tests pass unchanged.
- `npm run test:welcome`: 11 first-viewport checks from 320×568 to desktop, including the supplied phone proportions and landscape; CTA/footer separation; chef animation and reduced motion; white-glow removal.
- Local greetings verified at a fixed instant in Asia/Kolkata, Pacific/Auckland, America/Los_Angeles and Europe/London.
- 9 Axe WCAG A/AA scans pass for the home, open greeting and open menu on desktop and two phone sizes. See [accessibility results](accessibility-results.json).
- All 37 broader layout checks pass. Fresh mobile Lighthouse: performance **92**, accessibility **100**, CLS **0**, using default mobile throttling. See [report](lighthouse-mobile.report.html) and [QA notes](../QA.md).

[Desktop](home-1440x900.png) · [Phone matching the supplied proportions](home-390x724.png) · [Short phone](home-320x568.png) · [Landscape](home-844x390.png) · [Chef welcome](greeting-390x724.png) · [Menu without white glow](menu-desktop.png) · [Viewport and greeting results](results.json)
