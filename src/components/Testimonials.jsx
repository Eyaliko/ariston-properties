import { useScrollRevealGroup } from "../hooks/useScrollReveal";

const testimonials = [
  {
    quote:
      "I spent two years looking at Manchester buy-to-lets — the yields had collapsed. Athens offered everything I wanted: proper leverage, hands-off management, and a yield above 7%. Excellent Group made the process straightforward.",
    name: "James H.",
    location: "Manchester",
    flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    budget: "£175k investment",
  },
  {
    quote:
      "As someone who'd never invested abroad, I was sceptical. But the turnkey delivery meant I never had to worry about contractors or furnishing. The flat was rented within three weeks of completion.",
    name: "Sarah K.",
    location: "Edinburgh",
    flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    budget: "£210k investment",
  },
  {
    quote:
      "The 12-month delivery guarantee was what convinced me. Every UK developer I'd worked with ran late. Excellent Group hit the date contractually — and the flat looked better than the renders.",
    name: "David M.",
    location: "London",
    flag: "🇬🇧",
    budget: "£320k investment",
  },
];

export default function Testimonials() {
  const groupRef = useScrollRevealGroup({ threshold: 0.1 });

  return (
    <section className="bg-navy py-20 lg:py-28">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
            What Our Buyers Say.
          </h2>
          <div className="w-12 h-0.5 bg-gold mx-auto" />
        </div>

        {/* Cards */}
        <div ref={groupRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-up stagger-${i + 1} bg-white/5 border border-white/10 rounded-lg p-8 flex flex-col`}
            >
              {/* Gold quote mark */}
              <svg
                className="mb-5 flex-shrink-0"
                width="32"
                height="24"
                viewBox="0 0 32 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l2.4 3.2C11.2 4.8 8 8 8 14.4H14.4V24H0ZM17.6 24V14.4C17.6 6.4 22.4 1.6 32 0l2.4 3.2C28.8 4.8 25.6 8 25.6 14.4H32V24H17.6Z"
                  fill="#C9A96E"
                  fillOpacity="0.6"
                />
              </svg>

              <blockquote className="text-white/75 text-sm leading-relaxed italic flex-1 mb-6">
                "{t.quote}"
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-3 border-t border-white/10 pt-5">
                <span className="text-xl" aria-hidden="true">{t.flag}</span>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name} — {t.location}</p>
                  <p className="text-gold text-xs mt-0.5">{t.budget}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-white/25 text-xs mt-10">
          Testimonials are illustrative of typical investor profiles. Individual results may vary.
        </p>
      </div>
    </section>
  );
}
