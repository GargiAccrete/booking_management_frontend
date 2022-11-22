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
        })
    }

    let handleSubmit = (e) => {
        e.preventDefault();
        var data = {
            name: upadmin.name,
            email: upadmin.email,
            password: upadmin.password,
            designation: upadmin.designation,
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
                        <input
                            type="text"
                            class="form-control"
                            placeholder="designation"
                            value={upadmin.designation}
                            name="designation"
                            onChange={getonChange}
                        />
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
                    <div class="col">
                        <StyledFormLabel htmlFor="country"> Super Admin : </StyledFormLabel>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="address_line_1"
                            value={upadmin.is_super_admin}
                            name="is_super_admin"
                            onChange={getonChange}
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
    )
}

export default Edit_admin