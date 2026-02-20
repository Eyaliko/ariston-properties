import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const budgetOptions = [
  { value: "", label: "Select your investment budget" },
  { value: "150k-250k", label: "£150,000 – £250,000" },
  { value: "250k-350k", label: "£250,000 – £350,000" },
  { value: "350k-500k", label: "£350,000 – £500,000" },
  { value: "500k+", label: "£500,000+" },
];

const guideContents = [
  "Athens market analysis: valuations, yields & rental data",
  "Step-by-step guide to UK overseas property financing",
  "Tax implications for UK investors in Greece (rental income, CGT)",
  "Neighbourhood deep-dive: Kolonaki, Koukaki & Monastiraki",
  "Worked investment examples with real yield projections",
];

function validate(fields) {
  const errors = {};
  if (!fields.name.trim()) errors.name = "Please enter your full name.";
  if (!fields.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!fields.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!/^[\d\s+\-().]{7,20}$/.test(fields.phone)) {
    errors.phone = "Please enter a valid phone number.";
  }
  if (!fields.budget) errors.budget = "Please select your investment budget.";
  return errors;
}

export default function LeadGenForm() {
  const leftRef = useScrollReveal({ threshold: 0.15 });
  const rightRef = useScrollReveal({ threshold: 0.15 });

  const [fields, setFields] = useState({ name: "", email: "", phone: "", budget: "" });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const fieldErrors = validate(fields);

  function handleChange(e) {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleBlur(e) {
    const name = e.target.name;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const allTouched = { name: true, email: true, phone: true, budget: true };
    setTouched(allTouched);
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1600));
    setLoading(false);
    setSuccess(true);
  }

  return (
    <section id="guide" className="bg-stone py-20 lg:py-28">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <div ref={leftRef} className="reveal reveal-left">
            <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-3">Free Download</p>
            <h2 className="font-serif text-3xl md:text-4xl text-navy leading-tight mb-5">
              Get the 2026 UK Investor's Guide. Free.
            </h2>
            <p className="text-navy/65 mb-8 leading-relaxed">
              Everything you need to make an informed decision about Athens buy-to-let — written specifically for UK property investors.
            </p>

            <ul className="space-y-3 mb-10">
              {guideContents.map((item) => (
                <li key={item} className="flex gap-3 items-start text-sm text-navy/75">
                  <svg className="flex-shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <circle cx="9" cy="9" r="8.5" fill="#C9A96E" fillOpacity="0.15" />
                    <path d="M5.5 9.5l2.5 2.5 5-5" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="bg-navy/5 rounded-lg p-5 border border-navy/10">
              <p className="text-navy font-semibold text-sm mb-1">Prefer to talk?</p>
              <p className="text-navy/60 text-sm mb-3">
                Book a free 20-minute strategy call with one of our UK investment specialists.
              </p>
              <a href="#guide" className="text-gold text-sm font-semibold hover:underline">
                Book a 20-minute strategy call →
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div ref={rightRef} className="reveal reveal-right bg-white rounded-xl shadow-xl p-8 lg:p-10">
            {success ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mb-5">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <path d="M6 17l7 7 13-13" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-navy mb-2">Guide on its way.</h3>
                <p className="text-navy/60 text-sm">
                  Check your inbox — we'll also follow up within one business day to answer any questions.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 className="font-serif text-xl text-navy mb-6">Request Your Free Guide</h3>

                {/* Full Name */}
                <div className="mb-5">
                  <label htmlFor="name" className="block text-xs font-semibold text-navy/70 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. James Harrison"
                    className={`w-full border rounded px-4 py-3 text-sm text-navy placeholder-navy/30 outline-none transition-colors
                      ${touched.name && errors.name
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-navy/20 focus:border-gold bg-white"
                      }`}
                  />
                  {touched.name && errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-5">
                  <label htmlFor="email" className="block text-xs font-semibold text-navy/70 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={fields.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="james@example.co.uk"
                    className={`w-full border rounded px-4 py-3 text-sm text-navy placeholder-navy/30 outline-none transition-colors
                      ${touched.email && errors.email
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-navy/20 focus:border-gold bg-white"
                      }`}
                  />
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="mb-5">
                  <label htmlFor="phone" className="block text-xs font-semibold text-navy/70 uppercase tracking-wider mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={fields.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+44 7700 900000"
                    className={`w-full border rounded px-4 py-3 text-sm text-navy placeholder-navy/30 outline-none transition-colors
                      ${touched.phone && errors.phone
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-navy/20 focus:border-gold bg-white"
                      }`}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Budget */}
                <div className="mb-7">
                  <label htmlFor="budget" className="block text-xs font-semibold text-navy/70 uppercase tracking-wider mb-1.5">
                    Investment Budget
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={fields.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full border rounded px-4 py-3 text-sm text-navy outline-none transition-colors appearance-none bg-no-repeat
                      ${touched.budget && errors.budget
                        ? "border-red-400 bg-red-50 focus:border-red-500"
                        : "border-navy/20 focus:border-gold bg-white"
                      } ${!fields.budget ? "text-navy/40" : ""}`}
                    style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231B263B' stroke-width='1.5' stroke-linecap='round' fill='none'/%3E%3C/svg%3E\")", backgroundPosition: "right 16px center", paddingRight: "40px" }}
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={!opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  {touched.budget && errors.budget && (
                    <p className="text-red-500 text-xs mt-1">{errors.budget}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-gold flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                        <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                        <path d="M9 2a7 7 0 017 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send Me the Guide"
                  )}
                </button>

                {/* GDPR */}
                <p className="text-navy/35 text-xs text-center mt-4 leading-relaxed">
                  By submitting, you agree to receive the guide and occasional investment updates. We'll never share your details.
                  Unsubscribe at any time. View our{" "}
                  <a href="#" className="underline hover:text-gold transition-colors">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
