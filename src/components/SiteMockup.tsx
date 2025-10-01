"use client";
import React, { useState, useMemo, useCallback, useEffect, useRef } from "react";

/* ---------------------------------
   Brand Fonts (mock): Playfair/Nunito
   (In production: load via @next/font or <link>)
----------------------------------*/
const brandHeading = "font-[PlayfairDisplay]";
const brandBody = "font-[Nunito]";

/* -----------------------
   Small Utilities
------------------------*/
const useInView = () => {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, inView };
};

const AnimatedCounter = ({ to = 100, duration = 900, suffix = "" }) => {
  const { ref, inView } = useInView();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | undefined;
    const from = 0; const diff = to - from;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(Math.round(from + diff * p));
      if (p < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [inView, to, duration]);
  return <span ref={ref as any} aria-live="polite">{val}{suffix}</span>;
};

/* -----------------------
   Reusable UI Components
------------------------*/
const CaseCard = ({ tag, title, metric, index = 0 }) => (
  <div
    className={
      "relative rounded-2xl p-[1px] bg-gradient-to-br from-zinc-200/80 via-transparent to-zinc-200/80 " +
      "opacity-0 animate-[fadeUp_0.5s_ease-out_forwards]"
    }
    style={{ animationDelay: `${index * 100}ms` }}
  >
    <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800/60 p-5">
      <div className="text-[10px] uppercase tracking-[0.18em] text-zinc-500 mb-2">{tag}</div>
      <div className={`font-semibold text-zinc-900 dark:text-zinc-100 mb-2 ${brandBody}`}>{title}</div>
      <div className="text-emerald-700 dark:text-emerald-400 text-sm font-medium">{metric}</div>
      <div className="mt-3 rounded-lg overflow-hidden border border-zinc-200/60 dark:border-zinc-800/60">
        <div className="h-24 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 grid grid-cols-2 text-[10px] text-zinc-500">
          <div className="flex items-center justify-center border-r border-zinc-200/60 dark:border-zinc-800/60">Before</div>
          <div className="flex items-center justify-center">After</div>
        </div>
      </div>
    </div>
  </div>
);

const Metric = ({ label, valueNum, valueText }) => (
  <div className="flex flex-col items-start gap-1">
    <div className={`text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 ${brandBody}`}>
      {typeof valueNum === "number" ? <AnimatedCounter to={valueNum} /> : valueText}
    </div>
    <div className="text-sm text-zinc-500">{label}</div>
  </div>
);

