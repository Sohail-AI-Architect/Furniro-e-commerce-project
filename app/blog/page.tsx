import { Suspense } from "react";
import type { Metadata } from "next";
import { PageBanner } from "@/components/page-banner";
import { Features } from "@/components/features";
import { BlogList } from "@/components/blog-list";

export const metadata: Metadata = {
  title: "Blog - Furniro",
  description: "Interior inspiration, styling tips and stories from the Furniro studio.",
};

const bannerImage = "/images/banner-clean.jpg";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const { q, category } = await searchParams;
  const initialQuery = typeof q === "string" ? q : "";
  const initialCategory = typeof category === "string" ? category : "";

  return (
    <>
      <PageBanner
        title="Blog"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        image={bannerImage}
      />

      <Suspense
        fallback={
          <div className="container-page py-16 text-center text-muted-light">
            Loading posts&hellip;
          </div>
        }
      >
        <BlogList
          initialQuery={initialQuery}
          initialCategory={initialCategory}
        />
      </Suspense>

      <Features />
      <div className="h-6 bg-white lg:h-[22px]" aria-hidden="true" />
    </>
  );
}
