
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { BreakEvenResults } from "@/utils/breakEvenCalculations";

interface BreakEvenResultsDisplayProps {
  results: BreakEvenResults;
}

const BreakEvenResultsDisplay = ({ results }: BreakEvenResultsDisplayProps) => {
  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-lg font-semibold">Results</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Break-Even Point (Units)</p>
            <p className="text-2xl font-bold text-[#E98A23]">
              {results.breakEvenUnits.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Contribution Margin per Unit</p>
            <p className="text-2xl font-bold text-[#E98A23]">
              ${results.contributionMarginPerUnit.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        {results.profit !== undefined && (
          <>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-[#E98A23]">
                  ${results.totalRevenue?.toFixed(2)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">Profit/Loss</p>
                <p className={`text-2xl font-bold ${results.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ${results.profit.toFixed(2)}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default BreakEvenResultsDisplay;
