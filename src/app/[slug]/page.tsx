import ProductImages from "@/components/ProductImages";
import ProductPageOptions from "@/components/ProductPageOptions";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import AccordionDescription from "@/components/AccordionDescription";
import DOMPurify from "isomorphic-dompurify";
import ShopValues from "@/components/ShopValues";

type SinglePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SinglePage = async ({ params }: SinglePageProps) => {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug); // Décodage du slug
  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", decodedSlug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
  const sanitizedDescription = product.description
    ? DOMPurify.sanitize(product.description)
    : "";

  return (
    <>
      <div className="relative flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/5 lg:w-2/3 h-max">
          {product.media?.items && (
            <ProductImages images={product.media.items} />
          )}
        </div>
        <div className="relative w-full md:w-2/5 lg:w-1/3">
          <div className="sticky top-24 flex flex-col gap-4">
            <div className="">
              <h1 className="text-xl font-medium mb-2">{product.name}</h1>
              {product.priceData?.price ===
              product.priceData?.discountedPrice ? (
                <h2 className="">€{product.priceData?.price}</h2>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="text-lg text-gray-500 line-through">
                    €{product.priceData?.price}
                  </h3>
                  <h2 className="font-medium text-2xl">
                    €{product.priceData?.discountedPrice}
                  </h2>
                </div>
              )}
            </div>
            <div className="h-[1px] bg-gray-300" />
            {product && <ProductPageOptions product={product} />}
            <AccordionDescription sanitizedDescription={sanitizedDescription} />
          </div>
        </div>
      </div>
      <ShopValues />
    </>
  );
};

export default SinglePage;
