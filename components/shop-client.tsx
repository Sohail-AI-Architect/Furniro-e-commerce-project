"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDownIcon, FilterIcon, GridIcon, ListIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/components/cart-provider";
import { formatPrice, type Product } from "@/lib/products";

type Props = {
  products: Product[];
  initialCategory?: string;
};

const sortOptions = ["Default", "Price: Low to High", "Price: High to Low", "Name A–Z"];

export function ShopClient({ products, initialCategory }: Props) {
  const { addItem } = useCart();
  const [show, setShow] = useState(16);
  const [sort, setSort] = useState("Default");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState(initialCategory ?? "All");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "All") {
      list = list.filter((product) => product.category === category);
    }
    switch (sort) {
      case "Price: Low to High":
        list.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        list.sort((a, b) => b.price - a.price);
        break;
      case "Name A–Z":
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }, [products, category, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / show));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * show;
  const visible = filtered.slice(start, start + show);

  const resetPage = () => setPage(1);

  return (
    <>
      <div className="bg-[#F9F1E7]">
        <div className="container-page flex flex-col gap-4 py-5 lg:h-[100px] lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:py-0">
          <div className="flex flex-wrap items-center gap-y-4">
            <button
              type="button"
              className="flex items-center gap-3 text-xl font-normal leading-[30px] text-black"
              onClick={() => setCategory("All")}
            >
              <FilterIcon className="h-[25px] w-[25px]" /> Filter
            </button>
            <div className="ml-6 flex items-center gap-6 lg:ml-[23px]">
              <button
                type="button"
                aria-label="Grid view"
                aria-pressed={view === "grid"}
                onClick={() => setView("grid")}
                className={view === "grid" ? "flex h-7 w-7 items-center justify-center text-black" : "flex h-7 w-7 items-center justify-center text-black/40"}
              >
                <GridIcon className="h-7 w-7" />
              </button>
              <button
                type="button"
                aria-label="List view"
                aria-pressed={view === "list"}
                onClick={() => setView("list")}
                className={view === "list" ? "flex h-6 w-6 items-center justify-center text-black" : "flex h-6 w-6 items-center justify-center text-black/40"}
              >
                <ListIcon className="h-6 w-6" />
              </button>
            </div>
            <span className="mx-4 h-[37px] w-px bg-[#9F9F9F] lg:mx-0 lg:ml-[30px]" />
            <p className="w-full whitespace-nowrap text-sm leading-6 text-black lg:ml-[34px] lg:w-auto lg:text-base">
              Showing{" "}
              {filtered.length === 0 ? 0 : start + 1}–{Math.min(start + show, filtered.length)} of{" "}
              {filtered.length} results
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 lg:gap-[29px]">
            <label className="flex items-center gap-[17px] text-xl leading-[30px]">
              <span className="text-black">Show</span>
              <span className="relative inline-flex h-[44px] w-[60px] shrink-0 lg:h-[55px]">
                <select
                  value={show}
                  onChange={(event) => {
                    setShow(Number(event.target.value));
                    resetPage();
                  }}
                  className="h-full w-full appearance-none border-0 bg-white text-center text-base text-[#9F9F9F] outline-none [text-align-last:center] focus:outline-none lg:text-xl"
                >
                  {[4, 8, 12, 16, 20].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none absolute right-1.5 top-1/2 h-3 w-3 -translate-y-1/2 text-[#9F9F9F]"
                />
              </span>
            </label>
            <label className="flex items-center gap-[17px] text-xl leading-[30px]">
              <span className="whitespace-nowrap text-black">Short by</span>
              <select
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value);
                  resetPage();
                }}
                className="h-[44px] w-[188px] bg-white pl-[30px] pr-8 text-base text-[#9F9F9F] outline-none lg:h-[55px] lg:text-xl"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <section className="container-page pb-10 lg:pb-14">
        {visible.length === 0 ? (
          <p className="py-20 text-center text-muted">No products found.</p>
        ) : view === "grid" ? (
          <div className="grid gap-x-8 gap-y-10 min-[480px]:grid-cols-2 min-[1025px]:grid-cols-4">
            {visible.map((product, index) => (
              <ProductCard key={`${product.id}-${index}`} product={product} />
            ))}
          </div>
        ) : (
          <ul className="space-y-5">
            {visible.map((product, index) => (
              <li
                key={`${product.id}-${index}`}
                className="flex flex-col gap-5 bg-mist sm:flex-row"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="relative aspect-[285/200] w-full shrink-0 overflow-hidden sm:w-[260px]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="260px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col gap-2 p-5 pt-0 sm:py-6 sm:pl-0 sm:pr-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="text-2xl font-semibold text-ink hover:text-gold">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex items-baseline gap-3">
                      <span className="text-xl font-semibold text-ink">
                        {formatPrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-sm text-line line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-base text-muted">{product.description}</p>
                  <p className="max-w-xl text-sm leading-6 text-muted">
                    Crafted with premium materials and a timeless silhouette, this
                    piece brings warmth and function to any room in your home.
                  </p>
                  <button
                    type="button"
                    onClick={() => addItem(product)}
                    className="btn-gold mt-2 self-start px-8 py-2.5 text-sm"
                  >
                    Add to cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:mt-14 lg:gap-[38px]">
          {Array.from({ length: pageCount }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index + 1)}
              className={`flex h-12 w-12 items-center justify-center rounded-[10px] text-lg transition-colors lg:h-[60px] lg:w-[60px] lg:text-xl ${
                currentPage === index + 1
                  ? "bg-gold text-white"
                  : "bg-[#F9F1E7] text-black hover:bg-gold/20"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            type="button"
            disabled={currentPage === pageCount}
            onClick={() => setPage(currentPage + 1)}
            className="flex h-12 w-[80px] items-center justify-center rounded-[10px] bg-[#F9F1E7] text-lg text-black transition-colors hover:bg-gold/20 disabled:opacity-40 lg:h-[60px] lg:w-[98px] lg:text-xl"
          >
            Next
          </button>
        </div>
      </section>
    </>
  );
}
