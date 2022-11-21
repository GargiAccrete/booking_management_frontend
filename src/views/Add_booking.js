import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Assets/Add_booking.css";
import Demo2 from "../services/Demo2";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField,FormLabel,MenuItem,Grid} from "@mui/material";

const header = {
  "Access-Control-Allow-Origin": "*",
  "Content-type": "application/json",
};

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

export default function Add_booking() {
  const [addtask, setaddtask] = useState({});
  const [brand, setBrand] = useState("");
  const history = useNavigate();

  const houses = [
    {value: '1',    text: 'ParathaHouse'   },
    {value: '2', text: 'BiryaniHouse'},
    {value: '3',   text: 'Snacks'  },
    {value: '4',   text: 'VadapavFactory'  }
];

  let getonChange = (event) => {
    // console.log(event.target.value);
    setaddtask({ ...addtask, [event.target.name]: event.target.value });
    // console.log(addtask);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      business_type: addtask.business_type,
      legal_name: addtask.legal_name,
      business_area: brand||"pppp",
      brand_associate: addtask.optradio||"false",
      address_line_1: addtask.address_line_1,
      address_line_2: addtask.address_line_2,
      city: addtask.city,
      state: addtask.state,
      pincode: addtask.pincode,
      contact_no: addtask.contact_no,
    };
    Demo2.AddData("register/insert", data).then(() => {
      toast("successfully inserted")
    });
    setTimeout(() => {
      history("/view_booking");
    }, 4000);
   
  };

  let passData = () => {
    alert("hiii");
    Demo2.AddData("Products", addtask).then(() => {
    });
    // Demo.AddData('Products').then((result)=>{
    //   console.log("data added")
    //  })
    // setaddtask('')
  };

  return (
    <div>
      <div>
       <Sidebar />
        <h4>
          Booking |<small>add booking</small>
        </h4>
      </div>
 <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="col">
            <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
              <StyledFormLabel htmlFor="country">
                Busineess Type :
              </StyledFormLabel>
              <StyledTextField
                placeholder="select"
                name="business_type"
                value={addtask.business_type}
                onChange={getonChange}
                fullWidth
                select
              >
                <MenuItem key="Ltd" value="1">
                  Ltd
                </MenuItem>
                <MenuItem key="Pvt" value="2">
                  Pvt
                </MenuItem>
                <MenuItem key="Llp" value="3">
                  Llp
                </MenuItem>
              </StyledTextField>
            </Grid>
          </div>
          <div class="col" style={{display:"flex"}}>
            <StyledFormLabel htmlFor="country" style={{margin:"33px"}}>
              {" "}
              Brand Associate :{" "}
            </StyledFormLabel>
            <div style={{ display: "flex" }}>
            <input name="optradio" type="hidden" value="false"/>
            <input name="optradio" type="checkbox" value="true"    onChange={getonChange}/>
              {/* <input
                type="checkbox"
                id="yes"
                name="optradio"
                onChange={getonChange}
                value="yes"
                style={{ width: "20px" }}
              />
               {" "}
              <label
                for="html"
                style={{ marginLeft: "20px", marginRight: "100px" }}
              >
                Yes
              </label>
               {" "}
              <input
                type="checkbox"
                id="no"
                name="optradio"
                value="No"
                onChange={getonChange}
                style={{ width: "20px" }}
              />
                <label for="No">No</label> */}
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <StyledFormLabel htmlFor="country"> Legal Name: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="legal_name"
              value={addtask.legal_name}
              name="legal_name"
              onChange={getonChange}
              required
            />
          </div>

          <div class="col">
            <StyledFormLabel htmlFor="country"> Address1 : </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="address_line_1"
              value={addtask.address_line_1}
              name="address_line_1"
              onChange={getonChange}
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <StyledFormLabel htmlFor="country"> Address2: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="address_line_2"
              value={addtask.address_line_2}
              name="address_line_2"
             required
            />
          </div>
          <div class="col">
            <StyledFormLabel htmlFor="country"> City : </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="city"
              value={addtask.city}
              name="city"
              onChange={getonChange}
              required
            />
          </div>
           
        </div>
        <div class="row">
          <div class="col">
            <StyledFormLabel htmlFor="country"> State </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="state"
              value={addtask.state}
              name="state"
              onChange={getonChange}
              required
            />
          </div>
         
          <div class="col">
            <StyledFormLabel htmlFor="country"> PinCode: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="pincode"
              value={addtask.pincode}
              name="pincode"
              onChange={getonChange}
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
          <StyledFormLabel htmlFor="country">
              {" "}
              Brand Area:{" "}
            </StyledFormLabel>
            <select onChange={(event) => setBrand(event.target.value)}  value={brand}>
              <option>---------Select Menu-------</option>
                {houses.map(item => {
                   return (<option key={item.value} value={item.value}>{item.text}</option>);
                })}
          </select>
          </div>
        
            <div class="col">
            <StyledFormLabel htmlFor="country"> Contact No: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="contact_no"
              value={addtask.contact_no}
              name="contact_no"
              onChange={getonChange}
              required
            />
          </div>
      
</div>
      
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <ToastContainer/>
    </div>
  );
}
