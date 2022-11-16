import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Demo2 from "../services/Demo2";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function View_product() {
  let navigate = useNavigate();

  const [data, setdata] = useState([]);
  let getData = () => {
    Demo2.FetchData("register/list").then((result) => {
      setdata(result.data);
      console.log(data);
    });
  };

  let updateData = (id) => {
    console.log("id is" + id);
    navigate(`/update_product/${id}`);
  };
  let deletedata = (id) => {
    console.log(id);
    Demo2.deleteData(`register/${id}/delete`).then(() => {
      console.log("Data deleted");
      getData();
    });
  };
  useEffect(() => {
    //onload
    getData();
  }, []);

  return (
    <div>
      <Sidebar />
      <div >
      <h4 >
        List  Booking |<small>List booking</small>
        </h4>
      </div>
      <div>
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
                <button className="btn btn-danger" style={{ margin: "10px" }} onClick={()=>deletedata(item.id)}>
                  Delete
                </button>
                <button className="btn btn-info">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
