"use client";

// Apex UGC — FULL single-page site (Next.js App Router)
// Self-contained file: no external UI imports required
// Spec: premium, clean, subtle animations; visible Get a Quote; alternating backgrounds; standalone /privacy

import Link from "next/link";
import { useMemo, useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";

// ---------- Helpers & Theme ----------
const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");
const colors = {
  navy: "#101828",
  light: "#F8F8F8",
};
const fontStack =
  'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Poppins, Manrope, Helvetica, Arial, Noto Sans, "Apple Color Emoji", "Segoe UI Emoji"';

// Buzzwords (hoisted so effect deps are stable)
const BUZZ = ["converts", "performs", "sells", "scales"] as const;

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cx("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cx("scroll-mt-24 py-16 sm:py-20", className)}>
      <Container>{children}</Container>
    </section>
  );
}

function Button({
  children,
  onClick,
  variant = "primary",
  href,
  type = "button",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "soft";
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles = {
    primary:
      "bg-white text-black border border-black/10 hover:bg-black/5 focus:ring-[#101828] focus:ring-offset-white shadow-sm",
    ghost: `text-[${colors.navy}] hover:bg-black/5 focus:ring-[#101828] focus:ring-offset-white`,
    soft: `bg-black/5 text-[${colors.navy}] hover:bg-black/10 focus:ring-[#101828] focus:ring-offset-white`,
  } as const;

  // Use Next.js Link for internal routes; anchor for hashes/external; button otherwise
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={cx(base, styles[variant], className)} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cx(base, styles[variant], className)} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cx(base, styles[variant], className)}>
      {children}
    </button>
  );
}

