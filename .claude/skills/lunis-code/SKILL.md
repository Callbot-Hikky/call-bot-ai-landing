---
name: lunis-code
description: Skill de dev pour les landings Astro (ex-boilerplate Lunis, Supabase retiré). Ultra-light, pensé pour itérer très vite en vibecoding. Un repo = un site statique. Conventions minimales (kebab-case, où mettre les choses), i18n FR/EN, tokens shadcn (Base UI), et règles Core Web Vitals / Lighthouse au max (images astro:assets, hydration tardive, fonts self-host, CLS 0). Pas de TDD/Storybook imposés. Seule porte avant livraison : lint + build verts (+ Lighthouse ≥ 95 sur les pages publiques). Installe les primitives shadcn manquantes via `bunx shadcn@latest add <name>` avant d'écrire un composant custom.
---

# Skill de code (ultra-light) — Astro statique

Objectif : pondre du code qui **build** du premier coup, au bon endroit, en réutilisant l'existant, **le plus vite possible**. Pas de cérémonie. Un repo = un site.

## 0. Règle d'or — Tokens
- **Toujours** préfixer les commandes shell par `rtk` (`rtk git`, `rtk ls`, `rtk grep`, `rtk read`). Voir `~/.claude/RTK.md`.
- Pas de `Explore` agent : `rtk grep` / `rtk find` / `rtk ls` directement.
- Lire **uniquement** les fichiers nécessaires. Avant de créer, `rtk grep` pour vérifier qu'un truc équivalent n'existe pas déjà.

## 1. Stack
- **Astro 5** — site public, **`output: "static"`** (build 100 % statique, déployable partout). Pages marketing prerendered par défaut.
- **React islands** (`@astrojs/react`) — uniquement pour l'interactif (accordéon animé, menu mobile). Toujours avec `client:visible` / `client:idle`, jamais `client:load` sous la ligne de flottaison.
- **Tailwind v4** (`@tailwindcss/vite`) + **shadcn/ui** (Base UI, style `base-nova`, base neutral) — tokens customisés (thème chaud) dans `src/styles/global.css`.
- **i18n natif Astro** — FR défaut, EN, prêt pour DE.
- **Bun** comme runtime/PM. Pas de Supabase (retiré) : site statique, CTAs `mailto:` / `tel:`.

## 2. Où mettre quoi

| Code | Emplacement |
|------|-------------|
| Page / route | `src/pages/**` (`.astro`) |
| Layout | `src/layouts/*.astro` |
| Composant statique / section | `src/components/*.astro` |
| Composant interactif | `src/components/*.tsx` (React island) |
| Primitive shadcn | `src/components/ui/*.tsx` |
| Utils | `src/lib/*.ts` |
| Traductions | `src/i18n/ui.ts` (+ helpers `src/i18n/utils.ts`) |

Règle simple : **un site, un dossier `src/`**. Pas de monorepo, pas de couches Clean Archi. Si un fichier devient gros, on le découpe sur place.

## 3. Nommage (la seule contrainte forte)
- **Fichiers & dossiers : `kebab-case`.** Point. (`site-nav.astro`, `base-layout.astro`).
- Composants React : `export function PascalName(...)`, export **nommé** (pas de default).
- Composants `.astro` : import en PascalCase.
- Pas de suffixes atomiques obligatoires, pas de stories, pas de tests imposés. On reste light.

## 4. i18n & SEO
- Tout texte visible passe par `t("clé")` (`useTranslations(lang)`), clés définies dans `src/i18n/ui.ts` pour **chaque** locale.
- Pas de texte en dur dans le JSX/HTML visible. Exceptions : `class`, `id`, `data-*`, URLs, identifiants techniques.
- Ajouter une langue = ajouter le bloc dans `ui.ts` + la lister dans `astro.config.mjs` (`i18n.locales`).
- **SEO** : chaque page passe par `<BaseLayout title description>` → composant `<Seo>` qui génère canonical + Open Graph + Twitter + **hreflang** (toutes locales + x-default) automatiquement. OG image : prop `image`. Page privée : prop `noindex`.
- ⚠️ Renseigner `site` dans `astro.config.mjs` (domaine prod) — sinon canonical/hreflang/sitemap pointent au mauvais endroit. `sitemap.xml` + `robots.txt` générés.

## 5. shadcn & couleurs
- **Base UI**, pas Radix. `components.json` → `style: "base-nova"`. Compo : `render={<X />}` (pas `asChild`).
- Besoin d'une primitive (button, input, dialog…) **pas encore présente** dans `src/components/ui/` ?
  → `bunx --bun shadcn@latest add <name>`. On **n'écrit jamais** un input/bouton/select à la main. En doute : `bunx --bun shadcn@latest docs <name>`.
