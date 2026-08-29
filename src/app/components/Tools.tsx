import { motion } from "motion/react";
import { Activity, ArrowUpRight, Flame, LockKeyhole, ScanSearch } from "lucide-react";

const tools = [
  {
    number: "01",
    eyebrow: "Signal check",
    title: "GitHub Consistency Audit",
    copy: "Read the last 30 days of visible activity as active days, quiet gaps, streak health, and repository focus.",
    href: "https://vigilante.ocix.in/audit",
    action: "Run the audit",
    icon: ScanSearch,
    accent: "#176B87",
    surface: "bg-white/70",
  },
  {
    number: "02",
    eyebrow: "Reality check",
    title: "GitHub Profile Roast",
    copy: "Turn the same public contribution history into a sharp, stats-backed read on the habits your graph exposes.",
    href: "https://vigilante.ocix.in/roast",
    action: "Roast my profile",
    icon: Flame,
    accent: "#B85C38",
    surface: "bg-[#FFF3E9]",
  },
] as const;

export function Tools() {
  return (
    <section id="tools" className="bg-[#E8E2D6] px-5 py-20 text-[#111111] sm:px-6 lg:px-8 lg:py-28" aria-labelledby="tools-title">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#176B87]">OCIX tools</p>
            <h2 id="tools-title" className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              Useful before you commit.
            </h2>
          </div>
          <div className="lg:justify-self-end">
            <p className="max-w-2xl text-lg leading-8 text-[#5F574B]">
              Quick, free utilities from the systems we build. No account required, and no need to enter Vigilante’s game journey.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-xs font-bold uppercase tracking-[0.12em] text-[#766D60]">
              <span className="inline-flex items-center gap-2"><Activity className="h-4 w-4 text-[#176B87]" aria-hidden="true" /> Public GitHub data</span>
              <span className="inline-flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-[#176B87]" aria-hidden="true" /> No login</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <motion.article
                key={tool.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative overflow-hidden rounded-lg border border-[#CFC3B0] ${tool.surface} p-6 shadow-[0_20px_60px_rgba(17,17,17,0.08)] sm:p-8`}
              >
                <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" style={{ backgroundColor: tool.accent }} />
                <div className="flex items-start justify-between gap-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg text-white" style={{ backgroundColor: tool.accent }}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#8D8170]">{tool.number}</span>
                </div>
                <p className="mt-9 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: tool.accent }}>{tool.eyebrow}</p>
                <h3 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">{tool.title}</h3>
                <p className="mt-4 max-w-xl text-base leading-7 text-[#5F574B]">{tool.copy}</p>
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(17,17,17,0.16)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(17,17,17,0.22)]"
                  style={{ backgroundColor: tool.accent }}
                >
                  {tool.action} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
