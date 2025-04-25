import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import SalaryCalculatorForm from "@/components/tools/salary-calculator/SalaryCalculatorForm";
import ResultsDisplay from "@/components/tools/salary-calculator/ResultsDisplay";
import DescriptionSection from "@/components/tools/salary-calculator/DescriptionSection";
import UsageInstructions from "@/components/tools/salary-calculator/UsageInstructions";
import AdditionalInfo from "@/components/tools/salary-calculator/AdditionalInfo";

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
    <ClientPageWrapper>
      <div className="max-w-4xl mx-auto px-4">
        <DescriptionSection />

        <div className="my-8">
          <Card>
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

        <div className="grid gap-8 md:grid-cols-2">
          <UsageInstructions />
          <AdditionalInfo />
        </div>
      </div>
    </ClientPageWrapper>
  );
};

export default SalaryCalculator;
