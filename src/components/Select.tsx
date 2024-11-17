import React from "react";
import { PiCaretDown } from "react-icons/pi";

type SelectProps = {
  name: string;
  options: { label: string; value: string }[];
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
};

const Select = ({
  name,
  options,
  value,
  onChange,
  placeholder,
}: SelectProps) => {
  return (
    <div className="relative w-full">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border hover:border-black bg-white rounded-lg px-2 py-[10px] sm:py-[12.5px] text-[10px] sm:text-xs outline-none focus:border-black appearance-none w-full"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <PiCaretDown className="text-gray-500 text-xs sm:text-sm" />
      </span>
    </div>
  );
};

export default Select;
