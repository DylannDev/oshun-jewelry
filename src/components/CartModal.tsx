/* eslint-disable react/no-unescaped-entities */
"use client";

import Button from "./Button";
import CartItem from "./CartItem";
import { useCartStore } from "@/hooks/useCartStore";
import useWixClient from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import Loader from "./Loader";
import { PiX } from "react-icons/pi";
import { HiOutlineShoppingBag } from "react-icons/hi2";

type CartModalProps = {
  isAnimating: boolean;
  closeCart: () => void;
};

const CartModal = ({ isAnimating, closeCart }: CartModalProps) => {
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

  return (
    <div
      className={`fixed top-0 right-0 w-full sm:w-[500px] h-full bg-white z-50 flex flex-col border border-gray-100 shadow-lg 
                  ${isAnimating ? "slide-in" : "slide-out"}`}
    >
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Mon panier</h2>
        <div
          onClick={closeCart}
          className="hover:bg-black/5 rounded-md p-1 cursor-pointer"
        >
          <PiX className="text-xl" />
        </div>
      </div>
      <div className="flex-grow p-6 overflow-y-scroll">
        {!cart || !cart.lineItems || cart.lineItems.length === 0 ? (
          <div className="h-full grid place-content-center">
            <div className="flex flex-col items-center gap-4">
              <span className="rounded-xl bg-black/5 p-4">
                <HiOutlineShoppingBag className="text-5xl text-black" />
              </span>
              <p className="text-lg">Votre panier est vide.</p>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div className="flex flex-col flex-grow gap-8">
              {cart.lineItems.map((item) => (
                <CartItem key={item._id} cartItem={item} />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="p-6 border-t border-gray-200 mt-6">
        <div className="flex items-center justify-between font-semibold">
          <span>Total</span>
          <span>{parseFloat((cart && cart.subtotal?.amount) || "0")}€</span>
        </div>
        <p className="text-gray-500 text-[13px] font-light mt-2">
          Les frais d'expédition seront ajoutés lors du paiement.
        </p>
      </div>
      <div className="p-6 flex flex-col justify-between gap-4 text-sm border-t border-gray-200">
        <Button
          href="/"
          disabled={isLoading}
          onClick={() => {
            // handleCheckout();
            closeCart();
          }}
          button
        >
          Valider mon panier
        </Button>
        <div className="hidden sm:flex">
          <Button href="/" color="white" onClick={() => closeCart()} button>
            Continuer mes achats
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
