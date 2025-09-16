import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="font-semibold rounded-full px-4 py-2 bg-[#21124E] text-white min-w-[100px] m-3 hover:bg-white hover:text-purple-950 hover:font-semibold"
      {...props} 
    >
      {children}
    </button>
  );
};

export default Button;
