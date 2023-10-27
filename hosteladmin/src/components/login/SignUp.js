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
  const [hostelname, setHostelName] = useState("");
  const [address, setAdress] = useState("");
  const [contact, setContact] = useState("");
  const options = [
    "Wifi only",
    "Wifi + AC",
    "Wifi + AC + Hot Water",
    "Wifi + AC + Hot Water + Food Mess",
    "Wifi + AC + Hot Water + Food Mess + Laundry",
  ];
  const [facilities, setFacilities] = useState(options[0]);
  const [seats, setSeats] = useState("");
  const [rent, setRent] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  function register() {
    createUserWithEmailAndPassword(auth, email, password).then((resp) => {
      let user = {
        email: resp.user.email,
        password: password,
        fname: fname,
        lname: lname,
        hostelname: hostelname,
        address: address,
        contact: contact,
        facilities: facilities,
        seats: seats,
        rent: rent,
      };
      // axios.post('https://askcui-985f2-default-rtdb.firebaseio.com/hostelList/'+user.uid+'.json',user)
      // .then((res)=>{
      //   console.log(res.data)
      //   alert("Hostel Client Created Successfully!")
      //   navigate.push('/UI')
      // })

      set(ref(db, "hostelList/" + resp.user.uid), user).then((res) => {
        console.log(res);
        alert("Hostel Client Created Successfully!");
        navigate.push("/UI");
      });
    });
  }
  console.log(facilities);
  // function DropdownForm() {
  //   // const [facilities, setFacilities] = useState("Wifi only");
  //   console.log(facilities);
  // }
  // const handleAddrTypeChange=(e)=> {
  //   // setFacilities(e.target.value);
  //   facilities[e.target.value];

  return (
    <div className="container alignment d-flex">
      <div className="card">
        <div>
          <h5 className="header-text my-3 text-center fw-bolder">
            Register To askCUI
          </h5>
        </div>
        <form>
          <div className="row ">
            <div className="col-md-6">
              <label htmlFor="fname" className="form-label">
                First Name
              </label>
              <input
                className="form-control"
                type="text"
                id="fname"
                name="fname"
                onChange={(event) => setFname(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="lname" className=" form-label ">
                Last Name
              </label>
              <input
                className="form-control"
                type="text"
                id="lname"
                name="lname"
                onChange={(event) => setLname(event.target.value)}
              />
            </div>
          </div>
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
                Hostel Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                onChange={(event) => setHostelName(event.target.value)}
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
              <label htmlFor="facilities" className=" form-label ">
                Facilities
              </label>
              <select
                value={facilities}
                onChange={(e) => setFacilities(e.target.value)}
                class="form-select"
                aria-label="Default select example"
              >
                <option facilities>Select Facilities</option>
                {options.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
                {/* <option
                  value={facilities}
                  onChange={(e) => setFacilities(e.target.value)}
                >
                  Wifi + AC
                </option>
                <option
                  value={facilities}
                  onChange={(e) => setFacilities(e.target.value)}
                >
                  Wifi + AC + Hot Water
                </option>
                <option
                  value={facilities}
                  onChange={(e) => setFacilities(e.target.value)}
                >
                  Wifi + AC + Hot Water + Food Mess
                </option>
                <option
                  value={facilities}
                  onChange={(e) => setFacilities(e.target.value)}
                >
                  Wifi + AC + Hot Water + Food Mess + Laundry
                </option> */}
              </select>
              {/* <input
                className="form-control"
                type="text"
                id="facilities"
                name="facilities"
                defaultValue={facilities}
                // onChange={(event) => setFacilities(event.target.value)}
              /> */}
            </div>
          </div>

          <div className="row ">
            <div className="col-md-6">
              <label htmlFor="seats" className=" form-label ">
                Seats
              </label>
              <input
                className="form-control"
                type="text"
                id="seats"
                name="seats"
                onChange={(event) => setSeats(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="rent" className=" form-label ">
                Rent
              </label>
              <input
                className="form-control"
                type="number"
                id="rent"
                name="rent"
                onChange={(event) => setRent(event.target.value)}
              />
            </div>
          </div>
        </form>

        <div className="d-flex flex-row justify-content-center align-items-center">
          {/* <button class="text-light mt-5 sign-in-button" onClick={signIn}>Login</button> */}
          <button className="mx-3 mt-5  sign-up-button" onClick={register}>
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
  );
}
