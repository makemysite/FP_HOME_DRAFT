
import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import BreakEvenCalculatorForm from "@/components/tools/break-even-calculator/BreakEvenCalculatorForm";
import BreakEvenResultsDisplay from "@/components/tools/break-even-calculator/BreakEvenResultsDisplay";
import DetailedDescription from "@/components/tools/break-even-calculator/DetailedDescription";
import type { BreakEvenResults } from "@/utils/breakEvenCalculations";

const BreakEvenCalculator = () => {
  const [results, setResults] = useState<BreakEvenResults | null>(null);

  const handleCalculate = (calculationResults: BreakEvenResults) => {
    setResults(calculationResults);
  };

  return (
    <ClientPageWrapper
      title="Break-Even Calculator"
      description="Use this Free Break Even Point Calculator to find out how close you are to profitability."
      descriptionClassName="text-[#E98A23]"
      metaTitle="Free Break-Even Calculator for Field Service Businesses"
      metaDescription="Calculate your ROI instantly. Know what you earn from every investment. Try our free ROI calculator today."
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="prose max-w-none mb-8">
          <p className="text-lg text-gray-700">
            Use our break-even calculator to find out exactly how many units you need to sell to cover your costs and start making a profit.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Break-Even Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <BreakEvenCalculatorForm onCalculate={handleCalculate} />
            {results && <BreakEvenResultsDisplay results={results} />}
          </CardContent>
        </Card>

        <DetailedDescription />

        <Card className="bg-gradient-to-r from-[#E98A23]/10 to-[#F9B348]/10 border-2 border-[#E98A23]/20 my-8">
          <CardHeader className="border-b border-[#E98A23]/20">
            <CardTitle className="text-[#E98A23]">Get Past Break-Even Faster with Field Promax</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Our software helps you cut delays with smart scheduling, get more jobs done daily,
              reduce errors and unnecessary expenses, and get paid faster with easier invoicing.
              All of which pushes your business beyond the break-even line and into profit territory.
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

export default BreakEvenCalculator;
