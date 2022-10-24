import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//import Swal from "sweetalert2";
//import axios from "axios";
import "../css/loginStyles.css";

import loginImage from "../images/login.png";
import docentaLogo from "../images/docenta_logo.png";

// URLs para manejo de datos en la BD
// const loginURL = "https://cryptoaholic-api.vercel.app/login/";

function Login() {
  /* const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState(""); */

  /* // Petición a la API de Cryptoaholic para realizar login
  const loginUser = async () => {
    await axios
      .post(loginURL, { nickName: nickName, password: password })
      .then((response) => {
        if (response.status === 200) {
          if (nickName === "admin") {
            sessionStorage.setItem("nickName", nickName);
            sessionStorage.setItem("loggedIn", true);
            sessionStorage.setItem("adminLogin", true);
            setTimeout(() => {
              window.location.replace("/management");
            }, 500);
          } else {
            sessionStorage.setItem("nickName", nickName);
            sessionStorage.setItem("loggedIn", true);
            setTimeout(() => {
              window.location.replace("/my-coins");
            }, 500);
          }
        } else {
          Swal.fire({
            title: "Usuario o contraseña incorrecto!",
            text: "Inténtalo de nuevo",
            icon: "error",
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Usuario o contraseña incorrecto!",
          text: "Inténtalo de nuevo",
          icon: "error",
          timer: 2000,
        });
      });
  }; */

  return (
    <>
      {/* <Navbar transparent /> */}
      <main>
        <div className=" absolute w-full h-full bg-slate-100 grid lg:grid-cols-2 2xl:grid-cols-6 select-none">
          <div className="hidden relative bg-slate-100 lg:block 2xl:col-span-4">
            <img
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={loginImage}
              alt="Hombre en ordenador"
            />
          </div>
          <div className="flex flex-wrap justify-center content-center w-full px-8 md:px-16 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-2 lg:max-w-full bg-slate-100 2xl:col-span-2">
            <div className="xl:max-w-xl w-full">
              <img
                className="flex flex-wrap text-left w-40 lg:w-60 lg:ml-9 mr-9"
                src={docentaLogo}
                alt="Hombre en ordenador"
              />
              <h1 className="mt-6 text-2xl font-medium font-style text-gray-900 sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl lg:ml-9 mr-9">
                Registrar
                <br className="hidden lg:inline" />
              </h1>
              <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl font-light lg:ml-9 mr-9 w-fit">
                ¿Ya tienes una cuenta? <br className="inline lg:hidden" />
                <Link
                  className="text-red-600 hover:text-emerald-600"
                  to="/login"
                  style={{ transition: "all .15s ease" }}
                >
                  Inicia sesión
                </Link>
                .
              </p>
              <br />
              <form>
                <Swiper
                  className="hidden lg:block"
                  navigation={true}
                  modules={[Navigation]}
                >
                  <SwiperSlide className="px-9">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Introduce tu nombre"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Apellido
                      </label>
                      <input
                        type="text"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Introduce tu apellido"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
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
                      />
                    </div>
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
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Fecha de nacimiento
                      </label>
                      <input
                        type="calendar"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Selecciona una fecha del calendario"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide className="px-9">
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        País de residencia
                      </label>
                      <input
                        type="select"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Selecciona un país de la lista"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Número de teléfono
                      </label>
                      <input
                        type="phone"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Introduce tu número de teléfono"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Género
                      </label>
                      <input
                        type="select"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Selecciona un género de la lista"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Introduce tu contraseña"
                        style={{ transition: "all .15s ease" }}
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
                        placeholder="Confirma tu contraseña"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                  </SwiperSlide>
                </Swiper>
                <div className="inline lg:hidden">
                  <div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Introduce tu nombre"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Apellido
                      </label>
                      <input
                        type="text"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Introduce tu apellido"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
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
                      />
                    </div>
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
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Fecha de nacimiento
                      </label>
                      <input
                        type="calendar"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Selecciona una fecha del calendario"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        País de residencia
                      </label>
                      <input
                        type="select"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Selecciona un país de la lista"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Número de teléfono
                      </label>
                      <input
                        type="phone"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Introduce tu número de teléfono"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Género
                      </label>
                      <input
                        type="select"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Selecciona un género de la lista"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                        htmlFor="grid-password"
                      >
                        Contraseña
                      </label>
                      <input
                        type="password"
                        className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                        placeholder="Introduce tu contraseña"
                        style={{ transition: "all .15s ease" }}
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
                        placeholder="Confirma tu contraseña"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-4 px-9">
                  <Link
                    className="inline-block px-5 py-3 rounded-3xl bg-red-600 hover:bg-red-800 uppercase text-center tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base w-full"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    to="/login"
                  >
                    Registrar
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
