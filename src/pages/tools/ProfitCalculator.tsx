
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";
import ProfitCalculatorForm from "@/components/tools/profit-calculator/ProfitCalculatorForm";
import InstructionsSection from "@/components/tools/profit-calculator/InstructionsSection";

const ProfitCalculator = () => {
  return (
    <ClientPageWrapper
      title="Profit Margin Calculator"
      description="Calculate your profit margins instantly"
    >
      <div className="max-w-4xl mx-auto space-y-8">
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
