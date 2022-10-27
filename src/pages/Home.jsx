import React from "react";
import "../css/homeStyles.css";
import Navbar from "../components/Navbar.jsx";
import "boxicons";

export default function Login() {
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="home-container absolute w-full h-full flex flex-wrap flex-col text-center content-center justify-center text-white">
          <h1 className="fade-in text-3xl lg:text-5xl font-semibold">
            Bienvenido a Docenta
          </h1>
        </div>
      </main>
    </>
  );
}
