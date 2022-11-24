import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import AdminService from "../services/AdminService";
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
import '../Assets/View_admin.css'
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
const StyledFormLabel = styled(FormLabel)(() => ({
  display: "block",
  fontWeight: "500",
  color: "black",
  fontSize: "13px",
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
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


function View_admin() {
  let navigate = useNavigate();
  const [admin, setAdmin] = useState([]);
  const [search, setSearch] = useState("")
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState({});
  const hanldeClick = (selectedRec) => {

    setSelectedData(selectedRec);
    setShow(true);
  };
  console.log("---", selectedData)
  const hideModal = () => {
    setShow(false);
  };

  let getData = async () => {
    console.log("inside function")
    AdminService.FetchData(`adminUser/list`).then((result) => {
      console.log("result", result)
      setAdmin(result.data);// toast("listed Successfully!");
      // console.log(data);
    });

  };


  let updateData = (id) => {
    console.log("id is" + id);
    navigate(`/edit_admin/${id}`);
  };
  let viewSingleData = (id) => {
    console.log("id is" + id);
    navigate(`/view_admin_detail/${id}`);
  }
  let deletedata = (id) => {
    console.log(id);
    AdminService.deleteData(`adminUser/${id}/delete`).then(() => {
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
    getData();
  }, []);


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
            //   onKeyPress={(e) => onSearch(e.target.value)}
            />
          </Search>
        </Stack>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add_admin")}
          style={{ float: "right", marginLeft: "600px", marginTop: "20px", height: "40px" }}
        >
          {" "}
          <AddIcon />Admin
        </button>
      </div>
      <div>
        <h4>Admin |<small>Admin list</small></h4>
      </div>
      <Table striped bordered hover style={{ marginLeft: "225px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Designation</th>
            <th>Is Super Admin</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admin.map((item) => (
            <tr>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.designation===1?"Manager":"Sales Manager"}</td>
              <td>{item.is_super_admin === 1 ? "yes" : "no"}</td>
              <td style={{ paddingRight: "90px" }}>
                <button className="btn btn-warning" style={{ margin: "10px" }} onClick={() => hanldeClick(item)} >
                  <a href="#">
                    <VisibilityIcon />
                  </a>
                </button>
                {/* <button className="btn btn-warning" style={{ margin: "10px" }} onClick={() => viewSingleData(item.id)} >
                  <VisibilityIcon />
                </button> */}
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
      {show && <Modal details={selectedData} handleClose={hideModal} />}
      <ToastContainer />
    </div>
  )
}



const Modal = ({ details, handleClose }) => {
  return (
    <div>
      <div class='modal display-block'>
        <div className="modal-main">
          <div style={{ display: "flex" }}>
            {/* <Sidebar /> */}
            <p style={{ margin: "14px" }}>Admin Details</p>

          </div>
          <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              {/* <Grid item sx={{ m: 1 }} md={5.7} xs={12}> */}
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "96px" }}> <b>Name:</b></StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "53px" }}>{details.name}</StyledFormLabel>

              {/* </Grid> */}
            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" ><b>Email :</b> </StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "53px" }}>{details.email}</StyledFormLabel>

            </Grid>
          </Grid>
          <Grid item md={12} sm={8} xs={12} container spacing={1}>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "67px" }}> <b>Designation: </b> </StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "53px" }}>  {details.designation} </StyledFormLabel>

            </Grid>
            <Grid item sx={{ m: 1 }} md={5.7} xs={12} style={{ display: "flex" }}>
              <StyledFormLabel htmlFor="country" style={{ marginLeft: "-41px" }}><b> Super Admin : </b> </StyledFormLabel>
              <StyledFormLabel htmlFor="details" style={{ marginLeft: "53px" }}>  {details.is_super_admin === 1 ? "yes" : "no"}  </StyledFormLabel>
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



export default View_admin