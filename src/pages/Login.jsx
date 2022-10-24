import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import loginImage from "../images/login.png";
import docentaLogo from "../images/docenta_logo.png";

import "../css/login.css";

export default function Login() {
  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <div className=" absolute w-full h-full bg-gray-100 grid lg:grid-cols-2 2xl:grid-cols-6">
          <div className="hidden relative lg:block 2xl:col-span-4">
            <img
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={loginImage}
              alt="Hombre en ordenador"
            />
          </div>
          <div className="flex flex-wrap justify-center content-center w-full px-8 md:px-16 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full 2xl:col-span-2">
            <div className="xl:max-w-xl w-full">
              <img
                className="flex flex-wrap text-left w-40 lg:w-60"
                src={docentaLogo}
                alt="Hombre en ordenador"
              />
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
                Iniciar sesión
                <br className="hidden lg:inline" />
              </h1>
              <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl">
                ¿Ya tienes una cuenta? <br className="inline lg:hidden" />
                Inicia sesión{" "}
                <Link
                  className="text-red-600 hover:text-indigo-600"
                  to="/login"
                  style={{ transition: "all .15s ease" }}
                >
                  aquí
                </Link>{" "}
                !
              </p>
              <br />
              <form>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="border-b-2 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                    placeholder="Introduce tu correo electrónico"
                    style={{ transition: "all .15s ease" }}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="border-b-2 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                    placeholder="Introduce tu contraseña"
                    style={{ transition: "all .15s ease" }}
                  />
                </div>
                <div className="grid lg:grid-cols-2 2xl:grid-cols-2">
                  <div className="2xl:col-span-1">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded-lg text-red-800 ml-1 w-5 h-5"
                        style={{ transition: "all .15s ease" }}
                      />
                      <span className="ml-2 text-sm font-semibold text-gray-700 pointer-events-none">
                        Recuérdame
                      </span>
                    </label>
                  </div>
                  <div className="2xl:col-span-1">
                    <label className="inline-flex items-center cursor-pointer">
                      <Link
                        className="ml-2 text-sm font-semibold text-gray-700 hover:text-red-600"
                        to={""}
                        style={{ transition: "all .15s ease" }}
                      >
                        ¿Has olvidado tu contraseña?
                      </Link>
                    </label>
                  </div>
                </div>
                <br />
                <div className="mt-4 sm:mt-6">
                  <button
                    className="inline-block px-5 py-3 rounded-3xl bg-red-600 hover:bg-red-800 uppercase tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base w-full"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <Footer absolute /> */}
        </div>
      </main>
    </>
  );
}
