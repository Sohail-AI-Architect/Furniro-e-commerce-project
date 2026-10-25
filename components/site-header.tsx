"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import {
  CartIcon,
  CloseIcon,
  HeartIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/icons";
import { AccountMenu } from "@/components/account-menu";
import { CartSidebar } from "@/components/cart-sidebar";
import { SearchModal } from "@/components/search-modal";
import { useCart } from "@/components/cart-provider";
import { useWishlist } from "@/components/wishlist-provider";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { count, isOpen: cartOpen, toggleCart, closeCart } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container-page flex h-[72px] items-center justify-between lg:h-[100px] lg:px-8 xl:px-0">
        <Link href="/" className="flex shrink-0 items-center gap-[5px]" onClick={() => setMenuOpen(false)}>
          <Image
            src="/images/logo-mark.png"
            alt=""
            width={755}
            height={469}
            priority
            className="h-6 w-auto sm:h-7 lg:h-8"
          />
          <span className="text-xl font-bold leading-none text-black sm:text-2xl lg:text-[34px]">
            Furniro
          </span>
        </Link>

        <nav className="hidden items-center gap-10 md:flex lg:gap-[72px]">
          {links.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-colors hover:text-gold ${
                  active ? "text-gold" : "text-black"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-4 lg:gap-[28px]">
          <AccountMenu />
          <button
            type="button"
            aria-label="Search products"
            aria-haspopup="dialog"
            aria-expanded={searchOpen}
            onClick={() => {
              closeCart();
              setMenuOpen(false);
              setSearchOpen(true);
            }}
            className={`flex h-6 w-6 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:h-7 sm:w-7 ${
              searchOpen ? "text-[#a17a26]" : "text-gold hover:text-[#a17a26]"
            }`}
          >
            <SearchIcon className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
          <Link
            href="/wishlist"
            aria-label={`Wishlist, ${wishlistCount} item${wishlistCount === 1 ? "" : "s"}`}
            aria-current={pathname === "/wishlist" ? "page" : undefined}
            className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:h-7 sm:w-7 ${
              pathname === "/wishlist" ? "text-gold" : "text-black hover:text-gold"
            }`}
          >
            <HeartIcon className="h-6 w-6 sm:h-7 sm:w-7" />
            {wishlistCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold leading-none text-white sm:-right-2 sm:-top-2 sm:h-5 sm:min-w-5 sm:text-[11px]">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            aria-label={cartOpen ? "Close cart" : "Open cart"}
            aria-expanded={cartOpen}
            onClick={toggleCart}
            className={`relative flex h-6 w-6 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:h-7 sm:w-7 ${
              cartOpen ? "text-gold" : "text-black hover:text-gold"
            }`}
          >
            <CartIcon className="h-6 w-6 sm:h-7 sm:w-7" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-gold px-1 text-[10px] font-semibold leading-none text-white sm:-right-2 sm:-top-2 sm:h-5 sm:min-w-5 sm:text-[11px]">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Menu"
            className="flex h-6 w-6 items-center justify-center text-black md:hidden sm:h-7 sm:w-7"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon className="h-6 w-6 sm:h-7 sm:w-7" /> : <MenuIcon className="h-6 w-6 sm:h-7 sm:w-7" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-black/5 bg-white md:hidden">
          <div className="container-page flex flex-col py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-3 text-base font-medium text-black"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      </header>

      <CartSidebar />
      {searchOpen ? <SearchModal onClose={closeSearch} /> : null}
    </>
  );
}

