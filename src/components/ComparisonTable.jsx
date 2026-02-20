import { useScrollReveal, useScrollRevealGroup } from "../hooks/useScrollReveal";

// ─── Data ─────────────────────────────────────────────────────────────────────

const comparisonRows = [
  {
    metric: "Gross Rental Yield",
    uk: "4.0% – 6.5%",
    athens: "10% – 15%",
    athensWins: true,
  },
  {
    metric: "Capital Growth (YoY)",
    uk: "~1.5% – 3.0%",
    athens: "~6% – 8%",
    athensWins: true,
  },
  {
    metric: "Entry Price / sq.m",
    uk: "€6,000 – €12k+",
    athens: "€2,500 – €4,500",
    athensWins: true,
  },
  {
    metric: "Occupancy Rate",
    uk: "~96%",
    athens: "94%",
    athensWins: false,
  },
];

const taxCards = [
  {
    category: "Capital Gains Tax",
    athensValue: "0%",
    athensNote: "",
    ukValue: "18% – 24%",
    ukNote: "",
  },
  {
    category: "Transfer Tax",
    athensValue: "3.09%",
    athensNote: "",
    ukValue: "8%+ (SDLT)",
    ukNote: "",
  },
  {
    category: "Rental Income Tax",
    athensValue: "15%",
    athensNote: "",
    ukValue: "20% – 45%",
    ukNote: "No mortgage interest deduction",
  },
];

