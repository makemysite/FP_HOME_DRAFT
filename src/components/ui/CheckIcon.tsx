import React from "react";

interface CheckIconProps {
  className?: string;
  color?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({
  className = "",
  color = "#E98A23",
}) => {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M13 2.16666C7.02 2.16666 2.16667 7.02 2.16667 13C2.16667 18.98 7.02 23.8333 13 23.8333C18.98 23.8333 23.8333 18.98 23.8333 13C23.8333 7.02 18.98 2.16666 13 2.16666ZM10.8333 17.875L6.5 13.5417L8.06167 11.98L10.8333 14.7517L17.9383 7.64666L19.5 9.20833L10.8333 17.875Z"
        fill={color}
      />
    </svg>
  );
};

export default CheckIcon;
