
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
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Calculate Your Business Growth Rate
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track and measure your business's progress with our Growth Rate Calculator. Get instant insights into your company's growth trajectory and make data-driven decisions.
          </p>
        </div>

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

        <div className="space-y-8">
          <DescriptionSection />
          <UsageInstructions />
        </div>

        <div className="bg-gradient-to-r from-[#E98A23] to-[#F9B348] p-8 rounded-lg text-white shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Try Field Promax Free for 14 Days</h2>
            <p className="text-lg mb-6 opacity-90">
              Experience the full power of our field service management platform. 
              No credit card required. Cancel anytime.
            </p>
            <a 
              href="/booking" 
              className="inline-block bg-white text-[#E98A23] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
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
