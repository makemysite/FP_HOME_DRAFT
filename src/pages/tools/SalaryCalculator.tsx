
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const SalaryCalculator = () => {
  return (
    <ClientPageWrapper
      title="Salary to Hourly Calculator"
      description="Convert annual salary to hourly pay rate"
    >
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Salary to Hourly Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              Coming soon! This calculator will help you convert salary to hourly rates.
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default SalaryCalculator;
