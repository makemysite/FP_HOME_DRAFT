
import React from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/landing/Navbar";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import BlogHighlights from "@/components/landing/BlogHighlights";
import Footer from "@/components/features/Footer";

// Import our optimized HeroSection
import HeroSection from "@/app/hero-section/page";

// Dynamically import components that are not needed for initial render
const Testimonials = dynamic(() => import("@/components/landing/Testimonials"), {
  ssr: true,
  loading: () => <div className="min-h-[300px] bg-gray-50" />
});

const Index = () => {
  return (
    <div className="bg-white shadow-[0px_6px_44px_rgba(45,33,122,0.1)] flex flex-col overflow-hidden items-center pt-[19px]">
      <header className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
        <Navbar />
      </header>

      <main className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
        <HeroSection />
        <Features />
        <Pricing />
        <BlogHighlights />
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
