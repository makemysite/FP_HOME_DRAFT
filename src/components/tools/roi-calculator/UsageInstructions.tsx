
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, RotateCcw, Check, TrendingUp } from "lucide-react";

export const UsageInstructions = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Quick Definitions (No Boring Jargon):</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#E98A23]" />
            <span><strong>Total Gain on Investment:</strong> Your total profit after subtracting your investment.</span>
          </li>
          <li className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#E98A23]" />
            <span><strong>ROI:</strong> What you earned back, as a percentage of what you spent.</span>
          </li>
          <li className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#E98A23]" />
            <span><strong>Simple Annual ROI:</strong> Your yearly return, not accounting for compounding.</span>
          </li>
          <li className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#E98A23]" />
            <span><strong>CAGR:</strong> The average annual growth over time, with compounding considered.</span>
          </li>
        </ul>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">How to Use the ROI Calculator</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-[#E98A23] mt-1" />
              <p>Plug in your previous and current sales numbers.</p>
            </div>
            <div className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#E98A23] mt-1" />
              <p>Click "Calculate."</p>
            </div>
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-[#E98A23] mt-1" />
              <p>Get your results instantly.</p>
            </div>
            <div className="flex items-start gap-3">
              <RotateCcw className="w-5 h-5 text-[#E98A23] mt-1" />
              <p>Want to test other numbers? Hit "Reset."</p>
            </div>
          </div>
          <p className="mt-4">The ROI calculator runs the math for you - so you can make smarter financial decisions without wasting time.</p>
        </CardContent>
      </Card>
    </div>
  );
};
