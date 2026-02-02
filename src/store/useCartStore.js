import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product) => {
        console.log("Agregando al carrito:", product);

        const cart = get().cart;
        const existing = cart.find((item) => item.codigo === product.codigo);

        let updatedCart;
        if (existing) {
          updatedCart = cart.map((item) =>
            item.codigo === product.codigo
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          updatedCart = [...cart, { ...product, quantity: 1 }];
        }

        set({ cart: updatedCart });
      },

      removeFromCart: (codigo) => {
        const updatedCart = get().cart.filter((item) => item.codigo !== codigo);
        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [] }),

      updateQuantity: (codigo, quantity) => {
        const updatedCart = get().cart.map((item) =>
          item.codigo === codigo ? { ...item, quantity } : item
        );
        set({ cart: updatedCart });
      },

      total: () =>
        get()
          .cart.reduce((acc, item) => acc + item.precioVenta * item.quantity, 0)
          .toFixed(2),
    }),
    {
      name: "cart-storage",
    }
  )
);
