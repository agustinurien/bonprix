import React from "react";
import { useCartStore } from "../store/useCartStore";
import { handleCheckout } from "../utils/checkout";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, total } =
    useCartStore();
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          <>
            {cart.map((item) => (
              <div
                key={item.sku}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.sku, Math.max(item.quantity - 1, 1))
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.sku, item.quantity + 1)}
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.sku)}
                    className="text-red-500 ml-3"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 font-bold">Total: ${total()}</div>

            <button onClick={handleCheckout} style={{ marginTop: 20 }}>
              Finalizar Compra
            </button>

            <button onClick={clearCart} style={{ marginTop: 20 }}>
              Vaciar carrito
            </button>
          </>
        </ul>
      )}
    </div>
  );
};

export default Cart;
