
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface OvertimeResultsDisplayProps {
  results: {
    totalPay: number;
    overtimeHours: number;
    overtimePay: number;
    effectiveHourlyRate: number;
  };
}

const OvertimeResultsDisplay = ({ results }: OvertimeResultsDisplayProps) => {
  return (
    <Card className="mt-6 bg-gray-50">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Total Pay</h3>
            <p className="text-2xl font-bold text-[#E98A23]">
              ${results.totalPay.toFixed(2)}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Overtime Hours</h3>
            <p className="text-2xl font-bold text-[#E98A23]">
              {results.overtimeHours.toFixed(1)}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Overtime Pay</h3>
            <p className="text-2xl font-bold text-[#E98A23]">
              ${results.overtimePay.toFixed(2)}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-700">Effective Hourly Rate</h3>
            <p className="text-2xl font-bold text-[#E98A23]">
              ${results.effectiveHourlyRate.toFixed(2)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OvertimeResultsDisplay;
