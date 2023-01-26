import React from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/userFormStyles.css";
import loginImage from "../images/login.png";
import docentaLogo from "../images/docenta_logo.png";
import RegisterWeb from "./RegisterWeb";
import RegisterMobile from "./RegisterMobile";

function Register() {
  return (
    <>
      <main>
        <div className="absolute w-full lg:h-full bg-slate-100 grid lg:grid-cols-2 2xl:grid-cols-6 select-none">
          <div className="hidden relative bg-slate-100 lg:block 2xl:col-span-4">
            <img
              className="absolute inset-0 w-full h-full object-cover object-center"
              src={loginImage}
              alt="Hombre en ordenador"
            />
          </div>
          <div className="flex flex-wrap justify-center content-center w-full px-8 md:px-16 py-12 max-w-md mx-auto sm:max-w-xl lg:px-12 lg:py-12 lg:max-w-full bg-slate-100 2xl:col-span-2">
            <div className="xl:max-w-xl w-full">
              <Link to="/">
                <img
                  className="flex flex-wrap text-left w-40 lg:w-60"
                  src={docentaLogo}
                  alt="Hombre en ordenador"
                />
              </Link>
              <h1 className="mt-6 text-2xl font-medium font-style text-gray-900 sm:mt-8 sm:text-4xl lg:text-3xl xl:text-4xl">
                Registrar
                <br className="hidden lg:inline" />
              </h1>
              <p className="mt-2 text-gray-600 sm:mt-4 sm:text-xl font-light">
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
              <form autoComplete="off">
                <p className="font-normal text-red-600 text-left text-sm">
                  * Campos obligatorios.
                </p>
                <br />
                <div className="hidden lg:block">
                  <RegisterWeb />
                </div>
                <div className="block lg:hidden">
                  <RegisterMobile />
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;
