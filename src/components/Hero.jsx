import { useScrollReveal } from "../hooks/useScrollReveal";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1800&q=80";

export default function Hero() {
  const eyebrowRef = useScrollReveal({ threshold: 0.2 });
  const headlineRef = useScrollReveal({ threshold: 0.2 });
  const subRef = useScrollReveal({ threshold: 0.2 });
  const ctaRef = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        role="img"
        aria-label="Athens aerial view"
      />

      {/* Diagonal gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(27,38,59,0.55) 0%, rgba(27,38,59,0.92) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative section-container text-center text-white pt-32 pb-24">
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          className="reveal reveal-up flex items-center justify-center gap-4 mb-8"
        >
          <span className="block w-10 h-px bg-gold" aria-hidden="true" />
          <span className="text-gold text-xs font-semibold uppercase tracking-widest">
            For UK Property Investors
          </span>
          <span className="block w-10 h-px bg-gold" aria-hidden="true" />
        </div>

        {/* H1 */}
        <h1
          ref={headlineRef}
          className="reveal reveal-up stagger-1 font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6 max-w-4xl mx-auto"
        >
          The Smarter Buy-to-Let isn't in the UK.{" "}
          <em className="text-gold not-italic">It's in Athens.</em>
        </h1>

        {/* Sub-headline */}
        <p
          ref={subRef}
          className="reveal reveal-up stagger-2 text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Secure a premium, fully-managed urban flat with{" "}
          <strong className="text-white font-semibold">65% LTV financing</strong>. From keys
          to tenants, we handle everything.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="reveal reveal-up stagger-3 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#guide" className="btn-gold">
            Download the 2026 UK Investor's Guide
          </a>
          <a href="#current-projects" className="btn-ghost">
            View Projects →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M8 2v12M3 10l5 6 5-6" />
        </svg>
      </div>
    </section>
  );
}
