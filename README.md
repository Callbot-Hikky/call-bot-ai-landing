# Astro + Supabase Boilerplate

Boilerplate **un repo = un site** pour sortir un site vite, propre, maintenable. Pensé pour le vibecoding.

**Stack :** Astro 5 (SSR) · React islands · Supabase (Postgres/Auth/Storage/RLS) · Tailwind v4 · shadcn/ui · i18n FR/EN · Vercel · Bun.

## Démarrage

```bash
bun install
cp .env.example .env        # remplis tes clés Supabase
bun dev                     # http://localhost:4321
```

### Supabase
1. Crée un projet sur [supabase.com](https://supabase.com).
2. Renseigne `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` dans `.env`.
3. Applique le schéma : colle `supabase/migrations/0001_init.sql` dans le SQL Editor (ou `supabase db push` avec la CLI).
4. **Auth** (magic link + OAuth) — dans le dashboard Supabase :
   - **Authentication > URL Configuration** : ajoute tes URLs de callback dans *Redirect URLs* :
     `http://localhost:4321/auth/callback` (dev) et `https://ton-domaine.com/auth/callback` (prod).
   - **Magic link** : actif par défaut (Authentication > Providers > Email).
   - **OAuth** : active *Google* et/ou *GitHub* (Authentication > Providers), renseigne client ID/secret côté provider. Retire les boutons inutiles dans `src/components/login-form.tsx`.
   - Pour tester `/admin` sans email : crée un user dans Authentication > Users.

## Ce qui est inclus (démo)
- `/` (FR) et `/en/` — landing prerendue + formulaire de lead (React island → `POST /api/leads` → Supabase).
- `/login` — connexion Supabase : **magic link (email)** + **OAuth (Google/GitHub)**, flow PKCE via `/auth/callback`.
- `/admin` — back-office protégé par `src/middleware.ts`, liste les leads + déconnexion (`/auth/signout`).
- Sélecteur de langue, **shadcn Base UI** (`field`, `card`, `sonner`…), RLS sur la table `leads`.
- **SEO** : composant `<Seo>` (canonical + OG + Twitter + hreflang), `sitemap.xml` + `robots.txt` auto, page `404`.
- **Env typées/validées** (`astro:env`) + **types Supabase** générés (`SupabaseClient<Database>`).
- Toasts (`sonner`) pour le feedback des formulaires.
- **Validation Zod** partagée client/serveur + **honeypot** anti-spam sur le form public.
- **Dark mode** (toggle + persistance, anti-FOUC), **CI** GitHub Actions (lint+build), **security headers** (`vercel.json`).

## Structure
```
src/
├── components/      # seo.astro · home.astro · *.tsx (islands) · ui/ (shadcn Base UI)
├── i18n/            # ui.ts (traductions) + utils.ts (hreflang, t())
├── layouts/         # base-layout.astro (Seo + Font + Toaster + SpeedInsights)
├── lib/             # utils.ts + supabase/{server,client,database.types}.ts
├── middleware.ts    # session Supabase + protection /admin
├── pages/           # routes + api/ + auth/ + 404.astro
└── styles/          # global.css (Tailwind v4 + tokens)
public/robots.txt    # + sitemap.xml généré au build
supabase/migrations/ # schéma SQL (RLS)
```

> ⚠️ Avant prod : renseigne `site` dans `astro.config.mjs` et le domaine dans `public/robots.txt`.

## Performance / Core Web Vitals
- **Fonts** self-hostées (API Fonts Astro 5, Inter) + **images** via `astro:assets` (avif, dimensions fixes → CLS 0). Voir `astro.config.mjs` et `src/components/home.astro`.
- **Lab (avant de livrer)** — jamais en `astro dev`, toujours sur le build de prod :
  ```bash
  bun run lh    # build + preview + Lighthouse desktop (localhost:4321)
  ```
- **Field (vrais users en prod)** — `@vercel/speed-insights` est branché dans `base-layout.astro` : LCP/INP/CLS réels dans l'onglet Speed Insights de Vercel.

## Conventions
Voir le skill **`/lunis-code`** (`.claude/skills/lunis-code/SKILL.md`). Avant de livrer : `bun run lint` + `bun run build` verts (+ `bun run lh` ≥ 95 sur les pages publiques).

## Nouveau projet
Clone ce repo, renomme, adapte `src/i18n/ui.ts` (le contenu), `supabase/migrations/` (les tables), et c'est parti.

## Déploiement
Push sur un repo Git, importe sur **Vercel**, ajoute les variables d'env Supabase. L'adaptateur `@astrojs/vercel` gère le reste. Les security headers sont dans `vercel.json`.

> Une **CSP** n'est pas incluse (elle casse facilement avec l'hydratation Astro / Speed Insights / Supabase et demande des nonces). À ajouter par projet une fois le contenu figé.
