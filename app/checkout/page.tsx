"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PageBanner } from "@/components/page-banner";
import { Features } from "@/components/features";
import { useCart, type CartItem } from "@/components/cart-provider";
import { formatPrice } from "@/lib/products";

const bannerImage =
  "/images/banner-clean.jpg";

const countries = ["Sri Lanka", "United States", "United Kingdom", "Indonesia", "India"];
const provinces = ["Western Province", "Central Province", "Eastern Province", "Northern Province"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const safeItems = Array.isArray(items) ? items.filter((item) => Boolean(item?.product)) : [];
  const safeSubtotal = Number.isFinite(subtotal) ? subtotal : 0;
  const [payment, setPayment] = useState("bank");
  const [placed, setPlaced] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    items: CartItem[];
    subtotal: number;
  } | null>(null);

  const summaryItems = confirmation?.items ?? safeItems;
  const summarySubtotal = confirmation?.subtotal ?? safeSubtotal;

  useEffect(() => {
    if (!placed) return;
    const timer = window.setTimeout(() => router.push("/"), 2000);
    return () => window.clearTimeout(timer);
  }, [placed, router]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (placed) return;
    const orderedItems = safeItems.map((item) => ({ ...item }));
    const orderedSubtotal = orderedItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
    setConfirmation({ items: orderedItems, subtotal: orderedSubtotal });
    setPlaced(true);
    clearCart();
  };

  return (
    <>
      <PageBanner
        title="Checkout"
        crumbs={[{ label: "Home", href: "/" }, { label: "Checkout" }]}
        image={bannerImage}
      />

      <section className="py-12 lg:py-[80px]">
        <div className="container-page grid items-start gap-10 lg:grid-cols-2 lg:gap-x-[60px] lg:gap-y-10">
          <form id="checkout-form" onSubmit={handleSubmit}>
            <h2 className="text-[26px] font-semibold leading-tight text-black lg:text-[36px]">
              Billing details
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <Field label="First Name" name="firstName" required />
              <Field label="Last Name" name="lastName" required />
              <div className="sm:col-span-2">
                <Field label="Company Name (Optional)" name="company" />
              </div>
              <div className="sm:col-span-2">
                <Select label="Country / Region" name="country" options={countries} defaultValue="Sri Lanka" />
              </div>
              <div className="sm:col-span-2">
                <Field label="Street address" name="street" required />
              </div>
              <div className="sm:col-span-2">
                <Field label="Town / City" name="city" required />
              </div>
              <div className="sm:col-span-2">
                <Select label="Province" name="province" options={provinces} defaultValue="Western Province" />
              </div>
              <div className="sm:col-span-2">
                <Field label="ZIP code" name="zip" required />
              </div>
              <div className="sm:col-span-2">
                <Field label="Phone" name="phone" type="tel" required />
              </div>
              <div className="sm:col-span-2">
                <Field label="Email address" name="email" type="email" required />
              </div>
              <div className="sm:col-span-2">
                <label className="block">
                  <span className="mb-2 block text-base font-medium text-black">
                    Additional information
                  </span>
                  <textarea
                    name="additional"
                    rows={4}
                    placeholder="Additional information"
                    className="field resize-none rounded-[10px] placeholder:text-muted-light"
                  />
                </label>
              </div>
            </div>
          </form>

          <aside className="w-full border-t border-line pt-8 lg:border-t-0 lg:pt-0">
            <div className="flex items-baseline justify-between border-b border-line pb-5">
              <span className="text-2xl font-medium text-black">Product</span>
              <span className="text-2xl font-medium text-black">Subtotal</span>
            </div>

            <ul className="divide-y divide-black/5">
              {summaryItems.length === 0 ? (
                <li className="py-6 text-sm text-muted">
                  Your cart is empty.{" "}
                  <Link href="/shop" className="text-gold underline">
                    Browse products
                  </Link>
                </li>
              ) : (
                summaryItems.map(({ product, quantity }) => (
                  <li key={product.id} className="flex items-center justify-between gap-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-mist">
                        <Image src={product.image} alt={product.name} fill sizes="56px" className="object-cover" />
                      </div>
                      <span className="text-base text-muted-light">
                        {product.name} <span className="text-black">X</span>{" "}
                        <span className="text-black">{quantity}</span>
                      </span>
                    </div>
                    <span className="text-base text-black">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </li>
                ))
              )}
            </ul>

            <dl className="mt-4 space-y-4 border-t border-line pt-5">
              <div className="flex items-center justify-between">
                <dt className="text-base text-black">Subtotal</dt>
                <dd className="text-base text-black">{formatPrice(summarySubtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-base text-black">Total</dt>
                <dd className="text-2xl font-bold text-gold">{formatPrice(summarySubtotal)}</dd>
              </div>
            </dl>

            <div className="mt-6 space-y-4">
              <label className="block cursor-pointer">
                <span className="flex items-center gap-3 text-base font-medium text-black">
                  <input
                    type="radio"
                    name="payment"
                    checked={payment === "bank"}
                    onChange={() => setPayment("bank")}
                    className="h-3.5 w-3.5 accent-black"
                  />
                  Direct Bank Transfer
                </span>
                <span className="mt-2 block pl-6 text-base leading-6 text-muted-light">
                  Make your payment directly into our bank account. Please use your
                  Order ID as the payment reference. Your order will not be shipped
                  until the funds have cleared in our account.
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3 text-base font-medium text-muted-light">
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                  className="h-3.5 w-3.5 accent-black"
                />
                Cash On Delivery
              </label>
            </div>

            <p className="mt-6 text-base leading-6 text-black">
              Your personal data will be used to support your experience throughout
              this website, to manage access to your account, and for other purposes
              described in our privacy policy.
            </p>

            <button
              type="submit"
              form="checkout-form"
              disabled={placed}
              className="mx-auto mt-8 block w-full max-w-[318px] rounded-[15px] border border-black py-4 text-xl text-black transition-colors hover:bg-gold hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Place order
            </button>

            {placed && (
              <p className="mt-4 rounded bg-new/10 px-4 py-3 text-center text-sm text-new">
                Thank you! Your order has been placed.
              </p>
            )}
          </aside>
        </div>
      </section>

      <Features />
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-base font-medium text-black">{label}</span>
      <input
        type={type}
        name={name}
        required={required}
        className="field rounded-[10px]"
      />
    </label>
  );
}

function Select({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-base font-medium text-black">{label}</span>
      <select name={name} defaultValue={defaultValue} className="field rounded-[10px]">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

