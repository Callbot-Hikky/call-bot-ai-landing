export const languages = {
  fr: "Français",
  en: "English"
} as const;

export const defaultLang = "fr";

export type Lang = keyof typeof languages;

// All user-facing copy lives here, keyed by locale. Add a locale (e.g. "de")
// by adding a key block + listing it in astro.config.mjs `i18n.locales`.
export const ui = {
  fr: {
    // Navigation
    "nav.how": "Fonctionnement",
    "nav.features": "Fonctionnalités",
    "nav.pricing": "Tarifs",
    "nav.faq": "FAQ",
    "nav.try": "Essayer Alloquence",
    "nav.menu": "Menu",
    "nav.langAria": "Langue",

    // Hero
    "hero.titleLine1": "Le cahier de réservation",
    "hero.titleAccent": "qui tient la salle.",
    "hero.subtitle":
      "Alloquence réunit vos réservations, votre plan de salle et vos horaires au même endroit. Toute l'équipe voit le même service, en direct, sur tous vos établissements.",
    "hero.ctaPrimary": "Essayer Alloquence",
    "hero.ctaSecondary": "Voir le tableau de bord",

    // Problème
    "problem.title": "Un service se joue à quelques",
    "problem.titleAccent": "couverts près.",
    "problem.stat1": "Le cahier papier",
    "problem.stat1Body":
      "vit derrière le comptoir. Personne ne sait ce qu'il contient sans se déplacer.",
    "problem.stat2": "Les tables",
    "problem.stat2Body":
      "se combinent de tête, et la grande tablée du vendredi passe à côté d'une place libre.",
    "problem.stat3": "Les no-shows",
    "problem.stat3Body":
      "se comptent après coup, quand la table est restée vide toute la soirée.",

    // Fonctionnalités
    "features.title": "Tout le service, au même endroit.",
    "features.f1Title": "Cahier en direct",
    "features.f1Body":
      "Chaque réservation apparaît à l'instant où elle est prise, sur tous les postes. Plus de double saisie, plus de rature.",
    "features.f2Title": "Plan de salle",
    "features.f2Body":
      "Dessinez votre salle, placez vos tables, et laissez Alloquence combiner celles qu'il faut pour une grande tablée.",
    "features.f3Title": "Créneaux alternatifs",
    "features.f3Body":
      "Complet à 20 h 30 ? Alloquence propose les horaires les plus proches encore libres, au lieu de refuser le client.",
    "features.f4Title": "Vos horaires, vos règles",
    "features.f4Body":
      "Services du midi et du soir, jours de fermeture, taille maximale des groupes : vos contraintes sont appliquées automatiquement.",
    "features.f5Title": "Plusieurs établissements",
    "features.f5Body":
      "Un seul compte pour tous vos restaurants, avec des équipes et des données cloisonnées les unes des autres.",
    "features.f6Title": "Vos clients, reconnus",
    "features.f6Body":
      "Chaque client est retrouvé à son numéro, avec l'historique de ses réservations et les notes de votre équipe.",

    // Comment ça marche
    "how.title": "Trois temps. Aucun changement d'habitude.",
    "how.s1Title": "Vous prenez la réservation",
    "how.s1Body":
      "Au téléphone ou au comptoir, votre équipe la saisit en quelques secondes.",
    "how.s2Title": "Alloquence place la tablée",
    "how.s2Body":
      "Disponibilités, combinaison de tables, créneaux de repli : le placement est calculé pour vous.",
    "how.s3Title": "Le service se déroule",
    "how.s3Body":
      "Toute la maison voit le même cahier, en direct, du comptoir à la direction.",

    // Dashboard
    "dash.title": "Votre service, en un coup d'œil.",
    "dash.body":
      "Le cahier, le plan de salle et les encaissements réunis. Ce que voit la salle est exactement ce que voit la direction.",
    "dash.point1": "Réservations du service, mises à jour en direct",
    "dash.point2": "Plan de salle et tables combinées",
    "dash.point3": "Suivi des encaissements et des reversements",
    "dash.cardTitle": "Réservations",
    "dash.cardSub": "Aujourd'hui · service du soir",
    "dash.live": "En direct",
    "dash.confirmed": "Confirmé",
    "dash.pending": "En attente",
    "dash.callback": "Grande tablée",
    "dash.callbackMeta": "Camille Durand · 6 couverts · tables 4 + 5",

    // Tarifs
    "pricing.title": "Un prix fixe, sans surprise.",
    "pricing.subtitle":
      "Moins cher qu'un extra le week-end, disponible tous les jours de l'année.",
    "pricing.note":
      "99 € par mois. Si vous activez les réservations payantes : 5 % + 0,50 € par encaissement, jamais sur les pénalités no-show.",
    "pricing.p1Name": "Alloquence",
    "pricing.p1Price": "99€",
    "pricing.p1Cadence": "/ mois",
    "pricing.p1Tagline": "Un seul abonnement, tout le produit.",
    "pricing.p1CtaSubscribe": "Souscrire",
    "pricing.p1Perk1": "Cahier de réservation en direct",
    "pricing.p1Perk2": "Plan de salle et combinaison de tables",
    "pricing.p1Perk3": "Horaires, services et jours de fermeture",
    "pricing.p1Perk4": "Plusieurs établissements sur un même compte",
    "pricing.p1Perk5": "Support inclus",

    // FAQ
    "faq.title": "Ce que les restaurateurs nous demandent.",
    "faq.q1": "Faut-il installer quelque chose ?",
    "faq.a1":
      "Non. Alloquence s'ouvre dans un navigateur, aussi bien sur l'ordinateur du comptoir que sur un téléphone.",
    "faq.q2": "Je gère plusieurs restaurants, c'est possible ?",
    "faq.a2":
      "Oui. Un seul compte, plusieurs établissements, avec des équipes et des données séparées.",
    "faq.q3": "Comment sont gérées les grandes tablées ?",
    "faq.a3":
      "Alloquence combine les tables disponibles et respecte la taille maximale de groupe que vous avez définie.",
    "faq.q4": "Puis-je demander des frais de réservation ?",
    "faq.a4":
      "Le module de réservations payantes existe et se règle par établissement, via Stripe. Il est en cours de déploiement : parlez-nous-en avant de l'activer.",
    "faq.q5": "Mes données m'appartiennent-elles ?",
    "faq.a5":
      "Oui. Vos réservations et vos clients restent les vôtres, et chaque établissement est cloisonné des autres.",

    // CTA finale
    "cta.title": "Ouvrez votre cahier",
    "cta.titleAccent": "ce soir.",
    "cta.subtitle":
      "Créez votre restaurant, dessinez votre salle et prenez votre première réservation en quelques minutes.",
    "cta.primary": "Essayer Alloquence",

    // Footer
    "footer.tagline":
      "Le cahier de réservation des restaurants. Vos tables, vos services et vos équipes au même endroit.",
    "footer.colProduct": "Produit",
    "footer.colResources": "Ressources",
    "footer.colLegal": "Légal",
    "footer.linkHow": "Fonctionnement",
    "footer.linkFeatures": "Fonctionnalités",
    "footer.linkPricing": "Tarifs",
    "footer.linkGuide": "Guide restaurateur",
    "footer.linkIntegrations": "Intégrations",
    "footer.linkStatus": "Statut",
    "footer.linkSupport": "Support",
    "footer.linkLegal": "Mentions légales",
    "footer.linkPrivacy": "Confidentialité",
    "footer.linkTerms": "CGV",
    "footer.linkCookies": "Cookies",
    "footer.rights": "© 2026 Alloquence — Tous droits réservés.",
    "footer.madeWith": "Fait avec soin pour la restauration",

    // 404
    "notFound.title": "Page introuvable",
    "notFound.subtitle":
      "La page que vous cherchez n'existe pas ou a été déplacée.",
    "notFound.home": "Retour à l'accueil"
  },
  en: {
    "nav.how": "How it works",
    "nav.features": "Features",
    "nav.pricing": "Pricing",
    "nav.faq": "FAQ",
    "nav.try": "Try Alloquence",
    "nav.menu": "Menu",
    "nav.langAria": "Language",

    "hero.titleLine1": "The booking book",
    "hero.titleAccent": "that holds the room.",
    "hero.subtitle":
      "Alloquence brings your bookings, your floor plan and your opening hours together. The whole team sees the same service, live, across all your venues.",
    "hero.ctaPrimary": "Try Alloquence",
    "hero.ctaSecondary": "See the dashboard",

    "problem.title": "A service is won or lost by a few",
    "problem.titleAccent": "covers.",
    "problem.stat1": "The paper book",
    "problem.stat1Body":
      "lives behind the counter. No one knows what's in it without walking over.",
    "problem.stat2": "Tables",
    "problem.stat2Body":
      "get combined from memory, and Friday's big party misses a seat that was free.",
    "problem.stat3": "No-shows",
    "problem.stat3Body":
      "are counted afterwards, once the table has sat empty all evening.",

    "features.title": "The whole service, in one place.",
    "features.f1Title": "Live book",
    "features.f1Body":
      "Every booking appears the moment it's taken, on every screen. No double entry, no crossing out.",
    "features.f2Title": "Floor plan",
    "features.f2Body":
      "Draw your room, place your tables, and let Alloquence combine the ones needed for a large party.",
    "features.f3Title": "Alternative slots",
    "features.f3Body":
      "Full at 8:30? Alloquence offers the nearest times still open, instead of turning the guest away.",
    "features.f4Title": "Your hours, your rules",
    "features.f4Body":
      "Lunch and dinner services, closing days, maximum party size: your constraints are applied automatically.",
    "features.f5Title": "Several venues",
    "features.f5Body":
      "One account for all your restaurants, with teams and data kept separate from one another.",
    "features.f6Title": "Guests you recognise",
    "features.f6Body":
      "Every guest is found by their number, with their booking history and your team's notes.",

    "how.title": "Three beats. No change of habit.",
    "how.s1Title": "You take the booking",
    "how.s1Body":
      "On the phone or at the counter, your team enters it in seconds.",
    "how.s2Title": "Alloquence seats the party",
    "how.s2Body":
      "Availability, table combining, fallback slots: the seating is worked out for you.",
    "how.s3Title": "The service runs",
    "how.s3Body":
      "The whole house sees the same book, live, from the counter to the back office.",

    "dash.title": "Your service, at a glance.",
    "dash.body":
      "The book, the floor plan and the payments in one place. What the floor sees is exactly what management sees.",
    "dash.point1": "Bookings for the service, updated live",
    "dash.point2": "Floor plan and combined tables",
    "dash.point3": "Payments and payouts tracking",
    "dash.cardTitle": "Bookings",
    "dash.cardSub": "Today · evening service",
    "dash.live": "Live",
    "dash.confirmed": "Confirmed",
    "dash.pending": "Pending",
    "dash.callback": "Large party",
    "dash.callbackMeta": "Camille Durand · 6 guests · tables 4 + 5",

    "pricing.title": "A fixed price, no surprises.",
    "pricing.subtitle":
      "Cheaper than one weekend extra, available every day of the year.",
    "pricing.note":
      "€99 per month. If you enable paid bookings: 5% + €0.50 per payment collected, never on no-show penalties.",
    "pricing.p1Name": "Alloquence",
    "pricing.p1Price": "€99",
    "pricing.p1Cadence": "/ month",
    "pricing.p1Tagline": "One subscription, the whole product.",
    "pricing.p1CtaSubscribe": "Subscribe",
    "pricing.p1Perk1": "Live booking book",
    "pricing.p1Perk2": "Floor plan and table combining",
    "pricing.p1Perk3": "Opening hours, services and closing days",
    "pricing.p1Perk4": "Several venues on one account",
    "pricing.p1Perk5": "Support included",

    "faq.title": "What restaurateurs ask us.",
    "faq.q1": "Is there anything to install?",
    "faq.a1":
      "No. Alloquence opens in a browser, on the counter computer as well as on a phone.",
    "faq.q2": "I run several restaurants — is that supported?",
    "faq.a2":
      "Yes. One account, several venues, with separate teams and data.",
    "faq.q3": "How are large parties handled?",
    "faq.a3":
      "Alloquence combines the available tables and respects the maximum party size you set.",
    "faq.q4": "Can I ask guests for a booking fee?",
    "faq.a4":
      "The paid bookings module exists and is configured per venue, through Stripe. It is still rolling out: talk to us before switching it on.",
    "faq.q5": "Does my data belong to me?",
    "faq.a5":
      "Yes. Your bookings and your guests remain yours, and each venue is kept separate from the others.",

    "cta.title": "Open your book",
    "cta.titleAccent": "tonight.",
    "cta.subtitle":
      "Create your restaurant, draw your room and take your first booking in a few minutes.",
    "cta.primary": "Try Alloquence",

    "footer.tagline":
      "The booking book for restaurants. Your tables, your services and your teams in one place.",
    "footer.colProduct": "Product",
    "footer.colResources": "Resources",
    "footer.colLegal": "Legal",
    "footer.linkHow": "How it works",
    "footer.linkFeatures": "Features",
    "footer.linkPricing": "Pricing",
    "footer.linkGuide": "Restaurateur guide",
    "footer.linkIntegrations": "Integrations",
    "footer.linkStatus": "Status",
    "footer.linkSupport": "Support",
    "footer.linkLegal": "Legal notice",
    "footer.linkPrivacy": "Privacy",
    "footer.linkTerms": "Terms",
    "footer.linkCookies": "Cookies",
    "footer.rights": "© 2026 Alloquence — All rights reserved.",
    "footer.madeWith": "Crafted with care for restaurants",

    "notFound.title": "Page not found",
    "notFound.subtitle":
      "The page you're looking for doesn't exist or has moved.",
    "notFound.home": "Back to home"
  }
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLang];
