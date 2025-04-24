
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";

const ProfitCalculator = () => {
  return (
    <ClientPageWrapper
      title="Profit Margin Calculator"
      description="Calculate your profit margins instantly"
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Profit Margin Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              Coming soon! This calculator will help you determine your profit margins.
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default ProfitCalculator;
