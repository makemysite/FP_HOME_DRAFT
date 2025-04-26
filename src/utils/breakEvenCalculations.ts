
export interface BreakEvenResults {
  breakEvenUnits: number;
  contributionMarginPerUnit: number;
  profit?: number;
  totalRevenue?: number;
  totalCosts?: number;
}

export const calculateBreakEven = (
  fixedCosts: number,
  variableCostPerUnit: number,
  sellingPricePerUnit: number,
  unitsSold?: number
): BreakEvenResults => {
  // Step 1: Calculate Contribution Margin per Unit
  const contributionMarginPerUnit = sellingPricePerUnit - variableCostPerUnit;

  // Step 2: Calculate Break-Even Point in Units
  const breakEvenUnits = fixedCosts / contributionMarginPerUnit;

  // Optional profit calculation if units sold is provided
  if (unitsSold) {
    const totalRevenue = unitsSold * sellingPricePerUnit;
    const totalVariableCost = unitsSold * variableCostPerUnit;
    const totalCosts = fixedCosts + totalVariableCost;
    const profit = totalRevenue - totalCosts;

    return {
      breakEvenUnits,
      contributionMarginPerUnit,
      profit,
      totalRevenue,
      totalCosts
    };
  }

  return { breakEvenUnits, contributionMarginPerUnit };
};
