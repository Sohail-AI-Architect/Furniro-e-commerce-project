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

type ComparisonContextValue = {
  slugs: string[];
  products: Product[];
  count: number;
  hydrated: boolean;
  isCompared: (slug: string) => boolean;
  addProduct: (product: Product) => void;
  removeProduct: (slug: string) => void;
  clearComparison: () => void;
};

const ComparisonContext = createContext<ComparisonContextValue | null>(null);
const STORAGE_KEY = "funiro-comparison";
const MAX_COMPARISON_PRODUCTS = 2;

export function ComparisonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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
          ).slice(0, MAX_COMPARISON_PRODUCTS);
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

  const isCompared = useCallback(
    (slug: string) => slugs.includes(slug),
    [slugs],
  );

  const addProduct = useCallback((product: Product) => {
    setSlugs((current) =>
      [product.slug, ...current.filter((slug) => slug !== product.slug)].slice(
        0,
        MAX_COMPARISON_PRODUCTS,
      ),
    );
  }, []);

  const removeProduct = useCallback((slug: string) => {
    setSlugs((current) => current.filter((item) => item !== slug));
  }, []);

  const clearComparison = useCallback(() => setSlugs([]), []);

  const value = useMemo<ComparisonContextValue>(() => {
    const products = slugs
      .map((slug) => getProduct(slug))
      .filter((product): product is Product => Boolean(product));

    return {
      slugs,
      products,
      count: products.length,
      hydrated,
      isCompared,
      addProduct,
      removeProduct,
      clearComparison,
    };
  }, [
    slugs,
    hydrated,
    isCompared,
    addProduct,
    removeProduct,
    clearComparison,
  ]);

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const ctx = useContext(ComparisonContext);
  if (!ctx) {
    throw new Error("useComparison must be used inside ComparisonProvider");
  }
  return ctx;
}
