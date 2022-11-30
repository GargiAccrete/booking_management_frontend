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
import {  FormLabel, MenuItem, Grid } from "@mui/material";
import { Select, FormHelperText, FormControl, Label, InputLabel } from '@material-ui/core';
import { Autocomplete ,TextField} from "@mui/material";
import { useForm } from "react-hook-form"; 
import { yupResolver } from "@hookform/resolvers/yup";
import AddIcon from '@mui/icons-material/Add';
import * as yup from "yup";


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

  fontSize: "13px",
  marginLeft: "-460px"
}));
const schema = yup.object().shape({
  legal_name: yup.string().required(),
  address_line_1: yup.string().required(),
});

export default function Add_booking() {
  const { register, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const [addtask, setaddtask] = useState({});
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [stateid, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [state, setState] = useState([]);
  const [listdata, setListdata] = useState([]);
  const [city, setCity] = useState([]);
  const [showhide, setShowHide] = useState("");
  const history = useNavigate();
 const houses = [
    { id: '1', text: 'ParathaHouse' },
    { id: '2', text: 'BiryaniHouse' },
    { id: '3', text: 'Snacks' },
    { id: '4', text: 'VadapavFactory' }
  ];
  const businesstype = [
    { id: '1', label: 'Ltd' },
    { id: '2', label: 'Pvt' },
    { id: '3', label: 'Llp' },

  ];
 const list= [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" }
  ]
let getonChange = (event) => {
    // console.log(event.target.value);
    setaddtask({ ...addtask, [event.target.name]: event.target.value });
    // console.log(addtask);
  };
  const handleShowHide = (e) => {
    setaddtask({
      ...addtask,
      brand_associate: e.target.value,
    });

    const getbrand = e.target.value;
    console.log(getbrand)
    setShowHide(getbrand);

  }

  let handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      business_type: type.id,
      legal_name: addtask.legal_name,
      business_area: brand.id || "pppp",
      brand_associate: addtask.brand_associate || "0",
      address_line_1: addtask.address_line_1,
      address_line_2: addtask.address_line_2,
      city: cityId,
      state: stateid,
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
  useEffect(() => {
    getState();
    brandDropdown()
  }, [])
  useEffect(() => {
   
    getCity();
  }, [stateid])

  let getState = async () => {
    console.log("inside function")
    Demo2.FetchCityData(`register/mapstate`).then((result) => {
      console.log("result", result)
      setState(result.data);
      getCity()
      // toast("listed Successfully!");
      // console.log(data);
    });

  };
  const getCity = async () => {
    console.log("state_id")
    const rescity = await axios.get(`http://localhost:3002/register/mapcity/${stateid}`);
    console.log("rescity", rescity.data.data)
    // const getci = await rescity.json();
    setCity(rescity.data.data)
  }
  const handleState = (event) => {
    const getstateId = event.target.value;
    console.log("__", getstateId)
    setStateId(getstateId)
  }
  const brandDropdown=async()=>{
    console.log("hiiiiiii")
    Demo2.FetchBrand(`brand/list`).then((result) => {
      console.log("result", result)
      setListdata(result.data);
   });

  }

  let handleBrandAdd = () => {
    
  };

  return (
    <div>
      <div>
        <Sidebar />
        <h4>
          Merchant |<small>add merchant</small>
        </h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="row" style={{dispalye:"flex"}}>
          <div class="col" style={{ display: "flex" }}>
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "10px", marginTop: "29px",color:"black" ,fontSize:"13px"}}>
             Associate with Brand  ?:
            </StyledFormLabel>
            <div style={{ display: "flex", marginTop: "17px" }}>
              <input name="brand_associate" type="radio" value="0"  onChange={(e) => (handleShowHide(e))} />
              <label style={{margin:"10px",fontSize:"13px"}}>No</label>
              <input name="brand_associate" type="radio" value="1" onChange={(e) => (handleShowHide(e))} />
              <label style={{margin:"10px",fontSize:"13px"}}>yes</label>
              {/* <input
                type="checkbox"
                id="yes"
                name="brand_associate"
                onChange={(e) => (handleShowHide(e))}
                value={"1"}
                style={{ width: "20px", marginTop: "10px" }}
              />
              {" "}
              <label
                for="html"
                style={{ marginLeft: "20px", marginRight: "100px", marginTop: "8px", fontSize: "13px" }}
              >
                Yes
              </label>
              {" "}
              <input
                type="checkbox"
                id="no"
                name="brand_associate"
                value={"0"}
                onChange={(e) => (handleShowHide(e))}
                style={{ width: "20px", marginTop: "8px" }}
              />
              <label for="No" style={{ marginTop: "8px", fontSize: "13px" }}>No</label> */}
            </div>
          </div>
          </div>
          {showhide === "1" && (
       <div class="row">
            <div class="col" style={{display:"flex"}} >
              <div>
             <FormControl variant="outlined" style={{}}>
              <InputLabel style={{ marginLeft: "-22px", marginTop: "-16px", fontSize: "13px",color:"black" }} > Brand Name :</InputLabel>
              <Select onChange={(event) => setListdata(event.target.value)} style={{ marginLeft: "-15px", width: "520px", height: "30px", marginTop: "32px" }}>
                {listdata.map((item) => {
                  return (<option key={item.id} value={item.id}>{item.name}</option>);
                })}
              </Select>
              <FormHelperText>Select State</FormHelperText>
            </FormControl>
              {/* <InputLabel style={{ marginLeft: "-465px", fontSize: "13px",color:"black" ,marginBottom:"-12px"}} > Brand Name :</InputLabel>
              <Autocomplete 
                  options={list}
                  value={listdata}
                  getOptionLabel={(option) => option.label || ""}
                  onChange={(e,newValue) =>{
                  setListdata(newValue)
                  
                  }}   
                  sx={{width:515,marginTop:3}}
                  renderInput={(params) => <TextField {...params} size="small"/>}
                />  */}
           {/* <button
                type="button"
                onClick={addDivisionHandler}
                className="add-btn"
              >
             <AddIcon  />
             </button> */}
             </div>
             </div>
            
             <div class="col">
              <StyledFormLabel htmlFor="country" style={{ color:"black" ,fontSize:"13px",marginLeft:"-270px"}}>
               If your brand is not available then added:
            </StyledFormLabel>
            <div style={{display:"flex"}}>
              <input
                type="text"
                class="form-control"
                value={addtask.brand}
                name="brand"
                style={{width:"450px"}}
                onChange={getonChange}
                />
                <button
                  type="button"
                  onClick={handleBrandAdd}
                  className="add-btn"
                >
               <AddIcon  />
               </button>
              </div>
              </div>
            </div>
            
          )}
          {showhide === "0" && (
            <div class="col">

            </div>
          )}
      
        <div class="row">
          <div class="col">
            <Grid item sx={{ m: 1 }} md={4} xs={12}>
              {/* <Autocomplete option={businesstype} renderInput={(params)=><TextField {...params} />}/> */}
              <div class="col">
              <InputLabel style={{ marginTop: "10px", marginLeft: "-437px", marginBottom: "10px", fontSize: "13px",color:"black"}} > Business Type:</InputLabel>
              <Autocomplete options={businesstype}
                value={type}
                onChange={(e,newValue) =>{
                  setType(newValue)
                  }}   
                  sx={{width:515,marginLeft:-2.5}}
                  renderInput={(params) => <TextField {...params} size ="small" />}
                />
           </div>
            </Grid>
          </div>
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{ marginTop: "9px", marginLeft: "-461px" ,color:"black",fontSize:"13px"}}> Legal Name: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Name"
              value={addtask.legal_name}
              name="legal_name"
              style={{width:"520px",marginLeft:"-16px"}}
              onChange={getonChange}
              required
            />
          </div>
     
        </div>
        <div class="row">
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-404px" ,color:"black",fontSize:"13px"}}> Permanent Address: </StyledFormLabel>
            <input
            {...register("address_line_1")}
              type="text"
              class="form-control"
              placeholder="address"
              value={addtask.address_line_1}
              name="address_line_1"
              onChange={getonChange}
              style={{marginLeft:"-8px" ,width:"523px"}}
              required
            />
          </div>
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-404px" ,color:"black",fontSize:"13px"}}> Temporary Address: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="address"
              value={addtask.address_line_2}
              name="address_line_2"
              onChange={getonChange}
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <FormControl variant="outlined" style={{}}>
              <InputLabel style={{ marginLeft: "-22px", marginTop: "-16px", fontSize: "13px",color:"black" }} > State :</InputLabel>
              <Select onChange={(event) => handleState(event)} style={{ marginLeft: "-15px", width: "520px", height: "30px", marginTop: "32px" }}>
                {state.map((item) => {
                  return (<option key={item.id} value={item.id}>{item.name}</option>);
                })}
              </Select>
              <FormHelperText>Select State</FormHelperText>
            </FormControl>
          </div>
          <div class="col">
            <FormControl variant="outlined" style={{}}>
              <InputLabel style={{ marginLeft: "-20px", marginBottom: "5px", marginTop: "-16px", fontSize: "13px",color:"black" ,marginLeft:"-26px"}} > City :</InputLabel>
              <Select onChange={(e) => setCityId(e.target.value)} style={{ marginLeft: "-15px", width: "520px", height: "30px", marginTop: "32px" }}>
                {city.map(item => {
                  //  console.log("firstcity",city)
                  return (<option key={item.id} value={item.id}>{item.city}</option>);
                })}
              </Select>
            </FormControl>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{color:"black",fontSize:"13px"}}> Pincode: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="pincode"
              value={addtask.pincode}
              name="pincode"
              onChange={getonChange}
              style={{marginLeft:"-4px" ,width:"523px"}}
              required
            />
          </div>
          <div class="col">
            <FormControl variant="outlined" style={{}}>
              <InputLabel style={{  marginLeft: "-31px", marginBottom: "5px", marginTop: "-16px", fontSize: "13px" ,color:"black"}} > Business Area: :</InputLabel>
              <Autocomplete 
                  options={houses}
                  value={brand}
                  getOptionLabel={(option) => option.text || ""}
                  onChange={(e,newValue) =>{
                  setBrand(newValue)
                  
                  }}   
                  sx={{width:515,marginLeft:-2.5,marginTop:3}}
                  renderInput={(params) => <TextField {...params} size ="small" />}
                />
              {/* <Select onChange={(event) =>
                setBrand(event.target.value)} value={brand} style={{ marginLeft: "-15px", width: "520px", height: "30px", marginTop: "32px" }}>
                {houses.map(item => {
                  return (<option key={item.value} value={item.value}>{item.text}</option>);
                })}
              </Select> */}
            </FormControl>
          </div>
        </div>
        <div className="row">
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{color:"black",fontSize:"13px"}}> Capacity: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="capacity"
              // value={addtask.capacity}
              name="capacity"
            // onChange={getonChange}
            // required
            />
          </div>
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{color:"black",fontSize:"13px",marginLeft:"-481px"}}> Email: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="email"
              // value={addtask.email}
              name="email"

            // onChange={getonChange}

            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{color:"black",fontSize:"13px",marginLeft:"-432px"}}> Landline No: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="contact"
              value={addtask.contact_no}
              name="contact_no"
              onChange={getonChange}
              required
            />
          </div>
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-412px",color:"black" ,fontSize:"13px"}}> Mobile Number: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="Mobile Number"
              // value={addtask.mobile_no}
              name="mobile_no"
            // onChange={getonChange}
            // required
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{color:"black",fontSize:"13px",marginLeft:"-466px"}}> GST: </StyledFormLabel>
            <input
              type="text"
              class="form-control"
              placeholder="gst"
              // value={addtask.mobile_no}
              name="gst"
            // onChange={getonChange}
            // required
            />
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
  );
}
