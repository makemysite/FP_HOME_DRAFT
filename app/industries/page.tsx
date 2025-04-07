
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/features/Footer";
import { ClientOnly } from "@/lib/client-utils";
import IndustriesClientContent from "./IndustriesClientContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries | Field Promax - Field Service Management Software",
  description: "Industry-specific field service management solutions designed for various service sectors. Find the perfect solution for your business needs.",
  keywords: "field service industries, service management solutions, industry-specific software, service business solutions",
  openGraph: {
    title: "Industries | Field Promax - Field Service Management Software",
    description: "Industry-specific field service management solutions designed for various service sectors. Find the perfect solution for your business needs.",
    type: "website",
    images: [
      {
        url: 'https://fieldpromax.com/images/industry-solutions.jpg',
        width: 1200,
        height: 630,
        alt: 'Field Promax Industry Solutions',
      },
    ],
  },
};

export default function IndustriesPage() {
  return (
    <div className="bg-white shadow-[0px_6px_44px_rgba(45,33,122,0.1)] flex flex-col overflow-hidden items-center pt-[19px]">
      <header className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
        <Navbar />
      </header>
      
      <main className="container mx-auto px-4 py-16 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#170F49] mb-4">Industry-Specific Software Solutions</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Discover our specialized software packages designed to streamline operations across various service industries.
          </p>
        </div>
        
        <ClientOnly fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array(12).fill(0).map((_, index) => (
              <div key={`skeleton-${index}`} className="flex-1 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        }>
          <IndustriesClientContent />
        </ClientOnly>
      </main>
      
      <Footer />
    </div>
  );
}
