
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
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Terms Explained</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <p className="font-medium">Previous Period Sales:</p>
              <p className="text-gray-700">The total revenue earned during the last accounting period. This helps you establish a baseline for comparing growth.</p>
            </div>
            <div>
              <p className="font-medium">Current Period Sales:</p>
              <p className="text-gray-700">Revenue generated in the current time period. This is the number you're forecasting growth from.</p>
            </div>
            <div>
              <p className="font-medium">Total Sales Growth:</p>
              <p className="text-gray-700">The numerical change in sales between the previous and current period, showing whether your business is growing or contracting.</p>
            </div>
            <div>
              <p className="font-medium">Sales Growth Rate:</p>
              <p className="text-gray-700">A percentage that reveals the rate of change in your sales over a specific period, showing how your business is performing.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Use a Sales Growth Calculator?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">
            Imagine having a tool that gives you a clear picture of your business's growth in just seconds. Our Sales Growth Calculator is like a compass for your business - helping you navigate toward smarter decisions. By entering your sales data, you'll instantly see how your business is performing and identify areas that need improvement.
          </p>
          <p className="text-gray-700">
            Whether you want to track your current success or set future growth targets, 
            this calculator provides you with the insights needed to take your business 
            to the next level.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DescriptionSection;
