import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/catalog.css";
import NavbarFavs from "../components/NavbarFavs";
import Loading from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { Menu, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  IconTypography,
  IconUser,
  IconWorld,
  IconSortAscending,
  IconArrowBackUp,
} from "@tabler/icons";

// URLs para manejo de datos en la BD
const coursesURL = "https://docenta-api.vercel.app/courses";
const favCoursesURL = "https://docenta-api.vercel.app/favoritos/";

function Favorites() {
  const coursesPerPage = 20;
  const [course, setCourse] = useState([]);
  const [favCourse, setFavCourse] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState(coursesPerPage);
  const [order, setOrder] = useState("Default");
  const [matchingCourses, setMatchingCourses] = useState([]);

  const loadNickName = sessionStorage.getItem("nickName");

  // Función para introducir la búsqueda en la barra
  const inputQuery = (e) => {
    setQuery(e.target.value);
  };

  // Descargar datos a través de la API de Docenta
  // + Obtener cursos favoritos a travñes de la API de Docenta
  // + Buscar valores correspondientes de cursos en ambos arrays.
  const fetchCourses = async () => {
    // Variables temporales que se actualizan en el mismo render
    // (a diferencia del hook useState).
    let getCourse = [];
    let getFavCourse = [];
    // Obtener monedas de la base de datos de Docenta
    await axios
      .get(coursesURL)
      .then((response) => {
        getCourse = response.data;
        setCourse(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
    // Obtener monedas favoritas de la base de datos de Docenta.
    await axios
      .get(favCoursesURL + loadNickName)
      .then((response) => {
        getFavCourse = response.data;
        setFavCourse(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
    // Buscar valores correspondientes de cursos en un array y otro.
    const matching = getCourse.filter((o1) =>
      getFavCourse.some((o2) => o1.id === o2.id)
    );
    setMatchingCourses(matching);
  };

  useEffect(() => {
    fetchCourses();
    setTimeout(() => setLoading(false), 1500);
    //eslint-disable-next-line
  }, []);

  // Función para cargar más cursos
  const loadMore = () => {
    setPaginate((prevValue) => prevValue + coursesPerPage);
  };

  // Función para volver al principio de la página
  const scrollToTop = () => {
    const element = document.getElementById("top-index");
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  // Ordenar por defecto
  const sortByDefault = () => {
    if (order === "Nombre" || order === "Autor" || order === "Plataforma") {
      setOrder("Default");
      setCourse(
        matchingCourses.sort((a, b) => {
          return a.id - b.id;
        })
      );
    } else {
      return course;
    }
  };

  // Ordenar por nombre
  const sortByName = () => {
    if (order === "Default" || order === "Autor" || order === "Plataforma") {
      setOrder("Nombre");
      setCourse(
        matchingCourses.sort((a, b) =>
          a.nombre.toLowerCase() > b.nombre.toLowerCase() ? 1 : -1
        )
      );
    } else {
      return course;
    }
  };

  // Ordenar por autor
  const sortByAuthor = () => {
    if (order === "Default" || order === "Nombre" || order === "Plataforma") {
      setOrder("Autor");
      setCourse(
        matchingCourses.sort((a, b) =>
          a.autor.toLowerCase() > b.autor.toLowerCase() ? 1 : -1
        )
      );
    } else {
      return course;
    }
  };

  // Ordenar por plataforma
  const sortByPlatform = () => {
    if (order === "Default" || order === "Nombre" || order === "Autor") {
      setOrder("Plataforma");
      setCourse(
        matchingCourses.sort((a, b) =>
          a.plataforma.toLowerCase() > b.plataforma.toLowerCase() ? 1 : -1
        )
      );
    } else {
      return course;
    }
  };

  const displayCourses = matchingCourses
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
    .slice(0, paginate)
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
          <div
            key={id}
            data-test="course-card"
            className="max-w-xs h-94 hover:scale-105 duration-200 overflow-hidden bg-white rounded-lg my-2 shadow-lg dark:bg-gray-800"
          >
            <div className="px-4 py-2">
              <h1 className="text-3xl h-22 truncate font-bold text-gray-800 uppercase dark:text-white">
                {nombre}
              </h1>
              <p className="mt-2 h-8 truncate text-sm text-gray-600 dark:text-gray-400">
                {descripcion}
              </p>
              <p className="text-sm font-bold italic text-gray-600 dark:text-gray-400">
                {autor}
              </p>
            </div>

            <img
              className="object-cover bg-white w-full h-48 mt-2"
              src={imagen}
              alt={nombre}
            />

            <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
              <h1 className="text-lg font-bold text-white">{plataforma}</h1>
              <Link
                to={`/favorites/${id}`}
                className="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-300 transform bg-white rounded hover:bg-amber-700 hover:text-slate-100 focus:bg-gray-400 focus:outline-none"
              >
                Ver más
              </Link>
            </div>
          </div>
        </>
      );
    });

  return (
    <>
      {loading === false ? (
        <main>
          <NavbarFavs />
          <div id="top-index" className="App-header">
            <div className="absolute top-20 lg:top-28">
              <h1 className="text-4xl lg:text-6xl text-center font-semibold mt-10">
                Catálogo
              </h1>
              <div className="grid max-sm:grid-cols-3 max-sm:w-80 md:grid-cols-6 max-sm:gap-3 gap-5 mt-5 mx-auto">
                <form className="max-sm:col-span-2 md:col-span-4">
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
                      name="searchBar"
                      type="search"
                      id="search"
                      className="block max-sm:truncate max-sm:w-full md:w-80 p-3 pl-10 text-lg text-gray-800 rounded-lg bg-slate-100 hover:bg-slate-300 shadow-sm shadow-red-800 focus:outline-none focus:bg-slate-300 hover:placeholder-gray-500 placeholder-gray-500 placeholder:italic"
                      placeholder="Busca un curso aquí..."
                      value={query}
                      onChange={inputQuery}
                      autoComplete="off"
                      required
                    />
                  </div>
                </form>
                <span className="max-sm:w-full max-sm:col-span-1 md:col-span-2 inset-y-0 left-0 flex">
                  <Menu
                    className="max-sm:pl-7"
                    shadow="md"
                    leftIcon={<IconSortAscending size={20} />}
                  >
                    <Menu.Target>
                      <Button
                        className="rounded-lg border-2 bg-indigo-500 hover:bg-indigo-800 h-full md:text-xl"
                        fullWidth="true"
                      >
                        <p className="max-sm:hidden">Ordenar</p>
                      </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                      <Menu.Label>Atributo</Menu.Label>
                      <Menu.Item
                        icon={<IconTypography size={14} />}
                        onClick={sortByName}
                      >
                        Nombre
                      </Menu.Item>
                      <Menu.Item
                        icon={<IconUser size={14} />}
                        onClick={sortByAuthor}
                      >
                        Autor
                      </Menu.Item>
                      <Menu.Item
                        icon={<IconWorld size={14} />}
                        onClick={sortByPlatform}
                      >
                        Plataforma
                      </Menu.Item>
                      <Menu.Item
                        icon={<IconArrowBackUp size={14} />}
                        onClick={sortByDefault}
                      >
                        Por defecto (ID)
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </span>
              </div>
            </div>
            <div className="max-lg:mt-64 mt-80 mb-5 grid grid-cols-4 max-md:grid-cols-1 max-lg:grid-cols-2 items-center gap-5">
              {displayCourses}
            </div>
            <span className="hover:text-red-700">
              {paginate < course?.length && (
                <button
                  type="button"
                  className="mb-5 text-4xl"
                  onClick={loadMore}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              )}
            </span>
            <span className="md:fixed bottom-0 right-10 hover:text-yellow-400">
              <button
                type="button"
                className="mb-5 text-4xl"
                onClick={scrollToTop}
              >
                <FontAwesomeIcon icon={faAngleDoubleUp} />
              </button>
            </span>
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Favorites;
