import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "../css/Login.css";

// URLs para manejo de datos en la BD
// const loginURL = "https://cryptoaholic-api.vercel.app/login/";

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  /* // Petición a la API de Cryptoaholic para realizar login
  const loginUser = async () => {
    await axios
      .post(loginURL, { nickName: nickName, password: password })
      .then((response) => {
        if (response.status === 200) {
          if (nickName === "admin") {
            sessionStorage.setItem("nickName", nickName);
            sessionStorage.setItem("loggedIn", true);
            sessionStorage.setItem("adminLogin", true);
            setTimeout(() => {
              window.location.replace("/management");
            }, 500);
          } else {
            sessionStorage.setItem("nickName", nickName);
            sessionStorage.setItem("loggedIn", true);
            setTimeout(() => {
              window.location.replace("/my-coins");
            }, 500);
          }
        } else {
          Swal.fire({
            title: "Usuario o contraseña incorrecto!",
            text: "Inténtalo de nuevo",
            icon: "error",
            timer: 2000,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Usuario o contraseña incorrecto!",
          text: "Inténtalo de nuevo",
          icon: "error",
          timer: 2000,
        });
      });
  }; */

  return (
    <div className="App-header">
      <form autoComplete="off">
        <h3>Registrar</h3>
        <p></p>
        <br />
        <p className="generic-text">
          ¿Ya tienes una cuenta? Inicia sesión{" "}
          <Link className="link-to-reg" to="/login">
            aquí
          </Link>{" "}
          !
        </p>
        <br />
        <div className="form-group">
          <label>Nombre</label>
          <p></p>
          <input
            type="text"
            className="form-control"
            name="FirstName"
            placeholder="Introduce tu nombre"
            onChange={({ target }) => setFirstName(target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Apellido</label>
          <p></p>
          <input
            type="text"
            className="form-control"
            name="LastName"
            placeholder="Introduce tu apellido"
            onChange={({ target }) => setLastName(target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Correo electrónico</label>
          <p></p>
          <input
            type="text"
            className="form-control"
            name="LastName"
            placeholder="Introduce tu corre electrónico"
            onChange={({ target }) => setEmail(target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Fecha de nacimiento</label>
          <p></p>
          <input
            type="text"
            className="form-control"
            name="Birthday"
            placeholder="Selecciona una fecha del calendario"
            onChange={({ target }) => setBirthday(target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label>País de residencia</label>
          <p></p>
          <input
            type="text"
            className="form-control"
            name="Country"
            placeholder="Selecciona tu país de residencia"
            onChange={({ target }) => setCountry(target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Contraseña</label>
          <p></p>
          <input
            type="password"
            className="form-control"
            name="Password"
            placeholder="Introduce tu contraseña"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Confirmar contraseña</label>
          <p></p>
          <input
            type="password"
            className="form-control"
            name="ConfirmPasswd"
            placeholder="Confirma tu contraseña"
            onChange={({ target }) => setCPassword(target.value)}
          />
        </div>
        <p></p>
        <br></br>
        <div className="button-box">
          <button type="button" /* onClick={handleLogin} */>Registrar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
