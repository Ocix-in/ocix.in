import { motion } from "motion/react";
import { Link, Activity, Target } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect workflow",
    description: "Link your Git repositories and development tools.",
    icon: Link,
  },
  {
    number: "02",
    title: "Track output",
    description: "Measure real progress, not time spent.",
    icon: Activity,
  },
  {
    number: "03",
    title: "Eliminate excuses",
    description: "See the truth. Adjust. Execute.",
    icon: Target,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24" aria-labelledby="how-it-works-title">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 id="how-it-works-title" className="text-4xl md:text-5xl mb-4">How It Works</h2>
          <p className="text-xl text-[#9CA3AF]">Three steps. Zero complexity.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              <div className="mb-6">
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#22D3EE] to-[#A855F7] flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <span className="text-6xl font-bold text-[#1F2937]">{step.number}</span>
              </div>
              <h3 className="text-2xl mb-3">{step.title}</h3>
              <p className="text-[#9CA3AF]">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
