/* eslint-disable react/no-unescaped-entities */
"use client";

import { collections } from "@wix/stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select from "./Select";

type FilterProps = { categories: collections.Collection[]; sizes: string[] };

const Filter = ({ categories, sizes }: FilterProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());

    if (name === "cat" && value) {
      params.delete("size");
    }

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const categoryOptions = categories
    .filter(
      (category) => category._id !== "00000000-000000-000000-000000000001"
    )
    .map((category) => ({
      label: category.name || "",
      value: category.slug || "",
    }));

  const sizeOptions = sizes.map((size) => ({
    label: size,
    value: size,
  }));

  return (
    <div className="py-6 flex gap-2 justify-between border-b border-x border-gray-200 px-4">
      <div className="flex gap-2 w-2/3 sm:w-full">
        <div className="max-w-48 w-full">
          <Select
            name="cat"
            options={categoryOptions}
            onChange={handleFilterChange}
            placeholder="Catégories"
          />
        </div>
        <div className="max-w-48 w-full">
          <Select
            name="size"
            options={sizeOptions}
            onChange={handleFilterChange}
            placeholder="Taille"
            value={searchParams.get("size") || ""}
          />
        </div>
      </div>
      <div className="max-w-48 w-1/3 sm:w-full">
        <Select
          name="sort"
          options={[
            { label: "Prix croissant", value: "ascending" },
            { label: "Prix décroissant", value: "descending" },
          ]}
          onChange={handleFilterChange}
          placeholder="Trier par"
        />
      </div>
    </div>
  );
};

export default Filter;
