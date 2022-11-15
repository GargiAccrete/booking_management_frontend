import React from "react";
import "../Assets/login.css";
import dining from "../Assets/image/dining.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const header = {
    "Access-Control-Allow-Origin": "*",
    "Content-type": "application/json",
  };
  const history = useNavigate();

  const handleSubmit=(e) =>{
    console.log("click")
    e.preventDefault();
    var data = {
        'name': name,
        'contact': contact,
        
      }
      const options = {
        url: 'http://localhost:3002/login',
        method: "POST",
        data: data,
        header: header,
      }
    axios(options).then((response) => {
    console.log("successfully login",response)
      }).catch(e =>{
        console.log(e)
      })
   history("/")
}

  return (
    <div>
      <div id="content-wrapper" class="d-flex flex-column"></div>
      <div id="content">
        <div class="container-fluid">
          <div class="container" style={{ height: "500px" }}>
            <section
              class=" text-center text-lg-start"
              style={{ paddingLeft: "230px" }}
            >
              <div class="card mb-3">
                <div
                  class=" g-0 d-flex align-items-left"
                  style={{ marginTop: "50px" }}
                >
                  <div class="col-lg-4 d-none d-lg-flex">
                    <img
                      src={dining}
                      alt="Trendy Pants and Shoes"
                      class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                    />
                  </div>
                  <div class="col-lg-8">
                    <div class="card-body py-5 px-md-5">
                      <h1>Login Page</h1>
                      <form onSubmit={handleSubmit}>
                        <div class="form-outline mb-4">
                          <input
                            type="text"
                            id="form2Example1"
                            class="form-control"
                            value={name}
                            name="name"
                            onChange={(e)=>setName(e.target.value)}
                          />
                          <label
                            class="form-label"
                            for="form2Example1">
                            UserName:
                          </label>
                        </div>

                        <div class="form-outline mb-4">
                          <input
                            type="phone_no"
                            id="form2Example2"
                            class="form-control"
                            value={contact}
                            name="contact"
                            onChange={(e)=>setContact(e.target.value)}/>
                          <label
                            class="form-label"
                            for="form2Example2"
                          >
                            Phone Number:
                          </label>
                        </div>
                        <div>
                          <label>Remember me</label>
                          <input
                            type="checkbox"
                            checked
                            style={{ height: "20px" }}
                          ></input>
                        </div>
                        <button
                          type="submit"
                          class="btn btn-primary btn-block mb-4"
                        >
                          Sign in
                        </button>
                      </form>
                      <Footer />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
