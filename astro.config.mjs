// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // ⚠️ Set this to your production domain (used for canonical, hreflang, sitemap).
  site: "https://alloquence.fr",
  // Fully static marketing site (no server runtime) — deploys anywhere.
  output: "static",
  integrations: [
    react(),
    sitemap({
      filter: (page) => !/\/(admin|login|api|auth)(\/|$)/.test(page)
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  image: {
    // Local assets only for now.
    remotePatterns: []
  },
  experimental: {
    // Self-hosted, auto-optimized fonts (downloaded at build, served from origin)
    // with generated fallback metrics → no layout shift (CLS), no render-blocking.
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Instrument Sans",
        cssVariable: "--font-instrument",
        weights: [400, 500, 600, 700],
        styles: ["normal", "italic"],
        subsets: ["latin"],
        fallbacks: ["system-ui", "sans-serif"]
      }
    ]
  },
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en"],
    routing: {
      // FR served at "/", EN at "/en/".
      prefixDefaultLocale: false
    }
  }
});
