import { motion } from "motion/react";
import { Eye, Gauge, Layers2, ShieldCheck } from "lucide-react";

const principles = [
  {
    title: "Proof beats mood",
    description:
      "OCIX tools should show what happened, not ask users how productive they felt.",
    icon: Eye,
  },
  {
    title: "Friction stays low",
    description:
      "Give users value before heavy setup. Ask for sign-in only when monitoring or saved progress needs it.",
    icon: Gauge,
  },
  {
    title: "Systems stay honest",
    description:
      "OCIX tools make missed days visible without turning the product into punishment theater.",
    icon: ShieldCheck,
  },
  {
    title: "The ecosystem compounds",
    description:
      "Each future product will connect to the same loop: choose the work, verify the output, return with better context.",
    icon: Layers2,
  },
];

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="border-y border-[#E7E5E4] bg-white px-5 py-20 text-[#171717] sm:px-6 lg:px-8 lg:py-28"
      aria-labelledby="philosophy-title"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
              Operating principles
            </p>
            <h2
              id="philosophy-title"
              className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl"
            >
              OCIX is built around execution, not productivity theater.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#57534E]">
              We help users across different niches reduce self-negotiation by making progress
              visible and the next action clear.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg border border-[#E7E5E4] bg-[#FAFAF8] p-4 sm:p-5"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {principles.map((principle) => (
                <article
                  key={principle.title}
                  className="rounded-lg border border-[#E7E5E4] bg-white p-5"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
                    <principle.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-normal text-[#171717]">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#57534E]">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 rounded-lg bg-[#171717] p-6 text-white sm:p-8 lg:p-10"
        >
          <p className="max-w-4xl text-balance text-2xl font-semibold leading-tight sm:text-3xl">
            The goal is not to make people spend more time inside OCIX. The goal is to make
            them spend less time negotiating with themselves before doing the work.
          </p>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-[#A3A3A3]">
            Product belief
          </p>
        </motion.div>
      </div>
    </section>
  );
}
