
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Check } from "lucide-react";

export const GrowthRatesSection = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6 space-y-6">
          <h2 className="text-xl font-semibold">What's a Good Sales Growth Rate for Field Service Businesses?</h2>
          <p>It depends - but here's a quick guide:</p>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#E98A23]" />
                <strong>New businesses or startups</strong>
              </div>
              <p>50–100% annual growth is common.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#E98A23]" />
                <strong>Growing service teams</strong>
              </div>
              <p>15–25% is a strong, healthy range.</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#E98A23]" />
                <strong>Larger operations</strong>
              </div>
              <p>Even 5–10% is great if it's steady.</p>
            </div>
          </div>

          <div className="space-y-4">
            <p>Your growth depends on things like:</p>
            <ul className="grid gap-3 md:grid-cols-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E98A23]" />
                Monthly job volume
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E98A23]" />
                Customer repeat rate
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E98A23]" />
                Revenue per job
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E98A23]" />
                And how well you manage time and resources
              </li>
            </ul>
            <p>A tool like Field Promax can help track these KPIs in real time, so you're not flying blind.</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Want Better ROI? Field Promax Helps You Get There</h3>
            <p>A free ROI calculator shows where you stand - but Field Promax helps you move forward.</p>
            <ul className="grid gap-3 md:grid-cols-2">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E98A23]" />
                Get more jobs done per day
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E98A23]" />
                Schedule smarter and avoid delays
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E98A23]" />
                Invoice quicker and improve cash flow
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#E98A23]" />
                Build repeat business through better customer service
              </li>
            </ul>
            <p>All these things raise your ROI - and this calculator is just the start.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
