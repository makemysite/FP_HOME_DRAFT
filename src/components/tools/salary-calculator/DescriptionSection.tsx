
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DescriptionSection = () => {
  return (
    <div className="space-y-8">
      <div className="prose max-w-none">
        <h1 className="text-4xl font-bold mb-4">Salary to Hourly Paycheck Calculator</h1>
        <p className="text-lg text-gray-700 mb-6">
          Take the guesswork out of payroll with our free Salary to Hourly Paycheck Calculator. 
          Designed for service business owners, this tool helps you convert salaries into accurate hourly rates with ease.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Simplify Payroll & Make Smarter Decisions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700">
            Managing payroll doesn't need to be a hassle. Whether you're overseeing a busy field service team 
            or managing a versatile workforce, our calculator helps you convert annual salaries into precise 
            hourly wages. Say goodbye to errors and complicated math, and hello to simplified payroll management.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DescriptionSection;
