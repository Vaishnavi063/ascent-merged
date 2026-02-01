import { useUpdateDocumentTitle } from "@/hooks";

import Hero from "./components/hero";
import Features from "./components/features";
import LandingImg from "./components/landing-img";
import PricingPage from "../pricing";
import FAQSection from "./components/faq";

const HomePage = () => {
  useUpdateDocumentTitle({
    title: "Ascent - Simplifying Project Management",
  });

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/50">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10">
        <Hero />
        <LandingImg />
        <Features />
        <PricingPage />
        <FAQSection />
      </div>
    </div>
  );
};

export default HomePage;
