"use client";

// Apex UGC — Privacy Policy (Next.js App Router)
// Self-contained file: no external UI imports required
// Minimal, premium styling to match your site

import Link from "next/link";
import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// ---------- Helpers & Theme ----------
const cx = (...classes: (string | false | null | undefined)[]) => classes.filter(Boolean).join(" ");
const colors = {
  navy: "#101828",
  light: "#F8F8F8",
};
const fontStack =
  'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Poppins, Manrope, Helvetica, Arial, Noto Sans, "Apple Color Emoji", "Segoe UI Emoji"';

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
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
  return <div className={cx("mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={cx("scroll-mt-24 py-12 sm:py-16", className)}>
      <Container>{children}</Container>
    </section>
  );
}

function Button({
  children,
  variant = "primary",
  href,
  className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "soft";
  href?: string;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles = {
    // Match main site primary (white button, black text, subtle border)
    primary: "bg-white text-black border border-black/10 hover:bg-black/5 focus:ring-[#101828] focus:ring-offset-white shadow-sm",
    ghost: "text-[#101828] hover:bg-black/5 focus:ring-[#101828] focus:ring-offset-white",
    soft: "bg-black/5 text-[#101828] hover:bg-black/10 focus:ring-[#101828] focus:ring-offset-white",
  } as const;

  // Internal routes => Link; external/mailto/hash => <a>; otherwise button
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={cx(base, styles[variant], className)}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cx(base, styles[variant], className)}>
        {children}
      </a>
    );
  }
  return <button className={cx(base, styles[variant], className)}>{children}</button>;
}

// ---------- Navbar (minimal) ----------
function Navbar() {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-black/10 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between max-w-6xl">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight" style={{ fontFamily: fontStack }}>
          <span className="text-xl" style={{ color: colors.navy }}>APEX</span>
          <span className="text-xs rounded bg-black/5 px-2 py-0.5" style={{ color: colors.navy }}>UGC</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button href="/creator" variant="soft">Become a Creator</Button>
          <Button href="mailto:apexUGC@gmail.com" variant="ghost">Contact</Button>
        </div>
      </Container>
    </div>
  );
}

