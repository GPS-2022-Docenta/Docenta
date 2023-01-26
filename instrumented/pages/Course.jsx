import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import "../css/userFormStyles.css";
import Swal from "sweetalert2";
import NavbarCatalog from "../components/NavbarCatalog";

// URLs para manejo de datos en la BD
const coursesURL = "https://docenta-api.vercel.app/courses/";
const addFavCoursesURL = "https://docenta-api.vercel.app/addFavCourse/";
const favCoursesURL = "https://docenta-api.vercel.app/favoritos/";

function Course() {
  const { id } = useParams();
  const navigate = useNavigate();

  const loadNickName = sessionStorage.getItem("nickName");
  const loadLogin = sessionStorage.getItem("loggedIn");

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

  useEffect(() => {
    fetchCourse();
    //eslint-disable-next-line
  }, []);

  const handleAddFav = async () => {
    await axios
      .post(addFavCoursesURL, {
        nickName: loadNickName,
        id: id,
      })
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            title: "¡Éxito!",
            text: "Curso añadido correctamente.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            window.location.replace("/catalog");
          });
        }
      });
  };

  const openLink = () => {
    window.open(`${link}`);
  };

  return (
    <>
      <main>
        <NavbarCatalog />
        <div className="App-header">
          <div className="max-sm:mb-12 my-32 w-8/12 max-md:w-10/12">
            <h1 className="lg:mt-10 text-2xl lg:text-6xl font-semibold">
              {name}
            </h1>
            <div className="mt-4 sm:mt-6 bg-slate-400 rounded-lg p-5 shadow-md">
              <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-3 md:gap-5">
                <img
                  className="h-full object-cover row-span-3 bg-white rounded-lg w-full mt-2"
                  src={image}
                  alt={name}
                />
                <p className="row-span-1 text-gray-800 font-semibold max-sm:mt-5 text-3xl flex align-middle items-center">
                  {author}
                </p>
                <p className="row-span-1 italic max-h-60 overflow-scroll font-light text-lg">
                  {description}
                </p>
                <div className="md:grid md:grid-cols-2">
                  <p className="row-span-1 font-bold text-zinc-800 col-start-1">
                    {platform}
                  </p>
                  <p className="row-span-1 italic text-red-800">{category}</p>
                </div>
              </div>
              <div className="grid max-sm:grid-cols-1 grid-cols-2 gap-3 md:gap-5 md:mt-3">
                <button
                  className="col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-green-600 hover:bg-green-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={handleAddFav}
                >
                  Añadir a favoritos
                </button>
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

export default Course;
