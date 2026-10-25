import type { Metadata } from "next";
import { PageBanner } from "@/components/page-banner";
import { Features } from "@/components/features";
import { ProductComparison } from "@/components/product-comparison";

export const metadata: Metadata = {
  title: "Product Comparison — Furniro",
  description: "Compare our sofas side by side.",
};

const bannerImage = "/images/banner-clean.jpg";

export default function ComparisonPage() {
  return (
    <>
      <PageBanner
        title="Product Comparison"
        crumbs={[{ label: "Home", href: "/" }, { label: "Comparison" }]}
        image={bannerImage}
      />

      <ProductComparison />

      <Features />
      <div className="h-12 bg-white lg:h-[50px]" aria-hidden="true" />
    </>
  );
}
