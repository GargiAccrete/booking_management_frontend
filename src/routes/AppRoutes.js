import React, { useState } from "react";
import { Route, BrowserRouter, Routes,useLocation ,Navigate } from "react-router-dom";
import { RoutePaths } from "../config/RoutePathConfig";
import PageNotFoundComponent from "../components/PageNotFoundComponent";
import Add_booking from "../views/Add_booking";
import View_booking from "../views/View_booking";
import Edit_booking from "../views/Edit_booking";
import View_single_detail from "../views/View_single_detail";
import HomePage from '../views/HomePage';
import Login from "../views/Login";
import ProtectedRoute from "../views/ProtectedRoute";
const AppRoutes = (props) => {
  
  return (
    <BrowserRouter>
      <Routes>
        {
          (localStorage.getItem("name") && localStorage.getItem("contact")) ?
            <>
       
              <Route element={<Add_booking />} path='/add_booking' ></Route>
              <Route element={<View_booking />} path='/view_booking'></Route>
              <Route element={<ProtectedRoute/>}></Route>
              <Route element={<View_single_detail />} path='/view_single_detail/:id'></Route>
             <Route element={<HomePage />} path='/home'></Route>
              <Route element={<Edit_booking />} path='/edit_booking/:id'></Route>
            </>
            :
            <>
              <Route element={<Login />} path='/'></Route>
            </>
        }
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
