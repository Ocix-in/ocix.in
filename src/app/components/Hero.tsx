import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  return <>
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-top"><p className="eyebrow">Independent software studio</p><span className="hero-note">Games · Productivity · Growth</span></div>
      <h1 id="hero-title">Different ideas.<br/><span>Built with intent.</span></h1>
      <div className="hero-bottom"><p>We build games, productivity tools and growth software.<br className="desktop-break"/> Different products, one standard: worth your time.</p><a className="button button-light" href="#portfolio">Explore our products <ArrowDown size={18} aria-hidden="true"/></a></div>
      <a className="hero-feature" href="https://vigilante.ocix.in/briefing" aria-label="Explore Vigilante — GitHub accountability">
        <picture><source media="(max-width: 700px)" srcSet="/assets/vigilante-world-mobile.webp"/><img className="feature-art" src="/assets/vigilante-world-desktop.webp" alt="A restored settlement in Vigilante, with the Lantern House, Radio Tower, Clinic and Salvage Yard" width="1070" height="430" fetchPriority="high"/></picture>
        <div className="feature-shade"/>
        <div className="feature-top"><span className="eyebrow">Featured product / 01</span><span className="status status-live"><i/>Live</span></div>
        <div className="feature-bottom"><div><p className="eyebrow">Real work. Visible momentum.</p><h2>Vigilante</h2><p>GitHub accountability. With a world to return to.</p></div><span className="round-link"><ArrowUpRight size={30} aria-hidden="true"/></span></div>
      </a>
      <div className="portfolio-strip"><span>The OCIX collection</span><a href="/products/vigilante">Vigilante <small>Live</small></a><a href="/products/draftshield">DraftShield <small>In development</small></a><a href="/products/gymx">GymX <small>In development</small></a><a href="/products/do-it">Do It! <small>In development</small></a></div>
    </section>
  </>;
}
