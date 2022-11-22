import React, { useState } from "react";
import { Route, BrowserRouter, Routes,useLocation ,Navigate } from "react-router-dom";
import { RoutePaths } from "../config/RoutePathConfig";
import PageNotFoundComponent from "../components/PageNotFoundComponent";
import Add_booking from "../views/Add_booking";
import Add_admin from "../views/Add_admin";
import View_booking from "../views/View_booking";
import View_admin from "../views/View_admin";
import Edit_booking from "../views/Edit_booking";
import Edit_admin from "../views/Edit_admin";
import View_single_detail from "../views/View_single_detail";
import View_admin_detail from "../views/View_admin_detail";
import HomePage from '../views/HomePage';
import Login from "../views/Login";
import ProtectedRoute from "../views/ProtectedRoute";
const AppRoutes = (props) => {
  
  return (
    <BrowserRouter>
      <Routes>
        {/* {
          
          (localStorage.getItem("name") && localStorage.getItem("contact")) ?
            <> */}
              <Route element={<Login />} path='/'></Route>
              <Route element={<Add_booking />} path='/add_booking' ></Route>
              <Route element={<Add_admin />} path='/add_admin' ></Route>
              <Route element={<View_booking />} path='/view_booking'></Route>
              <Route element={<View_admin />} path='/view_admin'></Route>
              <Route element={<ProtectedRoute/>}></Route>
              <Route element={<View_single_detail />} path='/view_single_detail/:id'></Route>
              <Route element={<View_admin_detail />} path='/view_admin_detail/:id'></Route>
              <Route element={<HomePage />} path='/home'></Route>
              <Route element={<Edit_booking />} path='/edit_booking/:id'></Route>
              <Route element={<Edit_admin/>} path='/edit_admin/:id'></Route>
            {/* </>
            :
            <>
              
            </>  */}
        {/* } */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
