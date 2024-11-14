"use client";

import Button from "./Button";
import SizeOption from "./SizeOption";
import QuantityOption from "./QuantityOption";
import { products } from "@wix/stores";
import useWixClient from "@/hooks/useWixClient";
import { useEffect } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import { findMatchingVariant } from "@/utils/array";
import { useProductOptionsStore } from "@/hooks/useProductOptionsStore";

type ProductOptionsProps = {
  product: products.Product;
};

const ProductPageOptions = ({ product }: ProductOptionsProps) => {
  const productId = product._id!;
  const { productOptions, setSelectedOptions, setQuantity } =
    useProductOptionsStore();

  const selectedOptions = productOptions[productId]?.selectedOptions || "";
  const quantity = productOptions[productId]?.quantity || 1;

  const sizes = product.productOptions;
  const stockNumber = product.stock?.quantity;
  const isInStock = product.stock?.inventoryStatus === "IN_STOCK" ? 10 : 0;

  const wixClient = useWixClient();
  const { addItem, isLoading } = useCartStore();

<<<<<<< HEAD
  const handleAddToCart = () => {
    addItem(wixClient, productId, quantity, selectedOptions);
  };
=======
  const { addItem } = useCartStore();

  // const addProduct = async () => {
  //   const { cart } = await wixClient.currentCart.addToCurrentCart({
  //     lineItems: [
  //       {
  //         catalogReference: {
  //           appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
  //           catalogItemId: productId,
  //           options: { variantId: variantId },
  //         },
  //         quantity: quantity,
  //       },
  //     ],
  //   });
  //   console.log(cart);
  // };
>>>>>>> main

  return (
    <div className="flex flex-col gap-8">
      {sizes && (
        <SizeOption
          sizeOptions={sizes}
          selectedOptions={selectedOptions}
<<<<<<< HEAD
          setSelectedOptions={(value) => setSelectedOptions(productId, value)}
=======
          setSelectedOptions={setSelectedOptions}
>>>>>>> main
        />
      )}

      <QuantityOption
        quantity={quantity}
<<<<<<< HEAD
        setQuantity={(value) => setQuantity(productId, value)}
        stockNumber={stockNumber ? stockNumber : isInStock}
      />

      <Button onClick={handleAddToCart} disabled={isLoading} button>
        Ajouter au panier
      </Button>
=======
        setQuantity={setQuantity}
        stockNumber={stockNumber ? stockNumber : isInStock}
      />

      <div className="flex flex-col gap-4">
        <Button href="/">Acheter</Button>
        <Button
          color="white"
          onClick={() => addItem(wixClient, productId, variantId, quantity)}
          button
        >
          Ajouter au panier
        </Button>
      </div>
>>>>>>> main
    </div>
  );
};

export default ProductPageOptions;
