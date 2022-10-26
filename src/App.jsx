import React from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ForgotPasswd from "./pages/ForgotPasswd";
import RestorePasswd from "./pages/RestorePasswd";

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Docenta</title>
        <link rel="canonical" href="" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-passwd" element={<ForgotPasswd />} />
        <Route path="/restore-passwd" element={<RestorePasswd />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile-settings" element="" />
      </Routes>
    </>
  );
}

export default App;
