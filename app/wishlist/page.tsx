import type { Metadata } from "next";
import { WishlistClient } from "@/components/wishlist-client";

export const metadata: Metadata = {
  title: "Wishlist - Furniro",
  description: "Products you have saved for later at Furniro.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
