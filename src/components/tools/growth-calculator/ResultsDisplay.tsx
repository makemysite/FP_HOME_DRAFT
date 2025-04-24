
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

type ResultsDisplayProps = {
  results: {
    currentSales: number;
    previousSales: number;
    salesGrowth: number;
    growthRate: number;
  };
};

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

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  const isPositiveGrowth = results.salesGrowth >= 0;

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Growth Analysis Results</h3>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-600">Current Period Sales</p>
          <p className="text-lg font-semibold">{formatCurrency(results.currentSales)}</p>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">Previous Period Sales</p>
          <p className="text-lg font-semibold">{formatCurrency(results.previousSales)}</p>
        </div>

        <div>
          <p className="text-sm text-gray-600">Total Sales Growth</p>
          <div className="flex items-center gap-2">
            {isPositiveGrowth ? (
              <TrendingUp className="text-green-500 w-5 h-5" />
            ) : (
              <TrendingDown className="text-red-500 w-5 h-5" />
            )}
            <p className={`text-lg font-semibold ${isPositiveGrowth ? "text-green-600" : "text-red-600"}`}>
              {formatCurrency(results.salesGrowth)}
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600">Growth Rate</p>
          <div className="flex items-center gap-2">
            {isPositiveGrowth ? (
              <TrendingUp className="text-green-500 w-5 h-5" />
            ) : (
              <TrendingDown className="text-red-500 w-5 h-5" />
            )}
            <p className={`text-lg font-semibold ${isPositiveGrowth ? "text-green-600" : "text-red-600"}`}>
              {formatPercentage(results.growthRate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
