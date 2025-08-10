"use client";

// Apex UGC — Become a UGC Creator (single-page)
// Self-contained file: no external UI imports required
// Style matches your main site: premium, clean, subtle animations

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ---------- Helpers & Theme ----------
const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");
const colors = {
  navy: "#101828",
  light: "#F8F8F8",
};
const fontStack =
  'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Poppins, Manrope, Helvetica, Arial, Noto Sans, "Apple Color Emoji", "Segoe UI Emoji"';

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
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles = {
    primary: `bg-[${colors.navy}] text-black hover:opacity-90 focus:ring-[#101828] focus:ring-offset-white shadow-sm`, // black text per your preference
    ghost: `text-[${colors.navy}] hover:bg-black/5 focus:ring-[#101828] focus:ring-offset-white`,
    soft: `bg-black/5 text-[${colors.navy}] hover:bg-black/10 focus:ring-[#101828] focus:ring-offset-white`,
  } as const;
  const Comp: any = href ? "a" : "button";
  return (
    <Comp href={href} onClick={onClick} type={href ? undefined : type} className={cx(base, styles[variant], className)}>
      {children}
    </Comp>
  );
}

// ---------- Navbar ----------
function Navbar() {
  const links = [
    { href: "#overview", label: "Overview" },
    { href: "#rates", label: "Compensation" },
    { href: "#register", label: "Register" },
    { href: "#faqs", label: "FAQs" },
  ];
  return (
    <div className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-extrabold tracking-tight" style={{ fontFamily: fontStack }} aria-label="Back to Apex UGC">
          <span className="text-xl" style={{ color: colors.navy }}>APEX</span>
          <span className="text-xs rounded bg-black/5 px-2 py-0.5" style={{ color: colors.navy }}>UGC</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-black/70 hover:text-black" style={{ fontFamily: fontStack }}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" href="mailto:apexUGC@gmail.com">Contact</Button>
        </div>
      </Container>
    </div>
  );
}

