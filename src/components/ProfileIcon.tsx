"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useWixClient from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { CiUser } from "react-icons/ci";
import { PiX } from "react-icons/pi";
import { useAuthStore } from "@/store/authStore";
import LoggedInMenu from "./LoggedInMenu";
import LoginButton from "./LoginButton";

type ProfileIconProps = {
  setMenuOpen?: (isOpen: boolean) => void;
};

const ProfileIcon = ({ setMenuOpen }: ProfileIconProps) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, checkLoginStatus, setIsLoggedIn } = useAuthStore();

  const wixClient = useWixClient();
  const router = useRouter();

  useEffect(() => {
    checkLoginStatus(wixClient);
  }, [checkLoginStatus]);

  const closeMenu = () => {
    if (setMenuOpen) {
      setMenuOpen(false);
    }
    setIsProfileOpen(false);
  };

  const handleProfile = () => {
    setIsProfileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoggedIn(false);
    setIsLoading(false);
    setIsProfileOpen(false);
    router.push(logoutUrl);
  };

  return (
    <div>
      {/* Icône de profil */}
      <div
        className="hover:bg-black/5 p-2 rounded-xl cursor-pointer"
        onClick={handleProfile}
      >
        <CiUser className="cursor-pointer text-3xl" />
      </div>

      {/* Menu déroulant avec animation */}
      <div>
        {isProfileOpen && (
          <div className="block min-[900px]:hidden fixed inset-0 top-[79px] bg-white bg-opacity-80 z-10"></div>
        )}
        <div
          className={`absolute flex flex-col gap-4 p-4 pt-6 top-[79px] min-w-[300px] left-0 right-0 min-[900px]:left-auto min-[900px]:right-[64px] bg-white rounded-br-xl rounded-bl-xl border border-gray-200 text-sm shadow-lg z-40 transition-all duration-300 ease-out transform ${
            isProfileOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-60 opacity-0 pointer-events-none"
          }`}
        >
          <div
            onClick={closeMenu}
            className="bg-black/5 hover:bg-black/15 rounded-md p-1 cursor-pointer absolute right-2 top-2"
          >
            <PiX className="text-xl" />
          </div>
          {isLoggedIn ? (
            <LoggedInMenu
              closeMenu={closeMenu}
              handleLogout={handleLogout}
              isLoading={isLoading}
            />
          ) : (
            <LoginButton closeMenu={closeMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileIcon;
