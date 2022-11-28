import React from "react";
import "../Assets/login.css";
import dining from "../Assets/image/dining.jpg";
import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import Demo2 from "../services/Demo2";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const header = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
  };
  let Navigate = useNavigate();

  const handleSubmit=(e) =>{
    console.log("inside")
   e.preventDefault();
    var data = {
        'email': email,
        'password': password,
      }
    Demo2.login('loginUser/login',data).then((res) => {
    console.log("hiiiiiii")
      // window.open("/view_booking")
      setTimeout(()=>{
        Navigate("/view_booking")
      },2000)
      // return Navigate(from, { replace: true })
      }).catch(e =>{
        console.log(e)
      })

 
    
}

  return (
    <div>
      <div id="content-wrapper" class="d-flex flex-column" style={{backgroundColor:"rgb(255 247 237)"}}>
      <div id="content">
        <div class="container-fluid">
          <div class="container" style={{ height: "500px" }}>
            <section
              class="  text-lg-start"
              style={{display:"flex"}}
             >
           <div class="col-lg-8 d-none d-lg-flex"  style={{height:"100vh"}}>
                    <img
                      src={dining}
                      alt="Trendy Pants and Shoes"
                      class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                    />
                  </div>
                  <div class="col-lg-8">
                    <div class="card-body py-5 px-md-5" style={{marginRight:"199px"}}>
                      <h1>Login </h1>
                      <form onSubmit={handleSubmit}>
                        <div class="form-outline mb-4">
                        <label
                            class="form-label"
                            for="form2Example1">
                          Email:
                          </label>
                          <input
                            type="text"
                            id="form2Example1"
                            class="form-control"
                            value={email}
                            name="email"
                            onChange={(e)=>setEmail(e.target.value)}
                          />
                           </div>

                        <div class="form-outline mb-4">
                        <label
                            class="form-label"
                            for="form2Example2"
                          >
                            Password:
                          </label>
                          <input
                            type="password"
                            id="form2Example2"
                            class="form-control"
                            value={password}
                            name="password"
                            onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <button
                          type="submit"
                          class="btn btn-primary btn-block mb-4"
                        >
                          Sign in
                       
                        </button>
                        {/* {localStorage.getItem('name') && (
                          <div>
                            Name: <p>{localStorage.getItem('name')}</p>
                          </div>
                        )}
                        {localStorage.getItem('contact') && (
                          <div>
                            ContactSS: <p>{localStorage.getItem('contact')}</p>
                          </div>
                        )} */}
                      </form>
                      <Footer />
                    </div>
                  </div>
               </section>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
