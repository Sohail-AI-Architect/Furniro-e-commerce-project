"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon, UserIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";
import { useWishlist } from "@/components/wishlist-provider";

type Account = {
  name: string;
  email: string;
};

const STORAGE_KEY = "funiro-account";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "F";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function AccountMenu() {
  const pathname = usePathname();
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState({
    top: 76,
    left: 16,
    right: 16,
    width: undefined as number | undefined,
  });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (
          parsed &&
          typeof parsed === "object" &&
          typeof (parsed as Account).name === "string" &&
          typeof (parsed as Account).email === "string"
        ) {
          setAccount(parsed as Account);
        }
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (account) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [account, hydrated]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const updatePosition = useCallback(() => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (window.innerWidth < 640) {
      setPosition({
        top: Math.max(rect.bottom + 8, 80),
        left: 16,
        right: 16,
        width: undefined,
      });
    } else {
      setPosition({
        top: rect.bottom + 14,
        left: 0,
        right: Math.max(16, window.innerWidth - rect.right),
        width: 320,
      });
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !buttonRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition]);

  const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const safeName = name.trim();
    const safeEmail = email.trim();
    if (!safeName || !safeEmail) return;
    setAccount({ name: safeName, email: safeEmail });
    setName("");
    setEmail("");
  };

  const panel = open ? (
    <>
      <div
        className="fixed inset-0 z-[64] bg-black/20 backdrop-blur-[1px] sm:hidden"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        id="account-panel"
        role="dialog"
        aria-modal="false"
        aria-label="Account menu"
        style={{
          top: position.top,
          left: position.width ? undefined : position.left,
          right: position.right,
          width: position.width,
        }}
        className="fixed z-[65] max-h-[calc(100vh-96px)] overflow-y-auto rounded-[10px] border border-black/10 bg-white p-5 shadow-2xl"
      >
        {account ? (
          <>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold text-base font-semibold text-white">
                {initials(account.name)}
              </span>
              <div className="min-w-0">
                <p className="truncate text-base font-medium text-black">
                  {account.name}
                </p>
                <p className="truncate text-sm text-muted-light">
                  {account.email}
                </p>
              </div>
            </div>

            <dl className="mt-5 space-y-3 border-y border-black/10 py-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-light">Account status</dt>
                <dd className="font-medium text-new">Signed in</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-light">Saved items</dt>
                <dd className="font-medium text-black">{wishlistCount}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-muted-light">Cart items</dt>
                <dd className="font-medium text-black">{cartCount}</dd>
              </div>
            </dl>

            <div className="mt-4 space-y-1">
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-[6px] px-3 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[#F9F1E7] hover:text-gold"
              >
                My wishlist
                <span className="text-muted-light">{wishlistCount}</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-[6px] px-3 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[#F9F1E7] hover:text-gold"
              >
                My cart
                <span className="text-muted-light">{cartCount}</span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setAccount(null)}
              className="mt-4 w-full rounded-[6px] border border-black px-4 py-2.5 text-sm font-medium text-black transition-colors hover:border-gold hover:bg-gold hover:text-white"
            >
              Sign out
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F9F1E7] text-gold">
                <UserIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="text-base font-medium text-black">
                  Welcome to Furniro
                </p>
                <p className="text-sm text-muted-light">
                  Sign in to view your account details.
                </p>
              </div>
            </div>

            <form onSubmit={handleSignIn} className="mt-5 space-y-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-light">
                  Full name
                </span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  autoComplete="name"
                  className="field rounded-[6px] py-2.5 text-sm"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-light">
                  Email address
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoComplete="email"
                  className="field rounded-[6px] py-2.5 text-sm"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-[6px] bg-gold px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#a17a26]"
              >
                Sign in
              </button>
            </form>

            <p className="mt-3 text-center text-[11px] leading-4 text-muted-light">
              Your account details stay on this device.
            </p>
          </>
        )}

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close account menu"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-muted-light transition-colors hover:bg-[#F9F1E7] hover:text-black sm:hidden"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </>
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label={account ? `Account menu for ${account.name}` : "Account menu"}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="account-panel"
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-6 w-6 items-center justify-center rounded-full text-black transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:h-7 sm:w-7"
      >
        <UserIcon className="h-6 w-6 sm:h-7 sm:w-7" />
        {account ? (
          <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-new ring-2 ring-white" />
        ) : null}
      </button>
      {mounted && panel ? createPortal(panel, document.body) : null}
    </>
  );
}

