import { motion } from "motion/react";
import { GitBranch, Lock } from "lucide-react";

const products = [
  {
    name: "Vigilante",
    status: "Live",
    description: "Expose the gap between effort and output.",
    detail: "Connects to Git activity to expose the gap between what a developer claims and what they actually ship. Enforces discipline through a strict scoring system.",
    icon: GitBranch,
    available: true,
  },
  {
    name: "Coming Soon",
    status: "In Development",
    description: "Next-generation developer tools.",
    detail: "More tools designed for serious execution are in development. No distractions. No compromises.",
    icon: Lock,
    available: false,
  },
];

export function Products() {
  return (
    <section className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Products</h2>
          <p className="text-xl text-[#9CA3AF]">Built for execution, not excuses.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-[#374151] transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between mb-6">
                <product.icon className="w-8 h-8 text-[#22D3EE]" />
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    product.available
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {product.status}
                </span>
              </div>
              <h3 className="text-2xl mb-3">{product.name}</h3>
              <p className="text-lg text-[#E5E7EB] mb-4">{product.description}</p>
              <p className="text-[#9CA3AF]">{product.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
