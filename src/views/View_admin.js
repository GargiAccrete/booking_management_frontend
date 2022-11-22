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
    let getData = async () => {
      console.log("inside function")
      AdminService.FetchData(`adminUser/list`).then((result) => {
        console.log("result", result)
        setAdmin(result.data);
      
        // toast("listed Successfully!");
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
          style={{ float: "right",  marginLeft: "600px", marginTop: "20px", height: "40px"  }}
        >
          {" "}
          <AddIcon />Admin
        </button>
      </div>
      <div>
        <h4>Merchent |<small>Admin list</small></h4>
      </div>
      <Table striped bordered hover style={{ marginLeft: "200px" }}>
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
              <td>{item.designation}</td>
              <td>{item.is_super_admin===1?"yes":"no"}</td>
              <td style={{ paddingRight: "90px" }}>
                <button className="btn btn-warning" style={{ margin: "10px" }} onClick={() => viewSingleData(item.id)} >
                  <VisibilityIcon />
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
      <ToastContainer />

    </div>
  )
}

export default View_admin