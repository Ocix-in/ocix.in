import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { Tools } from "./components/Tools";
import { HowItWorks } from "./components/HowItWorks";
import { TrustClarity } from "./components/TrustClarity";
import { LeadCapture } from "./components/LeadCapture";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F7F3EA] text-[#111111]">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.35] [background-image:linear-gradient(rgba(17,17,17,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(17,17,17,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
      <div className="relative z-10">
        <main>
          <Hero />
          <Products />
          <Tools />
          <HowItWorks />
          <TrustClarity />
          <LeadCapture />
        </main>
        <Footer />
      </div>
      <Analytics />
    </div>
  );
}
