import * as React from "react";

// import { useState, useEffect } from 'react';
import Home from "../Views/Home";
import { Navigate, Route, Routes } from "react-router-dom";
import Userpage from "../Views/Userpage";
import BookEdit from "../Views/BookEdit";
import Login from "../Views/Login";
import Header from "./Header";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import Card from "../Views/Card";
// import MajorEdit from "../views/MajorEdit";
let issig = 0;
const DefaultLayout = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const dispatch = useDispatch();
  return (
    <>
      {user ? (
        <>
          <Header />
          <Routes>
            <Route path="home" element={<Home />} />
            <Route path="/userpage" element={<Userpage />} />
            <Route path="/bookedit" element={<BookEdit />} />
          </Routes>
          {user?.uid === "bkoVUj2Iy8eNGUu6vtB6kfMpO492" ? (
            <>
              <Routes>
                <Route path="/card" element={<Card />} />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/card" element={<Home />} />
              </Routes>
            </>
          )}
        </>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

export default DefaultLayout;
