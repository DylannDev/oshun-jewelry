import { NextRequest, NextResponse } from "next/server";
import { OAuthStrategy, createClient } from "@wix/sdk";
import { WIX_REFRESH_TOKEN } from "./app/constants";

export const middleware = async (request: NextRequest) => {
  const cookies = request.cookies;
  const res = NextResponse.next();

  if (cookies.get(WIX_REFRESH_TOKEN)) {
    return res;
  }
  const wixClient = createClient({
    auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID! }),
  });
  const tokens = await wixClient.auth.generateVisitorTokens();
  res.cookies.set(WIX_REFRESH_TOKEN, JSON.stringify(tokens.refreshToken), {
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
};
