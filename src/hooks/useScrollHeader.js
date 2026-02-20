import { useState, useEffect } from "react";

/**
 * Returns `isScrolled: true` when window.scrollY exceeds `threshold` pixels.
 * Uses a passive scroll listener for performance.
 */
export function useScrollHeader(threshold = 80) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run once on mount to handle refreshed-at-scroll position
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return isScrolled;
}
