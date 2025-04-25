
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";
import ProfitCalculatorForm from "@/components/tools/profit-calculator/ProfitCalculatorForm";
import InstructionsSection from "@/components/tools/profit-calculator/InstructionsSection";

const ProfitCalculator = () => {
  return (
    <ClientPageWrapper>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Instantly Calculate Your Profit Margins
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Make sure every project brings in profit. Our free Profit Margin Calculator gives you accurate numbers in seconds, making it easy to keep track of your profits and optimize your business strategy.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Profit Margin Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ProfitCalculatorForm />
          </CardContent>
        </Card>

        <InstructionsSection />
      </div>
    </ClientPageWrapper>
  );
};

export default ProfitCalculator;
