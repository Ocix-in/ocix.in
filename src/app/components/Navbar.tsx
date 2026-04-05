import { motion } from "motion/react";

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-[#0B0F1A]/80 border-b border-[#1F2937]"
    >
      <div className="flex items-center gap-3">
        <div className="bg-white px-2 py-1 rounded-lg flex items-center justify-center">
            <img src="/assets/ocix-logo.png" alt="ocix logo" className="h-6 w-auto object-contain" />
        </div>
      </div>
      <div className="flex gap-4">
        <button className="text-sm font-medium hover:text-white transition-colors">SignIn</button>
      </div>
    </motion.nav>
  );
}
