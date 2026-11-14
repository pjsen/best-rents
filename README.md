# Best Rents, Inc. website

This is the website for [bestrentsinc.com](https://www.bestrentsinc.com), moved off Wix and rebuilt as a plain static site (HTML, CSS and a little JavaScript). There's no build step and nothing to install. GitHub Pages serves the files exactly as they are in this repository.

## What's here

```
index.html                 Home
av-rental-services.html    Services
av-rental-policies.html    Policies
av-service-coverage.html   Coverage area
av-rental.html             Equipment › Audio Visual
monitor-tv-rental.html     Equipment › Monitor-TV
laptop-rental.html         Equipment › Laptops
printer-rental.html        Equipment › Printers
av-rental-request.html     Request a Quote (form)
404.html                   Not-found page
assets/css/style.css       All styling; colors and fonts are variables at the top
assets/js/main.js          Mobile menu and quote form submission
assets/images/             Photos and favicon
sitemap.xml, robots.txt    For search engines
```

Each page keeps the same URL it had on Wix (for example `/av-rental-request`), so Google rankings and existing links carry over.

## Preview it on your computer

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Links without `.html` work on GitHub Pages but not with this simple local server. Locally, open pages like `/av-rental.html` instead.

## Publish with GitHub Pages

1. Push these files to the `main` branch of the repository.
2. On GitHub, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
3. After about a minute, the site is live at `https://<your-username>.github.io/<repo-name>/`.

   Note: the site uses root-relative links (`/assets/...`), so it previews properly only at a domain root. That means a custom domain or a repository named `<username>.github.io`. If the github.io preview shows no styling, that's the cause, and it fixes itself once the custom domain is connected.

## Move the domain from Wix to GitHub (do this last)

1. In **Settings → Pages → Custom domain**, enter `www.bestrentsinc.com` and save. GitHub adds a `CNAME` file to the repository.
2. Wherever the domain's DNS is managed (Wix, GoDaddy and so on), set these records:
   - `CNAME` record: `www` → `<your-username>.github.io`
   - `A` records for the bare domain `bestrentsinc.com`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. Once DNS updates (minutes to a few hours), turn on **Enforce HTTPS** in the Pages settings.
4. Check every page and send a test quote request. Only then cancel the Wix premium plan.

If the domain is registered through Wix, you can manage DNS in Wix (Domains → Manage DNS records) or transfer the domain to another registrar.

## Quote form (Formspree)

The form on `av-rental-request.html` sends submissions to Formspree, which emails them to you. The form doesn't work until you connect it:

1. Create a free account at https://formspree.io with info@bestrentsinc.com.
2. Create a new form. Formspree gives you an endpoint like `https://formspree.io/f/abcdwxyz`.
3. In `av-rental-request.html`, replace `https://formspree.io/f/YOUR_FORM_ID` with your endpoint.
4. Submit a test request from the live site and confirm the email arrives. Formspree asks you to confirm the first submission.

Until step 3 is done, the form shows visitors your phone number and email instead of failing silently.

**Switching providers later:** the page sends the form with a standard `fetch` POST to whatever URL is in the form's `action`, and expects JSON back. Formspree, Web3Forms, Basin and Getform all work this way. To switch, change the `action` URL. Some providers need a hidden field instead; Web3Forms, for example, needs `<input type="hidden" name="access_key" value="...">`.

## Before going live: to-do

- [ ] **Photos.** Download your images from Wix (Media Manager → select → Download) into `assets/images/`. Pages currently show icon panels where photos go. To add a photo, find the `<figure class="visual">` block and replace the icon `<svg>…</svg>` with `<img src="/assets/images/your-photo.jpg" alt="Describe the photo">`.
- [ ] **Logo.** The header uses a "BR" text mark. To use your logo file, replace the `<span class="brand-mark">BR</span>` in each page header and footer, and `assets/images/favicon.svg`.
- [ ] **Reviews.** On the home page, paste the exact text of the three customer reviews (Alison B., Bernard B., JP) where the `[Paste … here]` placeholders are.
- [ ] **Venue types.** The Venue type dropdown on the quote form uses a reasonable list. Change it to match the options you had on Wix.
- [ ] **Formspree.** Connect the form (see above).
- [ ] **Google Search Console.** After launch, submit `https://www.bestrentsinc.com/sitemap.xml`.

## Working on the site with Claude Code

Open this folder in Claude Code and describe what you want, for example "make the hero section use a photo of a conference," or "add an FAQ page and link it in the menu." `CLAUDE.md` gives Claude the project's conventions.
