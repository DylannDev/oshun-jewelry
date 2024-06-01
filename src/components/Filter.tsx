/* eslint-disable react/no-unescaped-entities */
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Filter = ({}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const params = new URLSearchParams(searchParams.toString());
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
          name="size"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-200 outline-none"
          onChange={handleFilterChange}
        >
          <option value="">Taille</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
        <select
          name="cat"
          id=""
          className="py-2 px-4 rounded-2xl text-xs font-medium bg-gray-200 outline-none"
          onChange={handleFilterChange}
        >
          <option value="">Catégories</option>
          <option value="chaîne-de-taille">Chaînes de Taille</option>
          <option value="Chaîne de Pied">Chaînes de Pied</option>
          <option value="Boucles d'oreilles">Boucles d'oreilles</option>
          <option value="Bracelets">Bracelets</option>
          <option value="Colliers">Colliers</option>
          <option value="Bagues">Bagues</option>
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
