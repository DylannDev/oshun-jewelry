"use client";

import ProductCard from "./ProductCard";
import { products } from "@wix/stores";
import { useSearchParams, usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import useWixClient from "@/hooks/useWixClient";
import Loader from "./Loader";

const PRODUCT_PER_PAGE = 8;

type ProductListProps = {
  categoryId: string;
  limit?: number;
};

const ProductList = ({ categoryId, limit }: ProductListProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [products, setProducts] = useState<products.Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0); // Nombre total de produits

  const wixClient = useWixClient();

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    const name = searchParams.get("name") || "";
    const size = searchParams.get("size") || "";
    const sort = searchParams.get("sort") || "";

    let productQuery = wixClient.products
      .queryProducts()
      .eq("collectionIds", categoryId)
      .limit(limit || PRODUCT_PER_PAGE)
      .skip(page * (limit || PRODUCT_PER_PAGE));

    const response = await productQuery.find();

    const filtered = response.items.filter((product: products.Product) => {
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

    setProducts((prev) => [...prev, ...filtered]);
    setTotalProducts(response.totalCount || 0); // Met à jour le nombre total de produits
    setHasMore(response.hasNext());
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts(0); // Charge la première page
    setCurrentPage(0);
    setProducts([]); // Réinitialiser les produits sur changement de paramètres
  }, [categoryId, searchParams, limit]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          fetchProducts(currentPage + 1);
          setCurrentPage((prev) => (prev !== undefined ? prev + 1 : 0)); // Ajout d'une vérification pour éviter l'erreur
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [currentPage, hasMore, isLoading]);

  const gridColumns = pathname === "/" ? "xl:grid-cols-5" : "xl:grid-cols-4";

  const counter = Math.min(products.length, totalProducts);

  return (
    <>
      {isLoading && products.length === 0 ? (
        <Loader /> // Loader affiché pendant le premier chargement
      ) : pathname !== "/" && products.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <p className="sm:text-lg">
            Aucun article trouvé. Essayez de modifier votre recherche.
          </p>
        </div>
      ) : (
        <>
          <div
            className={`grid grid-cols-2 min-[900px]:grid-cols-3 ${gridColumns} gap-2 ${
              pathname !== "/" && "mb-16"
            }`}
          >
            {products.map((product: products.Product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
          {pathname !== "/" && (
            <p className="text-sm text-gray-600 mb-4 text-center">
              Affichage de 1 à {counter} sur {totalProducts} Articles
            </p>
          )}
          {isLoading && <Loader />}
          <div ref={observerRef} className="h-4"></div>
        </>
      )}
    </>
  );
};

export default ProductList;
