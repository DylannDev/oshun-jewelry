"use client";

import { products } from "@wix/stores";
import { Dispatch, SetStateAction, ChangeEvent, useEffect } from "react";
import { PiCaretDown } from "react-icons/pi";
import Select from "./Select";

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
  const options = sizeOptions[0]?.choices || [];
  const firstOption = options[0]?.value;

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

  const sizeValues = options
    .filter((size) => size.inStock && size.value)
    .map((size) => ({
      label: size.value || "",
      value: size.value || "",
    }));

  return (
    <div className="flex flex-col gap-2 w-full">
      {showTitle && <h4 className="text-xs uppercase font-bold">Taille</h4>}
      {useSelect ? (
        // Si `useSelect` est vrai, on utilise la balise <select>
        <Select
          name="type"
          options={sizeValues}
          value={selectedOptions}
          onChange={handleSelectChange}
          placeholder="Taille"
        />
      ) : (
        // Sinon, on utilise les boutons
        <div className="flex flex-row flex-wrap xl:flex-nowrap gap-2 w-full">
          {options &&
            options.map(
              (size) =>
                size.inStock &&
                size.value && (
                  <button
                    className={`flex justify-center w-fit min-[450px]:w-full md:w-fit xl:w-full min-w-[45px] max-w-[150px] border hover:border-black rounded-lg px-2 py-[10px] text-xs ${
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
