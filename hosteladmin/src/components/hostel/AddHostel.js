import React from 'react'
import { useState,useRef } from 'react'
import './HostelUI.css'
import {useHistory} from 'react-router-dom'
import {storage} from '../../firebase'
import {db} from '../../firebase'
import {ref,uploadBytes,getDownloadURL} from 'firebase/storage'
import {ref as ref2,set} from 'firebase/database'
import axios from 'axios'


export default function AddHostel() {

  const navigate=useHistory();


  const [imgUpload,setImgUpload]=useState()
  const [imgUrl,setImgUrl]=useState()
    const [hostel,setHostel]=useState({
        name:"",
        address:"",
        facilities:"",
        contact:"",
        seats:"",
        rent:"",
       
    })

    function uploadImage(){
      const imageRef= ref(storage, "images/"+imgUpload.name)
        uploadBytes(imageRef,imgUpload).then((snapshot)=>{
          getDownloadURL(imageRef).then((url)=>{
            setImgUrl(url)
            set(ref2(db,'pictures'),{
              pic:url
            })
              
          }).catch((error=>{
            console.log(error.message)
          }))
          alert('image uploaded')
        })
    }

    let name,value
   function getHostelData(event){
        name=event.target.name;
        value=event.target.value;

        setHostel({...hostel,[name]:value})
    };

    function postData(event){
      event.preventDefault();
        let user={
          name: hname.current.value,
          address: location.current.value,
          facilities: facility.current.value,
          contact: reach.current.value,
          seats: availableSeats.current.value,
          rent: fees.current.value,
          // img: tasveer.current.value

        }
        

        const {name,address,facilities,contact,seats,rent}=hostel

        if(name && address && facilities && contact && seats && rent ){
            axios.post('https://askcui-985f2-default-rtdb.firebaseio.com/hostelList.json',user)
            .then((res)=>{
              console.log(res.data)
              alert("Hostel added Successfully!")
              uploadImage()
              // navigate.goBack()
            })
          
        }
        else{
            alert("Please fill all the fields")
        }

                
    }

    let hname=useRef()
    let location=useRef()
    let facility=useRef()
    let reach=useRef()
    let availableSeats=useRef()
    let fees=useRef()
    // let tasveer=useRef()


function handleChange(e){
if(e.target.files[0]){
  setImgUpload(e.target.files[0])
}
}

  return (

    <div className="container p-3 ">
    <div className="card ">
             <form className=' align-self-center' method='POST'>
                <h1 className='text-center'>Add Hostel</h1>
  <div className="mt-5 ">
    <div className="form-group ">
      <label htmlFor="name">Hostel Name</label>
      <input type="text" className="form-control" id="name" name="name"  autoComplete='off' value={hostel.name} onChange={getHostelData} ref={hname} required/>
    </div>
    <div className="form-group  mt-3">
      <label htmlFor="address">Address</label>
      <input type="text" className="form-control" id="address" name="address"  autoComplete='off'value={hostel.address} onChange={getHostelData} ref={location} required/>
    </div>
  </div>
  <div className="form-group  mt-3">
    <label htmlFor="facilities">Facilities</label>
    <input type="text" className="form-control" id="facilities" name="facilities"  autoComplete='off'value={hostel.facilities} onChange={getHostelData} ref={facility} required/>
  </div>
  <div className="form-group  mt-3">
    <label htmlFor="contact">Contact</label>
    <input type="text" className="form-control" id="contact" name="contact" autoComplete='off'value={hostel.contact} onChange={getHostelData} ref={reach} required/>
  </div>
  <div className=" mt-3">
    <div className="form-group ">
      <label htmlFor="seats">Seats</label>
      <input type="number" className="form-control" id="seats" name="seats" autoComplete='off'value={hostel.seats} onChange={getHostelData} ref={availableSeats} required/>
    </div>
    <div className="form-group mt-3">
      <label htmlFor="rent">Rent</label>
      <input type="number" className="form-control" id="rent" name="rent" autoComplete='off'value={hostel.rent} onChange={getHostelData} ref={fees} required/>
    </div>

    <div className="mt-3 row ">
  <label htmlFor="formFile" className="form-label">Upload Image</label>
  <input className="form-control" type="file" id="formFile" onChange={handleChange}  />
  {/* <button className='btn btn-outline-primary mt-3' onClick={uploadImage}>upload img</button> */}
</div>
{/* <img src={imgUrl} height="200px" width="300px" alt="" /> */}


  </div>
<div className='d-flex justify-content-center'>
<button type="submit" className="btn button-size mt-5 mx-5" onClick={postData}>Post</button>
<button className="btn button-size mt-5" onClick={()=>navigate.goBack()}>Go Back</button>
</div>
  
</form> 
</div>
</div>
   
  )
}
