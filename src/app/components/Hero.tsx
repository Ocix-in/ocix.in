import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Github, ShieldCheck } from "lucide-react";

const proofPoints = [
  "30-day GitHub activity scan",
  "Inactive gap detection",
  "No-zero-commit challenge",
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAFAF8] px-5 py-8 text-[#171717] sm:px-6 lg:px-8" aria-labelledby="hero-title">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,23,23,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(23,23,23,0.045) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col">
        <header className="flex h-16 items-center justify-between">
          <a href="/" aria-label="OCIX home" className="flex items-center gap-3">
            <img
              src="/assets/ocix-logo.png"
              alt="OCIX"
              className="h-10 w-auto object-contain"
            />
          </a>
          <a
            href="https://vigilante.ocix.in"
            className="hidden items-center gap-2 rounded-lg border border-[#D9D6CF] bg-white px-4 py-2 text-sm font-medium text-[#171717] shadow-sm transition-colors hover:border-[#BEB8AD] sm:inline-flex"
          >
            Explore Vigilante
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D9D6CF] bg-white px-3 py-1.5 text-sm font-medium text-[#3F3A34] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
              Result-driven productivity tools. No fluffs.
            </div>

            <h1 id="hero-title" className="max-w-5xl text-balance text-5xl font-semibold leading-[1.02] tracking-normal text-[#171717] sm:text-6xl lg:text-7xl">
              Build with proof. Stay consistent without excuses.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#57534E] sm:text-xl">
              OCIX is a productivity ecosystem for people who want execution they can verify.
              The first product, Vigilante, audits your GitHub activity and turns consistency
              into something visible.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://vigilante.ocix.in"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#171717] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-[#2B2926]"
              >
                Run GitHub Audit
                <Github className="h-5 w-5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#D9D6CF] bg-white px-6 py-3 text-base font-semibold text-[#171717] shadow-sm transition-colors hover:border-[#BEB8AD]"
              >
                See the OCIX flow
              </button>
            </div>

            <div className="mt-8 grid gap-3 text-sm text-[#57534E] sm:grid-cols-3">
              {proofPoints.map((point) => (
                <div key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            aria-label="Vigilante audit preview"
          >
            <div className="rounded-lg border border-[#D9D6CF] bg-white p-4 shadow-[0_24px_80px_rgba(23,23,23,0.12)] sm:p-5">
              <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
                    First OCIX Product
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold text-[#171717]">Vigilante</h2>
                </div>
                <span className="rounded-full bg-[#EFF6FF] px-3 py-1 text-xs font-semibold text-[#1D4ED8]">
                  Live
                </span>
              </div>

              <div className="mt-5 rounded-lg bg-[#111111] p-5 font-mono text-sm text-[#D4D4D4]">
                <div className="mb-4 flex items-center gap-2 text-[#FAFAF8]">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>github-username</span>
                </div>
                <p><span className="text-[#60A5FA]">$</span> audit --last-30-days</p>
                <p className="mt-3 text-[#A3E635]">[SCAN] Commit frequency detected.</p>
                <p className="text-[#FBBF24]">[SCAN] Inactive gaps detected.</p>
                <p className="text-[#F87171]">[RESULT] No motivation. Just proof.</p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#E7E5E4] bg-[#FAFAF8] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#78716C]">
                    Scan
                  </p>
                  <p className="mt-2 text-2xl font-semibold">30d</p>
                </div>
                <div className="rounded-lg border border-[#E7E5E4] bg-[#FAFAF8] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#78716C]">
                    Rule
                  </p>
                  <p className="mt-2 text-2xl font-semibold">1/day</p>
                </div>
                <div className="rounded-lg border border-[#E7E5E4] bg-[#FAFAF8] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#78716C]">
                    Mode
                  </p>
                  <p className="mt-2 text-2xl font-semibold">Audit</p>
                </div>
              </div>

              <div className="mt-5 rounded-lg border border-[#E7E5E4] bg-[#FAFAF8] p-4">
                <p className="text-sm font-semibold text-[#171717]">
                  The enforcement loop
                </p>
                <p className="mt-2 text-sm leading-6 text-[#57534E]">
                  Set the rule, check the proof, expose missed days, and return to the work.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
