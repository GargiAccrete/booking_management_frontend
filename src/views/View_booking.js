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
      Demo2.FetchData(`register/${id}/view`).then((result)=>{
          console.log("result",result)
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
          <AddIcon />Merchent
        </button>
      </div>
      <div>
        <h4>Merchent |<small>Merchent list</small></h4>
      </div>
      <Table striped bordered hover style={{ marginLeft: "200px" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>legal_name</th>
            <th>State</th>
            <th>city</th>
            <th>Contact Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td>{item.id}</td>
              <td>{item.legal_name}</td>
              <td>{item.state}</td>
              <td>{item.city}</td>
              <td>{item.contact_no}</td>
              <td style={{ paddingRight: "90px" }}>
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
        <h4 >
           <small>Merchent</small>
        </h4>
        </Grid>
        </Grid>
        <Grid item md={12} sm={8} xs={12} container spacing={1}>
        <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
              {/* <Grid item sx={{ m: 1 }} md={5.7} xs={12}> */}
              <StyledFormLabel htmlFor="country">
                Busineess Type :{details.busineess_type}
              </StyledFormLabel>

              {/* </Grid> */}
            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
              <StyledFormLabel htmlFor="country">
                {" "}
                Brand Associate{" "}:{details.brand_associate}
              </StyledFormLabel>

            </Grid>
            </Grid>
            <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
              <StyledFormLabel htmlFor="country"> Legal Name: {details.legal_name}</StyledFormLabel>

            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
              <StyledFormLabel htmlFor="country"> Address1 : {details.address_line_2}</StyledFormLabel>

            </Grid>
            </Grid>
          
       
            <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
              <StyledFormLabel htmlFor="country"> Address2: {details.address_line_1}</StyledFormLabel>

            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
              <StyledFormLabel htmlFor="country"> City :{details.city} </StyledFormLabel>

            </Grid>
            </Grid>
         
      
            <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
              <StyledFormLabel htmlFor="country"> State {details.state}</StyledFormLabel>

            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
              <StyledFormLabel htmlFor="country"> PinCode: {details.pincode}</StyledFormLabel>
</Grid>
            </Grid>
        
         
            <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
              <StyledFormLabel htmlFor="country">
                {" "}
                Busineess Area:{" "}: {details.business_area}
              </StyledFormLabel>
            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12}>
              <StyledFormLabel htmlFor="country"> Contact No: {details.contact}</StyledFormLabel>
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

