
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Pricing from "@/components/landing/Pricing";
import BlogHighlights from "@/components/landing/BlogHighlights";
import Testimonials from "@/components/landing/Testimonials";
import Footer from "@/components/features/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Field Promax - Field Service Management Software",
  description: "Comprehensive field service management software for service businesses. Streamline operations, manage teams, and grow your business.",
  keywords: "field service management, FSM software, service business software, field operations",
  openGraph: {
    title: "Field Promax - Field Service Management Software",
    description: "Comprehensive field service management software for service businesses. Streamline operations, manage teams, and grow your business.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <div className="bg-white shadow-[0px_6px_44px_rgba(45,33,122,0.1)] flex flex-col overflow-hidden items-center pt-[19px]">
      <header className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
        <Navbar />
      </header>

      <main className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
        <Hero />
        <Features />
        <Pricing />
        <BlogHighlights />
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
}
