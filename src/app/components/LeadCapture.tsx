import { motion } from "motion/react";
import { ArrowRight, Github, LockKeyhole, MousePointerClick, TimerReset } from "lucide-react";

const steps = [
  {
    title: "Run the free audit",
    description: "Enter a public GitHub username on Vigilante to see a basic consistency report.",
    icon: MousePointerClick,
  },
  {
    title: "Sign in with GitHub",
    description: "Create an account on My Vigilante when you want continuous monitoring.",
    icon: Github,
  },
  {
    title: "Choose the project rule",
    description: "Select a repository and start the no-zero-commit challenge for the work you want monitored.",
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
              Free audit first. GitHub sign-in when you want monitoring.
            </div>

            <h2
              id="request-access-title"
              className="max-w-4xl text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl"
            >
              Start with the audit. Continue with monitored accountability.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#D4D4D4]">
              Vigilante has two paths: a public GitHub audit for quick traction, and
              My Vigilante for developers who sign in with GitHub to track a repository
              continuously.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://vigilante.ocix.in"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-base font-semibold text-[#171717] transition-colors hover:bg-[#E5E5E5]"
              >
                Run free GitHub audit
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a
                href="https://myvigilante.ocix.in"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/15 bg-white/[0.04] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/[0.08]"
              >
                Start monitored challenge
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
                Two-step onboarding
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
              The public audit reduces friction. GitHub OAuth is introduced only when the user
              is ready for ongoing tracking, repository selection, productivity insights, and
              public accountability.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
