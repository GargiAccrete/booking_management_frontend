import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Assets/Add_booking.css";
import Demo2 from "../services/Demo2";
import Sidebar from "../components/Sidebar";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { TextField, FormLabel, MenuItem, Grid, Autocomplete} from "@mui/material";
import { Select, FormHelperText, FormControl, InputLabel } from '@material-ui/core';
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
  marginLeft: "-460px"
}));


function Edit_booking() {

  const [addtask, setaddtask] = useState({});
  const [brand, setBrand] = useState("");
  const [stateid, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [state, setState] = useState([]);
  const [city, setCity] = useState([])
  const [type, setType] = useState("");
  const [showhide, setShowHide] = useState("");
  const navigate = useNavigate();
  const allparams = useParams()
  const houses = [
    { value: '1', label: 'ParathaHouse' },
    { value: '2', label: 'BiryaniHouse' },
    { value: '3', label: 'Snacks' },
    { value: '4', label: 'VadapavFactory' }
  ];
  const businesstype = [
    { value: '1', label: 'Ltd' },
    { value: '2', label: 'Pvt' },
    { value: '3', label: 'Llp' },

  ];
  useEffect(() => {
    getData();
    getState();
    // getCity();
  }, [])
  useEffect(() => {
    getCity();
  }, [stateid])


  let getonChange = (event) => {
    // console.log(event.target.value);
    setaddtask({ ...addtask, [event.target.name]: event.target.value });
    // console.log(addtask);
  };
  let getData = () => {
    let  data="Ltd";
    let data2="Pvt";
    let data3="Llp"
    let house1="ParathaHouse";
    let house2="BiryaniHouse";
    let house3="Snacks";
    let house4="VadapavFactory";
    Demo2.FetchData(`register/${allparams.id}/view`).then((result) => {
      console.log("result", result.data.business_type)
      setaddtask(result.data)
      if( result.data.business_type==1){ 
        console.log("hiii")
        setType(data)
       }
      else if( result.data.business_type==2){ 
        console.log("hiii")
        setType(data2)
       }
       else{ 
        console.log("hiii")
        setType(data3)
       }
      if(result.data.business_area== 1)
      {
        setBrand(house1)
      }
      else if(result.data.business_area== 2){
        setBrand(house2)
       }
      else if(result.data.business_area== 3){
        setBrand(house3)
      }
      else{
        setBrand(house4)
      }
      // setBrand(result.data.business_area)
      setStateId(result.data.state)
      setCityId(result.data.city)
    })
  }
  const handleShowHide = (e) => {
    setaddtask({
      ...addtask,
      brand_associate: e.target.value,
    });

    const getbrand = e.target.value;
    console.log(getbrand)
    setShowHide(getbrand);

  }
  let getState = async () => {
    console.log("inside function")
    Demo2.FetchCityData(`register/mapstate`).then((result) => {
      // console.log("result", result)
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
  let handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      business_type: type.value,
      legal_name: addtask.legal_name,
      business_area: brand.value,
      brand_associate: addtask.brand_associate || "0",
      address_line_1: addtask.address_line_1,
      address_line_2: addtask.address_line_2,
      city: cityId,
      state: stateid,
      pincode: addtask.pincode,
      contact_no: addtask.contact_no,
    };
    Demo2.PutData(`register/${allparams.id}/update`, data).then(() => {
      toast("successfully updated")
    });
    setTimeout(() => {
      navigate("/view_booking");
    }, 4000);
  }


  return (
    <div>
      <div>
        <Sidebar />
        <h4>
          Merchant |<small>Edit Merchant</small>
        </h4>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <div class="col" style={{ display: "flex" }}>
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "10px", marginTop: "29px",color:"black",fontSize:"13px" }}>
            
          Associate with brand ?:
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
          {showhide === "1" && (
            <div class="col">
              <StyledFormLabel htmlFor="country" style={{fontSize:"13px",color:"black",marginLeft:"-480px"}} > Brand: </StyledFormLabel>
              <input
                type="text"
                class="form-control"
                value={addtask.brand_name}
                name="brand_name"
                onChange={getonChange}
                required
              />
            </div>
          )}
          {showhide === "0" && (
            <div class="col">

            </div>
          )}
        </div>
        <div class="row">
          <div class="col">
          <InputLabel style={{ color: "black", marginLeft: "-433px", fontSize:"13px",marginBottom: "5px", marginTop: "22px" ,color:"black"}} > Business Type:</InputLabel>
          <Autocomplete
                disablePortal
                options={businesstype}
                isOptionEqualToValue={(option, value) => option.label }
                // getOptionLabel={(option) => option.text || ""}
                // getOptionSelected={(option, value) =>{
                //     console.log("first",option)
                // }}
                
                value={type}
                onChange={(e,newValue) =>{
                    setType(newValue)
                    }}
                    // clearOnBlur={false}
                 renderInput={(params) => <TextField {...params} size="small"/>}
                />
            {/* <FormControl variant="outlined" style={{}}>
              <InputLabel style={{ color: "black", marginLeft: "-20px", marginBottom: "5px", marginTop: "22px" ,color:"black"}} > Business Type:</InputLabel>
              <Select onChange={(event) =>
                setType(event.target.value)}
                value={type} style={{ marginLeft: "-15px", width: "520px", height: "30px", marginTop: "47px" }}>
                {businesstype.map(item => {
                  return (<option key={item.value} value={item.value}>{item.text}</option>);
                })}
              </Select>
              <FormHelperText>Select Type</FormHelperText>
            </FormControl> */}
          </div>
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{marginTop:"19px",marginLeft:"-433px",color:"black",fontSize:"13px"}}> Legal Name: </StyledFormLabel>
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
        </div>
        <div class="row">
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-392px",color:"black",fontSize:"13px" }}> Permanent Address : </StyledFormLabel>
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

          <div class="col">
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-404px" ,color:"black",fontSize:"13px"}}> Temporary Address: </StyledFormLabel>
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
        </div>

        <div class="row">
          <div class="col">
            <FormControl variant="outlined" style={{}}>
              <InputLabel style={{ color: "black", marginLeft: "-20px", marginBottom: "5px",fontSize:"13px", marginTop: "-16px",color:"black" }} > State :</InputLabel>
              <Select onChange={(event) => handleState(event)}
                value={stateid} style={{ marginLeft: "-15px", width: "520px", height: "30px", marginTop: "32px" }}>
                {state.map((item) => {
                  return (<option key={item.id} value={item.id}>{item.name}</option>);
                })}
              </Select>
              <FormHelperText>Select State</FormHelperText>
            </FormControl>
          </div>
          <div class="col">
            <FormControl variant="outlined" style={{}}>
              <InputLabel style={{ color: "black", marginLeft: "-33px",fontSize:"13px", marginBottom: "5px",color:"black" }} > City :</InputLabel>
              <Select onChange={(e) => setCityId(e.target.value)} value={cityId} style={{ marginLeft: "-15px", width: "520px", height: "30px", marginTop: "32px" }}>
                {city.map(item => {
                  //  console.log("firstcity",city)
                  return (<option key={item.id} value={item.id}>{item.city}</option>);
                })}
              </Select>
              <FormHelperText>Select City</FormHelperText>
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
              required
            />
          </div>
          <div class="col">
          <InputLabel style={{ color: "black", marginLeft: "-433px",color:"black", marginBottom: "5px", marginTop: "-16px", fontSize: "13px" }} > Business Area: :</InputLabel>
          <Autocomplete
              disablePortal
              selectOnFocus
              select
              options={houses}
                isOptionEqualToValue={(option, value) => option.label }
                // getOptionLabel={(option) => option.text || ""}
                // getOptionSelected={(option, value) =>{
                //     console.log("first",option)
                // }}
                sx={{marginTop:3.5}}
                value={brand}
                onChange={(e,newValue) =>{
                  setBrand(newValue)
                    }}
                    // clearOnBlur={false}
                 renderInput={(params) => <TextField {...params} size="small"/>}
                />
            {/* <FormControl variant="outlined" style={{}}>
              <InputLabel style={{ color: "black", marginLeft: "-33px",color:"black", marginBottom: "5px", marginTop: "-16px", fontSize: "13px" }} > Business Area: :</InputLabel>
              <Select onChange={(event) =>
                setBrand(event.target.value)}
                value={brand} style={{ marginLeft: "-15px", width: "520px", height: "30px", marginTop: "32px" }}>
                {houses.map(item => {
                  return (<option key={item.value} value={item.value}>{item.text}</option>);
                })}
              </Select>
              <FormHelperText>Select City</FormHelperText>
            </FormControl> */}
          </div>
        </div>
        <div class="row">
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
            <StyledFormLabel htmlFor="country" style={{color:"black",fontSize:"13px",marginLeft:"-433px"}}> Email: </StyledFormLabel>
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
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-433px" ,color:"black",fontSize:"13px"}}>Landline No: </StyledFormLabel>
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
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-433px" ,color:"black",fontSize:"13px"}}> Mobile Number: </StyledFormLabel>
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
            <StyledFormLabel htmlFor="country" style={{color:"black",fontSize:"13px", marginLeft: "-480px"}}> GST: </StyledFormLabel>
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

export default Edit_booking