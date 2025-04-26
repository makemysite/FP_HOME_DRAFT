import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { CalculationResults } from "@/types/calculatorTypes";
import SalaryCalculatorForm from "@/components/tools/salary-calculator/SalaryCalculatorForm";
import ResultsDisplay from "@/components/tools/salary-calculator/ResultsDisplay";
import DescriptionSection from "@/components/tools/salary-calculator/DescriptionSection";
import UsageInstructions from "@/components/tools/salary-calculator/UsageInstructions";
import AdditionalInfo from "@/components/tools/salary-calculator/AdditionalInfo";
import { Button } from "@/components/ui/button";

const SalaryCalculator = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleCalculate = (annualSalary: number, weeklyHours: number, weeksPerYear: number) => {
    // Calculate total work hours
    const totalWorkHours = weeklyHours * weeksPerYear;
    
    // Calculate hourly rate
    const hourlyRate = annualSalary / totalWorkHours;
    
    // Calculate monthly pay
    const monthlyPay = annualSalary / 12;
    
    // Calculate weekly pay
    const weeklyPay = annualSalary / weeksPerYear;
    
    // Set the calculation results
    setResults({
      hourlyRate,
      monthlyPay,
      weeklyPay,
      totalWorkHours,
      annualSalary,
      weeklyHours,
      weeksPerYear
    });
  };

  return (
    <ClientPageWrapper
      metaTitle="Free Salary to Hourly Paycheck Calculator for Service Businesses"
      metaDescription="Convert salaries to hourly paychecks with our free, easy-to-use calculator. Start simplifying payroll today!"
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Salary Calculator Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#E98A23] mb-4">Salary to Hourly Pay Rate Calculator</h2>
              <p className="text-lg text-gray-700 mb-4">
                Quickly convert annual salary to hourly rate with our free calculator. Perfect for comparing job offers, budgeting, or managing payroll calculations.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <DollarSign className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Salary Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <SalaryCalculatorForm onCalculate={handleCalculate} />
            {results && <ResultsDisplay results={results} />}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <DescriptionSection />
          <UsageInstructions />
          <AdditionalInfo />
        </div>

        <Card className="bg-gradient-to-r from-[#E98A23]/10 to-[#F9B348]/10 border-2 border-[#E98A23]/20">
          <CardHeader className="border-b border-[#E98A23]/20">
            <CardTitle className="text-[#E98A23]">Transform Your Payroll Management</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Experience the full power of our field service management platform. Streamline your payroll processes and boost efficiency.
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

export default SalaryCalculator;
