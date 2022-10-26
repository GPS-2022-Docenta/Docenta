import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ButtonUnstyled } from "@mui/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { DatePicker } from "@mantine/dates";
import { createStyles, Select } from "@mantine/core";
import { countryList } from "../data/Countries";
import PasswordStrengthBar from "react-password-strength-bar";
import Swal from "sweetalert2";
import axios from "axios";
import dayjs from "dayjs";
import "../css/userFormStyles.css";

require("dayjs/locale/es");
dayjs.locale("es");

// URLs para manejo de datos en la BD
const usersURL = "https://docenta-api.vercel.app/users/";
const registerURL = "https://docenta-api.vercel.app/register/";

// Expresión regular para validar formato de correo electrónico
const regExpMail = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[A-Za-z]+$/);
// Expresión regular para validar formato de teléfono
const regExpTlf = new RegExp(/^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{3})$/);
// Expresión regular para validar formato de nombre de usuario
const regExpNickname = new RegExp(
  /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/
);

function RegisterMobile() {
  const {
    register,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const [users, setUsers] = useState([]);
  const genders = ["Hombre", "Mujer", "No binario", "Prefiero no decirlo"];

  const [nickName, setNickName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [formatBD, setFormatBD] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [passwdStrength, setPasswdStrength] = useState("");

  const [typePass, setTypePass] = useState("password");
  const [typeCPass, setTypeCPass] = useState("password");
  const [iconPass, setIconPass] = useState(faEyeSlash);
  const [iconCPass, setIconCPass] = useState(faEyeSlash);

  // Estilo para el input del calendario
  const useStyles = createStyles((theme) => ({
    root: {
      position: "relative",
      alignItems: "center",
      color: "#00000000",
      fontFamily: "Inter Tight",
    },
    input: {
      height: "3rem",
      borderBottomWidth: "2px",
      backGroundColor: theme.colors.white,
      fontFamily: "Inter Tight",
      borderRadius: "0.25rem",
      boxShadow: theme.shadows.xs,
      fontSize: "0.9rem",
      fontWeight: "300",
      lineHeight: "1.25rem",
      padding: "0.75rem",
      color: theme.black,

      "&:focus": {
        borderLeftColor: theme.colors.gray[0],
        borderRightColor: theme.colors.gray[0],
        borderTopColor: theme.colors.gray[0],
        borderBottomColor: theme.colors.red[6],
      },

      "&:active": {
        borderLeftColor: theme.colors.gray[0],
        borderRightColor: theme.colors.gray[0],
        borderTopColor: theme.colors.gray[0],
        borderBottomColor: theme.colors.red[6],
      },
    },
  }));

  const { classes } = useStyles();

  // Mostrar contraseña
  const handleToggle = () => {
    if (typePass === "password") {
      setIconPass(faEye);
      setTypePass("text");
    } else {
      setIconPass(faEyeSlash);
      setTypePass("password");
    }
  };

  // Mostrar contraseña
  const handleToggle2 = () => {
    if (typeCPass === "password") {
      setIconCPass(faEye);
      setTypeCPass("text");
    } else {
      setIconCPass(faEyeSlash);
      setTypeCPass("password");
    }
  };

  const formatBirthday = (birthday) => {
    setFormatBD(dayjs(birthday).format("YYYY-MM-DD"));
  };

  // Extraer usuarios de la BD
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(usersURL);
      setUsers(data);
    };
    fetchUsers();
  }, []);

  // Comprobar si hay campos vacíos
  const checkNullForm = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      nickName === "" ||
      password === "" ||
      email === "" ||
      country === "" ||
      gender === "" ||
      birthday === "" ||
      phone === ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar nombre de usuario existente
  const checkUserName = () => {
    if (users.find((elem) => elem.nickName === nickName)) {
      return true;
    } else {
      return false;
    }
  };

  // Comprobar correo electrónico existente
  const checkEmail = () => {
    if (users.find((elem) => elem.email === email)) {
      return true;
    } else {
      return false;
    }
  };

  // Función para compronar si las contraseñas son iguales
  const checkPassword = () => {
    if (password !== cPassword) {
      return true;
    } else {
      return false;
    }
  };

  const checkRegExpNickName = () => {
    if (errors.nickName?.message === "Nombre de usuario no válido.") {
      return true;
    } else {
      return false;
    }
  };

  const checkNickNameLength = () => {
    if (
      errors.nickName?.message ===
        "El nombre debe tener al menos 8 caracteres." ||
      errors.nickName?.message ===
        "El nombre debe tener como máximo 30 caracteres."
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkRegExpPhone = () => {
    if (errors.phone?.message === "Número de teléfono no válido.") {
      return true;
    } else {
      return false;
    }
  };

  const checkRegExpEmail = () => {
    if (errors.email?.message === "Correo electrónico no válido.") {
      return true;
    } else {
      return false;
    }
  };

  const checkRegExpPassword = () => {
    if (passwdStrength <= 1) {
      return true;
    } else {
      return false;
    }
  };

  const handleRegister = async () => {
    if (checkNullForm()) {
      Swal.fire({
        title: "¡Error!",
        text: "Los campos no pueden estar vacíos.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (checkUserName()) {
      Swal.fire({
        title: "¡Error!",
        text: "Ya existe un usuario con ese nombre.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (checkRegExpNickName()) {
      Swal.fire({
        title: "¡Error!",
        text: "Nombre de usuario no válido.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (checkNickNameLength()) {
      Swal.fire({
        title: "¡Error!",
        text: "Nombre de usuario no válido.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (checkRegExpPhone()) {
      Swal.fire({
        title: "¡Error!",
        text: "Número de teléfono no válido.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (checkEmail()) {
      Swal.fire({
        title: "¡Error!",
        text: "Correo electrónico asociado a una cuenta existente.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (checkRegExpEmail()) {
      Swal.fire({
        title: "¡Error!",
        text: "Correo electrónico no válido.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (checkPassword()) {
      Swal.fire({
        title: "¡Error!",
        text: "Las contraseñas no coinciden.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else if (checkRegExpPassword()) {
      Swal.fire({
        title: "¡Error!",
        text: "La contraseña no es válida.",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await axios
        .post(registerURL, {
          firstName: firstName,
          lastName: lastName,
          nickName: nickName,
          email: email,
          password: password,
          phone: phone,
          birthday: formatBD,
          country: country,
          gender: gender,
        })
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              title: "¡Éxito!",
              text: "Tu cuenta ha sido registrada correctamente.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              setTimeout(() => {
                window.location.replace("/login");
              }, 1000);
            });
          }
        });
    }
  };

  return (
    <>
      <div className="inline lg:hidden">
        <div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-semibold mb-2"
              htmlFor="grid-password"
            >
              Nombre <span className="font-normal text-md text-red-600">*</span>
            </label>
            <input
              type="text"
              className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
              placeholder="Introduce tu nombre"
              style={{ transition: "all .15s ease" }}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <p className="font-normal text-red-600 text-right text-sm ">
              {errors.firstName?.message}
            </p>
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-semibold mb-2"
              htmlFor="grid-password"
            >
              Apellido{" "}
              <span className="font-normal text-md text-red-600">*</span>
            </label>
            <input
              type="text"
              className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
              placeholder="Introduce tu apellido"
              style={{ transition: "all .15s ease" }}
              onChange={({ target }) => setLastName(target.value)}
            />
            <p className="font-normal text-red-600 text-right text-sm ">
              {errors.lastName?.message}
            </p>
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-semibold mb-2"
              htmlFor="grid-password"
            >
              Nombre de usuario{" "}
              <span className="font-normal text-md text-red-600">*</span>
            </label>
            <input
              {...register("nickName", {
                pattern: {
                  value: regExpNickname,
                  message: "Nombre de usuario no válido.",
                },
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos 8 caracteres.",
                },
                maxLength: {
                  value: 30,
                  message: "El nombre debe tener como máximo 30 caracteres.",
                },
              })}
              type="text"
              className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
              placeholder="Introduce tu nombre de usuario"
              style={{ transition: "all .15s ease" }}
              onChange={({ target }) => setNickName(target.value)}
            />
            <p className="font-normal text-red-600 text-right text-sm ">
              {errors.nickName?.message}
            </p>
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-semibold mb-2"
              htmlFor="grid-password"
            >
              Correo electrónico{" "}
              <span className="font-normal text-md text-red-600">*</span>
            </label>
            <input
              {...register("email", {
                pattern: {
                  value: regExpMail,
                  message: "Correo electrónico no válido.",
                },
              })}
              type="text"
              className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
              placeholder="P.ej.: correo@docenta.com"
              style={{ transition: "all .15s ease" }}
              onChange={({ target }) => setEmail(target.value)}
            />
            <p className="font-normal text-red-600 text-right text-sm ">
              {errors.email?.message}
            </p>
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-semibold mb-2"
              htmlFor="grid-password"
            >
              Fecha de nacimiento{" "}
              <span className="font-normal text-md text-red-600">*</span>
            </label>
            <DatePicker
              dropdownPosition="bottom"
              value={birthday}
              placeholder="¿Qué día naciste?"
              clearable={false}
              classNames={classes}
              onChange={setBirthday}
              locale="es"
              labelFormat="MMMM YYYY"
              inputFormat="DD-MM-YYYY"
              onDropdownClose={() => formatBirthday(birthday)}
            />
            <p className="font-normal text-red-600 text-right text-sm ">
              {errors.birthday?.message}
            </p>
          </div>
        </div>
        <div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-semibold mb-2"
              htmlFor="grid-password"
            >
              País de residencia{" "}
              <span className="font-normal text-md text-red-600">*</span>
            </label>
            <Select
              dropdownPosition="bottom"
              searchable
              nothingFound="Sin opciones"
              data={countryList}
              placeholder="Selecciona un país de la lista"
              classNames={classes}
              onSelect={({ target }) => setCountry(target.value)}
            />
            <p className="font-normal text-red-600 text-right text-sm ">
              {errors.country?.message}
            </p>
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-semibold mb-2"
              htmlFor="grid-password"
            >
              Número de teléfono{" "}
              <span className="font-normal text-md text-red-600">*</span>
            </label>
            <input
              {...register("phone", {
                pattern: {
                  value: regExpTlf,
                  message: "Número de teléfono no válido (XXXYYYZZZ).",
                },
              })}
              type="text"
              className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
              placeholder="P.ej.: 666555444"
              style={{ transition: "all .15s ease" }}
              onChange={({ target }) => setPhone(target.value)}
            />
            <p className="font-normal text-red-600 text-right text-sm ">
              {errors.phone?.message}
            </p>
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-semibold mb-2"
              htmlFor="grid-password"
            >
              Género <span className="font-normal text-md text-red-600">*</span>
            </label>
            <Select
              dropdownPosition="bottom"
              data={genders}
              placeholder="Selecciona un género de la lista"
              classNames={classes}
              onSelect={({ target }) => setGender(target.value)}
            />
          </div>
          <div className="relative w-full mb-3">
            <div className="grid lg:grid-cols-2 2xl:grid-cols-2">
              <div className="lg:col-span-1">
                <label
                  className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                  htmlFor="grid-password"
                >
                  Contraseña{" "}
                  <span className="font-normal text-md text-red-600">*</span>
                </label>
              </div>
              <div className="lg:col-span-1 text-right text-xs font-medium"></div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-11 text-left mr-1">
                <input
                  type={typePass}
                  className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                  placeholder="Introduce tu contraseña"
                  style={{ transition: "all .15s ease" }}
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <div className="col-span-1 text-right">
                <ButtonUnstyled
                  onClick={handleToggle}
                  className="border-b-2 px-auto py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 w-full"
                >
                  <FontAwesomeIcon icon={iconPass} />
                </ButtonUnstyled>
              </div>
            </div>
            <PasswordStrengthBar
              password={password}
              shortScoreWord="Demasiado corta"
              scoreWords={[
                "Muy poco segura",
                "Débil",
                "Buena",
                "Muy buena",
                "Excelente",
              ]}
              minLength={8}
            />
          </div>
          <div className="relative w-full mb-3">
            <div className="grid lg:grid-cols-2 2xl:grid-cols-2">
              <div className="lg:col-span-1">
                <label
                  className="block uppercase text-gray-700 text-xs font-semibold mb-2"
                  htmlFor="grid-password"
                >
                  Confirmar contraseña{" "}
                  <span className="font-normal text-md text-red-600">*</span>
                </label>
              </div>
              <div className="lg:col-span-1 text-right text-xs font-medium"></div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-11 text-left mr-1">
                <input
                  type={typeCPass}
                  className="border-b-2 px-3 py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 focus:border-red-500 w-full"
                  placeholder="Introduce tu contraseña"
                  style={{ transition: "all .15s ease" }}
                  onChange={({ target }) => setCPassword(target.value)}
                />
              </div>
              <div className="col-span-1 text-right">
                <ButtonUnstyled
                  onClick={handleToggle2}
                  className="border-b-2 px-auto py-3 font-light placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-0 w-full"
                >
                  <FontAwesomeIcon icon={iconCPass} />
                </ButtonUnstyled>
              </div>
            </div>
            <PasswordStrengthBar
              password={cPassword}
              shortScoreWord="Demasiado corta"
              scoreWords={[
                "Muy poco segura",
                "Débil",
                "Buena",
                "Muy buena",
                "Excelente",
              ]}
              minLength={8}
              onChangeScore={(score, feedback) => {
                setPasswdStrength(score);
              }}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="inline lg:hidden mt-4 sm:mt-4">
        <button
          className="inline-block px-5 py-3 rounded-3xl bg-red-600 hover:bg-red-800 uppercase text-center tracking-wider font-semibold text-sm text-white shadow-lg sm:text-base w-full"
          type="button"
          style={{ transition: "all .15s ease" }}
          onClick={handleRegister}
        >
          Registrar
        </button>
      </div>
    </>
  );
}
export default RegisterMobile;
