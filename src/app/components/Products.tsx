import { ArrowUpRight, Github, ShieldCheck, Dumbbell } from "lucide-react";

export function Products() {
  return <section id="portfolio" className="section wrap" aria-labelledby="products-title">
    <div className="section-heading"><div><p className="eyebrow">01 / The products</p><h2 id="products-title">Different ambitions.<br/>The same follow-through.</h2></div><p>From the code you push to the habits you build. Each product starts with one thing worth doing well.</p></div>
    <article id="vigilante" className="product-live">
      <div className="product-copy"><div className="product-label"><Github aria-hidden="true"/><span className="status status-live"><i/>Live</span></div><h3>Vigilante</h3><p className="product-tagline">Make showing up mean something.</p><p>Choose a GitHub repository. Set a daily commitment. Vigilante verifies qualifying pushes and makes your progress, streaks, and recovery visible.</p><div className="product-tags"><span>For developers</span><span>GitHub connected</span></div><a className="button button-lime" href="https://myvigilante.ocix.in/briefing">Enter Vigilante <ArrowUpRight size={18} aria-hidden="true"/></a><a className="text-link" href="https://vigilante.ocix.in">Discover the product <ArrowUpRight size={16} aria-hidden="true"/></a></div>
      <div className="product-workflow"><div className="workflow-top"><span className="eyebrow">The everyday loop</span><Github aria-hidden="true" size={22}/></div><ol><li><span>01</span><div><h4>Pick your project.</h4><p>One repository. A clear daily commitment.</p></div></li><li><span>02</span><div><h4>Do the real work.</h4><p>Qualifying GitHub pushes become your proof.</p></div></li><li><span>03</span><div><h4>See your momentum.</h4><p>Progress, streaks, risk, and recovery in view.</p></div></li></ol><p className="workflow-foot">Your work is the signal.</p></div>
    </article>
    <div className="development-grid">
      <article id="draftshield" className="development-card"><div className="product-label"><ShieldCheck aria-hidden="true"/><span className="status">In development</span></div><p className="eyebrow">Write with more awareness</p><h3>DraftShield</h3><p>An unofficial, privacy-first extension exploring likely rule-risk review for drafts in the active X composer. Review before you publish.</p><div className="development-footer"><span>For thoughtful publishing</span><span>02</span></div></article>
      <article id="gymx" className="development-card gym-card"><div className="product-label"><Dumbbell aria-hidden="true"/><span className="status">In development</span></div><p className="eyebrow">Build the habit behind the goal</p><h3>GymX</h3><p>A fitness-accountability prototype exploring gym commitments, workout logging, and nutrition tracking. Built around the effort to keep showing up.</p><div className="development-footer"><span>For everyday consistency</span><span>03</span></div></article>
    </div>
  </section>;
}
