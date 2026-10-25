"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { allProducts, formatPrice } from "@/lib/products";

export function SearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  useEffect(() => {
    if (mounted) inputRef.current?.focus();
  }, [mounted]);

  const normalized = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!normalized) return allProducts.slice(0, 4);
    return allProducts.filter((product) =>
      [product.name, product.description, product.category]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [normalized]);
  const visible = matches.slice(0, 6);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!normalized) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/45 px-4 pb-10 pt-20 backdrop-blur-sm sm:pt-28"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="site-search-title"
        className="w-full max-w-[720px] overflow-hidden rounded-[10px] bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-4 sm:px-6">
          <h2 id="site-search-title" className="text-xl font-medium text-black">
            Search products
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-light transition-colors hover:bg-[#F9F1E7] hover:text-gold"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={submitSearch} role="search" className="border-b border-black/10 p-5 sm:p-6">
          <label htmlFor="site-search" className="sr-only">
            Search for furniture
          </label>
          <div className="flex h-14 items-center gap-3 rounded-[10px] bg-[#F9F1E7] px-4">
            <SearchIcon className="h-5 w-5 shrink-0 text-gold" />
            <input
              ref={inputRef}
              id="site-search"
              name="q"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search sofas, chairs, tables..."
              className="min-w-0 flex-1 bg-transparent text-base text-black outline-none placeholder:text-muted-light"
            />
            <button
              type="submit"
              disabled={!normalized}
              className="rounded bg-gold px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#a17a26] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Search
            </button>
          </div>
        </form>

        <div className="max-h-[55vh] overflow-y-auto p-2 sm:p-3">
          <div className="flex items-center justify-between px-3 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-light">
              {normalized ? `${matches.length} result${matches.length === 1 ? "" : "s"}` : "Popular right now"}
            </p>
            {normalized ? (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                }}
                className="text-xs font-medium text-gold hover:underline"
              >
                View all results
              </button>
            ) : null}
          </div>

          {visible.length === 0 ? (
            <div className="px-3 py-10 text-center">
              <p className="text-base text-black">
                No products found for &ldquo;{query.trim()}&rdquo;
              </p>
              <p className="mt-1 text-sm text-muted-light">
                Try a different name, room or product type.
              </p>
            </div>
          ) : (
            <ul>
              {visible.map((product) => (
                <li key={product.id}>
                  <Link
                    href={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 rounded-[10px] px-3 py-3 transition-colors hover:bg-[#F9F1E7]"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-[8px] bg-mist">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-base font-medium text-black">
                        {product.name}
                      </p>
                      <p className="truncate text-sm text-muted-light">
                        {product.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-medium text-gold">
                      {formatPrice(product.price)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-black/10 px-5 py-3 text-xs text-muted-light sm:px-6">
          Press Enter to open the full search results page.
        </div>
      </div>
    </div>,
    document.body,
  );
}
