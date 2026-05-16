# Gemechis Worku — portfolio

Next.js 16 (App Router), Tailwind, shadcn/ui (base-nova), Motion. Site copy and resume data live under [`content/`](content/) and are loaded at build time.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

| Path | Purpose |
| --- | --- |
| [`content/site.json`](content/site.json) | Name, role, headline, contact, social URLs, languages |
| [`content/impact-metrics.json`](content/impact-metrics.json) | Impact strip |
| [`content/skills.json`](content/skills.json) | Skills by category |
| [`content/certifications.json`](content/certifications.json) | Certifications |
| [`content/education.json`](content/education.json) | Degree |
| [`content/experiences/*.md`](content/experiences/) | Roles (YAML frontmatter + bullets) |
| [`content/projects/*.md`](content/projects/) | Projects (frontmatter + optional Markdown body) |

Project detail pages: `/projects/[slug]` (e.g. `/projects/okr-validator`).

### Project media (screenshots, links, video)

In each project’s frontmatter (or via Decap) you can set:

- **`screenshots`** — list of strings: paths under `public/` (e.g. `/projects/my-slug/screen.png`) or **https** image URLs.
- **`coverImage`** (optional) — same format; used for the **home page card** if set; otherwise the **first screenshot** is used.
- **`liveUrl`** — public app / demo URL (opens in a new tab).
- **`repoUrl`** — GitHub (or other) repository URL.
- **`videoUrl`** — YouTube **watch**, **embed**, **Shorts**, or **youtu.be** link; the project page embeds an iframe preview.

Place files in [`public/projects/<slug>/`](public/projects/) and reference them with a leading `/`. See [`public/projects/README.md`](public/projects/README.md).

#### Google Drive URLs

Pasting a **Share** link like `https://drive.google.com/file/d/FILE_ID/view?usp=sharing` does **not** point at image bytes — the browser loads an HTML page, so images break. The app rewrites common Drive links to `https://drive.google.com/thumbnail?id=FILE_ID&sz=w1200` (which serves the image via Google's CDN). You still need:

- File shared as **Anyone with the link** → **Viewer** (or the image request may 403).
- Prefer **PNG/JPEG** in Drive (not Google Docs/Sheets as the “image”).

If images still fail, download the files into `public/projects/…` instead — hotlinking Drive is unreliable for production.

## Decap CMS (admin UI)

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin) (redirects to `/admin/index.html`).
- **Config:** [`public/admin/config.yml`](public/admin/config.yml).

Before the CMS can commit to GitHub:

1. Set `backend.repo` in `public/admin/config.yml` to **`owner/repo`** (e.g. `yourname/gemechisworku-portfolio`). Using only the repo name breaks the GitHub API and often surfaces as a **CORS** error in the browser.
2. Follow [Decap’s GitHub backend](https://decapcms.org/docs/github-backend/) to create a GitHub OAuth App and set the Authorization callback URL Decap expects.
3. Deploy the site on your real domain so OAuth redirects work in production.

For **local editing without OAuth**, use the [Decap local backend](https://decapcms.org/docs/working-with-a-local-git-repository/) (`npx decap-server`) and enable `local_backend: true` in `config.yml` while developing (do not commit `local_backend: true` for production unless you intend to).

### After editing in Decap (GitHub backend)

Decap **commits to GitHub**; it does **not** update files in your project folder by itself. The Next.js app reads from **`content/` on disk**, so run **`git pull`** in this repo after each publish (or pull in your IDE). Then refresh the browser. If you edit Markdown/JSON directly in the editor, saves show up on refresh without a pull.

## Build

```bash
npm run build
```
