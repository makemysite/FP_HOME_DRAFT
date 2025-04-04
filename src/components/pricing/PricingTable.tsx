
import React from "react";
import { usePricing } from "./PricingContext";
import { Check } from "lucide-react";

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for small teams",
    monthlyPrice: 29,
    annualPrice: 290,
    features: ["Up to 5 users", "1GB storage", "Basic reporting"],
    buttonText: "Get Started"
  },
  {
    name: "Professional",
    description: "For growing businesses",
    monthlyPrice: 79,
    annualPrice: 790,
    features: ["Up to 20 users", "10GB storage", "Advanced reporting", "Priority support"],
    isPopular: true,
    buttonText: "Get Started"
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    monthlyPrice: 199,
    annualPrice: 1990,
    features: ["Unlimited users", "100GB storage", "Custom reporting", "Dedicated support"],
    buttonText: "Contact Sales"
  }
];

const PricingTable: React.FC = () => {
  const { billingPeriod } = usePricing();

  return (
    <div className="w-full max-w-[1200px] mt-16 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <div 
            key={plan.name}
            className={`p-8 rounded-xl shadow-md ${
              plan.isPopular 
                ? "bg-[rgba(233,138,35,0.03)] border-2 border-[rgba(233,138,35,1)] relative" 
                : "bg-white border border-gray-100"
            }`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[rgba(233,138,35,1)] text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold mb-1">
              ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
              <span className="text-lg font-normal text-gray-500">/{billingPeriod === 'monthly' ? 'mo' : 'year'}</span>
            </div>
            <p className="text-gray-500 mb-6">{plan.description}</p>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="h-5 w-5 text-[rgba(233,138,35,1)] mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <button 
              className={`w-full ${
                plan.isPopular
                  ? "bg-[rgba(233,138,35,1)] text-white" 
                  : "bg-[rgba(245,246,251,1)] border border-[rgba(233,138,35,1)] border-solid"
              } px-4 py-2 rounded-[56px] hover:bg-[rgba(233,138,35,0.9)] transition-colors`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
