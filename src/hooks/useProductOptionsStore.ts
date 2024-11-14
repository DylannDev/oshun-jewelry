// src/store/useProductOptionsStore.ts
import { create } from "zustand";
import { SetStateAction } from "react";

type ProductOptions = {
  selectedOptions: string;
  quantity: number;
};

type ProductOptionsState = {
  productOptions: Record<string, ProductOptions>;
  setSelectedOptions: (
    productId: string,
    options: SetStateAction<string>
  ) => void;
  setQuantity: (productId: string, qty: SetStateAction<number>) => void;
};

export const useProductOptionsStore = create<ProductOptionsState>((set) => ({
  productOptions: {},

  setSelectedOptions: (productId, options) =>
    set((state) => ({
      productOptions: {
        ...state.productOptions,
        [productId]: {
          ...state.productOptions[productId],
          selectedOptions:
            typeof options === "function"
              ? options(state.productOptions[productId]?.selectedOptions || "")
              : options,
        },
      },
    })),

  setQuantity: (productId, qty) =>
    set((state) => ({
      productOptions: {
        ...state.productOptions,
        [productId]: {
          ...state.productOptions[productId],
          quantity:
            typeof qty === "function"
              ? qty(state.productOptions[productId]?.quantity || 1)
              : qty,
        },
      },
    })),
}));
