
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";
import GrowthCalculatorForm from "@/components/tools/growth-calculator/GrowthCalculatorForm";
import DescriptionSection from "@/components/tools/growth-calculator/DescriptionSection";
import UsageInstructions from "@/components/tools/growth-calculator/UsageInstructions";

const GrowthCalculator = () => {
  return (
    <ClientPageWrapper>
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculate Your Business Growth Rate
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our Growth Rate Calculator helps you track and measure your business's progress. Get instant insights into your company's growth trajectory and make data-driven decisions.
          </p>
        </div>

        {/* Main Calculator Card */}
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Growth Rate Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <GrowthCalculatorForm />
          </CardContent>
        </Card>

        {/* Instructions and Additional Information */}
        <div className="space-y-8">
          <DescriptionSection />
          <UsageInstructions />
        </div>
      </div>
    </ClientPageWrapper>
  );
};

export default GrowthCalculator;
