
import React from "react";

type ResultsDisplayProps = {
  results: {
    revenue: number;
    cogs: number;
    grossProfit: number;
    profitMargin: number;
  };
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatPercentage = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value) + '%';
};

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Revenue</p>
          <p className="text-lg font-semibold">{formatCurrency(results.revenue)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Cost of Goods Sold</p>
          <p className="text-lg font-semibold">{formatCurrency(results.cogs)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Gross Profit</p>
          <p className="text-lg font-semibold">{formatCurrency(results.grossProfit)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Profit Margin</p>
          <p className="text-lg font-semibold">{formatPercentage(results.profitMargin)}</p>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
