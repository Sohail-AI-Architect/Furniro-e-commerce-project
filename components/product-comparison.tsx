"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon, StarIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";
import { useComparison } from "@/components/comparison-provider";
import {
  asgaardSofa,
  formatPrice,
  outdoorSofaSet,
  products,
  type Product,
} from "@/lib/products";

type CompareProduct = {
  product: Product;
  title: string;
  price: string;
  rating: string;
  reviews: number;
  imageClass: string;
  imageFrameClass: string;
  offsetClass: string;
  titleOffsetClass: string;
};

const defaultCompared: CompareProduct[] = [
  {
    product: asgaardSofa,
    title: "Asgaard Sofa",
    price: "Rs. 250,000.00",
    rating: "4.7",
    reviews: 204,
    imageClass: "object-contain",
    imageFrameClass: "h-[177px] w-full max-w-[280px] rounded-[10px] p-[20px_19px]",
    offsetClass: "xl:pt-[34px]",
    titleOffsetClass: "mt-5 xl:mt-[18px]",
  },
  {
    product: outdoorSofaSet,
    title: "Outdoor Sofa Set",
    price: "Rs. 224,000.00",
    rating: "4.2",
    reviews: 145,
    imageClass: "object-cover",
    imageFrameClass: "h-[201px] w-full max-w-[271px] rounded-[10px]",
    offsetClass: "xl:pt-0",
    titleOffsetClass: "mt-5 xl:mt-[28px]",
  },
];

function createCompareProduct(product: Product): CompareProduct {
  return {
    product,
    title: product.name,
    price: formatPrice(product.price),
    rating: "4.5",
    reviews: 120,
    imageClass: "object-cover",
    imageFrameClass: "h-[201px] w-full max-w-[271px] rounded-[10px]",
    offsetClass: "xl:pt-0",
    titleOffsetClass: "mt-5 xl:mt-[28px]",
  };
}

const sections: { title: string; rows: [string, string, string][] }[] = [
  {
    title: "General",
    rows: [
      ["Sales Package", "1 sectional sofa", "1 Three Seater, 2 Single Seater"],
      ["Model Number", "TFCBLIGRBL6SRHS", "DTUBLIGRBL568"],
      ["Secondary Material", "Solid Wood", "Solid Wood"],
      ["Configuration", "L-shaped", "L-shaped"],
      ["Upholstery Material", "Fabric + Cotton", "Fabric + Cotton"],
      ["Upholstery Color", "Bright Grey & Lion", "Bright Grey & Lion"],
    ],
  },
  {
    title: "Product",
    rows: [
      ["Filling Material", "Foam", "Matte"],
      ["Finish Type", "Bright Grey & Lion", "Bright Grey & Lion"],
      ["Adjustable Headrest", "No", "yes"],
      ["Maximum Load Capacity", "280 KG", "300 KG"],
      ["Origin of Manufacture", "India", "India"],
    ],
  },
  {
    title: "Dimensions",
    rows: [
      ["Width", "265.32 cm", "265.32 cm"],
      ["Height", "76 cm", "76 cm"],
      ["Depth", "167.76 cm", "167.76 cm"],
      ["Weight", "45 KG", "65 KG"],
      ["Seat Height", "41.52 cm", "41.52 cm"],
      ["Leg Height", "5.46 cm", "5.46 cm"],
    ],
  },
  {
    title: "Warranty",
    rows: [
      [
        "Warranty Summary",
        "1 Year Manufacturing Warranty",
        "1.2 Year Manufacturing Warranty",
      ],
      [
        "Warranty Service Type",
        "For Warranty Claims or Any Product Related Issues Please Email at operations@trevifurniture.com",
        "For Warranty Claims or Any Product Related Issues Please Email at support@xyz.com",
      ],
      [
        "Covered in Warranty",
        "Warranty Against Manufacturing Defect",
        "Warranty of the product is limited to manufacturing defects only.",
      ],
      [
        "Not Covered in Warranty",
        "The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.",
        "The Warranty Does Not Cover Damages Due To Usage Of The Product Beyond Its Intended Use And Wear & Tear In The Natural Course Of Product Usage.",
      ],
      ["Domestic Warranty", "1 Year", "3 Months"],
    ],
  },
];

function HalfStarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" strokeLinejoin="round" />
      <path d="M12 3v14.3L6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Rating({ rating, reviews }: { rating: string; reviews: number }) {
  return (
    <div className="mt-[10px] flex h-[30px] items-center gap-1.5 text-[#9F9F9F]">
      <span className="text-[18px] font-medium leading-[27px] text-black">
        {rating}
      </span>
      <span className="flex text-[#FFC700]" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 4 }).map((_, index) => (
          <StarIcon key={index} className="h-5 w-5" />
        ))}
        <HalfStarIcon className="h-5 w-5" />
      </span>
      <span className="mx-1 h-[30px] w-px bg-[#9F9F9F]" aria-hidden="true" />
      <span className="whitespace-nowrap text-[13px] leading-5">
        {reviews} Review
      </span>
    </div>
  );
}

