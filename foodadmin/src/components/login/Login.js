import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import { auth } from "../../firebase";
// import eat from '../../../public/'
// import {homeDetail} from '../Blogs/home/Home';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const Login = () => {
  const navigate = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => navigate.push("/UI"))
      .catch((error) => console.log(error));
  };

  const register = () => {
    navigate.push("/register");
  };

  return (
    <div className="container alignment d-flex">
      <div className="card">
        <div>
          <h5 className="header-text  text-center fw-bolder">
            Login To Food Portal askCUI
          </h5>
        </div>
        <div className="row">
          <div className="col-md-6">
            <img
              src="./eat.png"
              alt="eat"
              width="350px"
              height="350px"
              style={{ marginright: "30px" }}
            />
          </div>
          <div className="col-md-6">
            <div className="mx-5">
              <div>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  className="form-control w-100"
                  type="text"
                  id="email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className=" form-label ">
                  Password
                </label>
                <input
                  className="form-control w-100"
                  type="password"
                  id="password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="d-flex flex-row justify-content-center align-items-center">
                <button
                  className="text-light mt-5 sign-in-button"
                  onClick={signIn}
                >
                  Login
                </button>
                <button
                  className="mx-3 mt-5  sign-up-button"
                  onClick={register}
                >
                  {" "}
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
