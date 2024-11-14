/* eslint-disable react/no-unescaped-entities */
"use client";

import Button from "./Button";
import CartItem from "./CartItem";
import { RxCross1 } from "react-icons/rx";
import { useCartStore } from "@/hooks/useCartStore";
import useWixClient from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";

type CartModalProps = {
  setIsCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CartModal = ({ setIsCartOpen }: CartModalProps) => {
  const wixClient = useWixClient();
  const { cart, isLoading } = useCartStore();

  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log("cart", cart);

  return (
    <div className="w-max absolute p-6 rounded-lg shadow-md bg-white top-12 right-0 flex flex-col z-20 border border-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Mon panier</h2>
        <RxCross1
          className="cursor-pointer p-2 text-3xl bg-red-light rounded-md text-white"
          onClick={() => setIsCartOpen(false)}
        />
      </div>
      {isLoading ? (
        "Chargement..."
      ) : !cart || !cart.lineItems || cart.lineItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <div className="flex flex-col gap-8 border-b border-gray-100 py-8">
            {cart.lineItems.map((item) => (
              <CartItem key={item._id} cartItem={item} />
            ))}
          </div>
          <div className="pt-8">
            <div className="flex items-center justify-between font-semibold">
              <span>Total</span>
              <span>{cart.subtotal.amount}€</span>
            </div>
            <p className="text-gray-500 text-xs font-light mt-2 mb-4">
              Les frais d'expédition seront ajoutés lors du paiement.
            </p>
            <div className="flex justify-between gap-4 text-sm">
              <Button href="/" color="white">
                Voir le panier
              </Button>
              <Button
                href="/"
                color="green"
                disabled={isLoading}
                onClick={handleCheckout}
                button
              >
                Paiement
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
