import { useScrollReveal, useScrollRevealGroup } from "../hooks/useScrollReveal";

const pillars = [
  {
    number: "01",
    title: "65% LTV Leverage",
    subtitle: "Own with 35% Equity",
    body:
      "Our developer financing allows you to secure a premium Athens flat with just 35% down. That's meaningful leverage in a market that's 35% below its 2008 peak — amplifying your upside as values recover.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="2" y="18" width="6" height="12" rx="1" fill="#C9A96E" />
        <rect x="11" y="10" width="6" height="20" rx="1" fill="#C9A96E" fillOpacity="0.7" />
        <rect x="20" y="2" width="6" height="28" rx="1" fill="#C9A96E" fillOpacity="0.4" />
        <path d="M2 18L13 7l7 5 8-10" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Turnkey Delivery",
    subtitle: "Fully Furnished to the Cutlery",
    body:
      "We deliver a show-home-standard flat: fully furnished, white goods installed, professional photography done, and listed with a lettings agent — before we hand you the keys. Zero effort required.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="3" y="8" width="26" height="20" rx="2" stroke="#C9A96E" strokeWidth="1.8" />
        <path d="M3 14h26" stroke="#C9A96E" strokeWidth="1.8" />
        <path d="M10 8V5a2 2 0 114 0v3" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M18 8V5a2 2 0 114 0v3" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M11 22l3 3 7-7" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "End-to-End Management",
    subtitle: "Zero-Distance Oversight",
    body:
      "From tenant sourcing and rent collection to maintenance coordination and annual reporting — our Athens-based team manages your asset entirely. You invest from London; we operate on the ground.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <circle cx="16" cy="16" r="13" stroke="#C9A96E" strokeWidth="1.8" />
        <circle cx="16" cy="16" r="5" fill="#C9A96E" fillOpacity="0.25" />
        <path d="M16 3v4M16 25v4M3 16h4M25 16h4" stroke="#C9A96E" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2" fill="#C9A96E" />
      </svg>
    ),
  },
];

export default function Pillars() {
  const titleRef = useScrollReveal({ threshold: 0.2 });
  const groupRef = useScrollRevealGroup({ threshold: 0.1 });

  return (
    <section id="pillars" className="bg-white py-20 lg:py-28">
      <div className="section-container">
        {/* Header */}
        <div ref={titleRef} className="reveal reveal-up text-center mb-14">
          <h2 className="section-title mb-4">Three Reasons Investors Choose Athens.</h2>
          <div className="gold-divider" />
        </div>

        {/* Cards */}
        <div
          ref={groupRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pillars.map((pillar, i) => (
            <div
              key={pillar.number}
              className={`reveal reveal-up stagger-${i + 1} group relative bg-stone rounded-lg p-8 border border-transparent
                          hover:-translate-y-1 hover:shadow-xl hover:border-gold/30 transition-all duration-300 cursor-default`}
            >
              {/* Watermark number */}
              <span
                className="absolute top-6 right-6 font-serif text-7xl text-navy/5 select-none group-hover:text-gold/10 transition-colors duration-300"
                aria-hidden="true"
              >
                {pillar.number}
              </span>

              {/* Gold accent line */}
              <div className="w-8 h-0.5 bg-gold mb-6 transition-all duration-300 group-hover:w-12" />

              {/* Icon */}
              <div className="mb-5">{pillar.icon}</div>

              {/* Text */}
              <h3 className="font-serif text-xl text-navy mb-1">{pillar.title}</h3>
              <p className="text-gold text-sm font-medium mb-4">{pillar.subtitle}</p>
              <p className="text-navy/65 text-sm leading-relaxed">{pillar.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
