import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        const cart = get().cart;
        const existing = cart.find((item) => item.sku === product.sku);

        let updatedCart;
        if (existing) {
          updatedCart = cart.map((item) =>
            item.sku === product.sku
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        set({ cart: updatedCart });
      },

      removeFromCart: (sku) => {
        const updatedCart = get().cart.filter((item) => item.sku !== sku);
        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [] }),

      updateQuantity: (sku, quantity) => {
        const updatedCart = get().cart.map((item) =>
          item.sku === sku ? { ...item, quantity } : item
        );
        set({ cart: updatedCart });
      },

      total: () =>
        get()
          .cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2),
    }),
    {
      name: "cart-storage", // clave en localStorage
    }
  )
);
