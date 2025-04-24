
import React from "react";
import { BuildingInfo } from "@/types/hvacTypes";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BuildingInfoFormProps {
  buildingInfo: BuildingInfo;
  onChange: (field: keyof BuildingInfo, value: any) => void;
  onCalculate: () => void;
}

const BuildingInfoForm: React.FC<BuildingInfoFormProps> = ({
  buildingInfo,
  onChange,
  onCalculate
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof BuildingInfo) => {
    const value = e.target.type === "number" ? 
      (e.target.value === "" ? 0 : parseFloat(e.target.value)) : 
      e.target.value;
    onChange(field, value);
  };

  const handleSelectChange = (value: string, field: keyof BuildingInfo) => {
    onChange(field, value);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="buildingLocation">Building Location/Orientation</Label>
          <Select 
            value={buildingInfo.buildingLocation}
            onValueChange={(value) => handleSelectChange(value, "buildingLocation")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location/orientation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="north">North</SelectItem>
              <SelectItem value="south">South</SelectItem>
              <SelectItem value="east">East</SelectItem>
              <SelectItem value="west">West</SelectItem>
              <SelectItem value="northeast">Northeast</SelectItem>
              <SelectItem value="northwest">Northwest</SelectItem>
              <SelectItem value="southeast">Southeast</SelectItem>
              <SelectItem value="southwest">Southwest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="buildingAreaSqft">Building Area (sqft)</Label>
          <Input
            id="buildingAreaSqft"
            type="number"
            min="0"
            value={buildingInfo.buildingAreaSqft || ""}
            onChange={(e) => handleInputChange(e, "buildingAreaSqft")}
            placeholder="Enter total square footage"
          />
        </div>

        <div>
          <Label htmlFor="ceilingHeightFt">Ceiling Height (ft)</Label>
          <Input
            id="ceilingHeightFt"
            type="number"
            min="0"
            step="0.1"
            value={buildingInfo.ceilingHeightFt || ""}
            onChange={(e) => handleInputChange(e, "ceilingHeightFt")}
            placeholder="Enter ceiling height"
          />
        </div>

        <div>
          <Label htmlFor="insulationType">Insulation Type</Label>
          <Select 
            value={buildingInfo.insulationType}
            onValueChange={(value) => handleSelectChange(value, "insulationType")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select insulation type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="poor">Poor</SelectItem>
              <SelectItem value="average">Average</SelectItem>
              <SelectItem value="good">Good</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="numberOfWindows">Number of Windows</Label>
          <Input
            id="numberOfWindows"
            type="number"
            min="0"
            value={buildingInfo.numberOfWindows || ""}
            onChange={(e) => handleInputChange(e, "numberOfWindows")}
            placeholder="Enter number of windows"
          />
        </div>

        <div>
          <Label htmlFor="windowType">Window Type</Label>
          <Select 
            value={buildingInfo.windowType}
            onValueChange={(value) => handleSelectChange(value, "windowType")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select window type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single-pane">Single-Pane</SelectItem>
              <SelectItem value="double-pane">Double-Pane</SelectItem>
              <SelectItem value="low-e">Low-E</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="numberOfExteriorDoors">Number of Exterior Doors</Label>
          <Input
            id="numberOfExteriorDoors"
            type="number"
            min="0"
            value={buildingInfo.numberOfExteriorDoors || ""}
            onChange={(e) => handleInputChange(e, "numberOfExteriorDoors")}
            placeholder="Enter number of doors"
          />
        </div>

        <div>
          <Label htmlFor="doorType">Door Type</Label>
          <Select 
            value={buildingInfo.doorType}
            onValueChange={(value) => handleSelectChange(value, "doorType")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select door type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="insulated">Insulated</SelectItem>
              <SelectItem value="non-insulated">Non-Insulated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="numberOfOccupants">Number of Occupants</Label>
          <Input
            id="numberOfOccupants"
            type="number"
            min="0"
            value={buildingInfo.numberOfOccupants || ""}
            onChange={(e) => handleInputChange(e, "numberOfOccupants")}
            placeholder="Enter number of occupants"
          />
        </div>

        <div>
          <Label htmlFor="numberOfAppliances">Number of Appliances</Label>
          <Input
            id="numberOfAppliances"
            type="number"
            min="0"
            value={buildingInfo.numberOfAppliances || ""}
            onChange={(e) => handleInputChange(e, "numberOfAppliances")}
            placeholder="Enter number of appliances"
          />
        </div>

        <div>
          <Label htmlFor="lightingWattageTotal">Lighting Wattage Total</Label>
          <Input
            id="lightingWattageTotal"
            type="number"
            min="0"
            value={buildingInfo.lightingWattageTotal || ""}
            onChange={(e) => handleInputChange(e, "lightingWattageTotal")}
            placeholder="Enter total lighting watts"
          />
        </div>

        <div>
          <Label htmlFor="outsideTemperatureF">Outside Temperature (°F)</Label>
          <Input
            id="outsideTemperatureF"
            type="number"
            value={buildingInfo.outsideTemperatureF || ""}
            onChange={(e) => handleInputChange(e, "outsideTemperatureF")}
            placeholder="Enter outside temperature"
          />
        </div>

        <div>
          <Label htmlFor="desiredIndoorTemperatureF">Desired Indoor Temperature (°F)</Label>
          <Input
            id="desiredIndoorTemperatureF"
            type="number"
            value={buildingInfo.desiredIndoorTemperatureF || ""}
            onChange={(e) => handleInputChange(e, "desiredIndoorTemperatureF")}
            placeholder="Enter desired indoor temperature"
          />
        </div>
      </div>

      <Button 
        onClick={onCalculate}
        className="bg-[#E98A23] hover:bg-[#d47b1e] w-full mt-4"
      >
        Calculate HVAC Load
      </Button>
    </div>
  );
};

export default BuildingInfoForm;
