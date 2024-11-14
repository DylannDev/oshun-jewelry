"use client";

import { products } from "@wix/stores";
import { Dispatch, SetStateAction, ChangeEvent, useEffect } from "react";
import { PiCaretDown } from "react-icons/pi";

type SizeOptionsProps = {
  sizeOptions: products.ProductOption[];
  selectedOptions: string;
  setSelectedOptions: Dispatch<SetStateAction<string>>;
  useSelect?: boolean; // Choisir entre <select> et les boutons
  showTitle?: boolean; // Affiche ou non le titre "Taille"
};

const SizeOption = ({
  sizeOptions,
  selectedOptions,
  setSelectedOptions,
  useSelect = false,
  showTitle = true,
}: SizeOptionsProps) => {
  const options = sizeOptions[0].choices;
  const firstOption = options && options[0].value;

  useEffect(() => {
    if (!selectedOptions && firstOption) {
      setSelectedOptions(firstOption);
    }
  }, [firstOption, selectedOptions, setSelectedOptions]);

  const handleSizeClick = (value: string) => {
    setSelectedOptions(value);
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOptions(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {showTitle && <h4 className="text-xs uppercase font-bold">Taille</h4>}
      {useSelect ? (
        // Si `useSelect` est vrai, on utilise la balise <select>
        <div className="relative w-full">
          <select
            name="type"
            className="border hover:border-black rounded-lg px-2 py-[12.5px] text-xs outline-none focus:border-black appearance-none w-full"
            value={selectedOptions}
            onChange={handleSelectChange}
          >
            {options &&
              options.map(
                (size) =>
                  size.inStock &&
                  size.value && (
                    <option key={size.value} value={size.value}>
                      {size.value}
                    </option>
                  )
              )}
          </select>
          <span className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <PiCaretDown className="text-gray-500" />
          </span>
        </div>
      ) : (
        // Sinon, on utilise les boutons
        <div className="flex items-center gap-2">
          {options &&
            options.map(
              (size) =>
                size.inStock &&
                size.value && (
                  <button
                    className={`flex justify-center w-full max-w-[150px] border hover:border-black rounded-lg px-2 py-[10px] text-xs ${
                      selectedOptions === size.value
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                    key={size.value}
                    onClick={() => handleSizeClick(size.value as string)}
                  >
                    <span>{size.value}</span>
                  </button>
                )
            )}
        </div>
      )}
    </div>
  );
};

export default SizeOption;
