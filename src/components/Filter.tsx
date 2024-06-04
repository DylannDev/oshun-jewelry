/* eslint-disable react/no-unescaped-entities */
"use client";

import { collections } from "@wix/stores";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  return (
    <div className="mt-12 flex justify-between">
      <div className="flex gap-6 flex-wrap">
        <select
          name="cat"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-200 outline-none"
          onChange={handleFilterChange}
        >
          <option value="all-products">Catégories</option>
          {categories.map(
            (category) =>
              category._id !== "00000000-000000-000000-000000000001" && (
                <option key={category._id} value={category.slug || ""}>
                  {category.name}
                </option>
              )
          )}
        </select>
        <select
          name="size"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-200 outline-none"
          onChange={handleFilterChange}
          value={searchParams.get("size") || ""}
        >
          <option value="">Taille</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-6 h-fit">
        <select
          name="sort"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-200 outline-none"
          onChange={handleFilterChange}
        >
          <option value="">Trier par</option>
          <option value="ascending">Prix croissant</option>
          <option value="descending">Prix décroissant</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
