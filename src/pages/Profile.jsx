import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/userFormStyles.css";

// URLs para manejo de datos en la BD
const usersURL = "https://docenta-api.vercel.app/users/";

function Profile() {
  const loadNickName = sessionStorage.getItem("nickName");
  const [firstName, setFirstName] = useState("");
  /*   const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [tlf, setTlf] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState(""); */

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(usersURL + loadNickName);
      setFirstName(data[0].firstName);
      /*       setEmail(data[0].email);
      setTlf(data[0].phone);
      setNickName(data[0].nickName);
      setLastName(data[0].lastName);
      setBirthday(data[0].birthday);
      setCountry(data[0].country);
      setGender(data[0].gender); */
    };
    fetchUser();
  }, [loadNickName]);

  // Función para gestionar el cierre de sesión
  const handleLogout = (event) => {
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <>
      <div className="App-header">
        <h1 className="text-4xl lg:text-6xl font-semibold">Hola {firstName}</h1>
        <div className="mt-4 sm:mt-6">
          {/* <p>{firstName}</p>
          <p>{lastName}</p>
          <p>{nickName}</p>
          <p>{email}</p>
          <p>{tlf}</p>
          <p>{country}</p>
          <p>{birthday}</p>
          <p>{gender}</p> */}
          <button
            className="inline-block px-5 py-3 rounded-3xl bg-red-600 hover:bg-red-800 uppercase text-center tracking-wider font-semibold text-md text-white shadow-lg lg:text-2xl w-full"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
