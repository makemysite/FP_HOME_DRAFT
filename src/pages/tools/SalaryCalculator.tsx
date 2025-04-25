import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
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
    <ClientPageWrapper>
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <div className="prose max-w-none mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Convert Salary to Hourly Pay Rate
          </h1>
          <p className="text-xl text-[#E98A23] font-semibold mb-2">
            Quick and Accurate Salary Conversion Calculator
          </p>
          <p className="text-gray-600">
            Quickly convert annual salary to hourly rate with our free calculator. Perfect for comparing job offers, budgeting, or managing payroll calculations.
          </p>
        </div>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Salary to Hourly Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <SalaryCalculatorForm onCalculate={handleCalculate} />
            {results && (
              <ResultsDisplay 
                results={{
                  annualSalary: results.annualSalary || 0,
                  weeklyHours: results.weeklyHours || 0,
                  weeksWorked: results.weeksPerYear || 0,
                  totalWorkHours: results.totalWorkHours,
                  hourlyRate: results.hourlyRate,
                  monthlyPay: results.monthlyPay,
                  weeklyPay: results.weeklyPay
                }} 
              />
            )}
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
