
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
          Track Your Business Success in Just a Few Clicks. At Field Promax, we've designed 
          an easy-to-use, fast, and precise Sales Growth Calculator to help you stay on top 
          of your business's performance. Predict future revenue, set realistic growth targets, 
          and fine-tune your sales strategies to hit your business goals faster.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Make Data-Driven Decisions</CardTitle>
        </CardHeader>
        <CardContent>
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
