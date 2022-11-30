import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import loginImage from "../images/login.png";
import docentaLogo from "../images/docenta_logo.png";

import "../css/userFormStyles.css";

function RestorePasswd() {
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  // Comprobar si hay campos vacíos
  const checkNullForm = () => {
    if (password === "" || cPassword === "") {
      return true;
    } else {
      return false;
    }
  };

  // Función para desplegar pop-up de recuperación de contraseña
  const handleRestore = () => {
    if (checkNullForm()) {
      Swal.fire({
        title: "¡Error!",
        text: "Los campos no pueden estar vacíos.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        title: "¡Éxito!",
        text: "Tu contraseña ha sido restaurada correctamente.",
        icon: "success",
        showConfirmButton: false,
        timer: 2500,
      }).then(() => {
        setTimeout(() => {
          window.location.replace("/login");
        }, 1500);
      });
    }
  };

  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <div className=" absolute w-full min-h-full bg-slate-100 grid lg:grid-cols-2 2xl:grid-cols-6 select-none">
          <div className="hidden relative lg:block 2xl:col-span-4">
            <img
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={loginImage}
              alt="Hombre en ordenador"
            />
          </div>
          <div className="flex flex-wrap justify-center content-center w-full px-8 md:px-16 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-24 lg:max-w-full 2xl:col-span-2">
            <div className="xl:max-w-xl w-full">
              <Link to="/">
                <img
                  className="flex flex-wrap text-left w-40 lg:w-60"
                  src={docentaLogo}
                  alt="Hombre en ordenador"
                />
              </Link>
              <h1 className="mt-6 text-2xl font-medium font-style text-gray-900 sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
                Restaurar contraseña
                <br className="hidden lg:inline" />
              </h1>
              <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl font-light">
                Introduce debajo tu nueva contraseña para poder restaurarla y
                acceder nuevamente al sistema.
              </p>
              <br />
              <form autoComplete="off">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                    placeholder="Introduce tu contraseña"
                    style={{ transition: "all .15s ease" }}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Confirmar contraseña
                  </label>
                  <input
                    type="password"
                    className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                    placeholder="Introduce tu contraseña"
                    style={{ transition: "all .15s ease" }}
                    onChange={({ target }) => setCPassword(target.value)}
                  />
                </div>
                <div className="mt-4 sm:mt-6">
                  <button
                    className="inline-block px-5 py-3 rounded-3xl bg-red-600 hover:bg-red-800 uppercase text-center tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base w-full"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={handleRestore}
                  >
                    Enviar
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

export default RestorePasswd;
