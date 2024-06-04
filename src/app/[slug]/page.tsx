import ProductImages from "@/components/ProductImages";
import ProductPageOptions from "@/components/ProductPageOptions";
import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";

type SinglePageProps = {
  params: {
    slug: string;
  };
};

const SinglePage = async ({ params }: SinglePageProps) => {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }

  const product = products.items[0];
  const sanitizedDescription = product.description
    ? DOMPurify.sanitize(product.description)
    : "";

  return (
    <div className="relative flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max ">
        <ProductImages images={product.media?.items} />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="font-medium text-2xl ">€{product.price?.price} </h2>
        ) : (
          <div className="flex items-center gap-2">
            <h3 className="text-lg text-gray-500 line-through ">
              €{product.price?.price}
            </h3>
            <h2 className="font-medium text-2xl ">
              €{product.price?.discountedPrice}{" "}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100" />
        {product && <ProductPageOptions product={product} />}
        <div className="h-[2px] bg-gray-100" />
        <div className="">
          <h4 className="text-xs uppercase font-bold mb-4">Description</h4>
          <div
            className="text-gray-500 text-sm"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(sanitizedDescription),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
