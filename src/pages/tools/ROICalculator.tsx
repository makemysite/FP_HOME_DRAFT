import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";
import ROICalculatorForm from "@/components/tools/roi-calculator/ROICalculatorForm";
import ROIResultsDisplay from "@/components/tools/roi-calculator/ROIResultsDisplay";
import { calculateROI, ROIResults } from "@/utils/roiCalculations";
import { UsageInstructions } from "@/components/tools/roi-calculator/UsageInstructions";
import { DescriptionSection } from "@/components/tools/roi-calculator/DescriptionSection";
import { GrowthRatesSection } from "@/components/tools/roi-calculator/GrowthRatesSection";
import { Button } from "@/components/ui/button";

const ROICalculator = () => {
  const [results, setResults] = useState<ROIResults | null>(null);

  const handleCalculate = (
    previousSales: number,
    currentSales: number,
    investmentYears: number
  ) => {
    const roiResults = calculateROI(previousSales, currentSales, investmentYears);
    setResults(roiResults);
  };

  return (
    <ClientPageWrapper
      title="ROI Calculator"
      description="Fast, Free, and Accurate ROI Calculations"
      descriptionClassName="text-[#E98A23]"
      metaTitle="Free ROI Calculator for Field Service Businesses"
      metaDescription="Calculate your ROI instantly. Know what you earn from every investment. Try our free ROI calculator today."
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>ROI Calculator Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E98A23] mb-4">ROI Calculator</h2>
              <p className="text-lg text-gray-700 mb-4">
                Simplify your business decision-making process with our easy-to-use ROI Calculator. Calculate your return on investment in seconds, improving both your financial planning and business growth strategy.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>ROI Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <ROICalculatorForm onCalculate={handleCalculate} />
            {results && <ROIResultsDisplay results={results} />}
          </CardContent>
        </Card>

        <DescriptionSection />
        <UsageInstructions />
        <GrowthRatesSection />

        <Card className="bg-gradient-to-r from-[#E98A23]/10 to-[#F9B348]/10 border-2 border-[#E98A23]/20 my-8">
          <CardHeader className="border-b border-[#E98A23]/20">
            <CardTitle className="text-[#E98A23]">Upgrade Your Business Planning</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Field Promax can revolutionize your business management. Get precise ROI calculations and streamline your operations.
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

export default ROICalculator;
