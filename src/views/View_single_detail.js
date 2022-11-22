import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import "../Assets/Add_booking.css";
import Demo2 from "../services/Demo2";
import Sidebar from "../components/Sidebar";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField,FormLabel, MenuItem,Grid,} from "@mui/material";
  
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
  
function View_single_detail() {
    useEffect(() => {
      getData();
    }, [])
    
    const [addtask, setaddtask] = useState({});
    const navigate = useNavigate();
    const allparams=useParams()
 
    let getData=()=>{
        Demo2.FetchData(`register/${allparams.id}/view`).then((result)=>{
            console.log("result",result)
            setaddtask(result.data)
        })
    }

return (
      <div>
        <div>
         <Sidebar />
          <h4>
            Booking |<small>View Details</small>
          </h4>
        </div>
       <form>
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
                  fullWidth
                  select
                  readonly
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
            <div class="col">
              <StyledFormLabel htmlFor="country">
                {" "}
                Brand Associate{" "}
              </StyledFormLabel>
              <div style={{ display: "flex" }}>
                <input
                  type="radio"
                  id="yes"
                  name="optradio"
                  value="yes"
                  readonly
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
                  style={{ width: "20px" }}
                />
                  <label for="No">No</label>
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
                readonly
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
                readonly
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
                readonly
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
                readonly
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
                readonly
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
                readonly
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
                readonly
              />
            </div>
            <div class="col">
              <StyledFormLabel htmlFor="country"> Contact No: </StyledFormLabel>
              <input
                type="text"
                class="form-control"
                placeholder="contact_no"
                value={addtask.contact_no}
                name="contact_no"
                readonly
              />
            </div>
          </div>
      </form>
        <ToastContainer/>
      </div>
    );
  
}

export default View_single_detail