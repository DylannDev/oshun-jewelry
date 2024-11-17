"use client";

import { useEffect } from "react";

type QuantityProps = {
  quantity: number;
  setQuantity: (newQuantity: number) => void;
  stockNumber: number;
  showTitle?: boolean;
  small?: boolean;
};

const QuantityOption = ({
  quantity,
  setQuantity,
  stockNumber,
  showTitle = true,
  small = false,
}: QuantityProps) => {
  useEffect(() => {
    if (stockNumber === 0) {
      setQuantity(0);
    }
  }, [stockNumber, setQuantity]);

  const handleQuantity = (type: "increase" | "decrease") => {
    if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (type === "increase" && quantity < stockNumber) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {showTitle && <h4 className="text-xs uppercase font-bold">Quantité</h4>}
      <div
        className={`flex items-center justify-between bg-white border border-gray-200 rounded-lg  ${
          small ? "gap-2" : "w-32 py-2 gap-4"
        }`}
      >
        <button
          className={`cursor-pointer text-xl font-light ${
            small ? "px-2" : "px-4"
          }`}
          onClick={() => handleQuantity("decrease")}
          disabled={quantity <= 1}
        >
          -
        </button>
        <div className="text-sm">{quantity}</div>
        <button
          className={`cursor-pointer text-xl font-light ${
            small ? "px-2" : "px-4"
          }`}
          onClick={() => handleQuantity("increase")}
          disabled={quantity >= stockNumber}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityOption;
