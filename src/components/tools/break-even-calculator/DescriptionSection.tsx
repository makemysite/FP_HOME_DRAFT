
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calculator, TrendingUp, DollarSign } from "lucide-react";

export const DescriptionSection = () => {
  return (
    <div className="space-y-6 mt-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">What is Break-Even Analysis?</h2>
        <p className="text-gray-600">
          Break-even analysis helps you determine the point at which your total revenue equals your total costs - in other words, where you start making a profit.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <p>Calculate your break-even point in units</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-6 h-6 text-[#E98A23]" />
              <p>Know your contribution margin per unit</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <DollarSign className="w-6 h-6 text-[#E98A23]" />
              <p>Project potential profits based on sales</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
