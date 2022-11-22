import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Demo2 from "../services/Demo2";
import Navbar from "../components/Navbar";
import { useNavigate ,useLocation} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";

export default function View_product() {
  let navigate = useNavigate();
  

  const [data, setdata] = useState([]);
  let getData = () => {
    Demo2.FetchData("register/list").then((result) => {
      setdata(result.data);
      toast("listed Successfully!");
      console.log(data);
    });
  };

  let updateData = (id) => {
    console.log("id is" + id);
    navigate(`/edit_booking/${id}`);
  };
  let viewSingleData=(id)=>{
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
  useEffect(() => {
    //onload
    getData();
  }, []);
  const logout=()=>{
    localStorage.removeItem('name');
    localStorage.removeItem('contact');
    window.open("/login")
}

  return (
    <div>
      <Sidebar />
      <div >
      <h4 >
        List  Booking |<small>List booking</small>
        </h4>
      </div>
      <div>
        
      </div>
      <div>
      <button
          className="btn btn-danger"
          onClick={logout}
          style={{ float: "right", margin: "20px" }}
        >
          {" "}
          Logout
        </button>

        <button
          className="btn btn-primary"
          onClick={() => window.open("/add_booking")}
          style={{ float: "right", margin: "20px" }}
        >
          {" "}
          Add Booking
        </button>
      </div>
      <Table striped bordered hover style={{ marginLeft: "200px" }}>
        <thead>
          <tr>
            <th>Id</th>
            <th>legal_name</th>
            <th>State</th>
            <th>city</th>
            <th>Brand Associate</th>
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
              <td>{item.brand_associate}</td>
              <td style={{ paddingRight: "90px" }}>
                <button className="btn btn-warning" style={{ margin: "10px" }}  onClick={()=>viewSingleData(item.id)} >
                  View
                </button>
                <button className="btn btn-danger" style={{ margin: "10px" }} onClick={()=>deletedata(item.id)}>
                  Delete
                </button>
                <button className="btn btn-info" style={{ margin: "10px" }}  onClick={()=>updateData(item.id)} >
                  Edit
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
   
  );
}
