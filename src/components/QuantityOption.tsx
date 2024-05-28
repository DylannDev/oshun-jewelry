"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

type QuantityProps = {
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  productId: string;
  stockNumber: number;
};

const QuantityOption = ({
  quantity,
  setQuantity,
  productId,
  stockNumber,
}: QuantityProps) => {
  useEffect(() => {
    if (stockNumber === 0) {
      setQuantity(0);
    }
  }, [stockNumber, setQuantity]);

  const handleQuantity = (type: "increase" | "decrease") => {
    if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "increase" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs uppercase font-bold">Quantité</h4>
      <div className="flex items-center justify-between gap-4 bg-gray-100 py-2 px-4 rounded-lg w-32">
        <button
          className="cursor-pointer text-xl font-light"
          onClick={() => handleQuantity("decrease")}
        >
          -
        </button>
        <div className="text-sm">{quantity}</div>
        <button
          className="cursor-pointer text-xl font-light"
          onClick={() => handleQuantity("increase")}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityOption;
