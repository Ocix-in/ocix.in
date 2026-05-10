import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

export function LeadCapture() {
  const [state, handleSubmit] = useForm("mqeggddz");

  return (
    <section id="request-access" className="px-6 py-24" aria-labelledby="request-access-title">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-12"
        >
          <h2 id="request-access-title" className="text-4xl md:text-5xl mb-4 font-bold tracking-tight">Request Access</h2>
          <p className="text-xl text-[#9CA3AF]">
            Limited early access. No waitlist games.
          </p>
        </motion.div>

        {state.succeeded ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#111827] border border-[#22D3EE]/30 rounded-xl p-12 shadow-2xl relative overflow-hidden text-center"
          >
            <div className="absolute top-0 right-0 w-64 h-64 opacity-20 blur-3xl rounded-full bg-[#22D3EE] pointer-events-none"></div>
            <h3 className="text-3xl font-bold mb-4 text-white relative z-10">Request Received</h3>
            <p className="text-[#9CA3AF] relative z-10">We'll review your request and get back to you soon. Keep building.</p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="bg-[#111827] border border-[#1F2937] rounded-xl p-8 shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-32 opacity-10 blur-3xl rounded-full bg-[#22D3EE] pointer-events-none group-hover:opacity-20 transition-opacity duration-1000"></div>

            <div className="space-y-6 relative z-10">
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-[#0B0F1A] border border-[#1F2937] text-[#E5E7EB] placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30 focus:border-[#22D3EE] transition-all"
                  placeholder="your@email.com"
                  required
                />
                <label htmlFor="email" className="absolute left-4 top-2 text-xs font-medium text-[#9CA3AF] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#22D3EE] pointer-events-none">
                  Email
                </label>
                <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>

              <div className="relative">
                <select
                  id="role"
                  name="role"
                  defaultValue=""
                  className="peer w-full px-4 pt-6 pb-2 rounded-lg bg-[#0B0F1A] border border-[#1F2937] text-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#22D3EE]/30 focus:border-[#22D3EE] transition-all appearance-none"
                  required
                >
                  <option value="" disabled className="text-gray-500">Select...</option>
                  <option value="developer">Developer</option>
                  <option value="student">Student</option>
                  <option value="founder">Founder</option>
                  <option value="other">Other</option>
                </select>
                <label htmlFor="role" className="absolute left-4 top-2 text-xs font-medium text-[#9CA3AF] transition-all peer-focus:text-[#22D3EE] pointer-events-none">
                  Role
                </label>
                <ValidationError prefix="Role" field="role" errors={state.errors} className="text-red-500 text-sm mt-1" />
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative group/btn cursor-pointer"
              >
                 <div className="absolute -inset-0.5 bg-[#22D3EE] rounded-lg opacity-40 blur-md group-hover/btn:opacity-60 transition duration-500"></div>
                 <button
                    type="submit"
                    disabled={state.submitting}
                    className="relative w-full px-8 py-4 rounded-lg text-white flex items-center justify-center gap-2 bg-[#0B0F1A] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-[#1F2937] font-semibold tracking-wide overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                   <div className="absolute inset-0 opacity-10 bg-[linear-gradient(90deg,#22D3EE,#A855F7)] pointer-events-none"></div>
                   {state.submitting ? "Sending..." : "Request Access"}
                   {!state.submitting && <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />}
                 </button>
              </motion.div>
            </div>
          </motion.form>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-sm text-[#6B7280] mt-6 font-medium"
        >
          We review every request. No spam. No mass invites.
        </motion.p>
      </div>
    </section>
  );
}
