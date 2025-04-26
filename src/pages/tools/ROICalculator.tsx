
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
      description="Calculate Return on Investment for your business decisions"
      descriptionClassName="text-[#E98A23]"
      metaTitle="Free ROI Calculator for Field Service Businesses | Field Promax"
      metaDescription="Calculate ROI for your field service business investments with our free calculator."
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <DescriptionSection />
        
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>ROI Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-8">
            <ROICalculatorForm onCalculate={handleCalculate} />
            {results && <ROIResultsDisplay results={results} />}
          </CardContent>
        </Card>

        <UsageInstructions />
        <GrowthRatesSection />
      </div>
    </ClientPageWrapper>
  );
};

export default ROICalculator;
