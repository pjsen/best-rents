# Best Rents, Inc. site: notes for Claude

A static marketing site for an AV and technology rental company in South Florida. It's hosted on GitHub Pages from the `main` branch root. There's no framework, no build step and no package.json. Keep it that way unless the owner asks for a change.

## Conventions
- **Pages** are standalone `.html` files in the root. URLs are extensionless (`/av-rental`). GitHub Pages resolves them to `av-rental.html`. Keep existing filenames, since they match the old Wix URLs and are indexed by Google.
- **Header, nav and footer are repeated in every page.** When changing any of them, update all `.html` files the same way, including `404.html`. The active nav link has `aria-current="page"`. On equipment pages, the Equipment dropdown wrapper also gets `is-current`.
- **Styling** lives only in `assets/css/style.css`. Theme colors and fonts are CSS variables at the top. Reuse existing components before adding new ones: `.section`, `.section--soft`, `.section--navy`, `.page-hero`, `.card`, `.grid-2/3/4`, `.split` (+ `.reverse`), `.spec`, `.checklist`, `.note`, `.cta-band`, `.btn--primary/ghost/light/outline-light`.
- **Icons** are inline SVG line icons (24px viewBox, `stroke="currentColor"`). `.visual` figures show an icon until a real photo is added. To add one, swap the SVG for an `<img>`.
- **Links** are root-relative (`/assets/...`, `/av-rental`).
- **New pages** need the same `<head>` block (title, meta description, canonical, Open Graph), the shared header and footer, an entry in `sitemap.xml`, and links from the nav or footer as appropriate.
- **Quote form** (`av-rental-request.html`): `assets/js/main.js` posts it with `fetch` to the form's `action` URL (Formspree), expecting a JSON response. The field `name` attributes become the labels in the notification email, so keep them human-readable.
- **Accessibility:** keep labels on every input, alt text on images, visible focus styles, and color contrast at WCAG AA or better.

## Business facts (don't change without the owner's confirmation)
- Office 305-891-2399 · Mobile 954-692-4113 · info@bestrentsinc.com
- Service area: Miami-Dade, Broward, Palm Beach and St. Lucie counties
- Minimums: $150 business hours, $250 after hours or weekends, $450 outside the coverage area (before tax, labor and delivery)
- No customer pickup. Best Rents delivers, installs and retrieves every order.
- MacBooks and out-of-area service are for corporate customers only. Personal laptop rentals must be combined with other AV equipment.
- Cancellation: free 3+ business days before delivery · 25% at 24–72 h · 50% within 24 h · 100% at or after delivery
