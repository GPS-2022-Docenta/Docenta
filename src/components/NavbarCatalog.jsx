import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import docentaLogo from "../images/docenta_logo_sm.png";

function NavbarCatalog() {
  const [open, setOpen] = useState(false);
  const Links = [
    { name: "Catálogo", link: "/catalog" },
    { name: "Favoritos", link: "/favoritos" },
    { name: "Perfil", link: "/profile" },
  ];

  return (
    <>
      <nav className="shadow-md z-50 w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-7">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start my-3">
            <Link to="/" className="flex gap-2 lg:mt-5 lg:mr-16 text-left">
              <div className="flex-none  w-9 lg:w-12 lg:py-1 ml-4">
                <img src={docentaLogo} alt="logo" />
              </div>
              <div className="flex-col lg:flex-row">
                <div className="flex items-center">
                  <div className="hidden col-span-1 text-slate-800 text-lg lg:text-4xl font-bold leading-relaxed lg:inline-block py-2">
                    Docenta
                  </div>
                </div>
              </div>
            </Link>
            <button
              className={`cursor-pointer ${
                open ? "mr-1" : ""
              } text-xl leading-none px-3 lg:py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none`}
              type="button"
              onClick={() => setOpen(!open)}
            >
              <FontAwesomeIcon
                color="orange"
                icon={open ? faClose : faBars}
                size="xl"
              />
            </button>
          </div>
          <ul
            className={`lg:flex lg:items-center text-center max-lg:mt-3 lg:pb-0 pb-auto absolute lg:static max-lg:backdrop-blur-sm max-lg:bg-white/60 lg:z-auto z-[-1] left-0 w-full lg:w-auto lg:pl-0 px-9 transition-all duration-500 ease-in ${
              open
                ? "top-20 opacity-100"
                : "top-[-30rem] lg:opacity-100 opacity-0"
            }`}
          >
            {Links.map((link) => (
              <li key={link.name} className="md:ml-8 md:my-0 my-3 py-1">
                <Link
                  to={link.link}
                  className={`${
                    link.name === "Catálogo"
                      ? "text-red-800 font-extrabold italic"
                      : "text-slate-800"
                  } hover:text-rose-800 duration-300 px-2 text-md lg:text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavbarCatalog;
