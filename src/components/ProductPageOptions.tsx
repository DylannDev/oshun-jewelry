"use client";

import Button from "./Button";
import SizeOption from "./SizeOption";
import QuantityOption from "./QuantityOption";
import { products } from "@wix/stores";
import useWixClient from "@/hooks/useWixClient";
import { useState } from "react";
import { useCartStore } from "@/hooks/useCartStore";

type ProductOptionsProps = {
  product: products.Product;
};

const ProductPageOptions = ({ product }: ProductOptionsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const sizes = product.productOptions;
  const productId = product._id || "";
  const variantId = "00000000-0000-0000-0000-000000000000";
  const stockNumber = product.stock?.quantity;
  const isInStock = product.stock?.inStock ? 10 : 0;

  const wixClient = useWixClient();

  // const { addItem } = useCartStore();

  const addProduct = async () => {
    const response = await wixClient.currentCart.addToCurrentCart({
      lineItems: [
        {
          catalogReference: {
            appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
            catalogItemId: productId,
            options: { variantId: variantId },
          },
          quantity: 1,
        },
      ],
    });
    console.log(response);
  };

  return (
    <div className="flex flex-col gap-8">
      {sizes && (
        <SizeOption
          sizeOptions={sizes}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      )}
      {productId && (
        <QuantityOption
          quantity={quantity}
          setQuantity={setQuantity}
          productId={productId}
          stockNumber={stockNumber ? stockNumber : isInStock}
        />
      )}
      <div className="flex flex-col gap-4">
        <Button href="/">Acheter</Button>
        <Button color="white" onClick={addProduct} button>
          Ajouter au panier
        </Button>
        {/* <Button
          color="white"
          onClick={() => addItem(wixClient, productId, variantId, quantity)}
          button
        >
          Ajouter au panier
        </Button> */}
      </div>
    </div>
  );
};

export default ProductPageOptions;
