
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

  return (
    <ClientPageWrapper>
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Convert Salary to Hourly Pay Rate
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quickly convert annual salary to hourly rate with our free calculator. Perfect for comparing job offers, budgeting, or managing payroll calculations.
          </p>
        </div>

        {/* Main Calculator Card */}
        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <Calculator className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>Salary to Hourly Calculator</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <SalaryCalculatorForm onResultsCalculated={setResults} />
            {results && <ResultsDisplay results={results} />}
          </CardContent>
        </Card>

        {/* Instructions and Additional Information */}
        <div className="space-y-8">
          <DescriptionSection />
          <UsageInstructions />
          <AdditionalInfo />
        </div>
      </div>
    </ClientPageWrapper>
  );
};

export default SalaryCalculator;
