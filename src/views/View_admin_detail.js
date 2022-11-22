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


function View_admin_detail() {
    useEffect(() => {
        getData();
    }, [])

    const [addadmin, setaddAdmin] = useState({});
    const navigate = useNavigate();
    const allparams = useParams()

    let getData = () => {
        AdminService.FetchData(`adminUser/${allparams.id}/view`).then((result) => {
            console.log("result", result)
            setaddAdmin(result.data)
        })
    }
    return (
        <div>
            <div>
                <Sidebar />
                <h4>
                    Admin |<small>add admin</small>
                </h4>
            </div>
            <form>
                <div class="row">
                    <div class="col">
                        {/* <Grid item sx={{ m: 1 }} md={5.7} xs={12}> */}
                        <StyledFormLabel htmlFor="country"> Name: </StyledFormLabel>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="name"
                            value={addadmin.name}
                            name="name"
                            readOnly

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
                            value={addadmin.email}
                            name="email"
                            readOnly

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
                            value={addadmin.designation===1?"yes" : "no"}
                            name="designation"
                            readOnly
                        />
                    </div>

                    <div class="col">
                        <StyledFormLabel htmlFor="country"> Password : </StyledFormLabel>
                        <input
                            type="password"
                            class="form-control"
                            placeholder="password"
                            value={addadmin.password}
                            name="password"
                            readOnly
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
                            value={addadmin.is_super_admin}
                            name="is_super_admin"
                            readOnly
                        />
                    </div>
                    <div class="col">
                    </div>
                </div>

            </form>
            <ToastContainer />
        </div>
    )
}

export default View_admin_detail