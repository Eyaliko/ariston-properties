import { useEffect, useState } from "react";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function StickyCtaButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[aria-label="Hero section"]');
    const guide = document.getElementById("guide");

    if (!hero || !guide) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0 }
    );

    const guideObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false);
        } else {
          // Only re-show if hero is also out of view
          const heroRect = hero.getBoundingClientRect();
          if (heroRect.bottom < 0) {
            setVisible(true);
          }
        }
      },
      { threshold: 0 }
    );

    heroObserver.observe(hero);
    guideObserver.observe(guide);

    return () => {
      heroObserver.disconnect();
      guideObserver.disconnect();
    };
  }, []);

  const transitionClasses = prefersReducedMotion
    ? ""
    : "transition-all duration-300";

  const visibilityClasses = visible
    ? "opacity-100 translate-y-0 pointer-events-auto"
    : "opacity-0 translate-y-2 pointer-events-none";

  return (
    <a
      href="#guide"
      aria-label="Get the Free Guide"
      className={`fixed bottom-8 right-6 z-50 btn-gold ${transitionClasses} ${visibilityClasses}`}
    >
      Get the Free Guide →
    </a>
  );
}
