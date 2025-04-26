
import React from "react";
import { ROIResults } from "@/utils/roiCalculations";
import { TrendingUp } from "lucide-react";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + "%";
};

interface ROIResultsDisplayProps {
  results: ROIResults;
}

const ROIResultsDisplay = ({ results }: ROIResultsDisplayProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">ROI Analysis Results</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-600">Total Gain on Investment</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-[#E98A23] w-5 h-5" />
            <p className="text-lg font-semibold">{formatCurrency(results.totalGain)}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600">Return on Investment (ROI)</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-[#E98A23] w-5 h-5" />
            <p className="text-lg font-semibold">{formatPercentage(results.roi)}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600">Simple Annual ROI</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-[#E98A23] w-5 h-5" />
            <p className="text-lg font-semibold">{formatPercentage(results.simpleAnnualRoi)}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600">Compound Annual Growth Rate (CAGR)</p>
          <div className="flex items-center gap-2">
            <TrendingUp className="text-[#E98A23] w-5 h-5" />
            <p className="text-lg font-semibold">{formatPercentage(results.cagr)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ROIResultsDisplay;
