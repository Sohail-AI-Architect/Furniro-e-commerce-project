import type { Metadata } from "next";
import { ProductBreadcrumb } from "@/components/product-breadcrumb";
import { ProductDetail } from "@/components/product-detail";
import { AutoOpenCart } from "@/components/auto-open-cart";
import { asgaardSofa } from "@/lib/products";

export const metadata: Metadata = {
  title: "Cart Sidebar - Furniro",
};

export default function CartSidebarPage() {
  return (
    <>
      <ProductBreadcrumb productName={asgaardSofa.name} />
      <ProductDetail product={asgaardSofa} />
      <AutoOpenCart />
    </>
  );
}

