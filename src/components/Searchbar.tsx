"use client";

import { SearchbarProps } from "@/types";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { useState, useEffect } from "react";

const Searchbar = ({ closeMenu, setIsVisible }: SearchbarProps) => {
  const router = useRouter();
  const [query, setQuery] = useState<string>(""); // État local pour la recherche
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  // Débounce la requête de recherche
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery) {
      router.push(`/list?name=${debouncedQuery}`);
      if (closeMenu) {
        closeMenu();
      }
    }
  }, [debouncedQuery, router]);

  return (
    <form
      className="h-[50px] w-full flex items-center justify-between gap-4 bg-white border border-slate-300 hover:border-black py-2 px-4 rounded-full"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex items-center gap-1 w-full">
        <CiSearch className="text-2xl" />
        <input
          type="text"
          name="name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Recherchez un article..."
          className="bg-transparent placeholder:font-light placeholder:text-sm text-sm font-light flex-1 outline-none placeholder:text-slate-500 w-full"
        />
      </div>

      {setIsVisible && (
        <TfiClose
          className="cursor-pointer"
          onClick={() => setIsVisible(false)}
        />
      )}
    </form>
  );
};

export default Searchbar;
