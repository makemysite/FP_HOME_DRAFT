
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card } from "@/components/ui/card";
import DescriptionSection from "@/components/tools/growth-calculator/DescriptionSection";
import UsageInstructions from "@/components/tools/growth-calculator/UsageInstructions";
import GrowthCalculatorForm from "@/components/tools/growth-calculator/GrowthCalculatorForm";

const GrowthCalculator = () => {
  return (
    <ClientPageWrapper>
      <div className="max-w-4xl mx-auto space-y-8">
        <DescriptionSection />
        <Card className="p-6">
          <GrowthCalculatorForm />
        </Card>
        <UsageInstructions />
      </div>
    </ClientPageWrapper>
  );
};

export default GrowthCalculator;

