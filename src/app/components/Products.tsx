import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import { GitBranch, Lock } from "lucide-react";
import React from "react";

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

function ProductCard({ product, index }: { product: any, index: number }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const isVigilante = product.name === "Vigilante";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onClick={() => isVigilante ? window.open("https://vigilante.ocix.in", "_blank") : null}
      className={`relative p-8 rounded-xl bg-[#111827] border border-[#1F2937] hover:border-[#374151] transition-all overflow-hidden group ${isVigilante ? 'cursor-pointer' : 'cursor-default'}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(34, 211, 238, 0.05),
              transparent 80%
            )
          `,
        }}
      />
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className={`p-3 rounded-lg flex items-center justify-center ${product.available ? 'bg-[#22D3EE]/10' : 'bg-[#1F2937]/50'}`}>
           <product.icon className={`w-8 h-8 ${product.available ? 'text-[#22D3EE]' : 'text-[#6B7280]'}`} />
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            product.available
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
          }`}
        >
          {product.status}
        </span>
      </div>
      <h3 className="text-2xl mb-3 font-semibold relative z-10">{product.name}</h3>
      <p className="text-lg text-[#E5E7EB] mb-4 relative z-10">{product.description}</p>
      <p className="text-[#9CA3AF] relative z-10">{product.detail}</p>
    </motion.div>
  );
}

export function Products() {
  return (
    <section id="products" className="px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl mb-4 font-bold tracking-tight">Products</h2>
          <p className="text-xl text-[#9CA3AF]">Built for execution, not excuses.</p>
        </motion.div>

        <motion.div 
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={{
             visible: {
               transition: {
                 staggerChildren: 0.1
               }
             }
           }}
           className="grid md:grid-cols-2 gap-6"
        >
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