/* -----------------------
   Page Mockup Component
------------------------*/
export default function SiteMockup() {
  const [showBooking, setShowBooking] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const demoSteps = useMemo(() => [
    { title: "Day 1 — Map & Mock", body: "30-min discovery → one clean booking/lead path; rough metrics stub." },
    { title: "Day 2 — Build & Connect", body: "Ship page + form/bot, tie into CRM, notifications, basic analytics." },
    { title: "Day 3 — Prove & Polish", body: "Test traffic, instrument metrics, 90-sec Loom walkthrough." },
  ], []);
  const services = useMemo(() => [
    { title: "Funnels", blurb: "Offer clarity, capture forms, booking flows, bilingual where needed." },
    { title: "Automations", blurb: "Reminders, autoresponders, triage bots, CRM hooks." },
    { title: "Analytics", blurb: "Plausible dashboards that show views → bookings → attended." },
  ], []);

  const handleBookingClick = useCallback(() => setShowBooking(true), []);
  const handleCloseModal  = useCallback(() => setShowBooking(false), []);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);
  const handleSubmit = useCallback((e: React.FormEvent) => e.preventDefault(), []);

  return (
    <main className={`min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 ${brandBody}`}>
      {/* ——— Nav ——— */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-white/80 dark:bg-zinc-950/80 shadow-[0_1px_0_0_rgba(0,0,0,0.06)] border-b border-white/20 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className={`tracking-tight ${brandHeading} text-xl`}>eddiezaldivar<span className="text-zinc-400">.com</span></div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-300" aria-label="Primary">
            <a href="/work" className="hover:text-zinc-900 dark:hover:text-zinc-100">Work</a>
            <a href="/essays" className="hover:text-zinc-900 dark:hover:text-zinc-100">Essays</a>
            <a href="/about" className="hover:text-zinc-900 dark:hover:text-zinc-100">About</a>
            <a href="/contact" className="hover:text-zinc-900 dark:hover:text-zinc-100">Contact</a>
            <button onClick={handleBookingClick} className="rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 font-medium">Hire My Team</button>
          </nav>
        </div>
      </header>

      {/* ——— Hero ——— */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className={`text-5xl md:text-6xl font-light leading-[1.05] tracking-tight ${brandHeading}`}>
              Fractional Growth & <span className="font-bold">AI</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
              72-Hour Demo, founder-to-founder. Funnels, automations, and analytics shipped in days—not quarters.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-sm border border-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Taking 2 new clients this month
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={handleBookingClick} className="rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-500 shadow-[0_6px_20px_-6px_rgba(16,185,129,0.5)]">
                Book a 15-min fit check
              </button>
              <a href="/work" className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-5 py-3 font-semibold hover:bg-[rgba(139,117,112,0.08)]">
                See recent work
              </a>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6" role="list" aria-label="Outcome metrics">
              <Metric label="Lead capture lift" valueNum={30} valueText={"+12–30%"} />
              <Metric label="No-shows reduced" valueNum={45} valueText={"25–45%"} />
              <Metric label="Response time (min)" valueNum={10} />
              <Metric label="Time to live (hrs)" valueNum={72} />
            </div>
            <div className="flex items-center mt-4">
              <div className="flex -space-x-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-950 bg-zinc-300" />
                ))}
              </div>
              <div className="ml-3 text-sm text-zinc-600 dark:text-zinc-300">Trusted by 12+ founders</div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-[#B8CDD9]/50 to-white dark:from-zinc-900 dark:to-zinc-950 flex items-center justify-center" aria-label="Demo preview">
              <div className="text-center p-8">
                <div className="text-sm uppercase tracking-widest text-zinc-500 mb-2">Demo Preview</div>
                <p className="text-zinc-600 dark:text-zinc-300 max-w-sm mx-auto">Day 1 wire → Day 2 build → Day 3 prove. See it before you buy it.</p>
                <pre className="mt-4 text-[11px] bg-zinc-900 text-emerald-300 p-3 rounded-lg overflow-x-auto text-left">
{`// What you'll learn
const quicklift = async (funnel) => {
  await test(variants)
  return bestPerformer
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ——— 72-Hour Demo ——— */}
      <section className="border-y border-zinc-100 dark:border-zinc-800" style={{ backgroundColor: '#F7F5F4' }}>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className={`text-2xl font-bold mb-6 ${brandHeading}`}>See it before you buy it — the 72-Hour Demo</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {demoSteps.map((s, i) => (
              <div key={i} className="relative rounded-2xl p-[1px] bg-gradient-to-br from-zinc-200/80 via-transparent to-zinc-200/80">
                <div className="rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 p-6">
                  <div className="font-semibold mb-2">{s.title}</div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-300">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-500"></span> If nothing’s live by Hour 72 → you don’t pay the demo fee.</span>
          </div>
        </div>
      </section>

      {/* ——— Services ——— */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className={`text-2xl font-bold mb-6 ${brandHeading}`}>What I build (fast)</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6" role="list" aria-label="Services">
          {services.map((c, i) => (
            <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 hover:bg-[rgba(139,117,112,0.06)] transition">
              <div className="font-semibold mb-2">{c.title}</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">{c.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ——— Caselets ——— */}
      <section id="work" className="border-y border-zinc-100 dark:border-zinc-800" style={{ backgroundColor: '#F2F4F5' }}>
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="flex items-end justify-between mb-6">
            <h2 className={`text-2xl font-bold ${brandHeading}`}>Recent work</h2>
            <a href="#" className="text-sm text-zinc-600 dark:text-zinc-300 hover:underline">View all →</a>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <CaseCard index={0} tag="funnel • automation" title="Booking flow + reminders" metric="No-shows −42%, bookings +19%" />
            <CaseCard index={1} tag="AI bot • ops" title="FAQ bot + triage" metric="Support emails −35%, site→booking +12%" />
          </div>
        </div>
      </section>

      {/* ——— About ——— */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2">
            <h2 className={`text-2xl font-bold mb-3 ${brandHeading}`}>Hi, I’m Eddie.</h2>
            <p className="text-zinc-600 dark:text-zinc-300">Founder-led builder with 8+ years across growth, AI, and clean web execution. I help small teams ship faster: proof first, polish second.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={handleBookingClick} className="rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-500">Hire my team</button>
              <a href="/essays" className="rounded-xl border border-zinc-300 dark:border-zinc-700 px-5 py-3 font-semibold hover:bg-[rgba(139,117,112,0.08)]">Read essays</a>
            </div>
          </div>
          <div className="hidden md:block" aria-hidden="true">
            <div className="aspect-square rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950" />
          </div>
        </div>
      </section>

      {/* ——— Newsletter ——— */}
      <section className="bg-white dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-12 rounded-2xl">
          <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-zinc-200/80 via-transparent to-zinc-200/80">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 bg-white dark:bg-zinc-950">
              <h3 className={`text-xl font-semibold ${brandHeading}`}>Founder Notes (biweekly)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">No fluff. One practical email every two weeks.</p>
              <form className="mt-4 flex flex-col sm:flex-row gap-3" onSubmit={(e)=>e.preventDefault()} aria-label="Newsletter signup">
                <label className="sr-only" htmlFor="newsletter-email">Work email</label>
                <input id="newsletter-email" type="email" placeholder="Work email" className="flex-1 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3" />
                <button className="rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-500">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Contact + Footer ——— */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <h2 className={`text-2xl font-bold mb-2 ${brandHeading}`}>Get in touch</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">Prefer async? Email <a className="underline" href="mailto:eddie@zaldivarand.co">eddie@zaldivarand.co</a>.</p>
            <form className="mt-4 grid gap-3" onSubmit={handleSubmit} aria-label="Contact form">
              <label className="sr-only" htmlFor="name">Your name</label>
              <input id="name" name="name" value={formData.name} onChange={handleInputChange} className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3" placeholder="Your name" />
              <label className="sr-only" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3" placeholder="Email" />
              <label className="sr-only" htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3" placeholder="Message" />
              <button className="rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-500 w-fit">Send</button>
            </form>
          </div>
          <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-sm text-zinc-600 dark:text-zinc-300">
            <div className="font-semibold mb-2">What happens next</div>
            <ol className="list-decimal ml-4 space-y-1">
              <li>We trade 1–2 messages to confirm fit.</li>
              <li>15-min call to pick the fastest path.</li>
              <li>Optionally book the 72-Hour Demo to see proof before the sprint.</li>
            </ol>
          </div>
        </div>
        <footer className="mt-12 py-8 border-t border-zinc-100 dark:border-zinc-900 text-sm text-zinc-500 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Eddie Zaldivar • All rights reserved</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-700 dark:hover:text-zinc-300">Privacy</a>
            <a href="#" className="hover:text-zinc-700 dark:hover:text-zinc-300">Terms</a>
          </div>
        </footer>
      </section>

      {showBooking && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 relative">
            <button onClick={handleCloseModal} className="absolute top-3 right-3 rounded-full border border-zinc-300 dark:border-zinc-700 px-2 py-1 text-sm" aria-label="Close booking modal">Close</button>
            <h3 id="modal-title" className={`text-xl font-semibold mb-2 ${brandHeading}`}>Book a 15-min fit check</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4">Calendly loads after you click. This keeps the site fast.</p>
            <div className="rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 p-6 text-center">
              <button className="rounded-xl px-5 py-3 font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-500" aria-label="Load Calendly widget">Load Calendly</button>
              <p className="mt-2 text-xs text-zinc-500">(In production this button injects the Calendly script and fires <code>booked_call</code> on confirmation.)</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </main>
  );
}


