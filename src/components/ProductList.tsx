import { wixClientServer } from "@/lib/wixClientServer";
import ProductCard from "./ProductCard";
import { products } from "@wix/stores";

const PRODUCT_PER_PAGE = 20;

type ProductListProps = {
  categoryId: string;
  limit?: number;
  searchParams?: any;
};

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: ProductListProps) => {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("collectionIds", categoryId)
    .limit(limit || PRODUCT_PER_PAGE)
    .find();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
      {products.items.map((product: products.Product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
