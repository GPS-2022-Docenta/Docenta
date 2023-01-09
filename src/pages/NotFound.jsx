import React from "react";
import { useNavigate } from "react-router-dom";
import Error404 from "../images/error_404.svg";

function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <main>
        <div className="home-container absolute w-full h-full z-[-1] flex flex-col text-center items-center justify-center text-white">
          <div className="grid grid-cols-2 max-lg:grid-cols-1 w-5/6 gap-8 lg:gap-14">
            <div className="col-span-1">
              <img src={Error404} alt="Error404" />
            </div>
            <div className="col-span-1 flex flex-col justify-center">
              <h1 className="text-3xl lg:text-5xl font-semibold my-5">
                Algo no ha ido bien...
              </h1>
              <h4 className="">
                La página que estás intentando abrir no existe. Puede que hayas
                introducido mal la dirección, o que la página haya sido movida a
                otra URL.
              </h4>
              <button
                className="mx-auto col-span-1 inline-block px-5 py-3 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-800 text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-80 max-sm:w-full"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={() => navigate(-1)}
              >
                Volver atrás
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default NotFound;
