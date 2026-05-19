import { motion } from "motion/react";

const quotes = [
  "I stopped guessing whether I had worked and started checking the proof.",
  "It pushes me back to building instead of making me organize another dashboard.",
  "The no-zero-commit idea is simple enough to remember and strict enough to change the day.",
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#111111] px-5 py-16 text-white sm:px-6 lg:px-8" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:items-start"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8ED7C6]">Early feedback</p>
            <h2 id="testimonials-title" className="mt-3 text-3xl font-semibold tracking-normal">Users feel the point fast.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {quotes.map((quote, index) => (
              <motion.figure
                key={quote}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-lg border border-white/10 bg-white/[0.055] p-5"
              >
                <blockquote className="text-base leading-7 text-[#E9E1D3]">"{quote}"</blockquote>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
