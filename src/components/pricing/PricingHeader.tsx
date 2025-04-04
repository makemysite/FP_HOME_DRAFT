
import React from "react";
import PricingToggle from "./PricingToggle";

const PricingHeader: React.FC = () => {
  return (
    <div className="flex w-full max-w-[1241px] flex-col items-stretch justify-center mt-[71px] max-md:max-w-full max-md:mt-10">
      <div className="flex w-full flex-col items-center font-bold max-md:max-w-full">
        <div className="flex w-[620px] max-w-full flex-col items-stretch px-2.5 rounded-[0px_0px_0px_0px]">
          <div className="text-[rgba(233,138,35,1)] text-lg leading-none tracking-[1.8px] uppercase self-center">
            Pricing
          </div>
          <h1 className="text-[#170F49] text-center text-[50px] leading-none max-md:max-w-full max-md:text-[40px]">
            Compare Our Pricing Plans
          </h1>
        </div>
      </div>
      <PricingToggle />
    </div>
  );
};

export default PricingHeader;
