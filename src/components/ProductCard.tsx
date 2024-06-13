import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { products } from "@wix/stores";

type ProductCardProps = { product: products.Product };

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Link href={`/${product.slug}`} className="cursor-pointer">
        <div className="relative w-full h-64 sm:h-96 lg:h-80 ring-1 ring-gray-300 rounded-lg">
          {product.media?.mainMedia?.image?.url && (
            <Image
              src={product.media?.mainMedia?.image?.url}
              alt="baya bin bin oshun jewelry bijoux fantaisie"
              fill
              sizes="50vw"
              className="object-cover rounded-lg"
            />
          )}
        </div>
      </Link>
      <div className="flex justify-between">
        <span className="font-medium">{product.name}</span>
      </div>
      <div className="flex">
        <span className="font-semibold w-1/2">€{product.price?.price}</span>
        <Button href="/" width="large">
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
