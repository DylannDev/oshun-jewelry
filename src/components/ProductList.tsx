import { wixClientServer } from "@/lib/wixClientServer";
import ProductCard from "./ProductCard";
import { products } from "@wix/stores";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

type ProductListProps = {
  categoryId: string;
  limit?: number;
  searchParams?: { name?: string; sort?: string; size?: string; page?: string };
};

const ProductList = async ({
  categoryId,
  limit,
  searchParams = {},
}: ProductListProps) => {
  const wixClient = await wixClientServer();
  let productQuery = await wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  const products = await productQuery.find();

  // Trier les produits par catégorie et par taille
  let filteredProducts = products.items.filter((product: products.Product) => {
    const matchesName = product.name
      ?.toLowerCase()
      .includes((searchParams?.name || "").toLowerCase());

    const matchesSize =
      !searchParams.size ||
      (product.productOptions &&
        product.productOptions[0]?.choices?.some(
          (choice) => choice.value === searchParams.size
        ));

    return matchesName && matchesSize;
  });

  // Trier les produit par ordre croissant ou décroissant
  if (searchParams.sort) {
    const sortType = searchParams.sort?.toLowerCase();
    filteredProducts = filteredProducts.sort((a, b) => {
      const priceA = a.price?.price || 0;
      const priceB = b.price?.price || 0;
      return sortType === "ascending" ? priceA - priceB : priceB - priceA;
    });
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {filteredProducts.map((product: products.Product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={products.currentPage || 0}
        hasPrev={products.hasPrev()}
        hasNext={products.hasNext()}
      />
    </>
  );
};

export default ProductList;
