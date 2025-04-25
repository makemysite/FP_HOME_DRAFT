
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
      totalWorkHours
    });
  };

  return (
    <ClientPageWrapper>
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Convert Salary to Hourly Pay Rate
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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

        <div className="bg-gradient-to-r from-[#E98A23] to-[#F9B348] p-8 rounded-lg text-white shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Try Field Promax Free for 14 Days</h2>
            <p className="text-lg mb-6 opacity-90">
              Experience the full power of our field service management platform. 
              No credit card required. Cancel anytime.
            </p>
            <a 
              href="/booking" 
              className="inline-block bg-white text-[#E98A23] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition-colors"
            >
              Book Your Free Demo
            </a>
          </div>
        </div>
      </div>
    </ClientPageWrapper>
  );
};

export default SalaryCalculator;
