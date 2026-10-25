import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart-provider";
import { ComparisonProvider } from "@/components/comparison-provider";
import { WishlistProvider } from "@/components/wishlist-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Furniro — Furniture for every home",
  description:
    "Discover our new collection of beautifully crafted furniture for dining, living and bedroom.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <CartProvider>
          <ComparisonProvider>
            <WishlistProvider>
              <SiteHeader />
              <main>{children}</main>
              <SiteFooter />
            </WishlistProvider>
          </ComparisonProvider>
        </CartProvider>
      </body>
    </html>
  );
}
