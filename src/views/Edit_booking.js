import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Assets/Add_booking.css";
import Demo2 from "../services/Demo2";
import Sidebar from "../components/Sidebar";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { TextField, FormLabel, MenuItem, Grid, } from "@mui/material";
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
    { value: '1', text: 'ParathaHouse' },
    { value: '2', text: 'BiryaniHouse' },
    { value: '3', text: 'Snacks' },
    { value: '4', text: 'VadapavFactory' }
  ];
  const businesstype = [
    { value: '1', text: 'Ltd' },
    { value: '2', text: 'Pvt' },
    { value: '3', text: 'Llp' },

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
    Demo2.FetchData(`register/${allparams.id}/view`).then((result) => {
      console.log("result", result)
      setaddtask(result.data)
      setType(result.data.business_type)
      setBrand(result.data.business_area)
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
      business_type: addtask.business_type,
      legal_name: addtask.legal_name,
      business_area: brand,
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
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "10px", marginTop: "29px" }}>
              {" "}
              Brand Associate :{" "}
            </StyledFormLabel>
            <div style={{ display: "flex", marginTop: "17px" }}>
              {/* <input name="optradio" type="hidden" value="0" />
              <input name="optradio" type="checkbox" value="1" onChange={(e) => (handleShowHide(e))} /> */}
              <input
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
              <label for="No" style={{ marginTop: "8px", fontSize: "13px" }}>No</label>
            </div>
          </div>
          {showhide === "1" && (
            <div class="col">
              <StyledFormLabel htmlFor="country" > Legal Name: </StyledFormLabel>
              <input
                type="text"
                class="form-control"
                placeholder="Enter Name"
                value={addtask.legal_name}
                name="legal_name"
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
            <FormControl variant="outlined" style={{}}>
              <InputLabel style={{ color: "black", marginLeft: "-20px", marginBottom: "5px", marginTop: "22px" }} > Business Type:</InputLabel>
              <Select onChange={(event) =>
                setType(event.target.value)}
                value={type} style={{ marginLeft: "-15px", width: "520px", height: "30px", marginTop: "47px" }}>
                {businesstype.map(item => {
                  return (<option key={item.value} value={item.value}>{item.text}</option>);
                })}
              </Select>
              <FormHelperText>Select Type</FormHelperText>
            </FormControl>
          </div>
          <div class="col">
            <StyledFormLabel htmlFor="country" style={{marginTop:"19px",marginLeft:"-405px"}}> Legal Name: </StyledFormLabel>
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
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-392px" }}> Permanent Address : </StyledFormLabel>
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
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-404px" }}> Temporary Address: </StyledFormLabel>
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
              <InputLabel style={{ color: "black", marginLeft: "-20px", marginBottom: "5px", marginTop: "-16px", fontSize: "13px" }} > State :</InputLabel>
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
              <InputLabel style={{ color: "black", marginLeft: "-33px", marginBottom: "5px", marginTop: "-16px", fontSize: "13px" }} > City :</InputLabel>
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
          <div class="col">
            <FormControl variant="outlined" style={{}}>
              <InputLabel style={{ color: "black", marginLeft: "-33px", marginBottom: "5px", marginTop: "-16px", fontSize: "13px" }} > Business Area: :</InputLabel>
              <Select onChange={(event) =>
                setBrand(event.target.value)}
                value={brand} style={{ marginLeft: "-15px", width: "520px", height: "30px", marginTop: "32px" }}>
                {houses.map(item => {
                  return (<option key={item.value} value={item.value}>{item.text}</option>);
                })}
              </Select>
              <FormHelperText>Select City</FormHelperText>
            </FormControl>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <StyledFormLabel htmlFor="country"> Capacity: </StyledFormLabel>
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
            <StyledFormLabel htmlFor="country"> Email: </StyledFormLabel>
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
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-412px" }}>Landline No: </StyledFormLabel>
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
            <StyledFormLabel htmlFor="country" style={{ marginLeft: "-412px" }}> Mobile Number: </StyledFormLabel>
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
            <StyledFormLabel htmlFor="country"> GST: </StyledFormLabel>
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