- Si tu ajoutes un formulaire : **`FieldGroup` + `Field`** (jamais `div` + `space-y`), validation **Zod** partagée (`safeParse` → `data-invalid` + `aria-invalid` + `FieldError`). Installe d'abord les primitives (`bunx shadcn@latest add field input textarea`) et `bun add zod`. Feedback via `toast()` (`sonner`) — pas de message bricolé.
- Lien stylé en bouton (en `.astro`) → `<a class={buttonVariants()}>` (pas `<Button render={<a/>}>`, qui ne parse pas en `.astro`).
- Îlot interactif nesté dans un composant statique en `.astro` : OK, Astro hydrate l'enfant.
- **Tokens shadcn uniquement** : `bg-background`, `bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring`… Les valeurs des tokens (palette chaude) vivent dans `global.css`.
  ❌ jamais `bg-blue-500`, `text-white`, `bg-[#xxx]` en dur dans un composant réutilisable. `className` = layout (`flex`, `gap`), pas les couleurs. *(Exception assumée : les sections de la landing utilisent des dégradés/halos de marque via `<style>` scopé ou utilitaires `hk-*` définis dans `global.css`.)*

## 6. Performance / Core Web Vitals (toujours au max)
**Cibles non négociables** : Lighthouse Perf **≥ 95**, SEO/Best-practices/A11y **100**. LCP **< 2,5 s**, INP **< 200 ms**, CLS **< 0,1**. Astro démarre à 0 JS — le job, c'est de **ne pas le gâcher**.

**Images** — `import { Image } from "astro:assets"` (jamais `<img>` brut pour du contenu), `width`+`height` obligatoires (CLS 0), `format="avif"`/`webp` qualité ~75. Image LCP : `loading="eager"` + `fetchpriority="high"`. Le reste : `loading="lazy"`.

**Fonts** — self-host via l'API Fonts d'Astro 5 (`experimental.fonts`). **Jamais** un `<link>` Google Fonts bloquant. `font-display: swap` + preload de la font du LCP. Limiter aux graisses utilisées.

**JS / hydration** — page marketing = statique, **0 island** si possible. Island nécessaire ? Directive la plus tardive : `client:visible` > `client:idle` > `client:load`. Pas de grosse lib JS pour un effet faisable en CSS.

**CSS / layout** — réserver l'espace (dimensions, `min-h-*`) pour tout contenu async → zéro saut de layout.

**Mesure** — ⚠️ **jamais en `astro dev`** (score faux). Toujours sur le build de prod : `rtk bun run lh`. Viser Perf ≥ 95 avant de livrer une page publique.

## 7. TypeScript (léger mais propre)
- Pas de `any` → `unknown` + narrowing. Pas de `enum` → `const X = {...} as const`.
- Type de retour explicite sur les fonctions exportées.
- Pas de `console.log` (ok : `console.error`).
- Imports : externes puis internes (`@/...`), `import type` en dernier. Alias `@/*` (pas de `../../..`).

## 8. Avant de livrer (la SEULE porte)
```bash
rtk bun run lint    # astro check — types + erreurs Astro
rtk bun run build   # build Astro doit passer
```
Les deux verts = on livre. **Page publique** en plus : Lighthouse Perf ≥ 95 (voir §6). Pas de `--skip`, pas de `--no-verify`.

## 9. Quand demander confirmation
- Supprimer un fichier existant.
- Changer la config de déploiement (`astro.config.mjs`, adapter).

Sinon : on exécute, on build, on livre.

## 10. Anti-patterns (auto-fail)

| ❌ | ✅ |
|----|----|
| `<button>Envoyer</button>` | `<Button>{t("cta.demo")}</Button>` |
| Bouton/input écrit à la main | `bunx --bun shadcn@latest add button` |
| `asChild` (Radix) | `render={<X />}` (Base UI) |
| Texte en dur visible | `t("...")` dans `src/i18n/ui.ts` |
| `import x from "../../../lib/x"` | `import x from "@/lib/x"` |
| `<img src="...">` brut pour du contenu | `<Image>` d'`astro:assets` (avif/webp) |
| Image sans `width`/`height` | dimensions fixes → CLS 0 |
| `client:load` sous la ligne de flottaison | `client:visible` / `client:idle` |
| Google Fonts en `<link>` bloquant | self-host + `font-display: swap` + preload |
| `any` / `enum` / `console.log` | `unknown` / `as const` / `console.error` |
