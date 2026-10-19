# Kasun Sampath Weerasinghe: Portfolio

React + Vite + GSAP/ScrollTrigger + Lucide. Your portrait image appears behind the home section.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```
Requires Node 18+.

## Where things go
| What | Where |
|---|---|
| Portrait background | `public/images/hero-portrait.jpg` |
| CV | replace `public/documents/CV.pdf` (currently a placeholder page) |
| Project screenshots | put files in `public/images/`, then set `image: \`${base}images/name.jpg\`` on the project in `src/data/siteData.js` |

## Editing content
All text, links and lists live in **`src/data/siteData.js`**: name, email, social URLs, About, Education, Projects, Skills, Certifications, soft skills. Anything written `[like this]` is a placeholder; it is shown with a dashed purple underline on the site until you replace it. Empty social/GitHub/demo links show as disabled until you add a URL.

To replace the portrait, update `public/images/hero-portrait.jpg`. To move the portrait left or right behind the text, change `--face-x` in `.portrait-background` (`src/App.css`).

## Contact form
The form validates input but **cannot send email by itself**; a website needs a service for that. Until one is configured it shows an honest "not sent" message (it never fakes success).
1. Create a free form at https://formspree.io (or any service that accepts a JSON POST).
2. Copy `.env.example` to `.env` and set `VITE_FORM_ENDPOINT=https://formspree.io/f/yourid`.
3. Restart `npm run dev` / rebuild.
