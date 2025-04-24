
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const LoadCalculator = () => {
  return (
    <ClientPageWrapper
      title="HVAC Load Calculator"
      description="Calculate heating and cooling loads for your HVAC system"
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>HVAC Load Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              Coming soon! This calculator will help you determine heating and cooling loads.
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default LoadCalculator;
