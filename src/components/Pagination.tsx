"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Button from "./Button";

type PaginationProps = {
  currentPage: number;
  hasPrev: boolean;
  hasNext: boolean;
};

const Pagination = ({ currentPage, hasPrev, hasNext }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-12 flex justify-between w-full">
      <Button
        width="normal"
        disabled={!hasPrev}
        onClick={() => createPageUrl(currentPage - 1)}
        button
      >
        Précédent
      </Button>
      <Button
        width="normal"
        disabled={!hasNext}
        onClick={() => createPageUrl(currentPage + 1)}
        button
      >
        Suivant
      </Button>
    </div>
  );
};

export default Pagination;
