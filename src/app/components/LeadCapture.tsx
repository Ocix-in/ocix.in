import { motion } from "motion/react";
import { ArrowRight, Github } from "lucide-react";

export function LeadCapture() {
  return (
    <section id="request-access" className="bg-[#F7F3EA] px-5 py-20 text-[#111111] sm:px-6 lg:px-8 lg:py-28" aria-labelledby="request-access-title">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-7xl overflow-hidden rounded-lg bg-[#111111] text-white shadow-[0_30px_90px_rgba(17,17,17,0.22)]"
      >
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-10 lg:p-14">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8ED7C6]">The live door</p>
            <h2 id="request-access-title" className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl lg:text-6xl">
              Start with the product you can use today.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#CFC8BC]">
              Vigilante is OCIX’s live GitHub accountability game. Read the story and access boundaries first; register only when you choose to deploy.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://vigilante.ocix.in/briefing"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#8ED7C6] px-6 py-3 text-base font-semibold text-[#111111] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Enter mission briefing
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="https://myvigilante.ocix.in"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/[0.1]"
              >
                <Github className="h-5 w-5" aria-hidden="true" />
                Open the app
              </a>
            </div>
          </div>

          <div className="relative min-h-72 border-t border-white/10 bg-[#171717] p-6 sm:p-10 lg:border-l lg:border-t-0">
            <motion.div
              className="absolute left-8 top-8 h-[calc(100%-4rem)] w-px bg-gradient-to-b from-[#8ED7C6] via-white/20 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
            />
            <div className="space-y-7 pl-8">
              {["Mission briefing", "Choose repository", "Verified campaign"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.22 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <span className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full bg-[#8ED7C6] ring-4 ring-[#171717]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8D8170]">Step 0{index + 1}</p>
                  <p className="mt-1 text-xl font-semibold">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
