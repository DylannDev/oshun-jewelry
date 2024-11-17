import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

type CustomCart = currentCart.Cart & {
  subtotal?: {
    amount: string;
  };
};

type CartState = {
  cart: CustomCart | null;
  isLoading: boolean;
  counter: number;
  getCart: (wixClient: WixClient) => Promise<void>;
  addItem: (
    wixClient: WixClient,
    productId: string,
    quantity: number,
    selectedOptions: string
  ) => Promise<void>;
  removeItem: (wixClient: WixClient, itemId: string) => Promise<void>;
  updateItemQuantity: (
    wixClient: WixClient,
    itemId: string,
    quantity: number
  ) => Promise<void>;
};

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  isLoading: false,
  counter: 0,

  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || null,
        isLoading: false,
        counter: cart?.lineItems?.length || 0,
      });
    } catch (err) {
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },

  addItem: async (wixClient, productId, quantity, selectedOptions) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response = await wixClient.currentCart.addToCurrentCart({
        lineItems: [
          {
            catalogReference: {
              appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
              catalogItemId: productId,
              options: {
                options: {
                  Taille: selectedOptions,
                },
              },
            },
            quantity: quantity,
          },
        ],
      });

      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length || 0,
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        // console.error("Error adding item to cart:", error.message);
      }
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },

  removeItem: async (wixClient, itemId) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response =
        await wixClient.currentCart.removeLineItemsFromCurrentCart([itemId]);
      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length || 0,
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        // console.error("Error removing item from cart:", error.message);
      }
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },

  updateItemQuantity: async (wixClient, itemId, quantity) => {
    set((state) => ({ ...state, isLoading: true }));
    try {
      const response =
        await wixClient.currentCart.updateCurrentCartLineItemQuantity([
          { _id: itemId, quantity },
        ]);
      set({
        cart: response.cart,
        isLoading: false,
      });
    } catch (error) {
      // console.error("Error updating item quantity:", error);
      set((prev) => ({ ...prev, isLoading: false }));
    }
  },
}));
