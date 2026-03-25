import { motion } from "motion/react";
import { Layers } from "lucide-react";

export function FutureVision() {
  return (
    <section className="px-6 py-24 bg-[#111827]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Layers className="w-16 h-16 mx-auto mb-6 text-[#22D3EE]" />
          <h2 className="text-4xl md:text-5xl mb-6">The Ecosystem</h2>
          <p className="text-xl md:text-2xl text-[#9CA3AF] max-w-3xl mx-auto mb-8">
            Ocix is not a single product. It's a complete ecosystem built for developers who execute.
          </p>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            More tools are coming. Each designed with the same principle: expose reality, enforce discipline, eliminate waste.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 p-8 rounded-xl border border-[#1F2937] text-center"
        >
          <p className="text-xl text-[#E5E7EB]">
            Future support for startup founders and small teams.
          </p>
          <p className="text-[#9CA3AF] mt-2">Building tools that scale with serious execution.</p>
        </motion.div>
      </div>
    </section>
  );
}
