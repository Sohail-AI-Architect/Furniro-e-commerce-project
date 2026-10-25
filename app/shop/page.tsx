import type { Metadata } from "next";
import { PageBanner } from "@/components/page-banner";
import { ShopClient } from "@/components/shop-client";
import { Features } from "@/components/features";
import { shopProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop — Furniro",
  description: "Browse our full collection of furniture for every room.",
};

const bannerImage =
  "/images/banner-clean.jpg";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  return (
    <>
      <PageBanner
        title="Shop"
        crumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        image={bannerImage}
      />
      <ShopClient products={shopProducts} initialCategory={category} />
      <Features />
    </>
  );
}

