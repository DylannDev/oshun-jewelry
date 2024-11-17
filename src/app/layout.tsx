import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WixClientContextProvider } from "@/context/wixContext";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oshun | Boutique de Vêtements & Accessoires",
  description:
    "Découvrez des vêtements et accessoires de qualité, auxquels des millions de personnes font confiance. Livraison Gratuite. Qualité Supérieure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <WixClientContextProvider>
          <div className="flex flex-col min-h-screen mx-auto max-w-[2048px] px-2 min-[900px]:px-8 lg:px-16 xl:px-24">
            <Navbar />
            <Suspense
              fallback={
                <div className="h-[calc(100dvh-80px)]">
                  <Loader />
                </div>
              }
            >
              {children}
            </Suspense>
          </div>
          <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
