
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const DiscountCalculator = () => {
  return (
    <ClientPageWrapper
      title="Discount Calculator"
      description="Calculate discounts and final prices for your services"
      descriptionClassName="text-[#E98A23]"
      metaTitle="Free Discount Calculator for Field Service Businesses | Field Promax"
      metaDescription="Calculate service discounts and final prices with our free calculator."
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Discount Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <p>Discount Calculator coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default DiscountCalculator;
