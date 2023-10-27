import React, { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { auth, db } from "../../firebase";
import { ref, set, get, child, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import "./HostelUI.css";

export default function HostelDetails() {
  const [data, setData] = useState({
    name: "",
    address: "",
    facilities: "",
    contact: "",
    method: "",
    menu: "",
    time: "",
  });
  const navigate = useHistory();
  const { id } = useParams();
  // console.log(id)

  // const [hostelEdit,setHostelEdit]=useState({id:'',name:'',username:'',email:''})

  let name, value;
  function getRestrauntData(event) {
    name = event.target.name;
    value = event.target.value;

    setData({ ...data, [name]: value });
  }

  function editData(event) {
    event.preventDefault();
    let user = {
      name: rname.current.value,
      address: location.current.value,
      method: service.current.value,
      contact: reach.current.value,
      menu: menu.current.value,
      time: waqt.current.value,
    };
    axios
      .put(
        "https://askcui-985f2-default-rtdb.firebaseio.com/foodList/" +
          id +
          ".json",
        user
      )
      .then((res) => {
        alert("Restraunt updated Successfully!");
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
        get(child(dbref, `foodList/${id}`)).then((snapshot) => {
          console.log(snapshot.val());
          let data = snapshot.val();
          setData(data);
        });
      }
    });
  }, []);

  let rname = useRef();
  let location = useRef();
  let service = useRef();
  let reach = useRef();
  let menu = useRef();
  let waqt = useRef();

  return (
    <>
      <div className="container p-3 ">
        <div className="card ">
          <form className=" align-self-center" method="PUT">
            <h1 className="text-center">Update Restraunt</h1>
            <div className="mt-5 ">
              <div className="form-group ">
                <label htmlFor="name">Restraunt Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  autoComplete="off"
                  defaultValue={data.name}
                  onChange={getRestrauntData}
                  ref={rname}
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
                  defaultValue={data.address}
                  autoComplete="off"
                  onChange={getRestrauntData}
                  ref={location}
                  required
                />
              </div>
            </div>
            <div className="form-group  mt-3">
              <label htmlFor="contact">Contact #</label>
              <input
                type="text"
                className="form-control"
                id="contact"
                name="contact"
                autoComplete="off"
                defaultValue={data.contact}
                onChange={getRestrauntData}
                ref={reach}
                required
              />
            </div>
            <div className="form-group  mt-3">
              <label htmlFor="service">Means of Service</label>
              <input
                type="text"
                className="form-control"
                id="service"
                name="service"
                defaultValue={data.method}
                autoComplete="off"
                onChange={getRestrauntData}
                ref={service}
                required
              />
            </div>

            <div className=" mt-3">
              <div className="form-group ">
                <label htmlFor="time">Timings</label>
                <input
                  type="text"
                  className="form-control"
                  id="time"
                  name="time"
                  autoComplete="off"
                  defaultValue={data.time}
                  onChange={getRestrauntData}
                  ref={waqt}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="menu">Menu</label>
                <textarea
                  rows={6}
                  type="text"
                  className="form-control"
                  id="menu"
                  name="menu"
                  autoComplete="off"
                  defaultValue={data.menu}
                  onChange={getRestrauntData}
                  ref={menu}
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
                onClick={() => navigate.push("/UI")}
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
