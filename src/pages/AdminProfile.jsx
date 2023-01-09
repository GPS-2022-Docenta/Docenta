import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/userFormStyles.css";
import { Link } from "react-router-dom";
import NavbarAdmin from "../components/NavbarAdmin";

// URLs para manejo de datos en la BD
const usersURL = "https://docenta-api.vercel.app/users/";

function AdminProfile() {
  const loadNickName = sessionStorage.getItem("nickName");
  const loadLogin = sessionStorage.getItem("loggedIn");

  const [fnProfile, setFNProfile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [tlf, setTlf] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(usersURL + loadNickName);
      setFNProfile(data[0].firstName);
      setFirstName(data[0].firstName);
      setEmail(data[0].email);
      setTlf(data[0].phone);
      setNickName(data[0].nickName);
      setLastName(data[0].lastName);
      setBirthday(data[0].birthday);
      setCountry(data[0].country);
      setGender(data[0].gender);
    };
    fetchUser();
  }, [loadNickName]);

  // Función para gestionar el cierre de sesión
  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      {loadLogin ? (
        <main>
          <NavbarAdmin />
          <div className="App-header">
            <div className="my-32 w-8/12 max-md:w-10/12">
              <h1 className="text-4xl lg:text-6xl font-semibold">
                Hola {fnProfile}
              </h1>
              <div className="mt-4 sm:mt-6 bg-slate-400 rounded-lg p-5 shadow-md">
                <form>
                  <div className="grid mb-2 gap-4 grid-cols-1 md:grid-cols-2">
                    <div>
                      <label
                        for="first_name"
                        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={firstName}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        for="last_name"
                        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={lastName}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        for="nickname"
                        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Nombre de usuario
                      </label>
                      <input
                        type="text"
                        id="nickname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={nickName}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        for="email"
                        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={email}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        for="phone"
                        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Teléfono
                      </label>
                      <input
                        type="text"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={tlf}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        for="country"
                        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                      >
                        País
                      </label>
                      <input
                        type="text"
                        id="country"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={country}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        for="birthday"
                        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Fecha de nacimiento
                      </label>
                      <input
                        type="text"
                        id="birthday"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={birthday}
                        disabled
                      />
                    </div>
                    <div>
                      <label
                        for="gender"
                        className="block mb-2 text-lg font-medium text-gray-900 dark:text-white"
                      >
                        Género
                      </label>
                      <input
                        type="text"
                        id="gender"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder={gender}
                        disabled
                      />
                    </div>
                  </div>
                </form>
                <div className="lg:grid lg:grid-cols-2 lg:gap-3 md:gap-5">
                  <Link
                    to="/management"
                    className="lg:col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-teal-600 hover:bg-teal-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                  >
                    Administrar
                  </Link>
                  <button
                    className="lg:col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-red-600 hover:bg-red-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        window.location.replace("/login")
      )}
    </>
  );
}

export default AdminProfile;
