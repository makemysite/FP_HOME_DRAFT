
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
      metaTitle="Free Break Even Point Calculator for Service Businesses"
      metaDescription="Find out how many jobs you need to break even. Use this free Break Even Point Calculator and grow your business faster"
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Break-Even Calculator Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E98A23] mb-4">Break-Even Calculator</h2>
              <p className="text-lg text-gray-700 mb-4">
                Use our break-even calculator to find out exactly how many units you need to sell to cover your costs and start making a profit.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Understanding your break-even point is crucial for business growth. Our calculator helps you identify the precise number of jobs or sales needed to offset your expenses and generate meaningful revenue.
              </p>
              <p className="text-lg text-gray-700">
                Say goodbye to financial uncertainty and hello to strategic planning! Whether you're a small business owner or an entrepreneur, our free break-even calculator provides the insights you need to make informed decisions and drive your business forward.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Break-Even Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
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

