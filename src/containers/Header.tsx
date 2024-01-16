import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getAuth } from "firebase/auth";
import { Nav } from "react-bootstrap";
const auth = getAuth();
const user = auth.currentUser;
let a = user?.email;
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loout = (e: any) => {
    e.preventDefault();

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
            src={process.env.PUBLIC_URL + "/img/book.png"}
            alt="logo"
            style={{ height: "25px" }}
            className="me-1"
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
              <NavLink className="nav-link " to="/home">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <Nav.Link as={NavLink} to="/category">
                Category
              </Nav.Link>
            </li>
            <Nav.Link as={NavLink} to="/book">
              Book
            </Nav.Link>

            <li className="nav-item">
              <NavLink className="nav-link" to="/card">
                Card
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link " to="/card">
                Welcome {a}
                <i className="bi-cart text-bg-danger " />
              </NavLink>
            </li>
            <li className="nav-item" onClick={loout}>
              <a className="nav-link" href="\">
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
