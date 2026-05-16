import { motion } from "motion/react";
import { ChartBarIncreasing, ClipboardCheck, ListChecks, RotateCcw } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Audit your current consistency",
    description:
      "Start with a public activity check. For Vigilante, a GitHub username is enough to preview the consistency record.",
    icon: ChartBarIncreasing,
  },
  {
    number: "02",
    title: "Read the consistency record",
    description:
      "OCIX products turn recent behavior into signals users can understand: active days, quiet gaps, and streak behavior.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Choose the next rule",
    description:
      "Move from preview to commitment. For Vigilante, that means GitHub sign-in, repository selection, and a monitored rule.",
    icon: ListChecks,
  },
  {
    number: "04",
    title: "Return and verify",
    description:
      "The loop is intentionally small: build, come back, check the record, and adjust tomorrow with less self-negotiation.",
    icon: RotateCcw,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-[#FAFAF8] px-5 py-20 text-[#171717] sm:px-6 lg:px-8 lg:py-28"
      aria-labelledby="how-it-works-title"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
              How it works
            </p>
            <h2
              id="how-it-works-title"
              className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl"
            >
              A small loop users can actually repeat.
            </h2>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.article
              key={step.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative rounded-lg border border-[#E7E5E4] bg-white p-5 shadow-[0_18px_60px_rgba(23,23,23,0.04)]"
            >
              <div className="mb-7 flex items-start justify-between gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-sm font-semibold text-[#A8A29E]">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold tracking-normal text-[#171717]">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#57534E]">{step.description}</p>
            </motion.article>
          ))}
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col gap-4 rounded-lg border border-[#D9D6CF] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <p className="max-w-2xl text-base leading-7 text-[#3F3A34]">
            The best onboarding is a useful result. Vigilante should make the user think,
            "I know exactly what I need to do today."
          </p>
          <a
            href="https://vigilante.ocix.in"
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#171717] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#2B2926]"
          >
            Try the loop
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div> */}
      </div>
    </section>
  );
}
