import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/catalog.css";
import NavbarCatalog from "../components/NavbarCatalog";

// URLs para manejo de datos en la BD
const coursesURL = "https://docenta-api.vercel.app/courses";

function Profile() {
  const [course, setCourse] = useState([]);
  const [query, setQuery] = useState("");

  // Función para introducir la búsqueda en la barra
  const inputQuery = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(coursesURL);
      setCourse(data);
    };
    fetchUser();
  }, []);

  const displayCourses = course
    .filter((value) => {
      if (query === "") {
        return value;
      } else if (
        value.nombre.toLowerCase().includes(query.toLocaleLowerCase()) ||
        value.plataforma.toLowerCase().includes(query.toLocaleLowerCase())
      ) {
        return value;
      }
    })
    .map((course) => {
      const {
        id,
        nombre,
        categoria,
        descripcion,
        imagen,
        enlace,
        autor,
        plataforma,
      } = course;

      return (
        <>
          <div className="max-w-xs h-fit hover:scale-105 duration-200 overflow-hidden bg-white rounded-lg my-2 shadow-lg dark:bg-gray-800">
            <div className="px-4 py-2">
              <h1 className="text-3xl h-28 text-ellipsis overflow-clip font-bold text-gray-800 uppercase dark:text-white">
                {nombre}
              </h1>
              <p className="mt-2 h-16 text-sm text-gray-600 dark:text-gray-400">
                {descripcion}
              </p>
            </div>

            <img
              className="object-cover bg-white w-full h-48 mt-2"
              src={imagen}
              alt={nombre}
            />

            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <h1 className="text-lg font-bold text-white">{plataforma}</h1>
              <button className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none">
                Añadir
              </button>
            </div>
          </div>
        </>
      );
    });

  return (
    <>
      <main>
        <NavbarCatalog />
        <div className="App-header">
          <div className="absolute top-20 lg:top-28">
            <h1 className="text-4xl lg:text-6xl text-center font-semibold mt-10">
              Catálogo
            </h1>
            <form className="mt-5">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="search"
                  className="block w-80 p-3 pl-10 text-lg text-gray-800 rounded-lg bg-slate-100 hover:bg-slate-300 shadow-sm shadow-red-800 focus:outline-none focus:bg-slate-300 hover:placeholder-gray-500 placeholder-gray-500 placeholder:italic"
                  placeholder="Busca un curso aquí..."
                  value={query}
                  onChange={inputQuery}
                  autoComplete="off"
                  required
                />
              </div>
            </form>
          </div>
          <div className="max-lg:mt-64 mt-80 mb-20 grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 items-center gap-5">
            {displayCourses}
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
