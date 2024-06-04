import Link from "next/link";
import React from "react";

type ColorOption = "white" | "black" | "green" | "red";
type WidthOption = "large" | "normal";

type ButtonProps = {
  children: string;
  href?: string;
  color?: ColorOption;
  width?: WidthOption;
  disabled?: boolean;
  button?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  children,
  href,
  color,
  width = "large",
  disabled,
  button,
  onClick,
}: ButtonProps) => {
  return button ? (
    <button
      className={`rounded-md py-3 px-4 font-semibold text-sm text-center whitespace-nowrap ${
        disabled && "disabled:cursor-not-allowed disabled:bg-gray-400"
      } ${width === "large" ? "w-full" : "w-fit"} ${
        color !== "white" && "text-white"
      } ${color === "white" && "bg-white ring-1 ring-gray-300 text-black"} ${
        color === "green" && "bg-green-600"
      } ${color === "red" && "bg-red-light"} ${color ? color : "bg-black"}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  ) : (
    <Link
      href={href || ""}
      className={`rounded-md py-3 px-4 font-semibold text-sm text-center whitespace-nowrap ${
        width === "large" ? "w-full" : "w-fit"
      } ${color !== "white" && "text-white"} ${
        color === "white" && "bg-white ring-1 ring-gray-300 text-black"
      } ${color === "green" && "bg-green-600"} ${
        color === "red" && "bg-red-light"
      } ${color ? color : "bg-black"}`}
    >
      {children}
    </Link>
  );
};

export default Button;
