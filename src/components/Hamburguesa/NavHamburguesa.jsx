import React, { useState } from "react";
import "./navhamburguesa.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";

const NavHamburguesa = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="hamburguesaButton" onClick={() => setOpen(!open)}>
        {open ? <IoCloseSharp /> : <GiHamburgerMenu />}
      </button>
      {open && (
        <div className="linksHamburguesa">
          <a href="#Sucursales">SUCURSALES</a>
          <a href="#Entregas">ZONAS DE ENTREGA</a>
          <a href="#QuienesSomos">NOSOTROS</a>
          <a href="#contacto">CONTACTO</a>

          <div className="socials">
            <a href="https://www.instagram.com/grupo.bonprix/" target="_blank">
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/grupo-bonprix/?originalSubdomain=ar"
              target="_blank"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://www.tiktok.com/@grupobonprix?_r=1&_t=ZM-91139ZdqeTr"
              target="_blank"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default NavHamburguesa;
