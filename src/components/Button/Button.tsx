import { cn } from "../../utilities/tailwind-marge/tailwind_marge";
import React, { FC } from "react";
import LoadingSpinner from "../../../public/LoadingSpinner.svg";
import Image from "next/image";

const variants = {
  primary: "bg-blue-500  text-white hover:bg-blue-800 ",
  disabled: " bg-gray-200 text-gray-500 cursor-not-allowed",
  secondary: "bg-gray-200 text-gray-500 hover:bg-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700",
  success: "bg-green-200 text-green-500 ",
  poor: "bg-orange-200 text-orange-400",
  default: "hover:bg-gray-200 text-gray-700",
  white: "bg-white  hover:bg-gray-100 text-gray-700 border-2 ",
  outline: "hover:bg-gray-100 text-gray-700 border",
};

const sizes = {
  xs: "px-2 py-2 text-sm w-20",
  xxs: "px-0.5 py-1 text-[8px] w-10 ",
  sm: "px-3 py-2.5 text-sm w-24",
  md: "px-6 py-3.5 text-base w-32 ",
  lg: "px-4 py-2 text-lg w-44 lg:w-52",
  xl: "px-10 py-3 text-xl w-80 md:w-96",
  xl2: "px-10 py-4 text-xl  w-80 md:w-96",
  icon: "",
};

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  icon?: React.ReactNode;
  testId?: string;
  onClick?: (e: React.FormEvent<HTMLButtonElement>) => void | Promise<void>;
}

export const Button: FC<ButtonProps> = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      onClick,
      disabled,
      type = "button",
      children,
      size = "md",
      className = "",
      icon,
      isLoading,
      variant = "default",
      ...props
    },
    ref
  ) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled || isLoading}
        type={type}
        ref={ref}
        {...props}
        className={cn(
          "p-2 flex flex-shrink-0 shadow-sm justify-center items-center space-x-1 rounded-full font-medium",
          `${disabled || isLoading ? variants["disabled"] : variants[variant]}`,
          sizes[size],
          className
        )}
      >
        {isLoading ? (
          <div className="flex items-center gap-1 justify-between">
            <span className="text-[10px] md:text-[14px] ">Loading....</span>
            <Image
              alt="loading_Spinner"
              src={LoadingSpinner}
              width={25}
              height={25}
              className="m-auto bg-inherit rounded-full "
            />
          </div>
        ) : (
          <>
            {icon && icon}
            <span>{children}</span>
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
