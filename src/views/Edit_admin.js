import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Assets/Add_booking.css";
import AdminService from "../services/AdminService";
import Sidebar from "../components/Sidebar";
import { styled } from "@mui/material/styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextField, FormLabel, MenuItem, Grid, } from "@mui/material";

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


function Edit_admin() {
    useEffect(() => {
        getData();
    }, [])
    const [upadmin, setupAdmin] = useState({});
    const [designation, setDesignation] = useState([])
    const Managerdata = [
        { value: '1', text: 'Manager ' },
        { value: '2', text: 'sales Manager' },
        // {value: '3',   text: 'Manager2'  },

    ];
    const navigate = useNavigate();
    const allparams = useParams();
    let getonChange = (event) => {
        // console.log(event.target.value);
        setupAdmin({ ...upadmin, [event.target.name]: event.target.value });
        // console.log(addtask);
    };
    let getData = () => {
        AdminService.FetchData(`adminUser/${allparams.id}/view`).then((result) => {
            console.log("result", result)
            setupAdmin(result.data)
            setDesignation(result.data.designation)
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        var data = {
            name: upadmin.name,
            email: upadmin.email,
            password: upadmin.password,
            designation:designation,
            is_super_admin: upadmin.is_super_admin,

        };
        AdminService.PutData(`adminUser/${allparams.id}/update`, data).then(() => {
            toast("successfully updated")
        });
        setTimeout(() => {
            navigate("/view_admin");
        }, 4000);
    }

    return (
        <div>
            <div>
                <Sidebar />
                <h4>
                    Admin |<small>Edit admin</small>
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
                            value={upadmin.name}
                            name="name"
                            onChange={getonChange}

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
                            value={upadmin.email}
                            name="email"
                            onChange={getonChange}

                        />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <StyledFormLabel htmlFor="country"> Designation: </StyledFormLabel>
                       <select onChange={(event) => setDesignation(event.target.value)} value={designation}  > 
                            <option>---------Select Menu-------</option>
                            {Managerdata.map(item => {
                                return (<option key={item.value} value={item.value}>{item.text}</option>);
                            })}
                        </select>
                    </div>

                    <div class="col">
                        <StyledFormLabel htmlFor="country"> Password : </StyledFormLabel>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="password"
                            value={upadmin.password}
                            name="password"
                            onChange={getonChange}
                        />
                    </div>
                </div>
                <div class="row">
      <div class="col" style={{display:"flex"}}>
            <StyledFormLabel htmlFor="country" style={{margin:"33px"}}>
              {" "}
             Is Super Admin? yes/no :{" "}
            </StyledFormLabel>
            <div style={{ display: "flex" }}>
            <input name="optradio" type="hidden" value="0" />
            <input name="optradio" type="checkbox" value="1"  onChange={getonChange} checked={upadmin.is_super_admin?1:0}/>
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

export default Edit_admin