
export interface ROIResults {
  totalGain: number;
  roi: number;
  simpleAnnualRoi: number;
  cagr: number;
}

export const calculateROI = (
  previousSales: number,
  currentSales: number,
  investmentYears: number
): ROIResults => {
  // Step 1: Calculate Total Gain
  const totalGain = currentSales - previousSales;

  // Step 2: Calculate ROI
  const roi = (totalGain / previousSales) * 100;

  // Step 3: Calculate Simple Annual ROI
  const simpleAnnualRoi = roi / investmentYears;

  // Step 4: Calculate CAGR
  const cagr = (Math.pow(currentSales / previousSales, 1 / investmentYears) - 1) * 100;

  return {
    totalGain,
    roi,
    simpleAnnualRoi,
    cagr
  };
};
