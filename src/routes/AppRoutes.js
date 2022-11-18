import React from "react";
import { Route,BrowserRouter,Routes } from "react-router-dom";
import { RoutePaths } from "../config/RoutePathConfig";
import PageNotFoundComponent from "../components/PageNotFoundComponent";
import Add_booking from "../views/Add_booking";
import View_booking   from "../views/View_booking";
import Edit_booking   from "../views/Edit_booking";
import View_single_detail  from "../views/View_single_detail";
import Home from '../views/Home';
import Login from "../views/Login";
import LoginPage from "../views/LoginPage";
// import LoginView from "../views/login/LoginView";
// import DashboardView from "../views/dashboard/DashboardView";
// import LogoutView from "../views/profile/LogoutView";
// import ProfileView from "../views/profile/ProfileView";

const AppRoutes = (props) => {
  const { isLoggedIn, updateLoggedIn } = props;

  return (
    <BrowserRouter>
     <Routes>
     {
      (localStorage.getItem("name") && localStorage.getItem("contact"))?
      <>
       <Route element={<Home/>} path='/'></Route>
       <Route path='/add_booking' element={<Add_booking/>}></Route>  
     <Route element={<View_booking/>} path='/view_booking'></Route>
     <Route element={<View_single_detail/>} path='/view_single_detail/:id'></Route>
     <Route element={<Edit_booking/>} path='/edit_booking/:id'></Route>
      </>
      :
      <>
       <Route element={<Login/>} path='/login'></Route> 
      </>
     }
     {/* <Route element={<Home/>} path='/'></Route>
     <Route element={<Login/>} path='/login'></Route> 
     <Route element={<Add_booking/>} path='/add_booking'></Route>
     <Route element={<View_booking/>} path='/view_booking'></Route>
     <Route element={<View_single_detail/>} path='/view_single_detail/:id'></Route>
     <Route element={<Edit_booking/>} path='/edit_booking/:id'></Route> */}
     
     <Route
        path="*"
        
        render={(props) => {
          return <PageNotFoundComponent isLoggedIn={isLoggedIn} />;
        }}
      />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
