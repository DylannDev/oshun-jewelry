// "use client";

import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { wixClientServer } from "@/lib/wixClientServer";

import { Suspense, useEffect } from "react";

const HomePage = async () => {
  // const wixClient = useWixClient();

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await wixClient.products.queryProducts().find();
  //     console.log(res);
  //   };

  //   getProducts();
  // }, [wixClient]);

  const wixClient = await wixClientServer();

  const res = await wixClient.products.queryProducts().find();

  return (
    <div className="">
      <Slider />
      <div className="mt-24">
        <h1 className="text-2xl mb-8">Les Nouveautés</h1>
        <Suspense fallback={"loading"}>
          <ProductList
            categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl">Nos produits</h1>
        <Suspense fallback={"loading"}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl mb-8">Les Bayas avec pierre</h1>
        {/* <ProductList /> */}
      </div>
    </div>
  );
};

export default HomePage;
