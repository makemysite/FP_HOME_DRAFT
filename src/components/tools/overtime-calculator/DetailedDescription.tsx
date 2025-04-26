
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

      <Card>
        <CardHeader>
          <CardTitle>Practical Example</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-700">
              Let's walk through a concrete example to illustrate how overtime calculations work:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold mb-2">Scenario:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Job: Field Service Technician</li>
                <li>Pay Rate: $25/hour</li>
                <li>Pay Rate Type: Hourly</li>
                <li>Expected Hours: 40 hours per week</li>
                <li>Overtime Rate Multiplier: 1.5x</li>
                <li>Total Hours Worked: 45 hours</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Calculation Breakdown:</h4>
              <p className="text-gray-700">
                <strong>Regular Pay:</strong> 40 hours × $25/hour = $1,000
              </p>
              <p className="text-gray-700">
                <strong>Overtime Hours:</strong> 45 hours - 40 hours = 5 hours
              </p>
              <p className="text-gray-700">
                <strong>Overtime Pay:</strong> 5 hours × ($25 × 1.5) = $187.50
              </p>
              <p className="text-gray-700">
                <strong>Total Pay:</strong> $1,000 + $187.50 = $1,187.50
              </p>
            </div>
            <p className="text-gray-700 italic">
              This example shows how overtime is calculated when an employee works more than their expected hours, 
              with the additional hours paid at a higher rate.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedDescription;
