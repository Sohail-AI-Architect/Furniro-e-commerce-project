"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FacebookIcon,
  LinkedInIcon,
  ShareIcon,
  StarIcon,
  TwitterIcon,
} from "@/components/icons";
import { useCart } from "@/components/cart-provider";
import { useComparison } from "@/components/comparison-provider";
import { ProductCard } from "@/components/product-card";
import { formatPrice, getProduct, type Product } from "@/lib/products";

const sizes = ["L", "XL", "XS"];
const colors = [
  { name: "Purple", value: "#816DFA" },
  { name: "Black", value: "#000000" },
  { name: "Gold", value: "#B88E2F" },
];
const tabs = ["Description", "Additional Information", "Reviews [5]"];
const relatedSlugs = ["syltherine", "leviosa", "lolito", "respira"];

const relatedProducts = relatedSlugs
  .map((slug) => getProduct(slug))
  .filter((product): product is Product => Boolean(product));

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { addProduct, removeProduct, isCompared } = useComparison();
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const featureImages = product.featureImages?.length
    ? product.featureImages
    : gallery.slice(0, 2);
  const [activeImage, setActiveImage] = useState(0);
  const [previewImage, setPreviewImage] = useState(gallery[0]);
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[2].name);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(tabs[0]);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | null>(null);
  const compared = isCompared(product.slug);

  const category = product.slug === "asgaard-sofa" ? "Sofas" : product.category;

  useEffect(
    () => () => {
      if (copiedTimer.current !== null) {
        window.clearTimeout(copiedTimer.current);
      }
    },
    [],
  );

  const shareUrl = () => `${window.location.origin}/product/${product.slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl());
      setCopied(true);
      if (copiedTimer.current !== null) {
        window.clearTimeout(copiedTimer.current);
      }
      copiedTimer.current = window.setTimeout(() => {
        setCopied(false);
        copiedTimer.current = null;
      }, 4000);
    } catch {
      setCopied(false);
    }
  };

  const handleSocialShare = (network: "facebook" | "linkedin" | "twitter") => {
    const url = encodeURIComponent(shareUrl());
    const targets = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}`,
    };
    window.open(targets[network], "_blank", "noopener,noreferrer");
  };

  const handleCompare = () => {
    if (compared) {
      removeProduct(product.slug);
    } else {
      addProduct(product);
    }
  };

  const handleImageSelect = (index: number) => {
    setActiveImage(index);
    setPreviewImage(gallery[index]);
  };

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);

    const colorImage = product.colorImages?.[colorName];
    if (!colorImage) return;

    setPreviewImage(colorImage);
    const imageIndex = gallery.indexOf(colorImage);
    if (imageIndex >= 0) setActiveImage(imageIndex);
  };

  return (
    <>
      <section className="bg-white">
        <div className="container-page grid gap-10 py-10 lg:grid-cols-2 lg:gap-12 lg:px-8 xl:grid-cols-[553px_606px] xl:justify-between xl:gap-0 xl:px-0 xl:py-[35px]">
          <div className="flex flex-col-reverse gap-6 sm:flex-row sm:gap-[31px]">
            <div className="grid grid-cols-4 gap-3 sm:flex sm:flex-col sm:gap-8">
              {gallery.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => handleImageSelect(index)}
                  className={`relative h-20 w-full shrink-0 overflow-hidden rounded-[10px] border-2 bg-[#F9F1E7] transition-colors sm:w-[76px] ${
                    activeImage === index ? "border-gold" : "border-transparent"
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="76px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <div className="relative aspect-[423/500] w-full max-w-[423px] overflow-hidden rounded-[10px] bg-[#F9F1E7]">
              <Image
                src={previewImage}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 423px"
                className="object-contain"
              />
            </div>
          </div>

          <div className="min-w-0">
            <h1 className="text-[32px] font-normal leading-[1.2] text-black lg:text-[42px] lg:leading-[63px]">
              {product.name}
            </h1>
            <p className="text-2xl font-medium leading-9 text-[#9F9F9F]">
              {formatPrice(product.price, 2)}
            </p>

            <div className="mt-[15px] flex items-center">
              <div className="flex text-[#FFDA5B]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} className="h-5 w-5" />
                ))}
              </div>
              <span className="mx-[22px] h-[30px] w-px bg-[#9F9F9F]" />
              <span className="text-[13px] leading-[19.5px] text-[#9F9F9F]">
                5 Customer Review
              </span>
            </div>

            <p className="mt-[18px] max-w-[424px] text-[13px] leading-[19.5px] text-black">
              Setting the bar as one of the loudest speakers in its class, the
              Kilburn is a compact, stout-hearted hero with a well-balanced audio
              which boasts a clear midrange and extended highs for a sound.
            </p>

            <div className="mt-[22px]">
              <p className="text-sm leading-[21px] text-[#9F9F9F]">Size</p>
              <div className="mt-3 flex gap-4">
                {sizes.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSelectedSize(option)}
                    aria-pressed={selectedSize === option}
                    className={`h-[30px] w-[30px] rounded-[5px] text-[13px] transition-colors ${
                      selectedSize === option
                        ? "bg-gold text-white"
                        : "bg-[#F9F1E7] text-black hover:bg-gold/20"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-[18px]">
              <p className="text-sm leading-[21px] text-[#9F9F9F]">Color</p>
              <div className="mt-3 flex gap-4">
                {colors.map((option) => (
                  <button
                    key={option.name}
                    type="button"
                    onClick={() => handleColorSelect(option.name)}
                    aria-label={`Color ${option.name}`}
                    aria-pressed={selectedColor === option.name}
                    title={option.name}
                    style={{ backgroundColor: option.value }}
                    className={`h-[30px] w-[30px] rounded-full transition-transform ${
                      selectedColor === option.name
                        ? "ring-2 ring-gold ring-offset-2"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-[18px]">
              <div className="flex h-16 w-[123px] items-center justify-between rounded-[10px] border border-[#9F9F9F] px-4">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  className="text-base leading-6 hover:text-gold"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-base font-medium leading-6">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  className="text-base leading-6 hover:text-gold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                onClick={() =>
                  addItem(product, quantity, {
                    selectedSize,
                    selectedColor,
                  })
                }
                className="h-16 w-[215px] rounded-[15px] border border-black text-xl leading-[30px] text-black transition-colors hover:border-gold hover:bg-gold hover:text-white"
              >
                Add To Cart
              </button>
              <button
                type="button"
                onClick={handleCompare}
                aria-pressed={compared}
                className={`flex h-16 w-[215px] items-center justify-center gap-2 rounded-[15px] border text-xl leading-[30px] transition-colors ${
                  compared
                    ? "border-gold bg-gold text-white"
                    : "border-black text-black hover:border-gold hover:text-gold"
                }`}
              >
                <span className="text-[23px] leading-[34.5px]">+</span>
                Compare
              </button>
            </div>

            <div className="mt-[60px] max-w-[605px] border-t border-[#D9D9D9] pt-[41px] text-base leading-6 text-[#9F9F9F]">
              <dl className="space-y-3">
                <div className="flex items-center">
                  <dt className="w-[91px] shrink-0">SKU</dt>
                  <dd className="w-4 shrink-0">:</dd>
                  <dd>SS001</dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-[91px] shrink-0">Category</dt>
                  <dd className="w-4 shrink-0">:</dd>
                  <dd>{category}</dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-[91px] shrink-0">Tags</dt>
                  <dd className="w-4 shrink-0">:</dd>
                  <dd>Sofa, Chair, Home, Shop</dd>
                </div>
                <div className="flex items-center">
                  <dt className="w-[91px] shrink-0">Share</dt>
                  <dd className="w-4 shrink-0">:</dd>
                  <dd className="flex items-center gap-[25px]">
                    <button
                      type="button"
                      onClick={() => handleSocialShare("facebook")}
                      aria-label="Share on Facebook"
                      className="text-black transition-colors hover:text-gold"
                    >
                      <FacebookIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialShare("linkedin")}
                      aria-label="Share on LinkedIn"
                      className="text-black transition-colors hover:text-gold"
                    >
                      <LinkedInIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSocialShare("twitter")}
                      aria-label="Share on Twitter"
                      className="text-black transition-colors hover:text-gold"
                    >
                      <TwitterIcon className="h-[25px] w-[25px]" />
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      aria-label="Copy product link"
                      className="inline-flex items-center gap-1 text-sm text-[#9F9F9F] transition-colors hover:text-gold"
                    >
                      <ShareIcon className="h-4 w-4" />
                      Copy link
                    </button>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="container-page pb-[65px] pt-[48px] lg:px-8 xl:px-0">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-[52px]">
            {tabs.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`border-b-2 pb-2 text-base leading-9 transition-colors lg:text-2xl ${
                  tab === item
                    ? "border-black font-medium text-black"
                    : "border-transparent text-[#9F9F9F] hover:text-black"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-9 max-w-[1026px] text-justify text-base leading-6 text-[#9F9F9F]">
            {tab === tabs[0] && (
              <>
                <div className="space-y-[30px]">
                  <p>
                    Embodying the raw, wayward spirit of rock &apos;n&apos; roll,
                    the Kilburn portable active stereo speaker takes the
                    unmistakable look and sound of Marshall, unplugs the chords,
                    and takes the show on the road.
                  </p>
                  <p>
                    Weighing in under 7 pounds, the Kilburn is a lightweight piece
                    of vintage styled engineering. Setting the bar as one of the
                    loudest speakers in its class, the Kilburn is a compact,
                    stout-hearted hero with a well-balanced audio which boasts a
                    clear midrange and extended highs for a sound that is both
                    articulate and pronounced. The analogue knobs allow you to
                    fine tune the controls to your personal preferences while the
                    guitar-influenced leather strap enables easy and stylish
                    travel.
                  </p>
                </div>
                <div className="mt-9 grid gap-[29px] sm:grid-cols-2">
                  {featureImages.map((image) => (
                    <div
                      key={image}
                      className="relative aspect-[605/348] overflow-hidden rounded-[10px] bg-[#F9F1E7]"
                    >
                      <Image
                        src={image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 90vw, 505px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
            {tab === tabs[1] && (
              <dl className="grid gap-3 text-left sm:grid-cols-2">
                {[
                  ["Weight", "12 kg"],
                  ["Dimensions", "120 × 90 × 80 cm"],
                  ["Material", "Solid wood, velvet"],
                  ["Frame", "Kiln-dried hardwood"],
                  ["Assembly", "Delivered pre-assembled"],
                  ["Care", "Wipe with a soft dry cloth"],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-2">
                    <dt className="font-medium text-black">{label}:</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {tab === tabs[2] && (
              <div className="space-y-6 text-left">
                {[
                  {
                    name: "Ayesha",
                    text: "Beautiful sofa, the fabric feels premium and the delivery was quick.",
                  },
                  {
                    name: "Rahul",
                    text: "Perfect size for my living room. Assembly was effortless.",
                  },
                  {
                    name: "Mei",
                    text: "Colour is exactly as shown. Very comfortable for daily use.",
                  },
                ].map((review) => (
                  <div key={review.name} className="border-b border-line pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-black">
                        {review.name}
                      </span>
                      <span className="flex text-[#FFDA5B]">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon key={index} className="h-3.5 w-3.5" />
                        ))}
                      </span>
                    </div>
                    <p className="mt-2">{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white pb-[104px] pt-[55px]">
        <div className="container-page lg:px-8 xl:px-0">
          <h2 className="text-center text-[28px] font-medium leading-[1.5] text-black lg:text-[36px]">
            Related Products
          </h2>
          <div className="mt-[26px] grid gap-8 min-[480px]:grid-cols-2 min-[1025px]:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
          <div className="mt-[44px] flex justify-center">
            <Link
              href="/shop"
              className="btn-outline-gold h-12 min-w-[245px] border-gold py-0 text-base font-normal normal-case tracking-normal"
            >
              Show More
            </Link>
          </div>
        </div>
      </section>

      {copied ? (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-5 right-5 z-[100] mx-auto max-w-sm rounded-[10px] bg-new px-5 py-3 text-center text-sm font-medium text-white shadow-2xl"
        >
          Product link copied to clipboard!
        </div>
      ) : null}
    </>
  );
}
