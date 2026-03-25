import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "linear-gradient(90deg, #22D3EE, #A855F7)",
            filter: "blur(100px)",
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full"
          style={{
            background: "linear-gradient(90deg, #EC4899, #F59E0B)",
            filter: "blur(100px)",
          }}
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
            Either you ship, or you don't belong here.
          </h1>
          <p className="text-xl md:text-2xl text-[#9CA3AF] mb-12 max-w-3xl mx-auto">
            No fluff. No fake productivity. Just execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-lg text-white relative overflow-hidden group"
              style={{
                background: "linear-gradient(90deg, #22D3EE, #A855F7, #EC4899, #F59E0B)",
              }}
            >
              <span className="relative z-10">Explore Tools</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-lg border border-[#1F2937] bg-[#111827] text-[#E5E7EB] hover:border-[#374151] transition-colors"
            >
              Get Early Access
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
