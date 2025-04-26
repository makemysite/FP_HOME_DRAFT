
import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react";
import DiscountCalculatorForm from "@/components/tools/discount-calculator/DiscountCalculatorForm";
import DiscountResultsDisplay from "@/components/tools/discount-calculator/DiscountResultsDisplay";
import DetailedDescription from "@/components/tools/discount-calculator/DetailedDescription";
import { Button } from "@/components/ui/button";
import { DiscountCalculationResults } from "@/types/calculatorTypes";

const DiscountCalculator = () => {
  const [results, setResults] = useState<DiscountCalculationResults | null>(null);

  const handleCalculate = (calculationResults: DiscountCalculationResults) => {
    setResults(calculationResults);
  };

  return (
    <ClientPageWrapper
      metaTitle="Free Discount Calculator for Service Businesses"
      metaDescription="Plan the right deal and protect profits. Use our free Discount Calculator to set smart prices and close more jobs."
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <Percent className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Discount Calculator Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E98A23] mb-4">Discount Calculator</h2>
              <p className="text-lg text-gray-700 mb-4">
                Calculate discounts and final prices for your services instantly. Our calculator helps you make informed decisions about pricing and ensure your discounts remain profitable.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <Percent className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Discount Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <DiscountCalculatorForm onCalculate={handleCalculate} />
            {results && <DiscountResultsDisplay results={results} />}
          </CardContent>
        </Card>

        <DetailedDescription />

        <Card className="bg-gradient-to-r from-[#E98A23]/10 to-[#F9B348]/10 border-2 border-[#E98A23]/20 my-8">
          <CardHeader className="border-b border-[#E98A23]/20">
            <CardTitle className="text-[#E98A23]">Get Smarter Pricing with Field Promax</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Our software helps you optimize your pricing strategy, track discounts, 
              manage job profitability, and get paid faster with easier invoicing. 
              Take control of your business finances and maximize your profits.
            </p>
            <Button className="w-full md:w-auto bg-[#E98A23] hover:bg-[#E98A23]/90">
              Book Your Free Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default DiscountCalculator;
