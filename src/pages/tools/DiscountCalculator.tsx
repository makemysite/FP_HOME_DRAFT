
import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react";
import DiscountCalculatorForm from "@/components/tools/discount-calculator/DiscountCalculatorForm";
import DiscountResultsDisplay from "@/components/tools/discount-calculator/DiscountResultsDisplay";
import DetailedDescription from "@/components/tools/discount-calculator/DetailedDescription";
import CTASection from "@/components/features/CTASection";

interface CalculationResults {
  priceAfterDiscount: number;
  discountPercentage: number;
  originalPrice: number;
  discountAmount: number;
}

const DiscountCalculator = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleCalculate = (calculationResults: CalculationResults) => {
    setResults(calculationResults);
  };

  return (
    <ClientPageWrapper
      title="Discount Calculator"
      description="Calculate discounts and final prices for your services"
      descriptionClassName="text-[#E98A23]"
      metaTitle="Free Discount Calculator for Service Businesses"
      metaDescription="Plan the right deal and protect profits. Use our free Discount Calculator to set smart prices and close more jobs."
    >
      <div className="max-w-3xl mx-auto px-4">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Percent className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Discount Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <DiscountCalculatorForm onCalculate={handleCalculate} />
            {results && <DiscountResultsDisplay results={results} />}
          </CardContent>
        </Card>
        
        <DetailedDescription />
      </div>
      
      <CTASection className="mt-16 mb-12" />
    </ClientPageWrapper>
  );
};

export default DiscountCalculator;
