import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";
const Header = () => {
  const dispatch = useDispatch();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const loout = (e: any) => {
    e.preventDefault();
    const auth = getAuth();
    auth.signOut().then(() => {
      localStorage.removeItem("userInfo");
      navigate("/login");
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="nacbar-brand " to="/">
          <img
            src={process.env.PUBLIC_URL + "/graduate.png"}
            alt="logo"
            style={{ height: "25px" }}
          />
          <a className="navbar-brand" href="/">
            Book sell
          </a>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link " to="/major">
                1111111111
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " to="/instructors">
                2222222222222
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/students">
                33333333333
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link " to="/#">
                4444444444444444
              </NavLink>
            </li>
            <li className="nav-item" onClick={loout}>
              <a className="nav-link" href="\#">
                <i className="bi-box-arrow-right" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;