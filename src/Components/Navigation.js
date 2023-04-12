import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {Image } from 'react-bootstrap';
import { CDBSidebar, CDBSidebarContent, CDBSidebarFooter, CDBSidebarHeader, CDBSidebarMenuItem, CDBSidebarMenu } from 'cdbreact';
import logo from './Image/label.png';
import './Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  }

  return (
    <div className='sidebar'>
      <CDBSidebar textColor="white" backgroundColor="black" isOpen={sidebarIsOpen}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large" />} className="d-md-none">
          <button className="btn-close" onClick={toggleSidebar}></button>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
        <a href="/" className="text-decoration-none" id='title'>
        <h1>Label <span>23</span></h1>
      </a>
          <CDBSidebarMenu>
            <NavLink className="navlink" exact={true} to="/" onClick={toggleSidebar}>
              <CDBSidebarMenuItem>Home</CDBSidebarMenuItem>
            </NavLink >
            <NavLink className="navlink" to="/about" onClick={toggleSidebar}>
              <CDBSidebarMenuItem>About Us</CDBSidebarMenuItem>
            </NavLink>
            <NavLink className="navlink" to="/products" onClick={toggleSidebar}>
              <CDBSidebarMenuItem>Our Products</CDBSidebarMenuItem>
            </NavLink >
          </CDBSidebarMenu>
        </CDBSidebarContent>
        <CDBSidebarFooter style={{ textAlign: "center", backgroundColor: "rgb(63, 54, 1)" }}>
          <div className="sidebar-footer-text" id='footer'>
            <Image src={logo} alt="Logo" />
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
      <button className="btn-toggle d-md-none" onClick={toggleSidebar}>
        <i className={`fa fa-bars fa-2x ${sidebarIsOpen ? 'fa-times' : ''}`}></i>
      </button>
    </div>
  );
}

export default Navigation;
