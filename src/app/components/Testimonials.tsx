import { motion } from "motion/react";

const testimonials = [
  {
    name: "Darwin",
    message:
      "Vigilante made my consistency obvious. I stopped guessing whether I had worked and started checking the proof.",
  },
  {
    name: "Mayukha",
    message:
      "The product feels direct in a good way. It does not ask me to organize more. It pushes me back to building.",
  },
  {
    name: "Rohan",
    message:
      "I like that OCIX product Vigilante starts with a real behavior instead of another dashboard. The GitHub audit makes the habit visible immediately.",
  },
  {
    name: "Nisha",
    message:
      "The no-zero-commit idea is simple enough to remember and strict enough to change how I end the day.",
  },
  {
    name: "Satyarth",
    message:
      "I have tried many productivity tools but Vigilante is the first one that made me feel like I am actually proving my work instead of just tracking it.",
  }
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-[#FAFAF8] px-5 py-20 text-[#171717] sm:px-6 lg:px-8 lg:py-28"
      aria-labelledby="testimonials-title"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#2563EB]">
            Testimonials
          </p>
          <h2
            id="testimonials-title"
            className="mt-4 text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl"
          >
            Built for people who want the work to be visible.
          </h2>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="rounded-lg border border-[#E7E5E4] bg-white p-6 shadow-[0_18px_60px_rgba(23,23,23,0.05)] sm:p-7"
            >
              <blockquote className="text-lg leading-8 text-[#3F3A34]">
                "{testimonial.message}"
              </blockquote>
              <figcaption className="mt-7 border-t border-[#E7E5E4] pt-5 text-base font-semibold text-[#171717]">
                {testimonial.name}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
