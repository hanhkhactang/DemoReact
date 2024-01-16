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
import Book from "../Views/Book";
import Category from "../Views/Category";
import CategoryEdit from "../Views/CategoryEdit";
import NoPermission from "../Views/NoPermission";
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
                <Route path="/book" element={<NoPermission />} />
                <Route path="/category" element={<NoPermission />} />
                <Route path="/category-edit/:id" element={<NoPermission />} />
                <Route path="/book-edit/:id" element={<NoPermission />} />
              </Routes>
            </>
          ) : (
            <>
              <Routes>
                <Route path="/card" element={<Home />} />
                <Route path="/book" element={<Book />} />
                <Route path="/category" element={<Category />} />
                <Route path="/category-edit/:id" element={<CategoryEdit />} />
                <Route path="/book-edit/:id" element={<BookEdit />} />
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
