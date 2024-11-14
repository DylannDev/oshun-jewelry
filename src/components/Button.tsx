"use client";

import Link from "next/link";
import React, { ReactNode } from "react";

type ColorOption = "white" | "black" | "green" | "red";
type WidthOption = "large" | "normal";

type ButtonProps = {
  children?: string;
  icon?: ReactNode;
  href?: string;
  color?: ColorOption;
  width?: WidthOption;
  disabled?: boolean;
  button?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  children,
  icon,
  href,
  color = "black",
  width = "large",
  disabled = false,
  button = false,
  onClick,
}: ButtonProps) => {
  const baseClasses =
    "rounded-lg py-3 px-4 font-semibold text-center whitespace-nowrap uppercase text-[13px] tracking-wider";
  const widthClass = width === "large" ? "w-full" : "w-fit";
  const colorClasses = {
    white:
      "bg-white ring-1 ring-gray-300 text-black hover:bg-gray-100 active:bg-gray-200",
    black: "bg-black hover:bg-black/90 active:bg-black/70 text-white",
    green: "bg-green-600 text-white hover:bg-green-500 active:bg-green-400",
    red: "bg-red-600 text-white hover:bg-red-500 active:bg-red-400",
  };

  const classes = `${baseClasses} ${widthClass} ${colorClasses[color]} ${
    disabled ? "cursor-not-allowed opacity-75" : ""
  }`;

  const content = (
    <>
      {icon && <span className="">{icon}</span>}
      {children || (icon ? null : "")}
    </>
  );

  return button ? (
    <button className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  ) : (
    <Link href={href || ""} className={classes}>
      {content}
    </Link>
  );
};

export default Button;
