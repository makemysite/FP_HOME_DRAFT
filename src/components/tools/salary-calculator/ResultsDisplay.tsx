
import React from "react";
import { CalculationResults } from "@/types/calculatorTypes";

type ResultsDisplayProps = {
  results: {
    annualSalary: number;
    weeklyHours: number;
    weeksPerYear: number;
    totalWorkHours: number;
    hourlyRate: number;
    monthlyPay: number;
    weeklyPay: number;
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

const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg space-y-6">
      <h3 className="text-xl font-semibold mb-4">Calculation Results</h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Annual Salary</p>
          <p className="text-lg font-semibold">{formatCurrency(results.annualSalary)}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Hourly Rate</p>
          <p className="text-lg font-semibold">{formatCurrency(results.hourlyRate)}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Monthly Pay</p>
          <p className="text-lg font-semibold">{formatCurrency(results.monthlyPay)}</p>
        </div>
        
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Weekly Pay</p>
          <p className="text-lg font-semibold">{formatCurrency(results.weeklyPay)}</p>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-lg font-semibold mb-3">Work Schedule Details</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-600">Weekly Hours</p>
            <p className="text-base">{results.weeklyHours} hours</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Weeks Worked Per Year</p>
            <p className="text-base">{results.weeksPerYear} weeks</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Annual Work Hours</p>
            <p className="text-base">{results.totalWorkHours} hours</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
