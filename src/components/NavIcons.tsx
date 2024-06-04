"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { PiUser, PiShoppingBag } from "react-icons/pi";
import CartModal from "./CartModal";
import useWixClient from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import Button from "./Button";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

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
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <PiUser className="cursor-pointer text-3xl" onClick={handleProfile} />
      {isProfileOpen && (
        <div className="absolute flex flex-col gap-4 p-4 top-12 left-0 bg-white text-sm rounded-lg shadow-md border border-gray-100 z-20">
          <Link href="/" className="border-b border-gray-300 pb-4">
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
        <PiShoppingBag className="cursor-pointer text-3xl" />
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-light rounded-full text-white text-xs flex items-center justify-center ">
          2
        </div>
      </div>
      {isCartOpen && <CartModal setIsCartOpen={setIsCartOpen} />}
    </div>
  );
};

export default NavIcons;
