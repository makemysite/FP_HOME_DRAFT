
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";

const DescriptionSection = () => {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <div className="flex items-center gap-3">
          <ChartBar className="w-8 h-8 text-[#E98A23]" />
          <h1 className="text-4xl font-bold">Sales Growth Calculator</h1>
        </div>
        <p className="text-lg text-gray-700 mt-4">
          Track your business growth with precision using our Sales Growth Calculator. 
          This tool helps you measure and analyze your sales performance over time, 
          giving you the insights needed to make informed decisions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Make Data-Driven Decisions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Understanding your sales growth rate is crucial for business success. 
            Whether you're a small business owner or managing a larger operation, 
            our calculator helps you track progress and identify trends that can 
            inform your business strategy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DescriptionSection;
