import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const footerGroups = [
  {
    title: "Product",
    links: [
      { label: "Vigilante", href: "https://vigilante.ocix.in", external: true },
      { label: "Free GitHub audit", href: "https://vigilante.ocix.in", external: true },
      { label: "Monitored challenge", href: "https://myvigilante.ocix.in", external: true },
      { label: "7-day challenge", href: "https://vigilante.ocix.in/#challenge", external: true },
    ],
  },
  {
    title: "Workflows",
    links: [
      { label: "Deep work", href: "#philosophy" },
      { label: "Consistency tracking", href: "#how-it-works" },
      { label: "Anti-procrastination", href: "#ecosystem" },
    ],
  },
  {
    title: "OCIX",
    links: [
      { label: "Operating principles", href: "#philosophy" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "Start now", href: "#request-access" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: "mailto:support@ocix.in", external: true },
      { label: "X", href: "https://x.com/Ocixdotin", external: true },
      { label: "Instagram", href: "https://www.instagram.com/ocix.in", external: true },
      { label: "Reddit", href: "https://www.reddit.com/user/ocix_dot_in/", external: true },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E7E5E4] bg-[#FAFAF8] px-5 py-14 text-[#171717] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr]"
        >
          <div>
            <a href="/" aria-label="OCIX home" className="inline-flex items-center">
              <img
                src="/assets/ocix-logo.png"
                alt="OCIX"
                className="h-11 w-auto object-contain"
              />
            </a>
            <p className="mt-5 max-w-md text-base leading-7 text-[#57534E]">
              A parent ecosystem for niche productivity tools that help people stay consistent.
              Start with Vigilante, the GitHub consistency auditor for developers.
            </p>
            <a
              href="https://vigilante.ocix.in"
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2B2926]"
            >
              Run free GitHub audit
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Footer navigation" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#78716C]">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={`${group.title}-${link.label}`}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#3F3A34] transition-colors hover:text-[#171717]"
                      >
                        {link.label}
                        {link.external ? (
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : null}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-12 flex flex-col gap-4 border-t border-[#E7E5E4] pt-6 text-sm text-[#78716C] sm:flex-row sm:items-center sm:justify-between"
        >
          <p>© {currentYear} OCIX. Built for visible execution.</p>
          <p>Free audits are public previews. Continuous monitoring uses GitHub sign-in.</p>
          {/* <p>Check out our <a href="/privacy" className="text-[#171717] hover:underline">Privacy Policy</a> and <a href="/terms" className="text-[#171717] hover:underline">Terms of Service</a>.</p> */}
        </motion.div>
      </div>
    </footer>
  );
}
