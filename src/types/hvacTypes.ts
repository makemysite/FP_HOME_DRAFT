
export interface BuildingInfo {
  buildingLocation: string;
  buildingAreaSqft: number;
  ceilingHeightFt: number;
  insulationType: string;
  numberOfWindows: number;
  windowType: string;
  numberOfExteriorDoors: number;
  doorType: string;
  numberOfOccupants: number;
  numberOfAppliances: number;
  lightingWattageTotal: number;
  outsideTemperatureF: number;
  desiredIndoorTemperatureF: number;
}

export interface HVACLoadResult {
  totalHeatLoss: number;
  totalHeatGain: number;
  designHeatingLoadBTU: number;
  designCoolingLoadBTU: number;
  heatingLoadTons: number;
  coolingLoadTons: number;
  recommendedHeatingTons: number;
  recommendedCoolingTons: number;
  recommendedEquipment: string;
  wallHeatLoss: number;
  roofHeatLoss: number;
  floorHeatLoss: number;
  windowHeatLoss: number;
  doorHeatLoss: number;
  infiltrationLoss: number;
  wallHeatGain: number;
  roofHeatGain: number;
  floorHeatGain: number;
  windowConductionGain: number;
  doorHeatGain: number;
  solarHeatGain: number;
  occupantGain: number;
  applianceGain: number;
  lightingGain: number;
  internalHeatGain: number;
}
