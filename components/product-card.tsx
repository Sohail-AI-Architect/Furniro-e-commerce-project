"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CompareIcon, HeartIcon, ShareIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";
import { useComparison } from "@/components/comparison-provider";
import { useWishlist } from "@/components/wishlist-provider";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const { addProduct: addToComparison } = useComparison();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const liked = isWishlisted(product.slug);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (toastTimer.current !== null) {
        window.clearTimeout(toastTimer.current);
      }
    },
    [],
  );

  const showToast = (message: string) => {
    if (toastTimer.current !== null) {
      window.clearTimeout(toastTimer.current);
    }

    setToast(message);
    toastTimer.current = window.setTimeout(() => {
      setToast("");
      toastTimer.current = null;
    }, 4000);
  };

  const handleShare = async () => {
    const productUrl = `${window.location.origin}/product/${product.slug}`;

    try {
      await navigator.clipboard.writeText(productUrl);
      showToast("Product link copied to clipboard!");
    } catch {
      showToast("Unable to copy product link.");
    }
  };

  const handleCompare = () => {
    addToComparison(product);
    router.push("/comparison");
  };

  const badge = product.isNew
    ? { label: "New", className: "bg-new" }
    : product.discount
      ? { label: `-${product.discount}%`, className: "bg-sale" }
      : null;

  return (
    <>
      <article className="group relative overflow-hidden bg-mist">
        <div className="relative aspect-[285/301] w-full overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 285px"
          className="object-cover"
        />
      </div>

      {badge && (
        <span
          className={`absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full text-base font-medium text-white ${badge.className}`}
        >
          {badge.label}
        </span>
      )}

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[#3A3A3A]/[0.72] opacity-0 transition-opacity duration-300 group-hover:pointer-events-auto group-hover:opacity-100">
        <button
          type="button"
          onClick={() => addItem(product)}
          className="flex h-12 w-[202px] items-center justify-center bg-white text-base font-semibold text-gold transition-colors hover:bg-gold hover:text-white"
        >
          Add to cart
        </button>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 px-2 text-sm font-semibold text-white xl:gap-x-5 xl:text-base">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-0.5 transition-colors hover:text-gold"
          >
            <ShareIcon className="h-4 w-4" /> Share
          </button>
          <button
            type="button"
            onClick={handleCompare}
            className="flex items-center gap-0.5 transition-colors hover:text-gold"
          >
            <CompareIcon className="h-4 w-4" /> Compare
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-pressed={liked}
            aria-label={
              liked
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            className="flex items-center gap-0.5 transition-colors hover:text-gold"
          >
            <HeartIcon
              className="h-4 w-4"
              fill={liked ? "currentColor" : "none"}
            />{" "}
            {liked ? "Liked" : "Like"}
          </button>
        </div>
      </div>

      <div className="flex min-h-[145px] flex-col px-4 pt-4">
        <Link href={`/product/${product.slug}`} className="block">
          <h3 className="text-2xl font-semibold leading-tight text-ink">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-base font-medium text-muted">
          {product.description}
        </p>
        <div className="mt-2 flex items-baseline gap-4">
          <span className="text-xl font-semibold text-ink">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-base font-normal text-line line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
        </div>
      </article>

      {toast ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-5 right-5 z-[100] mx-auto max-w-sm rounded-[10px] bg-new px-5 py-3 text-center text-sm font-medium text-white shadow-2xl"
        >
          {toast}
        </div>
      ) : null}
    </>
  );
}
