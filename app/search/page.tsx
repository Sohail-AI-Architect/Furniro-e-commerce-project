import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/page-banner";
import { Features } from "@/components/features";
import { ProductCard } from "@/components/product-card";
import { SearchIcon } from "@/components/icons";
import { allProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Search - Furniro",
  description: "Find furniture by name, category or room.",
};

const bannerImage = "/images/banner-clean.jpg";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const normalized = query.toLowerCase();
  const results = normalized
    ? allProducts.filter((product) =>
        [product.name, product.description, product.category]
          .join(" ")
          .toLowerCase()
          .includes(normalized),
      )
    : allProducts;

  return (
    <>
      <PageBanner
        title="Search"
        crumbs={[{ label: "Home", href: "/" }, { label: "Search" }]}
        image={bannerImage}
      />

      <section className="container-page py-12 lg:py-16">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="text-[28px] font-semibold leading-tight text-black lg:text-[36px]">
            {query ? `Results for \u201c${query}\u201d` : "Find your next piece"}
          </h2>
          <p className="mt-2 text-base text-muted-light">
            {query
              ? `${results.length} product${results.length === 1 ? "" : "s"} found`
              : "Search by product name, category or description."}
          </p>

          <form
            action="/search"
            role="search"
            className="mx-auto mt-7 flex h-14 max-w-[600px] items-center gap-3 rounded-[10px] bg-[#F9F1E7] px-4"
          >
            <SearchIcon className="h-5 w-5 shrink-0 text-gold" />
            <label htmlFor="search-page-query" className="sr-only">
              Search products
            </label>
            <input
              id="search-page-query"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Search sofas, chairs, tables..."
              className="min-w-0 flex-1 bg-transparent text-base text-black outline-none placeholder:text-muted-light"
            />
            <button
              type="submit"
              className="rounded bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#a17a26]"
            >
              Search
            </button>
          </form>
        </div>

        {results.length === 0 ? (
          <div className="mx-auto mt-12 max-w-[560px] rounded-[10px] bg-[#F9F1E7] px-6 py-14 text-center">
            <h3 className="text-2xl font-medium text-black">No products found</h3>
            <p className="mt-2 text-base leading-6 text-muted-light">
              Try another keyword, or browse the full collection to discover
              something new.
            </p>
            <Link href="/shop" className="btn-gold mt-7">
              Browse the shop
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 min-[480px]:grid-cols-2 min-[1025px]:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Features />
    </>
  );
}
