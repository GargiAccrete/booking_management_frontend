import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Demo2 from "../services/Demo2";
import Navbar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { styled } from "@mui/material/styles";
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import { TextField, FormLabel, MenuItem, Grid } from "@mui/material";
import {
  InputBase,
  Button,
  Typography,
  IconButton,
  Stack,
  Pagination,
} from "@mui/material";
import {
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  color: "black",
  border: "1px solid rgba(15, 15, 15, 0.15)",
  borderRadius: "10px",
  backgroundColor: "white",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledFormLabel = styled(FormLabel)(() => ({
  display: "block",
  fontWeight: "500",
  color: "black",
  fontSize: "13px",
}))
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: "15px",
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function View_booking() {
  let navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [search, setSearch] = useState("")
  const [modeldata, setModeldata] = useState({})
  const [model, setModel] = useState(false)
  let getData = async (search) => {
    console.log("inside function", search)
    Demo2.FetchData(`register/list?search=${search}`).then((result) => {
      console.log("result", result)
      setdata(result.data);

      // toast("listed Successfully!");
      // console.log(data);
    });

  };

  const hanldeClick = (id) => {
    {
      Demo2.FetchData(`register/${id}/view`).then((result) => {
        console.log("result", result)
        setModeldata(result.data)
        setModel(true)
      })
    }


  }
  const hideModal = () => {
    setModel(false)
  }

  let updateData = (id) => {
    console.log("id is" + id);
    navigate(`/edit_booking/${id}`);
  };
  let viewSingleData = (id) => {
    console.log("id is" + id);
    navigate(`/view_single_detail/${id}`);
  }
  let deletedata = (id) => {
    console.log(id);
    Demo2.deleteData(`register/${id}/delete`).then(() => {
      toast("Deleted Successfully!");

    });
    setTimeout(() => {
      getData();
    }, 4000);
  };
  const onSearch = async (searchvalue) => {
    console.log("inside search", searchvalue)
    setSearch(searchvalue);
    // console.log( search)
    getData(search)
  }
  useEffect(() => {
    //onload
    getData(search);
  }, []);
  const logout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('contact');
    window.open("/")
  }

  return (
    <div>
      <Sidebar />
      <div style={{ display: "flex" }}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          sx={{ padding: "20px 0px" }}
          style={{ marginLeft: "250px" }}
        >
          {/* <Form  > */}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{
                height: "30px",
              }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyPress={(e) => onSearch(e.target.value)}
            />
          </Search>
        </Stack>
        <button
          className="btn btn-danger"
          onClick={logout}
          style={{ float: "right", marginLeft: "550px", marginTop: "20px", height: "40px" }}
        >
          {" "}
          Logout
        </button>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/add_booking")}
          style={{ float: "right", margin: "20px" }}
        >
          {" "}
          <AddIcon />Merchant
        </button>
      </div>
      <div>
        <h4>Merchant |<small>Merchant list</small></h4>
      </div>
      <Table striped bordered hover style={{ marginLeft: "210px" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Legal Name</th>
            <th>State</th>
            <th>City</th>
            <th>Contact Number</th>
            <th style={{ paddingRight: "167px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item,index) => (
            <tr>
              <td>{index+1}</td>
              <td>{item.legal_name}</td>
              <td>{item.state}</td>
              <td>{item.city}</td>
              <td>{item.contact_no}</td>
              <td style={{ paddingRight: "167px" }}>
                <button className="btn btn-warning" style={{ margin: "10px" }} onClick={() => hanldeClick(item.id)} >
                  <a href="#">
                    <VisibilityIcon />
                  </a>
                </button>
                <button className="btn btn-danger" style={{ margin: "10px" }} onClick={() => deletedata(item.id)}>
                  <DeleteIcon />
                </button>
                <button className="btn btn-info" style={{ margin: "10px" }} onClick={() => updateData(item.id)} >
                  <EditIcon />
                </button>
                {/* <button
               className="btn btn-info"
               onClick={() => history.push(`/edit_booking/${item.id}`)}>
                 {" "} Edit
                 </button> */}
                {/* <Link to={`/edit_booking/${item.id}`}>
                Edit
                </Link> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {model && <Modal details={modeldata} handleClose={hideModal} />}
      <ToastContainer />
    </div>

  );
}
const Modal = ({ details, handleClose }) => {
  console.log('helllllllllllllllllll');
  return (
    <div>
      <div class='modal display-block'>
        <div className="modal-main">
          <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
            <div style={{display:"flex"}}>
            {/* <Sidebar /> */}
              <p style={{margin:"14px"}}>Merchent Details</p>
            </div>
            </Grid>
          </Grid>
          <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              {/* <Grid item sx={{ m: 1 }} md={5.7} xs={12}> */}
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "96px" }}><b>Busineess Type :</b></StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "53px" }}>{details.busineess_type}</StyledFormLabel>

              {/* </Grid> */}
            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "67px" }}><b>Brand Associate:</b></StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "21px" }}>{details.brand_associate==1?"yes":"no"}</StyledFormLabel>
            </Grid>
          </Grid>
          <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "96px" }}><b> Legal Name:</b></StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "53px" }}> {details.legal_name}</StyledFormLabel>

            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "67px" }}> <b> Address1 :</b></StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "53px" }}>  {details.address_line_1}</StyledFormLabel>
            </Grid>
          </Grid>


          <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "96px" }}> <b>Address2: </b></StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "68px" }}> {details.address_line_2}</StyledFormLabel>

            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "67px" }}><b> City : </b></StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "89px" }}>{details.city} </StyledFormLabel>
            </Grid>
          </Grid>


          <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "96px" }}><b> State :</b></StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "89px" }}> {details.state}</StyledFormLabel>
            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "67px" }}><b> PinCode:</b></StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "53px" }}> {details.pincode}</StyledFormLabel>
            </Grid>
          </Grid>
          <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "96px" }}><b>Busineess Area: </b></StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "34px" }}> {details.business_area}</StyledFormLabel>
            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "67px" }}><b> Contact No:</b></StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "53px" }}> {details.contact}</StyledFormLabel>
            </Grid>
          </Grid>

          <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
            <button class="btn btn-danger" style={{ width: "100px", textAlign: "center" }} onClick={handleClose}>close</button>
          </Grid>


        </div>
      </div>

      <ToastContainer />
    </div>


  );
};

