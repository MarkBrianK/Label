import React, { useState } from 'react';
import { NavLink  } from 'react-router-dom';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarMenu } from 'cdbreact';
import logo from './Image/label.png';
import './Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {




  return (
    <div className='sidebar'>
      <CDBSidebar textColor="white"  >
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" />} style={{ backgroundColor: "black" }}>
          <a href="/" className="text-decoration-none" id='title'>
          <h1>  Label <span>23</span></h1>


          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink className="navlink" exact={true} to="/" >
              <CDBSidebarMenuItem>Home</CDBSidebarMenuItem>
            </NavLink >
            <NavLink className="navlink" to="/about" >
              <CDBSidebarMenuItem>About Us</CDBSidebarMenuItem>
            </NavLink>
            <NavLink className="navlink" to="/products" >
              <CDBSidebarMenuItem>Our Products</CDBSidebarMenuItem>
            </NavLink >
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: "center", backgroundColor:"rgb(63, 54, 1)" }}>
          <div className="sidebar-footer-text" id='footer'>
          <img src={logo} alt="Logo" />
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>

    </div>
  );
}

export default Navigation;
