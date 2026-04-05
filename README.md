# OCIX Landing Page

The official landing page for the OCIX ecosystem. Built for developers focused on execution.

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

### Formspree (Early Access Form)
The "Request Access" form on the landing page is connected to Formspree. Submissions are sent via the `@formspree/react` hook (using endpoint ID `mqeggddz` within `LeadCapture.tsx`). Formspree handles the storage, spam filtering, and email forwarding of all incoming leads automatically—no custom backend required.
