import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Link,useNavigate} from "react-router-dom";
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Table from 'react-bootstrap/Table'


export default function View_product() {
  useEffect(() => {
    ReadBooking();
    }, [])
  let navigate = useNavigate();
const [data, setdata] = useState([]);
const header={"Access-Control-Allow-Origin":"*", "Content-type": "application/json"}
const ReadBooking=()=>{
    const options = {
        url: 'http://localhost:3000/user_list',
        method: "GET",
        // data: userData,
        header: header,
      }
      axios(options).then((res)=>{
        console.log("first",res.data.userData)
        setdata(res.data.userData)
      }).catch(e=>{
        console.log("error",e)

      })
      // setUsers(response)
}
const OnDeleteUser=async(id)=>{
  const response= await axios.get(`http://localhost:3000/delete/${id}`)
  if(response.status===200){
    console.log("deleted successfully")
  }

}
  // let getData = () => {
  //   Demo2.FetchData("Products").then((result) => {
  //     setdata([...result]);
  //     console.log(data);
  //   });

  //   // Api.getData('task').then((result)=>{
  //   //     settask([...result])
  //   //     console.log(task)
  // };

  // let updateData = (id) => {
  //   console.log("id is" + id);
  //   navigate(`/update_product/${id}`);
  // };
  // let deletedata = (id) => {
  //   console.log(id);
  //   Demo2.deleteData("Products", id).then(() => {
  //     console.log("Data deleted");
  //     getData();
  //   });
  // };

  // useEffect(() => {
  //   //onload
  //   getData();
  // }, []);

  return (
    <div>
      <div>
      <Navbar />
      <Sidebar/>
      <div style={{display:"flex",marginBottom:"20px"}}>
      <h4 style={{marginLeft:"241px"}}> View Booking |<small>View booking</small></h4>
      <div>
        <Link to="/Add_booking">
          <button
            className="btn btn-primary"
            style={{ float: "right"}}
          >
            {" "}
            Add Booking
          </button>
        </Link>
      </div>
      </div>
      </div>
      <div>
      <Table striped bordered>
        <thead>
          <tr>
            <th style={{paddingLeft:"195px"}}>Id</th>
            <th>Legal Name</th>
            <th>State</th>
            <th>City</th>
            <th>Business Area</th>
            <th>Contact No</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr>
              <td style={{paddingLeft:"195px"}}>{item.id}</td>
              <td>{item.legal_name}</td>
              <td>{item.state}</td>
              <td>{item.city}</td>
              <td>{item.business_area}</td>
              <td>{item.contact_no}</td>
              <td>
                <button
                  className="btn btn-danger"
                  // onClick={() => deletedata(item.id)}
                  style={{ margin: "10px" }}
                >
                  Delete
                </button>

                <button
                  className="btn btn-info"
                  // onClick={() => updateData(item.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
}
