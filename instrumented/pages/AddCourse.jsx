import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/userFormStyles.css";
import Swal from "sweetalert2";
import NavbarManagement from "../components/NavbarManagement";

// URLs para manejo de datos en la BD
const coursesURL = "https://docenta-api.vercel.app/courses/";
const addCourseURL = "https://docenta-api.vercel.app/addCurso/";

function AddCourse() {
  const navigate = useNavigate();

  const [course, setCourse] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");
  const [author, setAuthor] = useState("");
  const [platform, setPlatform] = useState("");

  const fetchCourses = async () => {
    const { data } = await axios.get(coursesURL);
    setCourse(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Comprobar si hay campos vacíos
  const checkNullForm = () => {
    if (
      name === "" ||
      category === "" ||
      description === "" ||
      image === "" ||
      link === "" ||
      author === "" ||
      platform === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar nombre de usuario existente
  const checkName = () => {
    if (course.find((elem) => elem.nombre === name)) {
      return true;
    } else {
      return false;
    }
  };

  const addCourse = async () => {
    if (checkNullForm()) {
      Swal.fire({
        title: "¡Error!",
        text: "Los campos no pueden estar vacíos.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (checkName()) {
      Swal.fire({
        title: "¡Error!",
        text: "Ya existe un curso con ese nombre.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await axios
        .post(addCourseURL, {
          nombre: name,
          categoria: category,
          descripcion: description,
          imagen: image,
          enlace: link,
          autor: author,
          plataforma: platform,
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
              setTimeout(() => {
                window.location.replace("/content-management");
              }, 1000);
            });
          }
        });
    }
  };

  return (
    <>
      <main>
        <NavbarManagement />
        <div className="App-header">
          <div className="my-32 w-8/12 max-md:w-10/12">
            <h1 className="text-4xl lg:text-6xl font-semibold lg:mt-10">
              Añadir curso
            </h1>
            <div className="mt-4 sm:mt-6 bg-slate-400 rounded-lg p-5 shadow-md">
              <form>
                <div className="grid mb-2 gap-4 grid-cols-1 md:grid-cols-2">
                  <div>
                    <label
                      for="id"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      ID
                    </label>
                    <input
                      type="text"
                      id="id"
                      className="disabled:italic disabled:opacity-60 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Autogenerado"
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      for="name"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="bg-gray-50 border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={name}
                      onChange={({ target }) => setName(target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="category"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Categoría
                    </label>
                    <input
                      type="text"
                      id="category"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={category}
                      onChange={({ target }) => setCategory(target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="description"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Descripción
                    </label>
                    <input
                      type="text"
                      id="description"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={description}
                      onChange={({ target }) => setDescription(target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="image"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Imagen (URL)
                    </label>
                    <input
                      type="text"
                      id="image"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={image}
                      onChange={({ target }) => setImage(target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="link"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Enlace (URL)
                    </label>
                    <input
                      type="text"
                      id="link"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={link}
                      onChange={({ target }) => setLink(target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="author"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Autor
                    </label>
                    <input
                      type="text"
                      id="author"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={author}
                      onChange={({ target }) => setAuthor(target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="platform"
                      className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                    >
                      Plataforma
                    </label>
                    <input
                      type="text"
                      id="platform"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={platform}
                      onChange={({ target }) => setPlatform(target.value)}
                    />
                  </div>
                </div>
              </form>
              <div className="lg:grid lg:grid-cols-2 lg:gap-3 md:gap-5">
                <button
                  className="lg:col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-green-600 hover:bg-green-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={addCourse}
                >
                  Añadir
                </button>
                <button
                  className="lg:col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-red-600 hover:bg-red-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={() => navigate("/content-management")}
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddCourse;