function ProductCard({ item }: { item: CompareProduct }) {
  return (
    <article className={`flex min-w-0 flex-col items-start ${item.offsetClass}`}>
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-[#F9F1E7] ${item.imageFrameClass}`}
      >
        <div className="relative h-full w-full">
          <Image
            src={item.product.image}
            alt={item.title}
            fill
            sizes="280px"
            className={item.imageClass}
          />
        </div>
      </div>
      <h2 className={`text-[24px] font-medium leading-[30px] text-black ${item.titleOffsetClass}`}>
        {item.title}
      </h2>
      <p className="mt-1.5 text-[18px] font-medium leading-[27px] text-black">
        {item.price}
      </p>
      <Rating rating={item.rating} reviews={item.reviews} />
    </article>
  );
}

function AddProductMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="xl:pt-[83px]">
      <h2 className="text-[24px] font-semibold leading-[30px] text-black">
        Add A Product
      </h2>
      <div className="relative mt-[14px] w-full">
        <button
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-md bg-gold p-3 text-left text-sm font-semibold text-white transition-colors hover:bg-[#a17a26]"
        >
          <span>Choose a Product</span>
          <ChevronDownIcon
            className={`h-[18px] w-[18px] shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </button>
        {open ? (
          <div
            role="menu"
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-[240px] overflow-y-auto rounded-md border border-gray-200 bg-white py-2 shadow-lg"
          >
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="block whitespace-nowrap px-3 py-2.5 text-left text-sm leading-5 text-ink transition-colors hover:bg-[#F9F1E7] hover:text-gold"
              >
                {product.name}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className="inline-flex h-16 w-full max-w-[215px] items-center justify-center whitespace-nowrap bg-gold px-6 py-4 text-xl font-normal leading-none text-white transition-colors hover:bg-[#a17a26]"
    >
      Add To Cart
    </button>
  );
}

export function ProductComparison() {
  const { products: selectedProducts } = useComparison();
  const selectedItems = selectedProducts.map(createCompareProduct);
  const compared = [
    ...selectedItems,
    ...defaultCompared.filter(
      (item) =>
        !selectedItems.some(
          (selected) => selected.product.id === item.product.id,
        ),
    ),
  ].slice(0, 2);

  return (
    <section className="w-full pb-12 pt-12 lg:pb-[112px] lg:pt-0">
      <div className="mx-auto w-full max-w-[1332px] px-5 sm:px-8 xl:px-0">
        <div className="grid gap-10 min-[480px]:grid-cols-2 xl:grid-cols-[301px_344px_344px_minmax(0,1fr)] xl:gap-0">
          <div className="xl:pl-[42px] xl:pt-[55px]">
            <p className="max-w-[223px] text-[28px] font-medium leading-[35.4px] text-black">
              Go to Product page for more
              <br />
              Products
            </p>
            <Link
              href="/shop"
              className="mt-[21px] inline-block border-b border-[#727272] pb-0.5 text-xl font-medium leading-[30px] text-[#727272] transition-colors hover:border-gold hover:text-gold"
            >
              View More
            </Link>
          </div>

          {compared.map((item) => (
            <div
              key={item.product.id}
              className={`min-w-0 ${item.product.id === asgaardSofa.id ? "xl:pl-[39px]" : "xl:pl-[22px]"}`}
            >
              <ProductCard item={item} />
            </div>
          ))}

          <div className="xl:pl-[30px]">
            <AddProductMenu />
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 lg:mt-[53px]">
          <div className="overflow-x-auto">
            <div className="relative min-w-[1100px]">
              <span className="pointer-events-none absolute inset-y-0 left-[301px] w-0 border-r border-gray-200" aria-hidden="true" />
              <span className="pointer-events-none absolute inset-y-0 left-[645px] w-0 border-r border-gray-200" aria-hidden="true" />
              <span className="pointer-events-none absolute inset-y-0 left-[989px] w-0 border-r border-gray-200" aria-hidden="true" />

              {sections.map((section, sectionIndex) => (
                <div key={section.title}>
                  <div
                    className={`grid grid-cols-[301px_344px_344px_minmax(0,1fr)] ${
                      sectionIndex === 0 ? "pt-[42px]" : "pt-[62px]"
                    }`}
                  >
                    <h2 className="pb-[28px] pl-[42px] text-[28px] font-medium leading-[35.4px] text-black">
                      {section.title}
                    </h2>
                    <div className="pb-[28px]" />
                    <div className="pb-[28px]" />
                    <div />
                  </div>
                  {section.rows.map(([label, first, second]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[301px_344px_344px_minmax(0,1fr)]"
                    >
                      <div className="pb-[34px] pl-[42px] pr-5 text-xl font-normal leading-[25.3px] text-black">
                        {label}
                      </div>
                      <div className="pb-[34px] pl-[62px] pr-5 text-xl font-normal leading-[25.3px] text-black">
                        {first}
                      </div>
                      <div className="pb-[34px] pl-[62px] pr-5 text-xl font-normal leading-[25.3px] text-black">
                        {second}
                      </div>
                      <div />
                    </div>
                  ))}
                </div>
              ))}

              <div className="grid grid-cols-[301px_344px_344px_minmax(0,1fr)] pt-[54px]">
                <div />
                {compared.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center justify-center px-4"
                  >
                    <AddToCartButton product={item.product} />
                  </div>
                ))}
                <div />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
