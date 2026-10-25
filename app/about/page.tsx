import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageBanner } from "@/components/page-banner";
import { Features } from "@/components/features";

export const metadata: Metadata = {
  title: "About — Furniro",
  description: "The story behind Furniro and our approach to timeless furniture.",
};

const bannerImage =
  "/images/banner-clean.jpg";

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="About"
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
        image={bannerImage}
      />

      <section className="container-page py-14 lg:py-[100px]">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[28px] font-semibold leading-tight text-black lg:text-[40px]">
              Furniture made to be lived with, for years to come
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-dark">
              Furniro began with a simple idea: beautiful furniture should not be
              complicated. We work with skilled makers to create pieces that are
              honest in their materials, generous in comfort, and timeless in
              shape.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-dark">
              Every collection starts in our studio, where we sketch, prototype
              and refine until a piece feels just right. The result is furniture
              that settles into your home naturally — and stays there.
            </p>
            <Link href="/shop" className="btn-gold mt-8">
              Explore Collection
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[10px] bg-mist">
            <Image
              src="/images/about-studio.jpg"
              alt="Furniro studio"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>

        <dl className="mt-16 grid gap-8 border-t border-line pt-12 sm:grid-cols-3">
          {[
            ["12+", "Years of craft"],
            ["50k+", "Happy homes"],
            ["100%", "Responsibly sourced wood"],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <dt className="text-[40px] font-bold text-gold">{value}</dt>
              <dd className="mt-1 text-base text-muted-dark">{label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <Features />
    </>
  );
}

