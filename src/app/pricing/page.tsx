
import React from "react";
import Navbar from "@/components/landing/Navbar";
import { ClientOnly } from "@/lib/client-components";
import PricingPageClient from "@/components/pricing/PricingPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Field Promax - Field Service Management Software",
  description: "Affordable pricing plans for field service businesses of all sizes. Choose the right plan to grow your business with Field Promax.",
  keywords: "field service pricing, service management cost, field operations software pricing, service business plans",
  openGraph: {
    title: "Pricing | Field Promax - Field Service Management Software",
    description: "Affordable pricing plans for field service businesses of all sizes. Choose the right plan to grow your business with Field Promax.",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <ClientOnly fallback={
      <div className="w-full px-[76px] max-md:px-5 space-y-16">
        <div className="text-center space-y-4">
          <div className="h-10 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-8 space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-4">
                {Array(5).fill(0).map((_, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    }>
      <PricingPageClient navbarComponent={<Navbar />} />
    </ClientOnly>
  );
}
