import React, { useState } from "react";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartBar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { calculateHVACLoad } from "@/services/hvacCalculator";
import { BuildingInfo, HVACLoadResult } from "@/types/hvacTypes";
import BuildingInfoForm from "@/components/tools/load-calculator/BuildingInfoForm";
import ResultsDisplay from "@/components/tools/load-calculator/ResultsDisplay";
import InformationSection from "@/components/tools/load-calculator/InformationSection";
import { Button } from "@/components/ui/button";

const LoadCalculator = () => {
  const { toast } = useToast();
  const [results, setResults] = useState<HVACLoadResult | null>(null);
  
  const [buildingInfo, setBuildingInfo] = useState<BuildingInfo>({
    buildingLocation: "north",
    buildingAreaSqft: 0,
    ceilingHeightFt: 0,
    insulationType: "average",
    numberOfWindows: 0,
    windowType: "double-pane",
    numberOfExteriorDoors: 0,
    doorType: "insulated",
    numberOfOccupants: 0,
    numberOfAppliances: 0,
    lightingWattageTotal: 0,
    outsideTemperatureF: 0,
    desiredIndoorTemperatureF: 0,
  });
  
  const handleCalculate = () => {
    try {
      const calculatedResults = calculateHVACLoad(buildingInfo);
      setResults(calculatedResults);
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Unable to calculate HVAC load. Please check your inputs.",
        variant: "destructive",
      });
    }
  };

  const handleFieldChange = (field: keyof BuildingInfo, value: any) => {
    setBuildingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ClientPageWrapper
      metaTitle="Free HVAC Load Calculator - Accurate Manual J Calculation"
      metaDescription="Get precise HVAC load calculations with our free Manual J calculator. Save time and avoid errors with Field Promax's easy-to-use tool"
    >
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-10">
        <div className="prose max-w-none mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            HVAC Load Calculator
          </h1>
          <p className="text-xl text-[#E98A23] font-semibold mb-2">
            Fast, Free, and Accurate Duct Size Calculations
          </p>
          <p className="text-gray-600">
            Precisely calculate the heating and cooling requirements for your space using our advanced HVAC load calculator.
          </p>
        </div>

        <Card className="shadow-md border-t-4 border-t-[#E98A23]">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center space-x-3">
              <ChartBar className="w-6 h-6 text-[#E98A23]" />
              <CardTitle>HVAC Load Calculation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <BuildingInfoForm 
              buildingInfo={buildingInfo} 
              onChange={handleFieldChange} 
              onCalculate={handleCalculate} 
            />
            {results && <ResultsDisplay results={results} />}
          </CardContent>
        </Card>

        <InformationSection />

        {/* Updated CTA Banner */}
        <Card className="bg-gradient-to-r from-[#E98A23]/10 to-[#F9B348]/10 border-2 border-[#E98A23]/20">
          <CardHeader className="border-b border-[#E98A23]/20">
            <CardTitle className="text-[#E98A23]">Upgrade Your HVAC Planning</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-700 mb-4">
              Field Promax can revolutionize your HVAC business management. Get precise load calculations and streamline your operations.
            </p>
            <Button className="w-full md:w-auto bg-[#E98A23] hover:bg-[#E98A23]/90">
              Book Your Free Demo
            </Button>
          </CardContent>
        </Card>
      </div>
    </ClientPageWrapper>
  );
};

export default LoadCalculator;
