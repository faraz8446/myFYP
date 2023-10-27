import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";
import { auth, db } from "../../firebase";
import { ref, set } from "firebase/database";
import axios from "axios";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

export default function SignUp() {
  const navigate = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAdress] = useState("");
  const [contact, setContact] = useState("");
  const [method, setMethod] = useState("");
  const [menu, setMenu] = useState("");
  const [time, setTime] = useState("");

  function register() {
    createUserWithEmailAndPassword(auth, email, password).then((resp) => {
      let user = {
        email: resp.user.email,
        password: password,
        name: name,
        address: address,
        contact: contact,
        method: method,
        menu: menu,
        time: time,
      };
      // axios.post('https://askcui-985f2-default-rtdb.firebaseio.com/hostelList/'+user.uid+'.json',user)
      // .then((res)=>{
      //   console.log(res.data)
      //   alert("Hostel Client Created Successfully!")
      //   navigate.push('/UI')
      // })

      set(ref(db, "foodList/" + resp.user.uid), user).then((res) => {
        console.log(res);
        alert("Food Client Created Successfully!");
        navigate.push("/UI");
      });
    });
  }

  return (
    <>
      {/* <h1 className="text-center my-3"></h1> */}
      <div className="container  d-flex">
        <div
          className="card"
          style={{ marginLeft: "110px", marginTop: "50px" }}
        >
          <h5 className="header-text text-center fw-bolder mb-5">
            Register Your Restraunt With Us
          </h5>
          <div className="row">
            <div className="col-md-4">
              <div className="justify-content-center align-items-center d-flex">
                <img
                  style={{ marginRight: "30px", marginTop: "70px" }}
                  src="./chef.png"
                  alt=""
                  width="400px"
                  height="400px"
                />
              </div>
            </div>
            <div className="col-md-6 mx-5">
              <form>
                <div className="row ">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="email"
                      name="email"
                      onChange={(event) => setEmail(event.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="password" className=" form-label ">
                      Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      id="password"
                      name="password"
                      onChange={(event) => setPassword(event.target.value)}
                    />
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-6">
                    <label htmlFor="name" className=" form-label ">
                      Restraunt Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="name"
                      name="name"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="address" className=" form-label ">
                      Address
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="address"
                      name="address"
                      onChange={(event) => setAdress(event.target.value)}
                    />
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-6">
                    <label htmlFor="contact" className=" form-label ">
                      Contact #
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      id="contact"
                      name="contact"
                      onChange={(event) => setContact(event.target.value)}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="method" className=" form-label ">
                      Means of Service
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="method"
                      name="method"
                      onChange={(event) => setMethod(event.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <label htmlFor="time" className=" form-label ">
                      Timings
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="time"
                      name="time"
                      onChange={(event) => setTime(event.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="menu" className=" form-label ">
                      Menu
                    </label>
                    <textarea
                      rows={6}
                      className="form-control"
                      type="text"
                      id="menu"
                      name="menu"
                      onChange={(event) => setMenu(event.target.value)}
                    />
                  </div>
                </div>
              </form>

              <div className="d-flex flex-row justify-content-center align-items-center">
                {/* <button class="text-light mt-5 sign-in-button" onClick={signIn}>Login</button> */}
                <button
                  className="mx-3 mt-5  sign-up-button"
                  onClick={register}
                >
                  {" "}
                  Register
                </button>
                <button
                  className="btn button-size mt-5"
                  onClick={() => navigate.goBack()}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
