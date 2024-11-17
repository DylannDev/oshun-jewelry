import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { products } from "@wix/stores";
import { PiPlus, PiX } from "react-icons/pi";
import SizeOption from "./SizeOption";
import { useProductOptionsStore } from "@/hooks/useProductOptionsStore";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import useWixClient from "@/hooks/useWixClient";

type ProductCardProps = { product: products.Product };

const ProductCard = ({ product }: ProductCardProps) => {
  const wixClient = useWixClient();

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const { productOptions, setSelectedOptions } = useProductOptionsStore();
  const { addItem, isLoading } = useCartStore();

  const productId = product._id!;
  const selectedOptions = productOptions[productId]?.selectedOptions || "";
  const quantity = productOptions[productId]?.quantity || 1;

  const sizes = product.productOptions;
  const isInStock =
    product.stock?.inventoryStatus === "IN_STOCK" ? true : false;

  const handleAddToCart = () => {
    addItem(wixClient, productId, quantity, selectedOptions);
    setIsOptionsVisible(false);
  };

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-4 relative">
        <Link href={`/${product.slug}`} className="cursor-pointer">
          <div className="relative w-full aspect-[7/11]">
            {product.media?.mainMedia?.image?.url && (
              <Image
                src={product.media?.mainMedia?.image?.url}
                alt="baya bin bin oshun jewelry bijoux fantaisie"
                fill
                sizes="(max-width: 900px) 50vw, 25vw"
                className="object-cover"
              />
            )}
          </div>
        </Link>
        <div className="w-full absolute bottom-3 flex justify-center">
          {isOptionsVisible && sizes && isInStock && (
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 pt-6 sm:pt-8 w-full mx-2 sm:mx-3 relative">
              <span
                onClick={() => setIsOptionsVisible(false)}
                className="hover:bg-black/10 rounded-md p-1 absolute right-1 top-1 cursor-pointer"
              >
                <PiX className="text-sm" />
              </span>
              <div className="flex justify-center items-center gap-1 mb-2 sm:mb-3">
                <HiOutlineShoppingBag className="text-base sm:text-lg text-black" />
                <h4 className="text-[10px] sm:text-sm sm:font-medium">
                  Ajout rapide au panier
                </h4>
              </div>
              <div className="flex items-center gap-1 sm:gap-2 w-full">
                <SizeOption
                  sizeOptions={sizes}
                  selectedOptions={selectedOptions}
                  setSelectedOptions={(value) =>
                    setSelectedOptions(productId, value)
                  }
                  showTitle={false}
                  useSelect
                />
                <Button
                  icon={
                    <HiOutlineShoppingBag className="text-base sm:text-xl" />
                  }
                  onClick={handleAddToCart}
                  disabled={isLoading}
                  width="normal"
                  button
                />
              </div>
            </div>
          )}
          {!isOptionsVisible && isInStock && (
            <div
              className="bg-white/80 backdrop-blur-sm rounded-lg p-2 cursor-pointer"
              onClick={toggleOptionsVisibility}
            >
              <PiPlus className="text-sm sm:text-lg text-black" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <span className="text-xs font-medium">{product.name}</span>
        <span className="text-xs sm:text-base font-medium">
          €{product.priceData?.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
