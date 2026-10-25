"use client";

import Image from "next/image";
import Link from "next/link";
import { PageBanner } from "@/components/page-banner";
import { Features } from "@/components/features";
import { TrashIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";
import { formatPrice } from "@/lib/products";

const bannerImage = "/images/banner-clean.jpg";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, hydrated } = useCart();

  return (
    <>
      <PageBanner
        title="Cart"
        crumbs={[{ label: "Home", href: "/" }, { label: "Cart" }]}
        image={bannerImage}
      />

      <section className="bg-white py-10 lg:pb-[63px] lg:pt-[72px]">
        <div className="container-page flex flex-col gap-8 lg:px-8 xl:flex-row xl:items-start xl:gap-[30px] xl:px-0">
          <div className="w-full xl:w-[817px] xl:flex-none">
            <div className="hidden h-[55px] grid-cols-[319px_177px_106px_162px_53px] items-center bg-[#F9F1E7] text-base font-medium leading-6 text-black xl:grid">
              <span className="pl-[142px]">Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
              <span className="sr-only">Remove</span>
            </div>

            {items.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-lg text-muted">
                  {hydrated === false ? "Loading your cart…" : "Your cart is empty."}
                </p>
                <Link href="/shop" className="btn-gold mt-6">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <ul>
                {items.map(
                  ({ product, quantity, selectedSize, selectedColor }) => (
                    <li
                      key={product.id}
                    className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-4 border-b border-[#E8E8E8] py-6 last:border-b-0 lg:flex lg:gap-6 xl:grid xl:grid-cols-[319px_177px_106px_162px_53px] xl:gap-0 xl:border-b-0 xl:py-[27px]"
                  >
                    <div className="col-span-3 flex min-w-0 items-center gap-4 lg:flex-1 xl:col-span-1 xl:flex-none xl:gap-[37px]">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[10px] bg-[#F9F1E7] xl:h-[105px] xl:w-[105px]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="105px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/product/${product.slug}`}
                          className="block truncate text-base leading-6 text-[#9F9F9F] transition-colors hover:text-gold"
                        >
                          {product.name}
                        </Link>
                        {selectedSize || selectedColor ? (
                          <p className="mt-1 text-sm leading-5 text-[#9F9F9F]">
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
                        <p className="mt-1 text-base leading-6 text-[#9F9F9F] xl:hidden">
                          {formatPrice(product.price, 2)}
                        </p>
                      </div>
                    </div>

                    <span className="hidden text-base leading-6 text-[#9F9F9F] xl:block">
                      {formatPrice(product.price, 2)}
                    </span>

                    <div className="col-start-1 lg:ml-auto xl:col-auto xl:ml-0 xl:pl-[19px]">
                      <span className="flex h-8 w-[68px] items-center justify-between rounded-[5px] border border-[#9F9F9F] px-1.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="text-base leading-6 hover:text-gold"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="text-base leading-6">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="text-base leading-6 hover:text-gold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </span>
                    </div>

                    <span className="justify-self-end text-base font-medium leading-6 text-gold xl:font-normal xl:text-black">
                      {formatPrice(product.price * quantity, 2)}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="justify-self-end text-black transition-colors hover:text-sale xl:justify-self-start"
                    >
                      <TrashIcon className="h-7 w-7" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <aside className="w-full bg-[#F9F1E7] px-6 pb-16 pt-[15px] sm:px-[75px] xl:w-[393px] xl:flex-none xl:pb-20">
            <h2 className="text-center text-[28px] font-semibold leading-[48px] text-black xl:text-[32px]">
              Cart Totals
            </h2>
            <dl className="mt-[61px] text-base leading-6">
              <div className="flex items-center justify-between">
                <dt className="font-medium text-black">Subtotal</dt>
                <dd className="text-[#9F9F9F]">{formatPrice(subtotal, 2)}</dd>
              </div>
              <div className="mt-[31px] flex items-center justify-between">
                <dt className="font-medium text-black">Total</dt>
                <dd className="text-xl font-medium leading-[30px] text-gold">
                  {formatPrice(subtotal, 2)}
                </dd>
              </div>
            </dl>
            <Link
              href="/checkout"
              className="mx-auto mt-[42px] flex h-[59px] w-full max-w-[222px] items-center justify-center rounded-[15px] border border-black text-xl leading-[30px] text-black transition-colors hover:bg-gold hover:text-white"
            >
              Check Out
            </Link>
          </aside>
        </div>
      </section>

      <Features />
    </>
  );
}

