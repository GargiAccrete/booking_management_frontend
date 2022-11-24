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


function Edit_booking() {
  
  const [addtask, setaddtask] = useState({});
  const [brand, setBrand] = useState("");
  const [stateid, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [state, setState] = useState([]);
  const [city, setCity] = useState([])
  const navigate = useNavigate();
  const allparams = useParams()
  const houses = [
    { value: 'ParathaHouse', text: 'ParathaHouse' },
    { value: 'BiryaniHouse', text: 'BiryaniHouse' },
    { value: 'Snacks', text: 'Snacks' },
    { value: 'VadapavFactory', text: 'VadapavFactory' }
  ];
  useEffect(() => {
    getData();
    getState();
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
    })
  }

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


  let handleSubmit = (e) => {
    e.preventDefault();
    var data = {
      business_type: addtask.business_type,
      legal_name: addtask.legal_name,
      business_area: brand,
      brand_associate: addtask.optradio || "No",
      address_line_1: addtask.address_line_1,
      address_line_2: addtask.address_line_2,
      city: cityId,
      state: state.id,
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
          Booking |<small>Edit booking</small>
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
                <MenuItem key="Ltd" value="Ltd">
                  Ltd
                </MenuItem>
                <MenuItem key="Pvt" value="Pvt">
                  Pvt
                </MenuItem>
                <MenuItem key="Llp" value="Llp">
                  Llp
                </MenuItem>
              </StyledTextField>
            </Grid>
          </div>
          <div class="col" style={{ display: "flex" }}>
            <StyledFormLabel htmlFor="country" style={{ margin: "33px" }}>
              {" "}
              Brand Associate{" "}
            </StyledFormLabel>
            <div style={{ display: "flex" }}>
              <input name="optradio" type="hidden" value="No" />
              <input name="optradio" type="checkbox" value="yes" onChange={getonChange} />
              {/* <input
                  type="radio"
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
                  type="radio"
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
              onChange={getonChange}
              required
            />
          </div>
          <div class="col">
            <StyledFormLabel htmlFor="country"> State </StyledFormLabel>
            <select onChange={(event) => handleState(event)} >
              <option>---------Select State-------</option>
              {state.map((item) => {

                return (<option key={item.id} value={item.id}>{item.name}</option>);
              })}
            </select>
            {/* <StyledFormLabel htmlFor="country"> City : </StyledFormLabel>
              <input
                type="text"
                class="form-control"
                placeholder="city"
                value={addtask.city}
                name="city"
                onChange={getonChange}
                required
              /> */}
          </div>
        </div>
        <div class="row">
          <div class="col">
            <StyledFormLabel htmlFor="country"> City : </StyledFormLabel>
            <select onChange={(e) => setCityId(e.target.value)}>
              <option>---------Select City-------</option>
              {city.map(item => {
                //  console.log("firstcity",city)
                return (<option key={item.id} value={item.name}>{item.city}</option>);
              })}
            </select>
            {/* <input
                type="text"
                class="form-control"
                placeholder="state"
                value={addtask.state}
                name="state"
                onChange={getonChange}
                required
              /> */}
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
            <select onChange={(event) => setBrand(event.target.value)} value={brand}>
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
      <ToastContainer />
    </div>
  );

}

export default Edit_booking