import { useEffect, useState } from "react";

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function validate(fields) {
  const errors = {};
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Enter a valid email.";
  }
  if (!fields.phone.trim()) {
    errors.phone = "Phone is required.";
  } else if (!/^[\d\s+\-().]{7,20}$/.test(fields.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  return errors;
}

export default function StickyCtaButton() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(true);
  const [fields, setFields] = useState({ name: "", email: "", phone: "" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const hero = document.querySelector('[aria-label="Hero section"]');
    const guide = document.getElementById("guide");

    if (!hero || !guide) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) setVisible(true);
        else setVisible(false);
      },
      { threshold: 0 }
    );

    const guideObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(false);
        } else {
          const heroRect = hero.getBoundingClientRect();
          if (heroRect.bottom < 0) setVisible(true);
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

  const transitionClasses = prefersReducedMotion ? "" : "transition-all duration-300";

  const visibilityClasses = visible
    ? "opacity-100 translate-y-0 pointer-events-auto"
    : "opacity-0 translate-y-2 pointer-events-none";

  function handleChange(e) {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleBlur(e) {
    const name = e.target.name;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(fields)[name] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, phone: true });
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ name: fields.name, email: fields.email, phone: fields.phone }),
      });
    } catch {
      // Silently continue — show success even if the sheet write fails
    }
    setLoading(false);
    setSuccess(true);
  }

  return (
    <div className={`fixed bottom-8 right-6 z-50 flex flex-col items-end gap-3 ${transitionClasses} ${visibilityClasses}`}>

      {/* Floating form panel */}
      {open && (
        <div className="w-80 bg-white rounded-xl shadow-2xl border border-gray-100 p-6">
          {success ? (
            <div className="flex flex-col items-center text-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#C9A96E]/15 flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 13l5 5 10-10" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="font-serif text-navy text-lg mb-1">Guide on its way.</p>
              <p className="text-gray-400 text-xs leading-relaxed">Check your inbox — we'll follow up within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="font-serif text-navy text-base mb-4">Get the Free Guide</p>

              {/* Name (optional) */}
              <div className="mb-3">
                <label htmlFor="sticky-name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Name <span className="normal-case font-normal text-gray-400">(optional)</span>
                </label>
                <input
                  id="sticky-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={fields.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-gray-200 rounded px-3 py-2 text-sm text-navy placeholder-gray-300 outline-none focus:border-[#C9A96E] transition-colors"
                />
              </div>

              {/* Email (required) */}
              <div className="mb-3">
                <label htmlFor="sticky-email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Email <span className="text-[#C9A96E]">*</span>
                </label>
                <input
                  id="sticky-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  className={`w-full border rounded px-3 py-2 text-sm text-navy placeholder-gray-300 outline-none transition-colors
                    ${touched.email && errors.email
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 focus:border-[#C9A96E]"
                    }`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone (required) */}
              <div className="mb-5">
                <label htmlFor="sticky-phone" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  Phone <span className="text-[#C9A96E]">*</span>
                </label>
                <input
                  id="sticky-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={fields.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="+44 7700 900000"
                  className={`w-full border rounded px-3 py-2 text-sm text-navy placeholder-gray-300 outline-none transition-colors
                    ${touched.phone && errors.phone
                      ? "border-red-400 bg-red-50"
                      : "border-gray-200 focus:border-[#C9A96E]"
                    }`}
                />
                {touched.phone && errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                      <path d="M8 2a6 6 0 016 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  "Send Me the Guide"
                )}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Buttons row */}
      <div className="flex items-center gap-2">
        {/* WhatsApp button */}
        <a
          href="https://wa.me/306945353757"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="flex items-center justify-center w-11 h-11 rounded-full shadow-lg bg-[#25D366] hover:bg-[#1ebe5d] transition-colors"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.215a.75.75 0 00.92.92l5.42-1.461A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.699 9.699 0 01-4.947-1.353l-.355-.21-3.676.991.982-3.593-.23-.368A9.699 9.699 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
          </svg>
        </a>

        {/* Toggle button */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close form" : "Get the Free Guide"}
          className="btn-gold flex items-center gap-2"
        >
          {open ? (
            <>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Close
            </>
          ) : (
            "Get the Free Guide →"
          )}
        </button>
      </div>
    </div>
  );
}
