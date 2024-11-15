"use client";

import Image from "next/image";
import { RiDeleteBin2Line } from "react-icons/ri";
import { currentCart, cart } from "@wix/ecom";
import { useCartStore } from "@/hooks/useCartStore";
import useWixClient from "@/hooks/useWixClient";
import { media as wixMedia } from "@wix/sdk";

type cartItemProps = { cartItem: currentCart.LineItem };

const CartItem = ({ cartItem }: cartItemProps) => {
  const wixClient = useWixClient();

  const { removeItem, isLoading } = useCartStore();

  return (
    <div className="flex justify-between">
      <div className="w-24 h-24 relative rounded-lg ring-1 ring-gray-300">
        {cartItem.image && (
          <Image
            src={wixMedia.getScaledToFillImageUrl(cartItem.image, 72, 96, {})}
            alt="baya bin bin oshun jewelry"
            fill
            className="object-cover rounded-lg"
          />
        )}
      </div>
      <div className="flex flex-col justify-between gap-8">
        <div>
          <div className="flex items-center justify-between gap-12">
            <h3 className="font-semibold">{cartItem.productName?.original}</h3>
            <div className="">{cartItem.price?.amount}€</div>
          </div>
          {/* <div className="text-xs text-green-500">En stock</div> */}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Quantité: {cartItem.quantity}x</span>
          <span className="text-gray-500">
            Taille: {cartItem.catalogReference?.options?.variantName}
          </span>
          <RiDeleteBin2Line
            className={`text-xl hover:text-red-light ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => removeItem(wixClient, cartItem._id!)}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
