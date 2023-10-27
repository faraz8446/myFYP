import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { auth, db } from "../../firebase";
import { ref, set, get, child, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import "./HostelUI.css";

export default function HostelDetails() {
  const [data, setData] = useState({
    hostelname: "",
    address: "",
    facilities: "",
    contact: "",
    seats: "",
    rent: "",
    uid: "",
  });
  const navigate = useHistory();
  const { id } = useParams();
  // console.log(id)

  // const [hostelEdit,setHostelEdit]=useState({id:'',name:'',username:'',email:''})

  let name, value;
  function getHostelData(event) {
    name = event.target.name;
    value = event.target.value;

    setData({ ...data, [name]: value });
  }

  function editData(event) {
    event.preventDefault();
    let user = {
      hostelname: hname.current.value,
      address: location.current.value,
      facilities: facility.current.value,
      contact: reach.current.value,
      seats: availableSeats.current.value,
      rent: fees.current.value,
    };
    axios
      .put(
        "https://askcui-985f2-default-rtdb.firebaseio.com/hostelList/" +
          id +
          ".json",
        user
      )
      .then((res) => {
        alert("Hostel updated Successfully!");
        navigate.goBack();
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (userdata) => {
      if (userdata) {
        // axios.get('https://askcui-985f2-default-rtdb.firebaseio.com/hostelList/'+userdata.uid+'/users/'+id+'.json')
        // .then((resp)=>{
        //   return resp.data
        const dbref = ref(db);
        get(child(dbref, `hostelList/${id}`)).then((snapshot) => {
          console.log(snapshot.val());
          let data = snapshot.val();
          setData(data);
        });
      }
    });
  }, []);

  let hname = useRef();
  let location = useRef();
  let facility = useRef();
  let reach = useRef();
  let availableSeats = useRef();
  let fees = useRef();

  return (
    <>
      <div className="container p-3 ">
        <div className="card ">
          <form className=" align-self-center" method="PUT">
            <h1 className="text-center">Update Hostel</h1>
            <div className="mt-5 ">
              <div className="form-group ">
                <label htmlFor="name">Hostel Name</label>
                <input
                  type="email"
                  className="form-control"
                  id="name"
                  autoComplete="off"
                  defaultValue={data.hostelname}
                  onChange={getHostelData}
                  ref={hname}
                  required
                />
              </div>

              <div className="form-group  mt-3">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={data.address}
                  autoComplete="off"
                  onChange={getHostelData}
                  ref={location}
                  required
                />
              </div>
            </div>
            <div className="form-group  mt-3">
              <label htmlFor="facilities">Facilities</label>
              <input
                type="text"
                className="form-control"
                id="facilities"
                name="facilities"
                value={data.facilities}
                autoComplete="off"
                onChange={getHostelData}
                ref={facility}
                required
              />
            </div>
            <div className="form-group  mt-3">
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                className="form-control"
                id="contact"
                name="contact"
                autoComplete="off"
                value={data.contact}
                onChange={getHostelData}
                ref={reach}
                required
              />
            </div>
            <div className=" mt-3">
              <div className="form-group ">
                <label htmlFor="seats">Seats</label>
                <input
                  type="number"
                  className="form-control"
                  id="seats"
                  name="seats"
                  autoComplete="off"
                  value={data.seats}
                  onChange={getHostelData}
                  ref={availableSeats}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="rent">Rent</label>
                <input
                  type="number"
                  className="form-control"
                  id="rent"
                  name="rent"
                  autoComplete="off"
                  value={data.rent}
                  onChange={getHostelData}
                  ref={fees}
                  required
                />
              </div>

              {/* <div className="mt-3 row">
  <label for="formFile" class="form-label">Upload Image</label>
  <input class="form-control" type="file" id="formFile" onChange={(event)=>{setImgUpload(event.target.files[0])}}/>
  <button className='btn btn-outline-primary mt-3'>upload img</button>
</div> */}
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn button-size mt-5 mx-5"
                onClick={editData}
              >
                Update
              </button>
              <button
                className="btn button-size mt-5"
                onClick={() => navigate.goBack()}
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
