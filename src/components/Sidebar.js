import { Component } from "react";
import { Link } from "react-router-dom";
import restaurant from "../Assets/image/restaurant.png";

export default function Sidebar() {
  return (
    <div style={{ position: "fixed" }}>
      <ul
        class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          class="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-laugh-wink"></i>
          </div>
          <div class="sidebar-brand-text mx-3">
            SB Admin <sup>2</sup>
          </div>
        </a>
        <hr class="sidebar-divider my-0" />
        <li class="nav-item active">
          <a class="nav-link" href="index.html">
            <i class="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>

        <hr class="sidebar-divider" />

        <div class="sidebar-heading">Interface</div>

        <li class="nav-item">
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <Link to="/View_booking" style={{ color: "White" }}>
              Merchent
            </Link>
            {/* <span>Products</span> */}
          </a>
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <Link to="/View_Category" style={{ color: "White" }}>
              Category
            </Link>
            {/* <span>Products</span> */}
          </a>
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <Link to="/View_user" style={{ color: "White" }}>
              User
            </Link>
            {/* <span>Products</span> */}
          </a>
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <Link to="/adminpanel" style={{ color: "White" }}>
              Admin
            </Link>
            {/* <span>Products</span> */}
          </a>
          <a
            class="nav-link collapsed"
            href="#"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <Link to="/ratingpageview" style={{ color: "White" }}>
              Rating
            </Link>
            {/* <span>Products</span> */}
          </a>
          {/* <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
        <div class="bg-white py-2 collapse-inner rounded">
         <h6 class="collapse-header">Products:</h6>
            <Link to='/Add_product'>Add Product</Link><br></br>
            <Link to='/View_product'>View Product</Link> 

             <a class="collapse-item" href="View_product.js">View products</a>
            <a class="collapse-item" href="Add_product.js">Add Products</a>
        </div> 
        </div> */}
        </li>

        <hr class="sidebar-divider" />

        <div class="sidebar-heading">Addons</div>

        <hr class="sidebar-divider d-none d-md-block" />

        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

        <div class="sidebar-card d-none d-lg-flex">
          <img
            class="sidebar-card-illustration mb-2"
            src="img/undraw_rocket.svg"
            alt="..."
          />
          <p class="text-center mb-2">
            <strong>SB Admin Pro</strong> is packed with premium features,
            components, and more!
          </p>
          <a
            class="btn btn-success btn-sm"
            href="https://startbootstrap.com/theme/sb-admin-pro"
          >
            Upgrade to Pro!
          </a>
        </div>
      </ul>
    </div>
  );
}
