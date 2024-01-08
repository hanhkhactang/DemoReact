import * as React from "react";
import { useTranslation } from "react-i18next";
import "../App.css";
import img from "src/logo.svg";
import { Button, Col, Modal, Row } from "react-bootstrap";
const BookEdit = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="wrapper">
        <form id="wizard" role="application" className="wizard clearfix">
          <div className="content clearfix">
            <h2 id="wizard-h-0" tabIndex={-1} className="title current" />
            <section
              id="wizard-p-0"
              role="tabpanel"
              aria-labelledby="wizard-h-0"
              className="body current"
              aria-hidden="false"
              style={{}}
            >
              <div className="inner">
                <div className="col mt-4">
                  <img
                    src="https://images-na.ssl-images-amazon.com/images/I/716vTsk5TSL._AC_UL600_SR600,400_.jpg"
                    width={"100%"}
                    height={"80%"}
                    className="row m-2"
                  />
                  <div className="mt-3 text-center">
                    <Row>
                      <Col sm="4" className="text-center">
                        <Button variant="primary" size="sm">
                          Change
                        </Button>
                      </Col>
                      <Col sm="4" className="text-center">
                        <Button variant="warning" size="sm" className="ms-1">
                          Dowload
                        </Button>
                      </Col>
                      {/* onClick={() => inputFireRef.current.click()} */}
                    </Row>
                  </div>
                </div>

                <label htmlFor=""></label>
                <div className="form-content">
                  <div className="form-header">
                    <h3>Chang Information Book</h3>
                  </div>
                  <p>Please fill with your details</p>
                  <div className="form-row">
                    <div className="form-holder">
                      <input
                        type="text"
                        placeholder="Book Name"
                        className="form-control"
                      />
                    </div>
                    <div className="form-holder">
                      <input
                        type="text"
                        placeholder="Author"
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div
                      className="form-holder"
                      style={{
                        alignSelf: "flex-end",
                        transform: "translateY(4px)",
                      }}
                    >
                      <div className="checkbox-tick row">
                        <label className="male col">
                          <input
                            type="radio"
                            name="gender"
                            defaultValue="male"
                            defaultChecked
                          />{" "}
                          still available for sale
                          <br />
                          <span className="checkmark" />
                        </label>
                        <label className="female col">
                          <input
                            type="radio"
                            name="gender"
                            defaultValue="female"
                          />{" "}
                          soul out
                          <br />
                          <span className="checkmark" />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="checkbox-circle"></div>
                </div>
              </div>
            </section>
            <h2 id="wizard-h-1" tabIndex={-1} className="title" />
            <section
              id="wizard-p-1"
              role="tabpanel"
              aria-labelledby="wizard-h-1"
              className="body"
              aria-hidden="true"
              style={{ display: "none" }}
            >
              <div className="inner">
                <div className="image-holder">
                  <img src="images/form-wizard-2.jpg" />
                </div>
                <div className="form-content">
                  <div className="form-header">
                    <h3>Registration</h3>
                  </div>
                  <p>Please fill with additional info</p>
                  <div className="form-row">
                    <div className="form-holder w-100">
                      <input
                        type="text"
                        placeholder="Address"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-holder">
                      <input
                        type="text"
                        placeholder="City"
                        className="form-control"
                      />
                    </div>
                    <div className="form-holder">
                      <input
                        type="text"
                        placeholder="Zip Code"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="select">
                      <div className="form-holder">
                        <div className="select-control">Your country</div>
                        <i className="zmdi zmdi-caret-down" />
                      </div>
                      <ul className="dropdown" style={{ display: "none" }}>
                        <li rel="United States">United States</li>
                        <li rel="United Kingdom">United Kingdom</li>
                        <li rel="Viet Nam">Viet Nam</li>
                      </ul>
                    </div>
                    <div className="form-holder" />
                  </div>
                </div>
              </div>
            </section>
            <h2 id="wizard-h-2" tabIndex={-1} className="title" />
            <section
              id="wizard-p-2"
              role="tabpanel"
              aria-labelledby="wizard-h-2"
              className="body"
              aria-hidden="true"
              style={{ display: "none" }}
            >
              <div className="inner">
                <div className="image-holder">
                  <img src="images/form-wizard-3.jpg" />
                </div>
                <div className="form-content">
                  <div className="form-header">
                    <h3>Registration</h3>
                  </div>
                  <p>Send an optional message</p>
                  <div className="form-row">
                    <div className="form-holder w-100">
                      <textarea
                        placeholder="Your messagere here!"
                        className="form-control"
                        style={{ height: 99 }}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="checkbox-circle mt-24">
                    <label>
                      <input type="checkbox" defaultChecked /> Please accept{" "}
                      <a href="#">terms and conditions ?</a>
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="actions clearfix">
            <ul role="menu" aria-label="Pagination">
              <li aria-hidden="false" aria-disabled="false" style={{}}>
                <a href="#next" role="menuitem">
                  Submit
                </a>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </>
  );
};

export default BookEdit;
