import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductBreadcrumb } from "@/components/product-breadcrumb";
import { ProductDetail } from "@/components/product-detail";
import { allProducts, getProduct } from "@/lib/products";

export function generateStaticParams() {
  const seen = new Set<string>();
  return allProducts
    .filter((product) => {
      if (seen.has(product.slug)) return false;
      seen.add(product.slug);
      return true;
    })
    .map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  return {
    title: product ? `${product.name} — Furniro` : "Product — Furniro",
    description: product?.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <ProductBreadcrumb productName={product.name} />
      <ProductDetail product={product} />
    </>
  );
}
