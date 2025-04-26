
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DetailedDescription = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>How to Use the Overtime Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              This calculator helps you determine overtime pay based on various pay rates and schedules.
              Follow these steps:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Select your pay rate type (hourly, daily, weekly, monthly, or annual)</li>
              <li>Enter your base pay rate</li>
              <li>Input the total hours worked</li>
              <li>Set your expected hours for the pay period</li>
              <li>Adjust the overtime rate multiplier (common values: 1.5 or 2.0)</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Overtime Calculations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              The calculator handles different pay rate types by converting them to an effective hourly rate.
              It then applies the overtime multiplier to hours worked beyond your expected hours.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold">Key Terms:</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Expected Hours: Standard working hours for your pay period</li>
                <li>Overtime Hours: Hours worked beyond expected hours</li>
                <li>Overtime Rate: Multiple of regular hourly rate for overtime hours</li>
                <li>Effective Hourly Rate: Your base pay converted to an hourly rate</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedDescription;
