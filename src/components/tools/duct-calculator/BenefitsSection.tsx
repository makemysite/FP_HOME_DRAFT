
import React from "react";

const BenefitsSection = () => {
  return (
    <div className="py-8 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Why You'll Love Our HVAC Duct Calculator</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Whether you're a seasoned HVAC professional or a DIY enthusiast, this tool will speed up your duct design and improve the precision of your calculations. With real-time, accurate results, you'll save time and reduce errors.
          </p>
          <p className="text-gray-600">
            For rectangular ducts, you can specify your preferred aspect ratio (width:height) to ensure the duct dimensions match your space constraints. For example, a 2:1 ratio means the width will be twice the height, helping you design ducts that fit perfectly in your available space.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
