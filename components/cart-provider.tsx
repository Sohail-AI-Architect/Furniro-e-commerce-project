"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/products";

export type CartItemSelection = {
  selectedSize?: string;
  selectedColor?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (
    product: Product,
    quantity?: number,
    selection?: CartItemSelection,
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  hydrated: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "funiro-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const valid = parsed
            .filter(
              (item): item is CartItem =>
                Boolean(item) &&
                typeof item === "object" &&
                Boolean((item as CartItem).product) &&
                typeof (item as CartItem).product.id === "string" &&
                typeof (item as CartItem).quantity === "number" &&
                Number.isFinite((item as CartItem).quantity),
            )
            .map((item) => ({
              ...item,
              quantity: Math.max(1, Math.floor(item.quantity)),
            }));
          setItems(valid);
        }
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = (
    product: Product,
    quantity = 1,
    selection?: CartItemSelection,
  ) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                ...(selection?.selectedSize
                  ? { selectedSize: selection.selectedSize }
                  : {}),
                ...(selection?.selectedColor
                  ? { selectedColor: selection.selectedColor }
                  : {}),
              }
            : item,
        );
      }
      return [
        ...current,
        {
          product,
          quantity,
          selectedSize: selection?.selectedSize,
          selectedColor: selection?.selectedColor,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (id: string) =>
    setItems((current) => current.filter((item) => item.product.id !== id));

  const updateQuantity = (id: string, quantity: number) =>
    setItems((current) =>
      current.map((item) =>
        item.product.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    );

  const clearCart = () => setItems([]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
    return {
      items,
      count,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      hydrated,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      toggleCart: () => setIsOpen((open) => !open),
    };
  }, [items, isOpen, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
