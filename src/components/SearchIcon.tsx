"use client";

import { SearchIconProps } from "@/types";
import { CiSearch } from "react-icons/ci";

const SearchIcon = ({ isVisible, setIsVisible }: SearchIconProps) => {
  if (isVisible) return null;

  return (
    <div
      onClick={() => setIsVisible(true)}
      className="hover:bg-black/5 p-2 rounded-xl cursor-pointer"
    >
      <CiSearch className="text-3xl" />
    </div>
  );
};

export default SearchIcon;
