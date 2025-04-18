
import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/features/HeroSection";
import FeatureGrid from "@/components/features/FeatureGrid";
import CTASection from "@/components/features/CTASection";
import Footer from "@/components/features/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features | Field Promax - Field Service Management Software",
  description: "Explore the powerful features of Field Promax that help streamline your field service operations, manage teams, and boost productivity.",
  keywords: "field service features, service management features, field operations tools, service business software features",
  openGraph: {
    title: "Features | Field Promax - Field Service Management Software",
    description: "Explore the powerful features of Field Promax that help streamline your field service operations, manage teams, and boost productivity.",
    type: "website",
  },
};

export default function FeaturesPage() {
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
}
