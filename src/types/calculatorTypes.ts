
export interface CalculationResults {
  hourlyRate: number;
  monthlyPay: number;
  weeklyPay: number;
  totalWorkHours: number;
  annualSalary?: number;
  weeklyHours?: number;
  weeksPerYear?: number;
}

export interface SalaryCalculatorFormProps {
  onCalculate: (annualSalary: number, weeklyHours: number, weeksPerYear: number) => void;
}

export interface DiscountCalculationResults {
  priceAfterDiscount: number;
  discountPercentage: number;
  originalPrice: number;
  discountAmount: number;
}
