import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavbarFavs from "../components/NavbarFavs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../css/userFormStyles.css";
import { LinearProgress } from "@mui/material";
import { Modal, Group } from "@mantine/core";
import Swal from "sweetalert2";

// URLs para manejo de datos en la BD
const coursesURL = "https://docenta-api.vercel.app/courses/";
const updateCourseURL = "https://docenta-api.vercel.app/updateFavCourse/";
const favCoursesURL = "https://docenta-api.vercel.app/favoritos/";
const delFavCourseURL = "https://docenta-api.vercel.app/delFavCourse/";

function FavCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const loadNickName = sessionStorage.getItem("nickName");

  const [opened, setOpened] = useState(false);
  const [course, setCourse] = useState([]);
  const [favCourse, setFavCourse] = useState([]);

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [platform, setPlatform] = useState("");

  const fetchCourse = async () => {
    const { data } = await axios.get(coursesURL + id);
    setCourse(data);
    setName(data[0].nombre);
    setDescription(data[0].descripcion);
    setCategory(data[0].categoria);
    setAuthor(data[0].autor);
    setPlatform(data[0].plataforma);
    setImage(data[0].imagen);
    setLink(data[0].enlace);
  };

  const fetchFavCourse = async () => {
    const { data } = await axios.get(favCoursesURL + loadNickName + "/" + id);
    setFavCourse(data);
    setProgress(data[0].progreso);
  };

  useEffect(() => {
    fetchFavCourse();
    fetchCourse();
    //eslint-disable-next-line
  }, []);

  const handleDelFav = async (course) => {
    Swal.fire({
      title: "¿Deseas eliminar el curso?",
      text: "¡Los cambios serán irreversibles!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, ¡elimínalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(delFavCourseURL + loadNickName + "/" + id);
        Swal.fire({
          title: "¡Éxito!",
          text: "El curso se ha eliminado correctamente.",
          icon: "success",
          timer: 1000,
        }).then(() => {
          window.location.replace("/favorites");
        });
      }
    });
  };

  // Función para gestionar el cierre de sesión
  const updateProgress = async () => {
    await axios
      .put(updateCourseURL + loadNickName + "/" + id, {
        progreso: progress,
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            title: "¡Éxito!",
            text: "El progreso ha sido actualizado correctamente.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          setOpened(false);
        }
      });
  };

  const openLink = () => {
    window.open(`${link}`);
  };

  return (
    <>
      <main>
        <NavbarFavs />
        <div className="App-header">
          <div className="max-sm:mb-12 my-32 w-8/12 max-md:w-10/12">
            <div className="grid grid-cols-4">
              <h1 className="col-span-3 lg:mt-10 text-2xl lg:text-6xl font-semibold">
                {name}
              </h1>
              <button
                data-test="del-button"
                onClick={() => handleDelFav(course)}
                className="hover:cursor-pointer hover:text-red-700 max-lg:text-3xl items-end lg:text-5xl lg:mt-10 col-span-1 flex flex-col justify-center"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
            <div className="mt-4 sm:mt-6 bg-slate-400 rounded-lg p-5 shadow-md">
              <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-3 md:gap-5">
                <img
                  className="max-h-80 object-cover row-span-2 bg-white rounded-lg w-full mt-2"
                  src={image}
                  alt={name}
                />
                <p className="row-span-1 text-gray-800 font-semibold max-sm:mt-5 text-3xl flex align-middle items-center">
                  {author}
                </p>
                <p className="row-span-1 italic max-h-60 overflow-scroll font-light text-lg">
                  {description}
                </p>
                <div className="row-span-1 text-slate-800 font-bold text-lg">
                  Progreso:
                  <span className="ml-2 text-indigo-700">{progress} %</span>
                  <LinearProgress variant="determinate" value={progress} />
                </div>
                <div className="lg:grid lg:grid-cols-2">
                  <p className="row-span-1 font-bold text-zinc-800 col-start-1">
                    {platform}
                  </p>
                  <p className="row-span-1 italic text-red-800">{category}</p>
                </div>
              </div>
              <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-3 md:gap-5">
                <Modal
                  centered
                  opened={opened}
                  onClose={() => setOpened(false)}
                  title="¡Actualiza el progreso del curso!"
                >
                  <div>
                    <label
                      for="progress"
                      className="block mb-2 text-lg font-medium text-gray-900"
                    >
                      Introduce aquí tu progreso.
                    </label>
                    <input
                      name="progress"
                      type="text"
                      id="id"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-grey-800 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-600 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={`Progreso actual: ${progress} %`}
                      onChange={({ target }) => setProgress(target.value)}
                    />
                    <button
                      name="progress-update"
                      className="col-span-1 inline-block px-5 py-3 mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-xl w-full"
                      type="button"
                      style={{ transition: "all .15s ease" }}
                      onClick={updateProgress}
                    >
                      Actualizar
                    </button>
                  </div>
                </Modal>
                <Group position="center">
                  <button
                    className="col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-green-600 hover:bg-green-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={() => setOpened(true)}
                  >
                    Actualizar progreso
                  </button>
                </Group>
                <button
                  className="col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-indigo-600 hover:bg-indigo-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={openLink}
                >
                  Ir al curso
                </button>
              </div>
            </div>
          </div>
          <span className="md:fixed md:bottom-0 md:left-10 max-sm:mb-12 hover:text-yellow-400">
            <button
              type="button"
              className="mb-5 text-4xl"
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faArrowLeftLong} />
            </button>
          </span>
        </div>
      </main>
    </>
  );
}

export default FavCourse;
