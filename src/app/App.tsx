import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { Philosophy } from "./components/Philosophy";
import { HowItWorks } from "./components/HowItWorks";
import { FutureVision } from "./components/FutureVision";
import { LeadCapture } from "./components/LeadCapture";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#E5E7EB] relative">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="relative z-10 block">
        <Hero />
        <Products />
        <Philosophy />
        <HowItWorks />
        <FutureVision />
        <LeadCapture />
        <Footer />
      </div>
      <Analytics />
    </div>
  );
}