// ---------- Navbar ----------
function Navbar({ onOpenQuote }: { onOpenQuote: () => void }) {
  const links = [
    { href: "#services", label: "Services" },
    { href: "#process", label: "Process" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#faqs", label: "FAQs" },
  ];
  return (
    <div className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-extrabold tracking-tight" style={{ fontFamily: fontStack }}>
          <span className="text-xl" style={{ color: colors.navy }}>APEX</span>
          <span className="text-xs rounded bg-black/5 px-2 py-0.5" style={{ color: colors.navy }}>UGC</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-black/70 hover:text-black"
              style={{ fontFamily: fontStack }}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button href="/creator" variant="soft">Become a Creator</Button>
          <Button onClick={onOpenQuote}>Get a Quote</Button>
          <Button href="#contact" variant="ghost">Contact</Button>
        </div>
      </Container>
    </div>
  );
}

// ---------- Hero (manual center with flex; marquee pinned to bottom + subtle PNG watermark) ----------
function Hero({ onOpenQuote }: { onOpenQuote: () => void }) {
  const industries = [
    "E-commerce","Beauty","Skincare","Fitness","Tech gadgets","SaaS","AI tools","Fintech",
    "Home & decor","Pets","Outdoor","Supplements","Education","Gaming","Fashion","Accessories",
  ];

  const reduced = useReducedMotion();

  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % BUZZ.length), 2800);
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* Decorative blobs */}
      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full blur-3xl"
            style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(16,24,40,0.18) 0%, rgba(16,24,40,0) 70%)" }}
            animate={{ x: [-10, 30, -10], y: [0, 20, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full blur-3xl"
            style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 70%)" }}
            animate={{ x: [0, -20, 0], y: [10, -10, 10], scale: [1.02, 1, 1.02] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {/* Subtle background logo watermark (PNG). Put /public/logo-mark.png in your project */}
      {!reduced && (
        <motion.img
          src="/logo-mark.png"
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="pointer-events-none absolute left-1/2 top-1/2 hidden md:block -translate-x-1/2 -translate-y-1/2 w-[65vmin] opacity-[0.04]"
          style={{
            WebkitMaskImage: "radial-gradient(ellipse at center, black 60%, transparent 85%)",
            maskImage: "radial-gradient(ellipse at center, black 60%, transparent 85%)",
            filter: "blur(0.2px)",
          }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      )}

      {/* FLEX wrapper centers content; pb prevents marquee overlap */}
      <div className="relative min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center pb-14 sm:pb-16">
        <Container className="relative z-10">
          <Reveal>
            <h1
              className="mx-auto max-w-5xl text-[clamp(2.5rem,6vw,4rem)] font-extrabold leading-[1.05] tracking-tight"
              style={{ fontFamily: fontStack, color: colors.navy }}
            >
              Premium UGC that{" "}
              <span className="relative inline-block">
                {reduced ? (
                  <span>converts</span>
                ) : (
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={BUZZ[idx]}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="inline-block"
                    >
                      {BUZZ[idx]}
                    </motion.span>
                  </AnimatePresence>
                )}
                <span aria-hidden className="absolute -bottom-2 left-0 h-2 w-full rounded bg-black/10" />
              </span>{" "}
              across industries.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-black/70"
              style={{ fontFamily: fontStack }}
            >
              Apex UGC crafts ad-ready video for brands of all sizes — strategy, script, and delivery in 5–7 days.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button onClick={onOpenQuote}>Get a Quote</Button>
              <Button href="#services" variant="soft">See Services</Button>
            </div>
          </Reveal>
        </Container>

        {/* Marquee pinned to bottom */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="relative overflow-hidden border-y border-black/10 bg-[rgba(0,0,0,0.02)] py-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent" />
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: "-50%" }}
              transition={{ repeat: Infinity, duration: 26, ease: "linear" }}
              className="flex whitespace-nowrap"
            >
              {[...industries, ...industries].map((w, i) => (
                <span
                  key={i}
                  className="mx-6 text-sm font-semibold tracking-wide text-black/70"
                  style={{ fontFamily: fontStack }}
                >
                  {w}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Services ----------
function Services() {
  const items = [
    {
      title: "Short Ad (9–15s)",
      desc: "High-impact vertical ad with hook → problem → solution → CTA. Built for TikTok/Reels/Shorts.",
      bullets: ["1x edited vertical video", "Captions & royalty-free music", "Ad-ready export"],
    },
    {
      title: "Product Demo (20–30s)",
      desc: "Feature walk-through with clean b-roll and clear value props.",
      bullets: ["1x demo video", "Script included", "Color-graded & sound-mixed"],
    },
    {
      title: "Scriptwriting (Add-on)",
      desc: "Conversion-focused scripts tailored to your offer and audience.",
      bullets: ["Research-driven", "CTA variants", "Up to 2 revisions"],
    },
  ];

  return (
    <Section id="services" className="bg-white">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: colors.navy, fontFamily: fontStack }}>
          Video Services
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-2 max-w-2xl text-black/70" style={{ fontFamily: fontStack }}>
          Choose a core format and mix in add-ons. We’ll tailor deliverables to your product, audience, and platform.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={0.04 * i}>
            <div className="group relative h-full rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-transform hover:-translate-y-0.5">
              <h3 className="text-lg font-semibold" style={{ color: colors.navy, fontFamily: fontStack }}>
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-black/70" style={{ fontFamily: fontStack }}>
                {item.desc}
              </p>
              <ul className="mt-4 space-y-1 text-sm text-black/80" style={{ fontFamily: fontStack }}>
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <Button href="#contact" variant="soft">Add to Quote</Button>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/0 group-hover:ring-black/5" />
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ---------- Process ----------
function Process() {
  const steps = [
    { title: "Brief", text: "We align on goals, angles, and platforms. Ship product or grant access." },
    { title: "Shoot", text: "We script, film, and edit with captions, music, and on-brand visuals." },
    { title: "Deliver", text: "Ad-ready files in 5–7 days, plus optional hook variations." },
  ];
  return (
    <Section id="process" className="bg-[rgba(0,0,0,0.02)]">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: colors.navy, fontFamily: fontStack }}>
          How It Works
        </h2>
      </Reveal>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={0.06 * i}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-black/60">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 text-lg font-semibold" style={{ color: colors.navy, fontFamily: fontStack }}>
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-black/70" style={{ fontFamily: fontStack }}>
                {s.text}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ---------- Portfolio (videos) ----------
type PortfolioItem = {
  title: string;
  src: string;      // /public path or remote URL
  poster?: string;  // optional thumbnail
};

const portfolioItems: PortfolioItem[] = [
  { title: "Visual Ad", src: "/portfolio/brandx-ad.mp4" },
  { title: "Unboxing short visual", src: "/portfolio/beauty-walkthrough.mp4" },
  { title: "SaaS — Dashboard Demo", src: "/portfolio/saas-demo.mp4" },
];

function AutoVideo({ item }: { item: PortfolioItem }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;       // required for autoplay on mobile
    el.playsInline = true; // avoid going fullscreen on iOS

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
          el.currentTime = 0;
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      <div className="aspect-[9/16] w-full">
        <video
          ref={ref}
          className="h-full w-full object-cover"
          src={item.src}
          poster={item.poster}
          loop
          muted
          playsInline
          preload="none"
          onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
          onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
          onClick={(e) => {
            const v = e.currentTarget as HTMLVideoElement;
            if (v.paused) { void v.play(); } else { v.pause(); }
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-2 p-3 transition-all group-hover:translate-y-0">
        <div className="rounded-xl bg-black/45 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm">
          {item.title}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/0 transition group-hover:ring-black/5" />
    </div>
  );
}

function Portfolio() {
  return (
    <Section id="portfolio" className="bg-white">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: colors.navy, fontFamily: fontStack }}>
          Portfolio
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-2 max-w-2xl text-black/70" style={{ fontFamily: fontStack }}>
          A few recent verticals. Videos auto-play when visible — tap to pause on mobile.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {portfolioItems.map((item, i) => (
          <Reveal key={item.title} delay={0.04 * i}>
            <AutoVideo item={item} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ---------- FAQs ----------
function FAQs() {
  const faqs = [
    { q: "Which platforms do you optimize for?", a: "TikTok, Instagram Reels, YouTube Shorts. Vertical-first exports for each." },
    { q: "What about usage rights?", a: "Standard includes organic rights; paid ad usage is available and outlined in your quote." },
    { q: "Delivery timeline?", a: "Typically 5–7 days from receiving your brief/product." },
    { q: "Do you write scripts?", a: "Yes—scriptwriting is available as an add-on or included depending on scope." },
  ];
  return (
    <Section id="faqs" className="bg-[rgba(0,0,0,0.02)]">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: colors.navy, fontFamily: fontStack }}>
          FAQs
        </h2>
      </Reveal>
      <div className="mt-6 divide-y divide-black/10 rounded-2xl border border-black/10 bg-white">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={0.04 * i}>
            <details className="group px-6 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-left">
                <span className="text-base font-semibold" style={{ color: colors.navy, fontFamily: fontStack }}>{f.q}</span>
                <span className="text-black/40 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-black/70" style={{ fontFamily: fontStack }}>{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ---------- Footer (link routes to /privacy) ----------
function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <Container className="flex flex-col items-start justify-between gap-4 py-10 sm:flex-row">
        <div>
          <div className="text-xl font-extrabold tracking-tight" style={{ color: colors.navy, fontFamily: fontStack }}>
            APEX <span className="text-black/60">UGC</span>
          </div>
          <p className="mt-2 text-sm text-black/60" style={{ fontFamily: fontStack }}>
            © {new Date().getFullYear()} Apex UGC. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm" style={{ fontFamily: fontStack }}>
          <Link href="/privacy" className="text-black/70 hover:text-black">Privacy Policy</Link>
        </div>
      </Container>
    </footer>
  );
}

// ---------- Modal + Form ----------
function QuoteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className={cx("fixed inset-0 z-50 items-center justify-center p-4", open ? "flex" : "hidden")}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
        <button aria-label="Close" onClick={onClose} className="absolute right-3 top-3 rounded-full p-2 text-black/50 hover:bg-black/5">✕</button>
        {!sent ? (
          <div>
            <h3 className="text-xl font-bold" style={{ color: colors.navy, fontFamily: fontStack }}>Get a Quote</h3>
            <p className="mt-1 text-sm text-black/70" style={{ fontFamily: fontStack }}>Tell us what you need—we’ll reply within 24 hours.</p>
            <QuoteForm onSent={() => setSent(true)} />
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-black/5" />
            <h4 className="text-lg font-semibold" style={{ color: colors.navy, fontFamily: fontStack }}>Request sent</h4>
            <p className="mt-2 text-sm text-black/70" style={{ fontFamily: fontStack }}>Thanks! We’ll reach out soon.</p>
            <div className="mt-6 flex justify-center"><Button onClick={onClose}>Close</Button></div>
          </div>
        )}
      </div>
    </div>
  );
}

function QuoteForm({ onSent }: { onSent: () => void }) {
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const subject = encodeURIComponent("Quote request — Apex UGC");
    const body = encodeURIComponent(
      `Name: ${data.get("name")}
Email: ${data.get("email")}
Brand/Website: ${data.get("brand")}
Budget: ${data.get("budget")}
Needs: ${data.get("needs")}
`
    );
    const mailto = `mailto:apexUGC@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;
    setTimeout(() => {
      setLoading(false);
      onSent();
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm">
          <span className="mb-1 block text-black/70">Name</span>
          <input required name="name" className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none ring-0 placeholder:text-black/40 focus:border-black/30" placeholder="Jane Doe" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-black/70">Email</span>
          <input required type="email" name="email" className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/30" placeholder="jane@brand.com" />
        </label>
      </div>
      <label className="text-sm block">
        <span className="mb-1 block text-black/70">Brand / Website</span>
        <input name="brand" className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/30" placeholder="brand.com" />
      </label>
      <label className="text-sm block">
        <span className="mb-1 block text-black/70">Budget range</span>
        <select name="budget" className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/30">
          <option value="Not sure yet">Not sure yet</option>
          <option value="$500-$1,000">$500–$1,000</option>
          <option value="$1,000-$2,500">$1,000–$2,500</option>
          <option value="$2,500-$5,000">$2,500–$5,000</option>
          <option value="$5,000+">$5,000+</option>
        </select>
      </label>
      <label className="text-sm block">
        <span className="mb-1 block text-black/70">What do you need?</span>
        <textarea required name="needs" rows={4} className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/30" placeholder="e.g., 1 short ad for TikTok + scriptwriting add-on" />
      </label>
      <div className="flex items-center justify-end gap-3">
        <Button href="#" variant="ghost">Cancel</Button>
        <Button type="submit">{loading ? "Sending…" : "Send request"}</Button>
      </div>
    </form>
  );
}

// ---------- Page ----------
export default function Page() {
  const [open, setOpen] = useState(false);
  useMemo(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    <main className="bg-white text-black overflow-x-hidden" style={{ fontFamily: fontStack }}>
      <Navbar onOpenQuote={() => setOpen(true)} />
      <Hero onOpenQuote={() => setOpen(true)} />
      <Services />
      <Process />
      <Portfolio />
      <FAQs />
      <Section id="contact" className="bg-[rgba(0,0,0,0.02)]">
        <Reveal>
          <div className="rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold" style={{ color: colors.navy, fontFamily: fontStack }}>Ready to make content that converts?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-black/70">Tell us about your product and goals. We’ll craft a quote for the right deliverables and timeline.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button onClick={() => setOpen(true)}>Get a Quote</Button>
              <Button href="mailto:apexUGC@gmail.com" variant="soft">Email us</Button>
            </div>
          </div>
        </Reveal>
      </Section>
      <Footer />
      <QuoteModal open={open} onClose={() => setOpen(false)} />
    </main>
  );
}
