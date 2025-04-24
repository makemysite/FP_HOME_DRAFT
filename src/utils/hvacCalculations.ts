
// U-values for different insulation and material types
export const getUValue = (type: string, surface?: string): number => {
  // Wall U-Values
  if (surface === "wall") {
    switch (type) {
      case "poor": return 0.35;
      case "average": return 0.25;
      case "good": return 0.15;
      default: return 0.25;
    }
  }
  
  // Roof U-Values
  if (surface === "roof") {
    switch (type) {
      case "poor": return 0.30;
      case "average": return 0.20;
      case "good": return 0.10;
      default: return 0.20;
    }
  }
  
  // Floor U-Values
  if (surface === "floor") {
    switch (type) {
      case "poor": return 0.25;
      case "average": return 0.15;
      case "good": return 0.08;
      default: return 0.15;
    }
  }
  
  // Window U-Values
  if (type === "single-pane") return 0.9;
  if (type === "double-pane") return 0.5;
  if (type === "low-e") return 0.3;
  
  // Door U-Values
  if (type === "insulated") return 0.2;
  if (type === "non-insulated") return 0.5;
  
  return 0.25; // Default value
};

// Get Solar Heat Gain Coefficient
export const getSolarHeatGainCoefficient = (windowType: string): number => {
  switch (windowType) {
    case "single-pane": return 0.75;
    case "double-pane": return 0.60;
    case "low-e": return 0.40;
    default: return 0.60;
  }
};

// Get Infiltration Rate
export const getInfiltrationRate = (insulationType: string): number => {
  switch (insulationType) {
    case "poor": return 1.2;
    case "average": return 0.8;
    case "good": return 0.5;
    default: return 0.8;
  }
};

// Get Sun Exposure Factor based on location
export const getSunExposure = (location: string): number => {
  switch (location.toLowerCase()) {
    case "north": return 0.7;
    case "south": return 1.2;
    case "east": return 0.9;
    case "west": return 1.0;
    case "northeast": return 0.8;
    case "northwest": return 0.8;
    case "southeast": return 1.1;
    case "southwest": return 1.1;
    default: return 1.0;
  }
};

// Calculate Wall Area
export const calculateWallArea = (
  buildingAreaSqft: number, 
  ceilingHeightFt: number, 
  numberOfWindows: number, 
  numberOfDoors: number
): number => {
  // Assuming square building for simplification
  const perimeter = Math.sqrt(buildingAreaSqft) * 4;
  const grossWallArea = perimeter * ceilingHeightFt;
  
  // Subtract window and door areas
  // Assuming average window size of 15 sqft and door size of 20 sqft
  const windowArea = numberOfWindows * 15;
  const doorArea = numberOfDoors * 20;
  
  return grossWallArea - windowArea - doorArea;
};

// For estimating energy usage over a season
export const estimateEnergyCost = (
  loadBTU: number, 
  efficiencyRating: number, 
  hoursPerDay: number, 
  daysPerYear: number, 
  energyCostPerUnit: number,
  isElectricity: boolean
): number => {
  // Convert BTU/hr to kWh or therms
  const kwhPerHour = loadBTU / 3412 / efficiencyRating;
  const thermsPerHour = loadBTU / 100000 / efficiencyRating;
  
  const unitsPerYear = (isElectricity ? kwhPerHour : thermsPerHour) * hoursPerDay * daysPerYear;
  
  return unitsPerYear * energyCostPerUnit;
};
