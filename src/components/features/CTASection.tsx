
import React from "react";
import DemoForm from "./DemoForm";

interface CTASectionProps {
  className?: string;
}

const CTASection: React.FC<CTASectionProps> = ({ className }) => {
  return (
    <section
      className={`w-full max-w-[1243px] mx-auto mt-[117px] max-md:mt-10 ${className}`}
    >
      <div className="flex gap-10 max-md:flex-col max-md:items-stretch">
        <div className="w-3/5 max-md:w-full overflow-hidden rounded-lg">
          <div className="aspect-w-16 aspect-h-9 relative h-0 pb-[56.25%]">
            <iframe
              src="https://www.youtube.com/embed/fvZsIcmWF-A?rel=0"
              title="Product Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full object-cover"
            ></iframe>
          </div>
        </div>
        <div className="w-2/5 flex flex-col justify-center max-md:w-full">
          <div className="flex flex-col self-stretch text-base max-md:mt-10">
            <span className="text-[rgba(233,138,35,1)] font-bold">
              SAVE MORE TIME
            </span>
            <h2 className="text-black text-4xl font-bold mt-[9px] max-md:mr-2.5">
              And Boost Productivity
            </h2>
            <p className="text-[rgba(87,84,85,1)] font-normal leading-8 mt-[27px]">
              Your employees can bring any success into your
              <br />
              business, so we need to take care of them
            </p>
            <DemoForm className="mt-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
