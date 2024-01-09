import React, { FC, ReactElement, useEffect, useState } from "react";
import Input from "../component/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
type LoginProp = {};
const Login: FC<LoginProp> = (): ReactElement => {
  const { t } = useTranslation();
  const Navigate = useNavigate();
  const [message, setMessage] = useState("");
  const usernamRef = React.useRef<any>();
  const passwordRef = React.useRef<any>();
  const dispatch = useDispatch();

  const formSubmitHander = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernamRef.current?.value;
    const password = passwordRef.current?.value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        localStorage.setItem("userInfo", JSON.stringify(userCredential.user));
        console.log("dada");
        Navigate("/home");
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };
  useEffect(() => {
    usernamRef.current?.focus();
  }, []);

  return (
    <>
      <div className="container h-100 " style={{ height: "100%" }}>
        <div className="row justify-content-center h-100 align-items-center justify-content-center">
          <div className="col-sm-8 col-lg-5">
            <div className="card bg-primary">
              <div className="card-header text-white">
                <h4 className="card-title mb-0">
                  <i className="bi-grid-3x3-gap-fill" /> {t("loginSistem")}
                </h4>
              </div>
              <div className="card-body bg-white rounded-bottom">
                <p className="text-center text-danger">{message}</p>
                <form onSubmit={formSubmitHander}>
                  <Input
                    inputRef={usernamRef}
                    id="txtUsername"
                    label={t("username")}
                    type="text"
                    autoComplete="off"
                    placeholder={t("etUserName")}
                  />
                  <Input
                    inputRef={passwordRef}
                    id="txtPassword"
                    label={t("password")}
                    type="password"
                    placeholder={t("etPassword")}
                  />

                  <div className="row">
                    <div className="offset-sm-3 col-auto">
                      <button type="submit" className="btn btn-primary">
                        {t("signIn")}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
export let issign = false;
