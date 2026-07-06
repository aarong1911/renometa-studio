import { useEffect, useRef } from "react";

/**
 * Attaches a scroll-triggered reveal by toggling `is-visible` on the element
 * once it enters the viewport. Pair with the `.reveal` utility in styles.css.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; once?: boolean },
) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    // Already in or above viewport — reveal without animation gating.
    if (rect.top < vh - 40) {
      el.classList.add("is-visible");
      return;
    }
    // Below the fold — hide and wait for scroll.
    el.classList.add("reveal-init");
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            if (options?.once !== false) io.unobserve(e.target);
          }
        }
      },
      {
        threshold: options?.threshold ?? 0.01,
        rootMargin: options?.rootMargin ?? "0px 0px 0px 0px",
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.once]);
  return ref;
}
