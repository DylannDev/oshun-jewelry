"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/hooks/useCartStore";
import useWixClient from "@/hooks/useWixClient";
import { CiShoppingBasket } from "react-icons/ci";
import CartModal from "./CartModal";

type CartIconProps = {};

const CartIcon = ({}: CartIconProps) => {
  const wixClient = useWixClient();
  const { counter, getCart } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Met à jour le panier à chaque connexion ou token valide
  useEffect(() => {
    getCart(wixClient);
  }, [getCart]);

  const closeCart = () => {
    setIsAnimating(false);
    setTimeout(() => setIsCartOpen(false), 300);
  };

  // Bloque le défilement lorsque le panier est ouvert
  useEffect(() => {
    if (isCartOpen) {
      document.body.classList.add("overflow-hidden");
      document.body.style.paddingRight = `${15}px`;
      setIsAnimating(true);
    } else {
      document.body.classList.remove("overflow-hidden");
      document.body.style.paddingRight = "0px";
    }
  }, [isCartOpen]);

  return (
    <div
      className="relative cursor-pointer p-2"
      onClick={() => setIsCartOpen(true)}
    >
      <CiShoppingBasket className="cursor-pointer text-3xl" />
      <div className="absolute top-1 right-1 w-[18px] h-[18px] bg-black rounded-full text-white text-xs flex items-center justify-center">
        {counter}
      </div>
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={closeCart}
          ></div>
          <CartModal isAnimating={isAnimating} closeCart={closeCart} />
        </>
      )}
    </div>
  );
};

export default CartIcon;
