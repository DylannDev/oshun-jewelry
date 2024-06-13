"use client";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { products, collections } from "@wix/stores";
import { currentCart, cart } from "@wix/ecom";
import Cookies from "js-cookie";
import { createContext } from "react";

type WixClientContextProviderProps = {
  children: React.ReactNode;
};

export const refreshToken = JSON.parse(Cookies.get("refreshToken") || "{}");
export const accessToken = JSON.parse(Cookies.get("accessToken") || "{}");

const wixClient = createClient({
  modules: {
    products,
    collections,
    currentCart,
    cart,
  },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
    tokens: { refreshToken, accessToken },
  }),
});

export type WixClient = typeof wixClient;

export const WixClientContext = createContext<WixClient>(wixClient);

export const WixClientContextProvider = ({
  children,
}: WixClientContextProviderProps) => {
  return (
    <WixClientContext.Provider value={wixClient}>
      {children}
    </WixClientContext.Provider>
  );
};
