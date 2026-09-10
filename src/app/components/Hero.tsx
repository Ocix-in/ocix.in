import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  return <>
    <header className="site-header wrap">
      <a className="brand" href="/" aria-label="OCIX home"><img src="/assets/ocix-logo-transparent.png" alt="OCIX" width="100" height="42" /></a>
      <nav aria-label="Primary navigation"><a href="#portfolio">Products</a><a href="#tools">Free tools</a><a href="#proof">The studio</a></nav>
      <a className="header-cta" href="https://myvigilante.ocix.in/briefing">Try Vigilante <ArrowUpRight aria-hidden="true" size={16}/></a>
    </header>
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-top"><p className="eyebrow">Independent product studio</p><span className="hero-note">Built with intent. By OCIX.</span></div>
      <h1 id="hero-title">Good intentions.<br/><span>Real follow-through.</span></h1>
      <div className="hero-bottom"><p>We build focused products for the things you mean to do.<br className="desktop-break"/> Less friction. More proof. A reason to keep going.</p><a className="button button-light" href="#portfolio">Explore our products <ArrowDown size={18} aria-hidden="true"/></a></div>
      <a className="hero-feature" href="https://myvigilante.ocix.in/briefing" aria-label="Explore Vigilante — GitHub accountability">
        <img className="feature-art" src="/assets/vigilante-world.webp" alt="Cinematic night-time city artwork from Vigilante" width="1672" height="941" fetchPriority="high"/>
        <div className="feature-shade"/>
        <div className="feature-top"><span className="eyebrow">Featured product / 01</span><span className="status status-live"><i/>Live</span></div>
        <div className="feature-bottom"><div><p className="eyebrow">Real work. Visible momentum.</p><h2>Vigilante</h2><p>GitHub accountability. With a world to return to.</p></div><span className="round-link"><ArrowUpRight size={30} aria-hidden="true"/></span></div>
      </a>
      <div className="portfolio-strip"><span>The OCIX collection</span><a href="#vigilante">Vigilante <small>Live</small></a><a href="#draftshield">DraftShield <small>In development</small></a><a href="#gymx">GymX <small>In development</small></a></div>
    </section>
  </>;
}
