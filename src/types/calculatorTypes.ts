
export interface CalculationResults {
  hourlyRate: number;
  monthlyPay: number;
  weeklyPay: number;
  totalWorkHours: number;
}

export interface SalaryCalculatorFormProps {
  onCalculate: (annualSalary: number, weeklyHours: number, weeksPerYear: number) => void;
}
