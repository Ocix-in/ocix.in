import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { Philosophy } from "./components/Philosophy";
import { HowItWorks } from "./components/HowItWorks";
import { FutureVision } from "./components/FutureVision";
import { LeadCapture } from "./components/LeadCapture";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0B0F1A] text-[#E5E7EB]">
      <Hero />
      <Products />
      <Philosophy />
      <HowItWorks />
      <FutureVision />
      <LeadCapture />
      <Footer />
    </div>
  );
}