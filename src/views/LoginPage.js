import React from 'react'
// import '../Assets/login.css'
// import dinning from '../Assets/image/dinning.jpg'
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function LoginPage() {
    const[name,setName]=useState('');
    const [contact,setContact]=useState('')
    const header={"Access-Control-Allow-Origin":"*", "Content-type": "application/json"}
    const history=useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data={
        "name":name,
        "contact":contact
        }
        const option={
            url:"",
            method:"post",
            data:data,
            header:header
        }
        axios.Axios(option).then((result)=>{
console.log("successfully added",result)
        }).catch((e)=>{
            console.log("error",e)
        })
        history('/view_booking')
       
    }
   
  return (
    <div>
      

    <div>
      <div id="content">
        <div class="container-fluid">
          <div class="container"style={{height:"500px"}}>
         
<section class=" text-center text-lg-start" style={{paddingLeft:"230px"}}>

  <div class="card mb-3">
    <div class=" g-0 d-flex align-items-left">
      {/* <div class="col-lg-4 d-none d-lg-flex">
        <img src={dinning} alt="Trendy Pants and Shoes"
          class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5" />
      </div> */}
      <div class="col-lg-8">
        <div class="card-body py-5 px-md-5">
        <form  onSubmit={handleSubmit}>

<div class="form-outline mb-4">
  <input type="email" id="form2Example1" class="form-control" />
  <label class="form-label" for="form2Example1"  name="name" onChange={(e)=>setName(e.target.value)}>UserName:</label>
</div>


<div class="form-outline mb-4">
  <input type="phone_no" id="form2Example2" class="form-control" />
  <label class="form-label" for="form2Example2" name="contact"  onChange={(e)=>setContact(e.target.value)}>Phone Number:</label>
 
</div>
<div >
    <label>Remember me</label>
    <input type ="checkbox" checked style={{height:"20px"}}></input>
</div>

{/* <div class="row mb-4" style ={{alignItems:"center"}}>

    
      <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
      <label class="form-check-label" for="form2Example31"> Remember me </label>

  
  </div> */}


<button type="button" class="btn btn-primary btn-block mb-4">Sign in</button>

</form>

          

        </div>
      </div>
    </div>
  </div>
</section>

          </div>
        </div>
      </div>
    </div>


    </div>
  )
}

export default LoginPage
