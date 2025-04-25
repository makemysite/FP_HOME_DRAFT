
import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import DescriptionSection from "@/components/tools/growth-calculator/DescriptionSection";
import GrowthCalculatorForm from "@/components/tools/growth-calculator/GrowthCalculatorForm";
import ResultsDisplay from "@/components/tools/growth-calculator/ResultsDisplay";
import UsageInstructions from "@/components/tools/growth-calculator/UsageInstructions";

const GrowthCalculator = () => {
  const [results, setResults] = useState<{
    currentSales: number;
    previousSales: number;
    salesGrowth: number;
    growthRate: number;
  } | null>(null);

  const handleCalculate = (
    currentSales: number, 
    previousSales: number
  ) => {
    const salesGrowth = currentSales - previousSales;
    const growthRate = previousSales > 0 ? ((currentSales - previousSales) / previousSales) * 100 : 0;
    
    setResults({
      currentSales,
      previousSales,
      salesGrowth,
      growthRate
    });
  };

  return (
    <ClientPageWrapper>
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Business Growth Projection Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Forecast your business's potential growth with our intuitive projection calculator. Plan strategically and visualize your future success.
          </p>
        </div>

        <Card className="shadow-md border-t-4 border-t-[#9b87f5]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-[#9b87f5]" />
              <CardTitle>Business Growth Projector</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <GrowthCalculatorForm onCalculate={handleCalculate} />
            {results && <ResultsDisplay results={results} />}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <DescriptionSection />
          <UsageInstructions />
        </div>

        <div className="bg-gradient-to-r from-[#9b87f5] to-[#d1c4ff] p-8 rounded-lg text-white shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Scale Your Business with Field Promax</h2>
            <p className="text-lg mb-6 opacity-90">
              Transform your growth strategies with our comprehensive field service management platform.
              Unlock insights, optimize operations, and drive success.
            </p>
            <a 
              href="/booking" 
              className="inline-block bg-white text-[#9b87f5] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Book Your Free Demo
            </a>
          </div>
        </div>
      </div>
    </ClientPageWrapper>
  );
};

export default GrowthCalculator;
