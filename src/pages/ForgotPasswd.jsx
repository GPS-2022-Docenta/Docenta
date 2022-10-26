import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import loginImage from "../images/login.png";
import docentaLogo from "../images/docenta_logo.png";
import axios from "axios";

import "../css/userFormStyles.css";

// URLs para manejo de datos en la BD
const usersURL = "https://docenta-api.vercel.app/users/";

function Login() {
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);

  // Extraer usuarios de la BD
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(usersURL);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Función para desplegar pop-up de recuperación de contraseña
  const handleForgot = () => {
    if (checkNullForm()) {
      Swal.fire({
        title: "¡Error!",
        text: "Los campos no pueden estar vacíos.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (!checkEmail()) {
      Swal.fire({
        title: "¡Error!",
        text: "El correo introducido no está asociado a ninguna cuenta.",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      Swal.fire({
        title: "¡Éxito!",
        text: "Se ha enviado un enlace a de recuperación de contraseña. Revisa tu bandeja del correo electrónico para acceder a él.",
        icon: "success",
        showConfirmButton: false,
        timer: 5000,
      }).then(() => {
        setTimeout(() => {
          window.location.replace("/login");
        }, 1000);
      });
    }
  };

  // Comprobar si hay campos vacíos
  const checkNullForm = () => {
    if (email === "") {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar correo electrónico existente
  const checkEmail = () => {
    if (users.find((elem) => elem.email === email)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <div className=" absolute w-full lg:h-full bg-slate-100 grid lg:grid-cols-2 2xl:grid-cols-6 select-none">
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
              <h1 className="mt-6 text-2xl font-medium font-style text-gray-900 sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
                Recuperar contraseña
                <br className="hidden lg:inline" />
              </h1>
              <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl font-light">
                <span className="font-medium text-red-600">
                  ¿Has olvidado tu contraseña?
                </span>{" "}
                <br className="inline" />
                ¡No te preocupes! Aquí podrás restaurarla de nuevo. Simplemente
                introduce tu correo electrónico para recibir un enlace de
                recuperación.
              </p>
              <br />
              <form autoComplete="off">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                    placeholder="Introduce tu correo electrónico"
                    style={{ transition: "all .15s ease" }}
                    onChange={({ target }) => setEmail(target.value)}
                  />
                </div>
                <div className="mt-4 sm:mt-6">
                  <button
                    className="inline-block px-5 py-3 rounded-3xl bg-red-600 hover:bg-red-800 uppercase text-center tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base w-full"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={handleForgot}
                  >
                    Enviar
                  </button>
                </div>
                <div className="mt-2 sm:mt-3">
                  <Link
                    className="inline-block px-5 py-3 rounded-3xl bg-indigo-600 hover:bg-indigo-800 uppercase text-center tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base w-full"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    to="/login"
                  >
                    Volver
                  </Link>
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

export default Login;
