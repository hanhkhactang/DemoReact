import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import DefaultLayout from "./containers/DefaultLayout";
import "./firebase-config";
import Login from "./Views/Login";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { saveUser } from "./store/slice/authSlice";
import store, { RootState } from "./store/store";

function App() {
  const auth = getAuth();
  const user = useSelector((state) => state.auth.value);

  console.log("user from state", user);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(saveUser(user.refreshToken));
      } else {
        dispatch(saveUser(undefined));
      }
    });
  }, [auth, dispatch]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />{" "}
      <Route path="/*" element={<DefaultLayout />} />{" "}
    </Routes>
  );
}

export default App;
