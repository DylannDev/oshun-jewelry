/* eslint-disable react/no-unescaped-entities */
import BannerList from "@/components/BannerList";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";

type ListPageProps = {
  searchParams: any;
};

const ListPage = async ({ searchParams }: ListPageProps) => {
  const wixClient = await wixClientServer();
  const category = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );
  const categories = (await wixClient.collections.queryCollections().find())
    .items;

  const products = await wixClient.products
    .queryProducts()
    .eq("collectionIds", category.collection?._id)
    .limit(20)
    .find();

  const sizesSet = new Set<string>();
  products.items.forEach((product) => {
    product.productOptions &&
      product.productOptions[0]?.choices?.forEach((choice) => {
        if (choice.value) {
          sizesSet.add(choice.value);
        }
      });
  });

  const sizes = Array.from(sizesSet);

  // Définir l'ordre des tailles
  const sizeOrder = ["XS", "S", "M", "L", "XL", "XXL"];

  // Trier les tailles selon l'ordre défini
  sizes.sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));

  console.log("sizes", sizes);

  return (
    <>
      <BannerList />
      <Filter categories={categories} sizes={sizes} />
      <h1 className="mt-12 mb-8 text-xl font-semibold ">
        {category?.collection?.name}
      </h1>
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
