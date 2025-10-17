import { useCartStore } from "../store/useCartStore";

export const handleCheckout = async () => {
  const cart = useCartStore.getState().cart;

  if (cart.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  try {
    // simular checkout al backend
    const res = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Compra realizada con éxito ✅");
      useCartStore.getState().clearCart(); // vaciar carrito
    } else {
      alert(data.error || "Error al procesar la compra ❌");
    }
  } catch (err) {
    console.error(err);
    alert("Error de conexión con el servidor ⚠️");
  }
};
