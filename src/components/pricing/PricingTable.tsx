
import React from "react";
import { usePricing } from "./PricingContext";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

type FeatureType = "text" | "check" | "empty";

interface Feature {
  type: FeatureType;
  content?: string;
}

const PricingTable: React.FC = () => {
  const features = [
    { title: "Scheduling & Dispatching", isCategory: true },
    { title: "Number of Users" },
    { title: "Scheduling" },
    { title: "Job Details and Attachments" },
    { title: "GPS Tracking" },
    { title: "Recurrent Orders" },
    { title: "Custom Job Lists" },
    { title: "Time Tracking" },
    { title: "Days off Planner" },
    { title: "Map/Calendar View" },
    { title: "Daily Dispatch" },
    { title: "Team Management" },
    { title: "Address from Lat/Lng" },
    
    { title: "Customer Management", isCategory: true },
    { title: "Customer Manager" },
    { title: "Customer Hub" },
    { title: "Online Service Booking" },
    { title: "Default Document Attachments" },
    
    { title: "Estimating", isCategory: true },
    { title: "Estimates" },
    { title: "Markups" },
    { title: "Optional Items" },
    { title: "Online Approvals" },
    { title: "QuickBooks Online Estimate Sync" },
    
    { title: "Invoicing and Payments", isCategory: true },
    { title: "Invoicing" },
    { title: "Record Payments" },
    { title: "QuickBooks Go-Payment Intg fr/Mobile" },
    { title: "Predefined Products in Invoice" },
    { title: "Custom Pricing" },
    
    { title: "Setup and Integrations", isCategory: true },
    { title: "QuickBooks Online Integration" },
    { title: "QuickBooks Desktop Integration" },
    { title: "Google Calendar Integration" },
    { title: "Paylocity Integration" },
    
    { title: "Additional Features", isCategory: true },
    { title: "Field Promax Mobile App" },
    { title: "Email Support" },
    { title: "1-0n-1 Product Support" },
    { title: "Reporting" },
    { title: "Text Message Notifications" },
    { title: "Custom Fields" },
    { title: "Expense Tracking" },
    { title: "Export Timecards to QuickBooks Online" },
    { title: "Equipment Tracking" },
    { title: "Multi Location" },
    { title: "Job Costing" },
  ];

  const basicPlanFeatures: Feature[] = [
    { type: "empty" }, // Category: Scheduling & Dispatching
    { type: "text", content: "3 users" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    
    { type: "empty" }, // Category: Customer Management
    { type: "check" },
    { type: "check" },
    { type: "empty" },
    { type: "empty" },
    
    { type: "empty" }, // Category: Estimating
    { type: "check" },
    { type: "check" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    
    { type: "empty" }, // Category: Invoicing and Payments
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "empty" },
    { type: "empty" },
    
    { type: "empty" }, // Category: Setup and Integrations
    { type: "check" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    
    { type: "empty" }, // Category: Additional Features
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
  ];

  const proPlanFeatures: Feature[] = [
    { type: "empty" }, // Category: Scheduling & Dispatching
    { type: "text", content: "5 users" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    
    { type: "empty" }, // Category: Customer Management
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "empty" },
    
    { type: "empty" }, // Category: Estimating
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "empty" },
    { type: "empty" },
    
    { type: "empty" }, // Category: Invoicing and Payments
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "empty" },
    { type: "empty" },
    
    { type: "empty" }, // Category: Setup and Integrations
    { type: "check" },
    { type: "check" },
    { type: "empty" },
    { type: "empty" },
    
    { type: "empty" }, // Category: Additional Features
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
    { type: "empty" },
  ];

  const enterprisePlanFeatures: Feature[] = [
    { type: "empty" }, // Category: Scheduling & Dispatching
    { type: "text", content: "12 users" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    
    { type: "empty" }, // Category: Customer Management
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    
    { type: "empty" }, // Category: Estimating
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    
    { type: "empty" }, // Category: Invoicing and Payments
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    
    { type: "empty" }, // Category: Setup and Integrations
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    
    { type: "empty" }, // Category: Additional Features
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
    { type: "check" },
  ];

  return (
    <div className="bg-white border flex w-full max-w-[1240px] overflow-hidden mt-[29px] rounded-[3px] border-[#E6E9F5] border-solid">
      <div className="grid grid-cols-4 w-full">
        <div className="flex min-h-[158px] w-full flex-col justify-center p-7 border-b border-r border-[#E6E9F5]">
          <div className="flex items-center gap-3.5 text-[#252430]">
            <div className="text-[21px] font-bold">
              Compare plans
            </div>
            <div className="text-sm font-medium px-4 py-2 rounded-[17px] border border-[#858BA0]">
              40% Off
            </div>
          </div>
          <div className="text-[#858BA0] text-xs font-medium leading-[17px] mt-2.5">
            Choose your workspace plan according to your organisational plan
          </div>
        </div>
        
        <div className="flex min-h-[158px] w-full flex-col items-center justify-center p-6 border-b border-r border-[#E6E9F5]">
          <PricingPlanHeader price="$99" annualPrice="$79" />
        </div>
        
        <div className="flex min-h-[158px] w-full flex-col items-center justify-center p-6 border-b border-r border-[#E6E9F5]">
          <PricingPlanHeader price="$149" annualPrice="$99" />
        </div>
        
        <div className="flex min-h-[158px] w-full flex-col items-center justify-center p-6 border-b border-[#E6E9F5]">
          <PricingPlanHeader price="$199" annualPrice="$169" />
        </div>
        
        {features.map((feature, index) => (
          <React.Fragment key={index}>
            {feature.isCategory ? (
              // This is a category row, span all columns with the category title
              <>
                <div 
                  className="bg-[#ABABAB]/20 text-black font-semibold w-full col-span-4 flex items-center p-5 border-b border-[#E6E9F5]"
                >
                  <div className="text-base font-medium pl-2">
                    {feature.title}
                  </div>
                </div>
              </>
            ) : (
              // Regular feature row
              <>
                <div className="w-full flex items-center justify-start px-7 py-5 border-b border-r border-[#E6E9F5] h-[53px] bg-white text-[#252430]">
                  <div className="text-base font-medium">
                    {feature.title}
                  </div>
                </div>
                
                <PricingPlanCell 
                  feature={basicPlanFeatures[index] || { type: "empty" }}
                  hasBorderRight={true}
                  isCategory={false}
                />
                
                <PricingPlanCell 
                  feature={proPlanFeatures[index] || { type: "empty" }}
                  hasBorderRight={true}
                  isCategory={false}
                />
                
                <PricingPlanCell 
                  feature={enterprisePlanFeatures[index] || { type: "empty" }}
                  hasBorderRight={false}
                  isCategory={false}
                />
              </>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const PricingPlanHeader: React.FC<{ price: string; annualPrice: string }> = ({ price, annualPrice }) => {
  const { billingPeriod } = usePricing();
  
  const calculateMonthlyPrice = (yearlyPrice: string) => {
    const yearlyPriceNum = parseFloat(yearlyPrice.replace('$', ''));
    return `$${Math.round(yearlyPriceNum / 12)}`;
  };

  const calculateYearlyTotal = (monthlyPrice: string) => {
    const monthlyPriceNum = parseFloat(monthlyPrice.replace('$', ''));
    return monthlyPriceNum * 12;
  };

  const displayPrice = billingPeriod === 'monthly' ? price : annualPrice;
  const yearlyTotal = calculateYearlyTotal(annualPrice);
  const billingFrequency = billingPeriod === 'monthly' 
    ? 'Billed every month' 
    : `or $${yearlyTotal}/year, billed once a year`;

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex items-end gap-1 mb-2">
          <div className="text-black text-[34px] font-bold">{displayPrice}</div>
          <div className="text-xs text-[#858BA0] font-medium mb-1">/month</div>
        </div>
        <div className="text-xs text-[#858BA0] font-medium mb-4">
          {billingFrequency}
        </div>
        <Button 
          className="w-[200px] bg-[#E98A23] text-white font-bold text-xs py-3.5 px-5 rounded-[3px] hover:bg-[#E98A23]/90"
        >
          Choose This Plan
        </Button>
      </div>
    </>
  );
};

const PricingPlanCell: React.FC<{ 
  feature: Feature; 
  hasBorderRight: boolean; 
  isCategory: boolean;
}> = ({ feature, hasBorderRight, isCategory }) => {
  const borderClass = hasBorderRight ? "border-r" : "";
  
  if (!feature) {
    return (
      <div 
        className={`w-full h-[53px] flex items-center justify-center border-b ${borderClass} border-[#E6E9F5] ${
          isCategory ? "bg-[#ABABAB]/20" : "bg-[#ABABAB]/10"
        }`} 
      />
    );
  }
  
  if (feature.type === "text") {
    return (
      <div className={`w-full flex items-center justify-center py-5 border-b ${borderClass} border-[#E6E9F5] h-[53px]`}>
        <span className="text-sm text-black font-medium">
          {feature.content}
        </span>
      </div>
    );
  } else if (feature.type === "check") {
    return (
      <div className={`w-full flex items-center justify-center py-5 border-b ${borderClass} border-[#E6E9F5] h-[53px]`}>
        <Check className="h-5 w-5 text-[#E98A23]" />
      </div>
    );
  } else {
    return (
      <div 
        className={`w-full h-[53px] flex items-center justify-center border-b ${borderClass} border-[#E6E9F5] ${
          isCategory ? "bg-[#ABABAB]/20" : "bg-[#ABABAB]/10"
        }`} 
      />
    );
  }
};

export default PricingTable;
