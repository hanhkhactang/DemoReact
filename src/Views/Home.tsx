import * as React from "react";
import { useTranslation } from "react-i18next";
import "../App.css";
const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="container">
      <h1 className="text-center text-primary mt-5">{t("welcome")} </h1>

      <div id="root">
        <div className="main-body">
          <h1 className="main-title">
            Best Sellers <span>in Books</span>
          </h1>
          <h4 className="date">January 2024</h4>
          <article className="book-list">
            <article className="book">
              <span className="number">#1</span>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/716vTsk5TSL._AC_UL600_SR600,400_.jpg"
                alt="A Thousand Brains"
              />
              <h2>A Thousand Brains</h2>
              <h4>Jeff Hawkins</h4>
            </article>
            <article className="book">
              <span className="number">#2</span>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/716vTsk5TSL._AC_UL600_SR600,400_.jpg"
                alt="Tracers in the Dark"
              />
              <h2>Tracers in the Dark</h2>
              <h4>Andy Greenberg</h4>
            </article>
            <article className="book">
              <span className="number">#3</span>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/716vTsk5TSL._AC_UL600_SR600,400_.jpg"
                alt="Chip War"
              />
              <h2>Chip War</h2>
              <h4>Chris Miller</h4>
            </article>
            <article className="book">
              <span className="number">#4</span>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/716vTsk5TSL._AC_UL600_SR600,400_.jpg"
                alt="Atomic Habits"
              />
              <h2>Atomic Habits</h2>
              <h4>James Clear</h4>
            </article>
            <article className="book">
              <span className="number">#5</span>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/716vTsk5TSL._AC_UL600_SR600,400_.jpg"
                alt="The Creative Act: A Way of Being "
              />
              <h2>The Creative Act: A Way of Being </h2>
              <h4>Rick Rubin</h4>
            </article>
            <article className="book">
              <span className="number">#6</span>
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/716vTsk5TSL._AC_UL600_SR600,400_.jpg"
                alt="It Starts with Us: A Novel"
              />
              <h2>It Starts with Us: A Novel</h2>
              <h4>Colleen Hoover</h4>
            </article>
          </article>
          <section className="bottom">
            <h5 className="bottom-title">
              Bestsellers books using <span>React</span>
            </h5>
            <h5 className="bottom-dy">
              <a href="/#" target="_blank" rel="noreferrer">
                Demo Project
              </a>
            </h5>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
