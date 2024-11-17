import { WixClient } from "@/context/wixContext";
import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  checkLoginStatus: (wixClient: WixClient) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
  checkLoginStatus: (wixClient) => {
    const tokens = wixClient.auth.getTokens();

    const isUserLoggedIn = wixClient.auth.loggedIn();
    const hasMemberRole = tokens?.refreshToken?.role?.includes("member");

    set({
      isLoggedIn: isUserLoggedIn && hasMemberRole,
    });
  },
}));
