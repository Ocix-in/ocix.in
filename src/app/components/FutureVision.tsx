import { motion } from "motion/react";
import { ArrowRight, BookOpenCheck, Code2, Compass, Layers2, PenTool, Users } from "lucide-react";

const ecosystemTracks = [
  {
    status: "Live",
    title: "Developer proof",
    description:
      "Vigilante turns GitHub activity into a visible consistency record for builders.",
    icon: Code2,
  },
  {
    status: "Planned",
    title: "Student execution",
    description:
      "Study sessions, revision cycles, and assignment progress shaped around proof of work.",
    icon: BookOpenCheck,
  },
  {
    status: "Planned",
    title: "Creator consistency",
    description:
      "Idea-to-publishing workflows that make output cadence easier to see and repeat.",
    icon: PenTool,
  },
  {
    status: "Planned",
    title: "Founder operating rhythm",
    description:
      "A lightweight execution layer for weekly priorities, shipping cadence, and accountability.",
    icon: Users,
  },
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
          className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
        >
          <div>
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#2563EB]">
              <Layers2 className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
              Ecosystem direction
            </p>
            <h2
              id="ecosystem-title"
              className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl"
            >
              One live product now. A broader execution system over time.
            </h2>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {ecosystemTracks.map((track, index) => (
            <motion.article
              key={track.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-lg border border-[#E7E5E4] bg-[#FAFAF8] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#2563EB]">
                  <track.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    track.status === "Live"
                      ? "border border-[#BBF7D0] bg-[#F0FDF4] text-[#15803D]"
                      : "border border-[#E7E5E4] bg-white text-[#78716C]"
                  }`}
                >
                  {track.status}
                </span>
              </div>
              <h3 className="mt-6 text-xl font-semibold tracking-normal">{track.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#57534E]">{track.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 grid gap-4 rounded-lg border border-[#E7E5E4] bg-[#171717] p-6 text-white lg:grid-cols-[0.75fr_1fr_auto] lg:items-center lg:p-8"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white text-[#171717]">
            <Compass className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-normal">The rule for every future tool</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#D4D4D4]">
              It must help the user choose work, verify progress, and return with less friction.
            </p>
          </div>
          <a
            href="https://vigilante.ocix.in"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-[#171717] transition-colors hover:bg-[#E5E5E5]"
          >
            Start with Vigilante
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
