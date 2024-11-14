import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";
import ShopValues from "@/components/ShopValues";

const HomePage = async () => {
  const wixClient = await wixClientServer();
  const categories = await wixClient.collections.queryCollections().find();

  return (
    <div className="">
      <Slider />
      <div className="mt-24">
        <h1 className="heading-home">Nouveautés</h1>
        <Suspense fallback={"loading"}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={5}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="heading-home">Nos produits</h1>
        <Suspense fallback={"loading"}>
          <CategoryList categories={categories} />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="heading-home">Tendances</h1>
        <Suspense fallback={"loading"}>
          <ProductList
            categoryId={process.env.TRENDING_PRODUCTS_CATEGORY_ID!}
            limit={5}
          />
        </Suspense>
      </div>
      <ShopValues />
    </div>
  );
};

export default HomePage;
