import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import DescriptionSection from "@/components/tools/growth-calculator/DescriptionSection";
import GrowthCalculatorForm from "@/components/tools/growth-calculator/GrowthCalculatorForm";
import ResultsDisplay from "@/components/tools/growth-calculator/ResultsDisplay";
import UsageInstructions from "@/components/tools/growth-calculator/UsageInstructions";
import { Button } from "@/components/ui/button";

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
    <ClientPageWrapper
      metaTitle="Sales Growth Calculator for Field Service Businesses | Field Promax"
      metaDescription="Forecast revenue & set growth targets with Field Promax's easy-to-use Sales Growth Calculator."
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Growth Calculator Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E98A23] mb-4">Sales Growth Calculator</h2>
              <p className="text-lg text-gray-700 mb-4">
                Calculate and analyze your business sales performance with precision. Our calculator helps you track growth, set targets, and make data-driven decisions for your business.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Sales Growth Calculator</CardTitle>
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

        <Card className="bg-gradient-to-r from-[#E98A23]/10 to-[#F9B348]/10 border-2 border-[#E98A23]/20">
          <CardHeader className="border-b border-[#E98A23]/20">
            <CardTitle className="text-[#E98A23]">Scale Your Business with Field Promax</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Transform your growth strategies with our comprehensive field service management platform.
              Unlock insights, optimize operations, and drive success.
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

export default GrowthCalculator;
