
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UsageInstructions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>How to Use the Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-[#E98A23] mb-2">Input Salary Information:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Enter the annual, monthly, or weekly salary.</li>
              <li>Specify hours worked per week and total weeks worked in the year.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#E98A23] mb-2">Get Instant Results:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Hit "Calculate," and in seconds, the tool will show the hourly rate based on your inputs.</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-[#E98A23] mb-2">Reset for New Data:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Click "Reset" to start over with fresh figures if needed.</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageInstructions;
