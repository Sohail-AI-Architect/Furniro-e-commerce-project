"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { CloseIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/products";

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, subtotal } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeCart]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/20 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
        className={`fixed right-0 top-0 z-50 flex h-[746px] max-h-[100dvh] w-full max-w-none flex-col bg-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:max-w-[417px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="pl-5 pr-5 pt-[28px] sm:pl-[30px] sm:pr-[41px]">
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-semibold leading-9 text-black">
              Shopping Cart
            </h2>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close cart"
              className="mt-[7px] flex h-[19px] w-[17px] items-center justify-center text-[#9F9F9F] transition-colors hover:text-gold"
            >
              <CloseIcon className="h-[19px] w-[17px]" />
            </button>
          </div>
          <div className="mt-[26px] h-px w-[287px] bg-[#D9D9D9]" />
        </div>

        <div className="flex-1 overflow-y-auto pl-5 pr-5 pt-[42px] sm:pl-[27px] sm:pr-[40px]">
          {items.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">
              Your cart is empty.
            </p>
          ) : (
            <ul className="flex flex-col gap-5">
              {items.map(
                ({ product, quantity, selectedSize, selectedColor }) => (
                  <li
                    key={product.id}
                    className="flex h-[105px] items-start gap-5 sm:gap-[35px]"
                  >
                    <div className="relative h-[105px] w-[105px] shrink-0 overflow-hidden rounded-[10px] bg-[#D9D9D9]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="105px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 items-start justify-between gap-3">
                      <div className="min-w-0 pt-[24px]">
                        <p className="truncate text-base font-normal leading-6 text-black">
                          {product.name}
                        </p>
                        {selectedSize || selectedColor ? (
                          <p className="mt-0.5 text-[11px] leading-[15px] text-[#9F9F9F]">
                            {selectedSize ? (
                              <>
                                Size:{" "}
                                <span className="text-black">
                                  {selectedSize}
                                </span>
                              </>
                            ) : null}
                            {selectedSize && selectedColor ? " · " : null}
                            {selectedColor ? (
                              <>
                                Color:{" "}
                                <span className="text-black">
                                  {selectedColor}
                                </span>
                              </>
                            ) : null}
                          </p>
                        ) : null}
                        <p className="mt-1.5 flex items-baseline">
                          <span className="w-5 text-base font-light leading-6 text-black">
                            {quantity}
                          </span>
                          <span className="w-[23px] text-xs font-light leading-[18px] text-black">
                            X
                          </span>
                          <span className="text-xs font-medium leading-[18px] text-gold">
                            {formatPrice(product.price * quantity, 2)}
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${product.name}`}
                        onClick={() => removeItem(product.id)}
                        className="mt-[42px] flex h-5 w-5 shrink-0 items-center justify-center text-[#9F9F9F] transition-colors hover:text-gold"
                      >
                        <CloseIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </li>
                ),
              )}
            </ul>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between px-5 sm:px-[31px]">
            <span className="text-base font-normal leading-6 text-black">
              Subtotal
            </span>
            <span className="text-base font-semibold leading-6 text-gold">
              {formatPrice(subtotal, 2)}
            </span>
          </div>
          <div className="mt-[23px] h-px w-full bg-[#D9D9D9]" />
          <div className="flex items-center gap-[14px] px-5 pb-[28px] pt-[25px] sm:px-[27px]">
            <Link
              href="/cart"
              onClick={closeCart}
              aria-label="View cart"
              className="block h-[30px] w-[87px]"
            />
            <Link
              href="/checkout"
              onClick={closeCart}
              className="inline-flex h-[30px] min-w-[118px] items-center justify-center rounded-full border border-black px-[30px] text-xs leading-[18px] text-black transition-colors hover:border-gold hover:text-gold"
            >
              Checkout
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
