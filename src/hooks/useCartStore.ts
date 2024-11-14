import { create } from "zustand";
import { currentCart } from "@wix/ecom";
import { WixClient } from "@/context/wixContext";

type CartState = {
  cart: currentCart.Cart | null;
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
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  isLoading: false,
  counter: 0,

  getCart: async (wixClient) => {
    try {
      const cart = await wixClient.currentCart.getCurrentCart();
      set({
        cart: cart || [],
        isLoading: false,
        counter: cart?.lineItems.length || 0,
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
              appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e", // ID fixe de l'app Stores
              catalogItemId: productId,
              options: {
                options: {
                  Taille: selectedOptions,
                },
              },
            },
            quantity: quantity,
          },
<<<<<<< HEAD
        ],
      });

      set({
        cart: response.cart,
        counter: response.cart?.lineItems.length || 0,
        isLoading: false,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error adding item to cart:", error.message);
      }
      set({ isLoading: false });
    }
=======
          quantity: quantity,
        },
      ],
    });
    console.log(response.cart);

    // console.log({ productId, variantId, quantity });
    set({
      cart: response.cart,
      counter: response.cart?.lineItems.length,
      isLoading: false,
    });
>>>>>>> main
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
        console.error("Error removing item from cart:", error.message);
      }
      set({ isLoading: false });
    }
  },
}));
