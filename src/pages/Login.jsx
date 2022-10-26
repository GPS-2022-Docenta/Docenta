import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ButtonUnstyled } from "@mui/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";
import "../css/userFormStyles.css";
import loginImage from "../images/login.png";
import docentaLogo from "../images/docenta_logo.png";

// URLs para manejo de datos en la BD
const loginURL = "https://docenta-api.vercel.app/login/";

function Login() {
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  // Mostrar contraseña
  const handleToggle = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  // Función de inicio de sesión
  const handleLogin = (event) => {
    event.preventDefault();
    // Comprobar si hay campos vacíos
    if (nickName === "" || password === "") {
      Swal.fire({
        title: "¡Error!",
        text: "Los campos no pueden estar vacíos.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      loginUser();
    }
  };

  // Petición a la API de Cryptoaholic para realizar login
  const loginUser = async () => {
    await axios
      .post(loginURL, { nickName: nickName, password: password })
      .then((response) => {
        if (response.status === 200) {
          if (nickName === "admin") {
            sessionStorage.setItem("nickName", nickName);
            sessionStorage.setItem("loggedIn", true);
            sessionStorage.setItem("adminLogin", true);
            /* setTimeout(() => {
              window.location.replace("/management");
            }, 500); */
          } else {
            sessionStorage.setItem("nickName", nickName);
            sessionStorage.setItem("loggedIn", true);
            setTimeout(() => {
              window.location.replace("/profile");
            }, 500);
          }
        } else {
          Swal.fire({
            title: "¡Error!",
            text: "Usuario o contraseña incorrecto. Inténtalo de nuevo.",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "¡Error!",
          text: "Usuario o contraseña incorrecto. Inténtalo de nuevo.",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <>
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
                Iniciar sesión
                <br className="hidden lg:inline" />
              </h1>
              <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl font-light w-fit">
                ¿Todavía no tienes cuenta? <br className="inline lg:hidden" />
                <Link
                  className="text-red-600 hover:text-emerald-600"
                  to="/register"
                  style={{ transition: "all .15s ease" }}
                >
                  Regístrate
                </Link>
                .
              </p>
              <br />
              <form autoComplete="off">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                    htmlFor="grid-password"
                  >
                    Nombre de usuario
                  </label>
                  <input
                    type="text"
                    className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                    placeholder="Introduce tu nombre de usuario"
                    style={{ transition: "all .15s ease" }}
                    onChange={({ target }) => setNickName(target.value)}
                  />
                </div>
                <div className="relative w-full mb-3">
                  <div className="grid lg:grid-cols-2 2xl:grid-cols-2">
                    <div className="lg:col-span-1">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Contraseña
                      </label>
                    </div>
                    <div className="lg:col-span-1 text-right text-xs font-medium"></div>
                  </div>
                  <div className="grid grid-cols-12">
                    <div className="col-span-11 text-left mr-1">
                      <input
                        type={type}
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Introduce tu contraseña"
                        style={{ transition: "all .15s ease" }}
                        onChange={({ target }) => setPassword(target.value)}
                      />
                    </div>
                    <div className="lg:col-span-1 text-right">
                      <ButtonUnstyled
                        onClick={handleToggle}
                        className="border-b-2 px-auto py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 w-full"
                      >
                        <FontAwesomeIcon icon={icon} />
                      </ButtonUnstyled>
                    </div>
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 2xl:grid-cols-2">
                  <div className="2xl:col-span-1">
                    <label className="inline-flex items-center cursor-pointer pt-2">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded-lg text-red-800 ml-1 w-5 h-5"
                        style={{ transition: "all .15s ease" }}
                      />
                      <span className="ml-2 text-sm font-light text-gray-700">
                        Recuérdame
                      </span>
                    </label>
                  </div>
                  <div className="2xl:col-span-1 lg:text-right">
                    <label className="inline-flex items-center cursor-pointer pt-2">
                      <Link
                        className="text-sm font-light text-gray-700 hover:text-red-600"
                        to="/forgot-passwd"
                        style={{ transition: "all .15s ease" }}
                      >
                        ¿Has olvidado tu contraseña?
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="mt-4 sm:mt-6">
                  <button
                    className="inline-block px-5 py-3 rounded-3xl bg-red-600 hover:bg-red-800 uppercase text-center tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base w-full"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={handleLogin}
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
