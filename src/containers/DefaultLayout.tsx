import * as React from "react";

// import { useState, useEffect } from 'react';
import Home from "../Views/Home";
import { Route, Routes } from "react-router-dom";
import Userpage from "../Views/Userpage";
import BookEdit from "../Views/BookEdit";
// import MajorEdit from "../views/MajorEdit";
const DefaultLayout = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/userpage" element={<Userpage />} />
        <Route path="/bookedit" element={<BookEdit />} />
      </Routes>
    </>
  );
};

export default DefaultLayout;
