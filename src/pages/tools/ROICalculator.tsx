
import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";

const ROICalculator = () => {
  return (
    <ClientPageWrapper
      title="ROI Calculator"
      description="Calculate Return on Investment for your business decisions"
      descriptionClassName="text-[#E98A23]"
      metaTitle="Free ROI Calculator for Field Service Businesses | Field Promax"
      metaDescription="Calculate ROI for your field service business investments with our free calculator."
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>ROI Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p>ROI Calculator coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default ROICalculator;
