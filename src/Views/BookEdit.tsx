import * as React from "react";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { firestoreDb } from "../firebase-config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import Input from "../components/Input";
import CustomButton from "../components/CustomButton";
import { Card, Col, Container, Row } from "react-bootstrap";
import { IBook } from "./Book";
import { ICategory } from "./Category";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Select from "../components/Select";

const defaulftBookValue = {
  id: "",
  code: "",
  name: "",
  author: "",
  description: "",
  price: "",
  quantity: "",
  image: "",
  categoryId: "",
};

type TBook = {
  code: string;
  name: string;
  author: string;
  description: string;
  price: string;
  quantity: string;
  image: string;
  categoryId: string;
};

const BookEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<IBook>(defaulftBookValue);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/book");
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setBook({
      ...book,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleChangeSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    setBook({
      ...book,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSave = () => {
    const data: TBook = { ...book };
    if (book.id === "") {
      addDoc(collection(firestoreDb, "book"), data).then(
        (docRef) => {
          navigate("/book");
          toast.success("Add successfully");
        },
        (error) => setMessage(error.message)
      );
    } else {
      setDoc(doc(firestoreDb, "book", book.id), data).then(
        (docRef) => {
          navigate("/book");
          toast.success("Update successfully");
        },
        (error) => setMessage(error.message)
      );
    }
  };

  const loadCategory = () => {
    const q = query(collection(firestoreDb, "categories"), orderBy("name"));
    getDocs(q).then((QuerySnapshot) => {
      const data = QuerySnapshot.docs.map((doc) => {
        const item = doc.data() as ICategory;
        item.id = doc.id;
        return item;
      });
      setCategories(data);
    });
  };

  useEffect(() => {
    loadCategory();
    if (id !== "0") {
      getDoc(doc(collection(firestoreDb, "book"), id)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as IBook;
          data.id = snapshot.id;
          setBook(data);
          console.log(data);
        } else setBook(defaulftBookValue);
      });
    }
  }, [id, navigate]);

  return (
    <Container className="container mt-4">
      <Row className="justify-content-center">
        <Col md="6">
          <Card className="border-primary bt-5">
            <Card.Header>
              <h3 className="card-title">
                Book{" "}
                <small className="text-muted">
                  {id === "0" ? "new" : "edit"}
                </small>
              </h3>
            </Card.Header>
            <Card.Body>
              <Input
                label="Code"
                id="txtCode"
                name="code"
                onChange={handleChange}
                defaultValue={book.code}
                autoComplete="off"
                placeholder="Book Code"
                required
              />
              <Input
                label="Name"
                id="txtName"
                name="name"
                onChange={handleChange}
                defaultValue={book.name}
                autoComplete="off"
                placeholder="Book Name"
                required
              />
              <Input
                label="Author"
                id="txtAuthor"
                name="author"
                onChange={handleChange}
                defaultValue={book.author}
                autoComplete="off"
                placeholder="Author"
                required
              />
              <Input
                label="Description"
                id="txtDescription"
                name="description"
                onChange={handleChange}
                defaultValue={book.description}
                autoComplete="off"
                placeholder="Description"
                required
              />
              <Input
                label="Image"
                id="txtImage"
                name="image"
                onChange={handleChange}
                defaultValue={book.image}
                autoComplete="off"
                placeholder="Image"
                required
              />
              <Input
                label="Price"
                id="txtPrice"
                name="price"
                onChange={handleChange}
                defaultValue={book.price}
                autoComplete="off"
                placeholder="Price"
                required
              />
              <Input
                label="Quantity"
                id="txtQuantity"
                name="quantity"
                onChange={handleChange}
                defaultValue={book.quantity}
                autoComplete="off"
                placeholder="Quantity"
                required
              />
              <Select
                id="drpCategory"
                label="Category"
                values={categories}
                inputSize={6}
                required
                lastRow
                name="categoryId"
                onChange={handleChangeSelect}
              />
            </Card.Body>
            <Card.Footer className="text-center">
              <CustomButton
                color="secondary"
                className="me-1"
                onClick={handleBack}
              >
                Back
              </CustomButton>
              <CustomButton color="primary" onClick={handleSave}>
                Save
              </CustomButton>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookEdit;
