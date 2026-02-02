import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import "./pedido.css";

const Pedido = () => {
  const [isJumping, setIsJumping] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsJumping(true);
      // la animación dura 1.5s → después de eso la quitamos
      setTimeout(() => setIsJumping(false), 1500);
    }, 3500); // cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <a
      href="https://wa.me/5491164718664"
      target="_blank"
      className={`stickyWhatsapp ${isJumping ? "jumping" : ""}`}
    >
      <p>Hace tu Pedido!</p>
      <div class="logoWpp">
        <FaWhatsapp />
      </div>
    </a>
  );
};

export default Pedido;
