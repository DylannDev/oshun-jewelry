"use client";

import Image from "next/image";
import { currentCart } from "@wix/ecom";
import { useCartStore } from "@/hooks/useCartStore";
import useWixClient from "@/hooks/useWixClient";
import { media as wixMedia } from "@wix/sdk";
import QuantityOption from "./QuantityOption"; // Import du composant QuantityOption
import { CiTrash } from "react-icons/ci";

type CartItemProps = { cartItem: currentCart.LineItem };

const CartItem = ({ cartItem }: CartItemProps) => {
  const wixClient = useWixClient();
  const { removeItem, updateItemQuantity, isLoading } = useCartStore();

  // Gestionnaire de changement de quantité
  const handleQuantityChange = (newQuantity: number) => {
    if (cartItem._id) {
      updateItemQuantity(wixClient, cartItem._id, newQuantity);
    }
  };

  return (
    <div className="flex gap-4">
      <div className="w-28 sm:w-1/4 relative aspect-square">
        {cartItem.image && (
          <Image
            src={wixMedia.getScaledToFillImageUrl(cartItem.image, 144, 192, {})}
            alt="Image produit"
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-col justify-between w-3/4 flex-grow">
        <div className="flex flex-col justify-between">
          <h3 className="text-sm sm:text-base font-medium mb-1 line-clamp-1">
            {cartItem.productName?.original}
          </h3>
          <div className="text-sm font-medium">€{cartItem.price?.amount}</div>
          <span className="text-sm text-gray-500">
            {cartItem.catalogReference?.options?.options?.Taille}
          </span>
        </div>

        <div className="flex justify-between">
          <QuantityOption
            quantity={cartItem.quantity ?? 1}
            setQuantity={handleQuantityChange}
            stockNumber={10}
            showTitle={false}
            small
          />
          <div
            className={`flex items-center justify-between text-sm p-1 border border-gray-300 rounded-lg hover:text-red-light ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <CiTrash
              className={`text-xl`}
              onClick={() => removeItem(wixClient, cartItem._id!)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
