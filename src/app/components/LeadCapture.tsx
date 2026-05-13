import { motion } from "motion/react";
import { ArrowRight, Github, LockKeyhole, MousePointerClick, TimerReset } from "lucide-react";

const steps = [
  {
    title: "Open Vigilante",
    description: "Simply login with your GitHub username. No accounts, setup, or permissions required.",
    icon: MousePointerClick,
  },
  {
    title: "Enter GitHub",
    description: "Select the Github repository you want to audit.",
    icon: Github,
  },
  {
    title: "Start the rule",
    description: "Start the no-zero-commit challenge until you think your project will be completed.",
    icon: TimerReset,
  },
];

export function LeadCapture() {
  return (
    <section
      id="request-access"
      className="bg-[#171717] px-5 py-20 text-white sm:px-6 lg:px-8 lg:py-28"
      aria-labelledby="request-access-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-sm font-medium text-[#E5E5E5]">
              <LockKeyhole className="h-4 w-4 text-[#93C5FD]" aria-hidden="true" />
              No login. No waitlist. No access request.
            </div>

            <h2
              id="request-access-title"
              className="max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl"
            >
              Start with the audit. Let the proof decide what happens next.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D4D4D4]">
              OCIX does not need an onboarding maze right now. Vigilante is already live:
              run the GitHub audit, see the consistency record, and use the result to decide whether you want to keep proving your work with Vigilante.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://vigilante.ocix.in"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#171717] transition-colors hover:bg-[#E5E5E5]"
              >
                Run GitHub Audit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://vigilante.ocix.in/#challenge"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/[0.08]"
              >
                View 7-day challenge
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:p-5"
          >
            <div className="rounded-lg border border-white/10 bg-[#101010] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#93C5FD]">
                Simplest onboarding
              </p>
              <div className="mt-6 space-y-4">
                {steps.map((step, index) => (
                  <article key={step.title} className="flex gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#171717]">
                      <step.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {String(index + 1).padStart(2, "0")}. {step.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[#A3A3A3]">
                        {step.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-[#A3A3A3]">
              Once, you make a habit of proving your work, Later you can buy premium features like productivity insights, public profile sharing, more than one project tracking, and more. But you can start with the proof right now.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
