import React from "react";
import { Link } from "react-router-dom";
import "../css/catalog.css";
import userIcon from "../images/user-management-icon.png";
import dashboardIcon from "../images/dashboard-icon-new.png";
import contentIcon from "../images/content-icon.png";
import NavbarManagement from "../components/NavbarManagement";

function Management() {
  return (
    <>
      <main>
        <NavbarManagement />
        <div id="top-index" className="App-header">
          <div className="absolute top-28 lg:top-52">
            <h1 className="text-4xl lg:text-6xl text-center font-semibold mt-10">
              Administración
            </h1>
          </div>
          <div className="max-lg:mt-64 mt-80 mb-5 grid grid-cols-3 max-md:grid-cols-1 items-center gap-16">
            <Link
              to={"/user-management"}
              data-test="course-card"
              className="max-w-lg h-96 border-4 border-slate-800 hover:border-zinc-100 hover:scale-105 duration-200 overflow-hidden bg-white rounded-2xl my-2 shadow-lg dark:bg-gray-800"
            >
              <img
                className="object-cover bg-white hover:bg-gradient-to-bl from-amber-300 to-indigo-400 w-fit h-72"
                src={userIcon}
                alt="Administrar usuarios"
              />
              <div className="px-4 py-2">
                <h1 className="mt-5 text-2xl text-center h-22 font-bold text-gray-800 dark:text-white">
                  Administrar usuarios
                </h1>
              </div>
            </Link>
            <Link
              to="/content-management"
              data-test="course-card"
              className="max-w-lg h-96 border-4 border-slate-800 hover:border-zinc-100 hover:scale-105 duration-200 overflow-hidden bg-white rounded-2xl my-2 shadow-lg dark:bg-gray-800"
            >
              <img
                className="object-cover bg-white hover:bg-gradient-to-bl from-amber-300 to-indigo-400 w-fit h-72"
                src={contentIcon}
                alt="Administrar usuarios"
              />
              <div className="px-4 py-2">
                <h1 className="mt-5 text-2xl text-center h-22 font-bold text-gray-800 dark:text-white">
                  Administrar contenido
                </h1>
              </div>
            </Link>
            <Link
              to="/dashboard"
              data-test="course-card"
              className="max-w-lg h-96 border-4 border-slate-800 hover:border-zinc-100 hover:scale-105 duration-200 overflow-hidden bg-white rounded-2xl my-2 shadow-lg dark:bg-gray-800"
            >
              <img
                className="object-cover bg-white hover:bg-gradient-to-bl from-amber-300 to-indigo-400 w-fit h-72"
                src={dashboardIcon}
                alt="Administrar usuarios"
              />
              <div className="px-4 py-2">
                <h1 className="mt-5 text-2xl text-center h-22 font-bold text-gray-800 dark:text-white">
                  Mostrar estadísticas
                </h1>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export default Management;
