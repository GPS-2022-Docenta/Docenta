import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AdminProfile from "./pages/AdminProfile";
import Catalog from "./pages/Catalog";
import Favorites from "./pages/Favorites";
import Management from "./pages/Management";
import UserManagement from "./pages/UserManagement";
import ContentManagement from "./pages/ContentManagement";
import AddCourse from "./pages/AddCourse";
import FavCourse from "./pages/FavCourse";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ForgotPasswd from "./pages/ForgotPasswd";
import RestorePasswd from "./pages/RestorePasswd";
import Course from "./pages/Course";
import Protected from "./components/ProtectedRoute";

function App() {
  const loadIsAdmin = sessionStorage.getItem("adminLogin");
  const loadIsUser = sessionStorage.getItem("loggedIn");
  const [admin, setAdmin] = useState(loadIsAdmin);
  const [user, setUser] = useState(loadIsUser);

  useEffect(() => {
    setAdmin(loadIsAdmin);
    setUser(loadIsUser);
  }, [loadIsAdmin, loadIsUser]);

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
        <Route
          path="/profile"
          element={
            <Protected isLoggedIn={user}>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/admin"
          element={
            <Protected isLoggedIn={admin}>
              <AdminProfile />
            </Protected>
          }
        />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<Course />} />
        <Route
          path="/favorites"
          element={
            <Protected isLoggedIn={user}>
              <Favorites />
            </Protected>
          }
        />
        <Route
          path="/favorites/:id"
          element={
            <Protected isLoggedIn={user}>
              <FavCourse />
            </Protected>
          }
        />
        <Route
          path="/management"
          element={
            <Protected isLoggedIn={admin}>
              <Management />
            </Protected>
          }
        />
        <Route
          path="/user-management"
          element={
            <Protected isLoggedIn={admin}>
              <UserManagement />
            </Protected>
          }
        />
        <Route
          path="/content-management"
          element={
            <Protected isLoggedIn={admin}>
              <ContentManagement />
            </Protected>
          }
        />
        <Route
          path="/add-course"
          element={
            <Protected isLoggedIn={admin}>
              <AddCourse />
            </Protected>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Protected isLoggedIn={admin}>
              <Dashboard />
            </Protected>
          }
        />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
