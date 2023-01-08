import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarProfile from "../components/NavbarProfile";
import "../css/userFormStyles.css";
import Swal from "sweetalert2";

// URLs para manejo de datos en la BD
const usersURL = "https://docenta-api.vercel.app/users/";
const updateProfileURL = "https://docenta-api.vercel.app/updateUser/";

function Profile() {
  const loadNickName = sessionStorage.getItem("nickName");
  const [fnProfile, setFNProfile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [tlf, setTlf] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [editBtnStyle1, setEditBtnStyle1] = useState(
    "col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-indigo-600 hover:bg-indigo-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
  );
  const [editBtnTxt1, setEditBtnTxt1] = useState("Editar perfil");
  const [editBtnTxt2, setEditBtnTxt2] = useState("Cerrar sesión");
  const [enableInput, setEnableInput] = useState(true);

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

  const updateProfile = async () => {
    await axios
      .put(updateProfileURL + nickName, {
        nickName: nickName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        birthday: birthday,
        country: country,
        phone: tlf,
        gender: gender,
      })
      .then((response) => {
        if (response.status === 201) {
          Swal.fire({
            title: "¡Éxito!",
            text: "Los datos se han actualizado correctamente.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            setTimeout(() => {
              window.location.replace("/profile");
            }, 1000);
          });
        }
      });
  };

  // Función para gestionar el cierre de sesión
  const handleLogout = (event) => {
    if (editBtnTxt2 === "Cancelar") {
      setEditBtnStyle1(
        "col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-indigo-600 hover:bg-indigo-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
      );
      setEditBtnTxt1("Editar perfil");
      setEditBtnTxt2("Cerrar sesión");
      setEnableInput(true);
    } else {
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  const editProfile = () => {
    if (editBtnTxt1 === "Editar perfil") {
      setEditBtnStyle1(
        "col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-green-600 hover:bg-green-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
      );
      setEditBtnTxt1("Guardar cambios");
      setEditBtnTxt2("Cancelar");
      setEnableInput(false);
    } else if (editBtnTxt1 === "Guardar cambios") {
      updateProfile();
      setEditBtnStyle1(
        "col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-indigo-600 hover:bg-indigo-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
      );
      setEditBtnTxt1("Editar perfil");
      setEditBtnTxt2("Cerrar sesión");
      setEnableInput(true);
    }
  };

  return (
    <>
      <main>
        <NavbarProfile />
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
                      disabled={enableInput}
                      onChange={({ target }) => setFirstName(target.value)}
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
                      disabled={enableInput}
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
                      disabled={enableInput}
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
                      disabled={enableInput}
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
                      disabled={enableInput}
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
                      className="disabled:italic disabled:opacity-60 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      className="disabled:italic disabled:opacity-60 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                      className="disabled:italic disabled:opacity-60 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:outline-zinc-100 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder={gender}
                      disabled
                    />
                  </div>
                </div>
              </form>
              <div className="grid grid-cols-2 gap-3 md:gap-5">
                <button
                  className={editBtnStyle1}
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={editProfile}
                >
                  {editBtnTxt1}
                </button>
                <button
                  className="col-span-1 inline-block px-5 py-3 mt-4 rounded-3xl bg-red-600 hover:bg-red-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
                  type="button"
                  style={{ transition: "all .15s ease" }}
                  onClick={handleLogout}
                >
                  {editBtnTxt2}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Profile;
