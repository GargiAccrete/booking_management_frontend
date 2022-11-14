import React from "react";
import { Route,BrowserRouter,Routes } from "react-router-dom";
import { RoutePaths } from "../config/RoutePathConfig";
import PageNotFoundComponent from "../components/PageNotFoundComponent";
import Add_booking from "../views/Add_booking";
import View_booking   from "../views/View_booking";
import Home from '../views/Home';
// import LoginView from "../views/login/LoginView";
// import DashboardView from "../views/dashboard/DashboardView";
// import LogoutView from "../views/profile/LogoutView";
// import ProfileView from "../views/profile/ProfileView";

const AppRoutes = (props) => {
  const { isLoggedIn, updateLoggedIn } = props;

  return (
    <BrowserRouter>
     <Routes>
     <Route element={<Home/>} path='/'></Route>
       <Route element={<Add_booking/>} path='/add_booking'></Route>
       <Route element={<View_booking/>} path='/view_booking'></Route>
      {/* <Route
        path={RoutePaths.LOGIN}
        exact
        render={(props) => {
          if (isLoggedIn) {
            return <Redirect to={RoutePaths.DASHBOARD} />;
          } else {
            return <LoginView {...props} updateLoggedIn={updateLoggedIn} />;
          }
        }}
      />
      <Route
        path={RoutePaths.DASHBOARD}
        exact
        render={(props) => {
          if (isLoggedIn) {
            return <DashboardView {...props} />;
          } else {
            return <Redirect to={RoutePaths.LOGIN} />;
          }
        }}
      />
      <Route
        path={RoutePaths.PROFILE}
        exact
        render={(props) => {
          if (isLoggedIn) {
            return <ProfileView {...props} />;
          } else {
            return <Redirect to={RoutePaths.LOGIN} />;
          }
        }}
      />
      <Route
        path={RoutePaths.LOGOUT}
        exact
        render={(props) => {
          if (isLoggedIn) {
            return <LogoutView {...props} updateLoggedIn={updateLoggedIn} />;
          } else {
            return <Redirect to={RoutePaths.LOGIN} />;
          }
        }}
      /> */}
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
