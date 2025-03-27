import React from "react";

interface ArrowRightIconProps {
  className?: string;
  color?: string;
}

const ArrowRightIcon: React.FC<ArrowRightIconProps> = ({
  className = "",
  color = "#E98A23",
}) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M16.172 11L10.808 5.63605L12.222 4.22205L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z"
        fill={color}
      />
    </svg>
  );
};

export default ArrowRightIcon;
