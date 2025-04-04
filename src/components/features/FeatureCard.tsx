
import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  Icon,
  title,
  description,
  className,
  onClick,
}) => {
  return (
    <div 
      className={`
        group
        flex items-start gap-4 
        transition-all duration-300 ease-in-out
        hover:shadow-[0px_4px_20px_rgba(0,0,0,0.1)] 
        hover:scale-[1.02] 
        rounded-lg 
        p-4 
        cursor-pointer 
        hover:bg-gray-50 
        active:scale-[0.98]
        ${className}
      `}
      onClick={onClick}
    >
      <div className="text-primary shrink-0 transition-colors duration-300 group-hover:text-[#E98A23]">
        <Icon 
          size={50} 
          strokeWidth={1.5} 
          className="group-hover:text-[#E98A23] transition-colors duration-300"
        />
      </div>
      <div className="flex flex-col items-stretch max-w-[250px]">
        <h3 className="text-[rgba(7,15,24,1)] text-lg font-semibold transition-colors duration-300 group-hover:text-[#E98A23]">
          {title}
        </h3>
        <p className="text-[rgba(87,84,85,1)] text-sm font-normal leading-5 mt-2 line-clamp-4">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
