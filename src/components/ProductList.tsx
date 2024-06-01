import { wixClientServer } from "@/lib/wixClientServer";
import ProductCard from "./ProductCard";
import { products } from "@wix/stores";

const PRODUCT_PER_PAGE = 20;

type ProductListProps = {
  categoryId: string;
  limit?: number;
  searchParams?: { name?: string; sort?: string };
};

const ProductList = async ({
  categoryId,
  limit,
  searchParams = {},
}: ProductListProps) => {
  const wixClient = await wixClientServer();
  const productQuery = await wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .limit(limit || PRODUCT_PER_PAGE);

  // Trier les produit par ordre croissant ou décroissant
  const sortType = searchParams.sort?.toLowerCase();
  const sortedByPriceQuery =
    sortType === "descending"
      ? productQuery.descending("price")
      : sortType === "ascending"
      ? productQuery.ascending("price")
      : productQuery;

  const products = await sortedByPriceQuery.find();

  // Trier les produits par catégorie
  const filteredProducts = products.items.filter((product: products.Product) =>
    product.name
      ?.toLowerCase()
      .includes((searchParams?.name || "").toLowerCase())
  );

  // console.log(products.items[11].productOptions[0].choices);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
      {filteredProducts.map((product: products.Product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
