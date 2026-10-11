const principles = [
  { title: "One clear idea.", copy: "Start with one thing worth doing well, whether that’s helping you ship or giving you a good time. Build around that." },
  { title: "Worth coming back to.", copy: "A tool should make the next step clearer. A game should be fun on the tenth visit, not just the first." },
  { title: "Trust, from the start.", copy: "Explain what a product does, what it needs access to, and when it is ready to use." },
];
export function HowItWorks() {
  return <section id="proof" className="section wrap studio-section" aria-labelledby="studio-title"><div className="section-heading"><div><p className="eyebrow">03 / The studio</p><h2 id="studio-title">Small by design.<br/>Serious about the details.</h2></div><p>OCIX builds games, productivity tools and growth software around a simple belief: whatever we make should be worth your time.</p></div><div className="principles">{principles.map((item,index) => <article key={item.title}><span className="principle-number">0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>;
}
