"use client";

import Link from "next/link";
import { PageBanner } from "@/components/page-banner";
import { Features } from "@/components/features";
import { HeartIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { useWishlist } from "@/components/wishlist-provider";

const bannerImage = "/images/banner-clean.jpg";

export function WishlistClient() {
  const { products, count, hydrated, clearWishlist } = useWishlist();

  return (
    <>
      <PageBanner
        title="Wishlist"
        crumbs={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
        image={bannerImage}
      />

      <section className="container-page py-12 lg:py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-[28px] font-semibold leading-tight text-black lg:text-[36px]">
              My Wishlist
            </h2>
            <p className="mt-2 text-base text-muted-light">
              {hydrated
                ? `${count} saved item${count === 1 ? "" : "s"}`
                : "Loading your saved items..."}
            </p>
          </div>
          {hydrated && count > 0 ? (
            <button
              type="button"
              onClick={clearWishlist}
              className="text-sm font-medium text-muted-light underline-offset-4 transition-colors hover:text-gold hover:underline"
            >
              Clear wishlist
            </button>
          ) : null}
        </div>

        <div className="mt-10">
          {!hydrated ? (
            <div className="grid gap-8 min-[480px]:grid-cols-2 min-[1025px]:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[445px] animate-pulse bg-[#F9F1E7]"
                  aria-hidden="true"
                />
              ))}
            </div>
          ) : count === 0 ? (
            <div className="flex flex-col items-center rounded-[10px] bg-[#F9F1E7] px-6 py-16 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-gold">
                <HeartIcon className="h-8 w-8" />
              </span>
              <h3 className="mt-5 text-2xl font-medium text-black">
                Your wishlist is empty
              </h3>
              <p className="mt-2 max-w-[420px] text-base leading-6 text-muted-light">
                Tap the heart on any product to save it here for later.
              </p>
              <Link href="/shop" className="btn-gold mt-7">
                Browse products
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 min-[480px]:grid-cols-2 min-[1025px]:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Features />
    </>
  );
}
