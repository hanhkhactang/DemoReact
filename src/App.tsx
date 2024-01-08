import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import DefaultLayout from "./containers/DefaultLayout";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<DefaultLayout />} />
    </Routes>
  );
}

export default App;
