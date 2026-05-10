import { motion } from "motion/react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-6 py-12 border-t border-[#1F2937]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div>
            <p className="text-2xl mb-2">OCIX</p>
            <p className="text-[#9CA3AF]">Built for execution.</p>
          </div>

          <div className="flex gap-8 text-sm">
            <a href="#products" className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">
              Products
            </a>
            <a href="https://vigilante.ocix.in" className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">
              Vigilante
            </a>
            <a href="#request-access" className="text-[#9CA3AF] hover:text-[#E5E7EB] transition-colors">
              Request Access
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 pt-8 border-t border-[#1F2937] text-center text-sm text-[#6B7280]"
        >
          <p>© {currentYear} Ocix. Built for serious developers only.</p>
        </motion.div>
      </div>
    </footer>
  );
}
