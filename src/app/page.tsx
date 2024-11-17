import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { wixClientServer } from "@/lib/wixClientServer";
import ShopValues from "@/components/ShopValues";

const HomePage = async () => {
  const wixClient = await wixClientServer();
  const categories = await wixClient.collections.queryCollections().find();

  return (
    <div className="flex-grow">
      <Slider />
      <div className="mt-24">
        <h1 className="heading-home">Nouveautés</h1>
        <ProductList
          categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
          limit={5}
        />
      </div>
      <div className="mt-24">
        <h1 className="heading-home">Nos articles</h1>
        <CategoryList categories={categories} />
      </div>
      <div className="mt-24">
        <h1 className="heading-home">Tendances</h1>
        <ProductList
          categoryId={process.env.TRENDING_PRODUCTS_CATEGORY_ID!}
          limit={5}
        />
      </div>
      <ShopValues />
    </div>
  );
};

export default HomePage;
