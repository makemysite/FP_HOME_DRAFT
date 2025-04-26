
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DiscountResultsDisplayProps {
  results: {
    priceAfterDiscount: number;
    discountPercentage: number;
    originalPrice: number;
    discountAmount: number;
  };
}

const DiscountResultsDisplay = ({ results }: DiscountResultsDisplayProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600">Original Price</div>
            <div className="text-2xl font-bold text-[#E98A23]">
              ${results.originalPrice.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600">You Save</div>
            <div className="text-2xl font-bold text-green-600">
              ${results.discountAmount.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600">Final Price</div>
            <div className="text-2xl font-bold text-[#E98A23]">
              ${results.priceAfterDiscount.toFixed(2)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-gray-600">Discount Percentage</div>
            <div className="text-2xl font-bold text-[#E98A23]">
              {results.discountPercentage.toFixed(1)}%
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DiscountResultsDisplay;
