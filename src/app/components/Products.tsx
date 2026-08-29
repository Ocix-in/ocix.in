import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, Github, LockKeyhole, Radar, ShieldAlert } from "lucide-react";

const signals = ["Daily directive", "Verified pushes", "Campaign state", "Dream City"];

export function Products() {
  return (
    <section id="portfolio" className="bg-[#111111] px-5 py-20 text-white sm:px-6 lg:px-8 lg:py-28" aria-labelledby="product-title">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-end"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#8ED7C6]">OCIX portfolio</p>
            <h2 id="product-title" className="mt-4 max-w-3xl text-balance text-4xl font-semibold leading-tight tracking-normal sm:text-5xl">
              One live product. Two honest experiments.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#CFC8BC]">
              Each product has a clear stage so you know what you can use now and what is still being shaped.
            </p>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1fr_0.82fr]">
          <motion.article
            id="vigilante"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-lg border border-white/10 bg-[#F7F3EA] p-6 text-[#111111] sm:p-8"
          >
            <div className="absolute right-0 top-0 h-full w-px bg-[#111111]/10" />
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-xl">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-[#176B87] text-white">
                  <Github className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#176B87]">Vigilante</p>
                  <span className="rounded-full bg-[#DDF4E9] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#176B4D]">Live</span>
                </div>
                <h3 className="mt-3 text-3xl font-semibold tracking-normal sm:text-4xl">GitHub accountability game</h3>
                <p className="mt-5 text-base leading-8 text-[#5F574B]">
                  Choose one repository, set a daily verified-push mission, and keep a living campaign moving with real GitHub work.
                </p>
              </div>

              <a
                href="https://www.producthunt.com/products/vigilante-3?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-vigilante-3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Vigilante on Product Hunt"
                className="inline-flex w-fit rounded-lg transition-opacity hover:opacity-85"
              >
                <img
                  alt="Vigilante on Product Hunt"
                  width="250"
                  height="54"
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1143843&theme=light&t=1778528463161"
                  loading="lazy"
                />
              </a>
            </div>

            <div className="mt-10 grid gap-3 sm:grid-cols-4">
              {signals.map((signal) => (
                <div key={signal} className="rounded-lg border border-[#D8CCBA] bg-white/60 p-4">
                  <CheckCircle2 className="h-4 w-4 text-[#1C7C54]" aria-hidden="true" />
                  <p className="mt-3 text-sm font-semibold">{signal}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://vigilante.ocix.in/briefing"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#176B87] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Enter the campaign <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="https://myvigilante.ocix.in"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#CFC3B0] bg-white/70 px-5 py-3 text-sm font-semibold text-[#111111] transition-colors hover:bg-white"
              >
                Open the app
              </a>
            </div>
          </motion.article>

          <div className="grid gap-5">
            <motion.article
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg border border-white/10 bg-white/[0.055] p-5 sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F3B664]">In development</span>
                <ShieldAlert className="h-5 w-5 text-[#F3B664]" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold tracking-normal">DraftShield</h3>
              <p className="mt-3 text-sm leading-6 text-[#CFC8BC]">
                Unofficial, privacy-first draft-risk review for the active X composer. A private validation MVP; no public product is available yet.
              </p>
              <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-[#E9E1D3]">
                No public URL <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              </span>
            </motion.article>
            <motion.article
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg border border-white/10 bg-white/[0.055] p-5 sm:p-6"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#F3B664]">In development</span>
                <Radar className="h-5 w-5 text-[#F3B664]" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold tracking-normal">GymX</h3>
              <p className="mt-3 text-sm leading-6 text-[#CFC8BC]">
                A fitness-accountability prototype exploring commitments, workout logging, nutrition, streaks, and verification workflows.
              </p>
              <span className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/15 px-5 py-3 text-sm font-semibold text-[#E9E1D3]">
                Prototype only <LockKeyhole className="h-4 w-4" aria-hidden="true" />
              </span>
            </motion.article>
          </div>
        </div>
      </div>
    </section>
  );
}
