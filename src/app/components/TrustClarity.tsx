import { motion } from "motion/react";
import { ChevronDown, Eye, Github, LockKeyhole } from "lucide-react";

const details = [
  {
    question: "What can I do without signing in?",
    answer: "Use the free Audit and Roast tools from public GitHub data, or read Vigilante’s complete mission briefing before deciding to register.",
    icon: Eye,
  },
  {
    question: "When is GitHub OAuth needed?",
    answer: "Only after you choose to deploy into Vigilante and want repository selection, verified-push tracking, and an ongoing campaign.",
    icon: Github,
  },
  {
    question: "What is OCIX beyond Vigilante?",
    answer: "OCIX is the parent product studio. Vigilante is live; DraftShield and GymX are in development and do not have public product URLs yet.",
    icon: LockKeyhole,
  },
];

export function TrustClarity() {
  return (
    <section id="trust" className="bg-[#EFE6D6] px-5 py-20 text-[#111111] sm:px-6 lg:px-8 lg:py-28" aria-labelledby="trust-title">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#176B87]">Trust clarity</p>
          <h2 id="trust-title" className="mt-4 max-w-xl text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
            Clear doors. No forced account wall.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[#5F574B]">
            Free utilities stay separate from Vigilante’s game journey. The briefing explains the mission and permissions before registration.
          </p>
        </motion.div>

        <div className="space-y-3">
          {details.map((item, index) => (
            <motion.details
              key={item.question}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-lg border border-[#D8CCBA] bg-[#F7F3EA]/80 p-5 backdrop-blur open:bg-white"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5">
                <span className="flex items-center gap-4 text-lg font-semibold">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#111111] text-white">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {item.question}
                </span>
                <ChevronDown className="h-5 w-5 shrink-0 text-[#766D60] transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-4 pl-14 text-base leading-7 text-[#5F574B]">{item.answer}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}
