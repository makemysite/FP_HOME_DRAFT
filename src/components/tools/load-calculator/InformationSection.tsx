
import React from "react";

const InformationSection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding HVAC Load Calculation</h2>
        
        <p className="text-gray-700">
          HVAC load calculation is the process of determining how much heating and cooling a building 
          needs to maintain comfortable indoor conditions. This calculation is crucial for properly sizing 
          HVAC equipment to ensure energy efficiency and occupant comfort.
        </p>
        
        <h3 className="text-xl font-semibold mt-5 mb-3">How Our Calculator Works</h3>
        
        <p className="text-gray-700">
          Our HVAC load calculator uses industry-standard methods to determine your building's heating and cooling requirements:
        </p>
        
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>
            <strong>Heat Loss Calculation:</strong> Determines how much heat escapes from your building during cold weather 
            through walls, windows, doors, and other structural elements.
          </li>
          <li>
            <strong>Heat Gain Calculation:</strong> Calculates how much heat enters your building from the outside 
            during hot weather, plus internal heat sources like people, appliances, and lighting.
          </li>
          <li>
            <strong>Safety Factor:</strong> Applies a safety margin to ensure the system can handle peak demands.
          </li>
          <li>
            <strong>Equipment Sizing:</strong> Converts BTU requirements to tonnage and recommends appropriately sized equipment.
          </li>
        </ul>
      </div>

      <div className="bg-gray-50 p-5 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Important Considerations</h3>
        
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-[#E98A23] font-bold mr-2">•</span> 
            <span>This calculator provides estimates based on the information you provide. For the most accurate results, 
            consider consulting with an HVAC professional.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#E98A23] font-bold mr-2">•</span> 
            <span>Local climate conditions, building codes, and specific architectural features may require 
            additional considerations.</span>
          </li>
          <li className="flex items-start">
            <span className="text-[#E98A23] font-bold mr-2">•</span> 
            <span>The calculator assumes typical usage patterns and average construction materials. Your actual needs 
            may vary based on specific circumstances.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default InformationSection;
