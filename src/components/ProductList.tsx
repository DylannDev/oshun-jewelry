"use client";

import ProductCard from "./ProductCard";
import { products } from "@wix/stores";
import Pagination from "./Pagination";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import useWixClient from "@/hooks/useWixClient";

const PRODUCT_PER_PAGE = 8;

type ProductListProps = {
  categoryId: string;
  limit?: number;
};

const ProductList = ({ categoryId, limit }: ProductListProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [filteredProducts, setFilteredProducts] = useState<products.Product[]>(
    []
  );

  const [pagination, setPagination] = useState({
    currentPage: 0,
    hasPrev: false,
    hasNext: false,
  });

  const wixClient = useWixClient();

  useEffect(() => {
    const fetchProducts = async () => {
      const name = searchParams.get("name") || "";
      const size = searchParams.get("size") || "";
      const sort = searchParams.get("sort") || "";
      const page = parseInt(searchParams.get("page") || "0", 10);

      let productQuery = wixClient.products
        .queryProducts()
        .eq("collectionIds", categoryId)
        .limit(limit || PRODUCT_PER_PAGE)
        .skip(page * (limit || PRODUCT_PER_PAGE));

      const products = await productQuery.find();

      let filtered = products.items.filter((product: products.Product) => {
        const matchesName = product.name
          ?.toLowerCase()
          .includes(name.toLowerCase());

        const matchesSize =
          !size ||
          (product.productOptions &&
            product.productOptions[0]?.choices?.some(
              (choice) => choice.value === size
            ));

        return matchesName && matchesSize;
      });

      if (sort) {
        filtered = filtered.sort((a, b) => {
          const priceA = a.priceData?.price || 0;
          const priceB = b.priceData?.price || 0;
          return sort === "ascending" ? priceA - priceB : priceB - priceA;
        });
      }

      setFilteredProducts(filtered);
      setPagination({
        currentPage: products.currentPage || 0,
        hasPrev: products.hasPrev(),
        hasNext: products.hasNext(),
      });
    };

    fetchProducts();
  }, [searchParams, categoryId, limit, wixClient]);

  const gridColumns = pathname === "/" ? "xl:grid-cols-5" : "xl:grid-cols-4";

  return (
    <>
      <div className={`grid grid-cols-2 lg:grid-cols-3 ${gridColumns} gap-2`}>
        {filteredProducts.map((product: products.Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {(searchParams.get("cat") ||
        searchParams.get("name") ||
        searchParams.get("size")) && (
        <Pagination
          currentPage={pagination.currentPage}
          hasPrev={pagination.hasPrev}
          hasNext={pagination.hasNext}
        />
      )}
    </>
  );
};

export default ProductList;
