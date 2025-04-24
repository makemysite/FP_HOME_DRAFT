
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";

const GrowthCalculator = () => {
  return (
    <ClientPageWrapper
      title="Sales Growth Calculator"
      description="Calculate and forecast your sales growth"
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Sales Growth Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              Coming soon! This calculator will help you track and forecast sales growth.
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default GrowthCalculator;
