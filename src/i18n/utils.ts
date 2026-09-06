import { defaultLang, languages, ui, type Lang, type UiKey } from "@/i18n/ui";

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");

  if (lang in ui) {
    return lang as Lang;
  }

  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Prefix a path with the locale ("" for the default locale). */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;

  return lang === defaultLang ? clean : `/${lang}${clean}`;
}

/** Strip the locale prefix from a URL → the locale-agnostic path. */
export function getBarePath(url: URL): string {
  const segments = url.pathname.split("/").filter(Boolean);

  if (segments[0] && segments[0] in languages) {
    const rest = segments.slice(1).join("/");

    return rest ? `/${rest}` : "/";
  }

  return url.pathname;
}

export interface AlternateLink {
  lang: Lang;
  href: string;
}

/** Absolute hreflang alternates for the current path, one per locale. */
export function getAlternates(url: URL, site: URL): AlternateLink[] {
  const bare = getBarePath(url);

  return (Object.keys(languages) as Lang[]).map((lang) => ({
    lang,
    href: new URL(localizePath(bare, lang), site).href
  }));
}
