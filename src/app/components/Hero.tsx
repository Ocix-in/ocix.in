import { motion } from "motion/react";
import { ArrowRight, Github, ShieldCheck, Sparkles } from "lucide-react";

const stats = [
  { label: "Live today", value: "01" },
  { label: "In development", value: "02" },
  { label: "Studio focus", value: "Proof" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden px-5 pb-16 pt-6 sm:px-6 lg:px-8" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#F7F3EA_0%,#EEE6D8_58%,#111111_58%,#111111_100%)] lg:bg-[linear-gradient(90deg,#F7F3EA_0%,#F7F3EA_64%,#111111_64%,#111111_100%)]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 top-24 h-px bg-[#111111]/15"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-2rem)] max-w-7xl flex-col">
        <header className="flex h-16 items-center justify-between">
          <a href="/" aria-label="OCIX home" className="inline-flex items-center">
            <img src="/assets/ocix-logo-transparent.png" alt="OCIX" className="h-10 w-auto object-contain" />
          </a>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-[#3B352C] md:flex" aria-label="Primary navigation">
            <a className="transition-colors hover:text-[#111111]" href="#portfolio">Portfolio</a>
            <a className="transition-colors hover:text-[#111111]" href="#vigilante">Vigilante</a>
            <a className="transition-colors hover:text-[#111111]" href="#tools">Tools</a>
            <a className="transition-colors hover:text-[#111111]" href="#trust">About</a>
          </nav>
          <a
            href="#tools"
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#111111] px-4 py-2 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(17,17,17,0.18)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Explore tools
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </header>

        <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#CFC3B0] bg-white/60 px-3 py-1.5 text-sm font-semibold text-[#3B352C] backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-[#176B87]" aria-hidden="true" />
              OCIX / product studio
            </div>

            <h1 id="hero-title" className="max-w-5xl text-balance text-5xl font-semibold leading-[0.98] tracking-normal text-[#111111] sm:text-6xl lg:text-7xl">
              Focused products for commitments that matter.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#5F574B] sm:text-xl">
              OCIX is the parent studio behind products that make follow-through visible.
              One is live. Two are being built carefully.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://vigilante.ocix.in/briefing"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#176B87] px-6 py-3 text-base font-semibold text-white shadow-[0_18px_48px_rgba(23,107,135,0.28)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Enter Vigilante
                <Github className="h-5 w-5 transition-transform duration-300 group-hover:rotate-[-8deg]" aria-hidden="true" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#CFC3B0] bg-white/65 px-6 py-3 text-base font-semibold text-[#111111] backdrop-blur transition-colors hover:bg-white"
              >
                See the portfolio
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-[#CFC3B0]">
              {stats.map((stat) => (
                <div key={stat.label} className="border-r border-[#CFC3B0] py-4 last:border-r-0">
                  <p className="text-2xl font-semibold text-[#111111]">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#766D60]">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xl lg:max-w-none"
            aria-label="Vigilante product preview"
          >
            <div className="absolute -left-5 top-7 hidden h-28 w-28 border border-white/20 lg:block" />
            <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#151515] p-4 text-white shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8ED7C6]">Vigilante // Mission Control</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-normal">Campaign status</h2>
                </div>
                <Sparkles className="h-5 w-5 text-[#F3B664]" aria-hidden="true" />
              </div>

              <div className="relative mt-6 h-44 overflow-hidden rounded-lg bg-[#0A0A0A] p-5 font-mono text-sm text-[#D8D4CA]">
                <motion.div
                  className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#8ED7C6]/18 to-transparent"
                  animate={{ y: [0, 128, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <p><span className="text-[#8ED7C6]">$</span> vigilante deploy --repo selected</p>
                <p className="mt-4 text-[#A7F3D0]">directive: 1 verified push / day</p>
                <p className="text-[#F3B664]">city signal: stable</p>
                <p className="text-[#FCA5A5]">next move: ship before cutoff</p>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {["Daily directive", "Verified proof", "Dream City"].map((item) => (
                  <div key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <div className="mb-3 h-1.5 rounded-full bg-[#8ED7C6]" />
                    <p className="text-sm font-semibold text-[#F7F3EA]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
