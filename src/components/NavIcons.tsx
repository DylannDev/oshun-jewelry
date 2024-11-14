"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";
import useWixClient from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import Button from "./Button";
import { useCartStore } from "@/hooks/useCartStore";
import { CiSearch, CiShoppingBasket, CiUser } from "react-icons/ci";
import { SearchbarProps } from "@/types";

const NavIcons = ({ isVisible, setIsVisible }: SearchbarProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  const { counter, getCart } = useCartStore();

  // Récupération du panier uniquement si cartId est défini
  useEffect(() => {
    getCart(wixClient);
  }, [getCart, wixClient]);

  const handleProfile = () => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setIsProfileOpen((prev) => !prev);
    }
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  return (
    <div className="flex items-center gap-1 xl:gap-2 relative">
      {!isVisible && (
        <div
          onClick={() => setIsVisible(true)}
          className="hover:bg-black/5 p-2 rounded-xl cursor-pointer"
        >
          <CiSearch className="text-3xl" />
        </div>
      )}
      <div
        className="hover:bg-black/5 p-2 rounded-xl cursor-pointer"
        onClick={handleProfile}
      >
        <CiUser className="cursor-pointer text-3xl" />
      </div>
      {isProfileOpen && (
        <div className="absolute flex flex-col gap-4 p-4 top-12 left-0 bg-white text-sm rounded-lg shadow-md border border-gray-100 z-20">
          <Link
            href="/profile"
            className="border-b border-gray-200 pb-4"
            onClick={() => setIsProfileOpen(false)}
          >
            Mon Profil
          </Link>
          <Button color="red" onClick={handleLogout} button>
            {isLoading ? "Déconnexion..." : "Se Déconnecter"}
          </Button>
        </div>
      )}
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <CiShoppingBasket className="cursor-pointer text-3xl" />
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-light rounded-full text-white text-xs flex items-center justify-center ">
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal setIsCartOpen={setIsCartOpen} />}
    </div>
  );
};

export default NavIcons;
