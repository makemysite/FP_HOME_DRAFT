
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const OvertimeCalculator = () => {
  return (
    <ClientPageWrapper
      title="Overtime Calculator"
      description="Calculate overtime pay and hours for your field service team"
      descriptionClassName="text-[#E98A23]"
      metaTitle="Free Overtime Calculator for Field Service Businesses | Field Promax"
      metaDescription="Calculate overtime pay and hours for your field service team with our free calculator."
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Overtime Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p>Overtime Calculator coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default OvertimeCalculator;