// ---------- Hero ----------
function Hero() {
  const rotating = [
    "UGC Creators",
    "Editors",
    "Storytellers",
    "Beauty",
    "Skincare",
    "Fitness",
    "Tech",
    "SaaS",
    "AI Tools",
    "Fintech",
    "Home & Decor",
    "Pets",
    "Outdoor",
    "Supplements",
    "Education",
    "Gaming",
    "Fashion",
  ];

  return (
    <Section id="top" className="relative overflow-hidden bg-white pt-12 sm:pt-16">
      <div aria-hidden className="absolute inset-x-0 -top-32 h-64 bg-gradient-to-b from-[rgba(16,24,40,0.06)] to-transparent" />
      <Container>
        <Reveal>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl" style={{ fontFamily: fontStack, color: colors.navy }}>
            Become a UGC Creator
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-4 max-w-2xl text-lg text-black/70" style={{ fontFamily: fontStack }}>
            Join our creator roster to be considered for upcoming client briefs. Tell us about your skills, style, and examples below.
          </p>
        </Reveal>
      </Container>
      <div className="mt-10 overflow-hidden border-y border-black/10 bg-[rgba(0,0,0,0.02)] py-3">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...rotating, ...rotating].map((w, i) => (
            <span key={i} className="mx-6 text-sm font-semibold tracking-wide text-black/70" style={{ fontFamily: fontStack }}>
              {w}
            </span>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

// ---------- Overview ----------

// ---------- Compensation (UGC only, range by level; max 300) ----------
function Rates() {
  const rows = [
    { level: "Beginner", range: "£100–£150", notes: "Solid fundamentals; a few examples; open to feedback and iteration." },
    { level: "Intermediate", range: "£150–£225", notes: "Consistent hooks, clean b-roll, captions, and platform-native pacing." },
    { level: "Advanced", range: "£225–£300 (max)", notes: "High-converting creatives, strong on-camera presence or top-tier editing." },
  ];
  const benefits = [
    "Priority consideration for matching briefs",
    "Featured in client pitches when aligned with brand goals",
    "Access to tips, trends, and best practices",
  ];
  return (
    <Section id="rates" className="bg-[rgba(0,0,0,0.02)]">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: colors.navy, fontFamily: fontStack }}>
          Compensation
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-2 max-w-3xl text-black/70" style={{ fontFamily: fontStack }}>
          Compensation depends on skill level, portfolio quality, and brief complexity. The typical ranges below are guidelines; the top of the range is capped at <strong>£300</strong>.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {rows.map((r, i) => (
          <Reveal key={r.level} delay={0.04 * i}>
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-black/60">{r.level}</div>
              <div className="mt-2 text-xl font-semibold" style={{ color: colors.navy, fontFamily: fontStack }}>{r.range}</div>
              <p className="mt-2 text-sm text-black/70" style={{ fontFamily: fontStack }}>{r.notes}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-black/80" style={{ fontFamily: fontStack }}>What you get</div>
        <ul className="mt-3 space-y-1 text-sm text-black/80" style={{ fontFamily: fontStack }}>
          {benefits.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

// ---------- Registration Form (UGC only) ----------
function Register() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const subject = encodeURIComponent("UGC Creator Registration — Apex UGC");
    const body = encodeURIComponent(
      `Role: UGC Creator
First name: ${data.get("firstName")}
Last name: ${data.get("lastName")}
Email: ${data.get("email")}
Country: ${data.get("country")}
Date of Birth: ${data.get("dob")}
Instagram: ${data.get("instagram")}
TikTok: ${data.get("tiktok")}
Links to assets / UGC examples: ${data.get("links")}
Agree to marketing use of submitted assets: ${data.get("permission") ? "Yes" : "No"}
Subscribe to creator updates: ${data.get("subscribe") ? "Yes" : "No"}
`
    );

    const mailto = `mailto:apexUGC@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailto;

    setTimeout(() => setLoading(false), 600);
  }

  return (
    <Section id="register" className="bg-white">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: colors.navy, fontFamily: fontStack }}>
          Register as a UGC creator
        </h2>
      </Reveal>
      <Reveal delay={0.06}>
        <p className="mt-2 max-w-3xl text-black/70" style={{ fontFamily: fontStack }}>
          Share your details and examples. We’ll reach out when there’s a fit.
        </p>
      </Reveal>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Basic info */}
        <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-black/70">First name</span>
              <input
                required
                name="firstName"
                className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none ring-0 placeholder:text-black/40 focus:border-black/30"
                placeholder="Jane"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-black/70">Last name</span>
              <input
                required
                name="lastName"
                className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/30"
                placeholder="Doe"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-black/70">Email</span>
              <input
                required
                type="email"
                name="email"
                className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/30"
                placeholder="jane@creator.com"
              />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-black/70">Country</span>
              <input
                name="country"
                className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/30"
                placeholder="United Kingdom"
              />
            </label>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <label className="text-sm">
              <span className="mb-1 block text-black/70">Date of Birth</span>
              <input type="date" name="dob" className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/30" />
            </label>
            <div />
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block text-black/70">Instagram handle</span>
              <input name="instagram" className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/30" placeholder="@yourhandle" />
            </label>
            <label className="text-sm">
              <span className="mb-1 block text-black/70">TikTok handle</span>
              <input name="tiktok" className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/30" placeholder="@yourhandle" />
            </label>
          </div>

          <div className="mt-4">
            <label className="text-sm block">
              <span className="mb-1 block text-black/70">Links to any assets / UGC examples</span>
              <textarea name="links" rows={3} className="w-full rounded-xl border border-black/15 bg-white px-3 py-2 outline-none focus:border-black/30" placeholder="Drive/Dropbox links, portfolio, socials…" />
            </label>
            <p className="mt-2 text-xs text-black/50" style={{ fontFamily: fontStack }}>
              Tip: Attachments can’t be sent via email links—please include shareable links above.
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" name="permission" />
              <span>I grant permission to use the assets I provide in Apex UGC marketing materials.</span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" name="subscribe" />
              <span>Subscribe me to creator tips, trends, and guides.</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" href="#top">Cancel</Button>
          <Button type="submit">{loading ? "Sending…" : "Submit registration"}</Button>
        </div>
      </form>
    </Section>
  );
}

// ---------- FAQs ----------
function FAQs() {
  const faqs = [
    { q: "Can beginners apply?", a: "Yes. Beginners are welcome. Early opportunities may focus on building a portfolio before larger briefs." },
    { q: "Are the ranges fixed?", a: "They’re guidelines. Exact compensation depends on portfolio quality, brief complexity, and performance history, capped at £300." },
    { q: "Which platforms?", a: "TikTok, Instagram Reels, and YouTube Shorts. Deliverables are vertical-first with captions." },
    { q: "Typical turnaround?", a: "Most briefs run 5–7 days once we receive the product and goals." },
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
                <span className="text-base font-semibold" style={{ color: colors.navy, fontFamily: fontStack }}>
                  {f.q}
                </span>
                <span className="text-black/40 transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-black/70" style={{ fontFamily: fontStack }}>
                {f.a}
              </p>
            </details>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

// ---------- Footer & Privacy ----------
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
          <a href="#privacy" className="text-black/70 hover:text-black">Privacy Policy</a>
        </div>
      </Container>
    </footer>
  );
}

function Privacy() {
  return (
    <Section id="privacy" className="bg-white">
      <h2 className="text-2xl font-bold" style={{ color: colors.navy, fontFamily: fontStack }}>
        Privacy Policy (Basic)
      </h2>
      <p className="mt-2 max-w-3xl text-sm text-black/70" style={{ fontFamily: fontStack }}>
        We only use the information you submit to respond to your inquiry. We do not sell or share your data. If you want your data deleted, email{" "}
        <a className="underline" href="mailto:apexUGC@gmail.com">apexUGC@gmail.com</a>.
      </p>
    </Section>
  );
}

// ---------- Page ----------
export default function Page() {
  useMemo(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  return (
    <main className="bg-white text-black" style={{ fontFamily: fontStack }}>
      <Navbar />
      <Hero />
      <Rates />
      <Register />
      <FAQs />
      <Privacy />
      <Footer />
    </main>
  );
}

