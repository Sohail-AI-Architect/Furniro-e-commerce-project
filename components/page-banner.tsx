"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronDownIcon } from "@/components/icons";

type Crumb = { label: string; href?: string };

const FALLBACK_IMAGE = "/images/banner-clean.jpg";

export function PageBanner({
  title,
  crumbs,
  image,
  headingLevel = "h1",
}: {
  title: string;
  crumbs?: Crumb[];
  image?: string;
  headingLevel?: "h1" | "h2";
}) {
  const initialImage =
    typeof image === "string" && image.trim().length > 0
      ? image
      : FALLBACK_IMAGE;
  const [src, setSrc] = useState(initialImage);

  const safeCrumbs = (Array.isArray(crumbs) ? crumbs : []).filter(
    (crumb): crumb is Crumb =>
      Boolean(crumb) &&
      typeof crumb.label === "string" &&
      crumb.label.trim().length > 0,
  );
  const safeTitle =
    typeof title === "string" && title.trim().length > 0 ? title : "";
  const Heading = headingLevel;

  return (
    <section className="relative isolate w-full overflow-hidden bg-white">
      <Image
        src={src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-50"
        onError={() => {
          if (src !== FALLBACK_IMAGE) setSrc(FALLBACK_IMAGE);
        }}
      />
      <div className="relative z-10 mx-auto flex h-[240px] w-full max-w-[1440px] flex-col items-center justify-center gap-0.5 px-5 text-center sm:h-[316px]">
        <Heading className="text-[30px] font-medium leading-[1.2] text-black sm:text-[42px] sm:leading-[1.35] lg:text-[48px] lg:leading-[72px]">
          {safeTitle}
        </Heading>
        {safeCrumbs.length > 0 ? (
          <nav
            aria-label="Breadcrumb"
            className="flex items-center justify-center gap-1.5 text-base leading-6"
          >
            {safeCrumbs.map((crumb, index) => (
              <span key={`${crumb.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronDownIcon
                    className="h-5 w-5 shrink-0 -rotate-90 text-black"
                    aria-hidden="true"
                  />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="font-medium text-black transition-colors hover:text-gold"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-light text-black">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
      </div>
    </section>
  );
}
