"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getProduct, type Product } from "@/lib/products";

type WishlistContextValue = {
  slugs: string[];
  products: Product[];
  count: number;
  hydrated: boolean;
  isWishlisted: (slug: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeWishlist: (slug: string) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "funiro-wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const valid = Array.from(
            new Set(
              parsed.filter(
                (slug): slug is string =>
                  typeof slug === "string" && Boolean(getProduct(slug)),
              ),
            ),
          );
          setSlugs(valid);
        }
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }, [slugs, hydrated]);

  const isWishlisted = useCallback(
    (slug: string) => slugs.includes(slug),
    [slugs],
  );

  const toggleWishlist = useCallback((product: Product) => {
    setSlugs((current) =>
      current.includes(product.slug)
        ? current.filter((slug) => slug !== product.slug)
        : [...current, product.slug],
    );
  }, []);

  const removeWishlist = useCallback((slug: string) => {
    setSlugs((current) => current.filter((item) => item !== slug));
  }, []);

  const clearWishlist = useCallback(() => setSlugs([]), []);

  const value = useMemo<WishlistContextValue>(() => {
    const products = slugs
      .map((slug) => getProduct(slug))
      .filter((product): product is Product => Boolean(product));

    return {
      slugs,
      products,
      count: products.length,
      hydrated,
      isWishlisted,
      toggleWishlist,
      removeWishlist,
      clearWishlist,
    };
  }, [
    slugs,
    hydrated,
    isWishlisted,
    toggleWishlist,
    removeWishlist,
    clearWishlist,
  ]);

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}
