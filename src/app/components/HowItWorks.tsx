const principles = [
  { title: "One real problem.", copy: "Start with something people struggle to follow through on. Build around that, with a clear purpose." },
  { title: "Progress you can see.", copy: "Make the useful signal visible, so the next step feels clearer and the effort feels worthwhile." },
  { title: "Trust, from the start.", copy: "Explain what a product does, what it needs access to, and when it is ready to use." },
];
export function HowItWorks() {
  return <section id="proof" className="section wrap studio-section" aria-labelledby="studio-title"><div className="section-heading"><div><p className="eyebrow">03 / The studio</p><h2 id="studio-title">Small by design.<br/>Serious about the details.</h2></div><p>OCIX builds products around a simple belief: good software should help you act on what matters.</p></div><div className="principles">{principles.map((item,index) => <article key={item.title}><span className="principle-number">0{index+1}</span><h3>{item.title}</h3><p>{item.copy}</p></article>)}</div></section>;
}
