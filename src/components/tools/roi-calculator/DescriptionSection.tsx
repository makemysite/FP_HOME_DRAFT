
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, Clock } from "lucide-react";

export const DescriptionSection = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Want to Know If Your Business Investments Are Paying Off?</h1>
        <p className="text-xl text-gray-600">Use this Free ROI Calculator to find out in seconds.</p>
        <p className="text-gray-600">Running a service business? You invest in tools, tech, and people every day. But how do you know if it's working?</p>
        <p className="text-gray-600">That's where our free ROI calculator comes in. It's built to help you:</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <p>Know your profit vs cost instantly</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-[#E98A23]" />
              <p>Track how much return you're really getting</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-[#E98A23]" />
              <p>Make faster decisions about where to spend next</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <p className="text-gray-600">No spreadsheets. No guesswork. Just type in your numbers and get results you can actually use.</p>

      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <h2 className="text-xl font-semibold">Know Your Tool</h2>
        <p>This ROI calculator is like a quick reality check for your business.</p>
        <p>You enter your past and current sales numbers, and it shows you what your return looks like. Simple, fast, and clear. No complex math - just useful insights.</p>
        <p>Think of it like this: You're already working hard. The ROI calculator tells you whether the money you've spent is paying off.</p>
        <p>Higher ROI? Great - double down. Low ROI? Time to adjust.</p>
      </div>
    </div>
  );
};
