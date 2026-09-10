import { Plus } from "lucide-react";
export const questions = [
  { question: "What can I use today?", answer: "Vigilante is live, alongside its free GitHub Consistency Audit and Profile Roast. DraftShield and GymX are in development and are not publicly available." },
  { question: "Do I need an account to explore?", answer: "No. The free Audit and Roast use public GitHub data. You can also read Vigilante’s mission briefing before deciding to register." },
  { question: "What does Vigilante access on GitHub?", answer: "Vigilante uses GitHub metadata to verify qualifying pushes in the repositories you select. It does not clone repositories or read source-code contents or diffs. The briefing explains access before registration." },
];
export function TrustClarity() {
  return <section id="trust" className="faq-section wrap" aria-labelledby="faq-title"><div><p className="eyebrow">A few things, upfront</p><h2 id="faq-title">Good questions.<br/>Clear answers.</h2></div><div>{questions.map(item => <details key={item.question}><summary>{item.question}<Plus size={20} aria-hidden="true"/></summary><p>{item.answer}</p></details>)}</div></section>;
}
