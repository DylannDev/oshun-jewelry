import { OAuthStrategy, createClient } from "@wix/sdk";
import { NextRequest, NextResponse } from "next/server";

export const middleware = async (request: NextRequest) => {
  if (!request.cookies.get("session")) {
    const response = NextResponse.next();

    const wixClient = createClient({
      auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
    });
    const tokens = await wixClient.auth.generateVisitorTokens();
    response.cookies.set("refreshToken", JSON.stringify(tokens.refreshToken));
    response.cookies.set("accessToken", JSON.stringify(tokens.accessToken));
    return response;
  }
};
