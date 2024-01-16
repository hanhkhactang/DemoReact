import * as React from "react";
import { useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import { ICategory } from "./Category";
import { error } from "console";

const defaulftCategoryValue = {
  id: "",
  code: "",
  name: "",
};

type TCategory = {
  code: string;
  name: string;
};

const CategoryEdit = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<ICategory>(defaulftCategoryValue);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/category");
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCategory({
      ...category,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleSave = () => {
    const data: TCategory = { ...category };
    if (category.id === "") {
      addDoc(collection(firestoreDb, "categories"), data).then(
        (docRef) => {
          navigate("/category");
          toast.success("Add successfully");
        },
        (error) => setMessage(error.message)
      );
    } else {
      setDoc(doc(firestoreDb, "categories", category.id), data).then(
        (docRef) => {
          navigate("/category");
          toast.success("Update successfully");
        },
        (error) => setMessage(error.message)
      );
    }
  };

  useEffect(() => {
    if (id !== "0") {
      getDoc(doc(collection(firestoreDb, "categories"), id)).then(
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data() as ICategory;
            data.id = snapshot.id;
            setCategory(data);
          } else setCategory(defaulftCategoryValue);
        }
      );
    }
  }, [id, navigate]);

  return (
    <Container className="container mt-4">
      <Row className="justify-content-center">
        <Col md="6">
          <Card className="border-primary bt-5">
            <Card.Header>
              <h3 className="card-title">
                Category{" "}
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
                defaultValue={category.code}
                autoComplete="off"
                placeholder="Category Code"
                required
              />
              <Input
                label="Name"
                id="txtName"
                name="name"
                onChange={handleChange}
                defaultValue={category.name}
                autoComplete="off"
                placeholder="Category Name"
                required
                lastRow
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

export default CategoryEdit;
