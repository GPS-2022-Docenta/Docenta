import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import docentaLogo from "../images/docenta_logo_sm.png";

function Navbar() {
  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 ">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start my-3">
            <Link to="/" className="flex gap-2 lg:mt-5 lg:mr-16 text-left">
              <div className="flex-none w-9 lg:w-12 py-1 ml-3">
                <img src={docentaLogo} alt="logo" />
              </div>
              <div className="flex-col lg:flex-row">
                <div className="flex items-center">
                  <div className="hidden col-span-1 text-white text-lg lg:text-4xl font-bold leading-relaxed lg:inline-block py-2">
                    Docenta
                  </div>
                </div>
              </div>
            </Link>
            <Link
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              to="/login"
            >
              <FontAwesomeIcon color="white" icon={faUser} />
            </Link>
          </div>
          <div className="text-right">
            <div className="lg:flex flex-grow items-stretch lg:mt-5 bg-slate-100 lg:bg-transparent lg:shadow-none hidden">
              <ul className="flex flex-col lg:flex-row list-none mr-auto">
                <li className="flex items-center">
                  <Link
                    to="/login"
                    className="hover:text-rose-800 text-gray-700 px-2 lg:text-white text-sm lg:text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
                  >
                    Entrar
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
