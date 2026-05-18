import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Compass, Layers2 } from "lucide-react";

const principles = [
  "Only show products that are real enough to use.",
  "Let each tool prove one consistency loop before expanding.",
  "Keep OCIX broad as a parent brand, but keep the homepage focused.",
];

export function FutureVision() {
  return (
    <section
      id="ecosystem"
      className="bg-white px-5 py-20 text-[#171717] sm:px-6 lg:px-8 lg:py-28"
      aria-labelledby="ecosystem-title"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
        >
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
              <Layers2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
              Parent ecosystem
            </p>
            <h2
              id="ecosystem-title"
              className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl"
            >
              OCIX is bigger than one tool. The homepage should not pretend the suite exists yet.
            </h2>
          </div>

          <div className="rounded-lg border border-[#E7E5E4] bg-[#FAFAF8] p-5 sm:p-6">
            <div className="rounded-lg bg-white p-5">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#171717] text-white">
                <Compass className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold tracking-normal">
                The current proof point is Vigilante.
              </h3>
              <p className="mt-4 text-base leading-7 text-[#57534E]">
                OCIX will eventually support consistency across different kinds of serious work.
                For now, the homepage should build trust by focusing on the product people can
                use today: Vigilante for developer consistency.
              </p>
            </div>

            <ul className="mt-5 space-y-3">
              {principles.map((principle) => (
                <li key={principle} className="flex gap-3 text-sm leading-6 text-[#3F3A34]">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#15803D]" aria-hidden="true" />
                  <span>{principle}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
