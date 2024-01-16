import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Col, Container, Row, Table } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { firestoreDb } from "../firebase-config";
import { ICategory } from "./Category";

export interface IBook {
  id: string;
  code: string;
  name: string;
  description: string;
  author: string;
  price: string;
  quantity: string;
  image: string;
  categoryId: string;
}

const Book = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const navigate = useNavigate();

  const showEditPage = (e: any, id: string) => {
    if (e) e.preventDefault();
    navigate(`/book-edit/${id}`);
  };

  const handleDelete = (e: any, id: string) => {
    e.preventDefault();
    deleteDoc(doc(firestoreDb, "book", id)).then(() => loadData());
    toast.warning("Delete successfully");
  };

  useEffect(() => {
    loadData();
    loadCategory();
  }, []);

  const loadData = () => {
    const q = query(collection(firestoreDb, "book"), orderBy("name"));
    getDocs(q).then((QuerySnapshot) => {
      const data = QuerySnapshot.docs.map((doc) => {
        const item = doc.data() as IBook;
        item.id = doc.id;
        return item;
      });
      setBooks(data);
    });
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
  return (
    <Container className="mt-4">
      <Card className="border-primary bt-5">
        <Card.Header>
          <Row>
            <Col>
              <h3 className="card-title">
                Book <small className="text-muted">list</small>
              </h3>
            </Col>
            <Col xs="auto">
              <CustomButton
                color="primary"
                onClick={() => showEditPage(null, "0")}
              >
                <i className="bi-plus-lg" /> Add
              </CustomButton>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Table responsive bordered hover striped className="border-primary">
            <thead>
              <tr className="table-primary border-primary">
                <th style={{ width: 50 }}>#</th>
                <th>Code</th>
                <th>Book name</th>
                <th>Author</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th style={{ width: 80 }} />
              </tr>
            </thead>
            <tbody>
              {books.map((item, index) => (
                <tr key={item.id}>
                  <th className="text-center">{index + 1}</th>
                  <td>{item.code}</td>
                  <td>{item.name}</td>
                  <td>{item.author}</td>
                  <td>{item.description}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td className="text-center">
                    <img
                      src={item.image}
                      alt=""
                      className="img-thumbnail"
                      style={{ height: 100, width: 80 }}
                    ></img>
                  </td>
                  <td className="text-center">
                    <a
                      href="/#"
                      className="me-1"
                      onClick={(e) => showEditPage(e, item.id)}
                    >
                      <i className="bi-pencil-square text-primary" />
                    </a>
                    <a href="/#" onClick={(e) => handleDelete(e, item.id)}>
                      <i className="bi-trash text-danger" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        size="lg"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {getValues().id > 0 ? "Update" : "New"} Student
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit(handleSave)}>
          <Modal.Body>
            <Row>
              <Col sm="4" className="text-center">
                <img
                  src={imagePreview}
                  alt=""
                  className="img-thumbnail rounded-circle border-primary d-block"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="d-none"
                  ref={inputFileRef}
                  onChange={handleChangeImage}
                />
                <div className="mt-3">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => inputFileRef.current.click()}
                  >
                    Change
                  </Button>
                  {getValues().id > 0 ? (
                    <Button
                      variant="warning"
                      size="sm"
                      className="ms-1"
                      onClick={downloadImage}
                    >
                      Download
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </Col>
              <Col>
                <Input
                  label="Student Id"
                  id="txtId"
                  name="Id"
                  frmField={register("stuId")}
                  errMessage={errors.stuId?.message}
                  autoComplete="off"
                  placeholder="Student Id"
                  required
                />
                <div className="row mb-3">
                  <label
                    htmlFor="txtLastName"
                    className="col-sm-3 col-form-label required"
                  >
                    Full name
                  </label>
                  <div className="col-sm-5">
                    <input
                      type="text"
                      id="txtLastName"
                      className={`form-control ${
                        errors.lastName?.message ? "is-invalid" : ""
                      }`}
                      placeholder="Last name"
                      {...register("lastName")}
                    />
                    {errors.lastName?.message ? (
                      <div className="invalid-feedback">
                        {errors.lastName?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      id="txtFirstName"
                      className={`form-control ${
                        errors.firstName?.message ? "is-invalid" : ""
                      }`}
                      placeholder="First name"
                      {...register("firstName")}
                    />
                    {errors.firstName?.message ? (
                      <div className="invalid-feedback">
                        {errors.firstName?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <label
                    // htmlFor="txtLastName"
                    className="col-sm-3 col-form-label required"
                  >
                    Gender
                  </label>
                  <div className="col-sm">
                    <div className="form-check form-check-inline mt-2">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value={0}
                        defaultChecked={getValues().gender === 0}
                        onClick={() => setValue("gender", 0)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio1"
                      >
                        Male
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value={1}
                        defaultChecked={getValues().gender === 1}
                        onClick={() => setValue("gender", 1)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="inlineRadio2"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                </div>
                <Input
                  label="Phone"
                  id="txtPhone"
                  name="Phone"
                  frmField={register("phone")}
                  errMessage={errors.phone?.message}
                  autoComplete="off"
                  placeholder="Phone number"
                  required
                />
                <Input
                  type="email"
                  label="Email"
                  id="txtEmail"
                  name="Email"
                  frmField={register("email")}
                  errMessage={errors.email?.message}
                  autoComplete="off"
                  placeholder="Email address"
                />
                <Select
                  id="drpMajor"
                  label="Major"
                  values={majors}
                  inputSize={6}
                  required
                  lastRow
                  frmField={register("majorId")}
                  errMessage={errors.majorId?.message}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!formIsDirty || !formIsValid || isWaiting}
            >
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal> */}
    </Container>
  );
};

export default Book;
