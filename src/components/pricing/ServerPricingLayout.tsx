
import React from "react";
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

      <PricingPageClient navbarComponent={navbarComponent} />
    </div>
  );
}
