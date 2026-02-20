export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-white/8 text-white">
      <div className="section-container py-14">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="36" height="36" rx="4" fill="#C9A96E" fillOpacity="0.15" />
                <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="#C9A96E" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold">E</text>
              </svg>
              <span className="font-serif text-xl tracking-wider text-white">EXCELLENT GROUP</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Premium Athens property investment, <br />built for British investors.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold mb-5">Navigation</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li><a href="#current-projects" className="hover:text-gold transition-colors">Current Projects</a></li>
              <li><a href="#comparison" className="hover:text-gold transition-colors">Financing & Comparison</a></li>
              <li><a href="#pillars" className="hover:text-gold transition-colors">Why Athens</a></li>
              <li><a href="#guide" className="hover:text-gold transition-colors">Investor's Guide</a></li>
            </ul>
          </div>

          {/* Column 3: CTA */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-gold mb-5">Get Started</h3>
            <p className="text-white/60 text-sm mb-5">Speak to a member of our investment team. 20 minutes. No obligation.</p>
            <a href="#guide" className="btn-gold-outline">Book a Strategy Call</a>
          </div>
        </div>

        {/* Legal disclaimer */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-white/35 text-xs leading-relaxed mb-4">
            Property investment carries risk. Values can go down as well as up. Past performance is not indicative of future results.
            Excellent Group is not authorised by the Financial Conduct Authority. This website is for informational purposes only
            and does not constitute financial or investment advice. You should obtain independent professional advice before making
            any investment decision.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-white/30 text-xs">
            <span>© {new Date().getFullYear()} Excellent Group Ltd. All rights reserved.</span>
            <span>Registered in England &amp; Wales. Company No. 12345678</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
