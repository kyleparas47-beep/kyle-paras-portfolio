# Kyle Justine Paras — Portfolio

React 19 + Vite + React Router.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview  # serve the built site locally
```

## Project layout

```
src/
  data/        ← all content lives here; edit these, not the components
    site.js          name, contact info, socials, nav, about stats
    projects.js      projects + case study content
    skills.js  education.js  experience.js
  sections/    one component per home-page section (Hero, About, Skills, …)
  pages/       routes: Home, ProjectPage (/projects/:slug), NotFound
  components/  shared UI (Topbar, Layout, TiltCard, GlowButton, ResumeModal, …)
  hooks/       small reusable behaviours (typewriter, in-view, active section, page meta)
public/        static files served as-is (resume.pdf, favicon, images)
```

## Adding content

- **A project**: copy an entry in `src/data/projects.js` and give it a unique `slug`. It shows up as a card
  and gets its own page at `/projects/<slug>`. The comment at the top of the file lists the optional fields
  (summary, stack, GitHub/live links, cover image, process steps, results, gallery). Empty fields stay hidden.
  Tag filter buttons appear once tags actually split the list.
- **Images**: put them in `public/projects/` (WebP, ~1600px wide works well) and reference them as `"/projects/name.webp"`.
- **GitHub / LinkedIn**: fill in the `url`s under `socials` in `src/data/site.js`. Each one gets a contact card.

## Configuration

Copy `.env.example` to `.env.local` locally, or set the same variables in your host's dashboard:

| Variable | What it does |
| --- | --- |
| `VITE_SITE_URL` | Your live address, e.g. `https://kyleparas.dev`. Enables `sitemap.xml`, canonical and `og:url` tags. |
| `VITE_FORM_ENDPOINT` | A form service URL (e.g. a free [Formspree](https://formspree.io) form). The contact form then sends messages directly; without it, it opens the visitor's email app. |

Add `public/og-image.png` (1200×630) and the build will use it as the link-preview image.

## How the build handles SEO

`vite.config.js` writes a static HTML file for every route after building (`dist/projects/<slug>/index.html`,
`404.html`, `robots.txt`, `sitemap.xml`). Each one has its own title, description and share tags, so link
previews on LinkedIn/Messenger and search crawlers see the right text without running JavaScript.

## Deploying

**Vercel** (recommended): import the folder or Git repo. Framework preset: Vite. `vercel.json` is already set up.
Add `VITE_SITE_URL` (and optionally `VITE_FORM_ENDPOINT`) under Settings → Environment Variables, then redeploy.

**Netlify**: build command `npm run build`, publish directory `dist`. `public/_redirects` handles routing.
