import { motion } from "motion/react";

const statements = [
  "Most tools help you feel productive. Ocix shows whether you actually are.",
  "If you need motivation, this isn't for you.",
  "Discipline isn't optional. It's the baseline.",
];

export function Philosophy() {
  return (
    <section id="philosophy" className="px-6 py-24 bg-[#111827]" aria-labelledby="philosophy-title">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 id="philosophy-title" className="text-4xl md:text-5xl mb-4">Philosophy</h2>
        </motion.div>

        <div className="space-y-8">
          {statements.map((statement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border-l-2 border-[#22D3EE] pl-6 py-4"
            >
              <p className="text-2xl md:text-3xl">{statement}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
