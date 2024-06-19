"use client";

import Button from "./Button";
import SizeOption from "./SizeOption";
import QuantityOption from "./QuantityOption";
import { products } from "@wix/stores";
import useWixClient from "@/hooks/useWixClient";
import { useEffect, useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { findMatchingVariant } from "@/utils/array";

type ProductOptionsProps = {
  product: products.Product;
};

const ProductPageOptions = ({ product }: ProductOptionsProps) => {
  const [selectedOptions, setSelectedOptions] = useState("");
  const [variantId, setVariantId] = useState("");
  const [quantity, setQuantity] = useState(1);

  const sizes = product.productOptions;
  const productId = product._id!;
  // const variantId = "00000000-0000-0000-0000-000000000000";
  const stockNumber = product.stock?.quantity;
  const isInStock = product.stock?.inStock ? 10 : 0;

  const wixClient = useWixClient();

  const { addItem } = useCartStore();

  const clearCart = async () => {
    try {
      const currentCart = await wixClient.currentCart.getCurrentCart();
      if (
        currentCart &&
        currentCart.lineItems &&
        currentCart.lineItems.length > 0
      ) {
        await wixClient.currentCart.deleteCurrentCart();
        console.log("Cart cleared");
      } else {
        console.log("No cart found or cart is already empty");
      }
    } catch (error: any) {
      if (error.message.includes("OWNED_CART_NOT_FOUND")) {
        console.log("No cart found for the current user");
      } else {
        console.error("An error occurred while clearing the cart:", error);
      }
    }
  };

  useEffect(() => {
    const selectedVariantId = findMatchingVariant(
      selectedOptions,
      product.variants || []
    );
    setVariantId(selectedVariantId || "");
  }, [selectedOptions, product.variants]);

  console.log("variantId", variantId);

  return (
    <div className="flex flex-col gap-8">
      {sizes && (
        <SizeOption
          sizeOptions={sizes}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      )}

      <QuantityOption
        quantity={quantity}
        setQuantity={setQuantity}
        stockNumber={stockNumber ? stockNumber : isInStock}
      />

      <div className="flex flex-col gap-4">
        <Button onClick={clearCart} button>
          Vider cart
        </Button>
        <Button
          color="white"
          onClick={() =>
            addItem(wixClient, productId, variantId, selectedOptions, quantity)
          }
          button
        >
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};

export default ProductPageOptions;
