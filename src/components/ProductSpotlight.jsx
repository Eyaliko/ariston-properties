import { useScrollReveal, useScrollRevealGroup } from "../hooks/useScrollReveal";

const INTERIOR_IMAGE =
  "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=80";
const EXTERIOR_IMAGE =
  "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=900&q=80";

const processSteps = [
  { n: "01", label: "Site Selection", detail: "We acquire below-market stock in Athens' premium central districts." },
  { n: "02", label: "Structural Renovation", detail: "Full seismic-grade structural works completed to EU certification standards." },
  { n: "03", label: "Interior Fit-Out", detail: "Show-home furnishing package — appliances, fixtures, linen, cutlery included." },
  { n: "04", label: "Lettings & Tenancy", detail: "Professional photography, listing, tenant vetting and tenancy agreement handled." },
  { n: "05", label: "Keys & Handover", detail: "You receive title documents, rental income account access, and a welcome pack." },
];

const marketMetrics = [
  { value: "35%", label: "Below 2008 Peak" },
  { value: "£150k", label: "Entry Point" },
  { value: "12%–15%", label: "Target Gross Yield" },
];

export default function ProductSpotlight() {
  const block1TitleRef = useScrollReveal({ threshold: 0.15 });
  const block1GroupRef = useScrollRevealGroup({ threshold: 0.1 });
  const block2GroupRef = useScrollRevealGroup({ threshold: 0.1 });

  return (
    <section id="current-projects" className="bg-stone py-20 lg:py-28">
      <div className="section-container">
        {/* Section header */}
        <div ref={block1TitleRef} className="reveal reveal-up text-center mb-16">
          <h2 className="section-title mb-4">Historic Athens. State-of-the-Art Interiors.</h2>
          <div className="gold-divider" />
          <p className="text-navy/60 mt-6 max-w-xl mx-auto">
            We acquire prime central Athens sites, develop full residential buildings, and deliver fully furnished, income-ready apartments — within 12 months, guaranteed.
          </p>
        </div>

        {/* Block 1: Image left, steps right */}
        <div ref={block1GroupRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image with badge */}
          <div className="reveal reveal-left relative order-1 lg:order-1">
            <img
              src={INTERIOR_IMAGE}
              alt="Fully furnished Ariston Properties interior, Athens"
              className="w-full h-80 lg:h-[460px] object-cover rounded-lg shadow-xl"
              loading="lazy"
            />
            {/* Guarantee badge */}
            <div className="absolute -bottom-5 -right-5 bg-gold text-navy-dark rounded-lg px-6 py-4 shadow-xl text-center">
              <p className="font-serif text-2xl font-bold leading-none">12</p>
              <p className="text-xs font-semibold uppercase tracking-wider mt-1">Month Delivery<br />Guarantee</p>
            </div>
          </div>

          {/* Process steps */}
          <div className="order-2 lg:order-2">
            <h3 className="reveal reveal-right font-serif text-2xl text-navy mb-8">
              Our Five-Step Delivery Process
            </h3>
            <ol className="space-y-5">
              {processSteps.map((step, i) => (
                <li
                  key={step.n}
                  className={`reveal reveal-right stagger-${Math.min(i + 1, 4)} flex gap-5`}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
                    <span className="font-serif text-gold text-xs font-bold">{step.n}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm mb-0.5">{step.label}</p>
                    <p className="text-navy/55 text-sm leading-relaxed">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Block 2: Content left, image right */}
        <div ref={block2GroupRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h3 className="reveal reveal-left font-serif text-2xl text-navy mb-4">
              A Market Priced for the Patient Investor.
            </h3>
            <p className="reveal reveal-left stagger-1 text-navy/65 leading-relaxed mb-6">
              Athens property remains 35% below its 2008 peak, even as rental demand has surged with the city's position as one of Europe's
              fastest-growing short-let and long-let markets. For UK investors priced out of London and Manchester, Athens offers institutional-quality
              assets at a fraction of the price — with income from day one.
            </p>
            <p className="reveal reveal-left stagger-2 text-navy/65 leading-relaxed mb-8">
              Our portfolio focuses exclusively on central Athens — Kolonaki, Koukaki, Monastiraki, and Exarchia — where rental demand from
              professionals and digital nomads underpins consistent occupancy above 90%.
            </p>

            {/* Inline metrics */}
            <div className="reveal reveal-up stagger-3 grid grid-cols-3 gap-4">
              {marketMetrics.map((m) => (
                <div key={m.label} className="text-center bg-white rounded-lg py-4 px-2 shadow-sm border border-navy/8">
                  <p className="font-serif text-2xl text-gold mb-1">{m.value}</p>
                  <p className="text-navy/50 text-xs uppercase tracking-wider">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="reveal reveal-right order-1 lg:order-2">
            <img
              src={EXTERIOR_IMAGE}
              alt="Neoclassical Athens apartment building, Ariston Properties"
              className="w-full h-80 lg:h-[440px] object-cover rounded-lg shadow-xl"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
