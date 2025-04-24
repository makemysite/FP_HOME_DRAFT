
import React from "react";
import { HVACLoadResult } from "@/types/hvacTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

interface ResultsDisplayProps {
  results: HVACLoadResult;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">HVAC Load Calculation Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-[#E98A23] mb-3">Heat Loss (Heating)</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Wall Heat Loss:</span> 
                  <span className="font-medium">{formatNumber(results.wallHeatLoss)} BTU/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Roof Heat Loss:</span> 
                  <span className="font-medium">{formatNumber(results.roofHeatLoss)} BTU/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Floor Heat Loss:</span> 
                  <span className="font-medium">{formatNumber(results.floorHeatLoss)} BTU/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Window Heat Loss:</span> 
                  <span className="font-medium">{formatNumber(results.windowHeatLoss)} BTU/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Door Heat Loss:</span> 
                  <span className="font-medium">{formatNumber(results.doorHeatLoss)} BTU/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Infiltration Loss:</span> 
                  <span className="font-medium">{formatNumber(results.infiltrationLoss)} BTU/hr</span>
                </li>
                <li className="flex justify-between pt-2 border-t mt-2">
                  <span className="font-semibold">Total Heat Loss:</span> 
                  <span className="font-semibold">{formatNumber(results.totalHeatLoss)} BTU/hr</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="font-semibold">Design Heating Load:</span> 
                  <span className="font-semibold">{formatNumber(results.designHeatingLoadBTU)} BTU/hr</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-[#E98A23] mb-3">Heat Gain (Cooling)</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex justify-between">
                  <span>Wall Heat Gain:</span> 
                  <span className="font-medium">{formatNumber(results.wallHeatGain)} BTU/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Roof Heat Gain:</span> 
                  <span className="font-medium">{formatNumber(results.roofHeatGain)} BTU/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Floor Heat Gain:</span> 
                  <span className="font-medium">{formatNumber(results.floorHeatGain)} BTU/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Window Conduction:</span> 
                  <span className="font-medium">{formatNumber(results.windowConductionGain)} BTU/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Solar Heat Gain:</span> 
                  <span className="font-medium">{formatNumber(results.solarHeatGain)} BTU/hr</span>
                </li>
                <li className="flex justify-between">
                  <span>Internal Heat Gain:</span> 
                  <span className="font-medium">{formatNumber(results.internalHeatGain)} BTU/hr</span>
                </li>
                <li className="flex justify-between pt-2 border-t mt-2">
                  <span className="font-semibold">Total Heat Gain:</span> 
                  <span className="font-semibold">{formatNumber(results.totalHeatGain)} BTU/hr</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span className="font-semibold">Design Cooling Load:</span> 
                  <span className="font-semibold">{formatNumber(results.designCoolingLoadBTU)} BTU/hr</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-5 bg-blue-50 rounded-lg border border-blue-100 mt-6">
            <h3 className="text-xl font-semibold text-center mb-4">Equipment Sizing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-800">
                  {results.recommendedHeatingTons.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Tons Heating Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-800">
                  {results.recommendedCoolingTons.toFixed(1)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Tons Cooling Capacity</div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                <CircleCheck className="h-5 w-5 mr-2" />
                <span className="font-medium">
                  Recommended Equipment: {results.recommendedEquipment}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsDisplay;
