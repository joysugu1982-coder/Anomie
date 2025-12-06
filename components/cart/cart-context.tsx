"use client";

import { Cart, CartItem, Product, ProductVariant } from "@/lib/shopify/types";
import {
  createContext,
  use,
  useContext,
  useMemo,
  useOptimistic,
  useState,
} from "react";

type UpdateType = "plus" | "minus" | "delete";

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (id: string, type: UpdateType) => void;
  addCartItem: (v: ProductVariant, p: Product) => void;

  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ------------------------------------------------------ */
/*                     Helpers                            */
/* ------------------------------------------------------ */

function createEmptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: "",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "USD" },
      totalAmount: { amount: "0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0", currencyCode: "USD" },
    },
  };
}

function calculateItemCost(quantity: number, price: string) {
  return (Number(price) * quantity).toString();
}

function updateTotals(lines: CartItem[], currencyCode: string) {
  const totalQuantity = lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, item) => sum + Number(item.cost.totalAmount.amount),
    0
  );

  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
    },
  };
}

function updateItem(item: CartItem, type: UpdateType): CartItem | null {
  if (type === "delete") return null;

  const newQty = type === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (newQty <= 0) return null;

  const singlePrice =
    Number(item.cost.totalAmount.amount) / item.quantity;

  return {
    ...item,
    quantity: newQty,
    cost: {
      totalAmount: {
        amount: calculateItemCost(newQty, singlePrice.toString()),
        currencyCode: item.cost.totalAmount.currencyCode,
      },
    },
  };
}

/* ------------------------------------------------------ */
/*                   Reducer                              */
/* ------------------------------------------------------ */

function cartReducer(state: Cart | undefined, action: any): Cart {
  const cart = state || createEmptyCart();
  const currencyCode = action.country || "USD";

  switch (action.type) {
    case "UPDATE_ITEM": {
      const updatedLines = cart.lines
        .map((item) =>
          item.merchandise.id === action.payload.id
            ? updateItem(item, action.payload.type)
            : item
        )
        .filter(Boolean) as CartItem[];

      return {
        ...cart,
        ...updateTotals(updatedLines, currencyCode),
        lines: updatedLines,
      };
    }

    case "ADD_ITEM": {
      const { variant, product } = action.payload;

      const existing = cart.lines.find(
        (item) => item.merchandise.id === variant.id
      );

      const newQty = existing ? existing.quantity + 1 : 1;
      const total = calculateItemCost(newQty, variant.price.amount);

      const newItem: CartItem = {
        id: existing?.id,
        quantity: newQty,
        cost: {
          totalAmount: {
            amount: total,
            currencyCode,
          },
        },
        merchandise: {
          id: variant.id,
          title: variant.title,
          selectedOptions: variant.selectedOptions,
          product: {
            id: product.id,
            title: product.title,
            handle: product.handle,
            featuredImage: product.featuredImage,
          },
        },
      };

      const updatedLines = existing
        ? cart.lines.map((x) =>
            x.merchandise.id === variant.id ? newItem : x
          )
        : [...cart.lines, newItem];

      return {
        ...cart,
        ...updateTotals(updatedLines, currencyCode),
        lines: updatedLines,
      };
    }

    default:
      return cart;
  }
}

/* ------------------------------------------------------ */
/*                   Provider                             */
/* ------------------------------------------------------ */

export function CartProvider({
  children,
  cartPromise,
  country,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
  country: string;
}) {
  const initialCart = use(cartPromise) as Cart | undefined;

  const [optimisticCart, updateCart] = useOptimistic(
    initialCart,
    (state, action) => {
      if (!state) state = createEmptyCart();
      return cartReducer(state, action);
    }
  );

  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      cart: optimisticCart,

      updateCartItem: (id: string, type: UpdateType) =>
        updateCart({ type: "UPDATE_ITEM", payload: { id, type }, country }),

      addCartItem: (v: ProductVariant, p: Product) => {
        updateCart({ type: "ADD_ITEM", payload: { variant: v, product: p }, country });
        setIsOpen(true);
      },

      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [optimisticCart, isOpen, country]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ------------------------------------------------------ */
/*                      Hook                               */
/* ------------------------------------------------------ */

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
