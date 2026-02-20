import { useState } from "react";
import { useScrollHeader } from "../hooks/useScrollHeader";

const navLinks = [
  { label: "Why Athens", href: "#comparison" },
  { label: "How We Build", href: "#current-projects" },
  { label: "Our Projects", href: "#projects-gallery" },
  { label: "Invest With Us", href: "#guide" },
];

export default function Header() {
  const isScrolled = useScrollHeader(80);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-navy shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group" aria-label="Excellent Group home">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="36" height="36" rx="3" fill="#C9A96E" fillOpacity="0.15" />
            <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="#C9A96E" fontFamily="Georgia, serif" fontSize="20" fontWeight="bold">E</text>
          </svg>
          <span className="font-serif text-lg tracking-widest text-white group-hover:text-gold transition-colors">
            EXCELLENT GROUP
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/80 hover:text-gold text-sm font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a href="#guide" className="btn-gold-outline">Book a Call</a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-gold"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="3" y1="3" x2="19" y2="19" />
                <line x1="19" y1="3" x2="3" y2="19" />
              </>
            ) : (
              <>
                <line x1="2" y1="6" x2="20" y2="6" />
                <line x1="2" y1="11" x2="20" y2="11" />
                <line x1="2" y1="16" x2="20" y2="16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-navy ${
          menuOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <nav className="section-container py-4 flex flex-col gap-4" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-gold text-sm font-medium transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#guide"
            onClick={() => setMenuOpen(false)}
            className="btn-gold self-start"
          >
            Book a Call
          </a>
        </nav>
      </div>
    </header>
  );
}
