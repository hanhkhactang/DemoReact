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
import CustomButton from "../components/CustomButton";
import { toast } from "react-toastify";
import { Toast } from "react-bootstrap";
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
  let w = 0;
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
              toast.success("Add quantity successfully");
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
        toast.success("Add to cart successfully");
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
                <span className="number">#{(w += 1)}</span>
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
