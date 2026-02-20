import { useScrollRevealGroup } from "../hooks/useScrollReveal";

const stats = [
  { value: "65%", label: "LTV Financing" },
  { value: "12 Mo", label: "Delivery Guarantee" },
  { value: "10–15%", label: "Gross Yield" },
  { value: "100%", label: "Fully Managed" },
  { value: "1,000+", label: "Apartments Delivered" },
  { value: "€200M+", label: "In Investments" },
];

export default function StatsBar() {
  const groupRef = useScrollRevealGroup({ threshold: 0.2 });

  return (
    <section className="bg-navy border-t border-white/10" ref={groupRef}>
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-6 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`reveal reveal-up stagger-${i + 1} py-8 px-6 text-center`}
            >
              <p className="font-serif text-3xl md:text-4xl text-gold mb-1">{stat.value}</p>
              <p className="text-white/50 text-xs font-medium uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
