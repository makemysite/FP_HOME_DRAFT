
import React from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";
import ProfitCalculatorForm from "@/components/tools/profit-calculator/ProfitCalculatorForm";
import InstructionsSection from "@/components/tools/profit-calculator/InstructionsSection";

const ProfitCalculator = () => {
  return (
    <ClientPageWrapper
      metaTitle="Free Profit Margin Calculator for Field Service Businesses"
      metaDescription="Instantly calculate your profit margins and optimize your field service business. Try our free profit margin calculator now!"
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Profit Calculator Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E98A23] mb-4">Profit Margin Calculator</h2>
              <p className="text-lg text-gray-700 mb-4">
                Make sure every project brings in profit. Our free Profit Margin Calculator gives you accurate numbers in seconds, making it easy to keep track of your profits and optimize your business strategy.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Profit Margin Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <ProfitCalculatorForm />
          </CardContent>
        </Card>

        <InstructionsSection />
      </div>
    </ClientPageWrapper>
  );
};

export default ProfitCalculator;
