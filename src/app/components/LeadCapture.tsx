import { motion } from "motion/react";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export function LeadCapture() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Early access request:", { email, role });
  };

  return (
    <section className="px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4">Request Access</h2>
          <p className="text-xl text-[#9CA3AF]">
            Limited early access. No waitlist games.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-[#111827] border border-[#1F2937] rounded-xl p-8"
        >
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-[#9CA3AF]">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#0B0F1A] border border-[#1F2937] text-[#E5E7EB] placeholder-[#6B7280] focus:outline-none focus:border-[#22D3EE] transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm mb-2 text-[#9CA3AF]">
                Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#0B0F1A] border border-[#1F2937] text-[#E5E7EB] focus:outline-none focus:border-[#22D3EE] transition-colors"
                required
              >
                <option value="">Select your role</option>
                <option value="developer">Developer</option>
                <option value="student">Student</option>
                <option value="founder">Founder</option>
                <option value="other">Other</option>
              </select>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              className="w-full px-8 py-4 rounded-lg text-white flex items-center justify-center gap-2 group"
              style={{
                background: "linear-gradient(90deg, #22D3EE, #A855F7, #EC4899, #F59E0B)",
              }}
            >
              Request Access
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-sm text-[#6B7280] mt-6"
        >
          We review every request. No spam. No mass invites.
        </motion.p>
      </div>
    </section>
  );
}
