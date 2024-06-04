"use client";

import Button from "./Button";
import SizeOption from "./SizeOption";
import QuantityOption from "./QuantityOption";
import { products } from "@wix/stores";
import { useState } from "react";

type ProductOptionsProps = {
  product: products.Product;
};

const ProductPageOptions = ({ product }: ProductOptionsProps) => {
  const [selectedOptions, setSelectedOptions] = useState("");
  const [quantity, setQuantity] = useState(1);

  const sizes = product.productOptions;
  const productId = product._id;
  const stockNumber = product.stock?.quantity;
  const isInStock = product.stock?.inStock ? 10 : 0;

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
        <Button href="/" color="white">
          Ajouter au panier
        </Button>
      </div>
    </div>
  );
};

export default ProductPageOptions;
