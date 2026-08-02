import { motion } from "motion/react";
import { ChartNoAxesColumnIncreasing, GitBranch, MousePointerClick } from "lucide-react";

const steps = [
  {
    title: "Start narrow",
    copy: "Begin with a real user problem and a promise we can support.",
    icon: MousePointerClick,
  },
  {
    title: "Make the signal useful",
    copy: "Show the evidence without adding productivity theater.",
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    title: "Earn the next stage",
    copy: "Broaden access only after the product and its safeguards are ready.",
    icon: GitBranch,
  },
];

export function HowItWorks() {
  return (
    <section id="proof" className="bg-[#F7F3EA] px-5 py-20 text-[#111111] sm:px-6 lg:px-8 lg:py-28" aria-labelledby="proof-title">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#176B87]">How we build</p>
          <h2 id="proof-title" className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            Ship what is useful. Label what is unfinished.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-lg border border-[#D8CCBA] bg-white/55 p-6 backdrop-blur transition-transform duration-300 hover:-translate-y-1"
            >
              <motion.div
                className="absolute left-0 top-0 h-1 w-full bg-[#176B87]"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.12 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
              />
              <div className="mb-8 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#111111] text-white">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-sm font-semibold text-[#8D8170]">0{index + 1}</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-normal">{step.title}</h3>
              <p className="mt-3 text-base leading-7 text-[#5F574B]">{step.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
