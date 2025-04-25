
import React from "react";

const InstructionsSection = () => {
  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the HVAC Duct Calculator</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="font-semibold min-w-[120px] text-[#E98A23]">1. Input Data:</div>
            <div>Enter key details like airflow rate, duct shape, and dimensions.</div>
          </div>
          <div className="flex gap-4">
            <div className="font-semibold min-w-[120px] text-[#E98A23]">2. Calculate:</div>
            <div>Hit the "Calculate" button, and the tool will instantly give you your results.</div>
          </div>
          <div className="flex gap-4">
            <div className="font-semibold min-w-[120px] text-[#E98A23]">3. Review Results:</div>
            <div>See the required duct size, airflow velocity, and friction loss.</div>
          </div>
          <div className="flex gap-4">
            <div className="font-semibold min-w-[120px] text-[#E98A23]">4. Adjust & Reset:</div>
            <div>Update inputs easily if needed, and recalculate in seconds.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsSection;
