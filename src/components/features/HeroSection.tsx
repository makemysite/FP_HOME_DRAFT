
import React from "react";

interface HeroSectionProps {
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ className }) => {
  return (
    <section
      className={`self-center w-full max-w-[1243px] mt-[106px] max-md:max-w-full max-md:mt-10 ${className}`}
    >
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        <div className="w-[57%] max-md:w-full max-md:ml-0">
          <div className="flex grow flex-col text-base max-md:max-w-full max-md:mt-10">
            <h1 className="text-black text-[55px] font-bold self-stretch max-md:max-w-full max-md:text-[40px] leading-[1.2]">
              Best in Industry <br className="md:hidden" />
              features for managing <br className="md:hidden" />
              your field services <br className="md:hidden" />
              business
            </h1>
            <p className="text-[rgba(87,84,85,1)] font-medium leading-8 mt-[34px]">
              Field Promax is helping you to manage your field services
              <br />
              business efficiently with powerful features
            </p>
            <button 
              className="mt-[34px] w-[193px] bg-[rgba(233,138,35,1)] shadow-[0px_3px_12px_rgba(74,58,255,0.18)] text-white font-medium leading-none px-[39px] py-[18px] rounded-[56px] hover:bg-[rgba(233,138,35,0.9)] transition-colors"
            >
              Take a Demo
            </button>
          </div>
        </div>
        <div className="w-[43%] ml-5 max-md:w-full max-md:ml-0">
          <img
            src="https://ik.imagekit.io/d1cslxmlo/features/important-information-three-men-protective-helmet-looking-laptop-with-interest-while-standing-construction-site-day%20(1)%20copy.jpg?updatedAt=1743783905301"
            className="aspect-[1.35] object-contain w-full mt-[11px] rounded-[0px_0px_0px_0px] max-md:max-w-full max-md:mt-10"
            alt="Field Service Management"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
