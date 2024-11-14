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

  const handleAddToCart = () => {
    addItem(wixClient, productId, quantity, selectedOptions);
  };

  return (
    <div className="flex flex-col gap-8">
      {sizes && (
        <SizeOption
          sizeOptions={sizes}
          selectedOptions={selectedOptions}
          setSelectedOptions={(value) => setSelectedOptions(productId, value)}
        />
      )}

      <QuantityOption
        quantity={quantity}
        setQuantity={(value) => setQuantity(productId, value)}
        stockNumber={stockNumber ? stockNumber : isInStock}
      />

      <Button onClick={handleAddToCart} disabled={isLoading} button>
        Ajouter au panier
      </Button>
    </div>
  );
};

export default ProductPageOptions;
