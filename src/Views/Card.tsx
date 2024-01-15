import * as React from "react";
import "../App.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { firestoreDb } from "../firebase-config";
import { getAuth } from "firebase/auth";
import { IBook } from "./Home";
export interface ICard {
  id: string;
  userId: string;
  bookId: string;
  quantity: number;
}

const Card = () => {
  const [bookes, setBookes] = React.useState<IBook[]>([]);
  const [card, setCard] = React.useState<ICard[]>([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  let u = user?.uid;
  let total = 0;
  useEffect(() => {
    loadData();
  }, []);
  const loadData = () => {
    const q = query(collection(firestoreDb, "book"), orderBy("quantity"));
    getDocs(q).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => {
        const b = doc.data() as IBook;
        b.id = doc.id;
        return b;
      });
      setBookes(data);
    });
    const c = query(collection(firestoreDb, "Card"), orderBy("quantity"));
    getDocs(c).then((querySnapshot) => {
      const ca = querySnapshot.docs.map((doc) => {
        const item = doc.data() as ICard;
        item.id = doc.id;
        console.log(item.id);
        return item;
      });
      setCard(ca);
    });
  };
  const deletehandle = (e: any, id: string) => {
    e.preventDefault();
    deleteDoc(doc(firestoreDb, "Card", id)).then(() => loadData());
  };
  const handleAdd = (e: any, id: string, quantity: number) => {
    e.preventDefault();
    const q = query(collection(firestoreDb, "book"), orderBy("quantity"));
    getDocs(q).then((querySnapshot) => {
      const docRef = doc(firestoreDb, "Card", id);
      const b = quantity + 1;
      const data = {
        quantity: b,
      };
      updateDoc(docRef, data).then((docRef) => {
        console.log("Value of an Existing Document Field has been updated");
        loadData();
        navigate("/card");
      });
    });
  };
  const handleAdd1 = (e: any, id: string, quantity: number) => {
    e.preventDefault();
    if (quantity > 1) {
      const q = query(collection(firestoreDb, "book"), orderBy("quantity"));
      getDocs(q).then((querySnapshot) => {
        const docRef = doc(firestoreDb, "Card", id);
        const b = quantity - 1;
        const data = {
          quantity: b,
        };
        updateDoc(docRef, data).then((docRef) => {
          console.log("Value of an Existing Document Field has been updated");
          loadData();
          navigate("/card");
        });
      });
    } else deletehandle(e, id);
  };
  console.log(u);
  let y = false;
  let a = 0;
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
            {card.map((item, index) => (
              <>
                {" "}
                <> {console.log(item.userId)}</>
                {u === item.userId ? (
                  <>
                    <article className="book" key={item.id}>
                      {" "}
                      <span className="number">#{(a += 1)}</span>
                      {bookes.map((b, index) => (
                        <>
                          {b.id === item.bookId ? (
                            <>
                              <img src={b.image} alt={b.name} />
                              <h2>{b.name}</h2>
                              <h4>{b.author}</h4>
                              <h4>{b.price} VND</h4>
                              {(total = total + b.price * item.quantity)}
                            </>
                          ) : (
                            ""
                          )}
                          {y === false ? (
                            <>
                              {(y = true)}
                              <div className="row">
                                <a
                                  className="col"
                                  href="/#"
                                  onClick={(e) =>
                                    handleAdd1(e, item.id, item.quantity)
                                  }
                                  defaultValue={item.quantity + 1}
                                >
                                  <i className="bi bi-chevron-left  " />
                                </a>

                                <h4 className="col">
                                  Số Lượng:{item.quantity}
                                </h4>
                                <a
                                  className="col"
                                  href="/#"
                                  onClick={(e) =>
                                    handleAdd(e, item.id, item.quantity)
                                  }
                                  defaultValue={item.quantity + 1}
                                >
                                  <i className="bi bi-chevron-right " />
                                </a>
                              </div>
                              <a
                                className="col bg-black"
                                href="/#"
                                onClick={(e) => deletehandle(e, item.id)}
                                defaultValue={item.quantity + 1}
                              >
                                <i className="bi-trash text-danger " />
                              </a>
                            </>
                          ) : (
                            ""
                          )}
                        </>
                      ))}
                    </article>
                  </>
                ) : (
                  ""
                )}
                {(y = false)}
              </>
            ))}
          </article>
          <section className="bottom">
            <h5 className="bottom-title">
              Total: <span>{total} VND</span>
            </h5>
            <h5 className="bottom-dy">
              <a href="/#" target="_blank" rel="noreferrer">
                Thanh toan
              </a>
            </h5>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Card;
