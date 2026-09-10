import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { Tools } from "./components/Tools";
import { HowItWorks } from "./components/HowItWorks";
import { TrustClarity } from "./components/TrustClarity";
import { LeadCapture } from "./components/LeadCapture";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";
import "../styles/studio.css";

export default function App() {
  return <div className="studio">
    <a href="#main" className="skip-link">Skip to content</a>
    <Hero />
    <main id="main"><Products /><Tools /><HowItWorks /><TrustClarity /><LeadCapture /></main>
    <Footer /><Analytics />
  </div>;
}
