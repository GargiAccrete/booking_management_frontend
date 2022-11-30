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
import { FormLabel, Grid } from "@mui/material";
import { Select, MenuItem, FormHelperText, FormControl, InputLabel } from '@material-ui/core';
// import Autocomplete from 'react-autocomplete'
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";


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
  marginLeft: "-475px"
}));
function Add_admin() {
  const [addadmin, setaddAdmin] = useState({});
  const [designation, setDesignation] = useState({})
  const [selected, setSelected] = useState('');
  const [value, setValue] = useState('');
  const selectionChangeHandler = (event) => {
    setSelected(event.target.value);
  };

  const Managerdata = [
    { id: '1', label: 'Manager ' },
    { id: '2', label: 'sales Manager' },
    // {value: '3',   text: 'Manager2'  },

  ];
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
      password: addadmin.password,
      designation: value.id,
      is_super_admin: addadmin.optradio || '0',

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
            <StyledFormLabel htmlFor="country" style={{ fontSize: "13px", color: "black" }}> Name: </StyledFormLabel>
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
            <StyledFormLabel htmlFor="country" style={{ fontSize: "13px", color: "black" }} >
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
            <StyledFormLabel htmlFor="country" style={{ fontSize: "13px", color: "black",marginLeft:"-440px" }}>
              {" "}
              Designation :{" "}
            </StyledFormLabel>
            <Autocomplete
              //  sx={{
              //   width: 530}}
              // sx={{height: 15}}
              options={Managerdata}
              value={value}
              onChange={(e, newValue) => {
                setValue(newValue)
              }}

              renderInput={(params) => <TextField {...params} size="small" />}
            />

          </div>
          {/* <div class="col">
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-449px" }}> Designation: </StyledFormLabel>
            <select onChange={(event) => setDesignation(event.target.value)} value={designation} style={{ width: "535px" }}>
              <option>---------Select Menu-------</option>
              {Managerdata.map(item => {
                return (<option key={item.value} value={item.value}>{item.text}</option>);
              })}
            </select>
          </div> */}

          <div class="col">
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-449px", fontSize: "13px", color: "black" }}> Password : </StyledFormLabel>
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
          <div class="col" style={{ display: "flex" }}>
            <StyledFormLabel htmlFor="country" style={{ margin: "33px", marginLeft: "3px", fontSize: "13px", color: "black" }}>
              {" "}
              Is Super Admin? yes/no :{" "}
            </StyledFormLabel>
            <div style={{ display: "flex" }}>
              <input name="optradio" type="hidden" value="0" />
              <input name="optradio" type="checkbox" value="1" onChange={getonChange} />
            </div>
          </div>
          <div class="col">
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Add_admin

{/* <Autocomplete
            //  items={Managerdata.map(option => option.name_en + ` (${option.name_native})`)}
              items={Managerdata}
              shouldItemRender={(item, value
              ) => item.label.toLowerCase()
                .indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.label}
              renderItem={(item, isHighlighted) =>
                <div style={{
                  background: isHighlighted ?
                    '#bcf5bc' : 'white'
                }}
                  key={item.value}>
                  {item.label}
                </div>
              }
              value={value}
              onChange={e => setValue(e.target.value)}
              onSelect={(val) => 
              setValue(val)
              }
              inputProps={{
                style: {
                  width: '530px', height: '35px',
                  border: '1px outset lightgray'
                },
                placeholder: 'Search Designation'
              }}
            /> */}