const qualitativeDrivers = [
  {
    number: "01",
    title: "Year-Round Demand",
    body: "90,000+ students, digital nomads, and a growing corporate hub create 12-month occupancy pressure that seasonal tourist markets can't match.",
  },
  {
    number: "02",
    title: "The Golden Visa Floor",
    body: "€250k residency visa demand creates a permanent value floor. Foreign capital competing for the same stock supports prices structurally.",
  },
  {
    number: "03",
    title: "Cost of Ownership",
    body: "30–40% cheaper operational costs — maintenance, management, and service charges — translate directly into higher net income retained.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      className="inline-block mr-1.5 mt-0.5 flex-shrink-0"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7.5" fill="#C9A96E" fillOpacity="0.18" />
      <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#C9A96E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      className="inline-block mr-1.5 mt-0.5 flex-shrink-0"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7.5" fill="#1B2A4A" fillOpacity="0.10" />
      <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#1B2A4A" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SectionLabel({ number, title }) {
  return (
    <div className="flex items-center gap-6 mb-8">
      <span className="font-serif text-5xl text-gold/20 select-none leading-none tabular-nums" aria-hidden="true">
        {number}
      </span>
      <div className="flex-1 flex items-center gap-4">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-navy/50 whitespace-nowrap">
          {title}
        </h3>
        <div className="flex-1 h-px bg-navy/10" />
      </div>
    </div>
  );
}

function TaxCard({ card }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-navy/8 h-full">
      {/* Category label */}
      <div className="bg-navy px-5 py-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/50">{card.category}</p>
      </div>

      {/* Athens row — gold tint, primacy position */}
      <div className="bg-gold/10 px-5 py-4 border-b border-gold/15">
        <div className="flex items-start gap-2">
          <CheckIcon />
          <div>
            <p className="text-xs text-gold uppercase tracking-wider font-medium mb-0.5">Athens</p>
            <p className="text-navy font-semibold text-lg leading-tight">{card.athensValue}</p>
            {card.athensNote && (
              <p className="text-navy/60 text-xs mt-0.5">{card.athensNote}</p>
            )}
          </div>
        </div>
      </div>

      {/* UK row — muted */}
      <div className="bg-navy/[0.03] px-5 py-4">
        <div className="flex items-start gap-2">
          <XIcon />
          <div>
            <p className="text-xs text-navy/40 uppercase tracking-wider mb-0.5">UK</p>
            <p className="text-navy/70 font-semibold text-lg leading-tight">{card.ukValue}</p>
            {card.ukNote && (
              <p className="text-navy/50 text-xs mt-0.5">{card.ukNote}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function QualitativeCard({ driver, index }) {
  return (
    <div
      className={`reveal reveal-up stagger-${Math.min(index + 1, 4)} group relative bg-navy rounded-lg p-8 overflow-hidden border border-white/5
                  hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-default`}
    >
      {/* Watermark numeral */}
      <span
        className="absolute top-6 right-6 font-serif text-8xl text-white/5 select-none leading-none"
        aria-hidden="true"
      >
        {driver.number}
      </span>

      {/* Gold accent line — widens on hover */}
      <div className="w-8 h-0.5 bg-gold mb-6 transition-all duration-300 group-hover:w-12" />

      {/* Text */}
      <h4 className="font-serif text-xl text-white mb-4">{driver.title}</h4>
      <p className="text-white/65 text-sm leading-relaxed">{driver.body}</p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function ComparisonTable() {
  const titleRef  = useScrollReveal({ threshold: 0.2 });
  const groupRef1 = useScrollRevealGroup({ threshold: 0.08 });
  const groupRef2 = useScrollRevealGroup({ threshold: 0.08 });
  const groupRef3 = useScrollRevealGroup({ threshold: 0.08 });

  return (
    <section id="comparison" className="bg-stone py-20 lg:py-28">
      <div className="section-container">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div ref={titleRef} className="reveal reveal-up text-center mb-16">
          <h2 className="section-title mb-4">The Numbers Don't Lie.</h2>
          <div className="gold-divider" />
          <p className="text-navy/60 mt-6 max-w-xl mx-auto">
            Athens consistently outperforms the UK buy-to-let market on every metric that matters to income investors.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            PART 1 — Core Investment Metrics
        ══════════════════════════════════════════════════════════════════ */}
        <SectionLabel number="01" title="Core Investment Metrics" />

        {/* Mobile stacked layout — Part 1 */}
        <div className="md:hidden space-y-4" ref={groupRef1}>
          {comparisonRows.map((row, i) => (
            <div
              key={row.metric + "-mobile"}
              className={`reveal reveal-up stagger-${Math.min(i + 1, 4)} rounded-lg overflow-hidden shadow`}
            >
              <div className="bg-navy px-5 py-3">
                <p className="text-gold text-xs font-semibold uppercase tracking-widest">{row.metric}</p>
              </div>
              <div className="bg-white px-5 py-4 border-b border-navy/8">
                <p className="text-xs text-navy/40 uppercase tracking-wider mb-1">UK 2026</p>
                <p className="text-sm text-navy/70">{row.uk}</p>
              </div>
              <div className={`px-5 py-4 ${row.athensWins ? "bg-gold/8" : "bg-stone"}`}>
                <p className="text-xs text-gold uppercase tracking-wider mb-1">Athens 2026</p>
                <p className={`text-sm ${row.athensWins ? "text-navy font-medium" : "text-navy/70"}`}>
                  {row.athensWins && <CheckIcon />}
                  {row.athens}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Insight summary under Core Investment Metrics ── */}
        <div className="mt-4 space-y-6">
          {/* Three takeaway chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-5 border border-navy/8 shadow-sm text-center">
              <p className="font-serif text-3xl text-gold mb-1">2×</p>
              <p className="text-navy text-sm font-semibold mb-1">Capital Growth</p>
              <p className="text-navy/50 text-xs">Athens grows at 6–8% YoY vs 1.5–3% in the UK</p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-navy/8 shadow-sm text-center">
              <p className="font-serif text-3xl text-gold mb-1">60%</p>
              <p className="text-navy text-sm font-semibold mb-1">Lower Entry Cost</p>
              <p className="text-navy/50 text-xs">€2,500–€4,500/sq.m vs €6,000–€12,000+ in UK cities</p>
            </div>
            <div className="bg-white rounded-lg p-5 border border-navy/8 shadow-sm text-center">
              <p className="font-serif text-3xl text-gold mb-1">12%</p>
              <p className="text-navy text-sm font-semibold mb-1">Peak Gross Yield</p>
              <p className="text-navy/50 text-xs">Top-end Athens yield vs 6.5% maximum in the UK</p>
            </div>
          </div>
        </div>


        {/* ══════════════════════════════════════════════════════════════════
            PART 2 — Tax & Regulatory Edge
        ══════════════════════════════════════════════════════════════════ */}
        <SectionLabel number="02" title="Tax & Regulatory Edge" />

        <p className="text-navy/50 text-sm italic mb-8">
          "Section 24 changed the UK math. Athens gives it back."
        </p>

        <div ref={groupRef2} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {taxCards.map((card, i) => (
            <div key={card.category} className={`reveal reveal-up stagger-${Math.min(i + 1, 4)}`}>
              <TaxCard card={card} />
            </div>
          ))}
        </div>


        {/* ══════════════════════════════════════════════════════════════════
            PART 3 — Key Qualitative Drivers
        ══════════════════════════════════════════════════════════════════ */}
        <SectionLabel number="03" title="Key Qualitative Drivers" />

        <div ref={groupRef3} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {qualitativeDrivers.map((driver, i) => (
            <QualitativeCard key={driver.number} driver={driver} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <a href="#guide" className="btn-gold">
            Get the Full Investor's Guide
          </a>
        </div>

      </div>
    </section>
  );
}
