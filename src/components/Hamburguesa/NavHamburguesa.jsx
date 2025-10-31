import React, { useState } from "react";
import "./navhamburguesa.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const NavHamburguesa = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="hamburguesaButton" onClick={() => setOpen(!open)}>
        {open ? <IoCloseSharp /> : <GiHamburgerMenu />}
      </button>
      {open && (
        <div className="linksHamburguesa">
          <a href="/">SUCURSALES</a>
          <a href="/products">ZONAS DE ENTREGA</a>
          <a href="/about">NOSOTROS</a>
          <a href="/about">CONTACTO</a>
        </div>
      )}
    </>
  );
};

export default NavHamburguesa;
