# Alloquence — Landing (Astro)

Landing marketing du produit **Alloquence** (agent vocal IA qui décroche pour les restaurants — voir le monorepo `call-bot-ai/`). Un repo = un site.

Stack : **Astro 5 (static) + React islands + Tailwind v4 + shadcn (Base UI) + i18n FR/EN**, fonts self-host, runtime Bun. **Pas de Supabase** (retiré) : site 100 % statique, CTAs en `mailto:` / `tel:`.

## Règles
Pour **tout** travail de code dans ce repo, applique le skill **`/lunis-code`** (`.claude/skills/lunis-code/SKILL.md`) : où mettre les choses, nommage kebab-case, i18n, tokens shadcn, perf Core Web Vitals, et la porte de livraison (lint + build verts).

L'esprit : **ultra-light, itération très rapide (vibecoding)**. Pas de TDD/Storybook/ESLint atomique imposés.

## Design
Direction « service du soir » : fond espresso, accent chaud **ambre → corail**, typo **Fraunces** (display) + **Instrument Sans** (texte). Thème sombre unique. Tokens dans `src/styles/global.css`.

## Commandes
```bash
bun install
bun dev          # http://localhost:4321
bun run build    # build statique
bun run lint     # astro check (types)
bun run lh       # Lighthouse sur le build de prod
bunx shadcn@latest add <name>   # ajouter une primitive UI
```

## Tokens (RTK)
Préfixe les commandes shell par `rtk` (token-efficient). Voir `~/.claude/RTK.md`.
