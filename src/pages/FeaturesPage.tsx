
import React from "react";
import Navbar from "@/components/pricing/Navbar";
import HeroSection from "@/components/features/HeroSection";
import FeatureGrid from "@/components/features/FeatureGrid";
import CTASection from "@/components/features/CTASection";
import Footer from "@/components/features/Footer";

const FeaturesPage: React.FC = () => {
  return (
    <div className="bg-white flex flex-col overflow-hidden">
      <div className="pt-[19px] pb-0 px-4 md:px-[76px] rounded-[50px] max-md:rounded-[25px]">
        <Navbar />
        <HeroSection />
        <FeatureGrid />
        <CTASection />
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
};

export default FeaturesPage;
