
import React from "react";
import { ClientOnly } from "@/lib/client-utils";
import PricingPageClient from "@/components/pricing/PricingPageClient";

export default function ServerPricingLayout({ 
  navbarComponent 
}: { 
  navbarComponent: React.ReactNode 
}) {
  return (
    <div className="bg-white shadow-[0px_6px_44px_rgba(45,33,122,0.1)] flex flex-col overflow-hidden items-center pt-[19px] pb-[49px]">
      <header className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
        {navbarComponent}
      </header>

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
        <PricingPageClient navbarComponent={navbarComponent} />
      </ClientOnly>
    </div>
  );
}
