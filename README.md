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

## Decap CMS (admin UI)

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin) (redirects to `/admin/index.html`).
- **Config:** [`public/admin/config.yml`](public/admin/config.yml).

Before the CMS can commit to GitHub:

1. Replace `YOUR_GITHUB_USERNAME` in `public/admin/config.yml` with your GitHub user or org (must match the repo you deploy).
2. Follow [Decap’s GitHub backend](https://decapcms.org/docs/github-backend/) to create a GitHub OAuth App and set the Authorization callback URL Decap expects.
3. Deploy the site on your real domain so OAuth redirects work in production.

For **local editing without OAuth**, use the [Decap local backend](https://decapcms.org/docs/working-with-a-local-git-repository/) (`npx decap-server`) and enable `local_backend: true` in `config.yml` while developing (do not commit `local_backend: true` for production unless you intend to).

## Build

```bash
npm run build
```
