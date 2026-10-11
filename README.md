# Soumallo Deb — Developer Portfolio

A responsive, Edinburgh-inspired portfolio site built with React, Vite, Tailwind CSS, Framer Motion, GSAP, and Three.js. Its visual language draws from Old Town closes, Castle Rock silhouettes, sandstone warmth, Gothic spires, and the ordered geometry of the New Town; scroll-linked atmosphere, architecture-shaped motion, and reduced-motion preferences are respected. It is a fully static single-page site: there are no server-side routes, backend API routes, or database. The contact form opens a direct email fallback immediately and can use Formspree for background delivery once connected.

## Run locally

Requires Node.js 22 or later and npm.

```bash
npm install
npm run dev
```

Vite prints the local preview URL (normally `http://localhost:5173`). To check a production build locally:

```bash
npm run build
npm run preview
```

The deployable static files are written to `dist/`.

## Deploy to GitHub Pages

This repository is named `kadevoss.github.io`, so it is configured as a GitHub Pages user site served from the domain root. `vite.config.js` sets `base: '/'`, which is the correct asset path for this repository.

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. To deploy:

1. Push or merge the site to the repository's `main` branch.
2. In GitHub, open **Settings → Pages** and set the build/deployment source to **GitHub Actions**.
3. The workflow installs dependencies, builds the static site, and publishes `dist/` to Pages. You can also run it with **Actions → Deploy to GitHub Pages → Run workflow**.

If you later deploy this as a project site under `https://<username>.github.io/<repository>/`, change the Vite `base` value to `'/<repository>/'` before building. Keep `'/'` for the current `kadevoss.github.io` user-site repository.

## Before launch

### Connect the contact form

1. Create a form at [Formspree](https://formspree.io/) and copy its form ID.
2. In `src/components/Contact.jsx`, replace `YOUR_FORM_ID` in `FORMSPREE_ENDPOINT` with that ID, keeping the `https://formspree.io/f/` prefix.
3. Submit a test message from the deployed page and confirm it arrives in the inbox configured in Formspree.

The current endpoint is intentionally a placeholder. Until it is replaced, submitting the form opens the visitor’s email app with the enquiry addressed to `debsoumallo@gmail.com`; the direct email link remains available if no email app is configured. Replace `YOUR_FORM_ID` when you want background delivery through Formspree.

### Replace portfolio placeholders

- Replace the three clearly labeled speculative project concepts in `src/components/Work.jsx` with real work when ready. The project rail supports smooth vertical mouse-wheel-to-horizontal scrolling, native touch/trackpad scrolling, arrow controls, and releases control back to the browser’s native page scrolling at either edge; its project CTA currently points to Contact.
- The services rail in `src/components/Services.jsx` contains seven editable concept offerings, including business websites, full-stack web apps, AI-powered features, commerce, product design, automation, and performance/SEO. It uses the same pointer-aware horizontal scrolling and native edge behavior and can be edited as the offering evolves.
- Social links are configured in `src/components/SocialLinks.jsx` for direct email, LinkedIn, X, and GitHub access.
- Review the canonical and Open Graph URLs in `index.html` if the deployed domain changes. The social share card is `public/og-card.png` (with an editable SVG source alongside it).

The public contact email and social profiles are configured in the site. No phone number is included.

## Project structure

```text
.
├── .github/workflows/deploy.yml
├── public/                  # Static favicon and social share card
├── src/
│   ├── components/          # Page sections and reusable UI
│   ├── App.jsx
│   ├── index.css            # Tailwind layers and custom responsive styles
│   └── main.jsx
├── index.html               # SEO and Open Graph metadata
├── package.json
└── vite.config.js            # GitHub Pages base and Vite plugins
```
