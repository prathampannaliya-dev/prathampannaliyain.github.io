# Pratham Pannaliya — Personal Portfolio

A minimal, editorial "field notes" themed portfolio site. Deep ink-navy and
warm marigold/sage accents, an editorial serif paired with Inter, a
Polaroid-style photo slideshow, and quiet dashed "stitch" dividers between
sections.

## File structure

```
portfolio/
├── index.html          ← all content lives here
├── css/
│   └── style.css        ← design tokens, layout, animations
├── js/
│   └── script.js         ← navbar, scroll-reveal, slideshow logic
└── assets/
    └── images/
        ├── favicon.svg
        ├── profile-1.jpg  ← placeholder photos (replace these!)
        ├── profile-2.jpg
        ├── profile-3.jpg
        └── profile-4.jpg
```

## 1. Replace the placeholder photos

The four `profile-*.jpg` files are gradient placeholders with a "PP"
monogram — they're just there to show the slideshow working. To use your
own photos:

1. Pick 3–6 photos. **Square photos (1:1, e.g. 1000×1000px) work best**
   since the Polaroid frame crops to a square.
2. Rename them to match the existing files (`profile-1.jpg`,
   `profile-2.jpg`, etc.) and drop them into `assets/images/`, overwriting
   the placeholders — the page will pick them up automatically.
3. To add **more or fewer** photos than 4, open `index.html`, find the
   `<div class="polaroid-stack">` block (in the Home section), and
   copy/remove a `<figure class="polaroid">…</figure>` block per photo.
   The slideshow JavaScript automatically adapts to however many
   `.polaroid` figures it finds — no script changes needed.
4. Update each photo's `alt="…"` text to something accurate (good for
   accessibility and SEO).

## 2. Customize colors & fonts

Open `css/style.css` and edit the `:root { … }` block at the top — every
color in the site is driven from these variables:

```css
--c-ink: #142235;       /* primary dark / headings */
--c-marigold: #E2A33B;  /* accent */
--c-sage: #3F6F63;      /* secondary accent */
--c-paper: #EEF0E9;     /* light background */
```

Fonts (Fraunces, Inter, JetBrains Mono) are loaded from Google Fonts in
`index.html`'s `<head>` — swap the `<link>` href there if you'd like
different typefaces. An internet connection is required for these to
load; without one, the browser falls back to system serif/sans fonts.

## 3. Edit content

Everything — your name, bio, skills, education, achievements, contact
details — is plain text inside `index.html`, organized into clearly
commented `<section>` blocks (`<!-- ABOUT -->`, `<!-- SKILLS -->`, etc.).
Search for the text you want to change and edit it directly; no build
step required.

## 4. View it locally

Just double-click `index.html` to open it in a browser — no install or
server needed. (Some browsers restrict local `file://` access slightly;
if anything looks off, right-click the `portfolio` folder and "Open with
Live Server" in VS Code, or run `python3 -m http.server` inside the
folder and visit `http://localhost:8000`.)

## 5. Deploy it for free

Any static host works since there's no backend:

- **GitHub Pages** — push this folder to a repo, enable Pages in repo
  settings.
- **Netlify / Vercel** — drag-and-drop the `portfolio` folder onto their
  dashboard.

## Notes

- Built with plain HTML/CSS/JS — no frameworks, no build tools.
- Fully responsive (desktop, tablet, mobile) with a slide-in mobile menu.
- Respects `prefers-reduced-motion` for visitors sensitive to animation.
- Social links open in a new tab; email/phone use `mailto:`/`tel:` links.
