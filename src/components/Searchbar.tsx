"use client";

import { SearchbarProps } from "@/types";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";

const Searchbar = ({ setIsVisible }: SearchbarProps) => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;

    if (name) {
      router.push(`/list?name=${name}`);
    }
  };

  return (
    <form
      className={`h-[50px] w-full flex items-center justify-between gap-4 bg-white border border-slate-300 hover:border-black py-2 px-4 rounded-full`}
      onSubmit={handleSearch}
    >
      <div className="flex items-center gap-1 w-full">
        <CiSearch className="text-2xl" />
        <input
          type="text"
          name="name"
          placeholder="Recherche..."
          className="bg-transparent placeholder:font-light placeholder:text-sm text-sm font-light flex-1 outline-none placeholder:text-slate-500 w-full"
        />
      </div>

      <TfiClose
        className="cursor-pointer "
        onClick={() => setIsVisible(false)}
      />
    </form>
  );
};

export default Searchbar;
