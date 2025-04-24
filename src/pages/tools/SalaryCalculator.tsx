
import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import SalaryCalculatorForm from "@/components/tools/salary-calculator/SalaryCalculatorForm";
import ResultsDisplay from "@/components/tools/salary-calculator/ResultsDisplay";

type CalculationResults = {
  annualSalary: number;
  weeklyHours: number;
  weeksWorked: number;
  totalWorkHours: number;
  hourlyRate: number;
  monthlyPay: number;
  weeklyPay: number;
};

const SalaryCalculator = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);

  const calculateResults = (annualSalary: number, weeklyHours: number, weeksPerYear: number = 52) => {
    const totalWorkHours = weeklyHours * weeksPerYear;
    
    if (totalWorkHours <= 0) {
      toast({
        title: "Invalid Input",
        description: "Total work hours must be greater than zero.",
        variant: "destructive",
      });
      return;
    }

    const results: CalculationResults = {
      annualSalary,
      weeklyHours,
      weeksWorked: weeksPerYear,
      totalWorkHours,
      hourlyRate: annualSalary / totalWorkHours,
      monthlyPay: annualSalary / 12,
      weeklyPay: annualSalary / weeksPerYear
    };

    setResults(results);
    
    toast({
      title: "Calculation Complete",
      description: "Your salary conversion results are ready.",
    });
  };

  return (
    <ClientPageWrapper
      title="Salary to Hourly Calculator"
      description="Convert your annual salary to hourly, monthly, and weekly rates"
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="prose max-w-none mb-8">
          <p className="text-lg text-gray-700">
            This calculator helps you convert your annual salary into hourly, monthly, and weekly rates. 
            Simply enter your salary information below to get started.
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Salary Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8">
              <SalaryCalculatorForm onCalculate={calculateResults} />
              {results && <ResultsDisplay results={results} />}
            </div>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default SalaryCalculator;