// ---------- Page ----------
export default function Page() {
  useMemo(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.scrollBehavior = "smooth";
    }
  }, []);

  const lastUpdated = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="bg-white text-black" style={{ fontFamily: fontStack }}>
      <Navbar />

      {/* Hero */}
      <Section id="top" className="bg-white pt-8 sm:pt-12">
        <Reveal>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: colors.navy }}>
            Privacy Policy
          </h1>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-3 text-sm text-black/60">Last updated: {lastUpdated}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl text-black/70">
            Your privacy matters. This policy explains what we collect, how we use it, and the choices you have. We’ve kept it short and human.
          </p>
        </Reveal>
      </Section>

      {/* What we collect */}
      <Section id="collect" className="bg-[rgba(0,0,0,0.02)]">
        <Reveal>
          <h2 className="text-2xl font-bold" style={{ color: colors.navy }}>Information we collect</h2>
        </Reveal>
        <div className="mt-4 space-y-3 text-sm text-black/80">
          <Reveal delay={0.04}>
            <p><strong>Contact details:</strong> When you email us or submit a form (via the “Get a Quote” or creator registration), we receive the fields you provide (e.g., name, email, brand, budget, needs, links).</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p><strong>No tracking:</strong> We don’t use analytics, cookies, or ad pixels on this site.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p><strong>No payment data:</strong> We don’t process payments on this site.</p>
          </Reveal>
        </div>
      </Section>

      {/* How we use it */}
      <Section id="use" className="bg-white">
        <Reveal>
          <h2 className="text-2xl font-bold" style={{ color: colors.navy }}>How we use your information</h2>
        </Reveal>
        <ul className="mt-4 space-y-2 text-sm text-black/80">
          <Reveal delay={0.04}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />Responding to your inquiries and delivering quotes.</li></Reveal>
          <Reveal delay={0.06}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />Evaluating creator applications and matching them with briefs.</li></Reveal>
          <Reveal delay={0.08}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />Service operations (e.g., project coordination and client communication).</li></Reveal>
          <Reveal delay={0.1}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />Legal compliance, security, and preventing misuse.</li></Reveal>
        </ul>
      </Section>

      {/* Legal basis (for UK/EU visitors) */}
      <Section id="legal" className="bg-[rgba(0,0,0,0.02)]">
        <Reveal>
          <h2 className="text-2xl font-bold" style={{ color: colors.navy }}>Legal basis (UK/EU)</h2>
        </Reveal>
        <ul className="mt-4 space-y-2 text-sm text-black/80">
          <Reveal delay={0.04}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />Legitimate interests: communicating with you about services and opportunities.</li></Reveal>
          <Reveal delay={0.06}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />Consent: optional email subscriptions and using your portfolio links in pitches (if you opt in).</li></Reveal>
          <Reveal delay={0.08}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />Legal obligations: complying with applicable laws.</li></Reveal>
        </ul>
      </Section>

      {/* Sharing */}
      <Section id="share" className="bg-white">
        <Reveal>
          <h2 className="text-2xl font-bold" style={{ color: colors.navy }}>Sharing</h2>
        </Reveal>
        <div className="mt-4 space-y-3 text-sm text-black/80">
          <Reveal delay={0.04}><p><strong>No selling of data.</strong> We don’t sell or rent your personal information.</p></Reveal>
          <Reveal delay={0.06}><p><strong>Service providers.</strong> We may share information with trusted providers who help us run the business (e.g., email). They must protect your data and only use it for our tasks.</p></Reveal>
          <Reveal delay={0.08}><p><strong>Legal reasons.</strong> We may disclose information to comply with the law or protect rights and safety.</p></Reveal>
        </div>
      </Section>

      {/* Retention & Security */}
      <Section id="security" className="bg-[rgba(0,0,0,0.02)]">
        <Reveal>
          <h2 className="text-2xl font-bold" style={{ color: colors.navy }}>Retention & security</h2>
        </Reveal>
        <ul className="mt-4 space-y-2 text-sm text-black/80">
          <Reveal delay={0.04}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />We keep data only as long as needed for the purposes above.</li></Reveal>
          <Reveal delay={0.06}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />We use reasonable administrative and technical measures to protect information. No method is 100% secure.</li></Reveal>
        </ul>
      </Section>

      {/* Your rights */}
      <Section id="rights" className="bg-white">
        <Reveal>
          <h2 className="text-2xl font-bold" style={{ color: colors.navy }}>Your choices & rights</h2>
        </Reveal>
        <ul className="mt-4 space-y-2 text-sm text-black/80">
          <Reveal delay={0.04}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />Access, correct, or delete your information.</li></Reveal>
          <Reveal delay={0.06}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />Opt out of marketing emails at any time.</li></Reveal>
          <Reveal delay={0.08}><li className="flex gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-black/40" />UK/EU visitors: you may have additional rights under GDPR (e.g., portability, objection, restriction).</li></Reveal>
        </ul>
        <Reveal delay={0.12}>
          <p className="mt-4 text-sm text-black/70">
            To exercise these rights, email <a className="underline" href="mailto:apexUGC@gmail.com">apexUGC@gmail.com</a>.
          </p>
        </Reveal>
      </Section>

      {/* Children */}
      <Section id="children" className="bg-[rgba(0,0,0,0.02)]">
        <Reveal>
          <h2 className="text-2xl font-bold" style={{ color: colors.navy }}>Children</h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-3 text-sm text-black/80">
            Our services are not directed to children under 13 (or the applicable age in your country). We don’t knowingly collect their data.
          </p>
        </Reveal>
      </Section>

      {/* International transfers */}
      <Section id="transfers" className="bg-white">
        <Reveal>
          <h2 className="text-2xl font-bold" style={{ color: colors.navy }}>International transfers</h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-3 text-sm text-black/80">
            If you contact us from outside the country where we operate, your information may be processed in other countries with different data protection laws.
          </p>
        </Reveal>
      </Section>

      {/* Changes */}
      <Section id="changes" className="bg-[rgba(0,0,0,0.02)]">
        <Reveal>
          <h2 className="text-2xl font-bold" style={{ color: colors.navy }}>Changes to this policy</h2>
        </Reveal>
        <Reveal delay={0.04}>
          <p className="mt-3 text-sm text-black/80">
            We may update this policy from time to time. We’ll change the “Last updated” date above and post the new version here.
          </p>
        </Reveal>
      </Section>

      {/* Contact */}
      <Section id="contact" className="bg-white pb-20">
        <Reveal>
          <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold" style={{ color: colors.navy }}>Contact</h2>
            <p className="mt-2 text-sm text-black/70">
              Questions or requests? Email <a className="underline" href="mailto:apexUGC@gmail.com">apexUGC@gmail.com</a>.
            </p>
            <div className="mt-4 flex gap-3">
              <Button href="/" variant="soft">Back to Home</Button>
              <Button href="mailto:apexUGC@gmail.com">Email us</Button>
            </div>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
