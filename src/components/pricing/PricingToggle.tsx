
import React from "react";
import { Switch } from "@/components/ui/switch";
import { usePricing } from "./PricingContext";

const PricingToggle: React.FC = () => {
  const { billingPeriod, setBillingPeriod } = usePricing();

  const handleToggle = (checked: boolean) => {
    setBillingPeriod(checked ? 'annually' : 'monthly');
  };

  return (
    <div className="self-center flex items-center justify-center gap-6 mt-[34px] pb-4">
      <span 
        className={`text-lg ${billingPeriod === 'monthly' ? 'text-[rgba(233,138,35,1)] font-semibold' : 'text-[#170F49] font-normal'}`}
      >
        Monthly
      </span>
      
      <div className="flex items-center gap-2">
        <Switch 
          checked={billingPeriod === 'annually'} 
          onCheckedChange={handleToggle}
          className="data-[state=checked]:bg-[rgba(233,138,35,1)]"
        />
      </div>
      
      <span 
        className={`text-lg ${billingPeriod === 'annually' ? 'text-[rgba(233,138,35,1)] font-semibold' : 'text-[#170F49] font-normal'}`}
      >
        Annually
      </span>
    </div>
  );
};

export default PricingToggle;
