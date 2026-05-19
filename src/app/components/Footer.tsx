import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Vigilante", href: "https://vigilante.ocix.in", external: true },
  { label: "Monitor", href: "https://myvigilante.ocix.in", external: true },
  { label: "Trust", href: "#trust" },
  { label: "Email", href: "mailto:support@ocix.in", external: true },
  { label: "X", href: "https://x.com/Ocixdotin", external: true },
  { label: "Instagram", href: "https://www.instagram.com/ocix.in", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-[#D8CCBA] bg-[#F7F3EA] px-5 py-10 text-[#111111] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <a href="/" aria-label="OCIX home" className="inline-flex items-center">
            <img src="/assets/ocix-logo.png" alt="OCIX" className="h-10 w-auto object-contain" />
          </a>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#5F574B]">
            Focused consistency tools. Vigilante is live for GitHub audits and developer monitoring.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-3 md:justify-end">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#3B352C] transition-colors hover:text-[#176B87]"
            >
              {link.label}
              {link.external ? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /> : null}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
