import * as React from "react";
import "../App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { firestoreDb } from "./../firebase-config";
import { ICard } from "./Card";
import { getAuth } from "firebase/auth";
import CustomButton from "../component/CustomButton";
export interface IBook {
  id: string;
  code: string;
  name: string;
  author: string;
  categoryId: string;
  image: string;
  price: number;
  quantity: number;
}
const Home = () => {
  const [bookes, setBookes] = React.useState<IBook[]>([]);
  const Navigate = useNavigate();
  const [card, setCard] = React.useState<ICard[]>([]);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    const q = query(collection(firestoreDb, "book"), orderBy("quantity"));
    getDocs(q).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const item = doc.data() as IBook;
        item.id = doc.id;
        return item;
      });
      setBookes(data);
    });
  };
  const addToCart = (e: any, ids: string) => {
    e.preventDefault();
    const c = query(collection(firestoreDb, "Card"), orderBy("quantity"));
    getDocs(c).then((querySnapshot) => {
      let n = false;
      const ca = querySnapshot.docs.map((d) => {
        const item = d.data() as ICard;
        item.id = d.id;
        const docRef = doc(firestoreDb, "Card", item.id);
        if (user?.uid === item.userId && ids === item.bookId && n === false) {
          n = true;
          const q = query(collection(firestoreDb, "book"), orderBy("quantity"));

          getDocs(q).then((querySnapshot) => {
            const b = item.quantity + 1;
            const data = {
              quantity: b,
            };
            updateDoc(docRef, data).then((docRef) => {
              console.log(
                "Value of an Existing Document Field has been updated"
              );
              navigate("/card");
            });
          });
        } else {
        }
      });
      if (n === false) {
        const b = ids;
        addDoc(collection(firestoreDb, "Card"), {
          userId: user?.uid,
          bookId: b,
          quantity: 1,
        });
        navigate("/card");
      }
    });
  };

  return (
    <div className="container">
      <h1 className="text-center text-primary mt-5">{"welcome"} </h1>

      <div id="root">
        <div className="main-body">
          <h1 className="main-title">
            Best Sellers <span>in Books</span>
          </h1>
          <h4 className="date">January 2024</h4>
          <article className="book-list">
            {bookes.map((item, index) => (
              <article className="book" key={item.id}>
                <span className="number">#1</span>
                <img src={item.image} alt={item.name} />
                <h2>{item.name}</h2>
                <h4>{item.author}</h4>
                <h4>{item.price} VND</h4>
                <CustomButton
                  type="button"
                  color="primary"
                  className="btn-primary"
                  onClick={(e) => addToCart(e, item.id)}
                >
                  Add To Cart
                  <a href="/#"></a>
                  <i className="bi-cart text-bg-dark " />
                </CustomButton>
              </article>
            ))}
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
