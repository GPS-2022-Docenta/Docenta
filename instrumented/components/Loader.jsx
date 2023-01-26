import React from "react";
import { CircularProgress } from "@mui/material";
import "../css/catalog.css";

function Loading() {
  return (
    <div className="catalog-container">
      <h1 className="text-4xl">
        Cargando...
        <div className="spinner">
          <p>
            <CircularProgress color="inherit" />
          </p>
        </div>
      </h1>
    </div>
  );
}

export default Loading;
