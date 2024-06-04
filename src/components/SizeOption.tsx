"use client";

import { products } from "@wix/stores";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type sizeOptionsProps = {
  sizeOptions: products.ProductOption[];
  selectedOptions: string;
  setSelectedOptions: Dispatch<SetStateAction<string>>;
};

const SizeOption = ({
  sizeOptions,
  selectedOptions,
  setSelectedOptions,
}: sizeOptionsProps) => {
  const handleSizeOption = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOptions(event.target.value);
  };

  const options = sizeOptions[0].choices;

  // console.log("selectedOptions", selectedOptions);

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs uppercase font-bold">Taille</h4>
      <select
        name="type"
        className="py-3 px-4 rounded-lg text-sm font-light bg-gray-100 outline-none"
        value={selectedOptions}
        onChange={handleSizeOption}
      >
        <option value="">Sélectionner</option>
        {options &&
          options.map(
            (size, index) =>
              options[index].inStock && (
                <option key={size.value} value={size.value}>
                  {size.value}
                </option>
              )
          )}
      </select>
    </div>
  );
};

export default SizeOption;
