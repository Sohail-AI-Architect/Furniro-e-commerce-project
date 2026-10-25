import Link from "next/link";
import { ChevronDownIcon } from "@/components/icons";

export function ProductBreadcrumb({ productName }: { productName: string }) {
  return (
    <section className="bg-[#F9F1E7]">
      <div className="container-page flex h-[100px] items-center lg:px-8 xl:px-0">
        <nav
          aria-label="Breadcrumb"
          className="flex min-w-0 flex-wrap items-center gap-3 text-base leading-6"
        >
          <Link
            href="/"
            className="font-normal text-[#9F9F9F] transition-colors hover:text-gold"
          >
            Home
          </Link>
          <ChevronDownIcon
            className="h-5 w-5 shrink-0 -rotate-90 text-black"
            aria-hidden="true"
          />
          <Link
            href="/shop"
            className="font-normal text-[#9F9F9F] transition-colors hover:text-gold"
          >
            Shop
          </Link>
          <span
            className="mx-[13px] h-[37px] w-px shrink-0 bg-[#9F9F9F]"
            aria-hidden="true"
          />
          <span className="min-w-0 truncate font-normal text-black">
            {productName}
          </span>
        </nav>
      </div>
    </section>
  );
}
