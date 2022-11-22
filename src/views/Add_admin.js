import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Assets/Add_booking.css";
import AdminService from "../services/AdminService";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField,FormLabel,MenuItem,Grid} from "@mui/material";

const StyledTextField = styled(TextField)(() => ({
    marginTop: "3px",
    ".MuiOutlinedInput-root": {
      borderRadius: "10px",
      height: "33px",
      paddingTop: "0px",
    },
    ".MuiOutlinedInput-input": {
      fontSize: "13px",
    },
  }));
  
  const StyledFormLabel = styled(FormLabel)(() => ({
    display: "block",
    fontWeight: "500",
    color: "black",
    fontSize: "13px",
  }));
function Add_admin() {
    const [addadmin, setaddAdmin] = useState({});
    const history = useNavigate();
let getonChange = (event) => {
    // console.log(event.target.value);
    setaddAdmin({ ...addadmin, [event.target.name]: event.target.value });
    // console.log(addtask);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      name: addadmin.name,
      email: addadmin.email,
      password:addadmin.password,
      designation:addadmin.designation,
      is_super_admin: addadmin.is_super_admin,
    
    };
    AdminService.AddData("adminUser/insert", data).then(() => {
      toast("successfully inserted")
    });
    setTimeout(() => {
      history("/view_admin");
    }, 4000);
   
  };

  return (
    <div>
    <div>
     <Sidebar />
      <h4>
        Admin |<small>add admin</small>
      </h4>
    </div>
<form onSubmit={handleSubmit}>
      <div class="row">
        <div class="col">
          {/* <Grid item sx={{ m: 1 }} md={5.7} xs={12}> */}
          <StyledFormLabel htmlFor="country"> Name: </StyledFormLabel>
          <input
            type="text"
            class="form-control"
            placeholder="name"
            value={addadmin.name}
            name="name"
            onChange={getonChange}
            required
          />
          {/* </Grid> */}
        </div>
        <div class="col">
          <StyledFormLabel htmlFor="country" >
            {" "}
            Email :{" "}
          </StyledFormLabel>
          <input
            type="email"
            class="form-control"
            placeholder="email"
            value={addadmin.email}
            name="email"
            onChange={getonChange}
            required
           
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <StyledFormLabel htmlFor="country"> Designation: </StyledFormLabel>
          <input
            type="text"
            class="form-control"
            placeholder="designation"
            value={addadmin.designation}
            name="designation"
            onChange={getonChange}
            required
          />
        </div>

        <div class="col">
          <StyledFormLabel htmlFor="country"> Password : </StyledFormLabel>
          <input
            type="password"
            class="form-control"
            placeholder="password"
            value={addadmin.password}
            name="password"
            onChange={getonChange}
            required
          />
        </div>
      </div>
      <div class="row">
      <div class="col">
          <StyledFormLabel htmlFor="country"> Super Admin : </StyledFormLabel>
          <input
            type="text"
            class="form-control"
            placeholder="address_line_1"
            value={addadmin.is_super_admin}
            name="is_super_admin"
            onChange={getonChange}
            required
          />
      </div>
      <div class="col">
        </div>
      </div>
     

    
      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
    <ToastContainer/>
  </div>
  )
}

export default Add_admin