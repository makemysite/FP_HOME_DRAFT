
"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import PricingHeader from "./PricingHeader";
import PricingTable from "./PricingTable";
import { PricingProvider } from "./PricingContext";

const Pricing: React.FC = () => {
  return (
    <PricingProvider>
      <div className="bg-white shadow-[0px_6px_44px_rgba(45,33,122,0.1)] flex flex-col overflow-hidden items-center pt-[19px] pb-[49px]">
        <header className="self-stretch flex w-full flex-col items-center pl-[76px] max-md:max-w-full max-md:pl-5">
          <Navbar />
        </header>

        <main className="self-stretch flex w-full flex-col items-center px-[76px] max-md:max-w-full max-md:px-5">
          <PricingHeader />
          <PricingTable />
        </main>
      </div>
    </PricingProvider>
  );
};

export default Pricing;
