import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Github,
  GitCommitHorizontal,
  LineChart,
  Lock,
  Target,
  TimerReset,
  TriangleAlert,
} from "lucide-react";

const enforcementSteps = [
  {
    title: "Audit the record",
    description: "Start with a public GitHub username and inspect the last 30 days of visible output.",
    icon: Github,
  },
  {
    title: "Find the gaps",
    description: "Surface quiet days, broken streaks, and the distance between intention and proof.",
    icon: TriangleAlert,
  },
  {
    title: "Set the rule",
    description: "Sign in with GitHub when you want the no-zero-commit challenge monitored continuously.",
    icon: Target,
  },
  {
    title: "Return to work",
    description: "The product does not distract you with dashboards. It sends you back to shipping.",
    icon: TimerReset,
  },
];

const roadmapTools = [
  {
    name: "Execution Planner",
    description: "Turn daily intention into a small, visible work plan.",
    icon: CalendarCheck2,
  },
  {
    name: "Consistency Tracker",
    description: "Track streaks and patterns without creating another productivity chore.",
    icon: LineChart,
  },
  {
    name: "Focus Systems",
    description: "Lightweight deep-work structures for builders, students, and creators.",
    icon: Lock,
  },
];

const funnelOptions = [
  {
    title: "Free public audit",
    eyebrow: "vigilante.ocix.in",
    description:
      "A low-friction preview for developers who want to check their recent GitHub consistency before creating an account.",
    cta: "Run free audit",
    href: "https://vigilante.ocix.in",
    features: [
      "Enter a public GitHub username",
      "Preview recent activity and inactive gaps",
      "Understand whether the work is visible",
      "No OAuth required for the basic report",
    ],
  },
  {
    title: "Monitored challenge",
    eyebrow: "myvigilante.ocix.in",
    description:
      "The committed path for developers who want Vigilante to track a repository and hold the no-zero-commit rule over time.",
    cta: "Start monitored challenge",
    href: "https://myvigilante.ocix.in",
    features: [
      "Sign in with GitHub OAuth",
      "Select the repository to monitor",
      "Track the no-zero-commit challenge",
      "Unlock ongoing accountability and insights",
    ],
  },
];

export function Products() {
  return (
    <section id="products" className="bg-white px-5 py-20 text-[#171717] sm:px-6 lg:px-8 lg:py-28" aria-labelledby="products-title">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
            Product ecosystem
          </p>
          <h2 id="products-title" className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            OCIX starts with one clear behavior: prove the work happened.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#57534E]">
            The ecosystem begins with Vigilante, a GitHub productivity auditor for
            developers who want a quick consistency check and the option to turn it into
            ongoing accountability.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
          <motion.article
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg border border-[#E7E5E4] bg-[#FAFAF8] p-6 sm:p-8"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#171717] text-white">
                  <GitCommitHorizontal className="h-6 w-6" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
                  Live now
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">
                  Vigilante
                </h3>
              </div>
              <span className="w-fit rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-3 py-1 text-sm font-semibold text-[#15803D]">
                Live
              </span>
            </div>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#57534E]">
              Vigilante gives developers a free public GitHub audit first. If they want
              continued tracking, they can sign in with GitHub on My Vigilante and start
              monitored accountability.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-lg border border-[#E7E5E4] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#78716C]">
                  Input
                </p>
                <p className="mt-2 text-base font-semibold">Public username</p>
              </div>
              <div className="rounded-lg border border-[#E7E5E4] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#78716C]">
                  Output
                </p>
                <p className="mt-2 text-base font-semibold">Basic audit</p>
              </div>
              <div className="rounded-lg border border-[#E7E5E4] bg-white p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#78716C]">
                  Upgrade
                </p>
                <p className="mt-2 text-base font-semibold">GitHub sign-in</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://vigilante.ocix.in"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#171717] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#2B2926]"
              >
                Run free GitHub audit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://myvigilante.ocix.in"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#D9D6CF] bg-white px-5 py-3 font-semibold text-[#171717] transition-colors hover:border-[#BEB8AD]"
              >
                Start monitored challenge
              </a>
            </div>

            <div className="mt-8 border-t border-[#E7E5E4] pt-6">
              <p className="mb-3 text-sm font-medium text-[#57534E]">
                Featured on Product Hunt
              </p>
              <a
                href="https://www.producthunt.com/products/vigilante-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-vigilante-3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Vigilante on Product Hunt"
                className="inline-flex w-fit rounded-lg transition-opacity hover:opacity-85"
              >
                <img
                  alt="Vigilante - Either you build or You don't belong here | Product Hunt"
                  width="250"
                  height="54"
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1143843&theme=light&t=1778528463161"
                  loading="lazy"
                />
              </a>
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg border border-[#E7E5E4] bg-[#171717] p-6 text-white sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#93C5FD]">
              Enforcement model
            </p>
            <h3 className="mt-3 text-3xl font-semibold tracking-normal">
              Proof before planning.
            </h3>
            <p className="mt-4 leading-7 text-[#D4D4D4]">
              OCIX products should push users through a clear behavior loop instead of
              asking them to organize forever.
            </p>

            <div className="mt-7 space-y-4">
              {enforcementSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-[#171717]">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {String(index + 1).padStart(2, "0")}. {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-[#A3A3A3]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 rounded-lg border border-[#E7E5E4] bg-[#FAFAF8] p-5 sm:p-6"
        >
          <div className="mb-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
              Conversion flow
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-normal sm:text-3xl">
              Try the proof first. Commit when the result matters.
            </h3>
            <p className="mt-3 text-base leading-7 text-[#57534E]">
              Vigilante should not force account creation before proving value. The public audit
              creates the first moment of truth; My Vigilante turns that moment into monitoring.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {funnelOptions.map((option) => (
              <article key={option.title} className="rounded-lg border border-[#E7E5E4] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#78716C]">
                  {option.eyebrow}
                </p>
                <h4 className="mt-3 text-2xl font-semibold tracking-normal">{option.title}</h4>
                <p className="mt-3 text-sm leading-6 text-[#57534E]">{option.description}</p>

                <ul className="mt-5 space-y-3">
                  {option.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm leading-6 text-[#3F3A34]">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={option.href}
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2B2926]"
                >
                  {option.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#78716C]">
                Planned ecosystem
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-normal">
                Future tools extend the same execution loop.
              </h3>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {roadmapTools.map((tool) => (
              <article
                key={tool.name}
                className="rounded-lg border border-[#E7E5E4] bg-[#FAFAF8] p-5"
              >
                <tool.icon className="h-5 w-5 text-[#2563EB]" aria-hidden="true" />
                <h4 className="mt-4 text-lg font-semibold">{tool.name}</h4>
                <p className="mt-2 text-sm leading-6 text-[#57534E]">{tool.description}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
