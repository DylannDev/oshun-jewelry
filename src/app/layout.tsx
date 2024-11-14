import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WixClientContextProvider } from "@/context/wixContext";

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
          <div className="mx-auto max-w-[2048px] px-4 md:px-8 lg:px-16 xl:px-24">
            <Navbar />
            {children}
          </div>
          <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
