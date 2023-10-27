import React from "react";
import "./HostelUI.css";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { auth, db } from "../../firebase";
import { ref, set, get, child } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export default function HostelUI() {
  const navigate = useHistory();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (userdata) => {
      // console.log(userData)
      if (userdata) {
        // axios.get('https://askcui-985f2-default-rtdb.firebaseio.com/hostelList/'+userdata.uid+'.json')
        // .then((resp)=>{
        //   console.log(resp)
        //   return resp.data

        // })
        const dbref = ref(db);
        get(child(dbref, `hostelList/${userdata.uid}`)).then((snapshot) => {
          console.log(snapshot.val());
          let data = snapshot.val();
          // let userData=[]

          // for(let key in data){
          //     userData.push({...data[key], id:key,uid:userdata.uid})
          //   }

          setUsers(data);
        });
        // alert("login successful")
      } else {
        // alert("logout successful")
      }
    });
  }, []);

  function logOut() {
    auth.signOut();
    navigate.push("/");
  }

  return (
    <div className="p-5">
      <h2 className="text-center">
        <b>Your Hostel</b>
      </h2>
      <div className="d-flex justify-content-end margin-right">
        {/* <Link className='btn button-size ' to={'/addHostel'}>Add Hostel</Link> */}
        <button className="btn button-size mx-2" onClick={logOut}>
          Log Out
        </button>
      </div>

      <table className="table  container mt-5">
        <thead>
          <tr>
            {/* <th scope="col">#</th> */}

            <th scope="col">Hostel Name</th>
            <th scope="col">Location</th>
            <th scope="col">Contact</th>
            <th scope="col">Rent</th>
            <th scope="col">Seats</th>

            <th scope="col"> </th>
          </tr>
        </thead>

        <>
          <tbody>
            <tr>
              {/* <th>{index+1}</th> */}
              <td>{users.hostelname}</td>
              <td>{users.address}</td>
              <td>{users.contact}</td>
              <td>{users.rent}</td>
              <td>{users.seats}</td>
              <Link
                className="btn btn-outline-primary my-2"
                to={"/details/" + auth.currentUser.uid}
              >
                <i className="fa fa-edit"></i>
              </Link>
            </tr>
          </tbody>
        </>
      </table>
    </div>
  );
}
