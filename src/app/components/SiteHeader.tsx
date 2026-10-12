import { ArrowUpRight } from "lucide-react";

export function SiteHeader() {
  return <header className="site-header wrap">
    <a className="brand" href="/" aria-label="OCIX home"><img src="/assets/ocix-logo.webp" alt="OCIX" width="188" height="96" /></a>
    <nav aria-label="Primary navigation"><a href="/products/vigilante">Products</a><a href="/tools">Tools</a><a href="/about">About</a><a href="/blog">Blog</a></nav>
    <a className="header-cta" href="https://vigilante.ocix.in">Vigilante <ArrowUpRight aria-hidden="true" size={16}/></a>
  </header>;
}
