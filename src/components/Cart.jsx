import React from "react";
import { useCartStore } from "../store/useCartStore";

import { auth } from "../firebase/config";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, total } =
    useCartStore();

  const checkStock = () => {
    console.log("Checkear stock por cada producto");
    allowed = checkStockForAllProducts(); // comprobar en el back end, llamar a utils/api y dentro llamar la api por cada codigo de producto
    if (allowed) {
      handleCheckoutClick();
    } else {
      alert("Algunos productos en tu carrito no tienen stock suficiente.");
    }
  };

  const handleCheckoutClick = () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Debes iniciar sesión para finalizar la compra 🧾");
      return;
    }

    // Si está logueado, procede con el checkout
  };

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
                key={item.codigo}
                className="flex justify-between items-center border-b py-2"
              >
                <div>
                  <p className="font-semibold">{item.descripcion}</p>
                  <p className="text-sm text-gray-500">${item.precioVenta}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.codigo,
                        Math.max(item.quantity - 1, 1)
                      )
                    }
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    disabled={() => item.quantity >= item.stock}
                    onClick={() =>
                      updateQuantity(
                        item.codigo,
                        Math.max(item.quantity + 1, 1)
                      )
                    }
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeFromCart(item.codigo)}
                    className="text-red-500 ml-3"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 font-bold">Total: ${total()}</div>

            <button onClick={checkStock} style={{ marginTop: 20 }}>
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
