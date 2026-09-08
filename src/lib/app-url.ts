/**
 * URL de l'app SaaS (frontend Angular), cible du bouton "Se connecter" et de la
 * redirection auto quand une session Alloquence est détectée.
 *
 * Ordre : `PUBLIC_APP_URL` (si défini) > localhost:4200 en dev > prod.
 * → En dev (`astro dev`) tout marche sans aucune config.
 */
export function getAppUrl(): string {
  if (import.meta.env.PUBLIC_APP_URL) return import.meta.env.PUBLIC_APP_URL;

  return import.meta.env.DEV ? "http://localhost:4200" : "https://app.alloquence.fr";
}
