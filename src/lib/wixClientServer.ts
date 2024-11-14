import { OAuthStrategy, createClient } from "@wix/sdk";
<<<<<<< HEAD
import { collections, products } from "@wix/stores";
import { orders } from "@wix/ecom";
=======
import { products, collections } from "@wix/stores";
import { currentCart } from "@wix/ecom";
>>>>>>> main
import { cookies } from "next/headers";
import { members } from "@wix/members";

export const wixClientServer = async () => {
  let refreshToken;

  try {
    const cookieStore = await cookies();
    refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
    console.log("Refresh token value:", refreshToken);
  } catch (e) {}

  const wixClient = createClient({
    modules: {
      products,
      collections,
<<<<<<< HEAD
      orders,
      members,
=======
      currentCart,
>>>>>>> main
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });

  return wixClient;
};
