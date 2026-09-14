// Scroll lissé + accès paresseux à GSAP.
//
// gsap n'est PAS importé statiquement ici : ce module est chargé à l'idle par
// base-layout pour le scroll lissé, et un import statique ferait télécharger
// 113 Ko de GSAP à tous les visiteurs même quand aucune section n'anime rien.
// GSAP n'arrive que par `onScroll()`, donc uniquement si une section l'appelle.

interface LenisLike {
  raf: (time: number) => void;
  on: (event: "scroll", handler: () => void) => void;
  scrollTo: (target: HTMLElement) => void;
}

let smooth: Promise<LenisLike | null> | null = null;

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Locomotive v5 enveloppe Lenis sans l'exposer sous un nom stable selon les
// versions. On sonde les emplacements connus plutôt que de parier sur un seul.
function extractLenis(loco: unknown): LenisLike | null {
  const candidate = loco as Record<string, unknown>;

  for (const key of ["lenis", "lenisInstance", "instance"]) {
    const value = candidate?.[key] as LenisLike | undefined;

    if (value && typeof value.raf === "function") return value;
  }

  return null;
}

/** Scroll lissé. Idempotent. Ne charge jamais GSAP. */
export function initScroll(): Promise<LenisLike | null> {
  if (smooth) return smooth;

  smooth = (async () => {
    if (prefersReducedMotion()) return null;

    const { default: LocomotiveScroll } = await import("locomotive-scroll");
    const loco = new LocomotiveScroll({
      lenisOptions: { lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 }
    });

    // Ancres internes → défilement piloté par Locomotive.
    document
      .querySelectorAll<HTMLAnchorElement>('a[href^="#"]')
      .forEach((a) => {
        a.addEventListener("click", (e) => {
          const id = a.getAttribute("href");

          if (!id || id === "#") return;

          const target = document.querySelector<HTMLElement>(id);

          if (target) {
            e.preventDefault();
            loco.scrollTo(target);
          }
        });
      });

    return extractLenis(loco);
  })();

  return smooth;
}

/**
 * Point d'entrée des sections animées : charge GSAP à la demande et le branche
 * sur le scroll lissé. Ne fait rien en prefers-reduced-motion.
 *
 * Locomotive v5 tourne avec `autoRaf: true` et pilote déjà sa propre boucle :
 * surtout PAS de `gsap.ticker.add(t => lenis.raf(t * 1000))`, ce serait un
 * double pilotage du scroll.
 */
export async function onScroll(
  build: (kit: {
    gsap: typeof import("gsap").default;
    ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
  }) => void
): Promise<void> {
  if (prefersReducedMotion()) return;

  const [{ default: gsap }, { ScrollTrigger }, lenis] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    initScroll()
  ]);

  gsap.registerPlugin(ScrollTrigger);

  if (lenis) {
    lenis.on("scroll", () => ScrollTrigger.update());
    gsap.ticker.lagSmoothing(0);
  }

  if (document.fonts?.ready) {
    void document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  build({ gsap, ScrollTrigger });
}
