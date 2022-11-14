import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Assets/Add_booking.css";
import Demo2 from "../services/Demo2";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { styled } from "@mui/material/styles";

import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Card,
  TextField,
  FormLabel,
  MenuItem,
  Grid,
  Button,
  Typography,
} from "@mui/material";

const header = {
  "Access-Control-Allow-Origin": "*",
  "Content-type": "application/json",
};

// const StyledTextField = styled(TextField)(() => ({
//   marginTop: "3px",
//   ".MuiOutlinedInput-root": {
//       borderRadius: "10px",
//       height: "33px",
//       paddingTop: "0px",

//   },
//   ".MuiOutlinedInput-input": {
//       fontSize: "13px",
//   },
// }));
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
  const history = useNavigate();

  let getonChange = (event) => {
    console.log(event.target.value);
    setaddtask({ ...addtask, [event.target.name]: event.target.value });
    console.log(addtask);
  };
  let handleSubmit = (e) => {
    // alert("hiii");
    // Demo2.AddData("Products", addtask).then(() => {
    //   console.log("data");
    // });
    console.log("click");
    e.preventDefault();
    var data = {
      business_type: addtask.business_type,
      legal_name: addtask.legal_name,
      brand_associate: addtask.brand_associate,
      address_line_1: addtask.address_line_1,
      address_line_2: addtask.address_line_2,
      city: addtask.city,
      state: addtask.state,
      pincode: addtask.pincode,
      business_area: addtask.business_area,
      contact_no: addtask.contact_no,
    };
    const options = {
      url: "http://localhost:3000/insert",
      method: "POST",
      data: data,
      header: header,
    };
    axios(options)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
    history("/");
  };

  let passData = () => {
    alert("hiii");
    Demo2.AddData("Products", addtask).then(() => {
      console.log("data");
    });
    // Demo.AddData('Products').then((result)=>{
    //   console.log("data added")
    //  })
    // setaddtask('')
  };

  return (
    <div>
      <div>
        <Navbar />
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
                defaultValue="Ltd"
                name="business_type"
                value={addtask.business_type}
                fullWidth
                select
              >
                <MenuItem key="1" value="1">
                  Ltd
                </MenuItem>
                <MenuItem key="2" value="2">
                  Pvt
                </MenuItem>
                <MenuItem key="3" value="3">
                  Llp
                </MenuItem>
              </StyledTextField>
            </Grid>
          </div>
          <div class="col">
            <StyledFormLabel htmlFor="country">
              {" "}
              Brand Associate{" "}
            </StyledFormLabel>
            <div style={{ display: "flex" }}>
              <input
                type="radio"
                id="male"
                name="optradio"
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
                type="radio"
                id="female"
                name="optradio"
                value="No"
                style={{ width: "20px" }}
              />
                <label for="female">No</label>
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
              onChange={getonChange}
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
              Busineess Area:{" "}
            </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="business_area"
              value={addtask.business_area}
              name="business_area"
              onChange={getonChange}
              required
            />
          </div>
          <div class="col">
            <StyledFormLabel htmlFor="country"> Contact No: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="contact_no"
              value={addtask.contact_no}
              name="	contact_no"
              onChange={getonChange}
              required
            />
          </div>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
