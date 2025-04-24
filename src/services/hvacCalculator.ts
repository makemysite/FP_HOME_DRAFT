
import { BuildingInfo, HVACLoadResult } from "@/types/hvacTypes";
import { 
  getUValue, 
  getSolarHeatGainCoefficient,
  getInfiltrationRate,
  getSunExposure,
  calculateWallArea
} from "@/utils/hvacCalculations";

export function calculateHVACLoad(info: BuildingInfo): HVACLoadResult {
  // Determine U-Values
  const wallUValue = getUValue(info.insulationType, "wall");
  const roofUValue = getUValue(info.insulationType, "roof");
  const floorUValue = getUValue(info.insulationType, "floor");
  const windowUValue = getUValue(info.windowType);
  const doorUValue = getUValue(info.doorType);

  // Constants for calculations
  const averageWindowSize = 15; // sq ft
  const averageDoorSize = 20; // sq ft

  // Calculate surface areas
  const wallArea = calculateWallArea(
    info.buildingAreaSqft, 
    info.ceilingHeightFt, 
    info.numberOfWindows, 
    info.numberOfExteriorDoors
  );
  const roofArea = info.buildingAreaSqft;
  const floorArea = info.buildingAreaSqft;
  const windowArea = info.numberOfWindows * averageWindowSize;
  const doorArea = info.numberOfExteriorDoors * averageDoorSize;

  // Step 2: Calculate Heat Loss
  const deltaTHeating = info.desiredIndoorTemperatureF - info.outsideTemperatureF;

  const wallHeatLoss = wallUValue * wallArea * deltaTHeating;
  const roofHeatLoss = roofUValue * roofArea * deltaTHeating;
  const floorHeatLoss = floorUValue * floorArea * deltaTHeating;
  const windowHeatLoss = windowUValue * windowArea * deltaTHeating;
  const doorHeatLoss = doorUValue * doorArea * deltaTHeating;

  // Calculate infiltration losses
  const buildingVolume = info.buildingAreaSqft * info.ceilingHeightFt;
  const infiltrationRate = getInfiltrationRate(info.insulationType);
  const infiltrationLoss = 0.018 * buildingVolume * deltaTHeating * infiltrationRate;

  const totalHeatLoss = wallHeatLoss + roofHeatLoss + floorHeatLoss + 
                        windowHeatLoss + doorHeatLoss + infiltrationLoss;

  // Step 3: Calculate Heat Gain
  const deltaTCooling = info.outsideTemperatureF - info.desiredIndoorTemperatureF;

  const wallHeatGain = wallUValue * wallArea * deltaTCooling;
  const roofHeatGain = roofUValue * roofArea * deltaTCooling;
  const floorHeatGain = floorUValue * floorArea * deltaTCooling;
  const windowConductionGain = windowUValue * windowArea * deltaTCooling;
  const doorHeatGain = doorUValue * doorArea * deltaTCooling;

  // Solar heat gain through windows
  const windowSHGC = getSolarHeatGainCoefficient(info.windowType);
  const sunExposureFactor = getSunExposure(info.buildingLocation);
  const solarHeatGain = windowArea * windowSHGC * sunExposureFactor * 230; // 230 BTU/hr/sqft is typical max solar radiation

  // Internal heat gains
  const occupantGain = info.numberOfOccupants * 400;  // BTU/hr per person
  const applianceGain = info.numberOfAppliances * 800; // Estimate per appliance
  const lightingGain = info.lightingWattageTotal * 3.41; // Convert watts to BTUs

  const internalHeatGain = occupantGain + applianceGain + lightingGain;

  // Total heat gain
  const totalHeatGain = wallHeatGain + roofHeatGain + floorHeatGain + 
                       windowConductionGain + doorHeatGain + solarHeatGain + 
                       internalHeatGain;

  // Step 4: Apply safety factors
  const heatingSafetyFactor = 1.2; // 20% safety factor
  const coolingSafetyFactor = 1.15; // 15% safety factor

  const designHeatingLoadBTU = totalHeatLoss * heatingSafetyFactor;
  const designCoolingLoadBTU = totalHeatGain * coolingSafetyFactor;

  // Convert to tons (1 ton = 12,000 BTU/hr)
  const heatingLoadTons = designHeatingLoadBTU / 12000;
  const coolingLoadTons = designCoolingLoadBTU / 12000;

  // Round up to nearest 0.5 ton
  const recommendedHeatingTons = Math.ceil(heatingLoadTons * 2) / 2;
  const recommendedCoolingTons = Math.ceil(coolingLoadTons * 2) / 2;

  // Step 5: Recommend HVAC Equipment
  let recommendedEquipment = "";
  if (coolingLoadTons <= 1.5) {
    recommendedEquipment = "1.5 Ton Unit";
  } else if (coolingLoadTons <= 2.0) {
    recommendedEquipment = "2 Ton Unit";
  } else if (coolingLoadTons <= 2.5) {
    recommendedEquipment = "2.5 Ton Unit";
  } else if (coolingLoadTons <= 3.0) {
    recommendedEquipment = "3 Ton Unit";
  } else if (coolingLoadTons <= 4.0) {
    recommendedEquipment = "4 Ton Unit";
  } else if (coolingLoadTons <= 5.0) {
    recommendedEquipment = "5 Ton Unit";
  } else {
    recommendedEquipment = "Multiple Units or Custom System Required";
  }

  return {
    totalHeatLoss,
    totalHeatGain,
    designHeatingLoadBTU,
    designCoolingLoadBTU,
    heatingLoadTons,
    coolingLoadTons,
    recommendedHeatingTons,
    recommendedCoolingTons,
    recommendedEquipment,
    wallHeatLoss,
    roofHeatLoss,
    floorHeatLoss,
    windowHeatLoss,
    doorHeatLoss,
    infiltrationLoss,
    wallHeatGain,
    roofHeatGain,
    floorHeatGain,
    windowConductionGain,
    doorHeatGain,
    solarHeatGain,
    occupantGain,
    applianceGain,
    lightingGain,
    internalHeatGain
  };
}

// Function to determine equipment recommendation
export function getEquipmentRecommendation(coolingTons: number): string {
  if (coolingTons <= 1.5) return "1.5 Ton Unit";
  if (coolingTons <= 2.0) return "2 Ton Unit";
  if (coolingTons <= 2.5) return "2.5 Ton Unit";
  if (coolingTons <= 3.0) return "3 Ton Unit";
  if (coolingTons <= 4.0) return "4 Ton Unit";
  if (coolingTons <= 5.0) return "5 Ton Unit";
  return "Multiple Units or Custom System Required";
}
