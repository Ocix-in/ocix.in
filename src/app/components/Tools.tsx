import { ArrowUpRight, ScanSearch, Flame } from "lucide-react";
const tools = [
  { title: "GitHub Consistency Audit", copy: "See the active days, quiet gaps, and repository focus behind your last 30 days of public activity.", href: "https://vigilante.ocix.in/audit", action: "Run free audit", icon: ScanSearch },
  { title: "GitHub Profile Roast", copy: "Your contribution graph has a story. Get a sharp, stats-backed take on the habits it reveals.", href: "https://vigilante.ocix.in/roast", action: "Roast my profile", icon: Flame },
];
export function Tools() {
  return <section id="tools" className="tools-section" aria-labelledby="tools-title"><div className="wrap section"><div className="section-heading"><div><p className="eyebrow">02 / Free tools</p><h2 id="tools-title">A little clarity.<br/>Zero commitment.</h2></div><p>Small, useful tools from Vigilante.<br/>Public GitHub data. No account needed.</p></div><div className="tools-grid">{tools.map(tool => <a className="tool-card" href={tool.href} key={tool.title}><tool.icon className="tool-icon" size={28} aria-hidden="true"/><h3>{tool.title}</h3><p>{tool.copy}</p><span className="tool-action">{tool.action}<ArrowUpRight size={21} aria-hidden="true"/></span></a>)}</div></div></section>;
}
