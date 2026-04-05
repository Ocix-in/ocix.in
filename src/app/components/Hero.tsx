import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen">
        <motion.div
          className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full"
          style={{
            background: "linear-gradient(90deg, #22D3EE, #A855F7)",
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full"
          style={{
            background: "linear-gradient(90deg, #EC4899, #F59E0B)",
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight font-bold">
            Either you ship, or you don't belong here.
          </h1>
          <p className="text-xl md:text-2xl text-[#9CA3AF] mb-12 max-w-3xl mx-auto">
            No fluff. No fake productivity. Just execution.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group cursor-pointer"
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            >
               <div 
                 className="absolute -inset-0.5 rounded-lg opacity-75 blur-md group-hover:opacity-100 transition duration-500" 
                 style={{ background: "linear-gradient(90deg, #22D3EE, #A855F7, #EC4899, #F59E0B)" }}
               ></div>
               <button className="relative px-8 py-4 rounded-lg text-white bg-[#0B0F1A] w-full flex items-center justify-center overflow-hidden border border-transparent shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                 <span className="relative z-10 font-bold tracking-wide">Explore Tools</span>
               </button>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-lg border border-[#1F2937] bg-[#111827] text-[#E5E7EB] hover:bg-[#1F2937] hover:border-[#374151] transition-all shadow-sm font-medium"
              onClick={() => document.getElementById('request-access')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get Early Access
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
