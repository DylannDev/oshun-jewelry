/* eslint-disable react/no-unescaped-entities */
import BannerList from "@/components/BannerList";
import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";
import NotFound from "../not-found";

type ListPageProps = {
  searchParams: {
    cat?: string;
  };
};

const ListPage = async ({ searchParams }: ListPageProps) => {
  const { cat } = await searchParams;
  const wixClient = await wixClientServer();

  let category;
  try {
    category = await wixClient.collections.getCollectionBySlug(
      cat || "all-products"
    );
  } catch (error: any) {
    if (error?.details?.applicationError?.code === "CATEGORY_NOT_FOUND") {
      return <NotFound />;
    } else {
      throw error; // Autres erreurs non gérées
    }
  }

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
        />
      </Suspense>
    </>
  );
};

export default ListPage;
