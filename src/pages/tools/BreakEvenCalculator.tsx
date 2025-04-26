
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

const BreakEvenCalculator = () => {
  return (
    <ClientPageWrapper
      title="Break-Even Calculator"
      description="Find out when your business will become profitable"
      descriptionClassName="text-[#E98A23]"
      metaTitle="Free Break-Even Calculator for Field Service Businesses | Field Promax"
      metaDescription="Calculate your break-even point and plan your business growth with our free calculator."
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Break-Even Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p>Break-Even Calculator coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default BreakEvenCalculator;
