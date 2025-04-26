
import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import OvertimeCalculatorForm from "@/components/tools/overtime-calculator/OvertimeCalculatorForm";
import OvertimeResultsDisplay from "@/components/tools/overtime-calculator/OvertimeResultsDisplay";
import DetailedDescription from "@/components/tools/overtime-calculator/DetailedDescription";
import { Button } from "@/components/ui/button";

interface OvertimeResults {
  totalPay: number;
  overtimeHours: number;
  overtimePay: number;
  effectiveHourlyRate: number;
}

const OvertimeCalculator = () => {
  const [results, setResults] = useState<OvertimeResults | null>(null);

  const handleCalculate = (calculationResults: OvertimeResults) => {
    setResults(calculationResults);
  };

  return (
    <ClientPageWrapper
      title="Overtime Calculator"
      metaTitle="Free Overtime Calculator for Field Service Businesses | Field Promax"
      metaDescription="Calculate overtime pay and hours for your field service team with our free calculator."
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Overtime Calculator Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E98A23] mb-4">Overtime Calculator</h2>
              <p className="text-lg text-gray-700 mb-4">
                Don't worry about paying your technicians less (or worse, more!) for the additional time they have worked for you. Know the exact amount to pay with our efficient overtime calculator.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                Time is money, and we're here to make sure you're getting every penny you deserve! Introducing our game-changing overtime calculator—the must-have tool for service business owners looking to master their payroll.
              </p>
              <p className="text-lg text-gray-700">
                Say goodbye to manual calculations and hello to effortless accuracy! Whether you're managing a bustling team of technicians or keeping tabs on overtime hours, our free calculator streamlines the process, ensuring fair compensation while saving you valuable time. Get ready to revolutionize your payroll management and empower your business to thrive like never before!
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Overtime Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <OvertimeCalculatorForm onCalculate={handleCalculate} />
            {results && <OvertimeResultsDisplay results={results} />}
          </CardContent>
        </Card>

        <DetailedDescription />

        <Card className="bg-gradient-to-r from-[#E98A23]/10 to-[#F9B348]/10 border-2 border-[#E98A23]/20 my-8">
          <CardHeader className="border-b border-[#E98A23]/20">
            <CardTitle className="text-[#E98A23]">Get Smarter Workforce Management with Field Promax</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Our software helps you track employee hours, manage overtime costs, and optimize your workforce scheduling.
              Stay compliant with labor laws while maximizing productivity and profitability.
            </p>
            <Button className="w-full md:w-auto bg-[#E98A23] hover:bg-[#E98A23]/90">
              Book Your Free Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default OvertimeCalculator;
