import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/catalog.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import NavbarManagement from "../components/NavbarManagement";
import Loading from "../components/Loader";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// URLs para manejo de datos en la BD
const usersURL = "https://docenta-api.vercel.app/users/";
const coursesURL = "https://docenta-api.vercel.app/courses/";
const courseStatsURL = "https://docenta-api.vercel.app/courseStats/";
const countryStatsURL = "https://docenta-api.vercel.app/countryStats/";

function Dashboard() {
  const navigate = useNavigate();
  // Constante para almacenar las estadísticas
  const [loading, setLoading] = useState(true);
  const [matchingCourses, setMatchingCourses] = useState([]);
  const [user, setUser] = useState([]);
  const [countries, setCountries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [favCourses, setFavCourses] = useState([]);
  const [numUsers, setNumUsers] = useState([]);
  const [numMen, setNumMen] = useState(0);
  const [numWomen, setNumWomen] = useState(0);

  const fetchUsers = async () => {
    const { data } = await axios.get(usersURL);
    setUser(data);
    // Obtener el número de usuarios registrados.
    const num = data.length;
    // Obtener el número de hombres.
    const man = data.filter((elem) => elem.gender === "Hombre").length;
    // Obtener el número de mujeres.
    const woman = data.filter((elem) => elem.gender === "Mujer").length;
    setNumUsers(num);
    setNumMen(man);
    setNumWomen(woman);
  };

  const fetchCountryStats = async () => {
    const { data } = await axios.get(countryStatsURL);
    setCountries(data);
  };

  const fetchCourseStats = async () => {
    let getCourses = [];
    let getFavCourses = [];

    await axios
      .get(coursesURL)
      .then((response) => {
        getCourses = response.data;
        setCourses(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));

    await axios
      .get(courseStatsURL)
      .then((response) => {
        getFavCourses = response.data;
        setFavCourses(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
    // Buscar valores correspondientes de monedas en un array y otro.
    const matching = getCourses.filter((o1) =>
      getFavCourses.some((o2) => o1.id === o2.id)
    );
    setMatchingCourses(matching);
  };

  useEffect(() => {
    fetchCourseStats();
    fetchCountryStats();
    fetchUsers();
    setTimeout(() => setLoading(false), 500);
  }, []);

  const displayCountries = countries.map((elem, index) => {
    // Se busca el país cuyo nombre es el mismo que el de alguno
    // del top 3 y se almacenan todos sus datos en la variable.
    return (
      <div key={elem.country}>
        {index + 1}. {elem.country}{" "}
      </div>
    );
  });

  const displayFavCourses = matchingCourses.map((elem, index) => {
    // Se busca el país cuyo nombre es el mismo que el de alguno
    // del top 3 y se almacenan todos sus datos en la variable.
    return (
      <div key={elem.nombre}>
        {index + 1}. {elem.nombre}{" "}
      </div>
    );
  });

  return (
    <>
      {loading === false ? (
        <main>
          <NavbarManagement />
          <div id="top-index" className="App-header">
            <div className="absolute top-28 lg:top-44">
              <h1 className="text-4xl lg:text-6xl text-center font-semibold mt-10">
                Estadísticas
              </h1>
            </div>
            <div className="max-lg:mt-64 mt-80 mb-5 grid lg:grid-cols-4 md:grid-cols-2 max-sm:grid-cols-1 items-center gap-8">
              <div
                data-test="course-card"
                className="cursor-pointer max-w-lg h-96 border-4 border-slate-800 hover:border-zinc-100 hover:scale-105 duration-200 overflow-hidden bg-white rounded-2xl my-2 shadow-lg dark:bg-gray-800"
              >
                <div className="flex items-center justify-center bg-gradient-to-tr from-slate-50 to-amber-200 hover:bg-gradient-to-bl hover:from-amber-300 hover:to-indigo-400 h-72 text-6xl text-red-600 font-extrabold">
                  {numUsers}
                </div>
                <div className="px-4 py-2">
                  <h1 className="mt-5 text-lg text-center h-22 font-bold text-gray-800 dark:text-white">
                    Usuarios registrados
                  </h1>
                </div>
              </div>
              <div
                data-test="course-card"
                className="cursor-pointer max-w-lg h-96 border-4 border-slate-800 hover:border-zinc-100 hover:scale-105 duration-200 overflow-hidden bg-white rounded-2xl my-2 shadow-lg dark:bg-gray-800"
              >
                <div className="flex items-center justify-center bg-gradient-to-tr from-slate-50 to-amber-200 hover:bg-gradient-to-bl hover:from-amber-300 hover:to-indigo-400 h-72 text-6xl text-red-600 font-extrabold">
                  <Pie
                    data={{
                      labels: ["Hombres", "Mujeres"],
                      datasets: [
                        {
                          label: "Ratio hombres/mujeres",
                          data: [
                            ((numMen / numUsers) * 100).toFixed(1),
                            ((numWomen / numUsers) * 100).toFixed(1),
                          ],
                          backgroundColor: [
                            "rgb(54, 162, 235)",
                            "rgb(255, 99, 132)",
                          ],
                          hoverOffset: 4,
                        },
                      ],
                    }}
                  />
                </div>
                <div className="px-4 py-2">
                  <h1 className="mt-5 text-lg text-center h-22 font-bold text-gray-800 dark:text-white">
                    Ratio hombres/mujeres (%)
                  </h1>
                </div>
              </div>
              <div
                data-test="course-card"
                className="cursor-pointer max-w-lg h-96 border-4 border-slate-800 hover:border-zinc-100 hover:scale-105 duration-200 overflow-hidden bg-white rounded-2xl my-2 shadow-lg dark:bg-gray-800"
              >
                <div className="flex flex-col justify-center bg-gradient-to-tr from-slate-50 to-amber-200 hover:bg-gradient-to-bl hover:from-amber-300 hover:to-indigo-400 h-72 text-emerald-800 p-6 font-bold italic">
                  {displayCountries}
                </div>
                <div className="px-4 py-2">
                  <h1 className="mt-5 text-lg text-center h-22 font-bold text-gray-800 dark:text-white">
                    Top 3 países más registrados
                  </h1>
                </div>
              </div>
              <div
                data-test="course-card"
                className="cursor-pointer max-w-lg h-96 border-4 border-slate-800 hover:border-zinc-100 hover:scale-105 duration-200 overflow-hidden bg-white rounded-2xl my-2 shadow-lg dark:bg-gray-800"
              >
                <div className="flex flex-col justify-center bg-gradient-to-tr from-slate-50 to-amber-200 hover:bg-gradient-to-bl hover:from-amber-300 hover:to-indigo-400 h-72 text-amber-900 p-6 text-xl w-80 font-bold italic">
                  {displayFavCourses}
                </div>
                <div className="px-4 py-2">
                  <h1 className="mt-5 text-lg text-center h-22 font-bold text-gray-800 dark:text-white">
                    Top 3 cursos más gustados
                  </h1>
                </div>
              </div>
            </div>
            <span className="md:fixed bottom-0 left-10 hover:text-yellow-400">
              <button
                data-test="back-button"
                type="button"
                className="mb-5 text-4xl"
                onClick={() => navigate("/management")}
              >
                <FontAwesomeIcon icon={faArrowLeftLong} />
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

export default Dashboard;
