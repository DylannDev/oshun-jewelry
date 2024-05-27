/* eslint-disable react/no-unescaped-entities */
import BannerList from "@/components/BannerList";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();
  const category = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );

  return (
    <>
      <BannerList />
      <Filter />
      <h1 className="mt-12 mb-8 text-xl font-semibold ">Nos Bayas</h1>
      <Suspense fallback="Chargement...">
        <ProductList
          categoryId={
            category.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </>
  );
};

export default ListPage;
